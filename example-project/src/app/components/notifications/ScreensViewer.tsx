import styled from '@emotion/styled';
import { X, Monitor, Bell, TrendingUp, Loader2, Wifi, WifiOff, Trash2, CheckCheck, RefreshCw } from 'lucide-react';

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

const DemoPhone = styled.div`
  width: 375px;
  height: 600px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const PhoneHeader = styled.div`
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PhoneContent = styled.div`
  height: calc(100% - 57px);
  overflow-y: auto;
  background: #f9fafb;
`;

const Toast = styled.div<{ variant?: string }>`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 340px;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border-left: 4px solid ${props => props.variant === 'alert' ? '#f59e0b' : '#22c55e'};
  animation: slideIn 0.3s ease;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const NotifItem = styled.div<{ unread?: boolean }>`
  background: ${props => props.unread ? '#f0f9ff' : 'white'};
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  gap: 12px;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${props => props.unread ? '#e0f2fe' : '#f9fafb'};
  }
`;

const GridDemo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const HighlightBox = styled.div`
  background: rgba(59, 130, 246, 0.1);
  border: 2px solid #3b82f6;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const CodeBlock = styled.div`
  background: #1f2937;
  padding: 20px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 13px;
  color: #9ca3af;
  line-height: 1.8;
  overflow-x: auto;
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
            알림 센터 - 사용자 시나리오별 화면
          </Title>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </Header>

        <Content>
          {/* 1. SSE 실시간 알림 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Wifi size={24} />
                1. SSE 실시간 알림 스트리밍
              </SectionTitle>
              <SectionDescription>
                Server-Sent Events로 실시간 알림을 받아 상단 토스트와 리스트에 즉시 반영
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <Wifi size={14} />
                SSE Connected
              </StateLabel>
              <DemoPhone>
                <PhoneHeader>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>알림 센터</div>
                  <div style={{ width: '24px', height: '24px', background: '#ef4444', borderRadius: '12px', color: 'white', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</div>
                </PhoneHeader>
                <div style={{ position: 'relative' }}>
                  <Toast variant="alert">
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                        <TrendingUp size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>목표가 도달 알림</div>
                        <div style={{ fontSize: '13px', color: '#6b7280' }}>AAPL이 목표가 $175에 도달했습니다.</div>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #f3f4f6', fontSize: '12px', color: '#6b7280' }}>
                          <span><strong>AAPL</strong></span>
                          <span>가격: <strong>175,000원</strong></span>
                        </div>
                      </div>
                    </div>
                  </Toast>
                  <PhoneContent>
                    <div style={{ padding: '16px 16px 8px', fontSize: '12px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>실시간 알림 (3)</div>
                    <NotifItem unread>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', marginTop: '6px' }}></div>
                      <div style={{ width: '40px', height: '40px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                        <TrendingUp size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>목표가 도달 알림</div>
                        <div style={{ fontSize: '13px', color: '#6b7280' }}>AAPL이 목표가 $175에 도달했습니다.</div>
                      </div>
                    </NotifItem>
                    <NotifItem unread>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', marginTop: '6px' }}></div>
                      <div style={{ width: '40px', height: '40px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e' }}>
                        <Bell size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>매수 체결 완료</div>
                        <div style={{ fontSize: '13px', color: '#6b7280' }}>MSFT 30주가 체결되었습니다.</div>
                      </div>
                    </NotifItem>
                  </PhoneContent>
                </div>
              </DemoPhone>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ SSE 연결 시작: notificationSSE.connect()<br />
                ✓ 5-15초마다 랜덤 알림 생성 (Mock)<br />
                ✓ Jotai addNotificationAtom으로 상태 추가<br />
                ✓ Toast 자동 표시 (5초 후 자동 닫힘)<br />
                ✓ fadeIn 애니메이션 적용
              </div>
            </ScreenPreview>
          </Section>

          {/* 2. 토스트 애니메이션 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                2. 토스트 알림 애니메이션 (Emotion keyframes)
              </SectionTitle>
              <SectionDescription>
                새 알림 도착 시 오른쪽에서 슬라이드 인, 닫을 때 슬라이드 아웃 애니메이션
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <Monitor size={14} />
                Animation
              </StateLabel>
              <HighlightBox>
                <div style={{ color: '#3b82f6', fontWeight: 600, marginBottom: '8px' }}>
                  Emotion keyframes 활용
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                  ✓ slideIn: translateX(100%) → translateX(0)<br />
                  ✓ slideOut: translateX(0) → translateX(100%)<br />
                  ✓ fadeIn: opacity 0 → 1, translateY(-10px) → 0<br />
                  ✓ duration: 0.3s ease
                </div>
              </HighlightBox>
              <CodeBlock>
                {`const slideIn = keyframes\`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
\`;

const ToastContainer = styled.div<{ isClosing?: boolean }>\`
  animation: \${props => props.isClosing ? slideOut : slideIn} 0.3s ease;
\`;`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 3. 무한 스크롤 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <RefreshCw size={24} />
                3. 무한 스크롤 (React-Query useInfiniteQuery)
              </SectionTitle>
              <SectionDescription>
                IntersectionObserver로 스크롤 감지, 자동으로 다음 페이지 로드
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="loading">
                <Loader2 size={14} />
                Infinite Scroll
              </StateLabel>
              <GridDemo>
                <div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>스크롤 중</div>
                  <DemoPhone>
                    <PhoneHeader>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>과거 알림</div>
                    </PhoneHeader>
                    <PhoneContent>
                      <NotifItem>
                        <div style={{ width: '40px', height: '40px', background: '#f3f4f6', borderRadius: '8px' }}></div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>알림 1</div>
                          <div style={{ fontSize: '13px', color: '#6b7280' }}>메시지...</div>
                        </div>
                      </NotifItem>
                      <NotifItem>
                        <div style={{ width: '40px', height: '40px', background: '#f3f4f6', borderRadius: '8px' }}></div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>알림 2</div>
                          <div style={{ fontSize: '13px', color: '#6b7280' }}>메시지...</div>
                        </div>
                      </NotifItem>
                      <div style={{ padding: '24px', textAlign: 'center' }}>
                        <div style={{ width: '24px', height: '24px', border: '3px solid #e5e7eb', borderTopColor: '#3b82f6', borderRadius: '50%', margin: '0 auto', animation: 'spin 1s linear infinite' }}></div>
                      </div>
                    </PhoneContent>
                  </DemoPhone>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>더 보기 버튼</div>
                  <DemoPhone>
                    <PhoneHeader>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>과거 알림</div>
                    </PhoneHeader>
                    <PhoneContent>
                      <NotifItem>
                        <div style={{ width: '40px', height: '40px', background: '#f3f4f6', borderRadius: '8px' }}></div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>알림 1</div>
                          <div style={{ fontSize: '13px', color: '#6b7280' }}>메시지...</div>
                        </div>
                      </NotifItem>
                      <div style={{ padding: '24px', textAlign: 'center' }}>
                        <button style={{ padding: '12px 24px', background: 'white', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                          더 보기
                        </button>
                      </div>
                    </PhoneContent>
                  </DemoPhone>
                </div>
              </GridDemo>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ useInfiniteQuery로 페이지네이션<br />
                ✓ IntersectionObserver로 자동 감지<br />
                ✓ getNextPageParam으로 커서 관리<br />
                ✓ hasNextPage로 더보기 버튼 표시<br />
                ✓ 페이지당 10개 알림
              </div>
            </ScreenPreview>
          </Section>

          {/* 4. 낙관적 업데이트 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <CheckCheck size={24} />
                4. 낙관적 업데이트 (Optimistic Update)
              </SectionTitle>
              <SectionDescription>
                읽음 처리/삭제 시 서버 응답 전 UI 먼저 변경, 실패 시 자동 롤백
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <CheckCheck size={14} />
                Optimistic Update
              </StateLabel>
              <HighlightBox>
                <div style={{ color: '#3b82f6', fontWeight: 600, marginBottom: '8px' }}>
                  useMutation의 onMutate 활용
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                  1. onMutate: 즉시 UI 업데이트, 이전 데이터 스냅샷 저장<br />
                  2. mutationFn: 백그라운드에서 API 호출<br />
                  3. onSuccess: 성공 시 toast 표시<br />
                  4. onError: 실패 시 스냅샷으로 롤백
                </div>
              </HighlightBox>
              <CodeBlock>
                {`const markAsReadMutation = useMutation({
  mutationFn: markAsRead,
  onMutate: async (notificationId) => {
    // 1. 진행 중인 쿼리 취소
    await queryClient.cancelQueries(['notifications']);
    
    // 2. 이전 데이터 스냅샷
    const previousData = queryClient.getQueryData(['notifications']);
    
    // 3. 낙관적 업데이트 (즉시 UI 변경)
    queryClient.setQueryData(['notifications'], (old) => ({
      ...old,
      pages: old.pages.map(page => ({
        ...page,
        notifications: page.notifications.map(n =>
          n.id === notificationId ? { ...n, isRead: true } : n
        ),
      })),
    }));
    
    return { previousData };
  },
  onError: (error, variables, context) => {
    // 4. 실패 시 롤백
    queryClient.setQueryData(['notifications'], context.previousData);
  },
});`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 5. 읽음/읽지 않음 상태 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                5. 읽음/읽지 않음 시각적 구분
              </SectionTitle>
              <SectionDescription>
                읽지 않은 알림은 파란 배경, 파란 점 표시로 명확히 구분
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <Bell size={14} />
                Read State
              </StateLabel>
              <DemoPhone>
                <PhoneHeader>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>알림</div>
                </PhoneHeader>
                <PhoneContent>
                  <NotifItem unread>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', marginTop: '6px' }}></div>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                      <Bell size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>읽지 않은 알림</div>
                      <div style={{ fontSize: '13px', color: '#6b7280' }}>파란 배경과 파란 점으로 표시</div>
                    </div>
                  </NotifItem>
                  <NotifItem>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e' }}>
                      <Bell size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>읽은 알림</div>
                      <div style={{ fontSize: '13px', color: '#6b7280' }}>흰색 배경으로 표시</div>
                    </div>
                  </NotifItem>
                </PhoneContent>
              </DemoPhone>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ 읽지 않음: 배경 #f0f9ff, 파란 점<br />
                ✓ 읽음: 배경 white, 점 없음<br />
                ✓ 클릭 시 자동으로 읽음 처리<br />
                ✓ 낙관적 업데이트로 즉시 상태 변경
              </div>
            </ScreenPreview>
          </Section>

          {/* 6. 알림 삭제 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Trash2 size={24} />
                6. 알림 삭제 (스와이프 또는 버튼)
              </SectionTitle>
              <SectionDescription>
                삭제 버튼 클릭 시 낙관적 업데이트로 즉시 제거, 실패 시 복원
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="warning">
                <Trash2 size={14} />
                Delete
              </StateLabel>
              <DemoPhone>
                <PhoneHeader>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>알림</div>
                </PhoneHeader>
                <PhoneContent>
                  <NotifItem>
                    <div style={{ width: '40px', height: '40px', background: '#f3f4f6', borderRadius: '8px' }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>알림 제목</div>
                      <div style={{ fontSize: '13px', color: '#6b7280' }}>알림 메시지</div>
                    </div>
                    <button style={{ width: '32px', height: '32px', border: 'none', background: 'transparent', color: '#9ca3af', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </NotifItem>
                </PhoneContent>
              </DemoPhone>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ 휴지통 버튼 클릭 시 즉시 제거<br />
                ✓ deleteNotificationAtom으로 로컬 상태 업데이트<br />
                ✓ useMutation으로 서버 API 호출<br />
                ✓ 실패 시 자동 복원 + 에러 toast
              </div>
            </ScreenPreview>
          </Section>

          {/* 7. 전체 읽음 처리 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <CheckCheck size={24} />
                7. 모두 읽음 처리
              </SectionTitle>
              <SectionDescription>
                헤더의 "모두 읽음" 버튼으로 모든 알림을 한 번에 읽음 처리
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <CheckCheck size={14} />
                Mark All Read
              </StateLabel>
              <DemoPhone>
                <PhoneHeader>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>알림 센터</div>
                  <button style={{ padding: '8px 16px', background: '#3b82f6', border: 'none', borderRadius: '8px', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCheck size={18} />
                    모두 읽음
                  </button>
                </PhoneHeader>
                <PhoneContent>
                  <NotifItem>
                    <div style={{ width: '40px', height: '40px', background: '#f3f4f6', borderRadius: '8px' }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>알림 1</div>
                      <div style={{ fontSize: '13px', color: '#6b7280' }}>모두 읽��� 처리됨</div>
                    </div>
                  </NotifItem>
                  <NotifItem>
                    <div style={{ width: '40px', height: '40px', background: '#f3f4f6', borderRadius: '8px' }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>알림 2</div>
                      <div style={{ fontSize: '13px', color: '#6b7280' }}>모두 읽음 처리됨</div>
                    </div>
                  </NotifItem>
                </PhoneContent>
              </DemoPhone>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ markAllReadAtom으로 모든 알림 isRead: true<br />
                ✓ useMarkAllAsRead 뮤테이션 호출<br />
                ✓ 낙관적 업데이트로 즉시 UI 변경<br />
                ✓ 배지 카운트 0으로 업데이트
              </div>
            </ScreenPreview>
          </Section>

          {/* 8. SSE 연결 끊김 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <WifiOff size={24} />
                8. SSE 연결 끊김 처리
              </SectionTitle>
              <SectionDescription>
                네트워크 오류나 서버 문제로 SSE 연결이 끊어졌을 때 재연결 안내
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="error">
                <WifiOff size={14} />
                Disconnected
              </StateLabel>
              <DemoPhone>
                <PhoneHeader style={{ background: '#fef2f2', borderBottomColor: '#fee2e2' }}>
                  <div style={{ fontSize: '14px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <WifiOff size={18} />
                    실시간 알림 연결 끊김
                  </div>
                  <button style={{ padding: '6px 12px', background: '#ef4444', border: 'none', borderRadius: '6px', color: 'white', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                    재연결
                  </button>
                </PhoneHeader>
                <PhoneContent>
                  <div style={{ padding: '48px 24px', textAlign: 'center', color: '#9ca3af' }}>
                    <WifiOff size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                    <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>실시간 알림을 받을 수 없습니다</div>
                    <div style={{ fontSize: '14px' }}>네트워크 연결을 확인해주세요</div>
                  </div>
                </PhoneContent>
              </DemoPhone>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ SSE EventSource onerror 이벤트 처리<br />
                ✓ 자동 재연결 시도 (3회)<br />
                ✓ 실패 시 사용자에게 안내<br />
                ✓ 수동 재연결 버튼 제공
              </div>
            </ScreenPreview>
          </Section>

          {/* 9. 빈 상태 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                9. 빈 알림 상태
              </SectionTitle>
              <SectionDescription>
                알림이 하나도 없을 때 표시되는 빈 상태 화면
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <Bell size={14} />
                Empty State
              </StateLabel>
              <DemoPhone>
                <PhoneHeader>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>알림 센터</div>
                </PhoneHeader>
                <PhoneContent>
                  <div style={{ padding: '80px 24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔔</div>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#6b7280', marginBottom: '8px' }}>알림이 없습니다</div>
                    <div style={{ fontSize: '14px', color: '#9ca3af' }}>새로운 알림이 도착하면 여기에 표시됩니다</div>
                  </div>
                </PhoneContent>
              </DemoPhone>
            </ScreenPreview>
          </Section>

          {/* 10. 알림 타입별 스타일 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                10. 알림 타입별 색상 및 아이콘
              </SectionTitle>
              <SectionDescription>
                price_alert, execution, news, system 타입에 따라 다른 색상과 아이콘 표시
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <Monitor size={14} />
                Type Variants
              </StateLabel>
              <DemoPhone>
                <PhoneHeader>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>알림 타입</div>
                </PhoneHeader>
                <PhoneContent>
                  <NotifItem>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                      <TrendingUp size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>가격 알림 (price_alert)</div>
                      <div style={{ fontSize: '13px', color: '#6b7280' }}>주황색 (#f59e0b)</div>
                    </div>
                  </NotifItem>
                  <NotifItem>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e' }}>
                      <Bell size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>체결 알림 (execution)</div>
                      <div style={{ fontSize: '13px', color: '#6b7280' }}>녹색 (#22c55e)</div>
                    </div>
                  </NotifItem>
                  <NotifItem>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                      <Bell size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>뉴스 (news)</div>
                      <div style={{ fontSize: '13px', color: '#6b7280' }}>파란색 (#3b82f6)</div>
                    </div>
                  </NotifItem>
                  <NotifItem>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(107, 114, 128, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
                      <Bell size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>시스템 (system)</div>
                      <div style={{ fontSize: '13px', color: '#6b7280' }}>회색 (#6b7280)</div>
                    </div>
                  </NotifItem>
                </PhoneContent>
              </DemoPhone>
            </ScreenPreview>
          </Section>
        </Content>
      </Container>
    </Overlay>
  );
}