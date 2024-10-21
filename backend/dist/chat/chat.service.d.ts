import { PrismaService } from '../prisma/prisma.service';
import { LlmService } from '../llm/llm.service';
export declare class ChatService {
    private prisma;
    private llmService;
    constructor(prisma: PrismaService, llmService: LlmService);
    generateResponse(message: string): Promise<string>;
    getChatHistory(): Promise<{
        id: number;
        createdAt: Date;
        content: string;
        sender: string;
    }[]>;
    resetChat(): Promise<void>;
}
