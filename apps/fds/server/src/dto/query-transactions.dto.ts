import { IsEnum, IsOptional, IsNumberString, IsDateString } from 'class-validator';

export class QueryTransactionsDto {
  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  riskLevel?: 'low' | 'medium' | 'high';

  @IsOptional()
  @IsEnum(['normal', 'suspicious', 'blocked', 'cleared'])
  status?: 'normal' | 'suspicious' | 'blocked' | 'cleared';

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
