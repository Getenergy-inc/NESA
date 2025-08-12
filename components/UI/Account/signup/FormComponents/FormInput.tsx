"use client";

import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { FormFieldProps } from '@/lib/types/signup';

interface FormInputProps extends FormFieldProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'date' | 'number' | 'url';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  step?: string;
  min?: string | number;
  max?: string | number;
  ref?: any;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  error,
  disabled = false,
  className = '',
  value,
  onChange,
  onBlur,
  autoComplete,
  maxLength,
  minLength,
  pattern,
  step,
  min,
  max,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPasswordType = type === 'password';
  const inputType = isPasswordType && showPassword ? 'text' : type;

  const baseInputClasses = `
    w-full px-4 py-3 border rounded-lg transition-all duration-200
    focus:outline-none focus:border-[#ea580c]
    disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
    ${error
      ? 'border-red-500 bg-red-50'
      : 'border-gray-300 bg-white hover:border-gray-400'
    }
    ${isPasswordType ? 'pr-12' : ''}
    ${className}
  `;

  const labelClasses = `
    block text-sm font-medium mb-2 text-gray-700
    ${required ? "after:content-['*'] after:text-red-500 after:ml-1" : ''}
  `;

  return (
    <div className="mb-4">
      <label htmlFor={name} className={labelClasses}>
        {label}
      </label>

      <div className="relative">
        <input
          ref={ref}
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          onFocus={() => setIsFocused(true)}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          step={step}
          min={min}
          max={max}
          className={baseInputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
          {...props}
        />

        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#ea580c] focus:outline-none focus:text-[#ea580c] transition-colors duration-200 p-1 rounded-md hover:bg-gray-50"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {error && (
        <p
          id={`${name}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
