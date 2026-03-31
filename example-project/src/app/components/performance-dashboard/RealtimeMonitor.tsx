import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Activity, AlertTriangle, Clock, Users, Cpu, Database } from 'lucide-react';
import { usePerformanceDashboardStore } from '../../store/performance-dashboard-store';
import { subscribeToSystemMetrics } from '../../services/performance-dashboard-api';
import { toast } from 'sonner';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const Container = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e2e8f0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LiveIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  color: #dc2626;
`;

const LiveDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #dc2626;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const MetricCard = styled.div<{ alert?: boolean }>`
  padding: 16px;
  background: ${props => props.alert ? 'rgba(239, 68, 68, 0.05)' : '#f8fafc'};
  border: 1px solid ${props => props.alert ? 'rgba(239, 68, 68, 0.3)' : '#e2e8f0'};
  border-radius: 8px;
  transition: all 0.3s ease;

  ${props => props.alert && `
    animation: shake 0.5s ease;
  `}

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;

const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const MetricIcon = styled.div<{ color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.color};
  color: white;
`;

const MetricLabel = styled.div`
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MetricValue = styled.div<{ alert?: boolean }>`
  font-size: 24px;
  font-weight: 900;
  color: ${props => props.alert ? '#dc2626' : '#1e293b'};
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 8px;
`;

const MetricUnit = styled.span`
  font-size: 14px;
  color: #64748b;
  font-weight: 600;
`;

const MiniChart = styled.div`
  height: 40px;
  margin-top: 8px;
  opacity: 0.6;
`;

export function RealtimeMonitor() {
  const { currentMetrics, metricsHistory, alerts, setCurrentMetrics, addMetricsToHistory, clearAlert } = usePerformanceDashboardStore();

  useEffect(() => {
    const unsubscribe = subscribeToSystemMetrics((metrics) => {
      setCurrentMetrics(metrics);
      addMetricsToHistory(metrics);
    });

    return unsubscribe;
  }, [setCurrentMetrics, addMetricsToHistory]);

  useEffect(() => {
    alerts.forEach((alert) => {
      if (alert.severity === 'critical') {
        toast.error(alert.message, {
          id: alert.id,
          duration: 5000,
          onDismiss: () => clearAlert(alert.id),
        });
      } else if (alert.severity === 'warning') {
        toast.warning(alert.message, {
          id: alert.id,
          duration: 4000,
          onDismiss: () => clearAlert(alert.id),
        });
      }
    });
  }, [alerts, clearAlert]);

  if (!currentMetrics) {
    return (
      <Container>
        <Header>
          <Title>
            <Activity size={24} />
            실시간 시스템 모니터링
          </Title>
          <LiveIndicator>
            <LiveDot />
            연결 중...
          </LiveIndicator>
        </Header>
      </Container>
    );
  }

  const tpsHistory = metricsHistory.map((m, i) => ({ index: i, value: m.tps }));
  const errorRateHistory = metricsHistory.map((m, i) => ({ index: i, value: m.errorRate }));
  const responseTimeHistory = metricsHistory.map((m, i) => ({ index: i, value: m.avgResponseTime }));

  return (
    <Container>
      <Header>
        <Title>
          <Activity size={24} />
          실시간 시스템 모니터링
        </Title>
        <LiveIndicator>
          <LiveDot />
          LIVE
        </LiveIndicator>
      </Header>

      <MetricsGrid>
        <MetricCard>
          <MetricHeader>
            <MetricIcon color="linear-gradient(135deg, #3b82f6, #2563eb)">
              <Activity size={18} />
            </MetricIcon>
            <MetricLabel>TPS</MetricLabel>
          </MetricHeader>
          <MetricValue>
            {currentMetrics.tps.toLocaleString()}
            <MetricUnit>/s</MetricUnit>
          </MetricValue>
          <MiniChart>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tpsHistory}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </MiniChart>
        </MetricCard>

        <MetricCard alert={currentMetrics.errorRate > 5}>
          <MetricHeader>
            <MetricIcon color="linear-gradient(135deg, #ef4444, #dc2626)">
              <AlertTriangle size={18} />
            </MetricIcon>
            <MetricLabel>에러율</MetricLabel>
          </MetricHeader>
          <MetricValue alert={currentMetrics.errorRate > 5}>
            {currentMetrics.errorRate.toFixed(2)}
            <MetricUnit>%</MetricUnit>
          </MetricValue>
          <MiniChart>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={errorRateHistory}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={currentMetrics.errorRate > 5 ? '#dc2626' : '#ef4444'}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </MiniChart>
        </MetricCard>

        <MetricCard alert={currentMetrics.avgResponseTime > 200}>
          <MetricHeader>
            <MetricIcon color="linear-gradient(135deg, #8b5cf6, #7c3aed)">
              <Clock size={18} />
            </MetricIcon>
            <MetricLabel>평균 응답시간</MetricLabel>
          </MetricHeader>
          <MetricValue alert={currentMetrics.avgResponseTime > 200}>
            {currentMetrics.avgResponseTime}
            <MetricUnit>ms</MetricUnit>
          </MetricValue>
          <MiniChart>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTimeHistory}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={currentMetrics.avgResponseTime > 200 ? '#dc2626' : '#8b5cf6'}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </MiniChart>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricIcon color="linear-gradient(135deg, #10b981, #059669)">
              <Users size={18} />
            </MetricIcon>
            <MetricLabel>활성 사용자</MetricLabel>
          </MetricHeader>
          <MetricValue>
            {currentMetrics.activeUsers.toLocaleString()}
            <MetricUnit>명</MetricUnit>
          </MetricValue>
        </MetricCard>

        <MetricCard alert={currentMetrics.cpuUsage > 80}>
          <MetricHeader>
            <MetricIcon color="linear-gradient(135deg, #f59e0b, #d97706)">
              <Cpu size={18} />
            </MetricIcon>
            <MetricLabel>CPU 사용률</MetricLabel>
          </MetricHeader>
          <MetricValue alert={currentMetrics.cpuUsage > 80}>
            {currentMetrics.cpuUsage}
            <MetricUnit>%</MetricUnit>
          </MetricValue>
        </MetricCard>

        <MetricCard alert={currentMetrics.memoryUsage > 85}>
          <MetricHeader>
            <MetricIcon color="linear-gradient(135deg, #ec4899, #db2777)">
              <Database size={18} />
            </MetricIcon>
            <MetricLabel>메모리 사용률</MetricLabel>
          </MetricHeader>
          <MetricValue alert={currentMetrics.memoryUsage > 85}>
            {currentMetrics.memoryUsage}
            <MetricUnit>%</MetricUnit>
          </MetricValue>
        </MetricCard>
      </MetricsGrid>
    </Container>
  );
}
