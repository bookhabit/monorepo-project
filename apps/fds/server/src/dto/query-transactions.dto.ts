import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

export class QueryTransactionsDto {
  @ApiProperty({ required: false, enum: ['low', 'medium', 'high', 'critical'] })
  @IsOptional()
  @IsEnum(['low', 'medium', 'high', 'critical'])
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';

  @ApiProperty({ required: false, enum: ['normal', 'suspicious', 'blocked', 'reviewing'] })
  @IsOptional()
  @IsEnum(['normal', 'suspicious', 'blocked', 'reviewing'])
  status?: 'normal' | 'suspicious' | 'blocked' | 'reviewing';

  @ApiProperty({ required: false, enum: ['transfer', 'withdrawal', 'deposit', 'payment'] })
  @IsOptional()
  @IsEnum(['transfer', 'withdrawal', 'deposit', 'payment'])
  type?: 'transfer' | 'withdrawal' | 'deposit' | 'payment';

  @ApiProperty({ required: false, type: String, description: '최소 거래 금액 (숫자 문자열)' })
  @IsOptional()
  @IsNumberString()
  minAmount?: string;

  @ApiProperty({ required: false, type: String, description: '최대 거래 금액 (숫자 문자열)' })
  @IsOptional()
  @IsNumberString()
  maxAmount?: string;

  @ApiProperty({ required: false, type: String, description: '최소 위험 점수 (숫자 문자열)' })
  @IsOptional()
  @IsNumberString()
  minRiskScore?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false, description: '시작 날짜 (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ required: false, description: '종료 날짜 (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ required: false, type: String, description: '페이지 번호 (숫자 문자열)' })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiProperty({ required: false, type: String, description: '페이지 크기 (숫자 문자열)' })
  @IsOptional()
  @IsNumberString()
  pageSize?: string;
}
