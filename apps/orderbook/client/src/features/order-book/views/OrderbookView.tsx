import React from 'react';

/* 데이터만 받아서 UI만 꾸리는 컴포넌트 */

interface OrderBookLevel {
  price: number;
  quantity: number;
  total: number;
}

interface OrderbookViewProps {
  data: {
    symbol: string;
    timestamp: number;
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
  } | null;
}

export default function OrderbookView({ data }: OrderbookViewProps) {
  // 1. 데이터 객체가 아예 없거나
  // 2. 매수(bids)와 매도(asks) 배열이 모두 비어있는 경우를 체크
  const hasNoData = !data || (data.bids.length === 0 && data.asks.length === 0);

  if (hasNoData) {
    return <div>호가 데이터를 수신 대기 중입니다...</div>;
  }

  return (
    <div>
      {/* 헤더: 심볼 및 시간 */}
      <div>
        <strong>{data.symbol}</strong>
        <span>{new Date(data.timestamp).toLocaleTimeString()}</span>
      </div>

      {/* 컬럼 제목 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <span>가격</span>
        <span>수량</span>
        <span>잔량</span>
      </div>

      <hr />

      {/* 매도 영역 (Asks): 보통 가격이 높은 것이 위로 가도록 정렬 */}
      <div>
        {data.asks.map((ask, i) => (
          <div
            key={`ask-${i}`}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', color: 'red' }}
          >
            <span>{ask.price.toLocaleString()}</span>
            <span>{ask.quantity.toLocaleString()}</span>
            <span>{ask.total.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', margin: '10px 0' }}>--- 현재가 구분선 ---</div>

      {/* 매수 영역 (Bids): 보통 가격이 높은 것이 위로 가도록 정렬 */}
      <div>
        {data.bids.map((bid, i) => (
          <div
            key={`bid-${i}`}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', color: 'blue' }}
          >
            <span>{bid.price.toLocaleString()}</span>
            <span>{bid.quantity.toLocaleString()}</span>
            <span>{bid.total.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
