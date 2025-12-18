'use client';

import { KeyboardEvent } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  placeholder = 'Type your question...',
  disabled = false,
}: ChatInputProps) {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
      }
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1"
      />
      <Button
        onClick={onSend}
        disabled={!value.trim() || disabled}
        size="md"
        className="px-6 flex items-center"
      >
        <Icon name="send" size={20} className="mr-1" />
        <span>Send</span>
      </Button>
    </div>
  );
}

