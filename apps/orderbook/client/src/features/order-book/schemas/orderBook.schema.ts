import { z } from 'zod';

// 개별 호가 단계 스키마
const OrderBookLevelSchema = z.object({
  price: z.number(),
  quantity: z.number(),
  total: z.number(),
});

// 전체 오더북 데이터 스키마
export const OrderBookDataSchema = z.object({
  symbol: z.string(),
  timestamp: z.number(),
  bids: z.array(OrderBookLevelSchema), // 매수 호가 10단계 (높은 가격순)
  asks: z.array(OrderBookLevelSchema), // 매도 호가 10단계 (낮은 가격순)
});

// 인터페이스를 Zod로부터 추론 (선택 사항 - 기존 interface 대신 사용 가능)
export type OrderBookData = z.infer<typeof OrderBookDataSchema>;
