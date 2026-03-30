'use client';

import { useEffect, useRef } from 'react';
import { ApiError } from '@mono/shared/api';
import { authService } from '@/features/auth/services/auth.service';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { ErrorCode } from '@/shared/constants/error-codes';

/**
 * 앱 진입 시 AT를 복원하는 Silent Refresh.
 *
 * AT는 메모리에만 존재하므로 페이지 새로고침 시 소멸한다.
 * 이 컴포넌트는 마운트 시 /refresh를 호출해 AT를 복원한다.
 * - RT 쿠키 없음 → 조용히 실패 (비로그인 상태, Middleware가 보호 경로 차단)
 * - RT 쿠키 있지만 무효 → 서버가 쿠키 삭제 + 로그인 페이지로 이동
 */
export function AuthInitializer() {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const { setAuthReady, clearAuth } = useAuthStore.getState();

    authService.refresh().then(({ accessToken }) => {
      setAccessToken(accessToken);
    }).catch((error) => {
      const isMissingToken =
        error instanceof ApiError && error.code === ErrorCode.MISSING_REFRESH_TOKEN;

      if (!isMissingToken) {
        // 쿠키는 있었지만 세션 만료·재사용 감지 등 → 서버가 쿠키 삭제
        // 클라이언트 상태도 초기화 후 로그인으로 이동
        clearAuth();
        window.location.href = '/login';
      }
    }).finally(() => {
      setAuthReady();
    });
  }, [setAccessToken]);

  return null;
}
