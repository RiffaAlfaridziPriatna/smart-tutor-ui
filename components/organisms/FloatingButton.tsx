'use client';

import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

export interface FloatingButtonProps {
  onClick: () => void;
  label?: string;
}

export default function FloatingButton({
  onClick,
  label = 'Ask Jojo',
}: FloatingButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all hover:scale-110 active:scale-95 flex items-center gap-2"
      aria-label={label}
    >
      <Icon name="chat" size={24} />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        !
      </span>
    </button>
  );
}

