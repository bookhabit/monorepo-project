import styled from '@emotion/styled';
import { X, Monitor, Activity, Shield, Database, TrendingUp, Link as LinkIcon, Zap, Eye } from 'lucide-react';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
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
  background: #0f172a;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid #1e293b;
`;

const Header = styled.div`
  padding: 20px 24px;
  background: #1e293b;
  border-bottom: 1px solid #334155;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CloseButton = styled.button`
  padding: 8px;
  background: transparent;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #334155;
    color: #f1f5f9;
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
    background: #1e293b;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #334155;
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
  color: #f1f5f9;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SectionDescription = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
`;

const ScreenPreview = styled.div`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #334155;
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
      default: return 'rgba(100, 116, 139, 0.1)';
    }
  }};
  
  color: ${props => {
    switch (props.type) {
      case 'success': return '#22c55e';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'loading': return '#3b82f6';
      default: return '#64748b';
    }
  }};
  
  border: 1px solid ${props => {
    switch (props.type) {
      case 'success': return 'rgba(34, 197, 94, 0.3)';
      case 'error': return 'rgba(239, 68, 68, 0.3)';
      case 'warning': return 'rgba(245, 158, 11, 0.3)';
      case 'loading': return 'rgba(59, 130, 246, 0.3)';
      default: return 'rgba(100, 116, 139, 0.3)';
    }
  }};
`;

const HighlightBox = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 2px solid #ef4444;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const CodeBlock = styled.div`
  background: #0f172a;
  padding: 20px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 13px;
  color: #64748b;
  line-height: 1.8;
  overflow-x: auto;
  border: 1px solid #1e293b;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 16px;
`;

const FeatureCard = styled.div`
  background: #1e293b;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #334155;
`;

const FeatureTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 8px;
`;

const FeatureDesc = styled.div`
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
`;

interface FDSScreensViewerProps {
  onClose: () => void;
}

export function FDSScreensViewer({ onClose }: FDSScreensViewerProps) {
  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>
            <Monitor size={24} />
            실시간 이상 거래 탐지(FDS) - 사용자 시나리오별 화면
          </Title>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </Header>

        <Content>
          {/* 1. 실시간 스트리밍 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Activity size={24} />
                1. 실시간 데이터 스트리밍 & 가상화
              </SectionTitle>
              <SectionDescription>
                초당 수십 건의 거래가 발생해도 브라우저가 멈추지 않는 고성능 렌더링
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <Activity size={14} />
                Real-time Streaming
              </StateLabel>
              <HighlightBox>
                <div style={{ color: '#ef4444', fontWeight: 600, marginBottom: '8px' }}>
                  Mock WebSocket 기반 실시간 스트리밍
                </div>
                <div style={{ fontSize: '13px', color: '#94a3b8' }}>
                  ✓ FDSStreaming 클래스 - Subscribe/Unsubscribe 패턴<br />
                  ✓ 1-3초마다 신규 거래 생성<br />
                  ✓ 최근 100건만 메모리에 유지<br />
                  ✓ 신규 거래는 3초간 하이라이트<br />
                  ✓ slideInRight 애니메이션 적용<br />
                  ✓ useEffect cleanup으로 메모리 릭 방지
                </div>
              </HighlightBox>
              <CodeBlock>
                {`class FDSStreaming {
  private listeners: ((transaction: Transaction) => void)[] = [];
  private intervalId: NodeJS.Timeout | null = null;

  connect() {
    this.intervalId = setInterval(() => {
      const transaction = this.generateRandomTransaction();
      this.emit(transaction);
    }, Math.random() * 2000 + 1000);
  }

  subscribe(listener: (transaction: Transaction) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

// 사용
useEffect(() => {
  if (!isStreaming) return;
  
  fdsStreaming.connect();
  const unsubscribe = fdsStreaming.subscribe((transaction) => {
    setRealtimeTransactions(prev => [transaction, ...prev].slice(0, 100));
    setNewTransactionIds(prev => new Set(prev).add(transaction.id));
    
    setTimeout(() => {
      setNewTransactionIds(prev => {
        const next = new Set(prev);
        next.delete(transaction.id);
        return next;
      });
    }, 3000);
  });
  
  return () => {
    unsubscribe();
    fdsStreaming.disconnect();
  };
}, [isStreaming]);`}
              </CodeBlock>
              <FeatureGrid>
                <FeatureCard>
                  <FeatureTitle>Virtual Scrolling</FeatureTitle>
                  <FeatureDesc>5,000건 → DOM 15개로 렌더링</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>메모리 관리</FeatureTitle>
                  <FeatureDesc>실시간 데이터 100건 제한</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>애니메이션</FeatureTitle>
                  <FeatureDesc>신규 거래 slideIn + pulse</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>성능</FeatureTitle>
                  <FeatureDesc>60fps 부드러운 스크롤</FeatureDesc>
                </FeatureCard>
              </FeatureGrid>
            </ScreenPreview>
          </Section>

          {/* 2. 카드 기반 피드 UI */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Eye size={24} />
                2. 카드 기반 피드 레이아웃
              </SectionTitle>
              <SectionDescription>
                테이블과 차별화된 시각적 카드 디자인으로 위험도 한눈에 파악
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <Eye size={14} />
                Visual Card Design
              </StateLabel>
              <HighlightBox>
                <div style={{ color: '#ef4444', fontWeight: 600, marginBottom: '8px' }}>
                  위험도 기반 시각적 디자인
                </div>
                <div style={{ fontSize: '13px', color: '#94a3b8' }}>
                  ✓ Critical: 빨간 테두리 + 상단 그라데이션 바<br />
                  ✓ High: 주황색 테두리<br />
                  ✓ Medium: 보라색 테두리<br />
                  ✓ Low: 회색 테두리<br />
                  ✓ 큰 위험 점수 (32px 그라데이션 텍스트)<br />
                  ✓ 아이콘 기반 상세 정보<br />
                  ✓ 플래그 칩으로 이상 징후 강조<br />
                  ✓ 호버 시 슬라이드 효과
                </div>
              </HighlightBox>
              <CodeBlock>
                {`const TransactionCard = styled.div<{ riskLevel: string }>\`
  border: 2px solid \${(props) => {
    switch (props.riskLevel) {
      case 'critical': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'medium': return '#6366f1';
      default: return '#334155';
    }
  }};

  \${(props) => props.riskLevel === 'critical' && \`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      height: 3px;
      background: linear-gradient(to right, #ef4444, #dc2626);
    }
  \`}

  &:hover {
    transform: translateX(-4px);
    border-color: #3b82f6;
  }
\`;`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 3. 다크 테마 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Shield size={24} />
                3. 보안 관제센터 다크 테마
              </SectionTitle>
              <SectionDescription>
                24시간 모니터링 환경에 최적화된 다크 모드 디자인
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <Shield size={14} />
                Dark Theme
              </StateLabel>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>
                ✓ 배경: linear-gradient(#0f172a, #1e293b)<br />
                ✓ 카드: linear-gradient(#1e293b, #0f172a)<br />
                ✓ 텍스트: #f1f5f9 (밝은 회색)<br />
                ✓ 보더: #334155 (중간 회색)<br />
                ✓ 아이콘: #60a5fa (블루)<br />
                ✓ 눈의 피로 최소화<br />
                ✓ 위험 신호 강조 (빨강, 주황)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '16px', background: '#0f172a', borderRadius: '8px', textAlign: 'center', color: '#f1f5f9' }}>
                  Background<br />#0f172a
                </div>
                <div style={{ padding: '16px', background: '#1e293b', borderRadius: '8px', textAlign: 'center', color: '#f1f5f9' }}>
                  Card<br />#1e293b
                </div>
                <div style={{ padding: '16px', background: '#334155', borderRadius: '8px', textAlign: 'center', color: '#f1f5f9' }}>
                  Border<br />#334155
                </div>
              </div>
            </ScreenPreview>
          </Section>

          {/* 4. URL 필터링 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <LinkIcon size={24} />
                4. 복합 URL 기반 필터링
              </SectionTitle>
              <SectionDescription>
                여러 필터 조합 + 뒤로가기/앞으로가기 지원
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <LinkIcon size={14} />
                Complex Filtering
              </StateLabel>
              <HighlightBox>
                <div style={{ color: '#ef4444', fontWeight: 600, marginBottom: '8px' }}>
                  다차원 서버 사이드 필터링
                </div>
                <div style={{ fontSize: '13px', color: '#94a3b8' }}>
                  ✓ status, riskLevel, type, minAmount, minRiskScore 등<br />
                  ✓ useSearchParams로 URL 동기화<br />
                  ✓ 새로고침/뒤로가기 시 상태 복원<br />
                  ✓ React-Query로 필터별 캐싱<br />
                  ✓ 필터 초기화 버튼
                </div>
              </HighlightBox>
              <CodeBlock>
                {`// URL: ?status=suspicious&riskLevel=critical&minAmount=1000000

const filters: FilterParams = {
  status: searchParams.get('status'),
  riskLevel: searchParams.get('riskLevel'),
  type: searchParams.get('type'),
  minAmount: parseInt(searchParams.get('minAmount') || '0'),
  minRiskScore: parseInt(searchParams.get('minRiskScore') || '0'),
};

const { data } = useFDSTransactions(filters);

// 필터 변경
const updateFilter = (key: string, value: string) => {
  const newParams = new URLSearchParams(searchParams);
  if (value) newParams.set(key, value);
  else newParams.delete(key);
  setSearchParams(newParams);
};`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 5. 낙관적 업데이트 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Zap size={24} />
                5. 즉시 차단 (낙관적 업데이트)
              </SectionTitle>
              <SectionDescription>
                서버 응답 대기 없이 즉시 UI 반영, 실패 시 롤백
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="warning">
                <Zap size={14} />
                Optimistic Update
              </StateLabel>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>
                ✓ 다중 선택 후 일괄 차단/해제<br />
                ✓ onMutate에서 즉시 UI 업데이트<br />
                ✓ 서버 실패 시 자동 롤백<br />
                ✓ Toast 알림으로 사용자 피드백<br />
                ✓ Zustand로 선택 상태 관리
              </div>
              <CodeBlock>
                {`const batchBlockMutation = useMutation({
  mutationFn: batchBlock,
  onMutate: async (transactionIds) => {
    await queryClient.cancelQueries(['fds-transactions']);
    const previousData = queryClient.getQueryData(['fds-transactions']);
    
    // 즉시 UI 업데이트
    queryClient.setQueriesData(['fds-transactions'], (old) =>
      old.map(t => transactionIds.includes(t.id) 
        ? { ...t, status: 'blocked' } 
        : t
      )
    );
    
    return { previousData };
  },
  onError: (error, variables, context) => {
    // 실패 시 롤백
    queryClient.setQueryData(['fds-transactions'], context.previousData);
    toast.error('차단 처리 실패');
  },
});`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 6. 위험도 타임라인 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <TrendingUp size={24} />
                6. 위험도 타임라인 & Drawer
              </SectionTitle>
              <SectionDescription>
                사용자별 24시간 위험도 추이를 SVG 그래프로 시각화
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <TrendingUp size={14} />
                Risk Timeline
              </StateLabel>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>
                ✓ Zustand로 Drawer 상태 관리<br />
                ✓ SVG 기반 24시간 위험도 그래프<br />
                ✓ 사용자별 통계 (전체/의심/차단 거래)<br />
                ✓ 최근 10건 거래 내역<br />
                ✓ useEffect cleanup으로 메모리 릭 방지<br />
                ✓ slideIn 애니메이션
              </div>
              <CodeBlock>
                {`export const useDrawerStore = create<DrawerState>((set) => ({
  isOpen: false,
  userId: null,
  openDrawer: (userId) => set({ isOpen: true, userId }),
  closeDrawer: () => set({ isOpen: false, userId: null }),
}));

// SVG 그래프 렌더링
const points = profile.timeline.map((item, index) => {
  const x = (index / (profile.timeline.length - 1)) * 500;
  const y = 180 - (item.riskScore / maxScore) * 160;
  return \`\${x},\${y}\`;
}).join(' ');

<polyline points={points} stroke="#3b82f6" strokeWidth="2" />`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 7. RBAC */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Shield size={24} />
                7. 선언적 RBAC (권한 기반 UI)
              </SectionTitle>
              <SectionDescription>
                역할별 권한 제어를 선언적으로 처리
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="warning">
                <Shield size={14} />
                Role-Based Access Control
              </StateLabel>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>
                ✓ monitor: 조회 + 차단만 가능<br />
                ✓ security_manager: 조회 + 차단 + 차단 해제<br />
                ✓ admin: 모든 권한<br />
                ✓ Zustand로 역할 관리<br />
                ✓ canUnblock 변수로 선언적 제어
              </div>
              <CodeBlock>
                {`const { role } = useUserStore();
const canUnblock = role === 'security_manager' || role === 'admin';

{canUnblock ? (
  <ActionButton variant="unblock" onClick={handleBatchUnblock}>
    차단 해제
  </ActionButton>
) : (
  <ActionButton variant="unblock" disabled title="보안 팀장 이상만 가능">
    차단 해제 (권한 없음)
  </ActionButton>
)}`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 8. 성능 최적화 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Database size={24} />
                8. 종합 성능 최적화
              </SectionTitle>
              <SectionDescription>
                대규모 실시간 데이터 처리를 위한 최적화 총정리
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <Database size={14} />
                Performance Optimization
              </StateLabel>
              <FeatureGrid>
                <FeatureCard>
                  <FeatureTitle>Virtual Scrolling</FeatureTitle>
                  <FeatureDesc>@tanstack/react-virtual<br />5,000건 → DOM 15개</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>메모리 관리</FeatureTitle>
                  <FeatureDesc>실시간 데이터 100건 제한<br />Cleanup 함수</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>React-Query</FeatureTitle>
                  <FeatureDesc>필터별 캐싱<br />staleTime: 10초</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>Zustand</FeatureTitle>
                  <FeatureDesc>최소 리렌더링<br />선택 상태 Set 관리</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>useMemo</FeatureTitle>
                  <FeatureDesc>통계 계산 캐싱<br />의존성 최적화</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>애니메이션</FeatureTitle>
                  <FeatureDesc>CSS animation<br />GPU 가속</FeatureDesc>
                </FeatureCard>
              </FeatureGrid>
            </ScreenPreview>
          </Section>
        </Content>
      </Container>
    </Overlay>
  );
}
