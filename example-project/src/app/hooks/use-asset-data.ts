import { useQuery } from '@tanstack/react-query';
import { fetchAssets } from '../services/asset-mock';

export function useAssetData() {
  return useQuery({
    queryKey: ['assets'],
    queryFn: fetchAssets,
    staleTime: 60000, // 1분간 데이터를 신선하게 유지
    gcTime: 300000, // 5분간 캐시 유지
  });
}
