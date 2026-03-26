import { IsString, MinLength, Matches, IsEmail } from 'class-validator';

export class PersonalInfoDto {
  @IsString()
  @MinLength(2, { message: '이름은 2자 이상이어야 합니다' })
  name!: string;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: '생년월일 형식: YYYY-MM-DD' })
  birthDate!: string;

  @Matches(/^010-\d{4}-\d{4}$/, { message: '전화번호 형식: 010-0000-0000' })
  phone!: string;

  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다' })
  email!: string;
}
