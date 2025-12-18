import { Question } from '@/domain/entities/Question';

export interface IQuestionRepository {
  getQuestionById(id: string): Promise<Question | null>;
  getCurrentQuestion(): Promise<Question>;
}

