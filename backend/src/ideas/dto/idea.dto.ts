import { IsInt, IsPositive } from 'class-validator';

export class IdeaDto {
  @IsInt()
  @IsPositive()
  chatId: number;
}