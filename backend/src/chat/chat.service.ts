import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LlmService } from "../llm/llm.service";

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService, private llmService: LlmService) {}

  async generateResponse(
    message: string
  ): Promise<{ response: string; chatId: number }> {
    // Store user message
    await this.prisma.chatMessage.create({
      data: { content: message, sender: "user" },
    });

    // Generate response using LLM service
    const prompt = `You are an AI assistant helping with idea brainstorming. 
    The user's message is: "${message}"
    Please provide a creative and helpful response to assist with brainstorming. Respond
    in a concise and non-verbose manner.`;

    let response: string;
    try {
      response = await this.llmService.generateResponse(prompt);
    } catch (error) {
      console.error("Error generating LLM response:", error);
      response =
        "I'm sorry, but I encountered an error while processing your request. Please try again later.";
    }

    // Store bot response and get the created message
    const botMessage = await this.prisma.chatMessage.create({
      data: { content: response, sender: "bot" },
    });

    return { response, chatId: botMessage.id };
  }

  async getChatHistory() {
    return this.prisma.chatMessage.findMany({
      orderBy: { createdAt: "asc" },
    });
  }

  async resetChat() {
    await this.prisma.chatMessage.deleteMany();
  }
}
