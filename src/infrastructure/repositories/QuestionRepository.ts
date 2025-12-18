import { Question } from '@/domain/entities/Question';
import { IQuestionRepository } from '@/src/application/interfaces/IQuestionRepository';
import { questionData } from '@/shared/data/mockData';

export class QuestionRepository implements IQuestionRepository {
  private questions: Map<string, Question> = new Map();

  constructor() {
    const question = Question.create(questionData);
    this.questions.set(question.id, question);
  }

  async getQuestionById(id: string): Promise<Question | null> {
    return this.questions.get(id) || null;
  }

  async getCurrentQuestion(): Promise<Question> {
    const question = this.questions.get(questionData.id);
    if (!question) {
      throw new Error('No question available');
    }
    return question;
  }
}

