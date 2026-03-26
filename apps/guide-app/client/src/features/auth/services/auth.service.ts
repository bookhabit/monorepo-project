/**
 * Auth Service — 순수 네트워크 호출 + Zod 검증.
 * React import 금지, Hook 사용 금지.
 */
import { http } from '@/shared/api/client';
import {
  tokenResponseSchema,
  userSchema,
  type LoginInput,
  type SignupInput,
  type TokenResponse,
  type User,
} from '../schemas/auth.schema';

type SignupBody = Omit<SignupInput, 'confirmPassword'>;

export const authService = {
  login: async (data: LoginInput): Promise<TokenResponse> => {
    const res = await http.auth.post('/api/v1/sessions', data);
    return tokenResponseSchema.parse(res);
  },

  signup: async (data: SignupBody): Promise<User> => {
    const res = await http.auth.post('/api/v1/users', data);
    return userSchema.parse(res);
  },

  /**
   * Silent Refresh — RT 쿠키를 사용해 새 AT 발급.
   * body 없이 호출 (쿠키가 자동으로 전송됨).
   */
  refresh: async (): Promise<TokenResponse> => {
    const res = await http.auth.post('/api/v1/sessions/refresh');
    return tokenResponseSchema.parse(res);
  },

  logout: async (): Promise<void> => {
    await http.delete('/api/v1/sessions');
  },

  getMe: async (): Promise<User> => {
    const res = await http.get('/api/v1/users/me');
    return userSchema.parse(res);
  },
};
