import { z } from 'zod';

// ─── 입력 스키마 (폼 검증) ──────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

export const signupSchema = z
  .object({
    email: z.string().email('올바른 이메일 형식이 아닙니다.'),
    password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    confirmPassword: z.string(),
    nickname: z
      .string()
      .min(2, '닉네임은 최소 2자 이상이어야 합니다.')
      .max(20, '닉네임은 최대 20자입니다.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;

// ─── 응답 스키마 (런타임 검증) ──────────────────────────────────────────────

// RT는 httpOnly 쿠키로 전달 — response body에 포함되지 않음
export const tokenResponseSchema = z.object({
  accessToken: z.string(),
});

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  nickname: z.string(),
  position: z.string().nullable().optional(),
  skillLevel: z.number().int().min(1).max(5).optional(),
});

export type TokenResponse = z.infer<typeof tokenResponseSchema>; // { accessToken: string }
export type User = z.infer<typeof userSchema>;
