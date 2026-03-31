import { Suspense, useState } from 'react';
import { Link } from 'react-router';
import styled from '@emotion/styled';
import { ArrowLeft, Headphones, PlusCircle, Monitor } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';
import { CustomerList } from '../components/cs-console/CustomerList';
import { CustomerInfoSection } from '../components/cs-console/CustomerInfoSection';
import { TransactionSection } from '../components/cs-console/TransactionSection';
import { ConsultationHistorySection } from '../components/cs-console/ConsultationHistorySection';
import { ConsultationForm } from '../components/cs-console/ConsultationForm';
import { CSConsoleScreensViewer } from '../components/cs-console/CSConsoleScreensViewer';
import { ErrorFallback } from '../components/cs-console/ErrorFallback';
import { LoadingSpinner } from '../components/cs-console/LoadingSpinner';
import { useCSConsoleStore } from '../store/cs-console-store';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #f8fafc, #e2e8f0);
`;

const Header = styled.div`
  padding: 20px 24px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const HeaderContent = styled.div`
  max-width: 1800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #64748b;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
    color: #475569;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 900;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ScreensButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(139, 92, 246, 0.4);
  }
`;

const MainGrid = styled.div`
  max-width: 1800px;
  margin: 0 auto;
  padding: 24px;
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 24px;
  height: calc(100vh - 88px);
`;

const LeftPanel = styled.div`
  height: 100%;
  overflow: hidden;
`;

const RightPanel = styled.div`
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 48px;
  background: white;
  border-radius: 12px;
  border: 2px dashed #e2e8f0;
`;

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: white;
`;

const EmptyTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
`;

const SectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 24px;
`;

export function CSConsolePage() {
  const { selectedCustomerId, openConsultationForm } = useCSConsoleStore();
  const [showScreens, setShowScreens] = useState(false);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <HeaderLeft>
            <BackButton to="/">
              <ArrowLeft size={18} />
              홈으로
            </BackButton>
            <Title>
              <Headphones size={32} color="#3b82f6" />
              고객 상담 통합 콘솔
            </Title>
          </HeaderLeft>
          <HeaderActions>
            <ScreensButton onClick={() => setShowScreens(true)}>
              <Monitor size={18} />
              Screens
            </ScreensButton>
            <ActionButton
              onClick={openConsultationForm}
              disabled={!selectedCustomerId}
            >
              <PlusCircle size={18} />
              신규 상담 등록
            </ActionButton>
          </HeaderActions>
        </HeaderContent>
      </Header>

      <MainGrid>
        <LeftPanel>
          <CustomerList />
        </LeftPanel>

        <RightPanel>
          {selectedCustomerId ? (
            <SectionsGrid>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<LoadingSpinner text="고객 정보 불러오는 중..." />}>
                  <CustomerInfoSection customerId={selectedCustomerId} />
                </Suspense>
              </ErrorBoundary>

              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<LoadingSpinner text="거래 내역 불러오는 중..." />}>
                  <TransactionSection customerId={selectedCustomerId} />
                </Suspense>
              </ErrorBoundary>

              <div style={{ gridColumn: '1 / -1' }}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Suspense fallback={<LoadingSpinner text="상담 이력 불러오는 중..." />}>
                    <ConsultationHistorySection customerId={selectedCustomerId} />
                  </Suspense>
                </ErrorBoundary>
              </div>
            </SectionsGrid>
          ) : (
            <EmptyState>
              <EmptyIcon>
                <Headphones size={40} />
              </EmptyIcon>
              <EmptyTitle>고객을 선택해주세요</EmptyTitle>
              <EmptyDescription>
                좌측 목록에서 고객을 선택하면<br />
                해당 고객의 정보, 거래 내역, 상담 이력이 표시됩니다.
              </EmptyDescription>
            </EmptyState>
          )}
        </RightPanel>
      </MainGrid>

      <ConsultationForm />
      {showScreens && <CSConsoleScreensViewer onClose={() => setShowScreens(false)} />}
    </Container>
  );
}
