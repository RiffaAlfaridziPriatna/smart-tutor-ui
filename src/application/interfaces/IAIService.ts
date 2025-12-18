export interface IAIService {
  getHint(questionContext: QuestionContext): Promise<string>;
  getSteps(questionContext: QuestionContext): Promise<string>;
  getResponse(message: string, questionContext: QuestionContext, chatHistory: ChatMessage[]): Promise<string>;
}

export interface QuestionContext {
  id: string;
  topic: string;
  difficulty: string;
  rawText: string;
}

export interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: number;
}

