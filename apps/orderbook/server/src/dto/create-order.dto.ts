import { IsString, IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  symbol!: string;

  @IsEnum(['buy', 'sell'])
  side!: 'buy' | 'sell';

  @IsEnum(['limit', 'market'])
  type!: 'limit' | 'market';

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsNumber()
  @IsPositive()
  quantity!: number;
}
