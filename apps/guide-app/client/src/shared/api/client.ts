import { createApiClient } from '@mono/shared/api';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

const { http } = createApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000',
  withCredentials: true,                         // httpOnly RT 쿠키 자동 전송
  refreshEndpoint: '/api/v1/sessions/refresh',
  getAccessToken: () => useAuthStore.getState().accessToken,
  // getRefreshToken 생략 — 쿠키가 자동으로 전송됨
  onTokenRefreshed: (accessToken) => {
    useAuthStore.getState().setAccessToken(accessToken);
  },
  onAuthFailure: () => {
    useAuthStore.getState().clearAuth();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },
});

export { http };
