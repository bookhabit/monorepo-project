import { IsString, IsOptional, MinLength, MaxLength, IsUrl } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @MinLength(2, { message: '팀 이름은 최소 2자 이상이어야 합니다.' })
  @MaxLength(30, { message: '팀 이름은 최대 30자입니다.' })
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(200, { message: '팀 소개는 최대 200자입니다.' })
  description?: string;

  @IsOptional()
  @IsUrl({}, { message: '올바른 URL 형식이 아닙니다.' })
  logoUrl?: string;
}
