import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LlmService {
  private readonly apiKey: string;
  private readonly apiUrl: string =
    'https://api.groq.com/openai/v1/chat/completions';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('GROQ_API_KEY');
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          this.apiUrl,
          {
            model: 'mixtral-8x7b-32768',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 150,
          },
          {
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error(
        'Error calling Groq API:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to generate response from LLM');
    }
  }
}
