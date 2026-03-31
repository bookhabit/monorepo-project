import { IsArray, IsString } from 'class-validator';

export class BatchActionDto {
  @IsArray()
  @IsString({ each: true })
  ids!: string[];
}
