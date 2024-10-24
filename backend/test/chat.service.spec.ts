import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from '../src/chat/chat.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { LlmService } from '../src/llm/llm.service';

describe('ChatService', () => {
  let service: ChatService;
  let prismaService: PrismaService;
  let llmService: LlmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: PrismaService,
          useValue: {
            chatMessage: {
              create: jest.fn(),
              findMany: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
        {
          provide: LlmService,
          useValue: {
            generateResponse: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
    prismaService = module.get<PrismaService>(PrismaService);
    llmService = module.get<LlmService>(LlmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateResponse', () => {
    it('should store user message and return bot response', async () => {
      const message = 'Hello';
      const mockResponse = 'Hi there!';
      jest.spyOn(prismaService.chatMessage, 'create').mockResolvedValue({
        id: 1,
        content: message,
        sender: 'user',
        createdAt: new Date(), // Keep createdAt
        // Remove updatedAt
      });
      jest
        .spyOn(llmService, 'generateResponse')
        .mockResolvedValue(mockResponse);

      const result = await service.generateResponse(message);
      expect(result).toEqual({ response: mockResponse, chatId: 1 });
    });

    it('should handle errors when generating response', async () => {
      const message = 'Hello';
      jest.spyOn(prismaService.chatMessage, 'create').mockResolvedValue({
        id: 1,
        content: message,
        sender: 'user',
        createdAt: new Date(), // Keep createdAt
        // Remove updatedAt
      });
      jest
        .spyOn(llmService, 'generateResponse')
        .mockRejectedValue(new Error('LLM error'));

      const result = await service.generateResponse(message);
      expect(result.response).toContain(
        "I'm sorry, but I encountered an error",
      );
    });
  });

  describe('getChatHistory', () => {
    it('should return chat history', async () => {
      const mockHistory = [
        { id: 1, content: 'Hello', sender: 'user', createdAt: new Date() }, // Keep createdAt
      ];
      jest
        .spyOn(prismaService.chatMessage, 'findMany')
        .mockResolvedValue(mockHistory);

      const result = await service.getChatHistory();
      expect(result).toEqual(mockHistory);
    });
  });

  describe('resetChat', () => {
    it('should delete all chat messages', async () => {
      await service.resetChat();
      expect(prismaService.chatMessage.deleteMany).toHaveBeenCalled();
    });
  });
});
