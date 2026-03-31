import { Module } from '@nestjs/common';
import { TransactionController, UserController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  controllers: [TransactionController, UserController],
  providers: [TransactionService],
})
export class TransactionModule {}
