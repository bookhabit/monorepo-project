# 고객 상담 통합 콘솔

고객 정보 조회, 거래 내역 확인, 상담 이력 관리를 하나의 화면에서 처리하는 CS 상담원용 통합 콘솔입니다.

---

## 서버 실행

```bash
cd apps/console/server
yarn install
yarn start:dev
# http://localhost:3006
# Swagger: http://localhost:3006/api
```

---

## API 명세

### 고객

| Method | Path | 설명 |
|--------|------|------|
| GET | `/customers` | 고객 목록 조회 |
| GET | `/customers/:id` | 고객 상세 조회 |
| GET | `/customers/:id/transactions` | 고객 거래 내역 (최근 20건) |
| GET | `/customers/:customerId/consultations` | 고객 상담 이력 |

#### GET /customers 쿼리 파라미터

| 파라미터 | 타입 | 설명 |
|---------|------|------|
| search | string | 이름/이메일/전화번호 검색 |
| tier | `vip\|gold\|silver\|bronze` | 고객 등급 필터 |
| status | `active\|dormant\|restricted` | 고객 상태 필터 |

#### 고객 응답 예시

```json
{
  "id": "CUST-0001",
  "name": "김민준",
  "email": "customer1@example.com",
  "phone": "010-1234-5678",
  "tier": "vip",
  "status": "active",
  "joinedAt": "2023-01-15T00:00:00.000Z",
  "totalAssets": 45000000,
  "creditScore": 820
}
```

#### 거래 내역 응답 예시

```json
{
  "id": "TXN-CUST-0001-001",
  "customerId": "CUST-0001",
  "type": "deposit",
  "amount": 1000000,
  "description": "급여 입금",
  "createdAt": "2025-03-30T12:00:00.000Z"
}
```

### 상담

| Method | Path | 설명 |
|--------|------|------|
| GET | `/templates` | 상담 템플릿 목록 |
| POST | `/consultations` | 상담 내용 저장 |

#### GET /templates 쿼리 파라미터

| 파라미터 | 타입 | 설명 |
|---------|------|------|
| category | `account\|loan\|card\|investment\|technical\|complaint` | 카테고리 필터 (선택) |

#### 템플릿 응답 예시

```json
{
  "id": "TPL-001",
  "category": "account",
  "title": "계좌 비밀번호 초기화",
  "content": "고객님의 계좌 비밀번호 초기화 요청을 접수하였습니다...",
  "usageCount": 245
}
```

#### POST /consultations 요청 바디

```json
{
  "customerId": "CUST-0001",
  "category": "account",
  "subject": "계좌 비밀번호 초기화 요청",
  "content": "고객님의 요청을 처리하였습니다.",
  "priority": "medium",
  "tags": ["일반", "비밀번호"]
}
```

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| customerId | string | ✓ | 고객 ID |
| category | `account\|loan\|card\|investment\|technical\|complaint` | ✓ | 상담 카테고리 |
| subject | string | ✓ | 상담 제목 |
| content | string | ✓ | 상담 내용 |
| priority | `low\|medium\|high\|urgent` | ✓ | 우선순위 |
| tags | string[] | - | 태그 목록 |

#### 상담 응답 예시

```json
{
  "id": "CONS-CUST-0001-1711890000000",
  "customerId": "CUST-0001",
  "agentId": "AGENT-CURRENT",
  "agentName": "현재 상담원",
  "category": "account",
  "subject": "계좌 비밀번호 초기화 요청",
  "content": "고객님의 요청을 처리하였습니다.",
  "status": "open",
  "priority": "medium",
  "createdAt": "2025-03-31T12:00:00.000Z",
  "updatedAt": "2025-03-31T12:00:00.000Z",
  "tags": ["일반"]
}
```

---

## 구현 흐름

### 1단계: 레이아웃 — Parallel Routes + Zustand

```
app/
  layout.tsx          ← 좌측 고객 목록 + 우측 슬롯
  @detail/
    page.tsx          ← 고객 상세 (선택 없을 때 empty state)
  @consultation/
    page.tsx          ← 상담 영역 (선택 없을 때 empty state)
```

- 좌측 고객 목록과 우측 패널을 **Parallel Routes**(`@detail`, `@consultation`)로 분리
- Zustand store에 `selectedCustomerId`를 저장하여 두 슬롯이 동기화
- 고객 선택 시 URL 변경 없이 양쪽 패널이 동시에 업데이트

```typescript
// store/customerStore.ts
interface CustomerStore {
  selectedCustomerId: string | null;
  setSelectedCustomerId: (id: string) => void;
}

const useCustomerStore = create<CustomerStore>((set) => ({
  selectedCustomerId: null,
  setSelectedCustomerId: (id) => set({ selectedCustomerId: id }),
}));
```

### 2단계: 고객 목록 — 검색/필터

- `search`, `tier`, `status` 쿼리 파라미터를 `useSearchParams`로 읽기
- 필터 변경 시 `router.push`로 URL 동기화 (새로고침 후에도 유지)
- 50명의 고객 목록, 서버사이드 필터링

### 3단계: 고객 상세 — 독립 Suspense

```tsx
// @detail/page.tsx
export default function DetailPage() {
  const customerId = useCustomerStore((s) => s.selectedCustomerId);
  if (!customerId) return <EmptyState />;

  return (
    <div>
      {/* 각 섹션이 독립적으로 데이터를 fetch하고 Suspense */}
      <Suspense fallback={<CustomerInfoSkeleton />}>
        <CustomerInfo customerId={customerId} />
      </Suspense>
      <Suspense fallback={<TransactionSkeleton />}>
        <TransactionList customerId={customerId} />
      </Suspense>
    </div>
  );
}
```

- 고객 정보와 거래 내역을 **각각 독립 Suspense**로 감싸기
- 스켈레톤 UI로 로딩 상태 표현
- Server Component에서 직접 fetch

### 4단계: 상담 패널 — 템플릿 삽입

```tsx
// @consultation/page.tsx
export default function ConsultationPage() {
  const customerId = useCustomerStore((s) => s.selectedCustomerId);
  if (!customerId) return <EmptyState />;

  return (
    <div>
      <Suspense fallback={<ConsultationHistorySkeleton />}>
        <ConsultationHistory customerId={customerId} />
      </Suspense>
      <ConsultationForm customerId={customerId} />
    </div>
  );
}
```

- 상담 이력과 작성 폼을 상단/하단으로 배치
- 템플릿 선택 시 폼의 `content` 필드에 자동 삽입

```typescript
// 템플릿 삽입 핸들러
const handleTemplateSelect = (template: ConsultationTemplate) => {
  setContent(template.content);
  setCategory(template.category);
};
```

---

## 구현 포인트

### Parallel Routes로 독립적인 패널 관리

Next.js App Router의 Parallel Routes를 활용하면 URL 변경 없이 여러 패널을 독립적으로 렌더링할 수 있습니다. `layout.tsx`에서 `@detail`과 `@consultation` 슬롯을 받아 좌우 패널에 배치하세요.

```typescript
// app/layout.tsx
export default function Layout({
  children,
  detail,
  consultation,
}: {
  children: React.ReactNode;
  detail: React.ReactNode;
  consultation: React.ReactNode;
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 1fr' }}>
      {children}  {/* 고객 목록 */}
      {detail}
      {consultation}
    </div>
  );
}
```

### Zustand로 패널 간 상태 동기화

고객 목록(Server Component)과 상세/상담 패널(Client Component)이 분리되어 있으므로 Zustand로 선택 상태를 공유합니다. 고객 목록 아이템을 클릭할 때 `setSelectedCustomerId`를 호출하면 두 패널이 동시에 업데이트됩니다.

### 각 섹션별 독립 Suspense

한 패널 내에서도 고객 정보/거래 내역을 독립 Suspense로 감싸면, 빠른 데이터가 먼저 표시되고 느린 데이터는 나중에 채워집니다. 이것이 Streaming SSR의 핵심 패턴입니다.

---

## 평가 기준

| 항목 | 배점 |
|------|------|
| Parallel Routes 적용 | 20점 |
| Zustand 선택 상태 동기화 | 20점 |
| 각 섹션 독립 Suspense + 스켈레톤 | 20점 |
| 검색/필터 URL 동기화 | 15점 |
| 상담 템플릿 삽입 기능 | 15점 |
| TypeScript 타입 안정성 | 10점 |

---

## PR 가이드

```
feat(console): 고객 상담 통합 콘솔 구현

- Parallel Routes(@detail, @consultation)로 독립 패널 구성
- Zustand selectedCustomerId로 고객 선택 상태 동기화
- 각 섹션별 독립 Suspense + 스켈레톤 UI
- 검색/필터 URL searchParams 동기화
- 템플릿 선택 시 상담 폼 자동 채우기
```

> AI 도구(Claude, ChatGPT, Copilot 등) 사용 엄금. 모든 코드는 직접 작성해야 합니다.
