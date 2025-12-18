'use client';

import Button from '../atoms/Button';

export interface QuickActionButtonProps {
  type: 'hint' | 'steps';
  onClick: () => void;
  disabled?: boolean;
}

const buttonConfig = {
  hint: {
    label: 'Give me a hint',
    variant: 'primary' as const,
    className: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
  },
  steps: {
    label: 'Reveal the steps',
    variant: 'primary' as const,
    className: 'bg-green-50 text-green-700 hover:bg-green-100',
  },
};

export default function QuickActionButton({
  type,
  onClick,
  disabled = false,
}: QuickActionButtonProps) {
  const config = buttonConfig[type];

  return (
    <Button
      variant="ghost"
      size="sm"
      fullWidth
      onClick={onClick}
      disabled={disabled}
      className={config.className}
    >
      {config.label}
    </Button>
  );
}

