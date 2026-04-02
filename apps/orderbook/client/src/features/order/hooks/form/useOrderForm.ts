import { useForm } from 'react-hook-form';
import { CreateOrderRequest, CreateOrderRequestSchema } from '../../schemas/order.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOrderMutation } from '../api/useOrderMutation';

export function useOrderForm() {
  // 현재 : 사용자의 form 입력으로 주문가격 input
  // TODO : 전역상태로 관리되는 사용자의 호가창 주문가격 클릭 시 해당 가격이 주문가격 input에 반영되도록 구현
  const form = useForm<CreateOrderRequest>({
    resolver: zodResolver(CreateOrderRequestSchema),
    defaultValues: { symbol: 'KOSPI200', side: 'buy', price: 0, quantity: 0, type: 'limit' },
  });

  const { mutate, isPending } = useOrderMutation();

  const handleSubmit = form.handleSubmit((payload) => {
    mutate(payload);
  });

  return { form, isPending, handleSubmit };
}
