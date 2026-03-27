# Guide App — 구현 플랜 v2

> 축구 팀 관리 앱. `@mono/shared`, `@mono/ui`, `docs/01~13` 가이드라인을
> 가장 올바르게 활용하는 레퍼런스 앱.

---

## 완료된 상태

- [x] Hybrid Refresh JWT 인증/인가 (`/login`, `/signup`, `/api/v1/sessions`)
- [x] JwtAuthGuard (APP_GUARD) + `@Public()` + `@Roles()` 데코레이터
- [x] `@mono/ui` 컴포넌트로 Login/Signup/Dashboard UI
- [x] E2E 테스트 25케이스 (PostgreSQL + Jest)
- [x] Prisma: `User`, `Session` 모델

---

## 전체 도메인 플로우

### 팀 플로우
```
[팀 없음] ──→ 팀 만들기 (주장이 됨)
           └→ 팀 찾기 ──→ 가입 신청 (PENDING)
                              ↓
                     주장이 수락/거절 (ACCEPTED / REJECTED)
                              ↓ 수락
                       TeamMember 등록

[팀 있음 / 주장] ──→ 멤버 관리 (역할 변경, 추방)
                └→ 가입 신청 목록 확인 및 처리

[팀 있음 / 일반] ──→ 팀 정보 조회, 멤버 조회
                └→ 팀 탈퇴
```

### 경기 플로우
```
[팀 없음] ──→ 경기 탭 진입 불가 (팀 가입 유도 toast)

[주장] ──→ 경기 등록 (홈팀 = 내 팀)
        └→ 내 팀 경기 관리 (수정, 취소)

[일반 / 주장] ──→ 경기 목록 탐색 (지역/날짜 필터)
               └→ OPEN 경기에 매칭 신청 (어웨이팀 = 내 팀)
                       ↓
                  상태 MATCHED (선착순, 별도 수락 없음)
```

---

## Phase 1 — Prisma 스키마 확장

파일: `server/prisma/schema.prisma`

### 신규/변경 모델

```prisma
// ── User 모델에 추가 ──────────────────────────────────────────────
captainOf        Team[]            @relation("CaptainTeams")
teamMembers      TeamMember[]
joinRequests     TeamJoinRequest[]
position         PlayerPosition?
skillLevel       Int?              // 1~5

enum PlayerPosition {
  FW
  MF
  DF
  GK
}

// ── Team ─────────────────────────────────────────────────────────
model Team {
  id          String   @id @default(cuid())
  name        String
  description String?
  logoUrl     String?
  captainId   String

  captain      User              @relation("CaptainTeams", fields: [captainId], references: [id])
  members      TeamMember[]
  joinRequests TeamJoinRequest[]
  homeMatches  Match[]           @relation("HomeTeam")
  awayMatches  Match[]           @relation("AwayTeam")

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("teams")
}

// ── TeamMember ────────────────────────────────────────────────────
model TeamMember {
  teamId   String
  userId   String
  role     TeamRole @default(MEMBER)
  joinedAt DateTime @default(now())

  team Team @relation(fields: [teamId], references: [id], onDelete: Cascade)
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@id([teamId, userId])
  @@map("team_members")
}

enum TeamRole {
  CAPTAIN
  MEMBER
}

// ── TeamJoinRequest (신규) ────────────────────────────────────────
model TeamJoinRequest {
  id      String            @id @default(cuid())
  teamId  String
  userId  String
  status  JoinRequestStatus @default(PENDING)
  message String?           // 가입 인사말

  team Team @relation(fields: [teamId], references: [id], onDelete: Cascade)
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([teamId, userId])   // 팀당 중복 신청 방지
  @@map("team_join_requests")
}

enum JoinRequestStatus {
  PENDING
  ACCEPTED
  REJECTED
}

// ── Match ─────────────────────────────────────────────────────────
model Match {
  id         String      @id @default(cuid())
  homeTeamId String
  awayTeamId String?
  matchDate  DateTime
  location   String
  status     MatchStatus @default(OPEN)
  note       String?     // 경기 메모

  homeTeam Team  @relation("HomeTeam", fields: [homeTeamId], references: [id])
  awayTeam Team? @relation("AwayTeam", fields: [awayTeamId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("matches")
}

enum MatchStatus {
  OPEN       // 상대 모집 중
  MATCHED    // 어웨이팀 확정
  COMPLETED  // 경기 완료
  CANCELLED  // 취소
}
```

마이그레이션:
```bash
yarn workspace @mono/guide-app-server prisma migrate dev --name add-teams-matches-profile
```

---

## Phase 2 — 서버: Teams 모듈

### 파일 구조
```
server/src/features/teams/
  dto/
    create-team.dto.ts          # name, description?, logoUrl?
    update-member-role.dto.ts   # role: TeamRole
    send-join-request.dto.ts    # message?
    respond-join-request.dto.ts # status: ACCEPTED | REJECTED
  teams.controller.ts
  teams.service.ts
  teams.module.ts
```

### API 엔드포인트

| Method | Path | 설명 | 권한 체크 |
|--------|------|------|-----------|
| `POST` | `/api/v1/teams` | 팀 생성 (생성자 = 주장, CAPTAIN 자동 등록) | JWT |
| `GET` | `/api/v1/teams` | 팀 목록 조회 (query: `search?`, `page?`) | JWT |
| `GET` | `/api/v1/teams/my` | 내가 속한 팀 정보 조회 | JWT |
| `GET` | `/api/v1/teams/:id` | 팀 상세 조회 | JWT |
| `GET` | `/api/v1/teams/:id/members` | 팀 멤버 목록 | JWT |
| `PATCH` | `/api/v1/teams/:id/members/:userId/role` | 멤버 역할 변경 | JWT + 주장 검증 |
| `DELETE` | `/api/v1/teams/:id/members/:userId` | 멤버 추방 | JWT + 주장 검증 |
| `DELETE` | `/api/v1/teams/:id/members/me` | 팀 탈퇴 (주장 불가) | JWT |
| `POST` | `/api/v1/teams/:id/join-requests` | 가입 신청 (이미 팀 있으면 400) | JWT |
| `GET` | `/api/v1/teams/:id/join-requests` | 가입 신청 목록 (PENDING) | JWT + 주장 검증 |
| `PATCH` | `/api/v1/teams/:id/join-requests/:requestId` | 수락/거절 | JWT + 주장 검증 |

### 핵심 서비스 로직

```typescript
// createTeam: 트랜잭션으로 Team + CAPTAIN TeamMember 동시 생성
async createTeam(userId: string, dto: CreateTeamDto) {
  return this.prisma.$transaction(async (tx) => {
    const team = await tx.team.create({ data: { ...dto, captainId: userId } });
    await tx.teamMember.create({ data: { teamId: team.id, userId, role: 'CAPTAIN' } });
    return team;
  });
}

// sendJoinRequest: 이미 팀 소속이면 400, 중복 신청이면 409
async sendJoinRequest(userId: string, teamId: string, dto: SendJoinRequestDto) {
  const existing = await this.prisma.teamMember.findFirst({ where: { userId } });
  if (existing) throw new BadRequestException('이미 팀에 소속되어 있습니다.');
  // @@unique([teamId, userId]) 위반 시 Prisma가 P2002 → 409로 매핑
  return this.prisma.teamJoinRequest.create({ data: { teamId, userId, ...dto } });
}

// respondJoinRequest: 수락 시 TeamMember 생성 + 요청 상태 업데이트 (트랜잭션)
async respondJoinRequest(captainId: string, teamId: string, requestId: string, status: 'ACCEPTED' | 'REJECTED') {
  // 주장 검증
  const team = await this.prisma.team.findUnique({ where: { id: teamId } });
  if (team.captainId !== captainId) throw new ForbiddenException();

  return this.prisma.$transaction(async (tx) => {
    const req = await tx.teamJoinRequest.update({ where: { id: requestId }, data: { status } });
    if (status === 'ACCEPTED') {
      await tx.teamMember.create({ data: { teamId, userId: req.userId, role: 'MEMBER' } });
    }
    return req;
  });
}

// leaveTeam: 주장은 탈퇴 불가 (팀 해산 또는 주장 이양 필요)
async leaveTeam(userId: string, teamId: string) {
  const team = await this.prisma.team.findUnique({ where: { id: teamId } });
  if (team.captainId === userId) throw new BadRequestException('주장은 탈퇴할 수 없습니다. 먼저 주장을 변경하세요.');
  return this.prisma.teamMember.delete({ where: { teamId_userId: { teamId, userId } } });
}
```

---

## Phase 3 — 서버: Matches 모듈

### 파일 구조
```
server/src/features/matches/
  dto/
    create-match.dto.ts   # homeTeamId, matchDate, location, note?
    update-match.dto.ts   # matchDate?, location?, note?
    match-filter.dto.ts   # location?, date?, status?
  matches.controller.ts
  matches.service.ts
  matches.module.ts
```

### API 엔드포인트

| Method | Path | 설명 | 권한 체크 |
|--------|------|------|-----------|
| `GET` | `/api/v1/matches` | 경기 목록 (query: `location?`, `date?`, `status?`) | JWT |
| `GET` | `/api/v1/matches/my-team` | 내 팀 경기 목록 (홈+어웨이 모두) | JWT |
| `GET` | `/api/v1/matches/:id` | 경기 상세 | JWT |
| `POST` | `/api/v1/matches` | 경기 등록 (홈팀 주장만 가능) | JWT + 주장 검증 |
| `POST` | `/api/v1/matches/:id/apply` | 매칭 신청 (어웨이팀 = 내 팀, 선착순 MATCHED) | JWT + 팀 소속 + 주장 검증 |
| `PATCH` | `/api/v1/matches/:id` | 경기 정보 수정 (OPEN 상태만) | JWT + 홈팀 주장 |
| `DELETE` | `/api/v1/matches/:id` | 경기 취소 → CANCELLED (OPEN 상태만) | JWT + 홈팀 주장 |

### 핵심 서비스 로직

```typescript
// createMatch: 요청자가 homeTeamId의 주장인지 검증
async createMatch(userId: string, dto: CreateMatchDto) {
  const team = await this.prisma.team.findUnique({ where: { id: dto.homeTeamId } });
  if (!team || team.captainId !== userId) throw new ForbiddenException('홈팀 주장만 경기를 등록할 수 있습니다.');
  return this.prisma.match.create({ data: dto });
}

// applyMatch: 선착순 매칭 (OPEN → MATCHED)
async applyMatch(userId: string, matchId: string) {
  // 1. 요청자가 팀 소속인지 확인
  const member = await this.prisma.teamMember.findFirst({ where: { userId } });
  if (!member) throw new BadRequestException('팀에 소속된 후 매칭 신청이 가능합니다.');
  // 2. 요청자가 팀 주장인지 확인
  const team = await this.prisma.team.findUnique({ where: { id: member.teamId } });
  if (team.captainId !== userId) throw new ForbiddenException('팀 주장만 매칭 신청이 가능합니다.');
  // 3. 경기 상태 확인
  const match = await this.prisma.match.findUnique({ where: { id: matchId } });
  if (match.status !== 'OPEN') throw new ConflictException('이미 매칭이 완료된 경기입니다.');
  if (match.homeTeamId === member.teamId) throw new BadRequestException('홈팀은 신청할 수 없습니다.');
  // 4. 업데이트
  return this.prisma.match.update({
    where: { id: matchId },
    data: { awayTeamId: member.teamId, status: 'MATCHED' },
  });
}
```

---

## Phase 4 — 서버: Users 프로필 확장

### 추가 DTO
```
server/src/features/users/dto/
  update-profile.dto.ts   # position?: PlayerPosition, skillLevel?: number (1~5)
```

### 추가 엔드포인트

| Method | Path | 설명 |
|--------|------|------|
| `PATCH` | `/api/v1/users/me` | 포지션, 실력 지표 수정 |
| `GET` | `/api/v1/users/me` | 내 정보 조회 (position, skillLevel 포함) |

---

## Phase 5 — 클라이언트: 화면 구조

### 라우팅
```
src/app/
  (auth)/
    login/page.tsx           ✅ 완료
    signup/page.tsx          ✅ 완료
  (protected)/
    layout.tsx               → MobileLayout + BottomTabBar
    page.tsx                 → /dashboard 리다이렉트
    dashboard/page.tsx       ✅ 완료 (확장 필요)
    team/page.tsx            🔲 탭: 내 팀 | 팀 찾기
    matches/page.tsx         🔲 탭: 경기 찾기 | 내 팀 경기
    profile/page.tsx         🔲 프로필 조회/편집
```

### middleware.ts
```typescript
const protectedPaths = ['/', '/team', '/matches', '/profile'];
```

### BottomTabBar
```tsx
const tabs = [
  { key: '/',        label: '홈',    icon: <HomeIcon /> },
  { key: '/team',    label: '팀',    icon: <ProfileIcon /> },
  { key: '/matches', label: '경기',  icon: <CalendarIcon /> },
  { key: '/profile', label: '프로필', icon: <SettingsIcon /> },
];
```

---

## Phase 6 — 클라이언트: Feature 파일 구조

### `features/teams/`
```
schemas/
  team.schema.ts               # teamSchema, teamDetailSchema, memberSchema, joinRequestSchema
services/
  team.service.ts              # getTeams, getTeam, getMyTeam, getMembers,
                               # createTeam, sendJoinRequest,
                               # getJoinRequests, respondJoinRequest,
                               # updateMemberRole, kickMember, leaveTeam
hooks/
  queries/
    useTeamsQuery.ts           # 전체 팀 목록 (검색어 파라미터)
    useTeamQuery.ts            # 팀 상세
    useMyTeamQuery.ts          # 내가 속한 팀 (없으면 null)
    useTeamMembersQuery.ts
    useJoinRequestsQuery.ts    # 주장: PENDING 가입 신청 목록
  mutations/
    useCreateTeamMutation.ts
    useSendJoinRequestMutation.ts
    useRespondJoinRequestMutation.ts
    useUpdateRoleMutation.ts
    useKickMemberMutation.ts
    useLeaveTeamMutation.ts
  useCreateTeamForm.ts         # Logic Hook — 팀 생성 폼
components/
  TeamSummaryCard.tsx          # 대시보드용 요약 카드 (Container + View)
  TeamCard.tsx                 # 팀 찾기 목록 카드
  TeamDetailHeader.tsx         # 팀명, 설명, 멤버 수
  MemberList.tsx               # Container (loading/empty/data 분기)
  MemberListItem.tsx           # View — 닉네임, 포지션, 역할 뱃지
  JoinRequestBadge.tsx         # 주장: PENDING 건수 뱃지
  JoinRequestList.tsx          # Container
  JoinRequestItem.tsx          # View — 신청자 정보, 수락/거절 버튼
  CreateTeamForm.tsx           # Modal 내부 폼
  TeamSearchBar.tsx            # SearchField 래퍼
```

### `features/matches/`
```
schemas/
  match.schema.ts              # matchSchema, matchDetailSchema
services/
  match.service.ts             # getMatches, getMyTeamMatches, getMatch,
                               # createMatch, applyMatch,
                               # updateMatch, cancelMatch
hooks/
  queries/
    useMatchesQuery.ts         # 전체 경기 목록 (필터)
    useMyTeamMatchesQuery.ts   # 내 팀 경기 (홈+어웨이)
    useMatchQuery.ts           # 경기 상세
  mutations/
    useCreateMatchMutation.ts
    useApplyMatchMutation.ts
    useCancelMatchMutation.ts
  useCreateMatchForm.ts        # Logic Hook
components/
  MatchCard.tsx                # 경기 찾기 카드 (OPEN — 신청 버튼 포함)
  MyTeamMatchCard.tsx          # 내 팀 경기 카드 (홈/어웨이, 상태별)
  MatchList.tsx                # Container
  MatchFilterBar.tsx           # 지역, 날짜 필터 (SegmentedControl / SearchField)
  CreateMatchForm.tsx          # Modal 내부 폼
  MatchStatusBadge.tsx         # OPEN / MATCHED / COMPLETED / CANCELLED 뱃지
```

### `features/profile/`
```
schemas/
  profile.schema.ts            # profileSchema (position, skillLevel 포함)
services/
  profile.service.ts           # getMe, updateProfile
hooks/
  queries/
    useProfileQuery.ts
  useUpdateProfileForm.ts      # Logic Hook
components/
  ProfileView.tsx              # Container
  ProfileHeader.tsx            # 닉네임, 이메일
  PositionSelector.tsx         # FW/MF/DF/GK — SegmentedControl
  SkillLevelSelector.tsx       # 1~5 — Rating (interactive) or Slider
  ProfileEditSection.tsx
```

---

## Phase 7 — 각 화면 상세 스펙

### 대시보드 `/`

```
AppHeader: "Guide App"

[내 팀 카드]
  팀 없음: "팀이 없어요" + "팀 만들기" 버튼 + "팀 찾기" 버튼
  팀 있음: 팀명 / 멤버 N명 / 역할(주장/멤버) + "팀 관리" 링크

[다가오는 경기] (최대 3개)
  useMatchesQuery({ teamId: myTeamId, status: ['OPEN','MATCHED'], upcoming: true })
  없음: EmptyState "예정된 경기가 없어요"

[최근 완료 경기] (최대 3개)
  useMatchesQuery({ teamId: myTeamId, status: 'COMPLETED' })
  없음: EmptyState
```

### 팀 탭 `/team` — Tab: "내 팀" | "팀 찾기"

```
[내 팀 탭]
  팀 없음:
    - EmptyState ("소속 팀이 없어요")
    - Button "팀 만들기" → CreateTeamForm Modal
    - Button "팀 찾기" → 팀 찾기 탭으로 전환

  팀 있음 (일반 멤버):
    - TeamDetailHeader (팀명, 설명, 멤버 수)
    - MemberList
    - BottomCTASingle "팀 탈퇴" (danger)

  팀 있음 (주장):
    - TeamDetailHeader
    - JoinRequestBadge + "가입 요청 N건" → JoinRequestList (Modal or 인라인)
    - MemberList (역할 변경, 추방 버튼 포함)
    - BottomCTASingle 없음 (주장 탈퇴 불가)

[팀 찾기 탭]
  - TeamSearchBar (실시간 검색 or 검색 버튼)
  - 이미 팀 소속: 배너 "이미 팀에 소속되어 있어요" (신청 버튼 비활성)
  - TeamCard 목록:
      팀명 / 멤버 수 / 설명 / "가입 신청" 버튼
      이미 신청(PENDING): "신청 완료" 뱃지 (비활성)
```

### 경기 탭 `/matches` — Tab: "경기 찾기" | "내 팀 경기"

```
[경기 찾기 탭]
  - MatchFilterBar (지역 텍스트 검색, 날짜 선택)
  - MatchCard 목록 (OPEN 경기만, 내 팀 홈 경기 제외):
      - 날짜/시간, 장소, 홈팀명
      - "매칭 신청" 버튼 (팀 소속 + 주장만 활성)
      - 팀 없음: 버튼 클릭 시 "팀에 가입 후 신청 가능합니다" toast
      - 일반 멤버: "주장만 신청 가능합니다" toast
  - 경기 없음: EmptyState

[내 팀 경기 탭]
  - 팀 없음: EmptyState "팀에 가입하면 경기를 관리할 수 있어요"
  - MyTeamMatchCard 목록 (홈 + 어웨이 합산, 최신순):
      - OPEN: 홈팀이면 "수정" / "취소" 버튼
      - MATCHED: 홈팀명 vs 어웨이팀명
      - COMPLETED: 완료 뱃지
      - CANCELLED: 취소 뱃지
  - 주장일 때: FixedBottomCTA "경기 등록" → CreateMatchForm Modal
```

### 프로필 `/profile`

```
AppHeader: "프로필"

ProfileHeader: 닉네임, 이메일

[편집 폼]
  PositionSelector: FW / MF / DF / GK (SegmentedControl)
  SkillLevelSelector: 1~5점 (Rating interactive)

BottomCTASingle "저장" → useUpdateProfileForm Logic Hook → 성공 toast

[하단]
  Button (ghost, danger) "로그아웃" → 세션 삭제 + /login 리다이렉트
```

---

## Phase 8 — UI 컴포넌트 활용 매핑

| UI 요소 | 사용할 @mono/ui 컴포넌트 |
|---------|------------------------|
| 탭 전환 (내 팀/팀 찾기 등) | `Tab` |
| 팀/경기 목록 항목 | `ListRow` |
| 팀원 목록 항목 | `ListRow` (left: 아바타, right: 뱃지+버튼) |
| 가입 신청 항목 | `ListRow` |
| 상태 배지 | `Button` (variant=secondary, small) |
| 역할/포지션 선택 | `SegmentedControl` |
| 별점 실력 지표 | `Rating` (interactive) |
| 경기 필터 | `SearchField` + `SegmentedControl` |
| 팀 검색 | `SearchField` |
| 팀 없음/경기 없음 빈 상태 | `Flex` + `Spacing` + `Button` |
| 로딩 | `Skeleton` |
| 성공/실패 피드백 | `useToast` |
| 팀 생성 / 경기 등록 모달 | `Modal` + `useModal` |
| 추방/탈퇴 확인 | `ConfirmDialog` |
| 하단 고정 CTA | `BottomCTASingle` / `FixedBottomCTA` |
| 데이터 나열 (날짜, 장소 등) | `TableRow` |
| 진행 상태 표시 (경기 단계) | `ProgressStepper` |

---

## 코드 작성 규칙

### 레이어 규칙 (`docs/01-separation-of-concerns.md`)
```
Schema → Service → Data Hook → Logic Hook → Container → View → Page
```
- **Schema**: Zod로 서버 응답 런타임 검증. `schema.parse()` 필수.
- **Service**: `http.get/post/...` + `schema.parse()`. 비즈니스 로직 없음.
- **Data Hook**: `useQuery` / `useMutation` 래핑. 서버 상태만.
- **Logic Hook**: form + mutation 조합. `useXxxForm.ts` 또는 `useXxxMutation.ts`.
- **Container**: loading/error/empty/data 분기. View에 props 주입.
- **View**: props만 받아 렌더링. 로직 없음.

### API 클라이언트 (`docs/02-api-integration.md`)
```typescript
http.get(...)      // 인증 필요 (privateApi — Bearer AT 자동 주입)
http.auth.post()   // 인증 불필요 (publicApi — login/signup 전용)
```

### 에러 처리 (`docs/03-error-handling.md`)
```typescript
if (isApiError(error) && error.code === 'FORBIDDEN') {
  toast.show({ message: '주장만 가능합니다', type: 'error' });
}
if (isApiError(error) && error.code === 'CONFLICT') {
  toast.show({ message: '이미 신청한 팀입니다', type: 'error' });
}
```

---

## 구현 순서

```
Phase 1 — DB
  1. schema.prisma 확장 (TeamJoinRequest, PlayerPosition, skillLevel, MatchStatus.CANCELLED)
  2. prisma migrate dev

Phase 2 — 서버
  3. TeamsModule (controller / service / dto / module)
     - CRUD + 팀 목록/검색 + 가입 신청/수락/거절 + 탈퇴
  4. MatchesModule (controller / service / dto / module)
     - CRUD + 내 팀 경기 + 매칭 신청 + 취소
  5. UsersController PATCH /me + GET /me (position, skillLevel)
  6. app.module.ts에 TeamsModule, MatchesModule import

Phase 3 — 클라이언트 공통
  7. (protected)/layout.tsx → MobileLayout + BottomTabBar
  8. middleware.ts 경로 추가

Phase 4 — 클라이언트 features
  9.  features/teams/ (schema → service → hooks → components)
  10. features/matches/ (schema → service → hooks → components)
  11. features/profile/ (schema → service → hooks → components)

Phase 5 — 클라이언트 페이지
  12. dashboard/page.tsx 확장 (팀 요약 + 경기 섹션)
  13. team/page.tsx (Tab: 내 팀 | 팀 찾기)
  14. matches/page.tsx (Tab: 경기 찾기 | 내 팀 경기)
  15. profile/page.tsx
```
