import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { CreateOrderDto } from '../dto/create-order.dto';

export interface Order {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  type: 'limit' | 'market';
  price: number;
  quantity: number;
  status: 'accepted';
  createdAt: string;
}

@Injectable()
export class OrderService {
  private orders: Order[] = [];

  constructor(private readonly accountService: AccountService) {}

  create(dto: CreateOrderDto): Order {
    if (dto.type === 'limit' && !dto.price) {
      throw new BadRequestException('지정가 주문은 price가 필요합니다');
    }

    const { cash, stockQuantity } = this.accountService.getBalance();
    const price = dto.price ?? 0;

    if (dto.type === 'market' && dto.side === 'buy' && cash === 0) {
      throw new BadRequestException('잔액이 부족합니다');
    }

    if (dto.side === 'buy') {
      this.accountService.executeBuy(price, dto.quantity);
    } else {
      if (stockQuantity < dto.quantity) {
        throw new BadRequestException('보유 수량이 부족합니다');
      }
      this.accountService.executeSell(price, dto.quantity);
    }

    const order: Order = {
      id: crypto.randomUUID(),
      symbol: dto.symbol,
      side: dto.side,
      type: dto.type,
      price,
      quantity: dto.quantity,
      status: 'accepted',
      createdAt: new Date().toISOString(),
    };

    this.orders.push(order);
    return order;
  }

  findAll(): Order[] {
    return this.orders;
  }
}
