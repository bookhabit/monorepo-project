import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryCustomersDto {
  @ApiProperty({ required: false, description: '고객 이름/이메일/ID 검색어' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false, enum: ['vip', 'gold', 'silver', 'bronze'], description: '고객 등급 필터' })
  @IsOptional()
  @IsEnum(['vip', 'gold', 'silver', 'bronze'])
  tier?: 'vip' | 'gold' | 'silver' | 'bronze';

  @ApiProperty({ required: false, enum: ['active', 'dormant', 'restricted'], description: '고객 상태 필터' })
  @IsOptional()
  @IsEnum(['active', 'dormant', 'restricted'])
  status?: 'active' | 'dormant' | 'restricted';
}
