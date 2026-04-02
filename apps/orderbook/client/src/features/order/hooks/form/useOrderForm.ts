import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CreateOrderRequest, CreateOrderRequestSchema } from '../../schemas/order.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOrderMutation } from '../api/useOrderMutation';
import { useOrderSelectionStore } from '@/shared/store/useOrderSelectionStore';
import { useAccountQuery } from '@/features/account/hooks/useAccountQuery';
import { useToast } from '@mono/ui';

export function useOrderForm() {
  const form = useForm<CreateOrderRequest>({
    resolver: zodResolver(CreateOrderRequestSchema),
    defaultValues: { symbol: 'KOSPI200', side: 'buy', price: 0, quantity: 0, type: 'limit' },
  });

  const { mutate, isPending } = useOrderMutation();
  const { data: account } = useAccountQuery();
  const { toast } = useToast();

  const { price: selectedPrice, side: selectedSide } = useOrderSelectionStore();

  useEffect(() => {
    if (selectedPrice !== null) form.setValue('price', selectedPrice);
    if (selectedSide !== null) form.setValue('side', selectedSide);
  }, [selectedPrice, selectedSide]);

  const watchedPrice = form.watch('price') ?? 0;
  const watchedQuantity = form.watch('quantity') ?? 0;
  const watchedSide = form.watch('side');

  const isInsufficientFunds =
    watchedSide === 'buy' && watchedPrice * watchedQuantity > account.cash;
  const isInsufficientStock =
    watchedSide === 'sell' && watchedQuantity > account.stockQuantity;

  const handleSubmit = form.handleSubmit((payload) => {
    if (isInsufficientFunds) {
      toast.error('보유 현금이 부족합니다.');
      return;
    }
    if (isInsufficientStock) {
      toast.error('보유 주식 수량이 부족합니다.');
      return;
    }
    mutate(payload, {
      onSuccess: () => form.reset(),
    });
  });

  return { form, isPending, handleSubmit, account, isInsufficientFunds, isInsufficientStock };
}
