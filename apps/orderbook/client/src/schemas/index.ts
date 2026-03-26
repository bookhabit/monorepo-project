import { z } from 'zod';

export const orderbookEntrySchema = z.object({
  price: z.number().positive(),
  quantity: z.number().nonnegative(),
  total: z.number().nonnegative(),
});

export const orderbookSchema = z.object({
  symbol: z.string(),
  timestamp: z.number(),
  asks: z.array(orderbookEntrySchema).max(10),
  bids: z.array(orderbookEntrySchema).max(10),
});

export const orderSchema = z.object({
  symbol: z.string(),
  side: z.enum(['buy', 'sell']),
  type: z.enum(['limit', 'market']),
  price: z.number().positive().optional(),
  quantity: z.number().positive(),
});

export type OrderbookEntry = z.infer<typeof orderbookEntrySchema>;
export type Orderbook = z.infer<typeof orderbookSchema>;
export type OrderFormData = z.infer<typeof orderSchema>;
