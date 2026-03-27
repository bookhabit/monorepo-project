'use client';

import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Tab, colors } from '@mono/ui';
import { OpenMatchesContainer } from '@/features/matches/containers/OpenMatchesContainer';
import { MyTeamMatchesContainer } from '@/features/matches/containers/MyTeamMatchesContainer';
import { PageSkeleton } from '@/shared/components/PageSkeleton';
import { ErrorFallback } from '@/shared/components/ErrorFallback';

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div style={{ borderBottom: `1px solid ${colors.grey100}` }}>
        <Tab size="large" onChange={setActiveTab}>
          <Tab.Item selected={activeTab === 0}>경기 찾기</Tab.Item>
          <Tab.Item selected={activeTab === 1}>내 팀 경기</Tab.Item>
        </Tab>
      </div>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} FallbackComponent={({ resetErrorBoundary }) => (
            <ErrorFallback message="경기 정보를 불러오지 못했습니다." onReset={resetErrorBoundary} />
          )}>
            <Suspense fallback={<PageSkeleton />}>
              {activeTab === 0 ? <OpenMatchesContainer /> : <MyTeamMatchesContainer />}
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
}
