import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [AccountModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
