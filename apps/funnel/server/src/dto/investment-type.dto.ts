import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InvestmentTypeDto {
  @ApiProperty({ enum: ['conservative', 'moderate', 'aggressive'], description: '투자 성향', example: 'moderate' })
  @IsEnum(['conservative', 'moderate', 'aggressive'])
  type!: 'conservative' | 'moderate' | 'aggressive';

  @ApiProperty({ enum: ['none', 'beginner', 'intermediate', 'expert'], description: '투자 경험', example: 'beginner' })
  @IsEnum(['none', 'beginner', 'intermediate', 'expert'])
  experience!: 'none' | 'beginner' | 'intermediate' | 'expert';
}
