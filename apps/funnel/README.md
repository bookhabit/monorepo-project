# 선언적 Funnel 기반 주식 계좌 개설 워크플로우 (모바일 웹뷰형)

> **⚠️ 구현 중 AI 사용 금지**

---

## 과제 개요

사용자로부터 많은 정보를 입력받는 다단계 폼에서 **뒤로 가기 대응**, **입력 데이터 유지**, **단계별 유효성 검사**를 얼마나 깔끔한 Funnel 아키텍처로 풀어내는지가 핵심입니다.

---

## Funnel 단계

```
약관동의 → 본인인증 → 정보입력 → 완료
```

| 단계 | 설명 |
|------|------|
| 약관동의 | 필수/선택 약관 체크 |
| 본인인증 | 휴대폰 번호 입력 → 인증번호 발송 → 6자리 확인 |
| 정보입력 | 이름, 생년월일, 주소, 직업, 소득, 투자성향 입력 |
| 완료 | 개설된 계좌번호 표시 |

---

## 세부 요구사항

### 1. Step 기반 UI
각 단계를 독립된 컴포넌트로 구성하고, Funnel 컴포넌트가 현재 step에 따라 렌더링을 선언적으로 제어합니다.

### 2. 데이터 퍼시스턴스
`Jotai`의 `atomWithStorage`를 사용해 각 단계 입력값을 `localStorage`에 동기화합니다.
새로고침 후 재진입 시 **마지막 완료 단계부터 재개**됩니다.

### 3. 선언적 에러 처리
API 호출 실패(10% 확률) 시 `ErrorBoundary` + `Suspense`로 재시도 UI를 표시합니다.
- `Suspense`: 로딩 스피너
- `ErrorBoundary`: "다시 시도" 버튼 포함 에러 화면

### 4. GitHub Actions 정적 분석
특정 단계 완료 시 정적 분석이 수행되는 과정을 아래 **CI/CD 섹션**에 명시합니다.

---

## 참고 자료

| 자료 | 설명 |
|------|------|
| 피그마 디자인 | 각 단계별 모바일 UI 레이아웃 참고 |
| `example-project/` | 기능이 완성된 레퍼런스 구현체 (구조·UX 참고용) |
| API 명세 | 아래 **API 명세** 섹션 참고 |

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | React 19 + TypeScript |
| 빌드 | Vite |
| 스타일링 | Emotion (styled) |
| 서버 상태 | TanStack React Query v5 |
| 클라이언트 상태 | **Jotai + atomWithStorage** |
| 폼 검증 | React Hook Form + Zod |

---

## API 명세

서버는 `http://localhost:4001` 에서 실행됩니다.
Swagger 문서: `http://localhost:4001/api-docs`

> 모든 API는 **10% 확률로 랜덤 실패**를 반환합니다. ErrorBoundary 구현에 활용하세요.

### `POST /verification/send` — 인증번호 발송

```ts
// Request Body
{ phoneNumber: string }  // "010-0000-0000" 형식

// Response 200
{ message: '인증번호가 발송되었습니다.' }

// Response 400 (10% 확률)
{ message: '인증번호 발송에 실패했습니다. 다시 시도해주세요.' }
```

> 데모: 인증번호는 항상 `123456`

### `POST /verification/verify` — 인증번호 확인

```ts
// Request Body
{ phoneNumber: string, code: string }

// Response 200
{ verified: boolean }  // 6자리 숫자면 true

// Response 400 (10% 확률)
{ message: '인증 확인에 실패했습니다. 다시 시도해주세요.' }
```

### `POST /account/apply` — 계좌 개설 신청

```ts
// Request Body
{
  personalInfo: {
    name: string;        // 2자 이상
    birthDate: string;   // "YYYY-MM-DD"
    phone: string;       // "010-0000-0000"
    email: string;
  },
  agreement: {
    allAgreed: boolean;
    termsOfService: boolean;   // 필수
    privacyPolicy: boolean;    // 필수
    marketingOptIn: boolean;   // 선택
  },
  investmentType: {
    type: 'conservative' | 'moderate' | 'aggressive';
    experience: 'none' | 'beginner' | 'intermediate' | 'expert';
  }
}

// Response 201
{ accountNumber: string, createdAt: string }
// 예: { accountNumber: "110-123456789", createdAt: "2026-03-31T..." }

// Response 400 (10% 확률 또는 필수 약관 미동의)
{ message: '계좌 개설 신청에 실패했습니다. 다시 시도해주세요.' }
```

---

## 구현 플로우

> AI 사용 금지. 아래 순서를 지키세요.

### 1단계 — 요구사항 분석

- Funnel 컴포넌트 설계 방식 결정 (render props / compound component 등)
- `atomWithStorage` 키 전략 결정 (단계별 vs 통합)
- ErrorBoundary 경계를 어느 레벨에 둘지 결정

### 2단계 — 아키텍처 설계

**Funnel 구조 제안:**
```tsx
<Funnel step={currentStep}>
  <Funnel.Step name="약관동의"><TermsStep /></Funnel.Step>
  <Funnel.Step name="본인인증"><IdentityStep /></Funnel.Step>
  <Funnel.Step name="정보입력"><InfoStep /></Funnel.Step>
  <Funnel.Step name="완료"><CompleteStep /></Funnel.Step>
</Funnel>
```

**상태 설계:**
```ts
// Jotai atoms (atomWithStorage로 localStorage 동기화)
currentStepAtom       // 현재 단계
termsDataAtom         // 약관 동의 데이터
identityDataAtom      // 본인인증 데이터
informationDataAtom   // 정보 입력 데이터
completeDataAtom      // 완료 데이터 (계좌번호)
```

**ErrorBoundary 배치:**
```
<ErrorBoundary fallback={<RetryUI />}>
  <Suspense fallback={<Spinner />}>
    <각 Step 내 API 호출 컴포넌트>
  </Suspense>
</ErrorBoundary>
```

### 3단계 — 기능 구현

권장 구현 순서:

1. **Funnel 컴포넌트** 구현 (step 전환 로직)
2. **약관동의 Step** — 전체 동의 / 개별 동의 연동
3. **본인인증 Step** — `POST /verification/send` + `POST /verification/verify`
4. **정보입력 Step** — React Hook Form + Zod 유효성 검증
5. **완료 Step** — `POST /account/apply` + 계좌번호 표시
6. **ErrorBoundary** 적용 및 재시도 UI 구현
7. **데이터 퍼시스턴스** 검증 — 각 단계에서 새로고침 후 상태 유지 확인

### 4단계 — 리팩토링

- Funnel 훅 분리 (`useFunnel`)
- 각 Step 컴포넌트에서 관심사 분리 (뷰 / 폼 로직 / API 호출)
- 뒤로 가기 엣지케이스 처리

### 5단계 — README 작성

`apps/funnel/client/README.md` 에 아래 내용을 작성합니다.

| 항목 | 내용 |
|------|------|
| Architecture | Funnel 구현 방식 선택 이유, atomWithStorage 전략 |
| Performance Optimization | 불필요한 리렌더링 방지 전략 |
| Troubleshooting | 뒤로가기 처리, ErrorBoundary 경계 설정 이슈 등 |
| Self-Evaluation | 시간이 더 있었다면 보완하고 싶은 점 |

---

## CI/CD — GitHub Actions 정적 분석

과제에서는 실제 Actions 실행 대신, **아래 워크플로우가 어떻게 동작하는지 README에 명시**하는 것이 요구사항입니다.

### 모사 시나리오

```
정보입력 Step 완료 (POST /account/apply 성공)
         ↓
GitHub Actions 트리거 (push to feature branch)
         ↓
┌─────────────────────────────┐
│   static-analysis.yml       │
├─────────────────────────────┤
│ 1. yarn type-check          │ ← TypeScript 타입 오류 검출
│ 2. yarn lint                │ ← ESLint 규칙 위반 검출
│ 3. yarn build               │ ← 빌드 성공 여부 확인
└─────────────────────────────┘
         ↓
PR 머지 가능 여부 결정
```

### 워크플로우 파일 예시

```yaml
# .github/workflows/static-analysis.yml
name: Static Analysis

on:
  push:
    paths:
      - 'apps/funnel/**'

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: yarn install
      - run: yarn workspace @mono/funnel-client type-check
      - run: yarn workspace @mono/funnel-client lint
      - run: yarn workspace @mono/funnel-client build
```

> 클라이언트 README에는 "이 워크플로우가 왜 필요한가", "어떤 오류를 사전에 잡을 수 있는가"를 서술하세요.

---

## PR 가이드

```
feat: Funnel 컴포넌트 및 step 전환 로직 구현
feat: 본인인증 step 구현 (SMS 인증번호 발송/확인)
feat: 정보입력 step 구현 (React Hook Form + Zod)
feat: atomWithStorage로 단계별 데이터 퍼시스턴스 구현
feat: ErrorBoundary + Suspense 선언적 에러 처리 적용
refactor: useFunnel 훅 분리
```

---

## 개발 환경 실행

```bash
# 루트에서
yarn dev

# 서버만
cd apps/funnel/server && yarn dev   # http://localhost:4001

# 클라이언트만
cd apps/funnel/client && yarn dev   # http://localhost:3001
```

---

## 평가 기준 참고

1. **Funnel 선언성** — step 전환 로직이 명시적이고 읽기 쉬운가
2. **데이터 퍼시스턴스** — 새로고침 후 입력값이 정확히 복원되는가
3. **에러 처리** — ErrorBoundary 경계가 적절하고 UX가 자연스러운가
4. **폼 유효성** — 단계별 검증이 누락 없이 작동하는가
5. **코드 품질** — 관심사 분리, 타입 안전성, 재사용 가능한 Funnel 추상화
