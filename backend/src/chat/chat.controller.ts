import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('Chat') // Grouping the endpoints under "Chat"
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post()
  @UseGuards(ThrottlerGuard)
  @ApiOperation({ summary: 'Generate a chat response' }) // Summary for the endpoint
  @ApiResponse({
    status: 200,
    description: 'Chat response generated successfully.',
  }) // Successful response
  @ApiResponse({ status: 400, description: 'Bad Request.' }) // Error response
  async chat(@Body('message') message: string) {
    return this.chatService.generateResponse(message);
  }
}
