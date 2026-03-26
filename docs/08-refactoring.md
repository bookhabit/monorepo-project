# 리팩터링: 코드 악취 식별 및 개선

## 코드 악취(Code Smell)란

코드 악취는 버그가 아니지만, 설계 문제를 암시하는 구조적 징후다.
기능은 동작하지만 이해·확장·테스트가 어려운 코드에서 나타난다.

---

## 주요 코드 악취와 개선 방법

### 1. Long Function (긴 함수)

**징후**: 함수가 50줄 이상, 여러 관심사가 혼재

```tsx
// ✕ 악취
function OrderForm() {
  // 상태 10개
  // 유효성 검사 로직
  // API 호출
  // 에러 처리
  // 렌더링
}

// ✓ 개선: 관심사 분리
function OrderForm() {
  const { form, errors } = useOrderForm();
  const { submit, isLoading } = useSubmitOrder();
  return <OrderFormView form={form} errors={errors} onSubmit={submit} isLoading={isLoading} />;
}
```

---

### 2. Large Component (거대 컴포넌트)

**징후**: 컴포넌트가 300줄 이상, props가 7개 이상

```tsx
// ✕ 악취
<LoanList
  data={data}
  isLoading={isLoading}
  error={error}
  page={page}
  pageSize={pageSize}
  sortBy={sortBy}
  sortOrder={sortOrder}
  filterStatus={filterStatus}
  filterRiskLevel={filterRiskLevel}
  onPageChange={...}
  onSortChange={...}
  onFilterChange={...}
/>

// ✓ 개선: 관련 props를 객체로 묶기
<LoanList
  data={data}
  loadingState={{ isLoading, error }}
  pagination={{ page, pageSize, onChange: onPageChange }}
  sort={{ sortBy, sortOrder, onChange: onSortChange }}
  filter={{ status: filterStatus, riskLevel: filterRiskLevel, onChange: onFilterChange }}
/>
```

---

### 3. Duplicate Code (중복 코드)

**징후**: 유사한 로직이 2곳 이상, Copy-Paste 냄새

```tsx
// ✕ 악취: 각 페이지마다 동일한 fetch 로직
// LoanListPage.tsx
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(false);
useEffect(() => {
  setIsLoading(true);
  fetch('/loans').then(r => r.json()).then(setData).finally(() => setIsLoading(false));
}, []);

// ✓ 개선: TanStack Query로 추출
const { data, isLoading } = useQuery({ queryKey: ['loans'], queryFn: fetchLoans });
```

---

### 4. Magic Number / Magic String

**징후**: 의미 없는 숫자·문자열이 코드 중간에 등장

```ts
// ✕ 악취
if (creditScore < 600) { ... }
setTimeout(callback, 3000);

// ✓ 개선
const MIN_CREDIT_SCORE_FOR_APPROVAL = 600;
const TOAST_DURATION_MS = 3000;

if (creditScore < MIN_CREDIT_SCORE_FOR_APPROVAL) { ... }
setTimeout(callback, TOAST_DURATION_MS);
```

---

### 5. Deeply Nested Code (깊은 중첩)

**징후**: if/for 중첩이 3단계 이상

```ts
// ✕ 악취
function process(transactions) {
  if (transactions) {
    for (const tx of transactions) {
      if (tx.status === 'suspicious') {
        if (tx.riskScore > 80) {
          // 처리 로직
        }
      }
    }
  }
}

// ✓ 개선: Early return + 필터
function process(transactions: Transaction[]) {
  if (!transactions) return;

  const highRiskSuspicious = transactions.filter(
    tx => tx.status === 'suspicious' && tx.riskScore > 80,
  );
  highRiskSuspicious.forEach(handleHighRisk);
}
```

---

### 6. Dead Code (죽은 코드)

**징후**: 사용되지 않는 변수, 주석 처리된 코드 블록, 미사용 import

```tsx
// ✕ 악취
import { unusedUtil } from '../utils'; // 미사용
const DEBUG_MODE = false; // 항상 false

// 예전 구현 주석처리
// const oldFetch = () => { ... }

// ✓ 개선: 삭제. 필요하면 git history에서 찾는다
```

---

### 7. Shotgun Surgery (산탄총 수술)

**징후**: 하나의 기능 변경이 10개 파일을 동시에 수정하게 만듦

```
// ✕ 악취: LoanStatus 타입이 여러 파일에 각각 정의됨
// loan-list.tsx: type Status = 'pending' | 'approved' | ...
// loan-detail.tsx: type Status = 'pending' | 'approved' | ...
// loan-badge.tsx: type Status = 'pending' | 'approved' | ...

// ✓ 개선: 한 곳에서 정의하고 import
// schemas/index.ts에서 LoanStatus 타입을 단일 정의
```

---

### 8. NestJS Controller 비대화

**징후**: Controller에 비즈니스 로직이 직접 구현됨

```ts
// ✕ 악취
@Post('review')
async reviewLoan(@Body() dto: ReviewLoanDto) {
  const loan = await this.db.findLoan(dto.id);
  if (loan.status !== 'under-review') throw new BadRequestException();
  loan.status = dto.status;
  loan.reviewedAt = new Date();
  await this.db.save(loan);
  await this.notificationService.send(loan.applicantId, '심사 완료');
}

// ✓ 개선: Service로 위임
@Post('review')
async reviewLoan(@Body() dto: ReviewLoanDto) {
  return this.loanService.review(dto);
}
```

---

## 리팩터링 절차

```
1. 테스트 확보  →  변경 전 동작을 보장하는 테스트 작성
2. 악취 식별    →  위 목록 기준으로 대상 코드 확인
3. 작은 단위    →  한 번에 하나의 악취만 제거
4. 테스트 통과  →  매 단계마다 테스트 실행
5. 커밋         →  refactor 타입으로 단독 커밋
```

> 리팩터링은 **기능 변경 없이** 구조만 개선한다.
> 기능 변경과 리팩터링을 같은 커밋에 섞지 않는다.
