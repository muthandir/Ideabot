import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { IdeaResponseDto } from "./dto/idea.dto";

@Injectable()
export class IdeasService {
  constructor(private prisma: PrismaService) {}

  async saveIdea(chatId: number) {
    return this.prisma.idea.create({
      data: {
        chatId,
      },
    });
  }

  async getAllIdeas(): Promise<IdeaResponseDto[]> {
    const ideas = await this.prisma.idea.findMany({
      select: {
        id: true,
        chatId: true,
        createdAt: true,
        updatedAt: true,
        chat: {
          select: {
            content: true, // Select the description from the chat entity
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Map the response to include the description from the chat entity
    return ideas.map((idea) => ({
      id: idea.id,
      chatId: idea.chatId,
      createdAt: idea.createdAt.toISOString(),
      updatedAt: idea.updatedAt.toISOString(),
      content: idea.chat.content, // Use the chat description as the idea description
    }));
  }

  async resetIdeas() {
    await this.prisma.idea.deleteMany();
  }
}
