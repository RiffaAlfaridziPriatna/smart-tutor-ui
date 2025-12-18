import { create } from 'zustand';

interface UIState {
  isChatOpen: boolean;
  isMobile: boolean;
  answer: string;
  setIsChatOpen: (open: boolean) => void;
  toggleChat: () => void;
  setIsMobile: (mobile: boolean) => void;
  setAnswer: (answer: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isChatOpen: false,
  isMobile: false,
  answer: '',
  setIsChatOpen: (open: boolean) => set({ isChatOpen: open }),
  toggleChat: () => set((state: UIState) => ({ isChatOpen: !state.isChatOpen })),
  setIsMobile: (mobile: boolean) => set({ isMobile: mobile }),
  setAnswer: (answer: string) => set({ answer }),
}));

