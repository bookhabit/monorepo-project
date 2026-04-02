import { useQuery } from '@tanstack/react-query';
import { orderService } from '../../services/order.service';

export const ORDER_QUERY_KEYS = {
  all: ['orders'] as const,
};

export function useOrderQuery() {
  return useQuery({
    queryKey: ORDER_QUERY_KEYS.all,
    queryFn: () => orderService.getOrders(),
    // 호가창 앱 특성상 자주 업데이트가 필요하다면 아래 옵션 추가
    refetchOnWindowFocus: true,
    staleTime: 1000 * 5, // 5초 동안은 신선한 데이터로 간주
  });
}
