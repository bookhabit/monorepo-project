import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useProtectedQuery } from '@/shared/hooks/useProtectedQuery';
import { matchService } from '../../services/match.service';

export const matchQueryKeys = {
  all: ['matches'] as const,
  open: () => ['matches', 'open'] as const,
  myTeam: () => ['matches', 'me'] as const,
  detail: (id: string) => ['matches', 'detail', id] as const,
};

export function useOpenMatchesQuery() {
  return useProtectedQuery({
    queryKey: matchQueryKeys.open(),
    queryFn: matchService.findOpenMatches,
  });
}

export function useMyTeamMatchesQuery() {
  return useProtectedQuery({
    queryKey: matchQueryKeys.myTeam(),
    queryFn: matchService.findMyTeamMatches,
  });
}

export function useMatchDetailQuery(matchId: string) {
  return useProtectedQuery({
    queryKey: matchQueryKeys.detail(matchId),
    queryFn: () => matchService.findMatchById(matchId),
    enabled: !!matchId,
  });
}

export function useCreateMatchMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: matchService.createMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: matchQueryKeys.all });
    },
  });
}

export function useApplyMatchMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: matchService.applyMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: matchQueryKeys.all });
    },
  });
}

export function useCancelMatchMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: matchService.cancelMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: matchQueryKeys.all });
    },
  });
}
