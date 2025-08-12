"use client";

import React, { forwardRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FormFieldProps } from '@/lib/types/signup';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormSelectProps extends FormFieldProps {
  options: SelectOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  multiple?: boolean;
  size?: number;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(({
  label,
  name,
  placeholder = 'Select an option',
  required = false,
  error,
  disabled = false,
  className = '',
  options,
  value,
  onChange,
  onBlur,
  multiple = false,
  size,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseSelectClasses = `
    w-full px-4 py-3 rounded-lg border transition-all duration-200 appearance-none
    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
    disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
    ${error 
      ? 'border-red-500 bg-red-50 focus:ring-red-500' 
      : isFocused 
        ? 'border-orange-500 bg-orange-50' 
        : 'border-gray-300 bg-white hover:border-gray-400'
    }
    ${className}
  `;

  const labelClasses = `
    block text-sm font-medium mb-2 transition-colors duration-200
    ${error ? 'text-red-700' : 'text-gray-700'}
    ${required ? "after:content-['*'] after:text-red-500 after:ml-1" : ''}
  `;

  return (
    <div className="mb-6">
      <label htmlFor={name} className={labelClasses}>
        {label}
      </label>
      
      <div className="relative">
        <select
          ref={ref}
          id={name}
          name={name}
          required={required}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          onFocus={() => setIsFocused(true)}
          multiple={multiple}
          size={size}
          className={baseSelectClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
          {...props}
        >
          {!multiple && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={option.disabled ? 'text-gray-400' : ''}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {!multiple && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>
        )}
      </div>
      
      {error && (
        <p 
          id={`${name}-error`}
          className="mt-2 text-sm text-red-600 flex items-start"
          role="alert"
        >
          <span className="inline-block w-4 h-4 mr-1 mt-0.5 flex-shrink-0">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </span>
          {error}
        </p>
      )}
    </div>
  );
});

FormSelect.displayName = 'FormSelect';

export default FormSelect;
