import { useQuery } from '@tanstack/react-query';
import { accountService } from '../services/account.service';

export const accountKeys = {
  get: () => ['account'] as const,
};

export function useAccountQuery() {
  const query = useQuery({
    queryKey: accountKeys.get(),
    queryFn: accountService.getAccount,
  });
  return query;
}
