import styled from '@emotion/styled';
import { X, Monitor, Layers, Zap, Shield, Users, RefreshCw, Database, FileText } from 'lucide-react';

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
  background: white;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const Header = styled.div`
  padding: 20px 24px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CloseButton = styled.button`
  padding: 8px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 32px;
  background: #f8fafc;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #e2e8f0;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
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
  color: #1e293b;
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
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
      case 'success': return '#16a34a';
      case 'error': return '#dc2626';
      case 'warning': return '#d97706';
      case 'loading': return '#2563eb';
      default: return '#475569';
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
  background: rgba(59, 130, 246, 0.05);
  border: 2px solid #3b82f6;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const CodeBlock = styled.div`
  background: #1e293b;
  padding: 20px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.8;
  overflow-x: auto;
  border: 1px solid #334155;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 16px;
`;

const FeatureCard = styled.div`
  background: #f8fafc;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

const FeatureTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
`;

const FeatureDesc = styled.div`
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
`;

interface CSConsoleScreensViewerProps {
  onClose: () => void;
}

export function CSConsoleScreensViewer({ onClose }: CSConsoleScreensViewerProps) {
  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>
            <Monitor size={24} />
            고객 상담 통합 콘솔 - 사용자 시나리오별 화면
          </Title>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </Header>

        <Content>
          {/* 1. Suspense 독립 로딩 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Layers size={24} />
                1. Suspense 기반 독립적 섹션 로딩
              </SectionTitle>
              <SectionDescription>
                각 섹션이 독립적으로 데이터를 로드하여 빠른 섹션부터 먼저 표시
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="loading">
                <RefreshCw size={14} />
                Streaming SSR
              </StateLabel>
              <HighlightBox>
                <div style={{ color: '#3b82f6', fontWeight: 600, marginBottom: '8px' }}>
                  각 섹션마다 Suspense로 감싸 독립 렌더링
                </div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  ✓ 고객 정보 섹션 (300-700ms)<br />
                  ✓ 거래 내역 섹션 (400-800ms)<br />
                  ✓ 상담 이력 섹션 (500-700ms)<br />
                  ✓ 각 섹션 로딩 시간이 다르지만 독립적으로 표시<br />
                  ✓ 한 섹션의 에러가 다른 섹션에 영향 없음<br />
                  ✓ 사용자는 가장 빠른 정보부터 확인 가능
                </div>
              </HighlightBox>
              <CodeBlock>
                {`<ErrorBoundary FallbackComponent={ErrorFallback}>
  <Suspense fallback={<LoadingSpinner text="고객 정보 불러오는 중..." />}>
    <CustomerInfoSection customerId={selectedCustomerId} />
  </Suspense>
</ErrorBoundary>

<ErrorBoundary FallbackComponent={ErrorFallback}>
  <Suspense fallback={<LoadingSpinner text="거래 내역 불러오는 중..." />}>
    <TransactionSection customerId={selectedCustomerId} />
  </Suspense>
</ErrorBoundary>

<ErrorBoundary FallbackComponent={ErrorFallback}>
  <Suspense fallback={<LoadingSpinner text="상담 이력 불러오는 중..." />}>
    <ConsultationHistorySection customerId={selectedCustomerId} />
  </Suspense>
</ErrorBoundary>

// API 응답 시간이 다르지만 각 섹션이 준비되는 대로 표시됨
// 고객 정보 (500ms) → 먼저 표시
// 거래 내역 (800ms) → 이후 표시
// 상담 이력 (600ms) → 중간에 표시`}
              </CodeBlock>
              <FeatureGrid>
                <FeatureCard>
                  <FeatureTitle>병렬 데이터 로딩</FeatureTitle>
                  <FeatureDesc>3개 API 동시 호출</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>순차적 렌더링</FeatureTitle>
                  <FeatureDesc>빠른 섹션부터 표시</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>에러 격리</FeatureTitle>
                  <FeatureDesc>섹션별 독립 에러 처리</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>사용자 경험</FeatureTitle>
                  <FeatureDesc>즉각적인 피드백</FeatureDesc>
                </FeatureCard>
              </FeatureGrid>
            </ScreenPreview>
          </Section>

          {/* 2. Zustand 상태 동기화 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Zap size={24} />
                2. Zustand 기반 전역 상태 동기화
              </SectionTitle>
              <SectionDescription>
                고객 선택 시 모든 섹션이 자동으로 해당 고객 데이터로 전환
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <Zap size={14} />
                Global State Sync
              </StateLabel>
              <HighlightBox>
                <div style={{ color: '#3b82f6', fontWeight: 600, marginBottom: '8px' }}>
                  단일 소스로 모든 컴포넌트 동기화
                </div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  ✓ 좌측 CustomerList에서 고객 클릭<br />
                  ✓ Zustand Store의 selectedCustomerId 업데이트<br />
                  ✓ 우측 모든 섹션이 자동으로 새 고객 ID 감지<br />
                  ✓ React-Query가 새 고객 데이터 자동 fetch<br />
                  ✓ 각 섹션이 독립적으로 리렌더링<br />
                  ✓ Props drilling 없이 깔끔한 구조
                </div>
              </HighlightBox>
              <CodeBlock>
                {`// Zustand Store
interface CSConsoleState {
  selectedCustomerId: string | null;
  selectCustomer: (customerId: string) => void;
}

export const useCSConsoleStore = create<CSConsoleState>((set) => ({
  selectedCustomerId: null,
  selectCustomer: (customerId) => set({ selectedCustomerId: customerId }),
}));

// CustomerList 컴포넌트
const { selectCustomer } = useCSConsoleStore();
<CustomerItem onClick={() => selectCustomer(customer.id)}>

// CustomerInfoSection 컴포넌트
const { selectedCustomerId } = useCSConsoleStore();
const { data: customer } = useCustomer(selectedCustomerId);

// TransactionSection 컴포넌트
const { selectedCustomerId } = useCSConsoleStore();
const { data: transactions } = useCustomerTransactions(selectedCustomerId);

// 한 곳에서 상태 변경 → 모든 섹션 자동 동기화`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 3. Error Boundary */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Shield size={24} />
                3. Error Boundary로 안정적 에러 처리
              </SectionTitle>
              <SectionDescription>
                한 섹션의 에러가 전체 화면을 망치지 않도록 격리
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="error">
                <Shield size={14} />
                Error Isolation
              </StateLabel>
              <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                ✓ 각 섹션마다 ErrorBoundary로 감싸기<br />
                ✓ API 실패 시 해당 섹션만 에러 UI 표시<br />
                ✓ 다른 섹션은 정상적으로 동작<br />
                ✓ 재시도 버튼으로 해당 섹션만 다시 로드<br />
                ✓ 사용자는 정상 섹션의 데이터를 계속 활용 가능
              </div>
              <CodeBlock>
                {`// react-error-boundary 사용
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './ErrorFallback';

<ErrorBoundary 
  FallbackComponent={ErrorFallback}
  onReset={() => queryClient.invalidateQueries()}
>
  <Suspense fallback={<LoadingSpinner />}>
    <CustomerInfoSection customerId={selectedCustomerId} />
  </Suspense>
</ErrorBoundary>

// ErrorFallback 컴포넌트
export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Container>
      <Icon><AlertTriangle /></Icon>
      <Title>데이터를 불러오는 중 오류가 발생했습니다</Title>
      <Message>{error.message}</Message>
      <RetryButton onClick={resetErrorBoundary}>
        다시 시도
      </RetryButton>
    </Container>
  );
}`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 4. 템플릿 기능 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <FileText size={24} />
                4. 답변 템플릿 자동 입력
              </SectionTitle>
              <SectionDescription>
                자주 쓰는 답변을 원클릭으로 입력창에 삽입하여 업무 효율 극대화
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <FileText size={14} />
                Template Autocomplete
              </StateLabel>
              <HighlightBox>
                <div style={{ color: '#3b82f6', fontWeight: 600, marginBottom: '8px' }}>
                  카테고리별 맞춤 템플릿 제공
                </div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  ✓ 상담 카테고리 선택 시 관련 템플릿 자동 필터링<br />
                  ✓ 계좌: "비밀번호 초기화", "통장 재발급" 등<br />
                  ✓ 카드: "분실 신고", "한도 증액" 등<br />
                  ✓ 대출: "대출 상담", "금리 인하" 등<br />
                  ✓ 템플릿 클릭 → 내용 입력창에 즉시 반영<br />
                  ✓ 수정 후 바로 제출 가능
                </div>
              </HighlightBox>
              <CodeBlock>
                {`// 카테고리별 템플릿 자동 로드
const { data: templates } = useTemplates(category);

// 템플릿 선택 핸들러
const handleTemplateSelect = (templateContent: string) => {
  setContent(templateContent); // 입력창에 즉시 반영
};

// UI 렌더링
<TemplateSection>
  <TemplateHeader>자주 쓰는 답변 템플릿</TemplateHeader>
  <TemplateGrid>
    {templates.map(template => (
      <TemplateButton 
        onClick={() => handleTemplateSelect(template.content)}
      >
        {template.title}
      </TemplateButton>
    ))}
  </TemplateGrid>
</TemplateSection>

<Textarea 
  value={content}
  onChange={(e) => setContent(e.target.value)}
  placeholder="템플릿을 선택하면 자동으로 입력됩니다."
/>`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 5. React-Query 캐싱 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Database size={24} />
                5. React-Query 스마트 캐싱
              </SectionTitle>
              <SectionDescription>
                이전에 조회한 고객 데이터를 캐싱하여 즉각 표시
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <Database size={14} />
                Smart Caching
              </StateLabel>
              <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                ✓ 고객 정보: 60초 캐싱 (staleTime: 60000)<br />
                ✓ 거래 내역: 30초 캐싱 (staleTime: 30000)<br />
                ✓ 상담 이력: 30초 캐싱 (staleTime: 30000)<br />
                ✓ 같은 고객 재선택 시 캐시에서 즉시 로드<br />
                ✓ 신규 상담 등록 시 해당 고객 상담 이력만 재조회<br />
                ✓ 네트워크 요청 최소화로 빠른 UX
              </div>
              <CodeBlock>
                {`export function useCustomer(customerId: string | null) {
  return useQuery({
    queryKey: ['cs-customer', customerId],
    queryFn: () => fetchCustomerById(customerId!),
    enabled: !!customerId,
    staleTime: 60000, // 60초간 캐시 유효
  });
}

export function useCreateConsultation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createConsultation,
    onSuccess: (data) => {
      // 해당 고객의 상담 이력만 재조회
      queryClient.invalidateQueries({ 
        queryKey: ['cs-consultations', data.customerId] 
      });
    },
  });
}`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 6. 2-Column 레이아웃 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Users size={24} />
                6. 효율적인 2-Column 레이아웃
              </SectionTitle>
              <SectionDescription>
                고객 리스트와 상세 정보를 동시에 보며 빠른 업무 처리
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <Users size={14} />
                Split View Layout
              </StateLabel>
              <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                ✓ 좌측 (30%): 고객 리스트 + 검색/필터<br />
                ✓ 우측 (70%): 선택된 고객의 상세 정보<br />
                ✓ 3개 섹션이 Grid로 배치 (반응형)<br />
                ✓ 각 섹션 독립 스크롤 가능<br />
                ✓ 고객 선택 시 좌측은 그대로, 우측만 업데이트<br />
                ✓ 상담원이 여러 고객 빠르게 전환 가능
              </div>
              <CodeBlock>
                {`const MainGrid = styled.div\`
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 24px;
  height: calc(100vh - 80px);
\`;

const LeftPanel = styled.div\`
  height: 100%;
  overflow: hidden;
\`;

const RightPanel = styled.div\`
  height: 100%;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  align-content: start;
\`;`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 7. 종합 성능 최적화 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <RefreshCw size={24} />
                7. 종합 성능 최적화
              </SectionTitle>
              <SectionDescription>
                안정적이고 빠른 상담 콘솔을 위한 최적화 총정리
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <RefreshCw size={14} />
                Performance Optimization
              </StateLabel>
              <FeatureGrid>
                <FeatureCard>
                  <FeatureTitle>Suspense</FeatureTitle>
                  <FeatureDesc>섹션별 독립 로딩<br />빠른 정보부터 표시</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>Error Boundary</FeatureTitle>
                  <FeatureDesc>에러 격리<br />부분 장애 허용</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>React-Query</FeatureTitle>
                  <FeatureDesc>스마트 캐싱<br />중복 요청 제거</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>Zustand</FeatureTitle>
                  <FeatureDesc>전역 상태 관리<br />최소 리렌더링</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>템플릿 시스템</FeatureTitle>
                  <FeatureDesc>업무 효율<br />원클릭 입력</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>병렬 로딩</FeatureTitle>
                  <FeatureDesc>3개 API 동시 호출<br />총 시간 단축</FeatureDesc>
                </FeatureCard>
              </FeatureGrid>
            </ScreenPreview>
          </Section>
        </Content>
      </Container>
    </Overlay>
  );
}
