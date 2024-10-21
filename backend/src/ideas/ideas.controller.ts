import { Controller, Post, Body, Get } from '@nestjs/common';
import { IdeasService } from './ideas.service';

@Controller('ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Post()
  saveIdea(@Body('idea') idea: string) {
    this.ideasService.saveIdea(idea);
    return { message: 'Idea saved successfully' };
  }

  @Get()
  getAllIdeas() {
    return this.ideasService.getAllIdeas();
  }
}
