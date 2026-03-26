import { IsBoolean } from 'class-validator';

export class AgreementDto {
  @IsBoolean()
  allAgreed!: boolean;

  @IsBoolean()
  termsOfService!: boolean;

  @IsBoolean()
  privacyPolicy!: boolean;

  @IsBoolean()
  marketingOptIn!: boolean;
}
