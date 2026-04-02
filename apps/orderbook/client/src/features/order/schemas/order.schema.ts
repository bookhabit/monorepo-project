import { z } from 'zod';

/**
 * 주문 요청(Request) 스키마
 * 지정가(limit) 주문일 때만 price가 필수이도록 검증 로직 포함
 */
export const CreateOrderRequestSchema = z.object({
  symbol: z.string().min(1, '종목 코드를 입력해주세요.'),
  side: z.enum(['buy', 'sell']),
  price: z.number().positive('가격은 0보다 커야 합니다.'),
  quantity: z.number().positive('수량은 0보다 커야 합니다.'),
  type: z.enum(['limit', 'market']),
});

/**
 * 주문 응답(Response) 스키마
 */
export const OrderResponseSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  side: z.enum(['buy', 'sell']),
  type: z.enum(['limit', 'market']),
  price: z.number(),
  quantity: z.number(),
  status: z.literal('accepted'),
  createdAt: z.string().datetime(), // ISO 8601 형식 검증
});

// TypeScript 타입 추출
export type CreateOrderRequest = z.infer<typeof CreateOrderRequestSchema>;
export type OrderResponse = z.infer<typeof OrderResponseSchema>;
