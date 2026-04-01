import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AgreementDto {
  @ApiProperty({ description: '전체 동의 여부', example: true })
  @IsBoolean()
  allAgreed!: boolean;

  @ApiProperty({ description: '서비스 이용약관 동의 (필수)', example: true })
  @IsBoolean()
  termsOfService!: boolean;

  @ApiProperty({ description: '개인정보 처리방침 동의 (필수)', example: true })
  @IsBoolean()
  privacyPolicy!: boolean;

  @ApiProperty({ description: '마케팅 수신 동의 (선택)', example: false })
  @IsBoolean()
  marketingOptIn!: boolean;
}
