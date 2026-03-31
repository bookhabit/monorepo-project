import { useState } from 'react';
import styled from '@emotion/styled';
import { X, Monitor, CheckCircle, XCircle, AlertCircle, Loader2, Wifi, WifiOff } from 'lucide-react';
import { OrderBook } from './order-book';
import { OrderPanel } from './order-panel';
import { AccountInfo } from './account-info';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  height: 90vh;
  background: #111827;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const Header = styled.div`
  padding: 20px 24px;
  background: #1f2937;
  border-bottom: 1px solid #374151;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #f9fafb;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CloseButton = styled.button`
  padding: 8px;
  background: transparent;
  border: 1px solid #374151;
  border-radius: 8px;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #374151;
    color: #f9fafb;
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 32px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #1f2937;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 4px;
  }
`;

const Section = styled.div`
  margin-bottom: 48px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #f9fafb;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SectionDescription = styled.p`
  font-size: 14px;
  color: #9ca3af;
  margin: 0;
  line-height: 1.6;
`;

const ScreenPreview = styled.div`
  background: linear-gradient(to bottom right, #0f172a, #1e293b);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #374151;
`;

const StateLabel = styled.div<{ type: 'success' | 'error' | 'warning' | 'info' | 'loading' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 16px;
  
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
  padding: 48px;
  gap: 16px;
  
  svg {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ErrorBox = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 2px dashed #ef4444;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
`;

const ErrorTitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: #ef4444;
  margin: 0 0 8px 0;
`;

const ErrorMessage = styled.p`
  font-size: 14px;
  color: #9ca3af;
  margin: 0 0 16px 0;
`;

const RetryButton = styled.button`
  padding: 10px 20px;
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

const EmptyState = styled.div`
  padding: 48px;
  text-align: center;
  color: #9ca3af;
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
  margin-bottom: 16px;
`;

const HighlightBox = styled.div`
  background: rgba(59, 130, 246, 0.1);
  border: 2px solid #3b82f6;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const HighlightText = styled.p`
  color: #3b82f6;
  font-size: 14px;
  font-weight: 600;
  margin: 0;
`;

const GridDemo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

interface ScreensViewerProps {
  onClose: () => void;
}

export function ScreensViewer({ onClose }: ScreensViewerProps) {
  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>
            <Monitor size={24} />
            사용자 시나리오별 화면 정의
          </Title>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </Header>

        <Content>
          {/* 1. 초기 로딩 상태 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Loader2 size={24} />
                1. 초기 로딩 상태
              </SectionTitle>
              <SectionDescription>
                애플리케이션 시작 시 WebSocket 연결 및 데이터 로딩 중인 상태
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="loading">
                <Loader2 size={14} />
                Loading
              </StateLabel>
              <LoadingSpinner>
                <Loader2 size={48} color="#3b82f6" />
                <div style={{ color: '#9ca3af', fontSize: '14px' }}>
                  호가 데이터 로딩 중...
                </div>
              </LoadingSpinner>
            </ScreenPreview>
          </Section>

          {/* 2. WebSocket 연결 성공 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Wifi size={24} />
                2. WebSocket 연결 성공
              </SectionTitle>
              <SectionDescription>
                실시간 데이터 스트리밍이 정상적으로 연결된 상태
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <CheckCircle size={14} />
                Connected
              </StateLabel>
              <ConnectionStatus connected={true}>
                <Wifi size={16} />
                WebSocket 연결됨 • 500ms 업데이트
              </ConnectionStatus>
              <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                ✓ 매수/매도 호가 10단계 실시간 스트리밍<br />
                ✓ 잔량 비율 바 그래프 동적 렌더링<br />
                ✓ React.memo를 통한 개별 행 최적화
              </div>
            </ScreenPreview>
          </Section>

          {/* 3. 호가 가격 클릭 - 매수 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                3. 원클릭 주문 - 매수 호가 선택
              </SectionTitle>
              <SectionDescription>
                매수 호가(녹색) 클릭 시 주문창에 해당 가격이 자동 입력되고 매수 탭 활성화
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <AlertCircle size={14} />
                User Action: 가격 클릭
              </StateLabel>
              <HighlightBox>
                <HighlightText>
                  클릭한 가격: 49,850원 → 주문 패널에 자동 입력
                </HighlightText>
              </HighlightBox>
              <div style={{ 
                background: '#1f2937', 
                padding: '16px', 
                borderRadius: '8px',
                fontSize: '13px',
                color: '#9ca3af'
              }}>
                <div style={{ marginBottom: '8px', fontWeight: 600, color: '#22c55e' }}>
                  매수 모드 활성화
                </div>
                <div>• 주문 가격: <span style={{ color: '#f9fafb', fontWeight: 600 }}>49,850원</span></div>
                <div>• 보유 현금: <span style={{ color: '#f9fafb', fontWeight: 600 }}>10,000,000원</span></div>
                <div>• 매수 가능 수량: <span style={{ color: '#3b82f6', fontWeight: 600 }}>200주</span></div>
              </div>
            </ScreenPreview>
          </Section>

          {/* 4. 호가 가격 클릭 - 매도 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                4. 원클릭 주문 - 매도 호가 선택
              </SectionTitle>
              <SectionDescription>
                매도 호가(빨간색) 클릭 시 주문창에 해당 가격이 자동 입력되고 매도 탭 활성화
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <AlertCircle size={14} />
                User Action: 가격 클릭
              </StateLabel>
              <HighlightBox>
                <HighlightText>
                  클릭한 가격: 50,150원 → 주문 패널에 자동 입력
                </HighlightText>
              </HighlightBox>
              <div style={{ 
                background: '#1f2937', 
                padding: '16px', 
                borderRadius: '8px',
                fontSize: '13px',
                color: '#9ca3af'
              }}>
                <div style={{ marginBottom: '8px', fontWeight: 600, color: '#ef4444' }}>
                  매도 모드 활성화
                </div>
                <div>• 주문 가격: <span style={{ color: '#f9fafb', fontWeight: 600 }}>50,150원</span></div>
                <div>• 보유 주식: <span style={{ color: '#f9fafb', fontWeight: 600 }}>0주</span></div>
                <div>• 매도 가능 수량: <span style={{ color: '#3b82f6', fontWeight: 600 }}>0주</span></div>
              </div>
            </ScreenPreview>
          </Section>

          {/* 5. 주문 수량 입력 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                5. 주문 수량 입력 및 실시간 계산
              </SectionTitle>
              <SectionDescription>
                수량 입력 시 주문 총액이 실시간으로 계산되어 표시
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <AlertCircle size={14} />
                User Action: 수량 입력
              </StateLabel>
              <div style={{ 
                background: '#1f2937', 
                padding: '16px', 
                borderRadius: '8px',
                fontSize: '13px',
                color: '#9ca3af'
              }}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: 600, color: '#9ca3af', marginBottom: '4px' }}>주문 수량</div>
                  <div style={{ color: '#f9fafb', fontSize: '16px', fontWeight: 600 }}>50주</div>
                </div>
                <div style={{ 
                  borderTop: '1px solid #374151', 
                  paddingTop: '12px',
                  marginTop: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>주문 총액</span>
                    <span style={{ color: '#3b82f6', fontWeight: 600 }}>2,492,500원</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>매수 가능</span>
                    <span style={{ color: '#f9fafb', fontWeight: 600 }}>200주</span>
                  </div>
                </div>
              </div>
            </ScreenPreview>
          </Section>

          {/* 6. 최대 수량 버튼 클릭 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                6. 최대 매수/매도 가능 수량 적용
              </SectionTitle>
              <SectionDescription>
                "최대" 버튼 클릭 시 보유 현금 또는 주식 기준으로 최대 수량 자동 입력
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <AlertCircle size={14} />
                User Action: 최대 버튼 클릭
              </StateLabel>
              <GridDemo>
                <div style={{ 
                  background: '#1f2937', 
                  padding: '16px', 
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: '#9ca3af'
                }}>
                  <div style={{ fontWeight: 600, color: '#22c55e', marginBottom: '8px' }}>
                    매수 시
                  </div>
                  <div>보유 현금: 10,000,000원</div>
                  <div>주문 가격: 49,850원</div>
                  <div style={{ marginTop: '8px', color: '#3b82f6', fontWeight: 600 }}>
                    → 최대 200주 자동 입력
                  </div>
                </div>
                <div style={{ 
                  background: '#1f2937', 
                  padding: '16px', 
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: '#9ca3af'
                }}>
                  <div style={{ fontWeight: 600, color: '#ef4444', marginBottom: '8px' }}>
                    매도 시
                  </div>
                  <div>보유 주식: 150주</div>
                  <div>주문 가격: 50,150원</div>
                  <div style={{ marginTop: '8px', color: '#3b82f6', fontWeight: 600 }}>
                    → 최대 150주 자동 입력
                  </div>
                </div>
              </GridDemo>
            </ScreenPreview>
          </Section>

          {/* 7. 주문 성공 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <CheckCircle size={24} />
                7. 주문 성공 알림
              </SectionTitle>
              <SectionDescription>
                주문 버튼 클릭 후 정상적으로 주문이 접수된 경우
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <CheckCircle size={14} />
                Success
              </StateLabel>
              <MockNotification type="success">
                <CheckCircle size={20} />
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '2px' }}>주문이 접수되었습니다</div>
                  <div style={{ fontSize: '12px', color: '#d1d5db' }}>
                    매수 50주 • 49,850원
                  </div>
                </div>
              </MockNotification>
              <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                ✓ 주문 입력 필드 초기화<br />
                ✓ 계좌 잔고 업데이트 (실제 환경에서)
              </div>
            </ScreenPreview>
          </Section>

          {/* 8. 가격/수량 미입력 에러 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <XCircle size={24} />
                8. 입력값 검증 에러
              </SectionTitle>
              <SectionDescription>
                주문 가격 또는 수량을 입력하지 않은 상태에서 주문 시도
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="error">
                <XCircle size={14} />
                Validation Error
              </StateLabel>
              <MockNotification type="error">
                <XCircle size={20} />
                <div>
                  <div style={{ fontWeight: 600 }}>가격과 수량을 입력해주세요</div>
                </div>
              </MockNotification>
              <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                검증 조건:<br />
                • 주문 가격 &gt; 0<br />
                • 주문 수량 &gt; 0
              </div>
            </ScreenPreview>
          </Section>

          {/* 9. 잔고 부족 에러 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <XCircle size={24} />
                9. 보유 현금 부족 에러
              </SectionTitle>
              <SectionDescription>
                매수 시 주문 총액이 보유 현금보다 많은 경우
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="error">
                <XCircle size={14} />
                Insufficient Balance
              </StateLabel>
              <MockNotification type="error">
                <XCircle size={20} />
                <div>
                  <div style={{ fontWeight: 600 }}>보유 현금이 부족합니다</div>
                </div>
              </MockNotification>
              <div style={{ 
                background: '#1f2937', 
                padding: '16px', 
                borderRadius: '8px',
                fontSize: '13px',
                color: '#9ca3af',
                marginTop: '12px'
              }}>
                <div>주문 총액: <span style={{ color: '#ef4444', fontWeight: 600 }}>15,000,000원</span></div>
                <div>보유 현금: <span style={{ color: '#f9fafb', fontWeight: 600 }}>10,000,000원</span></div>
                <div style={{ marginTop: '8px', color: '#ef4444', fontSize: '12px' }}>
                  부족 금액: 5,000,000원
                </div>
              </div>
            </ScreenPreview>
          </Section>

          {/* 10. 보유 수량 부족 에러 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <XCircle size={24} />
                10. 보유 주식 부족 에러
              </SectionTitle>
              <SectionDescription>
                매도 시 주문 수량이 보유 주식보다 많은 경우
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="error">
                <XCircle size={14} />
                Insufficient Stock
              </StateLabel>
              <MockNotification type="error">
                <XCircle size={20} />
                <div>
                  <div style={{ fontWeight: 600 }}>보유 수량이 부족합니다</div>
                </div>
              </MockNotification>
              <div style={{ 
                background: '#1f2937', 
                padding: '16px', 
                borderRadius: '8px',
                fontSize: '13px',
                color: '#9ca3af',
                marginTop: '12px'
              }}>
                <div>매도 수량: <span style={{ color: '#ef4444', fontWeight: 600 }}>100주</span></div>
                <div>보유 주식: <span style={{ color: '#f9fafb', fontWeight: 600 }}>50주</span></div>
                <div style={{ marginTop: '8px', color: '#ef4444', fontSize: '12px' }}>
                  부족 수량: 50주
                </div>
              </div>
            </ScreenPreview>
          </Section>

          {/* 11. WebSocket 연결 실패 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <WifiOff size={24} />
                11. WebSocket 연결 실패
              </SectionTitle>
              <SectionDescription>
                네트워크 문제로 실시간 데이터 연결이 끊긴 경우
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="error">
                <WifiOff size={14} />
                Connection Lost
              </StateLabel>
              <ConnectionStatus connected={false}>
                <WifiOff size={16} />
                WebSocket 연결 끊김 • 재연결 시도 중...
              </ConnectionStatus>
              <ErrorBox>
                <WifiOff size={48} color="#ef4444" style={{ marginBottom: '16px' }} />
                <ErrorTitle>실시간 데이터 연결이 끊겼습니다</ErrorTitle>
                <ErrorMessage>
                  네트워크 연결을 확인하고 다시 시도해주세요
                </ErrorMessage>
                <RetryButton>재연결</RetryButton>
              </ErrorBox>
            </ScreenPreview>
          </Section>

          {/* 12. 데이터 없음 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <AlertCircle size={24} />
                12. 빈 데이터 상태
              </SectionTitle>
              <SectionDescription>
                호가 데이터가 없거나 시장이 열리지 않은 경우
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="warning">
                <AlertCircle size={14} />
                No Data
              </StateLabel>
              <EmptyState>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#f9fafb', marginBottom: '8px' }}>
                  호가 데이터가 없습니다
                </div>
                <div style={{ fontSize: '14px' }}>
                  시장 시간을 확인하거나 잠시 후 다시 시도해주세요
                </div>
              </EmptyState>
            </ScreenPreview>
          </Section>

          {/* 13. 호가 업데이트 애니메이션 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                13. 실시간 호가 업데이트 시각화
              </SectionTitle>
              <SectionDescription>
                500ms마다 호가가 변경될 때 잔량 바 그래프가 부드럽게 애니메이션
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <Wifi size={14} />
                Real-time Update
              </StateLabel>
              <div style={{ 
                background: '#1f2937', 
                padding: '16px', 
                borderRadius: '8px',
                fontSize: '13px',
                color: '#9ca3af'
              }}>
                <div style={{ fontWeight: 600, color: '#f9fafb', marginBottom: '12px' }}>
                  최적화 기법
                </div>
                <div style={{ marginBottom: '6px' }}>
                  ✓ React.memo로 OrderBookRow 메모이제이션
                </div>
                <div style={{ marginBottom: '6px' }}>
                  ✓ Emotion의 동적 스타일링으로 잔량 바 width 변경
                </div>
                <div style={{ marginBottom: '6px' }}>
                  ✓ CSS transition으로 부드러운 애니메이션 (0.2s ease)
                </div>
                <div>
                  ✓ useMemo로 최대 잔량 계산 캐싱
                </div>
              </div>
            </ScreenPreview>
          </Section>

          {/* 14. 반응형 레이아웃 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                14. 반응형 레이아웃 (모바일/태블릿)
              </SectionTitle>
              <SectionDescription>
                화면 크기에 따라 레이아웃이 자동으로 조정
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <Monitor size={14} />
                Responsive Design
              </StateLabel>
              <GridDemo>
                <div style={{ 
                  background: '#1f2937', 
                  padding: '16px', 
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: '#9ca3af'
                }}>
                  <div style={{ fontWeight: 600, color: '#f9fafb', marginBottom: '8px' }}>
                    데스크탑 (1024px+)
                  </div>
                  <div>• 2컬럼 그리드 레이아웃</div>
                  <div>• 호가창 + 주문 패널 나란히</div>
                  <div>• 성능 인디케이터 표시</div>
                </div>
                <div style={{ 
                  background: '#1f2937', 
                  padding: '16px', 
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: '#9ca3af'
                }}>
                  <div style={{ fontWeight: 600, color: '#f9fafb', marginBottom: '8px' }}>
                    모바일 (~1024px)
                  </div>
                  <div>• 1컬럼 세로 레이아웃</div>
                  <div>• 호가창 위, 주문 패널 아래</div>
                  <div>• 성능 인디케이터 숨김</div>
                </div>
              </GridDemo>
            </ScreenPreview>
          </Section>
        </Content>
      </Container>
    </Overlay>
  );
}
