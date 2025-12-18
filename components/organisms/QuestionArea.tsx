'use client';

import { Question } from '@/domain/entities/Question';
import { container } from '@/src/presentation/di/container';
import { useUIStore } from '@/src/store/useUIStore';
import Badge from '../atoms/Badge';
import FormField from '../molecules/FormField';
import MathRenderer from '../molecules/MathRenderer';

export interface QuestionAreaProps {
  question: Question;
}

const difficultyVariantMap = {
  Hard: 'danger' as const,
  Medium: 'warning' as const,
  Easy: 'success' as const,
};

export default function QuestionArea({ question }: QuestionAreaProps) {
  const { answer, setAnswer } = useUIStore();
  const mathParser = container.getMathParser();
  const latexContent = mathParser.convertToLatex(question.rawText);

  return (
    // <div className="flex flex-col h-full bg-white p-6 md:p-8">
    <div className="flex flex-col h-full bg-white">
      <div className="flex flex-col flex-1 p-6 md:p-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="info">{question.topic}</Badge>
            <Badge
              variant={
                difficultyVariantMap[question.difficulty.toString() as keyof typeof difficultyVariantMap] ||
                'default'
              }
            >
              {question.difficulty.toString()}
            </Badge>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Question</h2>
        </div>

        <div className="flex-1 mb-6">
          <div className="prose prose-lg max-w-none">
            <MathRenderer content={latexContent} />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 p-4 pt-4 md:pt-8">
        <FormField
          label="Your Answer"
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your answer here..."
        />
      </div>
    </div>
  );
}

