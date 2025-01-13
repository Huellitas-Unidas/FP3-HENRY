export declare class ChatbotService {
    private readonly responses;
    getResponse(question: string): {
        question: string;
        answer: string;
    };
    getAllQuestions(): string[];
}
