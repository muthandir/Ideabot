import { PrismaService } from "../prisma/prisma.service";
export declare class IdeasService {
    private prisma;
    constructor(prisma: PrismaService);
    saveIdea(chatId: number): Promise<{
        id: number;
        chatId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllIdeas(): Promise<({
        chat: {
            id: number;
            createdAt: Date;
            content: string;
            sender: string;
        };
    } & {
        id: number;
        chatId: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    resetIdeas(): Promise<void>;
}
