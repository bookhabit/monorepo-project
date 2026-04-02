'use client';

import { ErrorFallback } from '@/shared/components/ErrorFallback';

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorFallback message="대시보드를 불러오지 못했습니다." onReset={reset} />;
}
