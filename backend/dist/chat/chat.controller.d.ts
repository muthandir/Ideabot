import { ChatService } from "./chat.service";
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    chat(message: string): Promise<{
        response: string;
        chatId: number;
    }>;
}
