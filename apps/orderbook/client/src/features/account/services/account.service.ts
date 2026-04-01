import { publicApi } from '@/shared/api';
import { Account, accountSchema } from '../schemas/account.schema';

export const accountService = {
  getAccount: async (): Promise<Account> => {
    return publicApi.http.get<Account>('/account', {}, accountSchema);
  },
};
