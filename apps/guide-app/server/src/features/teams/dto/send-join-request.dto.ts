import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SendJoinRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: '가입 메시지는 최대 100자입니다.' })
  message?: string;
}
