import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderService } from './order.service';

const orderExample = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  symbol: 'AAPL',
  side: 'buy',
  type: 'limit',
  price: 150000,
  quantity: 10,
  status: 'accepted',
  createdAt: '2024-01-01T00:00:00.000Z',
};

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: '주문 접수 (매수/매도)' })
  @ApiResponse({ status: 201, description: '주문 접수 성공', schema: { example: orderExample } })
  @ApiResponse({ status: 400, description: '잘못된 요청 (잔액 부족, 수량 부족, 지정가 주문 시 가격 누락 등)' })
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: '주문 내역 조회' })
  @ApiResponse({ status: 200, description: '주문 내역 목록', schema: { example: [orderExample] } })
  findAll() {
    return this.orderService.findAll();
  }
}
