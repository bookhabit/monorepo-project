import { publicApi } from '@/shared/api';
import { CreateOrderRequest, OrderResponse, OrderResponseSchema } from '../schemas/order.schema';

export const orderService = {
  createOrder: async (orderData: CreateOrderRequest): Promise<OrderResponse> => {
    return publicApi.http.post<OrderResponse>('/orders', orderData, undefined, OrderResponseSchema);
  },
  getOrders: async (): Promise<OrderResponse[]> => {
    return publicApi.http.get<OrderResponse[]>('/orders', {}, OrderResponseSchema.array());
  },
};
