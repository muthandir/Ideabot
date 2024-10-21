import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

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

  async getAllIdeas() {
    return this.prisma.idea.findMany({
      include: {
        chat: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async resetIdeas() {
    await this.prisma.idea.deleteMany();
  }
}
