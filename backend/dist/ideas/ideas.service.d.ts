import { PrismaService } from '../prisma/prisma.service';
export declare class IdeasService {
    private prisma;
    constructor(prisma: PrismaService);
    saveIdea(content: string): Promise<{
        content: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    getAllIdeas(): Promise<{
        content: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    resetIdeas(): Promise<void>;
}
