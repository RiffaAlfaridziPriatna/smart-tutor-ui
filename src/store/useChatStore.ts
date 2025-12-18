import { create } from 'zustand';
import { Message } from '@/domain/entities/Message';

interface ChatState {
  messages: Message[];
  isThinking: boolean;
  inputValue: string;
  addMessage: (message: Message) => void;
  setInputValue: (value: string) => void;
  setIsThinking: (thinking: boolean) => void;
  clearMessages: () => void;
  setMessages: (messages: Message[]) => void;
}

const initialMessage = Message.createSystemMessage(
  "Hi! I'm Jojo, your AI tutor. How can I help you with this question?"
);

export const useChatStore = create<ChatState>((set) => ({
  messages: [initialMessage],
  isThinking: false,
  inputValue: '',
  addMessage: (message: Message) =>
    set((state: ChatState) => ({
      messages: [...state.messages, message],
    })),
  setInputValue: (value: string) => set({ inputValue: value }),
  setIsThinking: (thinking: boolean) => set({ isThinking: thinking }),
  clearMessages: () => set({ messages: [initialMessage] }),
  setMessages: (messages: Message[]) => set({ messages }),
}));

