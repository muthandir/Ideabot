import {
  Controller,
  Post,
  Body,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IdeaDto } from './dto/idea.dto';

@Controller('ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async saveIdea(@Body() ideaDto: IdeaDto) {
    return this.ideasService.saveIdea(ideaDto.chatId);
  }

  @Get()
  getAllIdeas() {
    return this.ideasService.getAllIdeas();
  }

  @Post('reset')
  resetIdeas() {
    return this.ideasService.resetIdeas();
  }
}
