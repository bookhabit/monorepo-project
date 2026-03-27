import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useProtectedQuery } from '@/shared/hooks/useProtectedQuery';
import { teamService } from '../../services/team.service';

export const teamQueryKeys = {
  all: ['teams'] as const,
  list: (q?: string) => ['teams', 'list', q ?? ''] as const,
  detail: (id: string) => ['teams', 'detail', id] as const,
  myTeam: () => ['teams', 'me'] as const,
  joinRequests: (teamId: string) => ['teams', teamId, 'join-requests'] as const,
};

/** 팀 목록 / 검색 */
export function useTeamsQuery(query?: string) {
  return useProtectedQuery({
    queryKey: teamQueryKeys.list(query),
    queryFn: () => teamService.findTeams(query),
  });
}

/** 팀 단건 조회 */
export function useTeamDetailQuery(teamId: string) {
  return useProtectedQuery({
    queryKey: teamQueryKeys.detail(teamId),
    queryFn: () => teamService.findTeamById(teamId),
    enabled: !!teamId,
  });
}

/** 내 팀 조회 */
export function useMyTeamQuery() {
  return useProtectedQuery({
    queryKey: teamQueryKeys.myTeam(),
    queryFn: teamService.getMyTeam,
  });
}

/** 가입 신청 목록 (캡틴용) */
export function useJoinRequestsQuery(teamId: string) {
  return useProtectedQuery({
    queryKey: teamQueryKeys.joinRequests(teamId),
    queryFn: () => teamService.findJoinRequests(teamId),
    enabled: !!teamId,
  });
}

/** 팀 생성 */
export function useCreateTeamMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: teamService.createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: teamQueryKeys.myTeam() });
    },
  });
}

/** 가입 신청 */
export function useSendJoinRequestMutation(teamId: string) {
  return useMutation({
    mutationFn: (data: { message?: string }) => teamService.sendJoinRequest(teamId, data),
  });
}

/** 가입 신청 응답 */
export function useRespondJoinRequestMutation(teamId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ requestId, status }: { requestId: string; status: 'ACCEPTED' | 'REJECTED' }) =>
      teamService.respondJoinRequest(teamId, requestId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamQueryKeys.joinRequests(teamId) });
      queryClient.invalidateQueries({ queryKey: teamQueryKeys.detail(teamId) });
    },
  });
}

/** 팀 탈퇴 */
export function useLeaveTeamMutation(teamId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => teamService.leaveTeam(teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamQueryKeys.myTeam() });
    },
  });
}
