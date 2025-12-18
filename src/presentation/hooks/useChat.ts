'use client';

import { useChatStore } from '@/src/store/useChatStore';
import { container } from '@/src/presentation/di/container';
import { Message } from '@/domain/entities/Message';
import { QuestionContext } from '@/src/application/interfaces/IAIService';

export function useChat(questionContext: QuestionContext | null) {
  const {
    messages,
    isThinking,
    inputValue,
    addMessage,
    setInputValue,
    setIsThinking,
  } = useChatStore();

  const sendMessage = async (userMessage: string) => {
    if (!questionContext) return;

    const userMsg = Message.create(userMessage, true);
    addMessage(userMsg);
    setInputValue('');
    setIsThinking(true);

    try {
      const sendMessageUseCase = container.getSendMessageUseCase();
      const chatHistory = messages.map((msg) => ({
        text: msg.text,
        isUser: msg.isUser,
        timestamp: msg.timestamp,
      }));

      const aiMessage = await sendMessageUseCase.execute(
        userMessage,
        questionContext,
        chatHistory
      );
      addMessage(aiMessage);
    } catch (error) {
      const errorMessage = Message.create(
        'Sorry, I encountered an error. Please try again.',
        false
      );
      addMessage(errorMessage);
    } finally {
      setIsThinking(false);
    }
  };

  const getHint = async () => {
    if (!questionContext) return;

    const userMsg = Message.create('Give me a hint', true);
    addMessage(userMsg);
    setIsThinking(true);

    try {
      const getAIResponseUseCase = container.getGetAIResponseUseCase();
      const hintMessage = await getAIResponseUseCase.getHint(questionContext);
      addMessage(hintMessage);
    } catch (error) {
      const errorMessage = Message.create(
        'Sorry, I encountered an error. Please try again.',
        false
      );
      addMessage(errorMessage);
    } finally {
      setIsThinking(false);
    }
  };

  const getSteps = async () => {
    if (!questionContext) return;

    const userMsg = Message.create('Reveal the steps', true);
    addMessage(userMsg);
    setIsThinking(true);

    try {
      const getAIResponseUseCase = container.getGetAIResponseUseCase();
      const stepsMessage = await getAIResponseUseCase.getSteps(questionContext);
      addMessage(stepsMessage);
    } catch (error) {
      const errorMessage = Message.create(
        'Sorry, I encountered an error. Please try again.',
        false
      );
      addMessage(errorMessage);
    } finally {
      setIsThinking(false);
    }
  };

  return {
    messages,
    isThinking,
    inputValue,
    setInputValue,
    sendMessage,
    getHint,
    getSteps,
  };
}

