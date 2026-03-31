# 실시간 이상 거래 탐지(FDS) 리포트 시스템

> **⚠️ 구현 중 AI 사용 금지**

---

## 과제 개요

24시간 쉬지 않고 발생하는 금융 거래에서 **골든 타임** 내에 이상 거래를 포착하고 차단하는 운영 툴을 구현합니다.

초당 수십 건의 실시간 스트리밍, 복잡한 필터 URL 동기화, 즉시 차단 처리, 위험도 타임라인, RBAC까지 5가지 엔지니어링 엣지 포인트를 모두 다룹니다.

---

## 세부 요구사항

### 1. 실시간 데이터 스트리밍 & 가상 리스트
- SSE로 **1~3초 주기** 신규 거래를 수신해 리스트 상단에 즉시 추가
- **TanStack Virtual** 등으로 수만 건 메모리 관리 및 렌더링 최적화

### 2. 다차원 서버사이드 필터링
- 금액 범위 / 거래 수단 / 위험 등급 / 상태 / 날짜 범위 등 복수 조건
- 모든 필터가 URL searchParams에 동기화 → 뒤로가기/앞으로가기 후 정확히 복원

### 3. 낙관적 업데이트 기반 즉시 차단
- 다중 선택 후 **일괄 차단/해제** 처리
- 서버 응답 전 UI 즉시 반영 → 실패(5%) 시 롤백 + Toast

### 4. 위험도 타임라인 & 컨텍스트 Drawer
- 거래 클릭 → 해당 유저의 **최근 24시간 위험도 타임라인** 그래프
- **Zustand**로 Drawer 상태 관리 → 닫을 때 메모리 릭 없이 클린업

### 5. 선언적 RBAC

| 역할 | 조회 | 차단 | 차단해제 |
|------|------|------|----------|
| `monitor` (모니터링 요원) | ✅ | ❌ | ❌ |
| `security_manager` (보안 팀장) | ✅ | ✅ | ✅ |
| `admin` | ✅ | ✅ | ✅ |

`if` 문 도배 금지 — **Panda CSS Variant** + **HOC** 로 선언적 처리

---

## 참고 자료

| 자료 | 설명 |
|------|------|
| 피그마 디자인 | 거래 리스트, 필터 바, Drawer UI 참고 |
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
| 가상 리스트 | **TanStack Virtual** |
| 실시간 | **SSE** (EventSource) |

---

## API 명세

서버는 `http://localhost:4006` 에서 실행됩니다.
Swagger 문서: `http://localhost:4006/api-docs`

### RBAC — 역할 전달 방식

```
x-user-role: monitor | security_manager | admin
```

헤더 없으면 `monitor`(최소 권한)로 처리됩니다.

---

### `GET /transactions/stream` — SSE 실시간 스트림

```ts
const es = new EventSource('http://localhost:4006/transactions/stream');

es.onmessage = (event) => {
  const transaction: Transaction = JSON.parse(event.data);
  // 리스트 상단에 prepend
};
```

- **1~3초 랜덤 주기**로 신규 거래 push
- riskScore > 70이면 자동으로 `suspicious` 상태

---

### `GET /transactions` — 목록 조회

```ts
// Query Parameters
{
  status?:       'normal' | 'suspicious' | 'blocked' | 'reviewing'
  riskLevel?:    'low' | 'medium' | 'high' | 'critical'
  type?:         'transfer' | 'withdrawal' | 'deposit' | 'payment'
  minAmount?:    string
  maxAmount?:    string
  minRiskScore?: string   // 0~100
  search?:       string   // userId, userName, transactionId
  startDate?:    string   // ISO 8601
  endDate?:      string
  page?:         string   // 기본 1
  pageSize?:     string   // 기본 20
}

// Response
interface TransactionPage {
  data: Transaction[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface Transaction {
  id: string;          // "TXN-000001"
  userId: string;      // "USER-123"
  userName: string;
  type: 'transfer' | 'withdrawal' | 'deposit' | 'payment';
  amount: number;
  timestamp: string;   // ISO 8601, 최신순 정렬
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number;   // 0~100
  status: 'normal' | 'suspicious' | 'blocked' | 'reviewing';
  ipAddress: string;
  location: string;
  deviceId: string;
  flags: string[];     // ['대량 출금', '새로운 수취인', '비정상 시간대', '해외 IP']
}
```

---

### `GET /transactions/:id` — 단건 조회

```ts
// Response: Transaction
```

---

### `GET /users/:userId/risk-profile` — 유저 위험도 프로파일

```ts
// Response
interface UserRiskProfile {
  userId: string;
  userName: string;
  totalTransactions: number;
  suspiciousTransactions: number;
  blockedTransactions: number;
  avgRiskScore: number;
  timeline: RiskTimeline[];        // 최근 24시간, 1시간 간격 24개 포인트
  recentTransactions: Transaction[]; // 최근 10건
}

interface RiskTimeline {
  timestamp: string;   // 1시간 단위 ISO 8601
  riskScore: number;   // 0~100
  event: string;       // '이상 거래 탐지' | '주의 거래' | '새로운 수취인' | '정상 거래'
}
```

---

### `POST /transactions/batch-block` — 일괄 차단

```ts
// Header: x-user-role (security_manager 이상 필수)
// Body: { ids: string[] }

// Response: { message: 'N건이 차단 처리되었습니다.' }
// 403: monitor 시도 시
// 500: 5% 확률 실패 → 롤백 필요
```

---

### `POST /transactions/batch-unblock` — 일괄 차단 해제

```ts
// Header: x-user-role (security_manager 이상 필수)
// Body: { ids: string[] }

// Response: { message: 'N건이 차단 해제되었습니다.' }
// 403: monitor 시도 시
// 500: 5% 확률 실패 → 롤백 필요
```

---

## 구현 플로우

> AI 사용 금지. 아래 순서를 지키세요.

### 1단계 — 요구사항 분석

- SSE 거래 스트림과 기존 목록 데이터 병합 전략 결정
- TanStack Virtual 적용 방식 결정 (고정 높이 vs 동적 높이)
- Zustand Drawer store 설계
- RBAC HOC 구조 설계

### 2단계 — 아키텍처 설계

**상태 경계:**
```
SSE 실시간 거래    → 로컬 상태 (prepend to virtual list)
거래 목록 (REST)   → React Query (useQuery + searchParams)
Drawer 상태        → Zustand
선택된 거래 IDs    → Zustand or 로컬 상태
```

**Zustand Drawer Store:**
```ts
interface FdsDrawerStore {
  isOpen: boolean;
  selectedUserId: string | null;
  open: (userId: string) => void;
  close: () => void;  // userId null로 클린업 → 메모리 릭 방지
}
```

**RBAC HOC 제안:**
```tsx
// withRole HOC
const BlockButton = withRole(['security_manager', 'admin'])(BaseBlockButton);
const UnblockButton = withRole(['security_manager', 'admin'])(BaseUnblockButton);

// 또는 Panda CSS variant
const actionButton = cva({
  variants: {
    role: {
      monitor: { display: 'none' },
      security_manager: { display: 'flex' },
      admin: { display: 'flex' },
    }
  }
})
```

### 3단계 — 기능 구현

권장 순서:

1. **필터 + 목록** — `GET /transactions` + searchParams URL 동기화
2. **TanStack Virtual** — 가상 리스트 적용
3. **SSE 스트림** — 신규 거래 수신 + 리스트 prepend
4. **체크박스 + 일괄 차단** — Optimistic Update + 롤백
5. **Drawer** — Zustand + `GET /users/:userId/risk-profile`
6. **RBAC** — withRole HOC 또는 Panda CSS variant 적용

### 4단계 — 리팩토링

- `useTransactionFilters` 훅 분리
- `useTransactionStream` 훅 분리 (SSE 연결 생명주기)
- 타임라인 그래프 컴포넌트 분리

### 5단계 — README 작성

`apps/fds/client/README.md` 에 아래 내용을 작성합니다.

| 항목 | 내용 |
|------|------|
| Architecture | SSE + REST 병합 전략, Zustand/React Query 경계 |
| Performance Optimization | TanStack Virtual 적용 이유와 방법, SSE 누적 데이터 관리 |
| Troubleshooting | SSE CORS, Drawer 메모리 릭 방지, Optimistic Update 롤백 이슈 |
| Self-Evaluation | 시간이 더 있었다면 보완하고 싶은 점 |

---

## PR 가이드

```
feat: 거래 목록 서버사이드 필터 구현 (searchParams)
feat: TanStack Virtual 가상 리스트 적용
feat: SSE 실시간 거래 스트림 연결 구현
feat: 일괄 차단/해제 Optimistic Update 구현
feat: 위험도 타임라인 Drawer 구현 (Zustand)
feat: RBAC withRole HOC 구현
refactor: useTransactionFilters / useTransactionStream 훅 분리
```

---

## 개발 환경 실행

```bash
# 루트에서
yarn dev

# 서버만
cd apps/fds/server && yarn dev   # http://localhost:4006

# 클라이언트만 (Next.js)
cd apps/fds/client && yarn dev   # http://localhost:3006
```

---

## 평가 기준 참고

1. **SSE + Virtual 조합** — 실시간 데이터가 계속 쌓여도 브라우저가 멈추지 않는가
2. **searchParams 동기화** — 복수 필터 조합 후 뒤로가기 시 정확히 복원되는가
3. **Optimistic Update** — 차단 실패 롤백이 자연스럽고 Toast가 적절한가
4. **Zustand 클린업** — Drawer 닫을 때 메모리 릭 없이 상태가 정리되는가
5. **RBAC 선언성** — HOC/variant로 권한 분기가 if 없이 읽히는가
