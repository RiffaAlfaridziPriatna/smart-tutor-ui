import { IQuestionRepository } from '@/src/application/interfaces/IQuestionRepository';
import { IAIService } from '@/src/application/interfaces/IAIService';
import { QuestionRepository } from '@/src/infrastructure/repositories/QuestionRepository';
import { MockAIService } from '@/src/infrastructure/services/MockAIService';
import { MathParserAdapter } from '@/src/infrastructure/services/MathParserAdapter';
import { GetQuestionUseCase } from '@/src/application/use-cases/GetQuestionUseCase';
import { SendMessageUseCase } from '@/src/application/use-cases/SendMessageUseCase';
import { GetAIResponseUseCase } from '@/src/application/use-cases/GetAIResponseUseCase';

class DIContainer {
  private questionRepository: IQuestionRepository;
  private aiService: IAIService;
  private mathParser: MathParserAdapter;

  private getQuestionUseCase: GetQuestionUseCase;
  private sendMessageUseCase: SendMessageUseCase;
  private getAIResponseUseCase: GetAIResponseUseCase;

  constructor() {
    this.questionRepository = new QuestionRepository();
    this.aiService = new MockAIService();
    this.mathParser = new MathParserAdapter();

    this.getQuestionUseCase = new GetQuestionUseCase(this.questionRepository);
    this.sendMessageUseCase = new SendMessageUseCase(this.aiService);
    this.getAIResponseUseCase = new GetAIResponseUseCase(this.aiService);
  }

  getGetQuestionUseCase(): GetQuestionUseCase {
    return this.getQuestionUseCase;
  }

  getSendMessageUseCase(): SendMessageUseCase {
    return this.sendMessageUseCase;
  }

  getGetAIResponseUseCase(): GetAIResponseUseCase {
    return this.getAIResponseUseCase;
  }

  getMathParser(): MathParserAdapter {
    return this.mathParser;
  }
}

export const container = new DIContainer();

