import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class LlmService {
    private readonly httpService;
    private readonly configService;
    private readonly apiKey;
    private readonly apiUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    generateResponse(prompt: string): Promise<string>;
}
