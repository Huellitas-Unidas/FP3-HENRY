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
exports.ChatbotController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const chatbot_service_1 = require("./chatbot.service");
const chatbot_question_dto_1 = require("./dto/chatbot-question.dto");
let ChatbotController = class ChatbotController {
    constructor(chatbotService) {
        this.chatbotService = chatbotService;
    }
    interact(chatbotQuestionDto) {
        const { question } = chatbotQuestionDto;
        if (!question) {
            throw new common_1.BadRequestException('La pregunta es requerida');
        }
        return this.chatbotService.getResponse(question);
    }
    getQuestions() {
        return this.chatbotService.getAllQuestions();
    }
};
exports.ChatbotController = ChatbotController;
__decorate([
    (0, common_1.Post)('interact'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatbot_question_dto_1.ChatbotQuestionDTO]),
    __metadata("design:returntype", void 0)
], ChatbotController.prototype, "interact", null);
__decorate([
    (0, common_1.Get)('questions'),
    openapi.ApiResponse({ status: 200, type: [String] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatbotController.prototype, "getQuestions", null);
exports.ChatbotController = ChatbotController = __decorate([
    (0, common_1.Controller)('api/chatbot'),
    __metadata("design:paramtypes", [chatbot_service_1.ChatbotService])
], ChatbotController);
//# sourceMappingURL=chatbot.controller.js.map