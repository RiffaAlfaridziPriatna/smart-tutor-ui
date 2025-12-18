'use client';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

export default function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <div className={`flex space-x-1 ${className}`}>
      <div
        className={`${sizeStyles[size]} bg-gray-400 rounded-full animate-bounce`}
        style={{ animationDelay: '0ms' }}
      />
      <div
        className={`${sizeStyles[size]} bg-gray-400 rounded-full animate-bounce`}
        style={{ animationDelay: '150ms' }}
      />
      <div
        className={`${sizeStyles[size]} bg-gray-400 rounded-full animate-bounce`}
        style={{ animationDelay: '300ms' }}
      />
    </div>
  );
}
