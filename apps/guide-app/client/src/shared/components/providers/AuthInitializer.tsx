'use client';

import { useEffect, useRef } from 'react';
import { authService } from '@/features/auth/services/auth.service';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

/**
 * 앱 진입 시 AT를 복원하는 Silent Refresh.
 *
 * AT는 메모리에만 존재하므로 페이지 새로고침 시 소멸한다.
 * 이 컴포넌트는 마운트 시 /refresh를 호출해 AT를 복원한다.
 * RT 쿠키가 없으면(비로그인 상태) 조용히 실패 — 리다이렉트는 Middleware가 처리.
 */
export function AuthInitializer() {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const setAuthReady = useAuthStore.getState().setAuthReady;

    authService.refresh().then(({ accessToken }) => {
      setAccessToken(accessToken);
    }).catch(() => {
      // RT 없거나 만료 → 무시 (Middleware가 보호 경로 차단)
    }).finally(() => {
      setAuthReady();
    });
  }, [setAccessToken]);

  return null;
}
