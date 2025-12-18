import { Question } from '@/domain/entities/Question';
import { IQuestionRepository } from '../interfaces/IQuestionRepository';

export class GetQuestionUseCase {
  constructor(private readonly questionRepository: IQuestionRepository) {}

  async execute(questionId?: string): Promise<Question> {
    if (questionId) {
      const question = await this.questionRepository.getQuestionById(questionId);
      if (!question) {
        throw new Error(`Question with id ${questionId} not found`);
      }
      return question;
    }
    return await this.questionRepository.getCurrentQuestion();
  }
}

