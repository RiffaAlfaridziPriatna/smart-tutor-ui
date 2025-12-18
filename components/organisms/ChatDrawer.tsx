'use client';

import { Question } from '@/domain/entities/Question';
import { useChat } from '@/src/presentation/hooks/useChat';
import { useEffect, useRef } from 'react';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import ChatInput from '../molecules/ChatInput';
import MessageBubble from '../molecules/MessageBubble';
import QuickActionButton from '../molecules/QuickActionButton';

export interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
  question: Question | null;
}

export default function ChatDrawer({
  isOpen,
  onClose,
  isMobile,
  question,
}: ChatDrawerProps) {
  const {
    messages,
    isThinking,
    inputValue,
    setInputValue,
    sendMessage,
    getHint,
    getSteps,
  } = useChat(
    question
      ? {
          id: question.id,
          topic: question.topic,
          difficulty: question.difficulty.toString(),
          rawText: question.rawText,
        }
      : null
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isThinking]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    await sendMessage(inputValue.trim());
  };

  return (
    <div
      className={`${
        isMobile
          ? 'w-full h-full bg-white flex flex-col rounded-t-3xl shadow-2xl'
          : 'flex flex-col h-full'
      }`}
    >
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <h3 className="text-lg font-semibold text-gray-900">Ask Jojo</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
            aria-label="Close chat"
          >
            <Icon name="close" size={24} />
          </Button>
        </div>
      )}

      <div
        className="flex-1 overflow-y-auto chat-container p-4"
        ref={chatContainerRef}
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isThinking && (
          <MessageBubble
            message={{
              id: 'thinking',
              text: '',
              isUser: false,
              timestamp: Date.now(),
            }}
            isThinking={true}
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-300 bg-white p-4">
        <div className="flex gap-2 mb-3">
          <QuickActionButton
            type="hint"
            onClick={getHint}
            disabled={isThinking}
          />
          <QuickActionButton
            type="steps"
            onClick={getSteps}
            disabled={isThinking}
          />
        </div>
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          disabled={isThinking}
        />
      </div>
    </div>
  );
}

