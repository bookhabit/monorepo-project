import { z } from 'zod';

export const matchStatusSchema = z.enum(['OPEN', 'MATCHED', 'COMPLETED', 'CANCELLED']);

export const matchTeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  logoUrl: z.string().nullable().optional(),
});

export const matchSchema = z.object({
  id: z.string(),
  matchDate: z.string(),
  location: z.string(),
  status: matchStatusSchema,
  note: z.string().nullable().optional(),
  createdAt: z.string(),
  homeTeam: matchTeamSchema,
  awayTeam: matchTeamSchema.nullable().optional(),
});

export const createMatchSchema = z.object({
  matchDate: z.string().min(1, '경기 날짜를 선택해주세요.'),
  location: z
    .string()
    .min(2, '장소는 최소 2자 이상이어야 합니다.')
    .max(100, '장소는 최대 100자입니다.'),
  note: z.string().max(200, '메모는 최대 200자입니다.').optional(),
});

export type Match = z.infer<typeof matchSchema>;
export type MatchStatus = z.infer<typeof matchStatusSchema>;
export type CreateMatchInput = z.infer<typeof createMatchSchema>;
