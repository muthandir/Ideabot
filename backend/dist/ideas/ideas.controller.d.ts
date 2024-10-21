import { IdeasService } from "./ideas.service";
import { IdeaDto } from "./dto/idea.dto";
export declare class IdeasController {
    private readonly ideasService;
    constructor(ideasService: IdeasService);
    saveIdea(ideaDto: IdeaDto): {
        message: string;
    };
    getAllIdeas(): Promise<({
        chat: {
            id: number;
            createdAt: Date;
            content: string;
            sender: string;
        };
    } & {
        chatId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
