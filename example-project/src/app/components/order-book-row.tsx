import React from 'react';
import styled from '@emotion/styled';
import { OrderBookLevel } from '../services/websocket-mock';

interface OrderBookRowProps {
  level: OrderBookLevel;
  type: 'bid' | 'ask';
  maxQuantity: number;
  onClick: (price: number) => void;
}

interface BarProps {
  width: number;
  type: 'bid' | 'ask';
}

const RowContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.15s ease;
  font-size: 13px;
  line-height: 1.4;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const QuantityBar = styled.div<BarProps>`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${(props) =>
    props.type === 'bid'
      ? 'rgba(34, 197, 94, 0.15)'
      : 'rgba(239, 68, 68, 0.15)'};
  transition: width 0.2s ease;
  pointer-events: none;
`;

const Cell = styled.div<{ align?: 'left' | 'center' | 'right'; color?: string }>`
  position: relative;
  z-index: 1;
  text-align: ${(props) => props.align || 'right'};
  color: ${(props) => props.color || '#e5e7eb'};
`;

const PriceCell = styled(Cell)<{ type: 'bid' | 'ask' }>`
  font-weight: 600;
  color: ${(props) => (props.type === 'bid' ? '#22c55e' : '#ef4444')};
`;

export const OrderBookRow = React.memo(function OrderBookRow({
  level,
  type,
  maxQuantity,
  onClick,
}: OrderBookRowProps) {
  const barWidth = (level.quantity / maxQuantity) * 100;

  return (
    <RowContainer onClick={() => onClick(level.price)}>
      <QuantityBar width={barWidth} type={type} />
      <PriceCell align="right" type={type}>
        {level.price.toLocaleString()}
      </PriceCell>
      <Cell align="right">{level.quantity.toLocaleString()}</Cell>
      <Cell align="right">{(level.total / 1000000).toFixed(2)}M</Cell>
    </RowContainer>
  );
});
