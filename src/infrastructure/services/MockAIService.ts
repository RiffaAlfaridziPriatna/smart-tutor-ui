import { IAIService, QuestionContext, ChatMessage } from '@/src/application/interfaces/IAIService';
import { aiResponses } from '@/shared/data/mockData';

export class MockAIService implements IAIService {
  async getHint(questionContext: QuestionContext): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return aiResponses.hint;
  }

  async getSteps(questionContext: QuestionContext): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return aiResponses.steps;
  }

  async getResponse(
    message: string,
    questionContext: QuestionContext,
    chatHistory: ChatMessage[]
  ): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    return `I understand you're asking about "${message}". Here's a helpful approach: ${aiResponses.hint}`;
  }
}

