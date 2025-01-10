"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotQuestionDTO = void 0;
const openapi = require("@nestjs/swagger");
class ChatbotQuestionDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { question: { required: true, type: () => String } };
    }
}
exports.ChatbotQuestionDTO = ChatbotQuestionDTO;
//# sourceMappingURL=chatbot-question.dto.js.map