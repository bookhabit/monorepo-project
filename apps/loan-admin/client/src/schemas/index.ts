import { z } from 'zod';

export const loanStatusSchema = z.enum([
  'pending',
  'under-review',
  'approved',
  'rejected',
  'cancelled',
]);

export const loanRiskLevelSchema = z.enum(['low', 'medium', 'high', 'critical']);

export const loanApplicationSchema = z.object({
  id: z.string(),
  applicantName: z.string(),
  applicantId: z.string(),
  amount: z.number().positive(),
  purpose: z.string(),
  status: loanStatusSchema,
  riskLevel: loanRiskLevelSchema,
  creditScore: z.number().min(0).max(1000),
  appliedAt: z.string().datetime(),
  reviewedAt: z.string().datetime().optional(),
  reviewerId: z.string().optional(),
  notes: z.string().optional(),
});

export const reviewLoanDto = z.object({
  status: z.enum(['approved', 'rejected']),
  notes: z.string().optional(),
});

export type LoanStatus = z.infer<typeof loanStatusSchema>;
export type LoanRiskLevel = z.infer<typeof loanRiskLevelSchema>;
export type LoanApplication = z.infer<typeof loanApplicationSchema>;
export type ReviewLoanFormData = z.infer<typeof reviewLoanDto>;
