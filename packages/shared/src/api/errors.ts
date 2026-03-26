import type { AxiosError } from 'axios';

/**
 * 서버가 ApiResponse 형식으로 반환한 에러를 래핑합니다.
 * catch 블록에서 instanceof ApiError 로 분기할 수 있습니다.
 */
export class ApiError extends Error {
  readonly code: string;
  readonly status: number;
  readonly details?: unknown;

  constructor(code: string, message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function isAxiosNetworkError(error: unknown): boolean {
  const e = error as AxiosError;
  return !!e?.isAxiosError && !e.response;
}

/**
 * Axios 에러에서 사용자에게 보여줄 메시지를 추출합니다.
 * - ApiError: 서버가 내려준 message 사용
 * - 네트워크 단절: 고정 문구
 * - 그 외: 기본 문구
 */
export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) return error.message;
  if (isAxiosNetworkError(error)) return '네트워크 연결을 확인해주세요.';
  if (error instanceof Error) return error.message;
  return '알 수 없는 오류가 발생했습니다.';
}
