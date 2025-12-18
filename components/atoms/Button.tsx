'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const variantStyles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
  danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-lg
        font-medium
        transition-colors
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-2
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

