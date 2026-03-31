import { IsString, Matches } from 'class-validator';

export class SendVerificationDto {
  @Matches(/^010-\d{4}-\d{4}$/, { message: '전화번호 형식: 010-0000-0000' })
  phoneNumber!: string;
}

export class VerifyCodeDto {
  @Matches(/^010-\d{4}-\d{4}$/, { message: '전화번호 형식: 010-0000-0000' })
  phoneNumber!: string;

  @IsString()
  code!: string;
}
