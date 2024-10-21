import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IdeasService {
  constructor(private prisma: PrismaService) {}

  async saveIdea(content: string) {
    return this.prisma.idea.create({
      data: { content },
    });
  }

  async getAllIdeas() {
    return this.prisma.idea.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async resetIdeas() {
    await this.prisma.idea.deleteMany();
  }
}
