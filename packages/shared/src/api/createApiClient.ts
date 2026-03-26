import axios from 'axios';
import { z } from 'zod';

import { ApiError } from './errors';

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiResponse } from '../types/api';

interface CustomConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

interface QueueEntry {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

export interface CreateApiClientOptions {
  /** API 서버 기본 URL */
  baseURL: string;
  /** 현재 액세스 토큰 반환. 없으면 null */
  getAccessToken: () => string | null;
  /**
   * 현재 리프레시 토큰 반환. 없으면 null.
   * httpOnly Cookie 방식에서는 생략 가능 — 브라우저가 자동으로 쿠키를 전송.
   */
  getRefreshToken?: () => string | null;
  /**
   * 갱신 성공 시 호출. 새 accessToken을 스토어에 저장.
   * Cookie 방식에서는 refreshToken이 빈 문자열로 전달됨.
   */
  onTokenRefreshed: (accessToken: string, refreshToken: string) => void;
  /** 토큰 갱신 실패 시 호출 — 로그아웃 + 리다이렉트 */
  onAuthFailure: () => void;
  /**
   * /refresh 엔드포인트 경로. 기본값: '/sessions/refresh'
   * baseURL 기준 상대경로.
   */
  refreshEndpoint?: string;
  /**
   * cross-origin 쿠키 전송 여부 (httpOnly Cookie RT 방식에 필요).
   * 기본값: false
   */
  withCredentials?: boolean;
  /** 요청 타임아웃 (ms). 기본 10000 */
  timeout?: number;
}

export interface ApiClient {
  publicApi: AxiosInstance;
  privateApi: AxiosInstance;
  http: {
    auth: {
      post: <T>(url: string, data?: object, schema?: z.ZodSchema) => Promise<T>;
    };
    get: <T>(url: string, params?: object, schema?: z.ZodSchema) => Promise<T>;
    post: <T>(url: string, data?: object, schema?: z.ZodSchema) => Promise<T>;
    put: <T>(url: string, data?: object, schema?: z.ZodSchema) => Promise<T>;
    patch: <T>(url: string, data?: object, schema?: z.ZodSchema) => Promise<T>;
    delete: <T>(url: string, schema?: z.ZodSchema) => Promise<T>;
  };
  customInstance: <T>(config: AxiosRequestConfig, options?: { schema?: z.ZodSchema }) => Promise<T>;
}

function validateResponse<T>(res: AxiosResponse<T>, schema?: z.ZodSchema): T {
  if (schema) return schema.parse(res.data) as T;
  return res.data;
}

function unwrapApiResponse<T>(res: AxiosResponse<ApiResponse<T>>): T {
  const body = res.data;
  if (!body.success) {
    throw new ApiError(body.error.code, body.error.message, res.status, body.error.details);
  }
  return body.data;
}

/**
 * 앱마다 독립적인 API 클라이언트 인스턴스를 생성합니다.
 *
 * @example — Body 기반 RT (기존 방식)
 * createApiClient({
 *   baseURL: '...',
 *   getAccessToken: () => store.getState().accessToken,
 *   getRefreshToken: () => store.getState().refreshToken,
 *   onTokenRefreshed: (at, rt) => store.getState().setTokens(at, rt),
 *   onAuthFailure: () => { store.getState().clearAuth(); window.location.href = '/login'; },
 * });
 *
 * @example — httpOnly Cookie 기반 RT (Hybrid Refresh JWT)
 * createApiClient({
 *   baseURL: '...',
 *   withCredentials: true,           // 쿠키 자동 전송
 *   refreshEndpoint: '/api/v1/sessions/refresh',
 *   getAccessToken: () => store.getState().accessToken,
 *   // getRefreshToken 생략 — 쿠키로 자동 전송
 *   onTokenRefreshed: (at) => store.getState().setAccessToken(at),
 *   onAuthFailure: () => { store.getState().clearAuth(); window.location.href = '/login'; },
 * });
 */
export function createApiClient(options: CreateApiClientOptions): ApiClient {
  const {
    baseURL,
    getAccessToken,
    getRefreshToken,
    onTokenRefreshed,
    onAuthFailure,
    refreshEndpoint = '/sessions/refresh',
    withCredentials = false,
    timeout = 10000,
  } = options;

  const BASE_CONFIG: AxiosRequestConfig = {
    baseURL,
    timeout,
    withCredentials,
    headers: { 'Content-Type': 'application/json' },
  };

  const publicApi = axios.create({ ...BASE_CONFIG, withCredentials });
  const privateApi = axios.create(BASE_CONFIG);

  let isRefreshing = false;
  let failedQueue: QueueEntry[] = [];

  const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((entry) => {
      if (error) entry.reject(error);
      else entry.resolve(token!);
    });
    failedQueue = [];
  };

  privateApi.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  privateApi.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config as CustomConfig;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return privateApi(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Cookie 방식: body 없이 호출 (브라우저가 httpOnly RT 쿠키 자동 전송)
          // Body 방식: getRefreshToken()으로 body에 포함
          const refreshToken = getRefreshToken?.() ?? null;
          const body = refreshToken ? { refreshToken } : undefined;

          const res = await publicApi.post<{
            accessToken: string;
            refreshToken?: string;
          }>(refreshEndpoint, body);

          const { accessToken, refreshToken: newRefreshToken } = res.data;
          onTokenRefreshed(accessToken, newRefreshToken ?? '');
          processQueue(null, accessToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          return privateApi(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          onAuthFailure();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );

  const http: ApiClient['http'] = {
    auth: {
      post: <T>(url: string, data?: object, schema?: z.ZodSchema) =>
        publicApi.post<T>(url, data).then((res) => validateResponse(res, schema)),
    },
    get: <T>(url: string, params?: object, schema?: z.ZodSchema) =>
      privateApi.get<T>(url, { params }).then((res) => validateResponse(res, schema)),
    post: <T>(url: string, data?: object, schema?: z.ZodSchema) =>
      privateApi.post<T>(url, data).then((res) => validateResponse(res, schema)),
    put: <T>(url: string, data?: object, schema?: z.ZodSchema) =>
      privateApi.put<T>(url, data).then((res) => validateResponse(res, schema)),
    patch: <T>(url: string, data?: object, schema?: z.ZodSchema) =>
      privateApi.patch<T>(url, data).then((res) => validateResponse(res, schema)),
    delete: <T>(url: string, schema?: z.ZodSchema) =>
      privateApi.delete<T>(url).then((res) => validateResponse(res, schema)),
  };

  const customInstance = <T>(
    config: AxiosRequestConfig,
    opts?: { schema?: z.ZodSchema },
  ): Promise<T> =>
    privateApi(config).then((res) => validateResponse(res as AxiosResponse<T>, opts?.schema));

  return { publicApi, privateApi, http, customInstance };
}

export function createWrappedApiClient(options: CreateApiClientOptions) {
  const client = createApiClient(options);
  const { privateApi, publicApi } = client;

  return {
    ...client,
    http: {
      auth: {
        post: <T>(url: string, data?: object) =>
          publicApi.post<ApiResponse<T>>(url, data).then(unwrapApiResponse<T>),
      },
      get: <T>(url: string, params?: object) =>
        privateApi.get<ApiResponse<T>>(url, { params }).then(unwrapApiResponse<T>),
      post: <T>(url: string, data?: object) =>
        privateApi.post<ApiResponse<T>>(url, data).then(unwrapApiResponse<T>),
      put: <T>(url: string, data?: object) =>
        privateApi.put<ApiResponse<T>>(url, data).then(unwrapApiResponse<T>),
      patch: <T>(url: string, data?: object) =>
        privateApi.patch<ApiResponse<T>>(url, data).then(unwrapApiResponse<T>),
      delete: <T>(url: string) =>
        privateApi.delete<ApiResponse<T>>(url).then(unwrapApiResponse<T>),
    },
  };
}
