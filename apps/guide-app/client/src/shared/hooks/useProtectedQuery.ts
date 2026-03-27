'use client';

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

/**
 * 인증이 완료된 후에만 실행되는 useQuery 래퍼.
 * authReady(silent refresh 완료) 이전엔 쿼리를 실행하지 않는다.
 */
export function useProtectedQuery<TData, TError = Error>(
  options: UseQueryOptions<TData, TError>,
) {
  const authReady = useAuthStore((s) => s.authReady);

  return useQuery<TData, TError>({
    ...options,
    enabled: authReady && (options.enabled ?? true),
    throwOnError: true,
  });
}
