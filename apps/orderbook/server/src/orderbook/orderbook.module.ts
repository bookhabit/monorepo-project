import { Module } from '@nestjs/common';
import { OrderbookGateway } from './orderbook.gateway';
import { OrderbookService } from './orderbook.service';

@Module({
  providers: [OrderbookGateway, OrderbookService],
})
export class OrderbookModule {}
