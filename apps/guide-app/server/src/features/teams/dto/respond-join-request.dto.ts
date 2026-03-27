import { IsEnum } from 'class-validator';

export class RespondJoinRequestDto {
  @IsEnum(['ACCEPTED', 'REJECTED'], {
    message: 'status는 ACCEPTED 또는 REJECTED이어야 합니다.',
  })
  status!: 'ACCEPTED' | 'REJECTED';
}
