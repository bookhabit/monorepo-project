/**
 * Team Service — 순수 네트워크 호출 + Zod 검증.
 * React import 금지, Hook 사용 금지.
 */
import { http } from '@/shared/api/client';
import {
  teamSchema,
  teamDetailSchema,
  myTeamSchema,
  joinRequestSchema,
  type Team,
  type TeamDetail,
  type MyTeam,
  type JoinRequest,
  type CreateTeamInput,
  type SendJoinRequestInput,
} from '../schemas/team.schema';
import { z } from 'zod';

export const teamService = {
  createTeam: async (data: CreateTeamInput): Promise<TeamDetail> => {
    const res = await http.post('/api/v1/teams', data);
    return teamDetailSchema.parse(res);
  },

  findTeams: async (query?: string): Promise<Team[]> => {
    const params = query ? `?q=${encodeURIComponent(query)}` : '';
    const res = await http.get(`/api/v1/teams${params}`);
    return z.array(teamSchema).parse(res);
  },

  findTeamById: async (teamId: string): Promise<TeamDetail> => {
    const res = await http.get(`/api/v1/teams/${teamId}`);
    return teamDetailSchema.parse(res);
  },

  getMyTeam: async (): Promise<MyTeam> => {
    const res = await http.get('/api/v1/teams/me');
    if (!res) return null;
    return myTeamSchema.parse(res);
  },

  sendJoinRequest: async (teamId: string, data: SendJoinRequestInput) => {
    const res = await http.post(`/api/v1/teams/${teamId}/join-requests`, data);
    return res;
  },

  findJoinRequests: async (teamId: string): Promise<JoinRequest[]> => {
    const res = await http.get(`/api/v1/teams/${teamId}/join-requests`);
    return z.array(joinRequestSchema).parse(res);
  },

  respondJoinRequest: async (
    teamId: string,
    requestId: string,
    status: 'ACCEPTED' | 'REJECTED',
  ) => {
    const res = await http.patch(`/api/v1/teams/${teamId}/join-requests/${requestId}`, { status });
    return res;
  },

  leaveTeam: async (teamId: string): Promise<void> => {
    await http.delete(`/api/v1/teams/${teamId}/members/me`);
  },
};
