import { z } from 'zod';

// ─── 공통 ─────────────────────────────────────────────────────────────────────

export const playerPositionSchema = z.enum(['FW', 'MF', 'DF', 'GK']);
export const joinRequestStatusSchema = z.enum(['PENDING', 'ACCEPTED', 'REJECTED']);

export const teamMemberUserSchema = z.object({
  id: z.string(),
  nickname: z.string(),
  position: playerPositionSchema.nullable().optional(),
  skillLevel: z.number().int(),
});

export const teamMemberSchema = z.object({
  role: z.enum(['CAPTAIN', 'MEMBER']),
  joinedAt: z.string(),
  user: teamMemberUserSchema,
});

export const teamSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  logoUrl: z.string().nullable().optional(),
  captainId: z.string(),
  createdAt: z.string(),
  _count: z.object({ members: z.number() }).optional(),
});

export const teamDetailSchema = teamSchema.extend({
  members: z.array(teamMemberSchema),
});

export const myTeamSchema = z
  .object({
    role: z.enum(['CAPTAIN', 'MEMBER']),
    team: teamDetailSchema,
  })
  .nullable();

export const joinRequestSchema = z.object({
  id: z.string(),
  status: joinRequestStatusSchema,
  message: z.string().nullable().optional(),
  createdAt: z.string(),
  user: teamMemberUserSchema,
});

// ─── 입력 스키마 ──────────────────────────────────────────────────────────────

export const createTeamSchema = z.object({
  name: z
    .string()
    .min(2, '팀 이름은 최소 2자 이상이어야 합니다.')
    .max(30, '팀 이름은 최대 30자입니다.'),
  description: z.string().max(200, '팀 소개는 최대 200자입니다.').optional(),
  logoUrl: z.string().url('올바른 URL 형식이 아닙니다.').optional().or(z.literal('')),
});

export const sendJoinRequestSchema = z.object({
  message: z.string().max(100, '메시지는 최대 100자입니다.').optional(),
});

export const updateProfileSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 최소 2자 이상이어야 합니다.')
    .max(20, '닉네임은 최대 20자입니다.')
    .optional(),
  position: playerPositionSchema.optional(),
  skillLevel: z.number().int().min(1).max(5).optional(),
});

// ─── 타입 ─────────────────────────────────────────────────────────────────────

export type Team = z.infer<typeof teamSchema>;
export type TeamDetail = z.infer<typeof teamDetailSchema>;
export type MyTeam = z.infer<typeof myTeamSchema>;
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type JoinRequest = z.infer<typeof joinRequestSchema>;
export type PlayerPosition = z.infer<typeof playerPositionSchema>;
export type CreateTeamInput = z.infer<typeof createTeamSchema>;
export type SendJoinRequestInput = z.infer<typeof sendJoinRequestSchema>;
