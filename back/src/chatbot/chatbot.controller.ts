import { Controller, Post, Body, Get, BadRequestException } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotQuestionDTO } from './dto/chatbot-question.dto';

@Controller('api/chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('interact')
  interact(@Body() chatbotQuestionDto: ChatbotQuestionDTO) {
    const { question } = chatbotQuestionDto;

    if (!question) {
      throw new BadRequestException('La pregunta es requerida');
    }

    return this.chatbotService.getResponse(question);
  }
  @Get('questions')
  getQuestions() {
    return this.chatbotService.getAllQuestions();
  }
}
