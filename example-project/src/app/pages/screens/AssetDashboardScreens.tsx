import { Link } from 'react-router';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Loader2, TrendingUp, TrendingDown } from 'lucide-react';
import { PerformanceChart } from '../../components/asset/PerformanceChart';
import { AssetTable } from '../../components/asset/AssetTable';
import { ThemeProvider } from '../../contexts/ThemeContext';

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
  margin-bottom: 24px;
`;

const KPICard = styled.div`
  background: #1f2937;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #374151;
`;

const KPILabel = styled.div`
  font-size: 13px;
  color: #9ca3af;
  margin-bottom: 8px;
`;

const KPIValue = styled.div<{ trend?: 'up' | 'down' }>`
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.trend === 'up' ? '#22c55e' : props.trend === 'down' ? '#ef4444' : '#f9fafb'};
  display: flex;
  align-items: center;
  gap: 8px;
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

const ErrorBox = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 2px dashed #ef4444;
  border-radius: 12px;
  padding: 48px;
  text-align: center;
`;

const ErrorTitle = styled.h4`
  font-size: 20px;
  font-weight: 700;
  color: #ef4444;
  margin: 0 0 12px 0;
`;

const ErrorMessage = styled.p`
  font-size: 14px;
  color: #9ca3af;
  margin: 0 0 20px 0;
`;

const RetryButton = styled.button`
  padding: 12px 24px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #dc2626;
  }
`;

const MotionSection = motion.create(Section);

export function AssetDashboardScreens() {
  return (
    <ThemeProvider>
      <Container>
        <Header>
          <BackButton to="/asset-dashboard">
            <ArrowLeft size={20} />
          </BackButton>
          <Title>자산 분석 대시보드 - 사용자 시나리오별 화면</Title>
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
                <CheckCircle size={28} color="#22c55e" />
                정상 상태 (Happy Path)
              </SectionTitle>
              <SectionDescription>
                모든 자산 데이터가 정상적으로 로드되어 실시간으로 업데이트되는 상태
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <CheckCircle size={16} />
                데이터 동기화 완료
              </StateLabel>
              <KPIGrid>
                <KPICard>
                  <KPILabel>총 자산 평가액</KPILabel>
                  <KPIValue trend="up">
                    ₩125,430,000
                    <TrendingUp size={24} />
                  </KPIValue>
                </KPICard>
                <KPICard>
                  <KPILabel>총 수익률</KPILabel>
                  <KPIValue trend="up">
                    +18.5%
                    <TrendingUp size={24} />
                  </KPIValue>
                </KPICard>
                <KPICard>
                  <KPILabel>오늘의 손익</KPILabel>
                  <KPIValue trend="up">
                    +2,340,000
                  </KPIValue>
                </KPICard>
              </KPIGrid>
              <PerformanceChart />
              <div style={{ marginTop: '24px' }}>
                <AssetTable />
              </div>
            </ScreenPreview>
          </MotionSection>

          {/* 로딩 상태 */}
          <MotionSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionHeader>
              <SectionTitle>
                <Loader2 size={28} color="#3b82f6" />
                로딩 상태
              </SectionTitle>
              <SectionDescription>
                초기 자산 데이터를 불러오는 중
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="loading">
                <Loader2 size={16} className="animate-spin" />
                데이터 로딩 중
              </StateLabel>
              <LoadingSpinner>
                <Loader2 size={40} color="#3b82f6" />
                <LoadingText>자산 데이터를 분석하는 중...</LoadingText>
              </LoadingSpinner>
            </ScreenPreview>
          </MotionSection>

          {/* 에러 상태 */}
          <MotionSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SectionHeader>
              <SectionTitle>
                <XCircle size={28} color="#ef4444" />
                에러 상태
              </SectionTitle>
              <SectionDescription>
                서버 장애 또는 네트워크 오류로 인해 데이터를 불러올 수 없는 상태
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="error">
                <XCircle size={16} />
                데이터 로드 실패
              </StateLabel>
              <ErrorBox>
                <XCircle size={48} color="#ef4444" />
                <ErrorTitle>자산 데이터를 불러올 수 없습니다</ErrorTitle>
                <ErrorMessage>
                  서버 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요.
                </ErrorMessage>
                <RetryButton>다시 시도</RetryButton>
              </ErrorBox>
            </ScreenPreview>
          </MotionSection>

          {/* 손실 상태 */}
          <MotionSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <SectionHeader>
              <SectionTitle>
                <TrendingDown size={28} color="#ef4444" />
                손실 상태
              </SectionTitle>
              <SectionDescription>
                포트폴리오가 마이너스 수익률을 기록하고 있는 상태
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="warning">
                <AlertCircle size={16} />
                손실 발생
              </StateLabel>
              <KPIGrid>
                <KPICard>
                  <KPILabel>총 자산 평가액</KPILabel>
                  <KPIValue trend="down">
                    ₩98,230,000
                    <TrendingDown size={24} />
                  </KPIValue>
                </KPICard>
                <KPICard>
                  <KPILabel>총 수익률</KPILabel>
                  <KPIValue trend="down">
                    -8.2%
                    <TrendingDown size={24} />
                  </KPIValue>
                </KPICard>
                <KPICard>
                  <KPILabel>오늘의 손익</KPILabel>
                  <KPIValue trend="down">
                    -1,540,000
                  </KPIValue>
                </KPICard>
              </KPIGrid>
              <PerformanceChart />
            </ScreenPreview>
          </MotionSection>
        </Content>
      </Container>
    </ThemeProvider>
  );
}