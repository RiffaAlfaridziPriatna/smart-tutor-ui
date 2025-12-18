export class Difficulty {
  private constructor(private readonly value: string) {
    if (!['Easy', 'Medium', 'Hard'].includes(value)) {
      throw new Error(`Invalid difficulty: ${value}`);
    }
  }

  static Easy = new Difficulty('Easy');
  static Medium = new Difficulty('Medium');
  static Hard = new Difficulty('Hard');

  static fromString(value: string): Difficulty {
    return new Difficulty(value);
  }

  toString(): string {
    return this.value;
  }

  equals(other: Difficulty): boolean {
    return this.value === other.value;
  }

  getColorClass(): string {
    switch (this.value) {
      case 'Hard':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Easy':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}

