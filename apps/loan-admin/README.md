# 대규모 대출 심사 승인 대시보드 (Admin)

> **⚠️ 구현 중 AI 사용 금지**

---

## 과제 개요

심사역이 **1만 건**의 대출 신청을 효율적으로 처리할 수 있는 고효율 운영 툴을 구현합니다.

필터 URL 동기화, 일괄 처리, 심사 이력 사이드바, 가상 리스트, 역할 기반 UI 분기(RBAC)를 모두 아우르는 종합 과제입니다.

---

## 세부 요구사항

### 1. Server-side Filtering (Next.js)
`searchParams`를 활용해 필터 상태를 URL에 동기화합니다.
새로고침, 뒤로가기 후에도 필터가 유지됩니다.

### 2. 일괄 처리 (Batch Action)
체크박스로 여러 건 선택 후 **일괄 승인/거절**을 처리합니다.
낙관적 업데이트로 서버 응답 전 UI를 즉시 반영합니다.

### 3. 심사 이력 타임라인
특정 신청건 클릭 시 우측 Drawer에서 심사 이력을 표시합니다.
Drawer 상태는 `Zustand`로 관리합니다.

### 4. 가상 리스트 (Virtualization)
1만 건 렌더링을 위해 `Windowing` 기법을 적용합니다.
(`@tanstack/react-virtual` 또는 `react-window` 등)

### 5. 권한 기반 UI (RBAC)

| 역할 | 승인 | 거절 | 거절취소 | 일괄거절 |
|------|------|------|----------|----------|
| `reviewer` (일반 심사역) | ✅ | ❌ | ❌ | ❌ |
| `manager` (팀장) | ✅ | ✅ | ✅ | ✅ |
| `admin` | ✅ | ✅ | ✅ | ✅ |

---

## 참고 자료

| 자료 | 설명 |
|------|------|
| 피그마 디자인 | 테이블, 필터 바, Drawer 레이아웃 참고 |
| `example-project/` | 기능이 완성된 레퍼런스 구현체 (구조·UX 참고용) |
| API 명세 | 아래 **API 명세** 섹션 참고 |

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | **Next.js 15** + TypeScript |
| 스타일링 | Emotion (styled) |
| 서버 상태 | TanStack React Query v5 |
| UI 상태 (Drawer) | **Zustand** |
| 폼/필터 | React Hook Form + Zod |
| 가상 리스트 | @tanstack/react-virtual 등 자유 선택 |

---

## API 명세

서버는 `http://localhost:4005` 에서 실행됩니다.
Swagger 문서: `http://localhost:4005/api-docs`

### RBAC — 역할 전달 방식

모든 요청 헤더에 `x-user-role`을 포함합니다.

```
x-user-role: reviewer | manager | admin
```

헤더가 없으면 `reviewer`(최소 권한)로 처리됩니다.

---

### `GET /loans` — 목록 조회 (서버사이드 필터 + 페이지네이션)

```ts
// Query Parameters
{
  status?:         'pending' | 'reviewing' | 'approved' | 'rejected'
  riskLevel?:      'low' | 'medium' | 'high'
  search?:         string   // 신청인명 또는 신청ID 검색
  minAmount?:      string   // 최소 대출금액
  maxAmount?:      string   // 최대 대출금액
  minCreditScore?: string   // 최소 신용점수
  page?:           string   // 기본 1
  pageSize?:       string   // 기본 20
}

// Response
interface LoanPage {
  data: LoanApplication[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface LoanApplication {
  id: string;              // "LOAN-000001"
  applicantName: string;
  applicantId: string;
  amount: number;
  purpose: string;
  creditScore: number;     // 500~1000
  monthlyIncome: number;
  employmentYears: number;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  appliedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  riskLevel: 'low' | 'medium' | 'high';
  documents: string[];
}
```

**Next.js searchParams 연동 예시:**
```tsx
// app/loans/page.tsx
export default async function Page({ searchParams }) {
  const params = new URLSearchParams(searchParams);
  const data = await fetch(`http://localhost:4005/loans?${params}`).then(r => r.json());
  // ...
}
```

---

### `GET /loans/:id` — 단건 조회

```ts
// Response: LoanApplication
```

---

### `GET /loans/:id/history` — 심사 이력

```ts
// Response: LoanReviewHistory[]
interface LoanReviewHistory {
  id: string;
  applicationId: string;
  action: 'submitted' | 'approved' | 'rejected' | 'review_started' | 'rejection_cancelled';
  performedBy: string;
  performedAt: string;
  note?: string;
  previousStatus?: string;
  newStatus?: string;
}
```

---

### `PATCH /loans/:id/review` — 단건 승인/거절

```ts
// Header: x-user-role
// Body
{ status: 'approved' | 'rejected', notes?: string }

// Response: LoanApplication (업데이트된 객체)
// 403: reviewer가 rejected 시도 시
```

---

### `PATCH /loans/:id/cancel-rejection` — 거절 취소

```ts
// Header: x-user-role (manager 이상 필수)

// Response: LoanApplication
// 403: reviewer 시도 시
// 403: 거절 상태가 아닌 건 시도 시
```

---

### `POST /loans/batch-approve` — 일괄 승인

```ts
// Header: x-user-role
// Body: { ids: string[] }

// Response: { message: 'N건이 승인 처리되었습니다.' }
// 500: 5% 확률 실패 → 롤백 필요
```

---

### `POST /loans/batch-reject` — 일괄 거절

```ts
// Header: x-user-role (manager 이상 필수)
// Body: { ids: string[] }

// Response: { message: 'N건이 거절 처리되었습니다.' }
// 403: reviewer 시도 시
// 500: 5% 확률 실패 → 롤백 필요
```

---

## 구현 플로우

> AI 사용 금지. 아래 순서를 지키세요.

### 1단계 — 요구사항 분석

- Next.js 15 App Router의 `searchParams` 활용 방식 파악
- Zustand store 설계 (Drawer 상태, 선택된 신청 ID)
- RBAC 선언적 구현 방식 결정 (HOC / Context / 컴포넌트 분기)
- 가상 리스트 라이브러리 선택

### 2단계 — 아키텍처 설계

**URL ↔ 필터 동기화:**
```
URL searchParams
  ↕ (useRouter, useSearchParams)
FilterBar 컴포넌트 → GET /loans?status=...&page=...
```

**Zustand Drawer Store:**
```ts
interface DrawerStore {
  isOpen: boolean;
  selectedLoanId: string | null;
  open: (id: string) => void;
  close: () => void;
}
```

**RBAC 선언적 분기 제안:**
```tsx
<RoleGuard allow={['manager', 'admin']}>
  <RejectButton />
</RoleGuard>

<RoleGuard allow={['manager', 'admin']}>
  <CancelRejectionButton />
</RoleGuard>
```

### 3단계 — 기능 구현

권장 순서:

1. **필터 + 목록** — `GET /loans` + searchParams URL 동기화
2. **가상 리스트** — Windowing 적용 (1만 건 성능)
3. **체크박스 선택** — 전체/개별 선택 상태 관리
4. **일괄 처리** — Optimistic Update + 실패 롤백
5. **Drawer + 이력** — Zustand 상태 + `GET /loans/:id/history`
6. **RBAC** — 역할에 따른 버튼 노출/숨김 처리
7. **단건 승인/거절/거절취소** — 역할 검증 포함

### 4단계 — 리팩토링

- 필터 훅 분리 (`useLoanFilters`)
- 테이블 Row 메모이제이션 (`React.memo`)
- Batch Action 훅 분리

### 5단계 — README 작성

`apps/loan-admin/client/README.md` 에 아래 내용을 작성합니다.

| 항목 | 내용 |
|------|------|
| Architecture | searchParams 필터 전략, Zustand/React Query 경계 |
| Performance Optimization | 가상 리스트 적용 이유와 방법, 체크박스 최적화 |
| Troubleshooting | Next.js App Router + React Query 통합 이슈 등 |
| Self-Evaluation | 시간이 더 있었다면 보완하고 싶은 점 |

---

## PR 가이드

```
feat: 대출 목록 조회 및 서버사이드 필터 구현 (searchParams)
feat: 가상 리스트 적용 (react-virtual)
feat: 체크박스 선택 및 일괄 승인/거절 구현
feat: 심사 이력 Drawer 구현 (Zustand)
feat: RBAC 역할 기반 UI 분기 구현
refactor: useLoanFilters 훅 분리
```

---

## 개발 환경 실행

```bash
# 루트에서
yarn dev

# 서버만
cd apps/loan-admin/server && yarn dev   # http://localhost:4005

# 클라이언트만 (Next.js)
cd apps/loan-admin/client && yarn dev   # http://localhost:3005
```

---

## 평가 기준 참고

1. **searchParams 활용** — 필터가 URL에 정확히 반영되고 새로고침 후 복원되는가
2. **가상 리스트** — 1만 건에서 스크롤 성능이 부드러운가
3. **Optimistic Update** — 일괄 처리 실패 롤백이 자연스러운가
4. **RBAC 선언성** — 역할 분기가 컴포넌트 트리에서 읽기 쉬운가
5. **Zustand 활용** — Drawer 상태 관리가 간결한가
