'use client';

import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  /** silent refresh 완료 여부 — false 동안 protected 쿼리는 enabled: false */
  authReady: boolean;
  setAccessToken: (accessToken: string) => void;
  clearAuth: () => void;
  setAuthReady: () => void;
}

/**
 * 인증 토큰 전역 상태 — AT만 메모리에 보관.
 *
 * - AT: Zustand 메모리 (persist 없음) — 페이지 새로고침 시 소멸 → silent refresh로 복원
 * - RT: httpOnly Cookie (서버가 Set-Cookie로 설정) — JS 접근 불가, XSS 방어
 *
 * persist를 제거한 이유:
 * localStorage에 AT를 저장하면 XSS 공격으로 탈취 가능.
 * 대신 페이지 진입 시 RT 쿠키로 silent refresh를 수행해 AT를 복원한다.
 */
export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: null,
  authReady: false,
  setAccessToken: (accessToken) => set({ accessToken }),
  clearAuth: () => set({ accessToken: null, authReady: false }),
  setAuthReady: () => set({ authReady: true }),
}));
