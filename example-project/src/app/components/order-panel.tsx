import { useAtom } from 'jotai';
import styled from '@emotion/styled';
import { ArrowUpCircle, ArrowDownCircle, Calculator, Wallet } from 'lucide-react';
import {
  orderInputAtom,
  accountBalanceAtom,
  maxBuyQuantityAtom,
} from '../store/order-atoms';
import { toast } from 'sonner';

const Container = styled.div`
  background: linear-gradient(to bottom, #111827, #1f2937);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #f9fafb;
  margin: 0 0 16px 0;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

interface TabButtonProps {
  active: boolean;
  type: 'buy' | 'sell';
}

const TabButton = styled.button<TabButtonProps>`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  
  background: ${(props) =>
    props.active
      ? props.type === 'buy'
        ? '#22c55e'
        : '#ef4444'
      : '#374151'};
  color: ${(props) => (props.active ? '#ffffff' : '#9ca3af')};
  
  &:hover {
    background: ${(props) =>
      props.active
        ? props.type === 'buy'
          ? '#16a34a'
          : '#dc2626'
        : '#4b5563'};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #9ca3af;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 8px;
  color: #f9fafb;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: #6b7280;
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 13px;
  color: #9ca3af;
  border-bottom: 1px solid #374151;
  
  &:last-of-type {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const InfoValue = styled.span<{ highlight?: boolean }>`
  font-weight: 600;
  color: ${(props) => (props.highlight ? '#3b82f6' : '#f9fafb')};
`;

const OrderButton = styled.button<{ type: 'buy' | 'sell' }>`
  width: 100%;
  padding: 16px;
  margin-top: 16px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #ffffff;
  
  background: ${(props) => (props.type === 'buy' ? '#22c55e' : '#ef4444')};
  
  &:hover {
    background: ${(props) => (props.type === 'buy' ? '#16a34a' : '#dc2626')};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #4b5563;
    cursor: not-allowed;
    transform: none;
  }
`;

const MaxButton = styled.button`
  padding: 6px 12px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #2563eb;
  }
`;

export function OrderPanel() {
  const [orderInput, setOrderInput] = useAtom(orderInputAtom);
  const [accountBalance] = useAtom(accountBalanceAtom);
  const [maxBuyQuantity] = useAtom(maxBuyQuantityAtom);

  const totalAmount = orderInput.price * orderInput.quantity;

  const handleOrderTypeChange = (type: 'buy' | 'sell') => {
    setOrderInput((prev) => ({ ...prev, orderType: type }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/,/g, '')) || 0;
    setOrderInput((prev) => ({ ...prev, price: value }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/,/g, '')) || 0;
    setOrderInput((prev) => ({ ...prev, quantity: value }));
  };

  const handleMaxQuantity = () => {
    if (orderInput.orderType === 'buy') {
      setOrderInput((prev) => ({ ...prev, quantity: maxBuyQuantity }));
    } else {
      setOrderInput((prev) => ({
        ...prev,
        quantity: accountBalance.stockQuantity,
      }));
    }
  };

  const handleSubmitOrder = () => {
    if (orderInput.price === 0 || orderInput.quantity === 0) {
      toast.error('가격과 수량을 입력해주세요');
      return;
    }

    if (orderInput.orderType === 'buy' && totalAmount > accountBalance.cash) {
      toast.error('보유 현금이 부족합니다');
      return;
    }

    if (
      orderInput.orderType === 'sell' &&
      orderInput.quantity > accountBalance.stockQuantity
    ) {
      toast.error('보유 수량이 부족합니다');
      return;
    }

    toast.success(
      `${orderInput.orderType === 'buy' ? '매수' : '매도'} 주문이 접수되었습니다`
    );

    // 주문 초기화
    setOrderInput({
      price: 0,
      quantity: 0,
      orderType: orderInput.orderType,
    });
  };

  return (
    <Container>
      <Title>주문</Title>

      <TabContainer>
        <TabButton
          active={orderInput.orderType === 'buy'}
          type="buy"
          onClick={() => handleOrderTypeChange('buy')}
        >
          <ArrowUpCircle size={18} />
          매수
        </TabButton>
        <TabButton
          active={orderInput.orderType === 'sell'}
          type="sell"
          onClick={() => handleOrderTypeChange('sell')}
        >
          <ArrowDownCircle size={18} />
          매도
        </TabButton>
      </TabContainer>

      <FormGroup>
        <Label>주문 가격</Label>
        <Input
          type="text"
          placeholder="0"
          value={orderInput.price === 0 ? '' : orderInput.price.toLocaleString()}
          onChange={handlePriceChange}
        />
      </FormGroup>

      <FormGroup>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <Label style={{ margin: 0 }}>주문 수량</Label>
          <MaxButton onClick={handleMaxQuantity}>최대</MaxButton>
        </div>
        <Input
          type="text"
          placeholder="0"
          value={
            orderInput.quantity === 0 ? '' : orderInput.quantity.toLocaleString()
          }
          onChange={handleQuantityChange}
        />
      </FormGroup>

      <div style={{ background: '#1f2937', borderRadius: '8px', padding: '12px', marginTop: '20px' }}>
        <InfoRow>
          <InfoLabel>
            <Calculator size={16} />
            주문 총액
          </InfoLabel>
          <InfoValue highlight>
            {totalAmount.toLocaleString()}원
          </InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>
            <Wallet size={16} />
            {orderInput.orderType === 'buy' ? '매수 가능' : '보유 수량'}
          </InfoLabel>
          <InfoValue>
            {orderInput.orderType === 'buy'
              ? `${maxBuyQuantity.toLocaleString()}주`
              : `${accountBalance.stockQuantity.toLocaleString()}주`}
          </InfoValue>
        </InfoRow>
      </div>

      <OrderButton
        type={orderInput.orderType}
        onClick={handleSubmitOrder}
        disabled={orderInput.price === 0 || orderInput.quantity === 0}
      >
        {orderInput.orderType === 'buy' ? '매수 주문' : '매도 주문'}
      </OrderButton>
    </Container>
  );
}
