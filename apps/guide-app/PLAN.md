# Guide App — 구현 플랜

> 축구 팀 관리 앱. 구축된 공통 모듈(`@mono/shared`, `@mono/ui`)과 가이드라인(`docs/01~13`)을
> 가장 올바르게 사용하는 방법을 제시하는 레퍼런스 앱.

---

## 현재 상태 (완료)

- [x] Hybrid Refresh JWT 인증/인가 (`/login`, `/signup`, `/api/v1/sessions`)
- [x] JwtAuthGuard (APP_GUARD) + `@Public()` + `@Roles()` 데코레이터
- [x] `@mono/ui` 컴포넌트로 Login/Signup/Dashboard UI
- [x] E2E 테스트 25케이스 (PostgreSQL + Jest)
- [x] Prisma: `User`, `Session` 모델

---

## Phase 1 — Prisma 스키마 확장

파일: `server/prisma/schema.prisma`

```prisma
model Team {
  id          String   @id @default(cuid())
  name        String
  description String?
  logoUrl     String?
  captainId   String

  captain     User         @relation("CaptainTeams", fields: [captainId], references: [id])
  members     TeamMember[]
  homeMatches Match[]      @relation("HomeTeam")
  awayMatches Match[]      @relation("AwayTeam")

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("teams")
}

model TeamMember {
  teamId   String
  userId   String
  role     TeamRole  @default(MEMBER)
  joinedAt DateTime  @default(now())

  team Team @relation(fields: [teamId], references: [id], onDelete: Cascade)
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@id([teamId, userId])
  @@map("team_members")
}

enum TeamRole {
  CAPTAIN
  MEMBER
}

model Match {
  id         String      @id @default(cuid())
  homeTeamId String
  awayTeamId String?
  matchDate  DateTime
  location   String
  status     MatchStatus @default(OPEN)

  homeTeam Team  @relation("HomeTeam", fields: [homeTeamId], references: [id])
  awayTeam Team? @relation("AwayTeam", fields: [awayTeamId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("matches")
}

enum MatchStatus {
  OPEN
  MATCHED
  COMPLETED
}
```

`User` 모델에 추가:
```prisma
captainOf   Team[]       @relation("CaptainTeams")
teamMembers TeamMember[]
```

마이그레이션 명령:
```bash
yarn workspace @mono/guide-app-server prisma migrate dev --name add-teams-matches
```

---

## Phase 2 — 서버: Teams 모듈

### 파일 구조
```
server/src/features/teams/
  dto/
    create-team.dto.ts        # name, description?, logoUrl?
    update-member-role.dto.ts # role: TeamRole
  teams.controller.ts
  teams.service.ts
  teams.module.ts
```

### API 엔드포인트

| Method | Path | Guard | 설명 |
|--------|------|-------|------|
| `POST` | `/api/v1/teams` | JWT | 팀 생성 (생성자 = 주장, TeamMember CAPTAIN 자동 등록) |
| `GET` | `/api/v1/teams/my` | JWT | 내가 속한 팀 요약 조회 |
| `GET` | `/api/v1/teams/:id/members` | JWT | 팀 멤버 목록 |
| `PATCH` | `/api/v1/teams/:id/members/:userId/role` | JWT | 멤버 역할 변경 **(주장 전용 — 서비스 레이어 체크)** |
| `DELETE` | `/api/v1/teams/:id/members/:userId` | JWT | 팀원 추방 (주장 전용) |

### teams.service.ts 핵심 로직
```typescript
// createTeam: 트랜잭션으로 Team 생성 + 주장 TeamMember 동시 등록
async createTeam(userId: string, dto: CreateTeamDto) {
  return this.prisma.$transaction([
    prisma.team.create({ data: { ...dto, captainId: userId } }),
    prisma.teamMember.create({ data: { teamId, userId, role: 'CAPTAIN' } }),
  ]);
}

// updateMemberRole: 요청자가 주장인지 검증
async updateMemberRole(teamId, requesterId, targetUserId, role) {
  const team = await this.prisma.team.findUnique({ where: { id: teamId } });
  if (team.captainId !== requesterId) throw new ForbiddenException('주장만 역할을 변경할 수 있습니다.');
  ...
}
```

---

## Phase 3 — 서버: Matches 모듈

### 파일 구조
```
server/src/features/matches/
  dto/
    create-match.dto.ts   # homeTeamId, matchDate, location
    match-filter.dto.ts   # location?, date?, status?
  matches.controller.ts
  matches.service.ts
  matches.module.ts
```

### API 엔드포인트

| Method | Path | Guard | 설명 |
|--------|------|-------|------|
| `GET` | `/api/v1/matches` | JWT | 경기 목록 (쿼리: location, date, status) |
| `POST` | `/api/v1/matches` | JWT | 경기 등록 (homeTeamId 팀의 주장만 가능) |
| `POST` | `/api/v1/matches/:id/apply` | JWT | 매칭 신청 (awayTeamId 설정, MATCHED 상태로 변경) |
| `PATCH` | `/api/v1/matches/:id` | JWT | 경기 정보 수정 (주장 전용) |
| `DELETE` | `/api/v1/matches/:id` | JWT | 경기 취소 (주장 전용, OPEN 상태만) |

---

## Phase 4 — 서버: Users 프로필 확장

### 추가 DTO
```
server/src/features/users/dto/
  update-profile.dto.ts   # position?, skillLevel?
```

### 추가 엔드포인트

| Method | Path | Guard | 설명 |
|--------|------|-------|------|
| `PATCH` | `/api/v1/users/me` | JWT | 포지션, 실력 지표 수정 |

---

## Phase 5 — 클라이언트: 전체 화면 구조

### 라우팅
```
src/app/
  (auth)/
    login/page.tsx          ✅ 완료
    signup/page.tsx         ✅ 완료
  (protected)/
    layout.tsx              → MobileLayout + BottomTabBar 적용
    page.tsx                → /dashboard 리다이렉트
    dashboard/page.tsx      ✅ 완료 (확장 필요)
    team/page.tsx           🔲 신규
    matches/page.tsx        🔲 신규
    profile/page.tsx        🔲 신규
```

### middleware.ts 수정
```typescript
// 현재: guide_app_rt 쿠키 존재 여부만 체크
// 추가: /team, /matches, /profile 경로 보호
const protectedPaths = ['/', '/team', '/matches', '/profile'];
```

### BottomTabBar 구성 (layout.tsx)
```tsx
// (protected)/layout.tsx — MobileLayout + 탭바
const tabs = [
  { key: '/',        label: '홈',    icon: <HomeIcon /> },
  { key: '/team',    label: '팀',    icon: <ProfileIcon /> },
  { key: '/matches', label: '경기',  icon: <CalendarIcon /> },
  { key: '/profile', label: '프로필', icon: <SettingsIcon /> },
];
```

---

## Phase 6 — 클라이언트: Feature별 파일 구조

### `features/teams/`
```
schemas/
  team.schema.ts          # teamSchema, memberSchema (Zod)
services/
  team.service.ts         # getMyTeam, getMembers, updateRole, createTeam
hooks/
  queries/
    useTeamQuery.ts       # useQuery — 팀 정보
    useTeamMembersQuery.ts
  useCreateTeamForm.ts    # Logic Hook — 팀 생성 폼
  useUpdateRoleMutation.ts
components/
  TeamSummaryCard.tsx     # Container + View 분리
  MemberList.tsx
  MemberListItem.tsx
  CreateTeamForm.tsx
```

### `features/matches/`
```
schemas/
  match.schema.ts         # matchSchema (Zod)
services/
  match.service.ts        # getMatches, createMatch, applyMatch
hooks/
  queries/
    useMatchesQuery.ts
  useCreateMatchForm.ts
components/
  MatchCard.tsx
  MatchList.tsx
  CreateMatchForm.tsx
  MatchFilterBar.tsx
```

### `features/profile/`
```
schemas/
  profile.schema.ts       # profileSchema (Zod)
services/
  profile.service.ts      # getMe, updateProfile
hooks/
  queries/
    useProfileQuery.ts
  useUpdateProfileForm.ts # Logic Hook
components/
  ProfileView.tsx
  ProfileEditForm.tsx
  SkillLevelSelector.tsx  # 1~5 슬라이더
  PositionSelector.tsx    # FW/MF/DF/GK 선택
```

---

## Phase 7 — 각 화면 상세 스펙

### 대시보드 `/`
```
내 팀 요약 카드 (TeamSummaryCard)
  - 팀 없을 때: "팀 만들기" CTA → 팀 생성 모달
  - 팀 있을 때: 팀명, 멤버 수, 주장 여부

다가오는 경기 섹션
  - useMatchesQuery({ status: 'OPEN' | 'MATCHED', upcoming: true })
  - 최대 3개 MatchCard

최근 경기 결과
  - useMatchesQuery({ status: 'COMPLETED' })
  - 최대 3개
```

### 팀원 관리 `/team`
```
팀 헤더 (이름, 설명, 멤버 수)
팀원 목록 (MemberList)
  - ListRow: 닉네임, 포지션, 역할 뱃지 (주장/일반)
  - 주장일 때: 역할 변경 버튼 노출
  - 주장일 때: 팀원 추방 버튼 노출
팀 없을 때: EmptyState + 팀 만들기 버튼
```

### 경기 매칭 `/matches`
```
상단: 필터바 (지역, 날짜, 상태)
경기 목록 (MatchList)
  - OPEN: "매칭 신청" 버튼
  - MATCHED: 상대팀 정보
  - COMPLETED: 결과 뱃지
FAB (FixedBottomCTA or 우하단 버튼): 경기 등록 → CreateMatchForm 모달
```

### 프로필 `/profile`
```
유저 정보 헤더 (닉네임, 이메일)
포지션 선택 (PositionSelector: FW/MF/DF/GK 칩)
실력 지표 (SkillLevelSelector: 1~5 별점 또는 슬라이더)
저장 버튼 (useUpdateProfileForm Logic Hook)
로그아웃 버튼
```

---

## 코드 작성 규칙 (반드시 준수)

### 레이어 규칙 (`docs/01-separation-of-concerns.md`)
```
Schema → Service → Data Hook → Logic Hook → Container → View → Page
```

- **Schema (Zod)**: 서버 응답 런타임 검증 필수. 계약 깨지면 즉시 에러 발생.
- **Service**: `http.get/post/...` 호출 + schema.parse(). 비즈니스 로직 없음.
- **Data Hook**: `useQuery` / `useMutation` 래핑. 서버 상태만.
- **Logic Hook**: form + mutation 조합. `useXxxForm.ts` 네이밍.
- **Container**: 상태 분기 (loading/error/empty/data). View에 props 주입.
- **View**: props만 받아 렌더링. 로직 없음.

### UI 규칙 (`docs/13-design-system.md`)
- `<button>` → `Button` (variant/size)
- `<input>` → `TextField`
- flex div → `Flex` + `Spacing`
- 목록 항목 → `ListRow`
- 하단 고정 버튼 → `BottomCTASingle` / `FixedBottomCTA`
- 로딩 → `Skeleton`
- 피드백 → `useToast`
- 모달/폼 → `Modal` + `useModal`

### 에러 처리 (`docs/03-error-handling.md`)
```typescript
// 에러 코드 분기
if (isApiError(error) && error.code === 'FORBIDDEN') {
  toast.show({ message: '주장만 가능합니다', type: 'error' });
}
```

### API 클라이언트 (`docs/02-api-integration.md`)
```typescript
// http.post — 인증 필요 (privateApi)
// http.auth.post — 인증 불필요 (publicApi, 로그인/회원가입용)
```

---

## 구현 순서 (다음 세션)

```
1. schema.prisma 확장 + migrate
2. server: TeamsModule (controller/service/dto)
3. server: MatchesModule (controller/service/dto)
4. server: UsersController에 PATCH /me 추가
5. server: app.module.ts에 TeamsModule, MatchesModule import
6. client: (protected)/layout.tsx → MobileLayout + BottomTabBar
7. client: features/teams/ (schema → service → hooks → components)
8. client: features/matches/ (schema → service → hooks → components)
9. client: features/profile/ (schema → service → hooks → components)
10. client: dashboard/page.tsx 확장
11. client: team/page.tsx 신규
12. client: matches/page.tsx 신규
13. client: profile/page.tsx 신규
```
