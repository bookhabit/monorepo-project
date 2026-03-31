import { IsEnum, IsOptional, IsString } from 'class-validator';

export class QueryCustomersDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(['vip', 'gold', 'silver', 'bronze'])
  tier?: 'vip' | 'gold' | 'silver' | 'bronze';

  @IsOptional()
  @IsEnum(['active', 'dormant', 'restricted'])
  status?: 'active' | 'dormant' | 'restricted';
}
