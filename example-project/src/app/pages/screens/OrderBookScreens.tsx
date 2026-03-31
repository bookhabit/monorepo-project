import { Link } from 'react-router';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Loader2, Wifi, WifiOff } from 'lucide-react';
import { OrderBook } from '../../components/order-book';
import { OrderPanel } from '../../components/order-panel';
import { AccountInfo } from '../../components/account-info';

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

const MockNotification = styled.div<{ type: 'success' | 'error' | 'warning' }>`
  padding: 16px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  
  background: ${props => {
    switch (props.type) {
      case 'success': return 'rgba(34, 197, 94, 0.15)';
      case 'error': return 'rgba(239, 68, 68, 0.15)';
      default: return 'rgba(245, 158, 11, 0.15)';
    }
  }};
  
  border: 1px solid ${props => {
    switch (props.type) {
      case 'success': return '#22c55e';
      case 'error': return '#ef4444';
      default: return '#f59e0b';
    }
  }};
  
  color: #f9fafb;
  font-size: 14px;
  font-weight: 500;
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

const ConnectionStatus = styled.div<{ connected: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: ${props => props.connected ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  border: 1px solid ${props => props.connected ? '#22c55e' : '#ef4444'};
  border-radius: 8px;
  color: ${props => props.connected ? '#22c55e' : '#ef4444'};
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const GridDemo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MotionSection = motion.create(Section);

export function OrderBookScreens() {
  return (
    <Container>
      <Header>
        <BackButton to="/orderbook">
          <ArrowLeft size={20} />
        </BackButton>
        <Title>호가창 & 주문 보드 - 사용자 시나리오별 화면</Title>
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
              WebSocket 연결이 활성화되어 있고 실시간으로 호가 데이터가 스트리밍되는 상태
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="success">
              <CheckCircle size={16} />
              실시간 스트리밍 중
            </StateLabel>
            <ConnectionStatus connected>
              <Wifi size={16} />
              WebSocket 연결됨
            </ConnectionStatus>
            <GridDemo>
              <div>
                <OrderBook />
              </div>
              <div>
                <OrderPanel />
                <div style={{ marginTop: '16px' }}>
                  <AccountInfo />
                </div>
              </div>
            </GridDemo>
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
              초기 데이터를 불러오거나 WebSocket 연결을 시도하는 중
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="loading">
              <Loader2 size={16} className="animate-spin" />
              데이터 로딩 중
            </StateLabel>
            <LoadingSpinner>
              <Loader2 size={40} color="#3b82f6" />
              <LoadingText>호가 데이터를 불러오는 중...</LoadingText>
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
              네트워크 오류나 서버 장애로 인해 데이터를 불러올 수 없는 상태
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="error">
              <XCircle size={16} />
              연결 실패
            </StateLabel>
            <ConnectionStatus connected={false}>
              <WifiOff size={16} />
              WebSocket 연결 끊김
            </ConnectionStatus>
            <ErrorBox>
              <XCircle size={48} color="#ef4444" />
              <ErrorTitle>데이터를 불러올 수 없습니다</ErrorTitle>
              <ErrorMessage>
                네트워크 연결을 확인하거나 잠시 후 다시 시도해주세요.
              </ErrorMessage>
              <RetryButton>다시 시도</RetryButton>
            </ErrorBox>
          </ScreenPreview>
        </MotionSection>

        {/* 주문 성공 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <SectionHeader>
            <SectionTitle>
              <CheckCircle size={28} color="#22c55e" />
              주문 성공
            </SectionTitle>
            <SectionDescription>
              매수/매도 주문이 정상적으로 접수된 상태
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="success">
              <CheckCircle size={16} />
              주문 체결 완료
            </StateLabel>
            <MockNotification type="success">
              <CheckCircle size={20} />
              <div>
                <strong>매수 주문이 체결되었습니다</strong>
                <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>
                  삼성전자 100주 @ 75,000원
                </div>
              </div>
            </MockNotification>
            <GridDemo>
              <div>
                <OrderBook />
              </div>
              <div>
                <OrderPanel />
              </div>
            </GridDemo>
          </ScreenPreview>
        </MotionSection>

        {/* 주문 실패 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <SectionHeader>
            <SectionTitle>
              <XCircle size={28} color="#ef4444" />
              주문 실패
            </SectionTitle>
            <SectionDescription>
              잔액 부족, 시장가 제한 등의 이유로 주문이 거부된 상태
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="error">
              <XCircle size={16} />
              주문 거부
            </StateLabel>
            <MockNotification type="error">
              <XCircle size={20} />
              <div>
                <strong>주문이 실패했습니다</strong>
                <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>
                  잔액이 부족합니다. (보유 현금: 3,500,000원)
                </div>
              </div>
            </MockNotification>
            <GridDemo>
              <div>
                <OrderBook />
              </div>
              <div>
                <OrderPanel />
              </div>
            </GridDemo>
          </ScreenPreview>
        </MotionSection>

        {/* 가격 제한 경고 */}
        <MotionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <SectionHeader>
            <SectionTitle>
              <AlertCircle size={28} color="#f59e0b" />
              가격 제한 경고
            </SectionTitle>
            <SectionDescription>
              시장가격에서 너무 멀리 떨어진 가격으로 주문하려고 할 때
            </SectionDescription>
          </SectionHeader>
          <ScreenPreview>
            <StateLabel type="warning">
              <AlertCircle size={16} />
              가격 확인 필요
            </StateLabel>
            <MockNotification type="warning">
              <AlertCircle size={20} />
              <div>
                <strong>가격을 확인해주세요</strong>
                <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>
                  현재 시장가(75,000원)보다 10% 이상 차이나는 가격입니다.
                </div>
              </div>
            </MockNotification>
            <GridDemo>
              <div>
                <OrderBook />
              </div>
              <div>
                <OrderPanel />
              </div>
            </GridDemo>
          </ScreenPreview>
        </MotionSection>
      </Content>
    </Container>
  );
}
