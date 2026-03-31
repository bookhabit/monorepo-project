import { Link } from 'react-router';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, XCircle, Bell, Loader2, InboxIcon } from 'lucide-react';

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
  max-width: 900px;
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
  max-width: 480px;
  margin: 0 auto;
`;

const MobileFrame = styled.div`
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 24px;
  overflow: hidden;
`;

const StatusBar = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  padding-top: 8px;
  color: white;
  font-size: 12px;
  font-weight: 600;
`;

const PhoneContent = styled.div`
  background: #f9fafb;
  min-height: 640px;
`;

const NotificationList = styled.div`
  padding: 0;
`;

const NotificationItem = styled.div<{ read?: boolean }>`
  padding: 16px 20px;
  background: ${props => props.read ? 'white' : '#eff6ff'};
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #f3f4f6;
  }
`;

const NotificationBadge = styled.div<{ type: 'success' | 'warning' | 'error' | 'info' }>`
  display: inline-flex;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 4px;
  
  background: ${props => {
    switch (props.type) {
      case 'success': return '#dcfce7';
      case 'warning': return '#fef3c7';
      case 'error': return '#fee2e2';
      default: return '#dbeafe';
    }
  }};
  
  color: ${props => {
    switch (props.type) {
      case 'success': return '#166534';
      case 'warning': return '#854d0e';
      case 'error': return '#991b1b';
      default: return '#1e40af';
    }
  }};
`;

const NotificationTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
`;

const NotificationMessage = styled.div`
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 6px;
`;

const NotificationTime = styled.div`
  font-size: 11px;
  color: #9ca3af;
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

const EmptyState = styled.div`
  padding: 64px 24px;
  text-align: center;
  color: #9ca3af;
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

export function NotificationCenterScreens() {
  return (
    <Container>
      <Header>
        <BackButton to="/notification-center">
          <ArrowLeft size={20} />
        </BackButton>
        <Title>알림 센터 - 사용자 시나리오별 화면</Title>
      </Header>

      <Content>
        {/* 정상 상태 - 알림 있음 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader>
            <SectionTitle>
              <Bell size={28} color="#22c55e" />
              정상 상태 - 알림 목록
            </SectionTitle>
            <SectionDescription>
              SSE를 통해 실시간으로 수신된 알림들이 표시됩니다
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="success">
              <CheckCircle size={16} />
              실시간 수신 중
            </StateLabel>
            <MobileFrame>
              <StatusBar>
                <div>9:41</div>
                <div>🔋 100%</div>
              </StatusBar>
              <PhoneContent>
                <NotificationList>
                  <NotificationItem read={false}>
                    <NotificationBadge type="success">체결</NotificationBadge>
                    <NotificationTitle>매수 주문 체결</NotificationTitle>
                    <NotificationMessage>
                      삼성전자 100주가 75,000원에 체결되었습니다.
                    </NotificationMessage>
                    <NotificationTime>방금 전</NotificationTime>
                  </NotificationItem>
                  <NotificationItem read={false}>
                    <NotificationBadge type="info">시세</NotificationBadge>
                    <NotificationTitle>목표가 도달</NotificationTitle>
                    <NotificationMessage>
                      카카오가 설정한 목표가 55,000원에 도달했습니다.
                    </NotificationMessage>
                    <NotificationTime>5분 전</NotificationTime>
                  </NotificationItem>
                  <NotificationItem read={true}>
                    <NotificationBadge type="warning">알림</NotificationBadge>
                    <NotificationTitle>투자 유의 종목 지정</NotificationTitle>
                    <NotificationMessage>
                      네이버가 투자유의 종목으로 지정되었습니다.
                    </NotificationMessage>
                    <NotificationTime>1시간 전</NotificationTime>
                  </NotificationItem>
                  <NotificationItem read={true}>
                    <NotificationBadge type="success">입금</NotificationBadge>
                    <NotificationTitle>계좌 입금 완료</NotificationTitle>
                    <NotificationMessage>
                      5,000,000원이 입금되었습니다.
                    </NotificationMessage>
                    <NotificationTime>3시간 전</NotificationTime>
                  </NotificationItem>
                </NotificationList>
              </PhoneContent>
            </MobileFrame>
          </ScreenPreview>
        </MotionSection>

        {/* 빈 상태 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionHeader>
            <SectionTitle>
              <InboxIcon size={28} color="#9ca3af" />
              빈 상태
            </SectionTitle>
            <SectionDescription>
              아직 받은 알림이 없는 상태
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="info">
              알림 없음
            </StateLabel>
            <MobileFrame>
              <StatusBar>
                <div>9:41</div>
                <div>🔋 100%</div>
              </StatusBar>
              <PhoneContent>
                <EmptyState>
                  <InboxIcon size={64} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                  <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: '#111827' }}>
                    알림이 없습니다
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    새로운 알림이 도착하면 여기에 표시됩니다
                  </div>
                </EmptyState>
              </PhoneContent>
            </MobileFrame>
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
              초기 알림 목록을 불러오는 중
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="loading">
              <Loader2 size={16} className="animate-spin" />
              데이터 로딩 중
            </StateLabel>
            <MobileFrame>
              <StatusBar>
                <div>9:41</div>
                <div>🔋 100%</div>
              </StatusBar>
              <PhoneContent>
                <LoadingSpinner>
                  <Loader2 size={40} color="#3b82f6" />
                  <LoadingText>알림을 불러오는 중...</LoadingText>
                </LoadingSpinner>
              </PhoneContent>
            </MobileFrame>
          </ScreenPreview>
        </MotionSection>

        {/* 에러 상태 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <SectionHeader>
            <SectionTitle>
              <XCircle size={28} color="#ef4444" />
              에러 상태
            </SectionTitle>
            <SectionDescription>
              SSE 연결 실패 또는 네트워크 오류
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="error">
              <XCircle size={16} />
              연결 실패
            </StateLabel>
            <MobileFrame>
              <StatusBar>
                <div>9:41</div>
                <div>🔋 100%</div>
              </StatusBar>
              <PhoneContent>
                <EmptyState>
                  <XCircle size={64} color="#ef4444" style={{ margin: '0 auto 16px' }} />
                  <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: '#111827' }}>
                    알림을 불러올 수 없습니다
                  </div>
                  <div style={{ fontSize: '14px', marginBottom: '24px' }}>
                    네트워크 연결을 확인해주세요
                  </div>
                  <button
                    style={{
                      padding: '12px 24px',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    다시 시도
                  </button>
                </EmptyState>
              </PhoneContent>
            </MobileFrame>
          </ScreenPreview>
        </MotionSection>
      </Content>
    </Container>
  );
}
