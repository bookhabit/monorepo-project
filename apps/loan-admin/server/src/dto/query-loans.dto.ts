import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

export class QueryLoansDto {
  @ApiProperty({ required: false, enum: ['pending', 'reviewing', 'approved', 'rejected'] })
  @IsOptional()
  @IsEnum(['pending', 'reviewing', 'approved', 'rejected'])
  status?: 'pending' | 'reviewing' | 'approved' | 'rejected';

  @ApiProperty({ required: false, enum: ['low', 'medium', 'high'] })
  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  riskLevel?: 'low' | 'medium' | 'high';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false, type: String, description: '최소 대출 금액 (숫자 문자열)' })
  @IsOptional()
  @IsNumberString()
  minAmount?: string;

  @ApiProperty({ required: false, type: String, description: '최대 대출 금액 (숫자 문자열)' })
  @IsOptional()
  @IsNumberString()
  maxAmount?: string;

  @ApiProperty({ required: false, type: String, description: '최소 신용점수 (숫자 문자열)' })
  @IsOptional()
  @IsNumberString()
  minCreditScore?: string;

  @ApiProperty({ required: false, type: String, description: '페이지 번호 (숫자 문자열)' })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiProperty({ required: false, type: String, description: '페이지 크기 (숫자 문자열)' })
  @IsOptional()
  @IsNumberString()
  pageSize?: string;
}
