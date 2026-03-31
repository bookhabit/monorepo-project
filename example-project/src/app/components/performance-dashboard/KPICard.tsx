import styled from '@emotion/styled';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { KPIMetric } from '../../types/performance-dashboard';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Title = styled.div`
  font-size: 13px;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ChangeIndicator = styled.div<{ type: 'increase' | 'decrease' }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  
  ${props => props.type === 'increase' ? `
    background: rgba(34, 197, 94, 0.1);
    color: #16a34a;
  ` : `
    background: rgba(239, 68, 68, 0.1);
    color: #dc2626;
  `}
`;

const Value = styled.div`
  font-size: 32px;
  font-weight: 900;
  color: #1e293b;
  margin-bottom: 8px;
  display: flex;
  align-items: baseline;
  gap: 6px;
`;

const Unit = styled.span`
  font-size: 16px;
  color: #64748b;
  font-weight: 600;
`;

const TrendChart = styled.div`
  height: 50px;
  margin-top: 12px;
  opacity: 0.6;
`;

interface KPICardProps {
  metric: KPIMetric;
}

export function KPICard({ metric }: KPICardProps) {
  const trendData = metric.trend.map((value, index) => ({ value, index }));

  return (
    <Card>
      <Header>
        <Title>{metric.title}</Title>
        <ChangeIndicator type={metric.changeType}>
          {metric.changeType === 'increase' ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}
          {Math.abs(metric.change)}%
        </ChangeIndicator>
      </Header>
      <Value>
        {metric.value.toLocaleString()}
        <Unit>{metric.unit}</Unit>
      </Value>
      <TrendChart>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={metric.changeType === 'increase' ? '#16a34a' : '#dc2626'}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </TrendChart>
    </Card>
  );
}
