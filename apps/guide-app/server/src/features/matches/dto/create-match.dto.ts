import { IsDateString, IsString, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateMatchDto {
  @IsDateString({}, { message: '올바른 날짜 형식이 아닙니다.' })
  matchDate!: string;

  @IsString()
  @MinLength(2, { message: '장소는 최소 2자 이상이어야 합니다.' })
  @MaxLength(100, { message: '장소는 최대 100자입니다.' })
  location!: string;

  @IsOptional()
  @IsString()
  @MaxLength(200, { message: '메모는 최대 200자입니다.' })
  note?: string;
}
