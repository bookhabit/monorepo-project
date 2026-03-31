import styled from '@emotion/styled';
import { X, Monitor, Filter, CheckCheck, Eye, Shield, Database, Link as LinkIcon } from 'lucide-react';

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
            대출 심사 대시보드 - 사용자 시나리오별 화면
          </Title>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </Header>

        <Content>
          {/* 1. URL 기반 필터링 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <LinkIcon size={24} />
                1. URL 기반 필터링 (useSearchParams)
              </SectionTitle>
              <SectionDescription>
                검색 조건이 URL에 동기화되어 새로고침해도 필터 상태 유지
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <Filter size={14} />
                URL Sync
              </StateLabel>
              <HighlightBox>
                <div style={{ color: '#3b82f6', fontWeight: 600, marginBottom: '8px' }}>
                  React Router useSearchParams 활용
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                  ✓ searchParams.get('status') → 상태 필터<br />
                  ✓ searchParams.get('riskLevel') → 위험도 필터<br />
                  ✓ searchParams.get('minAmount') → 최소 금액<br />
                  ✓ 필터 변경 시 setSearchParams로 URL 업데이트<br />
                  ✓ 새로고침해도 필터 조건 유지
                </div>
              </HighlightBox>
              <CodeBlock>
                {`// URL: ?status=pending&riskLevel=high&minAmount=10000000

const [searchParams, setSearchParams] = useSearchParams();

const filters: FilterParams = {
  status: searchParams.get('status'),
  riskLevel: searchParams.get('riskLevel'),
  minAmount: parseInt(searchParams.get('minAmount') || '0'),
};

const updateFilter = (key: string, value: string) => {
  const newParams = new URLSearchParams(searchParams);
  if (value) {
    newParams.set(key, value);
  } else {
    newParams.delete(key);
  }
  setSearchParams(newParams);
};`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 2. 일괄 처리 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <CheckCheck size={24} />
                2. 일괄 처리 시스템 (Batch Action)
              </SectionTitle>
              <SectionDescription>
                체크박스로 여러 건 선택 후 일괄 승인/거절, 낙관적 업데이트로 즉시 반영
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <CheckCheck size={14} />
                Batch Processing
              </StateLabel>
              <HighlightBox>
                <div style={{ color: '#3b82f6', fontWeight: 600, marginBottom: '8px' }}>
                  Zustand 기반 선택 상태 관리
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                  ✓ useSelectionStore - 선택된 ID Set으로 관리<br />
                  ✓ toggleSelection(id) - 개별 선택/해제<br />
                  ✓ selectAll(ids) - 전체 선택<br />
                  ✓ clearSelection() - 선택 초기화<br />
                  ✓ useBatchApprove - 낙관적 업데이트 + API 호출<br />
                  ✓ 성공 시 toast, 실패 시 롤백
                </div>
              </HighlightBox>
              <CodeBlock>
                {`const batchApproveMutation = useMutation({
  mutationFn: batchApprove,
  onMutate: async (applicationIds) => {
    // 1. 진행 중인 쿼리 취소
    await queryClient.cancelQueries(['loan-applications']);
    
    // 2. 이전 데이터 스냅샷
    const previousData = queryClient.getQueryData(['loan-applications']);
    
    // 3. 낙관적 업데이트
    queryClient.setQueriesData(['loan-applications'], (old) =>
      old.map(app => applicationIds.includes(app.id) 
        ? { ...app, status: 'approved' } 
        : app
      )
    );
    
    return { previousData };
  },
  onError: (error, variables, context) => {
    // 실패 시 롤백
    queryClient.setQueryData(['loan-applications'], context.previousData);
  },
});`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 3. 가상 리스트 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Database size={24} />
                3. 가상 리스트 (Windowing)
              </SectionTitle>
              <SectionDescription>
                @tanstack/react-virtual로 10,000건 데이터도 60fps 유지
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <Database size={14} />
                Virtualization
              </StateLabel>
              <HighlightBox>
                <div style={{ color: '#3b82f6', fontWeight: 600, marginBottom: '8px' }}>
                  성능 최적화 기법
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                  ✓ useVirtualizer - 화면에 보이는 행만 렌더링<br />
                  ✓ estimateSize: 60px - 각 행 높이<br />
                  ✓ overscan: 5 - 버퍼로 미리 렌더링할 행 수<br />
                  ✓ 10,000건 → 실제 DOM: 약 15개만 존재<br />
                  ✓ 스크롤 성능: 60fps 유지<br />
                  ✓ 메모리 사용량: 최소화
                </div>
              </HighlightBox>
              <CodeBlock>
                {`const virtualizer = useVirtualizer({
  count: applications.length, // 10,000
  getScrollElement: () => parentRef.current,
  estimateSize: () => 60,
  overscan: 5,
});

// 화면에 보이는 행만 렌더링
{virtualizer.getVirtualItems().map((virtualRow) => {
  const application = applications[virtualRow.index];
  return (
    <VirtualRow 
      key={virtualRow.key}
      height={virtualRow.size}
      top={virtualRow.start}
    >
      <TableRow>{/* ... */}</TableRow>
    </VirtualRow>
  );
})}`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 4. 심사 이력 타임라인 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Eye size={24} />
                4. 심사 이력 타임라인 (Zustand Drawer)
              </SectionTitle>
              <SectionDescription>
                우측 사이드바로 심사 이력 표시, Zustand로 열림/닫힘 상태 관리
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <Eye size={14} />
                Drawer State
              </StateLabel>
              <HighlightBox>
                <div style={{ color: '#3b82f6', fontWeight: 600, marginBottom: '8px' }}>
                  Zustand 전역 상태 관리
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                  ✓ useDrawerStore - isOpen, applicationId 관리<br />
                  ✓ openDrawer(id) - 드로어 열기 + 신청 ID 저장<br />
                  ✓ closeDrawer() - 드로어 닫기<br />
                  ✓ useReviewHistory(applicationId) - 이력 조회<br />
                  ✓ 타임라인 UI - 시간 순서대로 표시<br />
                  ✓ Emotion keyframes - slideIn 애니메이션
                </div>
              </HighlightBox>
              <CodeBlock>
                {`export const useDrawerStore = create<DrawerState>((set) => ({
  isOpen: false,
  applicationId: null,
  openDrawer: (applicationId) => set({ isOpen: true, applicationId }),
  closeDrawer: () => set({ isOpen: false, applicationId: null }),
}));

// 사용
const { isOpen, applicationId, openDrawer } = useDrawerStore();
const { data: history } = useReviewHistory(applicationId);

<ViewButton onClick={() => openDrawer(application.id)}>
  <Eye size={14} /> 보기
</ViewButton>`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 5. 권한 기반 UI */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Shield size={24} />
                5. 권한 기반 UI (RBAC)
              </SectionTitle>
              <SectionDescription>
                일반 심사역은 승인만, 팀장급은 거절도 가능하도록 선언적 분기
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="warning">
                <Shield size={14} />
                Role-Based Access Control
              </StateLabel>
              <HighlightBox>
                <div style={{ color: '#3b82f6', fontWeight: 600, marginBottom: '8px' }}>
                  역할별 권한 제어
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                  ✓ UserRole: 'reviewer' | 'manager' | 'admin'<br />
                  ✓ useUserStore - 현재 사용자 역할 관리<br />
                  ✓ canReject = role === 'manager' || role === 'admin'<br />
                  ✓ 일반 심사역: 승인 버튼만 활성화<br />
                  ✓ 팀장급 이상: 승인 + 거절 버튼 모두 활성화<br />
                  ✓ 버튼 disabled 속성으로 선언적 제어
                </div>
              </HighlightBox>
              <CodeBlock>
                {`const { role } = useUserStore();
const canReject = role === 'manager' || role === 'admin';

return (
  <>
    <ActionButton variant="approve" onClick={handleBatchApprove}>
      일괄 승인
    </ActionButton>
    
    {canReject ? (
      <ActionButton variant="reject" onClick={handleBatchReject}>
        일괄 거절
      </ActionButton>
    ) : (
      <ActionButton variant="reject" disabled title="팀장급 이상만 가능">
        일괄 거절 (권한 없음)
      </ActionButton>
    )}
  </>
);`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 6. React-Query 캐싱 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                6. React-Query 필터별 캐싱
              </SectionTitle>
              <SectionDescription>
                필터 조건이 queryKey에 포함되어 조건별로 캐싱
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                Query Caching
              </StateLabel>
              <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                ✓ queryKey: ['loan-applications', filters]<br />
                ✓ 필터 변경 시 새로운 쿼리로 간주<br />
                ✓ 이전 필터로 돌아가면 캐시에서 즉시 로드<br />
                ✓ staleTime: 30초, gcTime: 5분<br />
                ✓ 백그라운드에서 자동 갱신
              </div>
            </ScreenPreview>
          </Section>

          {/* 7. 통계 대시보드 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                7. 실시간 통계 요약
              </SectionTitle>
              <SectionDescription>
                전체, 대기, 승인, 거절 건수를 useMemo로 효율적 계산
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                Statistics
              </StateLabel>
              <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                ✓ useMemo로 필터링된 데이터 기반 통계 계산<br />
                ✓ applications 변경 시에만 재계산<br />
                ✓ 실시간으로 카드 UI 업데이트<br />
                ✓ 상태별 색상 구분 (대기: 주황, 승인: 녹색, 거절: 빨강)
              </div>
            </ScreenPreview>
          </Section>

          {/* 8. 성능 최적화 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                8. 종합 성능 최적화
              </SectionTitle>
              <SectionDescription>
                대규모 데이터 처리를 위한 최적화 기법 총정리
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                Performance
              </StateLabel>
              <div style={{ background: '#1f2937', padding: '20px', borderRadius: '8px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#f9fafb', marginBottom: '16px' }}>
                  렌더링 최적화
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '12px' }}>
                  ✓ Virtual Scrolling - 10,000건 → DOM 15개<br />
                  ✓ useMemo - 통계 계산 캐싱<br />
                  ✓ React-Query - 서버 상태 캐싱<br />
                  ✓ Zustand - 최소한의 리렌더링
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#f9fafb', marginBottom: '16px' }}>
                  네트워크 최적화
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                  ✓ 필터별 캐싱 - 중복 요청 방지<br />
                  ✓ 낙관적 업데이트 - 즉각적인 피드백<br />
                  ✓ 일괄 처리 - 단일 API 호출로 다수 처리<br />
                  ✓ staleTime/gcTime - 적절한 캐시 유지
                </div>
              </div>
            </ScreenPreview>
          </Section>
        </Content>
      </Container>
    </Overlay>
  );
}
