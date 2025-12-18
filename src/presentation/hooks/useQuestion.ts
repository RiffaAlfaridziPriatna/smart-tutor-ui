'use client';

import { useEffect, useState } from 'react';
import { Question } from '@/domain/entities/Question';
import { container } from '@/src/presentation/di/container';

export function useQuestion(questionId?: string) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestion = async () => {
      try {
        setLoading(true);
        const getQuestionUseCase = container.getGetQuestionUseCase();
        const questionData = await getQuestionUseCase.execute(questionId);
        setQuestion(questionData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load question');
      } finally {
        setLoading(false);
      }
    };

    loadQuestion();
  }, [questionId]);

  return { question, loading, error };
}

