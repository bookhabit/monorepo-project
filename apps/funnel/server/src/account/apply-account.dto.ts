import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { AgreementDto } from '../dto/agreement.dto';
import { InvestmentTypeDto } from '../dto/investment-type.dto';
import { PersonalInfoDto } from '../dto/personal-info.dto';

export class ApplyAccountDto {
  @ValidateNested()
  @Type(() => PersonalInfoDto)
  personalInfo!: PersonalInfoDto;

  @ValidateNested()
  @Type(() => AgreementDto)
  agreement!: AgreementDto;

  @ValidateNested()
  @Type(() => InvestmentTypeDto)
  investmentType!: InvestmentTypeDto;
}
