import { useState } from 'react';
import { useTheme as useEmotionTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { usePerformanceData } from '../../hooks/use-performance-data';
import { Loader2 } from 'lucide-react';

const TabContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.md};
  background: ${(props) => props.theme.color.backgroundTertiary};
  padding: ${(props) => props.theme.spacing.xs};
  border-radius: ${(props) => props.theme.borderRadius.md};
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  fontSize: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(props) => (props.active ? props.theme.color.background : 'transparent')};
  color: ${(props) => (props.active ? props.theme.color.primary : props.theme.color.textMuted)};
  box-shadow: ${(props) => (props.active ? props.theme.shadow.sm : 'none')};

  &:hover {
    color: ${(props) => props.theme.color.text};
  }
`;

const LoadingState = styled.div`
  padding: 48px;
  text-align: center;
  color: ${(props) => props.theme.color.textMuted};
  font-size: 14px;
`;

type Period = '1D' | '1W' | '1M';

export function PerformanceChart() {
  const theme = useEmotionTheme();
  const [period, setPeriod] = useState<Period>('1D');
  const { data, isLoading } = usePerformanceData(period);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const profit = payload[0].payload.profit;
      const isPositive = profit >= 0;

      return (
        <div
          style={{
            background: theme.color.backgroundSecondary,
            border: `1px solid ${theme.color.border}`,
            borderRadius: theme.borderRadius.md,
            padding: theme.spacing.sm,
            fontSize: '13px',
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>
            {payload[0].payload.date}
          </div>
          <div style={{ color: theme.color.text }}>
            평가액: {payload[0].value.toLocaleString()}원
          </div>
          <div
            style={{
              color: isPositive ? theme.color.success : theme.color.error,
              fontWeight: 600,
            }}
          >
            {isPositive ? '+' : ''}
            {profit.toLocaleString()}원
          </div>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div>
        <TabContainer>
          <Tab active={period === '1D'}>1일</Tab>
          <Tab active={period === '1W'}>1주</Tab>
          <Tab active={period === '1M'}>1개월</Tab>
        </TabContainer>
        <LoadingState>
          <Loader2 size={24} style={{ animation: 'spin 1s linear infinite', margin: '0 auto' }} />
          <div style={{ marginTop: '8px' }}>데이터 로딩 중...</div>
        </LoadingState>
      </div>
    );
  }

  return (
    <div>
      <TabContainer>
        <Tab active={period === '1D'} onClick={() => setPeriod('1D')}>
          1일
        </Tab>
        <Tab active={period === '1W'} onClick={() => setPeriod('1W')}>
          1주
        </Tab>
        <Tab active={period === '1M'} onClick={() => setPeriod('1M')}>
          1개월
        </Tab>
      </TabContainer>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.color.border} />
          <XAxis dataKey="date" stroke={theme.color.textMuted} style={{ fontSize: '12px' }} />
          <YAxis
            stroke={theme.color.textMuted}
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
