# 은행 상품 운영 통합 리포트 및 성능 관제 대시보드

금융 상품의 가입 현황과 시스템 성능 지표를 실시간으로 모니터링하는 운영 대시보드입니다.

---

## 서버 실행

```bash
cd apps/report/server
yarn install
yarn dev
# http://localhost:4008
# Swagger: http://localhost:4008/api-docs
```

---

## API 명세

| Method | Path | 설명 |
|--------|------|------|
| GET | `/report/products` | 상품 목록 조회 |
| GET | `/report` | 리포트 데이터 조회 (KPI + 가입자 추이 + 시스템 지표) |
| SSE | `/report/metrics/stream` | 실시간 시스템 지표 스트림 (2초 간격) |
| GET | `/report/export/csv` | CSV 내보내기 |

### GET /report 쿼리 파라미터

| 파라미터 | 타입 | 기본값 | 설명 |
|---------|------|--------|------|
| timeRange | `daily\|weekly\|monthly` | `daily` | 조회 기간 단위 |
| startDate | `yyyy-MM-dd` | - | 시작일 |
| endDate | `yyyy-MM-dd` | - | 종료일 |
| productId | string | - | 상품 ID 필터 |
| segment | `all\|vip\|general` | `all` | 사용자 세그먼트 |

### GET /report 응답 구조

```json
{
  "kpis": [
    {
      "id": "total-subscribers",
      "title": "총 가입자 수",
      "value": 1847293,
      "change": 12.5,
      "changeType": "increase",
      "unit": "명",
      "trend": [1650000, 1680000, 1720000, 1760000, 1800000, 1847293]
    }
  ],
  "subscriberTrends": [
    {
      "date": "2025-03-01",
      "subscribers": 1520000,
      "newSubscribers": 1243,
      "churnRate": 2.34
    }
  ],
  "systemMetrics": [
    {
      "timestamp": "2025-03-31T12:00:00.000Z",
      "tps": 1023,
      "errorRate": 1.2,
      "avgResponseTime": 87,
      "activeUsers": 62430,
      "cpuUsage": 54,
      "memoryUsage": 63
    }
  ]
}
```

### SSE /report/metrics/stream

2초마다 현재 시스템 지표를 전송합니다.

```typescript
const es = new EventSource('http://localhost:4008/report/metrics/stream');
es.onmessage = (e) => {
  const metrics = JSON.parse(e.data);
  // { timestamp, tps, errorRate, avgResponseTime, activeUsers, cpuUsage, memoryUsage }
};
```

---

## 구현 흐름

### 1단계: 레이아웃 + 필터 URL 동기화

```typescript
// app/page.tsx (Server Component)
export default function ReportPage({
  searchParams,
}: {
  searchParams: { timeRange?: string; productId?: string; segment?: string; startDate?: string; endDate?: string };
}) {
  const filters = {
    timeRange: (searchParams.timeRange as TimeRange) ?? 'daily',
    productId: searchParams.productId,
    segment: (searchParams.segment as Segment) ?? 'all',
    startDate: searchParams.startDate,
    endDate: searchParams.endDate,
  };

  return (
    <main>
      <FilterBar filters={filters} />
      {/* 각 섹션 독립 Suspense */}
      <Suspense fallback={<KPICardsSkeleton />}>
        <KPISection filters={filters} />
      </Suspense>
      <Suspense fallback={<ChartSkeleton />}>
        <ChartSection filters={filters} />
      </Suspense>
      <RealtimeMonitor /> {/* Client Component */}
    </main>
  );
}
```

- `searchParams`를 Server Component에서 읽어 필터 상태를 URL에서 관리
- 필터 변경 시 `router.push`로 URL 동기화 → **공유 가능한 리포트 링크** 구현

### 2단계: KPI 카드 + 차트 (React-Query 캐싱)

```typescript
// hooks/useReportData.ts
export function useReportData(filters: DashboardFilters) {
  return useQuery({
    queryKey: ['report', filters],
    queryFn: () => fetchReportData(filters),
    staleTime: 60_000, // 1분 캐시
  });
}
```

- `queryKey`에 필터 객체를 포함하면, 같은 조건으로 재방문 시 캐시된 데이터를 즉시 반환
- `daily → weekly → daily` 전환 시 첫 번째 결과가 캐시에서 즉시 표시됨
- `Suspense: true` 옵션으로 Server Component와 동일한 방식으로 로딩 처리 가능

### 3단계: 실시간 지표 모니터링 (Zustand + SSE)

```typescript
// store/metricsStore.ts
interface MetricsStore {
  current: SystemMetrics | null;
  history: SystemMetrics[];
  alertActive: boolean;
  setMetrics: (m: SystemMetrics) => void;
}

const useMetricsStore = create<MetricsStore>((set) => ({
  current: null,
  history: [],
  alertActive: false,
  setMetrics: (m) =>
    set((state) => ({
      current: m,
      history: [...state.history.slice(-59), m],
      alertActive: m.errorRate > 5, // 에러율 5% 초과 시 알림
    })),
}));
```

```typescript
// components/RealtimeMonitor.tsx (Client Component)
'use client';
export function RealtimeMonitor() {
  const { setMetrics, current, alertActive } = useMetricsStore();

  useEffect(() => {
    const es = new EventSource(`${API_BASE}/report/metrics/stream`);
    es.onmessage = (e) => setMetrics(JSON.parse(e.data));
    return () => es.close();
  }, [setMetrics]);

  return (
    <div>
      {alertActive && <AlertToast message="에러율 임계값 초과!" />}
      <MetricsTable current={current} />
    </div>
  );
}
```

- SSE로 수신한 데이터를 Zustand store에 저장
- `errorRate > 5` 조건으로 `alertActive` 자동 계산
- 경고 발생 시 해당 행의 색상 변경 또는 토스트 표시

### 4단계: 유효성 검사 + Error Boundary

```typescript
// 날짜 유효성 검사
function validateDateRange(startDate?: string, endDate?: string) {
  if (!startDate || !endDate) return null;
  if (new Date(endDate) < new Date(startDate)) {
    return '종료일이 시작일보다 빠릅니다.';
  }
  return null;
}

// 사용
const dateError = validateDateRange(filters.startDate, filters.endDate);
if (dateError) {
  return <ErrorMessage>{dateError}</ErrorMessage>;
}
```

```tsx
// Error Boundary로 각 섹션 감싸기
<ErrorBoundary fallback={<ErrorCard title="KPI 로딩 실패" />}>
  <Suspense fallback={<KPICardsSkeleton />}>
    <KPISection filters={filters} />
  </Suspense>
</ErrorBoundary>
```

### 5단계: CSV 내보내기

```typescript
async function downloadCSV(filters: DashboardFilters) {
  const params = new URLSearchParams(filters as Record<string, string>);
  const res = await fetch(`/api/report/export/csv?${params}`);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'report.csv';
  a.click();
  URL.revokeObjectURL(url);
}
```

---

## 구현 포인트

### React-Query 캐싱으로 필터 전환 최적화

`queryKey`에 `filters` 객체를 포함하면 React-Query는 필터 조합마다 별도 캐시 항목을 관리합니다. 예를 들어, `daily` → `weekly` → `daily`로 전환할 때 마지막 `daily`는 캐시에서 즉시 반환되어 네트워크 요청 없이 표시됩니다. `staleTime: 60_000`으로 1분 이내 재요청은 캐시에서 처리됩니다.

### Zustand로 SSE 상태 관리

SSE는 컴포넌트 레벨에서 `useEffect`로 연결하고, 수신된 데이터는 Zustand store에 저장합니다. store에서 `errorRate > 5` 조건을 계산하여 `alertActive`를 자동 업데이트하면, 여러 컴포넌트에서 알림 상태를 공유할 수 있습니다.

### Skeleton UI로 독립적인 로딩 경험

KPI 카드, 차트, 실시간 모니터 각각을 별도 `Suspense`로 감싸면, 빠르게 로드되는 섹션이 먼저 표시됩니다. 전체 페이지가 한꺼번에 로딩 중으로 보이는 것보다 UX가 크게 향상됩니다.

---

## 평가 기준

| 항목 | 배점 |
|------|------|
| Panda CSS 레이아웃 + KPI/차트 구성 | 20점 |
| React-Query 캐싱 활용 | 20점 |
| Zustand SSE 실시간 상태 + 에러율 알림 | 20점 |
| URL searchParams 필터 동기화 | 15점 |
| CSV 내보내기 기능 | 10점 |
| 날짜 유효성 검사 + Error Boundary | 10점 |
| TypeScript 타입 안정성 | 5점 |

---

## PR 가이드

```
feat(report): 은행 상품 운영 통합 리포트 구현

- Panda CSS 기반 KPI 카드 + 가입자 추이 차트 레이아웃
- React-Query staleTime으로 기간 전환 캐싱 최적화
- Zustand + SSE 실시간 시스템 지표 모니터링
- errorRate > 5% 시 경고 토스트 + 행 색상 변경
- URL searchParams 필터 동기화 (공유 가능한 링크)
- CSV 내보내기 기능
```

> AI 도구(Claude, ChatGPT, Copilot 등) 사용 엄금. 모든 코드는 직접 작성해야 합니다.
