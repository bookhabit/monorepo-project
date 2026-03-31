import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchTransactions,
  batchBlock,
  batchUnblock,
  fetchUserRiskProfile,
} from '../services/fds-api';
import { FilterParams } from '../types/fds';
import { toast } from 'sonner';

export function useFDSTransactions(filters: FilterParams) {
  return useQuery({
    queryKey: ['fds-transactions', filters],
    queryFn: () => fetchTransactions(filters),
    staleTime: 10000,
    gcTime: 60000,
  });
}

export function useBatchBlock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: batchBlock,
    onMutate: async (transactionIds) => {
      await queryClient.cancelQueries({ queryKey: ['fds-transactions'] });

      const previousData = queryClient.getQueryData(['fds-transactions']);

      queryClient.setQueriesData({ queryKey: ['fds-transactions'] }, (old: any) => {
        if (!old) return old;
        return old.map((t: any) =>
          transactionIds.includes(t.id) ? { ...t, status: 'blocked' } : t
        );
      });

      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['fds-transactions'], context.previousData);
      }
      toast.error('일괄 차단 처리에 실패했습니다.');
    },
    onSuccess: (data, variables) => {
      toast.success(`${variables.length}건의 거래가 차단되었습니다.`);
      queryClient.invalidateQueries({ queryKey: ['fds-transactions'] });
    },
  });
}

export function useBatchUnblock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: batchUnblock,
    onMutate: async (transactionIds) => {
      await queryClient.cancelQueries({ queryKey: ['fds-transactions'] });

      const previousData = queryClient.getQueryData(['fds-transactions']);

      queryClient.setQueriesData({ queryKey: ['fds-transactions'] }, (old: any) => {
        if (!old) return old;
        return old.map((t: any) =>
          transactionIds.includes(t.id) ? { ...t, status: 'normal' } : t
        );
      });

      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['fds-transactions'], context.previousData);
      }
      toast.error('일괄 차단 해제에 실패했습니다.');
    },
    onSuccess: (data, variables) => {
      toast.success(`${variables.length}건의 차단이 해제되었습니다.`);
      queryClient.invalidateQueries({ queryKey: ['fds-transactions'] });
    },
  });
}

export function useUserRiskProfile(userId: string | null) {
  return useQuery({
    queryKey: ['user-risk-profile', userId],
    queryFn: () => fetchUserRiskProfile(userId!),
    enabled: !!userId,
    staleTime: 30000,
  });
}
