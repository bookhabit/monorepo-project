import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchCustomers, 
  fetchCustomerById,
  fetchCustomerTransactions,
  fetchCustomerConsultations,
  fetchTemplates,
  createConsultation
} from '../services/cs-console-api';
import { CustomerFilters, CreateConsultationInput } from '../types/cs-console';
import { toast } from 'sonner';

export function useCustomers(filters?: CustomerFilters) {
  return useQuery({
    queryKey: ['cs-customers', filters],
    queryFn: () => fetchCustomers(filters),
    staleTime: 30000,
  });
}

export function useCustomer(customerId: string | null) {
  return useQuery({
    queryKey: ['cs-customer', customerId],
    queryFn: () => fetchCustomerById(customerId!),
    enabled: !!customerId,
    staleTime: 60000,
  });
}

export function useCustomerTransactions(customerId: string | null) {
  return useQuery({
    queryKey: ['cs-transactions', customerId],
    queryFn: () => fetchCustomerTransactions(customerId!),
    enabled: !!customerId,
    staleTime: 30000,
  });
}

export function useCustomerConsultations(customerId: string | null) {
  return useQuery({
    queryKey: ['cs-consultations', customerId],
    queryFn: () => fetchCustomerConsultations(customerId!),
    enabled: !!customerId,
    staleTime: 30000,
  });
}

export function useTemplates(category?: string) {
  return useQuery({
    queryKey: ['cs-templates', category],
    queryFn: () => fetchTemplates(category as any),
    staleTime: 300000,
  });
}

export function useCreateConsultation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createConsultation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cs-consultations', data.customerId] });
      toast.success('상담 내역이 등록되었습니다.');
    },
    onError: () => {
      toast.error('상담 내역 등록에 실패했습니다.');
    },
  });
}
