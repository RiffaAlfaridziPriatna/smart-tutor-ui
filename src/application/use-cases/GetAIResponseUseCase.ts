import { Message } from '@/domain/entities/Message';
import { IAIService, QuestionContext } from '../interfaces/IAIService';

export class GetAIResponseUseCase {
  constructor(private readonly aiService: IAIService) {}

  async getHint(questionContext: QuestionContext): Promise<Message> {
    const hint = await this.aiService.getHint(questionContext);
    return Message.create(hint, false);
  }

  async getSteps(questionContext: QuestionContext): Promise<Message> {
    const steps = await this.aiService.getSteps(questionContext);
    return Message.create(steps, false);
  }
}

