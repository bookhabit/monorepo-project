import { Suspense, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import styled from '@emotion/styled';
import { ArrowLeft, BarChart3, Monitor } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';
import { DashboardFilters as Filters, TimeRange } from '../types/performance-dashboard';
import { useReportData } from '../hooks/use-performance-dashboard';
import { DashboardFilters } from '../components/performance-dashboard/DashboardFilters';
import { KPICard } from '../components/performance-dashboard/KPICard';
import { SubscriberChart } from '../components/performance-dashboard/SubscriberChart';
import { RealtimeMonitor } from '../components/performance-dashboard/RealtimeMonitor';
import { PerformanceScreensViewer } from '../components/performance-dashboard/PerformanceScreensViewer';
import { KPICardsSkeleton, ChartSkeleton, MonitorSkeleton } from '../components/performance-dashboard/SkeletonUI';
import { ErrorFallback } from '../components/cs-console/ErrorFallback';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #f0fdfa, #ccfbf1);
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

const ScreensButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #14b8a6, #0d9488);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(20, 184, 166, 0.4);
  }
`;

const Main = styled.main`
  max-width: 1800px;
  margin: 0 auto;
  padding: 24px;
`;

const ContentSection = styled.div`
  margin-bottom: 24px;
`;

const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 24px;
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

function KPISection({ filters }: { filters: Filters }) {
  const { data } = useReportData(filters);
  return (
    <>
      {data?.kpis.map(kpi => (
        <KPICard key={kpi.id} metric={kpi} />
      ))}
    </>
  );
}

function ChartSection({ filters }: { filters: Filters }) {
  const { data } = useReportData(filters);
  return (
    <SubscriberChart 
      data={data?.subscriberTrends || []} 
      timeRange={filters.timeRange} 
    />
  );
}

export function PerformanceDashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showScreens, setShowScreens] = useState(false);

  // Parse filters from URL
  const filters: Filters = {
    timeRange: (searchParams.get('timeRange') as TimeRange) || 'daily',
    startDate: searchParams.get('startDate') || undefined,
    endDate: searchParams.get('endDate') || undefined,
    productId: searchParams.get('productId') || undefined,
    segment: (searchParams.get('segment') as Filters['segment']) || 'all',
  };

  const handleFiltersChange = (newFilters: Filters) => {
    const params = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString());
      }
    });
    
    setSearchParams(params);
  };

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
              <BarChart3 size={32} color="#14b8a6" />
              은행 상품 운영 통합 리포트
            </Title>
          </HeaderLeft>
          <ScreensButton onClick={() => setShowScreens(true)}>
            <Monitor size={18} />
            Screens
          </ScreensButton>
        </HeaderContent>
      </Header>

      <Main>
        <ContentSection>
          <DashboardFilters 
            filters={filters} 
            onFiltersChange={handleFiltersChange}
          />
        </ContentSection>

        <ContentSection>
          <KPIGrid>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<KPICardsSkeleton />}>
                <KPISection filters={filters} />
              </Suspense>
            </ErrorBoundary>
          </KPIGrid>
        </ContentSection>

        <ContentSection>
          <ChartGrid>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<ChartSkeleton />}>
                <ChartSection filters={filters} />
              </Suspense>
            </ErrorBoundary>
          </ChartGrid>
        </ContentSection>

        <ContentSection>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<MonitorSkeleton />}>
              <RealtimeMonitor />
            </Suspense>
          </ErrorBoundary>
        </ContentSection>
      </Main>

      {showScreens && <PerformanceScreensViewer onClose={() => setShowScreens(false)} />}
    </Container>
  );
}
