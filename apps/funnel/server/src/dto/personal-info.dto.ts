import { IsString, MinLength, Matches, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PersonalInfoDto {
  @ApiProperty({ description: '이름 (2자 이상)', example: '홍길동' })
  @IsString()
  @MinLength(2, { message: '이름은 2자 이상이어야 합니다' })
  name!: string;

  @ApiProperty({ description: '생년월일 (YYYY-MM-DD)', example: '1990-01-01' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: '생년월일 형식: YYYY-MM-DD' })
  birthDate!: string;

  @ApiProperty({ description: '전화번호 (010-0000-0000)', example: '010-1234-5678' })
  @Matches(/^010-\d{4}-\d{4}$/, { message: '전화번호 형식: 010-0000-0000' })
  phone!: string;

  @ApiProperty({ description: '이메일 주소', example: 'hong@example.com' })
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다' })
  email!: string;
}
