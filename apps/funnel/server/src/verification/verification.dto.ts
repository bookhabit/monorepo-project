import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendVerificationDto {
  @ApiProperty({ description: '전화번호 (010-0000-0000)', example: '010-1234-5678' })
  @Matches(/^010-\d{4}-\d{4}$/, { message: '전화번호 형식: 010-0000-0000' })
  phoneNumber!: string;
}

export class VerifyCodeDto {
  @ApiProperty({ description: '전화번호 (010-0000-0000)', example: '010-1234-5678' })
  @Matches(/^010-\d{4}-\d{4}$/, { message: '전화번호 형식: 010-0000-0000' })
  phoneNumber!: string;

  @ApiProperty({ description: '인증 코드 (6자리)', example: '123456' })
  @IsString()
  code!: string;
}
