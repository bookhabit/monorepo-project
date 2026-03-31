import { useMemo } from 'react';
import styled from '@emotion/styled';
import { useAtom } from 'jotai';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useOrderBookData } from '../hooks/use-orderbook-data';
import { OrderBookRow } from './order-book-row';
import { orderInputAtom } from '../store/order-atoms';

const Container = styled.div`
  background: linear-gradient(to bottom, #111827, #1f2937);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid #374151;
  background: #1f2937;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #f9fafb;
  margin: 0 0 8px 0;
`;

const SymbolInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #9ca3af;
`;

const ColumnHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  padding: 10px 12px;
  background: #1f2937;
  border-bottom: 1px solid #374151;
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
`;

const HeaderCell = styled.div<{ align?: 'left' | 'center' | 'right' }>`
  text-align: ${(props) => props.align || 'right'};
`;

const Section = styled.div`
  max-height: 300px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #1f2937;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
`;

const SectionDivider = styled.div`
  height: 2px;
  background: linear-gradient(to right, #22c55e, #ef4444);
  position: relative;
  
  &::after {
    content: 'SPREAD';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: #1f2937;
    padding: 2px 8px;
    font-size: 10px;
    font-weight: 700;
    color: #9ca3af;
    border-radius: 4px;
  }
`;

const LoadingState = styled.div`
  padding: 48px;
  text-align: center;
  color: #9ca3af;
  font-size: 14px;
`;

export function OrderBook() {
  const { data: orderBookData, isLoading } = useOrderBookData();
  const [, setOrderInput] = useAtom(orderInputAtom);

  const maxBidQuantity = useMemo(() => {
    if (!orderBookData?.bids) return 0;
    return Math.max(...orderBookData.bids.map((bid) => bid.quantity));
  }, [orderBookData?.bids]);

  const maxAskQuantity = useMemo(() => {
    if (!orderBookData?.asks) return 0;
    return Math.max(...orderBookData.asks.map((ask) => ask.quantity));
  }, [orderBookData?.asks]);

  const handlePriceClick = (price: number, type: 'bid' | 'ask') => {
    setOrderInput((prev) => ({
      ...prev,
      price,
      orderType: type === 'bid' ? 'buy' : 'sell',
    }));
  };

  if (isLoading || !orderBookData) {
    return (
      <Container>
        <Header>
          <Title>실시간 호가창</Title>
        </Header>
        <LoadingState>호가 데이터 로딩 중...</LoadingState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>실시간 호가창</Title>
        <SymbolInfo>
          <span>{orderBookData.symbol}</span>
          <span>•</span>
          <span>
            {new Date(orderBookData.timestamp).toLocaleTimeString('ko-KR')}
          </span>
        </SymbolInfo>
      </Header>

      <ColumnHeader>
        <HeaderCell align="right">가격</HeaderCell>
        <HeaderCell align="right">잔량</HeaderCell>
        <HeaderCell align="right">총액</HeaderCell>
      </ColumnHeader>

      {/* 매도 호가 (역순으로 표시) */}
      <Section>
        {[...orderBookData.asks].reverse().map((ask, index) => (
          <OrderBookRow
            key={`ask-${ask.price}-${index}`}
            level={ask}
            type="ask"
            maxQuantity={maxAskQuantity}
            onClick={(price) => handlePriceClick(price, 'ask')}
          />
        ))}
      </Section>

      <SectionDivider />

      {/* 매수 호가 */}
      <Section>
        {orderBookData.bids.map((bid, index) => (
          <OrderBookRow
            key={`bid-${bid.price}-${index}`}
            level={bid}
            type="bid"
            maxQuantity={maxBidQuantity}
            onClick={(price) => handlePriceClick(price, 'bid')}
          />
        ))}
      </Section>
    </Container>
  );
}
