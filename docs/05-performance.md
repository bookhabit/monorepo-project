# 성능 최적화 가이드

## 성능 지표 분석 도구

- **Chrome DevTools > Performance 탭**: 메인 스레드 점유, Long Task 파악
- **React DevTools Profiler**: 컴포넌트별 렌더링 시간
- **Lighthouse**: LCP, FID, CLS 측정
- **web-vitals 라이브러리**: 실제 사용자 지표 수집

## 주요 최적화 기법

### 1. 렌더링 최적화

```typescript
// 불필요한 리렌더 방지
const MemoizedRow = memo(OrderbookRow, (prev, next) => {
  return prev.price === next.price && prev.quantity === next.quantity;
});

// 콜백 안정화
const handleClick = useCallback((price: number) => {
  setOrderPrice(price);
}, []);
```

### 2. 실시간 데이터 Throttle

```typescript
// 초당 수십 번 업데이트되는 호가 데이터 → throttle 적용
const throttledUpdate = useThrottle(orderbookData, 100); // 100ms
```

### 3. 가상 리스트 (Virtualization)

```typescript
// @tanstack/react-virtual 사용
import { useVirtualizer } from '@tanstack/react-virtual';

const rowVirtualizer = useVirtualizer({
  count: transactions.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 56, // 행 높이
});
```

### 4. React Query 캐싱 전략

```typescript
// 자주 바뀌지 않는 데이터: staleTime 높게
useQuery({ staleTime: 1000 * 60 * 5 }); // 5분

// 실시간 데이터: staleTime 0
useQuery({ staleTime: 0, refetchInterval: 1000 });

// 탭 전환 데이터: placeholderData로 즉시 표시
useQuery({
  placeholderData: keepPreviousData,
});
```

### 5. 번들 최적화

```typescript
// 코드 스플리팅 - 라우트 단위
const LoanDetailPage = lazy(() => import('./pages/LoanDetailPage'));

// 큰 라이브러리 동적 import
const { Chart } = await import('chart.js');
```

## 병목 현상 파악 순서

1. Lighthouse로 점수 측정
2. Performance 탭에서 Long Task (50ms+) 찾기
3. React Profiler로 느린 컴포넌트 특정
4. 원인 분석 → throttle / memo / virtualize / lazy load
5. 개선 후 재측정으로 검증
