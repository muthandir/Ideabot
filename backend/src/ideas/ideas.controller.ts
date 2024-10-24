import {
  Controller,
  Post,
  Body,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IdeaDto, IdeaResponseDto } from './dto/idea.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Ideas') // Grouping the endpoints under "Ideas"
@Controller('ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Save an idea' }) // Summary for the endpoint
  @ApiResponse({
    status: 201,
    description: 'The idea has been successfully created.',
    type: IdeaResponseDto,
  }) // Successful response
  @ApiResponse({ status: 400, description: 'Bad Request.' }) // Error response
  async saveIdea(@Body() ideaDto: IdeaDto) {
    return this.ideasService.saveIdea(ideaDto.chatId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all ideas' }) // Summary for the endpoint
  @ApiResponse({
    status: 200,
    description: 'List of ideas.',
    type: [IdeaResponseDto],
  }) // Successful response
  getAllIdeas() {
    return this.ideasService.getAllIdeas();
  }

  @Post('reset')
  @ApiOperation({ summary: 'Reset all ideas' }) // Summary for the endpoint
  @ApiResponse({ status: 200, description: 'All ideas have been reset.' }) // Successful response
  resetIdeas() {
    return this.ideasService.resetIdeas();
  }
}
