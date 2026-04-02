import OrderView from '@/features/order/views/OrderView';
import { useOrderForm } from '../hooks/form/useOrderForm';

export default function OrderContainer() {
  const { form, isPending, handleSubmit, account, isInsufficientFunds, isInsufficientStock } =
    useOrderForm();

  return (
    <OrderView
      form={form}
      isPending={isPending}
      handleSubmit={handleSubmit}
      account={account}
      isInsufficientFunds={isInsufficientFunds}
      isInsufficientStock={isInsufficientStock}
    />
  );
}
