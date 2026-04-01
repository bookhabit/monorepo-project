import z from 'zod';

export const accountSchema = z.object({
  cash: z.number(), // 보유 현금 (초기값: 10,000,000)
  stockQuantity: z.number().default(0), // 보유 주식 수량 (초기값: 0)
});

export type Account = z.infer<typeof accountSchema>;
