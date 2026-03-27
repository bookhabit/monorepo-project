import { createApiClient, ApiError } from '@mono/shared/api';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

const { http, privateApi, publicApi } = createApiClient({
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

// NestJS 에러 응답 { code, message }을 ApiError로 변환
const toApiError = (error: unknown) => {
  const axiosError = error as { response?: { data?: { code?: string; message?: string }; status?: number } };
  const data = axiosError.response?.data;
  const hasErrorCode = data?.code && data?.message;
  if (hasErrorCode) {
    return Promise.reject(new ApiError(data.code!, data.message!, axiosError.response?.status ?? 0));
  }
  return Promise.reject(error);
};

privateApi.interceptors.response.use((res) => res, toApiError);
publicApi.interceptors.response.use((res) => res, toApiError);

export { http };
