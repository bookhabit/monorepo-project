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
