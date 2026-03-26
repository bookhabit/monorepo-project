import type { ApiResponse } from '../types/api';

export function isApiSuccess<T>(
  response: ApiResponse<T>,
): response is Extract<ApiResponse<T>, { success: true }> {
  return response.success === true;
}

export function isApiError<T>(
  response: ApiResponse<T>,
): response is Extract<ApiResponse<T>, { success: false }> {
  return response.success === false;
}

export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function isNonEmptyArray<T>(arr: T[]): arr is [T, ...T[]] {
  return arr.length > 0;
}
