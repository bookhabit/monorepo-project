import { BadRequestException, Injectable } from '@nestjs/common';

export interface AccountBalance {
  cash: number;
  stockQuantity: number;
}

@Injectable()
export class AccountService {
  private cash = 10_000_000;
  private stockQuantity = 0;

  getBalance(): AccountBalance {
    return { cash: this.cash, stockQuantity: this.stockQuantity };
  }

  executeBuy(price: number, quantity: number): void {
    const totalCost = price * quantity;
    if (this.cash < totalCost) {
      throw new BadRequestException('잔액이 부족합니다');
    }
    this.cash -= totalCost;
    this.stockQuantity += quantity;
  }

  executeSell(price: number, quantity: number): void {
    if (this.stockQuantity < quantity) {
      throw new BadRequestException('보유 수량이 부족합니다');
    }
    this.stockQuantity -= quantity;
    this.cash += price * quantity;
  }
}
