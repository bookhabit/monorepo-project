import { Injectable } from '@nestjs/common';

export interface OrderBookLevel {
  price: number;
  quantity: number;
  total: number;
}

export interface OrderBookData {
  symbol: string;
  timestamp: number;
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
}

@Injectable()
export class OrderbookService {
  private basePrice = 50_000;

  generate(): OrderBookData {
    this.basePrice += (Math.random() - 0.5) * 100;
    this.basePrice = Math.max(45_000, Math.min(55_000, this.basePrice));

    const bids: OrderBookLevel[] = [];
    const asks: OrderBookLevel[] = [];

    for (let i = 0; i < 10; i++) {
      const price = Math.floor(this.basePrice - (i + 1) * 50);
      const quantity = Math.floor(Math.random() * 1_000) + 100;
      bids.push({ price, quantity, total: price * quantity });
    }

    for (let i = 0; i < 10; i++) {
      const price = Math.floor(this.basePrice + (i + 1) * 50);
      const quantity = Math.floor(Math.random() * 1_000) + 100;
      asks.push({ price, quantity, total: price * quantity });
    }

    return { symbol: 'KOSPI200', timestamp: Date.now(), bids, asks };
  }
}
