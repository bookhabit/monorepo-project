import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AgreementDto } from '../dto/agreement.dto';
import { InvestmentTypeDto } from '../dto/investment-type.dto';
import { PersonalInfoDto } from '../dto/personal-info.dto';

export class ApplyAccountDto {
  @ApiProperty({ type: () => PersonalInfoDto, description: '개인 정보' })
  @ValidateNested()
  @Type(() => PersonalInfoDto)
  personalInfo!: PersonalInfoDto;

  @ApiProperty({ type: () => AgreementDto, description: '약관 동의 정보' })
  @ValidateNested()
  @Type(() => AgreementDto)
  agreement!: AgreementDto;

  @ApiProperty({ type: () => InvestmentTypeDto, description: '투자 성향 정보' })
  @ValidateNested()
  @Type(() => InvestmentTypeDto)
  investmentType!: InvestmentTypeDto;
}
