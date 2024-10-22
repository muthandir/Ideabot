import { PrismaService } from "../prisma/prisma.service";
import { LlmService } from "../llm/llm.service";
export declare class ChatService {
    private prisma;
    private llmService;
    constructor(prisma: PrismaService, llmService: LlmService);
    generateResponse(message: string): Promise<{
        response: string;
        chatId: number;
    }>;
    getChatHistory(): Promise<{
        id: number;
        content: string;
        sender: string;
        createdAt: Date;
    }[]>;
    resetChat(): Promise<void>;
}
