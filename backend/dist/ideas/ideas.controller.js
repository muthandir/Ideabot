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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdeasController = void 0;
const common_1 = require("@nestjs/common");
const ideas_service_1 = require("./ideas.service");
const idea_dto_1 = require("./dto/idea.dto");
let IdeasController = class IdeasController {
    constructor(ideasService) {
        this.ideasService = ideasService;
    }
    saveIdea(ideaDto) {
        this.ideasService.saveIdea(ideaDto.chatId);
        return { message: 'Idea saved successfully' };
    }
    getAllIdeas() {
        return this.ideasService.getAllIdeas();
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [idea_dto_1.IdeaDto]),
    __metadata("design:returntype", void 0)
], IdeasController.prototype, "saveIdea", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IdeasController.prototype, "getAllIdeas", null);
IdeasController = __decorate([
    (0, common_1.Controller)("ideas"),
    __metadata("design:paramtypes", [ideas_service_1.IdeasService])
], IdeasController);
exports.IdeasController = IdeasController;
//# sourceMappingURL=ideas.controller.js.map