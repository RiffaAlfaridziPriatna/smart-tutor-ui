import { AnswerType } from "../value-objects/AnswerType";
import { Difficulty } from "../value-objects/Difficulty";

export class Question {
  constructor(
    public readonly id: string,
    public readonly topic: string,
    public readonly difficulty: Difficulty,
    public readonly rawText: string,
    public readonly answerType: AnswerType
  ) {}

  static create(data: QuestionData): Question {
    return new Question(
      data.id,
      data.topic,
      Difficulty.fromString(data.difficulty),
      data.raw_text,
      AnswerType.fromString(data.answer_type)
    );
  }
}

export interface QuestionData {
  id: string;
  topic: string;
  difficulty: string;
  raw_text: string;
  answer_type: string;
}

