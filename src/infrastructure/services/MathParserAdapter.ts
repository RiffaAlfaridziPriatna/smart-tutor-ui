import { IMathParserService } from '@/domain/services/MathParserService';
import { MathParserService } from '@/domain/services/MathParserService';

export class MathParserAdapter {
  private parser: IMathParserService;

  constructor() {
    this.parser = new MathParserService();
  }

  convertToLatex(rawText: string): string {
    return this.parser.convertToLatex(rawText);
  }
}

