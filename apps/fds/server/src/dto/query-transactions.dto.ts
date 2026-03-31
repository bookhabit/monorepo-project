import { IsDateString, IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

export class QueryTransactionsDto {
  @IsOptional()
  @IsEnum(['low', 'medium', 'high', 'critical'])
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';

  @IsOptional()
  @IsEnum(['normal', 'suspicious', 'blocked', 'reviewing'])
  status?: 'normal' | 'suspicious' | 'blocked' | 'reviewing';

  @IsOptional()
  @IsEnum(['transfer', 'withdrawal', 'deposit', 'payment'])
  type?: 'transfer' | 'withdrawal' | 'deposit' | 'payment';

  @IsOptional()
  @IsNumberString()
  minAmount?: string;

  @IsOptional()
  @IsNumberString()
  maxAmount?: string;

  @IsOptional()
  @IsNumberString()
  minRiskScore?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  pageSize?: string;
}
