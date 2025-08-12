"use client";

import React, { forwardRef, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FormFieldProps } from '@/lib/types/signup';

interface FormPhoneInputProps extends Omit<FormFieldProps, 'type'> {
  value?: string;
  onChange?: (value: string, country: any) => void;
  onBlur?: () => void;
  country?: string;
  enableAreaCodes?: boolean;
  enableTerritories?: boolean;
  enableLongNumbers?: boolean;
  countryCodeEditable?: boolean;
}

const FormPhoneInput = forwardRef<any, FormPhoneInputProps>(({
  label,
  name,
  placeholder = 'Enter phone number',
  required = false,
  error,
  disabled = false,
  className = '',
  value,
  onChange,
  onBlur,
  country = 'ng',
  enableAreaCodes = true,
  enableTerritories = true,
  enableLongNumbers = true,
  countryCodeEditable = false,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const labelClasses = `
    block text-sm font-medium mb-2 transition-colors duration-200
    ${error ? 'text-red-700' : 'text-gray-700'}
    ${required ? "after:content-['*'] after:text-red-500 after:ml-1" : ''}
  `;

  const containerClasses = `
    phone-input-container
    ${error ? 'phone-input-error' : ''}
    ${isFocused ? 'phone-input-focused' : ''}
    ${disabled ? 'phone-input-disabled' : ''}
    ${className}
  `;

  return (
    <div className="mb-6">
      <label htmlFor={name} className={labelClasses}>
        {label}
      </label>
      
      <div className={containerClasses}>
        <PhoneInput
          country={country}
          value={value}
          onChange={onChange}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          onFocus={() => setIsFocused(true)}
          enableAreaCodes={enableAreaCodes}
          enableTerritories={enableTerritories}
          enableLongNumbers={enableLongNumbers}
          countryCodeEditable={countryCodeEditable}
          disabled={disabled}
          inputProps={{
            name: name,
            required: required,
            'aria-invalid': error ? 'true' : 'false',
            'aria-describedby': error ? `${name}-error` : undefined,
            placeholder: placeholder,
            ...props
          }}
          containerClass="w-full"
          inputClass={`
            w-full h-12 pl-12 pr-4 rounded-lg border transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
            ${error 
              ? 'border-red-500 bg-red-50 focus:ring-red-500' 
              : isFocused 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-300 bg-white hover:border-gray-400'
            }
          `}
          buttonClass={`
            h-12 border-r border-gray-300 rounded-l-lg bg-white hover:bg-gray-50
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? 'border-red-500' : ''}
          `}
          dropdownClass="bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        />
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

      <style jsx global>{`
        .phone-input-container .react-tel-input {
          width: 100%;
        }
        
        .phone-input-container .react-tel-input .form-control {
          width: 100%;
          height: 48px;
          padding: 12px 12px 12px 48px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          background: #ffffff;
          transition: all 0.2s;
        }
        
        .phone-input-container .react-tel-input .form-control:focus {
          outline: none;
          ring: 2px;
          ring-color: #f97316;
          border-color: transparent;
        }
        
        .phone-input-container .react-tel-input .flag-dropdown {
          height: 48px;
          border-radius: 8px 0 0 8px;
          border: 1px solid #d1d5db;
          border-right: none;
          background: #ffffff;
        }
        
        .phone-input-container .react-tel-input .flag-dropdown:hover {
          background: #f9fafb;
        }
        
        .phone-input-container .react-tel-input .flag-dropdown.open {
          background: #f9fafb;
        }
        
        .phone-input-container .react-tel-input .country-list {
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          max-height: 240px;
          overflow-y: auto;
        }
        
        .phone-input-container .react-tel-input .country-list .country:hover {
          background: #f3f4f6;
        }
        
        .phone-input-container .react-tel-input .country-list .country.highlight {
          background: #fef3c7;
        }
        
        .phone-input-error .react-tel-input .form-control {
          border-color: #ef4444;
          background: #fef2f2;
        }
        
        .phone-input-error .react-tel-input .flag-dropdown {
          border-color: #ef4444;
        }
        
        .phone-input-focused .react-tel-input .form-control {
          border-color: #f97316;
          background: #fff7ed;
          ring: 2px;
          ring-color: #f97316;
        }
        
        .phone-input-focused .react-tel-input .flag-dropdown {
          border-color: #f97316;
        }
        
        .phone-input-disabled .react-tel-input .form-control {
          background: #f3f4f6;
          cursor: not-allowed;
          color: #6b7280;
        }
        
        .phone-input-disabled .react-tel-input .flag-dropdown {
          background: #f3f4f6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
});

FormPhoneInput.displayName = 'FormPhoneInput';

export default FormPhoneInput;
