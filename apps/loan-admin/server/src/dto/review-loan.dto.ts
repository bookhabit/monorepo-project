import { IsEnum, IsOptional, IsString } from 'class-validator';

export class ReviewLoanDto {
  @IsEnum(['approved', 'rejected'])
  status!: 'approved' | 'rejected';

  @IsOptional()
  @IsString()
  notes?: string;
}
