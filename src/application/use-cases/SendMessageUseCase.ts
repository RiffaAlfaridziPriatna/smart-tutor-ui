import { Message } from '@/domain/entities/Message';
import { IAIService, QuestionContext, ChatMessage } from '../interfaces/IAIService';

export class SendMessageUseCase {
  constructor(private readonly aiService: IAIService) {}

  async execute(
    userMessage: string,
    questionContext: QuestionContext,
    chatHistory: ChatMessage[]
  ): Promise<Message> {
    const response = await this.aiService.getResponse(
      userMessage,
      questionContext,
      chatHistory
    );
    return Message.create(response, false);
  }
}

