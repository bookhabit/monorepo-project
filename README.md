# 모노레포 연습

풀스택 모노레포입니다.
8개의 독립 앱이 공통 패키지를 공유하며, 각 앱마다 클라이언트(React/Next.js) + 서버(NestJS)로 구성됩니다.

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 패키지 매니저 | Yarn Berry 4.9.1 (`nodeLinker: node-modules`) |
| 모노레포 빌드 | Turborepo 2 |
| React 앱 (4개) | React 19 + Vite 6 + Emotion |
| Next.js 앱 (5개) | Next.js 15 App Router + Emotion SSR |
| 서버 (8개) | NestJS 11 + ts-node-dev |
| 상태 관리 | Jotai + TanStack Query v5 |
| 폼 | React Hook Form + Zod |
| 스타일 | Emotion (`css` prop + `styled`) |
| 타입스크립트 | TypeScript 5.8 (strict) |
| 린팅 | ESLint 10 flat config + @typescript-eslint |
| 포맷팅 | Prettier 3 |

---

## 프로젝트 구조

```
mono/
├── apps/
│   ├── funnel/          # 주식 계좌 개설 (React + Vite)
│   │   ├── client/      # :3001
│   │   └── server/      # :4001 (NestJS)
│   ├── orderbook/       # 실시간 호가창 (React + Vite)
│   │   ├── client/      # :3002
│   │   └── server/      # :4002
│   ├── dashboard/       # 보유 자산 대시보드 (React + Vite)
│   │   ├── client/      # :3003
│   │   └── server/      # :4003
│   ├── notification/    # 알림 센터 (React + Vite)
│   │   ├── client/      # :3004
│   │   └── server/      # :4004
│   ├── loan-admin/      # 대출 심사 Admin (Next.js)
│   │   ├── client/      # :3005
│   │   └── server/      # :4005
│   ├── fds/             # 이상 거래 탐지 (Next.js)
│   │   ├── client/      # :3006
│   │   └── server/      # :4006
│   ├── console/         # 고객 상담 콘솔 (Next.js)
│   │   ├── client/      # :3007
│   │   └── server/      # :4007
│   ├── report/          # 운영 리포트 (Next.js)
│   │   ├── client/      # :3008
│   │   └── server/      # :4008
│   └── design-system/   # 디자인 시스템 쇼케이스 (Next.js)
│       └── client/      # :3009
│
├── packages/
│   ├── tsconfig/        # 공통 TypeScript 설정 (base/react/nextjs/nestjs)
│   ├── shared/          # 공통 타입 & 유틸 (API 응답 래퍼, 페이지네이션)
│   └── ui/              # 공통 디자인 시스템 (Emotion)
│
├── docs/                # 개발 가이드 문서
├── turbo.json           # Turborepo 파이프라인
├── eslint.config.mjs    # ESLint 10 flat config
└── .prettierrc          # Prettier 설정
```

---

## 포트 전략

| 앱 | 클라이언트 | 서버 | 프레임워크 |
|----|-----------|------|-----------|
| funnel | 3001 | 4001 | React + Vite |
| orderbook | 3002 | 4002 | React + Vite |
| dashboard | 3003 | 4003 | React + Vite |
| notification | 3004 | 4004 | React + Vite |
| loan-admin | 3005 | 4005 | Next.js |
| fds | 3006 | 4006 | Next.js |
| console | 3007 | 4007 | Next.js |
| report | 3008 | 4008 | Next.js |
| **design-system** | **3009** | — | **Next.js** |

---

## 공유 패키지

### `@mono/tsconfig`
TypeScript 설정 프리셋.

| 파일 | 용도 |
|------|------|
| `base.json` | strict 기반 공통 설정 |
| `react.json` | Vite React 앱용 (jsx: react-jsx, noEmit) |
| `nextjs.json` | Next.js 앱용 (jsx: preserve) |
| `nestjs.json` | NestJS 서버용 (emitDecoratorMetadata, CommonJS) |

### `@mono/shared`
공통 타입 + 유틸.

```
src/
├── types/
│   ├── api.ts         # ApiResponse<T>, PaginatedResponse<T>
│   └── pagination.ts  # PaginationParams, SortParams
└── utils/
    └── type-guards.ts # isApiSuccess, isApiError, isDefined
```

> 도메인 스키마(Zod)는 각 앱 클라이언트의 `src/schemas/`에서 관리.
> NestJS 서버 검증은 각 앱 서버의 `src/dto/`에서 class-validator로 관리.

### `@mono/ui`
Emotion 기반 디자인 시스템. → **[쇼케이스: http://localhost:3009](http://localhost:3009)**

```
src/
├── foundation/
│   ├── colors.ts      # 9가지 컬러 팔레트 + Grey Opacity + 시맨틱 토큰
│   ├── typography.ts  # t1~t7 + sub1~sub13 스케일, CSS 변수 기반
│   ├── spacing.ts     # 4px 베이스, 8의 배수 시스템 (rem)
│   └── theme.ts       # Emotion 테마 + globalStyles
└── components/
    ├── layout/
    │   ├── Box         # 레이아웃 박스 (padding, margin, display 등)
    │   ├── Flex        # Flexbox 선언적 레이아웃
    │   ├── Grid        # CSS Grid 레이아웃
    │   ├── Spacing     # 수직/수평 간격
    │   └── BottomCTA   # Single / Double / FixedBottomCTA
    ├── general/
    │   ├── Button      # variant(primary/secondary/ghost/danger) × size(small/medium/large)
    │   ├── Input       # label, errorMessage, hint
    │   ├── Select      # 스타일드 네이티브 select
    │   ├── Checkbox    # 커스텀 체크박스 (indeterminate 지원)
    │   ├── Switch      # 애니메이션 토글 스위치
    │   ├── TextField   # 향상된 입력 (clear 버튼, maxLength 카운터)
    │   ├── SplitTextField  # OTP 스타일 분할 입력
    │   ├── TextArea    # 자동 높이 조절 텍스트에어리어
    │   └── ListRow     # 리스트 행 (left/title/description/right 슬롯)
    └── feedback/
        ├── Toast       # 슬라이드 인 알림
        ├── Skeleton    # shimmer 로딩 플레이스홀더
        ├── Modal       # Portal 기반 모달 (Escape/backdrop 닫기)
        ├── AlertDialog # 확인 다이얼로그
        └── ConfirmDialog # 취소/확인 다이얼로그
```

---

## Turborepo 파이프라인

```
build ──── dependsOn: [^build]   캐시 O  → dist/, .next/
dev ─────── dependsOn: [^build]   캐시 X  (persistent)
lint ──────────────────────────   캐시 O
type-check ─ dependsOn: [^build]  캐시 O
test ──────── dependsOn: [^build]  캐시 O  → coverage/
clean ─────────────────────────   캐시 X
```

패키지 빌드 순서: `@mono/tsconfig` → `@mono/shared` → `@mono/ui` → 각 앱

---

## 실행 명령어

### 전체 실행

```bash
# 의존성 설치
yarn install

# 전체 개발 서버 실행 (17개 동시)
yarn dev

# 전체 프로덕션 빌드
yarn build

# 전체 타입 체크
yarn type-check

# 전체 린트
yarn lint

# 코드 포맷팅
yarn format

# 포맷 검사
yarn format:check

# 빌드 캐시 및 dist 정리
yarn clean
```

### 디자인 시스템 쇼케이스

```bash
# 디자인 시스템만 실행 → http://localhost:3009
yarn workspace @mono/design-system-client dev

# 또는 Turborepo 필터 사용
yarn turbo run dev --filter=@mono/design-system-client
```

### 특정 앱만 실행

```bash
# 클라이언트 + 서버 동시
yarn turbo run dev --filter=@mono/funnel-client --filter=@mono/funnel-server

# 클라이언트만
yarn workspace @mono/funnel-client dev

# 서버만
yarn workspace @mono/funnel-server dev
```

---

## 개발 환경 설정

### 요구 사항

- Node.js 20+
- Yarn Berry (corepack으로 자동 관리)

```bash
corepack enable
yarn install
```

### VS Code 설정

프로젝트 루트의 `.vscode/settings.json`이 자동 적용됩니다.
처음 열었을 때 TypeScript 버전 선택 팝업이 뜨면 **"Use Workspace Version"** 선택.

수동 적용: `Cmd+Shift+P` → `TypeScript: Select TypeScript Version` → `Use Workspace Version`

---

## 문서

| 파일 | 내용 |
|------|------|
| `docs/01-separation-of-concerns.md` | 관심사 분리 가이드 |
| `docs/02-api-integration.md` | API 연동 패턴 |
| `docs/03-error-handling.md` | 에러 처리 전략 |
| `docs/04-clean-code.md` | 클린 코드 원칙 |
| `docs/05-performance.md` | 성능 최적화 |
| `docs/06-testing.md` | 테스트 전략 |
| `docs/07-commit-convention.md` | 커밋 컨벤션 |
| `docs/08-refactoring.md` | 코드 악취 식별 및 개선 |
| `docs/09-security.md` | 프론트/백엔드 보안 수칙 |
| `docs/10-deployment.md` | 배포 프로세스 및 환경 설정 |

---

## 커밋 컨벤션 요약

```
<type>(<scope>): <subject>
```

`feat` · `fix` · `refactor` · `style` · `test` · `docs` · `chore` · `perf` · `ci` · `revert`

scope: `funnel` · `orderbook` · `dashboard` · `notification` · `loan-admin` · `fds` · `console` · `report` · `ui` · `shared` · `config`

자세한 내용은 [docs/07-commit-convention.md](docs/07-commit-convention.md) 참조.
