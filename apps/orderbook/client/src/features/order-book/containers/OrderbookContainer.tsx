import OrderbookView from '@/features/order-book/views/OrderbookView';
import { useOrderbook } from '../hooks/useOrderbook';
import LoadingFallback from '@/shared/boundary/LoadingFallback';
import ErrorFallback from '@/shared/boundary/ErrorFallback';

export default function OrderBookContainer() {
  const { data, isLoading, error, refetch } = useOrderbook();
  // console.log('OrderBookContainer 렌더링 - 데이터:', data, '로딩 상태:', isLoading, '에러:', error);

  if (isLoading) return <LoadingFallback />;
  if (error) return <ErrorFallback errorMessage={error} onReset={refetch} />;

  return <OrderbookView data={data} />;
}
