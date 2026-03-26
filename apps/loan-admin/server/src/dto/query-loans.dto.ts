import { IsEnum, IsOptional, IsNumberString } from 'class-validator';

export class QueryLoansDto {
  @IsOptional()
  @IsEnum(['pending', 'under-review', 'approved', 'rejected', 'cancelled'])
  status?: 'pending' | 'under-review' | 'approved' | 'rejected' | 'cancelled';

  @IsOptional()
  @IsEnum(['low', 'medium', 'high', 'critical'])
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  pageSize?: string;
}
