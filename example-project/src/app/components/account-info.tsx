import { useAtom } from 'jotai';
import styled from '@emotion/styled';
import { Wallet, TrendingUp, PieChart, DollarSign } from 'lucide-react';
import { accountBalanceAtom } from '../store/order-atoms';

const Container = styled.div`
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #374151;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #9ca3af;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const StatCard = styled.div`
  background: #1f2937;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #374151;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #3b82f6;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  }
`;

const StatLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
`;

const StatValue = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #f9fafb;
`;

const StatSubtext = styled.div`
  font-size: 11px;
  color: #6b7280;
  margin-top: 4px;
`;

export function AccountInfo() {
  const [accountBalance] = useAtom(accountBalanceAtom);

  const totalAssets = accountBalance.cash + accountBalance.stockQuantity * 50000; // 임시 평가액
  const profitLoss = totalAssets - 10000000;
  const profitLossPercent = (profitLoss / 10000000) * 100;

  return (
    <Container>
      <Title>
        <PieChart size={18} />
        계좌 정보
      </Title>

      <Grid>
        <StatCard>
          <StatLabel>
            <Wallet size={14} />
            보유 현금
          </StatLabel>
          <StatValue>{accountBalance.cash.toLocaleString()}원</StatValue>
          <StatSubtext>주문 가능 금액</StatSubtext>
        </StatCard>

        <StatCard>
          <StatLabel>
            <TrendingUp size={14} />
            보유 주식
          </StatLabel>
          <StatValue>{accountBalance.stockQuantity.toLocaleString()}주</StatValue>
          <StatSubtext>KOSPI200</StatSubtext>
        </StatCard>

        <StatCard style={{ gridColumn: '1 / -1' }}>
          <StatLabel>
            <DollarSign size={14} />
            총 평가액
          </StatLabel>
          <StatValue>{totalAssets.toLocaleString()}원</StatValue>
          <StatSubtext
            style={{
              color: profitLoss >= 0 ? '#22c55e' : '#ef4444',
              fontWeight: 600,
            }}
          >
            {profitLoss >= 0 ? '+' : ''}
            {profitLoss.toLocaleString()}원 ({profitLoss >= 0 ? '+' : ''}
            {profitLossPercent.toFixed(2)}%)
          </StatSubtext>
        </StatCard>
      </Grid>
    </Container>
  );
}
