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
| Next.js 앱 (4개) | Next.js 15 App Router + Emotion SSR |
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
│   └── report/          # 운영 리포트 (Next.js)
│       ├── client/      # :3008
│       └── server/      # :4008
│
├── packages/
│   ├── tsconfig/        # 공통 TypeScript 설정 (base/react/nextjs/nestjs)
│   ├── shared/          # 공통 타입 & Zod 스키마
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
Zod 스키마 + 공통 타입.

```
src/
├── schemas/
│   ├── funnel.ts      # 계좌 개설 단계 스키마
│   ├── orderbook.ts   # 호가 데이터 스키마
│   ├── loan.ts        # 대출 심사 스키마
│   ├── fds.ts         # 이상 거래 탐지 스키마
│   └── common.ts      # 공통 스키마
├── types/
│   ├── api.ts         # API 응답 래퍼 타입
│   └── pagination.ts  # 페이지네이션 타입
└── utils/
    └── type-guards.ts # 런타임 타입 가드
```

### `@mono/ui`
Emotion 기반 디자인 시스템.

```
src/
├── foundation/
│   ├── colors.ts      # 컬러 토큰 (blue500: #3182F6 등)
│   ├── typography.ts  # 텍스트 스타일 시스템
│   ├── spacing.ts     # 간격 시스템
│   └── theme.ts       # Emotion ThemeProvider 테마
└── components/
    ├── general/
    │   ├── Button      # variant(primary/secondary/ghost/danger) × size(sm/md/lg)
    │   └── Input       # label, errorMessage, hint 지원
    ├── feedback/
    │   ├── Toast       # 슬라이드 인 애니메이션
    │   └── Skeleton    # shimmer 애니메이션
    └── layout/
        ├── Box         # display/padding/margin 등 레이아웃 박스
        ├── Flex        # flexbox 레이아웃
        └── Spacing     # 수직/수평 간격 컴포넌트
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

# 전체 개발 서버 실행 (16개 동시)
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

### 특정 앱만 실행

```bash
# 특정 앱 클라이언트 개발 서버
yarn workspace @mono/funnel-client dev
yarn workspace @mono/orderbook-client dev

# 특정 앱 서버 개발 실행
yarn workspace @mono/funnel-server dev
yarn workspace @mono/orderbook-server dev

# Turborepo 필터로 특정 앱만 빌드
yarn turbo run build --filter=@mono/funnel-client
yarn turbo run dev --filter=@mono/funnel-client --filter=@mono/funnel-server
```

---

## 개발 환경 설정

### 요구 사항

- Node.js 20+
- Yarn Berry (corepack으로 자동 관리)

```bash
corepack enable
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

---

## 커밋 컨벤션 요약

```
<type>(<scope>): <subject>
```

`feat` · `fix` · `refactor` · `style` · `test` · `docs` · `chore` · `perf` · `ci` · `revert`

scope: `funnel` · `orderbook` · `dashboard` · `notification` · `loan-admin` · `fds` · `console` · `report` · `ui` · `shared` · `config`

자세한 내용은 [docs/07-commit-convention.md](docs/07-commit-convention.md) 참조.
