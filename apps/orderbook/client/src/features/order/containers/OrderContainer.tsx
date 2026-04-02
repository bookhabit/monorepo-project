import OrderView from '@/features/order/views/OrderView';
import { useOrderForm } from '../hooks/form/useOrderForm';

export default function OrderContainer() {
  // 주문 form 상태 관리 훅
  const { form, isPending, handleSubmit } = useOrderForm();

  // 주문 ui에 데이터 전달
  return <OrderView form={form} isPending={isPending} handleSubmit={handleSubmit} />;
}
