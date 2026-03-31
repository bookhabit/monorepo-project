import styled from '@emotion/styled';
import { X, Monitor, BarChart3, Zap, Filter, Download, Shield, Database } from 'lucide-react';

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
  background: linear-gradient(135deg, #14b8a6, #0d9488);
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
  background: rgba(20, 184, 166, 0.05);
  border: 2px solid #14b8a6;
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

interface PerformanceScreensViewerProps {
  onClose: () => void;
}

export function PerformanceScreensViewer({ onClose }: PerformanceScreensViewerProps) {
  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>
            <Monitor size={24} />
            은행 상품 운영 통합 리포트 - 사용자 시나리오별 화면
          </Title>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </Header>

        <Content>
          {/* 1. 다차원 데이터 시각화 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <BarChart3 size={24} />
                1. 다차원 데이터 시각화 (Recharts)
              </SectionTitle>
              <SectionDescription>
                KPI 카드, 가입자 추이 차트, 이탈률 분석을 통한 종합 리포팅
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <BarChart3 size={14} />
                Multi-dimensional Reporting
              </StateLabel>
              <HighlightBox>
                <div style={{ color: '#14b8a6', fontWeight: 600, marginBottom: '8px' }}>
                  6개 핵심 KPI + 가입자 추이 차트
                </div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  ✓ 총 가입자 수 + 증감률 트렌드<br />
                  ✓ 월 신규 가입 + 미니 차트<br />
                  ✓ 이탈률 (감소 추세 표시)<br />
                  ✓ 평균 수익, 전환율, 고객 만족도<br />
                  ✓ Recharts AreaChart로 가입자 추이 시각화<br />
                  ✓ 일별/주별/월별 전환 시 React-Query 캐싱으로 즉시 표시
                </div>
              </HighlightBox>
              <CodeBlock>
                {`// KPI Card 컴포넌트
<KPICard metric={{
  title: '총 가입자 수',
  value: 1847293,
  change: 12.5,
  changeType: 'increase',
  unit: '명',
  trend: [1650000, 1680000, 1720000, 1760000, 1800000, 1847293]
}} />

// Recharts로 추이 차트 렌더링
<AreaChart data={subscriberTrends}>
  <Area 
    type="monotone" 
    dataKey="subscribers" 
    stroke="#3b82f6"
    fill="url(#colorSubscribers)"
  />
  <Area 
    type="monotone" 
    dataKey="newSubscribers" 
    stroke="#10b981"
    fill="url(#colorNew)"
  />
</AreaChart>

// React-Query 캐싱으로 빠른 전환
const { data } = useReportData(filters); // staleTime: 60s`}
              </CodeBlock>
              <FeatureGrid>
                <FeatureCard>
                  <FeatureTitle>KPI 카드</FeatureTitle>
                  <FeatureDesc>6개 핵심 지표 + 미니 트렌드</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>AreaChart</FeatureTitle>
                  <FeatureDesc>가입자 & 신규 추이</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>캐싱 최적화</FeatureTitle>
                  <FeatureDesc>React-Query 60s 캐시</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>반응형 레이아웃</FeatureTitle>
                  <FeatureDesc>Grid auto-fit</FeatureDesc>
                </FeatureCard>
              </FeatureGrid>
            </ScreenPreview>
          </Section>

          {/* 2. 실시간 모니터링 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Zap size={24} />
                2. 실시간 지표 모니터링 (Zustand + WebSocket Mock)
              </SectionTitle>
              <SectionDescription>
                TPS, 에러율, 응답시간 등을 2초마다 업데이트하며 임계값 초과 시 경고
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="warning">
                <Zap size={14} />
                Real-time Observability
              </StateLabel>
              <HighlightBox>
                <div style={{ color: '#14b8a6', fontWeight: 600, marginBottom: '8px' }}>
                  Zustand로 실시간 상태 관리 + 자동 경고
                </div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  ✓ 2초마다 WebSocket Mock으로 시스템 메트릭 수신<br />
                  ✓ TPS, 에러율, 평균 응답시간, 활성 사용자, CPU, 메모리<br />
                  ✓ 에러율 5% 초과 시 카드 배경색 빨간색 + Shake 애니메이션<br />
                  ✓ 응답시간 200ms 초과 시 경고<br />
                  ✓ CPU/메모리 80% 초과 시 Critical Alert<br />
                  ✓ Toast 알림으로 즉각 피드백
                </div>
              </HighlightBox>
              <CodeBlock>
                {`// Zustand Store에서 실시간 메트릭 관리
const { currentMetrics, checkAlerts } = usePerformanceDashboardStore();

useEffect(() => {
  const unsubscribe = subscribeToSystemMetrics((metrics) => {
    setCurrentMetrics(metrics);
    checkAlerts(metrics); // 자동으로 임계값 체크
  });
  return unsubscribe;
}, []);

// Alert Rules
const alertRules = [
  { metric: 'errorRate', threshold: 5, condition: 'above', severity: 'critical' },
  { metric: 'avgResponseTime', threshold: 200, condition: 'above', severity: 'warning' },
  { metric: 'cpuUsage', threshold: 80, condition: 'above', severity: 'warning' },
  { metric: 'memoryUsage', threshold: 85, condition: 'above', severity: 'critical' },
];

// 위험 수치 시 UI 변경
<MetricCard alert={currentMetrics.errorRate > 5}>
  <MetricValue alert={currentMetrics.errorRate > 5}>
    {currentMetrics.errorRate.toFixed(2)}%
  </MetricValue>
</MetricCard>`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 3. URL Query Sync */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Filter size={24} />
                3. URL Query String 동기화 (공유 가능한 리포트)
              </SectionTitle>
              <SectionDescription>
                필터 설정을 URL에 저장하여 링크 공유만으로 동일한 리포트 조회
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <Filter size={14} />
                Shareable Report Links
              </StateLabel>
              <HighlightBox>
                <div style={{ color: '#14b8a6', fontWeight: 600, marginBottom: '8px' }}>
                  필터 상태를 URL searchParams와 동기화
                </div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  ✓ 기간 단위 (daily/weekly/monthly)<br />
                  ✓ 시작일 & 종료일<br />
                  ✓ 상품 종류 (적금, 대출, 카드 등)<br />
                  ✓ 고객 세그먼트 (VIP, 일반)<br />
                  ✓ URL 변경 시 자동으로 리포트 갱신<br />
                  ✓ 링크 복사해서 동료와 공유 가능
                </div>
              </HighlightBox>
              <CodeBlock>
                {`// URL searchParams 읽기
const [searchParams, setSearchParams] = useSearchParams();

const filters: DashboardFilters = {
  timeRange: searchParams.get('timeRange') as TimeRange || 'daily',
  startDate: searchParams.get('startDate') || undefined,
  endDate: searchParams.get('endDate') || undefined,
  productId: searchParams.get('productId') || undefined,
  segment: searchParams.get('segment') as any || 'all',
};

// 필터 변경 시 URL 업데이트
const handleFiltersChange = (newFilters: DashboardFilters) => {
  const params = new URLSearchParams();
  Object.entries(newFilters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  setSearchParams(params);
};

// 예시 URL:
// /performance-dashboard?timeRange=monthly&productId=savings-001&segment=vip&startDate=2024-01-01&endDate=2024-12-31`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 4. CSV/Excel Export */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Download size={24} />
                4. CSV/Excel 내보내기
              </SectionTitle>
              <SectionDescription>
                현재 필터링된 리포트 데이터를 파일로 다운로드
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <Download size={14} />
                Data Export
              </StateLabel>
              <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                ✓ 현재 필터 조건으로 데이터 생성<br />
                ✓ CSV: 가입자 추이 데이터<br />
                ✓ Excel: 종합 리포트 (Mock)<br />
                ✓ 파일명에 날짜 자동 포함<br />
                ✓ Toast로 진행 상황 피드백
              </div>
              <CodeBlock>
                {`const handleExportCSV = async () => {
  toast.loading('CSV 파일을 생성하는 중...', { id: 'csv-export' });
  const blob = await exportToCSV(filters);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = \`report-\${format(new Date(), 'yyyy-MM-dd')}.csv\`;
  a.click();
  URL.revokeObjectURL(url);
  toast.success('CSV 파일이 다운로드되었습니다.', { id: 'csv-export' });
};

// 실제 프로덕션에서는 xlsx 라이브러리 사용
// import * as XLSX from 'xlsx';`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 5. Suspense & Skeleton */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Shield size={24} />
                5. Suspense & Skeleton UI
              </SectionTitle>
              <SectionDescription>
                데이터 로딩 중에도 자연스러운 UX 제공
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="loading">
                <Shield size={14} />
                Loading States
              </StateLabel>
              <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                ✓ KPI 카드 Skeleton (6개)<br />
                ✓ 차트 Skeleton<br />
                ✓ 모니터링 위젯 Skeleton<br />
                ✓ Shimmer 애니메이션으로 로딩 표현<br />
                ✓ Error Boundary로 에러 격리
              </div>
              <CodeBlock>
                {`<ErrorBoundary FallbackComponent={ErrorFallback}>
  <Suspense fallback={<KPICardsSkeleton />}>
    <KPISection />
  </Suspense>
</ErrorBoundary>

<ErrorBoundary FallbackComponent={ErrorFallback}>
  <Suspense fallback={<ChartSkeleton />}>
    <SubscriberChart data={data.subscriberTrends} />
  </Suspense>
</ErrorBoundary>

// Skeleton 컴포넌트
const shimmer = keyframes\`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
\`;

const SkeletonBase = styled.div\`
  background: linear-gradient(to right, #f1f5f9, #e2e8f0, #f1f5f9);
  animation: \${shimmer} 1.5s linear infinite;
\`;`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 6. 유효성 검증 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Database size={24} />
                6. 날짜 범위 유효성 검증
              </SectionTitle>
              <SectionDescription>
                잘못된 필터 설정 방지 및 사용자 피드백
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="error">
                <Database size={14} />
                Validation & Reliability
              </StateLabel>
              <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                ✓ 종료일이 시작일보다 빠른 경우 에러 표시<br />
                ✓ 미래 날짜 선택 불가<br />
                ✓ 날짜 입력 시 min/max 속성 자동 설정<br />
                ✓ 빨간색 경고 메시지 표시<br />
                ✓ 유효하지 않은 필터는 API 호출 차단
              </div>
              <CodeBlock>
                {`// 날짜 범위 검증
const isValidDateRange = () => {
  if (filters.startDate && filters.endDate) {
    return new Date(filters.startDate) <= new Date(filters.endDate);
  }
  return true;
};

const validationError = !isValidDateRange();

// UI에 에러 표시
{validationError && (
  <ValidationError>
    종료일이 시작일보다 빠를 수 없습니다.
  </ValidationError>
)}

// 날짜 입력 제약
<Input
  type="date"
  value={filters.startDate || ''}
  max={filters.endDate || format(new Date(), 'yyyy-MM-dd')}
/>

<Input
  type="date"
  value={filters.endDate || ''}
  min={filters.startDate}
  max={format(new Date(), 'yyyy-MM-dd')}
/>`}
              </CodeBlock>
            </ScreenPreview>
          </Section>

          {/* 7. 종합 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <BarChart3 size={24} />
                7. 통합 운영 대시보드 완성
              </SectionTitle>
              <SectionDescription>
                어드민/리포트/모니터링 역량을 모두 증명하는 프로덕션 레벨 대시보드
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <BarChart3 size={14} />
                Production-Ready Dashboard
              </StateLabel>
              <FeatureGrid>
                <FeatureCard>
                  <FeatureTitle>Recharts</FeatureTitle>
                  <FeatureDesc>KPI + AreaChart<br />다차원 시각화</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>Zustand</FeatureTitle>
                  <FeatureDesc>실시간 모니터링<br />자동 경고 시스템</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>React-Query</FeatureTitle>
                  <FeatureDesc>60s 캐싱<br />빠른 필터 전환</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>URL Sync</FeatureTitle>
                  <FeatureDesc>searchParams 동기화<br />공유 가능한 링크</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>CSV/Excel</FeatureTitle>
                  <FeatureDesc>데이터 내보내기<br />운영 효율화</FeatureDesc>
                </FeatureCard>
                <FeatureCard>
                  <FeatureTitle>Suspense</FeatureTitle>
                  <FeatureDesc>Skeleton UI<br />Error Boundary</FeatureDesc>
                </FeatureCard>
              </FeatureGrid>
            </ScreenPreview>
          </Section>
        </Content>
      </Container>
    </Overlay>
  );
}
