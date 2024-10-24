import { Test, TestingModule } from '@nestjs/testing';
import { LlmService } from '../src/llm/llm.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of, throwError } from 'rxjs';
import { AxiosResponse, AxiosHeaders } from 'axios';

describe('LlmService', () => {
  let service: LlmService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LlmService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test-api-key'),
          },
        },
      ],
    }).compile();

    service = module.get<LlmService>(LlmService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateResponse', () => {
    it('should return a response from the LLM', async () => {
      const prompt = 'Test prompt';
      const mockResponse: AxiosResponse = {
        data: {
          choices: [{ message: { content: 'Test response' } }],
        },
        status: 200,
        statusText: 'OK',
        headers: new AxiosHeaders({ 'Content-Type': 'application/json' }), // Use AxiosHeaders
        config: {
          headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
        }, // Use AxiosHeaders
      };

      jest.spyOn(httpService, 'post').mockReturnValue(of(mockResponse));

      const response = await service.generateResponse(prompt);
      expect(response).toBe('Test response');
    });

    it('should throw an error if the API call fails', async () => {
      const prompt = 'Test prompt';
      jest
        .spyOn(httpService, 'post')
        .mockReturnValue(throwError(() => new Error('API error')));

      await expect(service.generateResponse(prompt)).rejects.toThrow(
        'Failed to generate response from LLM',
      );
    });
  });
});
