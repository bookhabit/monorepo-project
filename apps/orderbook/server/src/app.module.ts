import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { OrderModule } from './order/order.module';
import { OrderbookModule } from './orderbook/orderbook.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AccountModule,
    OrderModule,
    OrderbookModule,
  ],
})
export class AppModule {}
