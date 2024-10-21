import { IdeasService } from './ideas.service';
export declare class IdeasController {
    private readonly ideasService;
    constructor(ideasService: IdeasService);
    saveIdea(idea: string): {
        message: string;
    };
    getAllIdeas(): Promise<{
        content: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
}
