# 클린코드 규칙

## 네이밍 규칙

### 컴포넌트: PascalCase, 역할이 명확하게

```typescript
// Good
function LoanApplicationRow({ application }: Props) {}
function OrderbookPriceCell({ price, quantity }: Props) {}

// Bad
function Item({ data }: Props) {}
function Cell({ v }: Props) {}
```

### 훅: use + 동사 + 명사

```typescript
// Good
function useLoanList(filters: LoanFilters) {}
function useOrderbookSubscription(symbol: string) {}
function useApproveLoan() {}

// Bad
function getData() {}
function hook() {}
```

### API 함수: 동사 + 명사 (CRUD 명확히)

```typescript
fetchLoanList(); // GET 목록
fetchLoanDetail(); // GET 단건
createLoanApplication(); // POST
approveLoan(); // PATCH (상태변경)
deleteLoan(); // DELETE
```

## 하드코딩 금지

```typescript
// Bad
if (user.role === 'TEAM_LEAD') {
}
setTimeout(() => {}, 3000);

// Good
const ROLES = { TEAM_LEAD: 'TEAM_LEAD', REVIEWER: 'REVIEWER' } as const;
const TOAST_DURATION_MS = 3_000;

if (user.role === ROLES.TEAM_LEAD) {
}
setTimeout(() => {}, TOAST_DURATION_MS);
```

## 예측 가능한 코드

- 함수는 하나의 일만
- 부작용(side effect)은 훅 안으로
- 조건부 렌더링은 early return 우선

```typescript
// Early return 패턴
function LoanRow({ application }: Props) {
  if (application.status === 'cancelled') return null;
  if (!application.reviewerId) return <PendingRow />;
  return <ReviewedRow application={application} />;
}
```

## 변경에 유연한 구조

- 매직 넘버/문자열 → 상수 파일
- 반복 UI → 컴포넌트 추출
- 비즈니스 규칙 → 훅/유틸 추출 (컴포넌트에서 제거)


# 한 눈에 읽기 쉬운 코드

/ ✅ 변경 전 (동작은 하지만 읽기 힘듦)
if (!teams || teams.length === 0) {
  return <NoTeamView />;
}

// ✅ 변경 후 (의도가 한 번에 읽힘)
const isEmptyTeams = !teams || teams.length === 0;

if (isEmptyTeams) {
  return <NoTeamView />;
}
1. 설명용 변수 (Explaining Variable)
가장 직접적인 표현입니다. 복잡한 조건문이나 계산식을 한 번에 이해하기 어려울 때, 그 결과를 의미 있는 이름의 변수에 할당하여 코드를 설명하는 방식입니다.

"조건식이 복잡해서 설명용 변수 isEmptyTeams를 도입해 가독성을 높였습니다."

2. 의미 있는 이름 (Meaningful Name)
클린 코드(Clean Code)의 저자 로버트 C. 마틴이 강조한 개념입니다. 단순히 데이터를 담는 그릇이 아니라, **"이 변수가 왜 존재하는지"**를 이름으로 나타내는 것을 말합니다.

3. 로직의 추상화 (Abstraction of Logic)
!teams || teams.length === 0이라는 **'어떻게(How)'**에 해당하는 세부 구현을 숨기고, isEmptyTeams라는 **'무엇(What)'**에 해당하는 개념으로 끌어올리는 것을 뜻합니다.