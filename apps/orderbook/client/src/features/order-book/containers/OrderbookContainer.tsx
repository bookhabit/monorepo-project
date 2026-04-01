import OrderbookView from '@/features/order-book/views/OrderbookView';

export default function OrderBookContainer() {
  // 소켓 연결 및 데이터 수신 로직 구현
  // ui 컴포넌트에는 데이터만 전달

  return <OrderbookView />;
}
