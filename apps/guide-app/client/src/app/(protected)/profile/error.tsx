'use client';

import { ErrorFallback } from '@/shared/components/ErrorFallback';

export default function ProfileError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorFallback message="프로필을 불러오지 못했습니다." onReset={reset} />;
}
