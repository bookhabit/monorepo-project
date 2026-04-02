import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { z } from 'zod';

function handleResponse<T>(res: AxiosResponse<any>, schema?: z.ZodSchema): T {
  const data = res.data;

  if (schema) {
    const result = schema.safeParse(data);
    if (!result.success) {
      console.error('❌ 스키마 검증 실패:', result.error.format());
      throw result.error;
    }
    return result.data;
  }
  return data as T;
}

function attachErrorInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(`❌ HTTP 오류 [${error.response.status}]:`, error.response.data);
        } else if (error.request) {
          console.error('❌ 네트워크 오류: 서버로부터 응답이 없습니다.');
        }
      } else {
        console.error('❌ 알 수 없는 오류:', error);
      }
      return Promise.reject(error);
    },
  );
}

export const createPublicClient = (baseURL: string, timeout = 10000) => {
  const instance: AxiosInstance = axios.create({
    baseURL,
    timeout,
    headers: { 'Content-Type': 'application/json' },
  });

  attachErrorInterceptor(instance);

  return {
    instance,
    http: {
      get: async <T>(
        url: string,
        config?: AxiosRequestConfig,
        schema?: z.ZodSchema,
      ): Promise<T> => {
        const res = await instance.get<T>(url, config);
        return handleResponse<T>(res, schema);
      },
      post: async <T>(
        url: string,
        data?: object,
        config?: AxiosRequestConfig,
        schema?: z.ZodSchema,
      ): Promise<T> => {
        const res = await instance.post<T>(url, data, config);
        return handleResponse<T>(res, schema);
      },
    },
  };
};
