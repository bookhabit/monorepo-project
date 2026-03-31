import { useQuery } from '@tanstack/react-query';
import { DashboardFilters } from '../types/performance-dashboard';
import { fetchReportData, products } from '../services/performance-dashboard-api';

export function useReportData(filters: DashboardFilters) {
  return useQuery({
    queryKey: ['performance-report', filters],
    queryFn: () => fetchReportData(filters),
    staleTime: 60000, // 1 minute
  });
}

export function useProducts() {
  return { data: products };
}
