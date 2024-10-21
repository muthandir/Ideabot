"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const llm_service_1 = require("../llm/llm.service");
let ChatService = class ChatService {
    constructor(prisma, llmService) {
        this.prisma = prisma;
        this.llmService = llmService;
    }
    async generateResponse(message) {
        await this.prisma.chatMessage.create({
            data: { content: message, sender: 'user' },
        });
        const prompt = `You are an AI assistant helping with idea brainstorming. 
    The user's message is: "${message}"
    Please provide a creative and helpful response to assist with brainstorming.`;
        let response;
        try {
            response = await this.llmService.generateResponse(prompt);
        }
        catch (error) {
            console.error('Error generating LLM response:', error);
            response = "I'm sorry, but I encountered an error while processing your request. Please try again later.";
        }
        await this.prisma.chatMessage.create({
            data: { content: response, sender: 'bot' },
        });
        return response;
    }
    async getChatHistory() {
        return this.prisma.chatMessage.findMany({
            orderBy: { createdAt: 'asc' },
        });
    }
    async resetChat() {
        await this.prisma.chatMessage.deleteMany();
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        llm_service_1.LlmService])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map