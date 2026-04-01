'use client';

import { ErrorFallback } from '@/shared/components/ErrorFallback';

export default function MatchesError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorFallback message="경기 정보를 불러오지 못했습니다." onReset={reset} />;
}
