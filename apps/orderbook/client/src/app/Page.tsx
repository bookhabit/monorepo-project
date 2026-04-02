import AccountContainer from '../features/account/containers/AccountContainer';
import OrderContainer from '../features/order/containers/OrderContainer';
import OrderBookContainer from '../features/order-book/containers/OrderbookContainer';
import AsyncBoundary from '../shared/boundary/AsyncBoundary';

export default function Page() {
  // 3개의 컴포넌트 분리
  // 전역상태 필요 - > 사용자가 선택한 가격을 주문 정보의 주문 가격으로 설정해줘야함
  return (
    <div>
      {/*  호가창 */}
      <OrderBookContainer />

      {/*  계좌 정보 표시 */}
      <AsyncBoundary>
        <AccountContainer />
      </AsyncBoundary>
      {/* 주문 정보 */}
      <AsyncBoundary>
        <OrderContainer />
      </AsyncBoundary>
    </div>
  );
}
