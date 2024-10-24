import { Test, TestingModule } from '@nestjs/testing';
import { IdeasService } from '../src/ideas/ideas.service';
import { PrismaService } from '../src/prisma/prisma.service';

describe('IdeasService', () => {
  let service: IdeasService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IdeasService,
        {
          provide: PrismaService,
          useValue: {
            idea: {
              create: jest.fn(),
              findMany: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<IdeasService>(IdeasService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('saveIdea', () => {
    it('should save an idea', async () => {
      const chatId = 1;
      jest.spyOn(prismaService.idea, 'create').mockResolvedValue({
        id: 1,
        chatId,
        createdAt: new Date(), // Keep createdAt
        updatedAt: new Date(), // Add updatedAt
      });

      const result = await service.saveIdea(chatId);
      expect(result).toEqual({
        id: 1,
        chatId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe('getAllIdeas', () => {
    it('should return all ideas', async () => {
      const mockIdeas = [
        {
          id: 1,
          chatId: 1,
          createdAt: new Date(),
          updatedAt: new Date(), // Add updatedAt
          chat: { content: 'Idea 1' },
        },
      ];
      jest.spyOn(prismaService.idea, 'findMany').mockResolvedValue(mockIdeas);

      const result = await service.getAllIdeas();
      expect(result).toEqual([
        {
          id: 1,
          chatId: 1,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          content: 'Idea 1',
        },
      ]);
    });
  });

  describe('resetIdeas', () => {
    it('should delete all ideas', async () => {
      await service.resetIdeas();
      expect(prismaService.idea.deleteMany).toHaveBeenCalled();
    });
  });
});
