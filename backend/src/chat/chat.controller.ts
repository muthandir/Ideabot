import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ThrottlerGuard } from "@nestjs/throttler";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post()
  @UseGuards(ThrottlerGuard)
  async chat(@Body("message") message: string) {
    return this.chatService.generateResponse(message);
  }
}
