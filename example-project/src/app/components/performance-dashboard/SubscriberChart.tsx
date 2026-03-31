import styled from '@emotion/styled';
import { SubscriberTrend, TimeRange } from '../../types/performance-dashboard';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const Container = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e2e8f0;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.div`
  font-size: 13px;
  color: #64748b;
`;

const ChartWrapper = styled.div`
  height: 350px;
`;

interface SubscriberChartProps {
  data: SubscriberTrend[];
  timeRange: TimeRange;
}

export function SubscriberChart({ data, timeRange }: SubscriberChartProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    
    switch (timeRange) {
      case 'daily':
        return format(date, 'MM/dd', { locale: ko });
      case 'weekly':
        return format(date, 'MM/dd', { locale: ko });
      case 'monthly':
        return format(date, 'yyyy MMM', { locale: ko });
      default:
        return format(date, 'MM/dd', { locale: ko });
    }
  };

  const chartData = data.map(item => ({
    ...item,
    formattedDate: formatDate(item.date),
  }));

  return (
    <Container>
      <Header>
        <Title>가입자 추이 분석</Title>
        <Subtitle>
          {timeRange === 'daily' && '일별 '}
          {timeRange === 'weekly' && '주별 '}
          {timeRange === 'monthly' && '월별 '}
          가입자 증감 현황
        </Subtitle>
      </Header>
      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorSubscribers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="formattedDate"
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#64748b"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px',
              }}
              formatter={(value: number) => value.toLocaleString()}
            />
            <Legend
              wrapperStyle={{ fontSize: '13px', paddingTop: '16px' }}
            />
            <Area
              type="monotone"
              dataKey="subscribers"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#colorSubscribers)"
              name="총 가입자"
            />
            <Area
              type="monotone"
              dataKey="newSubscribers"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#colorNew)"
              name="신규 가입자"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </Container>
  );
}
