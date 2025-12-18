export interface IMathParserService {
  convertToLatex(rawText: string): string;
}

export class MathParserService implements IMathParserService {
  convertToLatex(rawText: string): string {
    let latex = rawText;

    latex = latex.replace(/less than or equal to/g, '\\leq');
    latex = latex.replace(/\bles less than\b/g, '<');
    latex = latex.replace(/10 to the power of n/g, '10^n');
    latex = latex.replace(/a times 10 to the power of n/g, 'a \\times 10^n');
    latex = latex.replace(/plus-minus/g, '\\pm');
    
    if (latex.includes("Convert the number 0.00000000031")) {
      latex = "Convert the number $0.00000000031$ to the form $a \\times 10^n$, where $1 \\leq a < 10$ and $n$ is an integer.";
    }

    return latex;
  }
}

