import { IsString, IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: '종목 심볼', example: 'AAPL' })
  @IsString()
  symbol!: string;

  @ApiProperty({ enum: ['buy', 'sell'], description: '매수/매도 구분', example: 'buy' })
  @IsEnum(['buy', 'sell'])
  side!: 'buy' | 'sell';

  @ApiProperty({ enum: ['limit', 'market'], description: '주문 유형 (지정가/시장가)', example: 'limit' })
  @IsEnum(['limit', 'market'])
  type!: 'limit' | 'market';

  @ApiProperty({ required: false, description: '주문 가격 (지정가 주문 시 필수)', example: 150000 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiProperty({ description: '주문 수량', example: 10 })
  @IsNumber()
  @IsPositive()
  quantity!: number;
}
