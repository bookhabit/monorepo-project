import { Link } from 'react-router';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle, Loader2, Shield } from 'lucide-react';

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

const StateLabel = styled.div<{ type: 'success' | 'error' | 'warning' | 'info' | 'loading' | 'danger' }>`
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
      case 'danger': return 'rgba(220, 38, 38, 0.1)';
      case 'loading': return 'rgba(59, 130, 246, 0.1)';
      default: return 'rgba(156, 163, 175, 0.1)';
    }
  }};
  
  color: ${props => {
    switch (props.type) {
      case 'success': return '#22c55e';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'danger': return '#dc2626';
      case 'loading': return '#3b82f6';
      default: return '#9ca3af';
    }
  }};
  
  border: 1px solid ${props => {
    switch (props.type) {
      case 'success': return 'rgba(34, 197, 94, 0.2)';
      case 'error': return 'rgba(239, 68, 68, 0.2)';
      case 'warning': return 'rgba(245, 158, 11, 0.2)';
      case 'danger': return 'rgba(220, 38, 38, 0.2)';
      case 'loading': return 'rgba(59, 130, 246, 0.2)';
      default: return 'rgba(156, 163, 175, 0.2)';
    }
  }};
`;

const AlertsGrid = styled.div`
  display: grid;
  gap: 16px;
`;

const AlertCard = styled.div<{ severity: 'high' | 'medium' | 'low' }>`
  background: ${props => {
    switch (props.severity) {
      case 'high': return 'rgba(220, 38, 38, 0.1)';
      case 'medium': return 'rgba(245, 158, 11, 0.1)';
      case 'low': return 'rgba(59, 130, 246, 0.1)';
    }
  }};
  border: 1px solid ${props => {
    switch (props.severity) {
      case 'high': return '#dc2626';
      case 'medium': return '#f59e0b';
      case 'low': return '#3b82f6';
    }
  }};
  border-radius: 12px;
  padding: 20px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 16px;
  align-items: start;
`;

const AlertIcon = styled.div<{ severity: 'high' | 'medium' | 'low' }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => {
    switch (props.severity) {
      case 'high': return 'rgba(220, 38, 38, 0.2)';
      case 'medium': return 'rgba(245, 158, 11, 0.2)';
      case 'low': return 'rgba(59, 130, 246, 0.2)';
    }
  }};
`;

const AlertContent = styled.div`
  flex: 1;
`;

const AlertTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #f9fafb;
  margin-bottom: 4px;
`;

const AlertDescription = styled.div`
  font-size: 13px;
  color: #9ca3af;
  margin-bottom: 8px;
`;

const AlertMeta = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

const AlertActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ variant?: 'danger' | 'secondary' }>`
  padding: 8px 16px;
  background: ${props => props.variant === 'danger' ? '#dc2626' : '#374151'};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.variant === 'danger' ? '#b91c1c' : '#4b5563'};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background: #1f2937;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #374151;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 8px;
`;

const StatValue = styled.div<{ color?: string }>`
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.color || '#f9fafb'};
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

const MotionSection = motion.create(Section);

export function FDSReportScreens() {
  return (
    <Container>
      <Header>
        <BackButton to="/fds-report">
          <ArrowLeft size={20} />
        </BackButton>
        <Title>이상 거래 탐지 (FDS) - 사용자 시나리오별 화면</Title>
      </Header>

      <Content>
        {/* 정상 상태 - 실시간 모니터링 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader>
            <SectionTitle>
              <AlertTriangle size={28} color="#f59e0b" />
              정상 상태 - 실시간 모니터링
            </SectionTitle>
            <SectionDescription>
              의심 거래가 실시간으로 탐지되어 표시되는 상태
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="warning">
              <AlertTriangle size={16} />
              실시간 모니터링 중
            </StateLabel>
            <StatsGrid>
              <StatCard>
                <StatLabel>오늘 탐지</StatLabel>
                <StatValue color="#dc2626">127</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>처리 대기</StatLabel>
                <StatValue color="#f59e0b">23</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>차단됨</StatLabel>
                <StatValue color="#22c55e">104</StatValue>
              </StatCard>
            </StatsGrid>
            <AlertsGrid>
              <AlertCard severity="high">
                <AlertIcon severity="high">
                  <AlertTriangle size={20} color="#dc2626" />
                </AlertIcon>
                <AlertContent>
                  <AlertTitle>고위험 거래 탐지</AlertTitle>
                  <AlertDescription>
                    단기간 내 동일 계좌로 여러 차례 고액 송금
                  </AlertDescription>
                  <AlertMeta>
                    계정: user_4829 • 금액: 50,000,000원 • 방금 전
                  </AlertMeta>
                </AlertContent>
                <AlertActions>
                  <ActionButton variant="danger">차단</ActionButton>
                  <ActionButton variant="secondary">검토</ActionButton>
                </AlertActions>
              </AlertCard>
              <AlertCard severity="medium">
                <AlertIcon severity="medium">
                  <AlertTriangle size={20} color="#f59e0b" />
                </AlertIcon>
                <AlertContent>
                  <AlertTitle>중위험 패턴 발견</AlertTitle>
                  <AlertDescription>
                    새벽 시간대 비정상적인 거래 활동
                  </AlertDescription>
                  <AlertMeta>
                    계정: user_1234 • 금액: 15,000,000원 • 5분 전
                  </AlertMeta>
                </AlertContent>
                <AlertActions>
                  <ActionButton variant="danger">차단</ActionButton>
                  <ActionButton variant="secondary">검토</ActionButton>
                </AlertActions>
              </AlertCard>
              <AlertCard severity="low">
                <AlertIcon severity="low">
                  <AlertTriangle size={20} color="#3b82f6" />
                </AlertIcon>
                <AlertContent>
                  <AlertTitle>저위험 알림</AlertTitle>
                  <AlertDescription>
                    평소와 다른 지역에서의 로그인 시도
                  </AlertDescription>
                  <AlertMeta>
                    계정: user_9876 • IP: 192.168.1.1 • 10분 전
                  </AlertMeta>
                </AlertContent>
                <AlertActions>
                  <ActionButton variant="secondary">검토</ActionButton>
                </AlertActions>
              </AlertCard>
            </AlertsGrid>
          </ScreenPreview>
        </MotionSection>

        {/* 차단 성공 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionHeader>
            <SectionTitle>
              <Shield size={28} color="#22c55e" />
              차단 성공
            </SectionTitle>
            <SectionDescription>
              의심 거래가 성공적으로 차단된 상태
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="success">
              <CheckCircle size={16} />
              거래 차단 완료
            </StateLabel>
            <div style={{ 
              padding: '48px 24px', 
              textAlign: 'center',
              background: 'rgba(34, 197, 94, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(34, 197, 94, 0.2)'
            }}>
              <Shield size={64} color="#22c55e" style={{ margin: '0 auto 24px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f9fafb', marginBottom: '12px' }}>
                의심 거래가 차단되었습니다
              </h3>
              <p style={{ color: '#9ca3af', fontSize: '14px' }}>
                계정 user_4829의 고액 송금 시도가 차단되었습니다.
              </p>
            </div>
          </ScreenPreview>
        </MotionSection>

        {/* 로딩 상태 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SectionHeader>
            <SectionTitle>
              <Loader2 size={28} color="#3b82f6" />
              로딩 상태
            </SectionTitle>
            <SectionDescription>
              거래 내역을 분석하는 중
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="loading">
              <Loader2 size={16} className="animate-spin" />
              데이터 분석 중
            </StateLabel>
            <LoadingSpinner>
              <Loader2 size={40} color="#3b82f6" />
              <LoadingText>의심 거래 패턴을 분석하는 중...</LoadingText>
            </LoadingSpinner>
          </ScreenPreview>
        </MotionSection>

        {/* 권한 부족 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <SectionHeader>
            <SectionTitle>
              <XCircle size={28} color="#ef4444" />
              권한 부족
            </SectionTitle>
            <SectionDescription>
              RBAC 권한 제어에 의해 접근이 제한된 상태
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="error">
              <XCircle size={16} />
              접근 제한
            </StateLabel>
            <div style={{ 
              padding: '64px 24px', 
              textAlign: 'center',
              background: 'rgba(239, 68, 68, 0.05)',
              borderRadius: '12px'
            }}>
              <Shield size={64} color="#ef4444" style={{ margin: '0 auto 24px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f9fafb', marginBottom: '12px' }}>
                접근 권한이 없습니다
              </h3>
              <p style={{ color: '#9ca3af', fontSize: '14px' }}>
                FDS 시스템에 접근하려면 보안 관리자 권한이 필요합니다.
              </p>
            </div>
          </ScreenPreview>
        </MotionSection>
      </Content>
    </Container>
  );
}
