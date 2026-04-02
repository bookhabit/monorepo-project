import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ORDER_QUERY_KEYS } from './useOrderQuery';
import { CreateOrderRequest } from '../../schemas/order.schema';
import { orderService } from '../../services/order.service';
import { accountQueryOptions } from '@/features/account/hooks/useAccountQuery';
import { useToast } from '@mono/ui';

export function useOrderMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (orderData: CreateOrderRequest) => orderService.createOrder(orderData),

    // 성공 시 로직
    onSuccess: (data) => {
      console.log('✅ 주문 접수 성공:', data.id);

      // 토스트 알림 표시
      const message = `주문이 성공적으로 접수되었습니다! (종목: ${data.symbol}), 주문 수량: ${data.quantity}), 주문 가격: ${data.price})`;
      toast.success(message);

      // 1. 주문 목록 무효화
      queryClient.invalidateQueries({
        queryKey: ORDER_QUERY_KEYS.all,
      });

      // 2. 계좌 정보 무효화 (잔고 갱신)
      queryClient.invalidateQueries({
        queryKey: accountQueryOptions.queryKey,
      });
    },

    // 에러 발생 시 로직
    onError: (error: Error) => {
      console.error('❌ 주문 접수 실패:', error.message);
      toast.error(error.message);
    },
  });
}
