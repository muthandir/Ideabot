import { Controller, Post, Body, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { IdeasService } from "./ideas.service";
import { IdeaDto } from "./dto/idea.dto";

@Controller("ideas")
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  saveIdea(@Body() ideaDto: IdeaDto) {
    this.ideasService.saveIdea(ideaDto.chatId);
    return { message: 'Idea saved successfully' };
  }

  @Get()
  getAllIdeas() {
    return this.ideasService.getAllIdeas();
  }
}
