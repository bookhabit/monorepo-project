import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchLoanApplications,
  batchApprove,
  batchReject,
  approveApplication,
  rejectApplication,
  fetchReviewHistory,
} from '../services/loan-api';
import { FilterParams } from '../types/loan';
import { toast } from 'sonner';

export function useLoanApplications(filters: FilterParams) {
  return useQuery({
    queryKey: ['loan-applications', filters],
    queryFn: () => fetchLoanApplications(filters),
    staleTime: 30000,
    gcTime: 300000,
  });
}

export function useBatchApprove() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: batchApprove,
    onMutate: async (applicationIds) => {
      await queryClient.cancelQueries({ queryKey: ['loan-applications'] });

      const previousData = queryClient.getQueryData(['loan-applications']);

      queryClient.setQueriesData({ queryKey: ['loan-applications'] }, (old: any) => {
        if (!old) return old;
        return old.map((app: any) =>
          applicationIds.includes(app.id)
            ? { ...app, status: 'approved', reviewedAt: new Date().toISOString() }
            : app
        );
      });

      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['loan-applications'], context.previousData);
      }
      toast.error('일괄 승인 처리에 실패했습니다.');
    },
    onSuccess: (data, variables) => {
      toast.success(`${variables.length}건의 대출이 승인되었습니다.`);
      queryClient.invalidateQueries({ queryKey: ['loan-applications'] });
    },
  });
}

export function useBatchReject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: batchReject,
    onMutate: async (applicationIds) => {
      await queryClient.cancelQueries({ queryKey: ['loan-applications'] });

      const previousData = queryClient.getQueryData(['loan-applications']);

      queryClient.setQueriesData({ queryKey: ['loan-applications'] }, (old: any) => {
        if (!old) return old;
        return old.map((app: any) =>
          applicationIds.includes(app.id)
            ? { ...app, status: 'rejected', reviewedAt: new Date().toISOString() }
            : app
        );
      });

      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['loan-applications'], context.previousData);
      }
      toast.error('일괄 거절 처리에 실패했습니다.');
    },
    onSuccess: (data, variables) => {
      toast.success(`${variables.length}건의 대출이 거절되었습니다.`);
      queryClient.invalidateQueries({ queryKey: ['loan-applications'] });
    },
  });
}

export function useReviewHistory(applicationId: string | null) {
  return useQuery({
    queryKey: ['review-history', applicationId],
    queryFn: () => fetchReviewHistory(applicationId!),
    enabled: !!applicationId,
    staleTime: 60000,
  });
}
