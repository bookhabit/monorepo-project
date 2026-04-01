import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class ReviewLoanDto {
  @ApiProperty({ enum: ['approved', 'rejected'] })
  @IsEnum(['approved', 'rejected'])
  status!: 'approved' | 'rejected';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
