'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ProfileContainer } from '@/features/profile/containers/ProfileContainer';
import { PageSkeleton } from '@/shared/components/PageSkeleton';
import { ErrorFallback } from '@/shared/components/ErrorFallback';

export default function ProfilePage() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={({ resetErrorBoundary }) => (
          <ErrorFallback message="프로필을 불러오지 못했습니다." onReset={resetErrorBoundary} />
        )}>
          <Suspense fallback={<PageSkeleton />}>
            <ProfileContainer />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
