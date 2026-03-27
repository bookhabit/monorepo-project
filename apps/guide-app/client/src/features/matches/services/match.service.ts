/**
 * Match Service — 순수 네트워크 호출 + Zod 검증.
 */
import { http } from '@/shared/api/client';
import { matchSchema, type Match, type CreateMatchInput } from '../schemas/match.schema';
import { z } from 'zod';

export const matchService = {
  createMatch: async (data: CreateMatchInput): Promise<Match> => {
    const res = await http.post('/api/v1/matches', data);
    return matchSchema.parse(res);
  },

  findOpenMatches: async (): Promise<Match[]> => {
    const res = await http.get('/api/v1/matches');
    return z.array(matchSchema).parse(res);
  },

  findMyTeamMatches: async (): Promise<Match[]> => {
    const res = await http.get('/api/v1/matches/me');
    return z.array(matchSchema).parse(res);
  },

  findMatchById: async (matchId: string): Promise<Match> => {
    const res = await http.get(`/api/v1/matches/${matchId}`);
    return matchSchema.parse(res);
  },

  applyMatch: async (matchId: string): Promise<Match> => {
    const res = await http.patch(`/api/v1/matches/${matchId}/apply`);
    return matchSchema.parse(res);
  },

  cancelMatch: async (matchId: string): Promise<Match> => {
    const res = await http.patch(`/api/v1/matches/${matchId}/cancel`);
    return matchSchema.parse(res);
  },
};
