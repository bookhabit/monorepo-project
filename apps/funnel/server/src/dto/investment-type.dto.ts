import { IsEnum } from 'class-validator';

export class InvestmentTypeDto {
  @IsEnum(['conservative', 'moderate', 'aggressive'])
  type!: 'conservative' | 'moderate' | 'aggressive';

  @IsEnum(['none', 'beginner', 'intermediate', 'expert'])
  experience!: 'none' | 'beginner' | 'intermediate' | 'expert';
}
