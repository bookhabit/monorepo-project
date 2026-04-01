import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { z } from 'zod';

// 1. 응답 데이터 검증 및 추출 함수
function handleResponse<T>(res: AxiosResponse<any>, schema?: z.ZodSchema): T {
  const data = res.data;

  if (schema) {
    const result = schema.safeParse(data); // parse 대신 safeParse 사용
    if (!result.success) {
      // 여기서 전역 에러 알림(Toast 등)을 띄우거나 상세 로그를 남깁니다.
      console.error('AXIOS 데이터 검증 실패 상세:', result.error.format());
      throw result.error;
    }
    return result.data;
  }
  return data as T;
}

// 2. 인스턴스 생성 함수
export const createPublicClient = (baseURL: string, timeout = 10000) => {
  const instance: AxiosInstance = axios.create({
    baseURL,
    timeout,
    headers: { 'Content-Type': 'application/json' },
  });

  // 사용하기 편하도록 http 메서드 래핑
  return {
    instance, // 필요시 원본 axios 인스턴스 접근 가능
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
      // 필요에 따라 put, delete 등 추가
    },
  };
};
