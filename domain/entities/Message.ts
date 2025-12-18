export class Message {
  constructor(
    public readonly id: string,
    public readonly text: string,
    public readonly isUser: boolean,
    public readonly timestamp: number
  ) {}

  static create(text: string, isUser: boolean): Message {
    return new Message(
      `${Date.now()}-${Math.random()}`,
      text,
      isUser,
      Date.now()
    );
  }

  static createSystemMessage(text: string): Message {
    return new Message(
      'system-1',
      text,
      false,
      Date.now()
    );
  }
}

