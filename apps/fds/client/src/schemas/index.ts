import { z } from 'zod';

export const fdsRiskLevelSchema = z.enum(['low', 'medium', 'high']);

export const transactionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  amount: z.number(),
  type: z.enum(['transfer', 'withdrawal', 'deposit', 'payment']),
  riskLevel: fdsRiskLevelSchema,
  riskScore: z.number().min(0).max(100),
  status: z.enum(['normal', 'suspicious', 'blocked', 'cleared']),
  timestamp: z.string().datetime(),
  description: z.string(),
  metadata: z.record(z.unknown()).optional(),
});

export const transactionFilterSchema = z.object({
  riskLevel: fdsRiskLevelSchema.optional(),
  status: transactionSchema.shape.status.optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export type FdsRiskLevel = z.infer<typeof fdsRiskLevelSchema>;
export type Transaction = z.infer<typeof transactionSchema>;
export type TransactionFilter = z.infer<typeof transactionFilterSchema>;
