import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdeaDto {
  @ApiProperty({ description: 'The ID of the chat associated with the idea' }) // Description for the property
  @IsInt()
  @IsPositive()
  chatId: number;
}

export class IdeaResponseDto {
  @ApiProperty({ description: 'The unique identifier of the idea' }) // Description for the property
  id: number;

  @ApiProperty({ description: 'The content of the idea' }) // Description for the property
  content: string;

  @ApiProperty({ description: 'The ID of the chat associated with the idea' }) // Description for the property
  chatId: number;

  @ApiProperty({ description: 'The creation date of the idea' }) // Description for the property
  createdAt: string;

  @ApiProperty({ description: 'The last update date of the idea' }) // Description for the property
  updatedAt: string;
}
