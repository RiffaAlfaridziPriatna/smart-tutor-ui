'use client';

import { ReactNode } from 'react';
import Input, { InputProps } from '../atoms/Input';

export interface FormFieldProps extends InputProps {
  label: string;
  required?: boolean;
  leftAdornment?: ReactNode;
  rightAdornment?: ReactNode;
}

export default function FormField({
  label,
  required = false,
  leftAdornment,
  rightAdornment,
  className = '',
  ...inputProps
}: FormFieldProps) {
  return (
    <div className="w-full">
      <label
        htmlFor={inputProps.id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative flex items-center">
        {leftAdornment && (
          <div className="absolute left-3 z-10">{leftAdornment}</div>
        )}
        <Input
          {...inputProps}
          className={`
            ${leftAdornment ? 'pl-10' : ''}
            ${rightAdornment ? 'pr-10' : ''}
            ${className}
          `}
        />
        {rightAdornment && (
          <div className="absolute right-3 z-10">{rightAdornment}</div>
        )}
      </div>
    </div>
  );
}

