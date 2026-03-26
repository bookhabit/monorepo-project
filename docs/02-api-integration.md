# API 연동 코드 규칙

## API 클라이언트 설정

```typescript
// src/shared/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    // 공통 에러 처리 (401 → 로그인, 500 → 에러 토스트)
    return Promise.reject(error);
  },
);
```

## Query Key 규칙

```typescript
// queryKeys는 상수로 관리
export const queryKeys = {
  orderbook: {
    all: ['orderbook'] as const,
    detail: (symbol: string) => ['orderbook', symbol] as const,
  },
  loan: {
    all: ['loan'] as const,
    list: (filters: LoanFilters) => ['loan', 'list', filters] as const,
    detail: (id: string) => ['loan', 'detail', id] as const,
  },
};
```

## API 함수 패턴

```typescript
// src/features/loan/api/loan.api.ts
import { apiClient } from '@/shared/api/client';
import type { LoanApplication, PaginatedResponse } from '@mono/shared';

export async function fetchLoanList(filters: LoanFilters) {
  const { data } = await apiClient.get<PaginatedResponse<LoanApplication>>('/loans', {
    params: filters,
  });
  return data;
}

export async function approveLoan(id: string) {
  const { data } = await apiClient.patch<LoanApplication>(`/loans/${id}/approve`);
  return data;
}
```

## React Query 훅 패턴

```typescript
// src/features/loan/hooks/useLoanList.ts
export function useLoanList(filters: LoanFilters) {
  return useQuery({
    queryKey: queryKeys.loan.list(filters),
    queryFn: () => fetchLoanList(filters),
    staleTime: 1000 * 30,
  });
}

// 낙관적 업데이트 패턴
export function useApproveLoan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveLoan,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.loan.all });
      const previous = queryClient.getQueryData(queryKeys.loan.all);
      // 낙관적 업데이트
      queryClient.setQueryData(queryKeys.loan.all, (old) => /* ... */);
      return { previous };
    },
    onError: (err, id, context) => {
      // 롤백
      queryClient.setQueryData(queryKeys.loan.all, context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.loan.all });
    },
  });
}
```
