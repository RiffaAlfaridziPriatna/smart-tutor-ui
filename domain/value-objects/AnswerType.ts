export class AnswerType {
  private constructor(private readonly value: string) {}

  static TextInput = new AnswerType('text_input');
  static MultipleChoice = new AnswerType('multiple_choice');
  static Number = new AnswerType('number');

  static fromString(value: string): AnswerType {
    switch (value) {
      case 'text_input':
        return AnswerType.TextInput;
      case 'multiple_choice':
        return AnswerType.MultipleChoice;
      case 'number':
        return AnswerType.Number;
      default:
        return new AnswerType(value);
    }
  }

  toString(): string {
    return this.value;
  }

  equals(other: AnswerType): boolean {
    return this.value === other.value;
  }
}

