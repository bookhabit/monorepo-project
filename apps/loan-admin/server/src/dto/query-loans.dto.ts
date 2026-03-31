import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

export class QueryLoansDto {
  @IsOptional()
  @IsEnum(['pending', 'reviewing', 'approved', 'rejected'])
  status?: 'pending' | 'reviewing' | 'approved' | 'rejected';

  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  riskLevel?: 'low' | 'medium' | 'high';

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumberString()
  minAmount?: string;

  @IsOptional()
  @IsNumberString()
  maxAmount?: string;

  @IsOptional()
  @IsNumberString()
  minCreditScore?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  pageSize?: string;
}
