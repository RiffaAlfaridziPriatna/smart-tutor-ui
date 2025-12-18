'use client';

import { Message } from '@/domain/entities/Message';
import ThinkingIndicator from '../atoms/ThinkingIndicator';

export interface MessageBubbleProps {
  message: Message;
  isThinking?: boolean;
}

export default function MessageBubble({
  message,
  isThinking = false,
}: MessageBubbleProps) {
  if (isThinking) {
    return (
      <div className="flex justify-start mb-4">
        <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-[80%]">
          <p className="text-sm text-gray-600">
            <ThinkingIndicator />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex mb-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`rounded-2xl px-4 py-3 max-w-[80%] ${
          message.isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
}

