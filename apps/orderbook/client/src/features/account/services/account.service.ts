import { publicApi } from '@/shared/api';
import { Account, accountSchema } from '../schemas/account.schema';
import z from 'zod';

export const accountService = {
  getAccount: async (): Promise<Account | null> => {
    try {
      const response = await publicApi.http.get<Account>('/account', {}, accountSchema);
      return response;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // 여기서 검증 실패 로그를 확인할 수 있습니다.
        console.error('❌ 데이터 구조 불일치:', error.errors);
      } else {
        console.error('❌ 네트워크 에러:', error);
      }
      return null; // 또는 throw error;
    }
  },
};
