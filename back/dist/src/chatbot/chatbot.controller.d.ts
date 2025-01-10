import { ChatbotService } from './chatbot.service';
import { ChatbotQuestionDTO } from './dto/chatbot-question.dto';
export declare class ChatbotController {
    private readonly chatbotService;
    constructor(chatbotService: ChatbotService);
    interact(chatbotQuestionDto: ChatbotQuestionDTO): {
        question: string;
        answer: string;
    };
    getQuestions(): string[];
}
