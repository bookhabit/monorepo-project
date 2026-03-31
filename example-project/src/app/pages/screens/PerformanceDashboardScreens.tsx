import { Link } from 'react-router';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, Loader2, BarChart3, TrendingUp } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: #0f172a;
  padding: 0;
`;

const Header = styled.div`
  padding: 20px 24px;
  background: #1f2937;
  border-bottom: 1px solid #374151;
  display: flex;
  align-items: center;
  gap: 16px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const BackButton = styled(Link)`
  padding: 8px;
  background: transparent;
  border: 1px solid #374151;
  border-radius: 8px;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &:hover {
    background: #374151;
    color: #f9fafb;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #f9fafb;
  margin: 0;
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 24px;
`;

const Section = styled.div`
  margin-bottom: 64px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #f9fafb;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SectionDescription = styled.p`
  font-size: 16px;
  color: #9ca3af;
  margin: 0;
  line-height: 1.6;
`;

const ScreenPreview = styled.div`
  background: linear-gradient(to bottom right, #1e293b, #0f172a);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #374151;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
`;

const StateLabel = styled.div<{ type: 'success' | 'error' | 'warning' | 'info' | 'loading' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
  
  background: ${props => {
    switch (props.type) {
      case 'success': return 'rgba(34, 197, 94, 0.1)';
      case 'error': return 'rgba(239, 68, 68, 0.1)';
      case 'warning': return 'rgba(245, 158, 11, 0.1)';
      case 'loading': return 'rgba(59, 130, 246, 0.1)';
      default: return 'rgba(156, 163, 175, 0.1)';
    }
  }};
  
  color: ${props => {
    switch (props.type) {
      case 'success': return '#22c55e';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'loading': return '#3b82f6';
      default: return '#9ca3af';
    }
  }};
  
  border: 1px solid ${props => {
    switch (props.type) {
      case 'success': return 'rgba(34, 197, 94, 0.2)';
      case 'error': return 'rgba(239, 68, 68, 0.2)';
      case 'warning': return 'rgba(245, 158, 11, 0.2)';
      case 'loading': return 'rgba(59, 130, 246, 0.2)';
      default: return 'rgba(156, 163, 175, 0.2)';
    }
  }};
`;

const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const KPICard = styled.div<{ variant?: 'success' | 'error' | 'warning' | 'info' }>`
  background: ${props => {
    switch (props.variant) {
      case 'success': return 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))';
      case 'error': return 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))';
      case 'warning': return 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05))';
      case 'info': return 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05))';
      default: return '#1f2937';
    }
  }};
  border-radius: 12px;
  padding: 24px;
  border: 1px solid ${props => {
    switch (props.variant) {
      case 'success': return 'rgba(34, 197, 94, 0.2)';
      case 'error': return 'rgba(239, 68, 68, 0.2)';
      case 'warning': return 'rgba(245, 158, 11, 0.2)';
      case 'info': return 'rgba(59, 130, 246, 0.2)';
      default: return '#374151';
    }
  }};
`;

const KPILabel = styled.div`
  font-size: 13px;
  color: #9ca3af;
  margin-bottom: 8px;
`;

const KPIValue = styled.div<{ color?: string }>`
  font-size: 32px;
  font-weight: 700;
  color: ${props => props.color || '#f9fafb'};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const KPIChange = styled.div<{ positive?: boolean }>`
  font-size: 14px;
  color: ${props => props.positive ? '#22c55e' : '#ef4444'};
  margin-top: 4px;
`;

const ChartContainer = styled.div`
  background: #1f2937;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #374151;
  margin-bottom: 24px;
`;

const ChartTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #f9fafb;
  margin: 0 0 16px 0;
`;

const ChartPlaceholder = styled.div`
  height: 200px;
  background: linear-gradient(to bottom, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 14px;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const MetricCard = styled.div`
  background: #1f2937;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #374151;
`;

const MetricLabel = styled.div`
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 6px;
`;

const MetricValue = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #f9fafb;
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px;
  gap: 16px;
  
  svg {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: #9ca3af;
  font-size: 14px;
`;

const AlertBanner = styled.div<{ type: 'warning' | 'error' }>`
  padding: 16px 20px;
  background: ${props => props.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)'};
  border: 1px solid ${props => props.type === 'error' ? '#ef4444' : '#f59e0b'};
  border-radius: 8px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AlertText = styled.div`
  color: #f9fafb;
  font-size: 14px;
`;

const MotionSection = motion.create(Section);

export function PerformanceDashboardScreens() {
  return (
    <Container>
      <Header>
        <BackButton to="/performance-dashboard">
          <ArrowLeft size={20} />
        </BackButton>
        <Title>상품 운영 통합 리포트 - 사용자 시나리오별 화면</Title>
      </Header>

      <Content>
        {/* 정상 상태 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader>
            <SectionTitle>
              <BarChart3 size={28} color="#22c55e" />
              정상 상태 - 실시간 모니터링
            </SectionTitle>
            <SectionDescription>
              전사 상품 성과 지표 및 시스템 성능이 정상적으로 모니터링되는 상태
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="success">
              <CheckCircle size={16} />
              실시간 업데이트 중
            </StateLabel>
            <KPIGrid>
              <KPICard variant="success">
                <KPILabel>일일 가입자</KPILabel>
                <KPIValue color="#22c55e">
                  2,847
                  <TrendingUp size={28} />
                </KPIValue>
                <KPIChange positive>+12.5% vs 어제</KPIChange>
              </KPICard>
              <KPICard variant="info">
                <KPILabel>활성 사용자</KPILabel>
                <KPIValue color="#3b82f6">124,352</KPIValue>
                <KPIChange positive>+3.2% vs 어제</KPIChange>
              </KPICard>
              <KPICard variant="success">
                <KPILabel>거래액 (일일)</KPILabel>
                <KPIValue color="#22c55e">₩54.2B</KPIValue>
                <KPIChange positive>+8.7% vs 어제</KPIChange>
              </KPICard>
              <KPICard variant="warning">
                <KPILabel>시스템 응답시간</KPILabel>
                <KPIValue color="#f59e0b">142ms</KPIValue>
                <KPIChange>+18% vs 평균</KPIChange>
              </KPICard>
            </KPIGrid>
            <ChartContainer>
              <ChartTitle>일일 가입자 추이</ChartTitle>
              <ChartPlaceholder>
                📈 차트 영역 (Recharts)
              </ChartPlaceholder>
            </ChartContainer>
            <MetricsGrid>
              <MetricCard>
                <MetricLabel>서버 가동률</MetricLabel>
                <MetricValue>99.98%</MetricValue>
              </MetricCard>
              <MetricCard>
                <MetricLabel>평균 TPS</MetricLabel>
                <MetricValue>1,247</MetricValue>
              </MetricCard>
              <MetricCard>
                <MetricLabel>에러율</MetricLabel>
                <MetricValue>0.02%</MetricValue>
              </MetricCard>
              <MetricCard>
                <MetricLabel>DB 연결 수</MetricLabel>
                <MetricValue>87 / 200</MetricValue>
              </MetricCard>
            </MetricsGrid>
          </ScreenPreview>
        </MotionSection>

        {/* 경고 상태 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionHeader>
            <SectionTitle>
              <AlertTriangle size={28} color="#f59e0b" />
              경고 상태
            </SectionTitle>
            <SectionDescription>
              일부 지표가 임계값을 초과하여 주의가 필요한 상태
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="warning">
              <AlertTriangle size={16} />
              주의 필요
            </StateLabel>
            <AlertBanner type="warning">
              <AlertTriangle size={20} color="#f59e0b" />
              <AlertText>
                <strong>응답 시간 증가</strong> - 평균 응답 시간이 임계값을 초과했습니다. (현재: 342ms)
              </AlertText>
            </AlertBanner>
            <KPIGrid>
              <KPICard variant="success">
                <KPILabel>일일 가입자</KPILabel>
                <KPIValue color="#22c55e">2,847</KPIValue>
                <KPIChange positive>+12.5%</KPIChange>
              </KPICard>
              <KPICard variant="info">
                <KPILabel>활성 사용자</KPILabel>
                <KPIValue color="#3b82f6">124,352</KPIValue>
                <KPIChange positive>+3.2%</KPIChange>
              </KPICard>
              <KPICard variant="success">
                <KPILabel>거래액 (일일)</KPILabel>
                <KPIValue color="#22c55e">₩54.2B</KPIValue>
                <KPIChange positive>+8.7%</KPIChange>
              </KPICard>
              <KPICard variant="error">
                <KPILabel>시스템 응답시간</KPILabel>
                <KPIValue color="#ef4444">342ms</KPIValue>
                <KPIChange>+138% vs 평균</KPIChange>
              </KPICard>
            </KPIGrid>
          </ScreenPreview>
        </MotionSection>

        {/* 심각한 오류 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SectionHeader>
            <SectionTitle>
              <XCircle size={28} color="#ef4444" />
              심각한 오류
            </SectionTitle>
            <SectionDescription>
              시스템 장애 또는 심각한 성능 저하가 발생한 상태
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="error">
              <XCircle size={16} />
              긴급 조치 필요
            </StateLabel>
            <AlertBanner type="error">
              <XCircle size={20} color="#ef4444" />
              <AlertText>
                <strong>서비스 장애 감지</strong> - 주요 API 서버의 응답이 없습니다. 즉시 확인이 필요합니다.
              </AlertText>
            </AlertBanner>
            <KPIGrid>
              <KPICard variant="error">
                <KPILabel>일일 가입자</KPILabel>
                <KPIValue color="#ef4444">342</KPIValue>
                <KPIChange>-87.9%</KPIChange>
              </KPICard>
              <KPICard variant="error">
                <KPILabel>활성 사용자</KPILabel>
                <KPIValue color="#ef4444">23,451</KPIValue>
                <KPIChange>-81.1%</KPIChange>
              </KPICard>
              <KPICard variant="error">
                <KPILabel>거래액 (일일)</KPILabel>
                <KPIValue color="#ef4444">₩8.3B</KPIValue>
                <KPIChange>-84.7%</KPIChange>
              </KPICard>
              <KPICard variant="error">
                <KPILabel>시스템 응답시간</KPILabel>
                <KPIValue color="#ef4444">TIMEOUT</KPIValue>
                <KPIChange>서버 무응답</KPIChange>
              </KPICard>
            </KPIGrid>
            <MetricsGrid>
              <MetricCard>
                <MetricLabel>서버 가동률</MetricLabel>
                <MetricValue style={{ color: '#ef4444' }}>23.12%</MetricValue>
              </MetricCard>
              <MetricCard>
                <MetricLabel>평균 TPS</MetricLabel>
                <MetricValue style={{ color: '#ef4444' }}>47</MetricValue>
              </MetricCard>
              <MetricCard>
                <MetricLabel>에러율</MetricLabel>
                <MetricValue style={{ color: '#ef4444' }}>34.7%</MetricValue>
              </MetricCard>
              <MetricCard>
                <MetricLabel>DB 연결 수</MetricLabel>
                <MetricValue style={{ color: '#ef4444' }}>198 / 200</MetricValue>
              </MetricCard>
            </MetricsGrid>
          </ScreenPreview>
        </MotionSection>

        {/* 로딩 상태 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <SectionHeader>
            <SectionTitle>
              <Loader2 size={28} color="#3b82f6" />
              로딩 상태
            </SectionTitle>
            <SectionDescription>
              대시보드 데이터를 불러오는 중
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="loading">
              <Loader2 size={16} className="animate-spin" />
              데이터 로딩 중
            </StateLabel>
            <LoadingSpinner>
              <Loader2 size={40} color="#3b82f6" />
              <LoadingText>성능 지표를 수집하는 중...</LoadingText>
            </LoadingSpinner>
          </ScreenPreview>
        </MotionSection>
      </Content>
    </Container>
  );
}
