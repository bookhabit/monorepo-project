import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConsultationModule } from './consultation/consultation.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CustomerModule,
    ConsultationModule,
  ],
})
export class AppModule {}
