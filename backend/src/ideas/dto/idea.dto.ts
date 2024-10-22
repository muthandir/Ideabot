import { IsInt, IsPositive } from "class-validator";

export class IdeaDto {
  @IsInt()
  @IsPositive()
  chatId: number;
}

export class IdeaResponseDto {
  id: number;
  content: string;
  chatId: number;
  createdAt: string;
  updatedAt: string;
}
