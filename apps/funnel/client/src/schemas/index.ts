import { z } from 'zod';

export const phoneSchema = z.string().regex(/^010-\d{4}-\d{4}$/, '전화번호 형식: 010-0000-0000');
export const birthDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, '생년월일 형식: YYYY-MM-DD');

export const accountOpenStepSchema = z.enum([
  'personal-info',
  'investment-type',
  'id-verification',
  'account-type',
  'agreement',
  'complete',
]);

export const personalInfoSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다'),
  birthDate: birthDateSchema,
  phone: phoneSchema,
  email: z.string().email('이메일 형식이 올바르지 않습니다'),
});

export const investmentTypeSchema = z.object({
  type: z.enum(['conservative', 'moderate', 'aggressive']),
  experience: z.enum(['none', 'beginner', 'intermediate', 'expert']),
});

export const agreementSchema = z.object({
  allAgreed: z.boolean(),
  termsOfService: z.boolean().refine((v) => v, '필수 약관에 동의해야 합니다'),
  privacyPolicy: z.boolean().refine((v) => v, '필수 약관에 동의해야 합니다'),
  marketingOptIn: z.boolean(),
});

export type AccountOpenStep = z.infer<typeof accountOpenStepSchema>;
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type InvestmentTypeFormData = z.infer<typeof investmentTypeSchema>;
export type AgreementFormData = z.infer<typeof agreementSchema>;
