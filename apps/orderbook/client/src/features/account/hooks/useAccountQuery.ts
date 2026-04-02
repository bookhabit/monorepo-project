import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { accountService } from '../services/account.service';

export const accountQueryOptions = queryOptions({
  queryKey: ['account'] as const,
  queryFn: accountService.getAccount,
});

export function useAccountQuery() {
  return useSuspenseQuery(accountQueryOptions);
}
