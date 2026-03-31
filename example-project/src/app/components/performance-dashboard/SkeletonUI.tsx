import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    to right,
    #f1f5f9 0%,
    #e2e8f0 20%,
    #f1f5f9 40%,
    #f1f5f9 100%
  );
  background-size: 2000px 100%;
  animation: ${shimmer} 1.5s linear infinite;
  border-radius: 8px;
`;

const KPICardSkeleton = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
`;

const SkeletonTitle = styled(SkeletonBase)`
  width: 60%;
  height: 14px;
  margin-bottom: 16px;
`;

const SkeletonValue = styled(SkeletonBase)`
  width: 80%;
  height: 32px;
  margin-bottom: 12px;
`;

const SkeletonChart = styled(SkeletonBase)`
  width: 100%;
  height: 50px;
`;

export function KPICardsSkeleton() {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <KPICardSkeleton key={i}>
          <SkeletonTitle />
          <SkeletonValue />
          <SkeletonChart />
        </KPICardSkeleton>
      ))}
    </>
  );
}

const ChartContainerSkeleton = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e2e8f0;
`;

const SkeletonHeader = styled(SkeletonBase)`
  width: 200px;
  height: 20px;
  margin-bottom: 8px;
`;

const SkeletonSubtitle = styled(SkeletonBase)`
  width: 150px;
  height: 14px;
  margin-bottom: 24px;
`;

const SkeletonLargeChart = styled(SkeletonBase)`
  width: 100%;
  height: 350px;
`;

export function ChartSkeleton() {
  return (
    <ChartContainerSkeleton>
      <SkeletonHeader />
      <SkeletonSubtitle />
      <SkeletonLargeChart />
    </ChartContainerSkeleton>
  );
}

export function MonitorSkeleton() {
  return (
    <ChartContainerSkeleton>
      <SkeletonHeader />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '24px' }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
            <SkeletonTitle />
            <SkeletonValue />
            <SkeletonChart />
          </div>
        ))}
      </div>
    </ChartContainerSkeleton>
  );
}
