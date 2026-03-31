import { useQuery } from '@tanstack/react-query';
import { fetchPerformanceData } from '../services/asset-mock';

export function usePerformanceData(period: '1D' | '1W' | '1M') {
  return useQuery({
    queryKey: ['performance', period],
    queryFn: () => fetchPerformanceData(period),
    staleTime: 30000, // 30초간 데이터를 신선하게 유지
    gcTime: 300000, // 5분간 캐시 유지
  });
}
