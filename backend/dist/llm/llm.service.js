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
exports.LlmService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let LlmService = class LlmService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
        this.apiKey = this.configService.get('GROQ_API_KEY');
    }
    async generateResponse(prompt) {
        var _a;
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(this.apiUrl, {
                model: 'mixtral-8x7b-32768',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
                max_tokens: 150,
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
            }));
            return response.data.choices[0].message.content.trim();
        }
        catch (error) {
            console.error('Error calling Groq API:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            throw new Error('Failed to generate response from LLM');
        }
    }
};
LlmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], LlmService);
exports.LlmService = LlmService;
//# sourceMappingURL=llm.service.js.map