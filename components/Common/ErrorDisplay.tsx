"use client";

import React from 'react';
import { AlertCircle, AlertTriangle, XCircle, Wifi, RefreshCw } from 'lucide-react';
import { FormError, ValidationError, AuthError, NetworkError } from '@/lib/types/errors';

interface ErrorDisplayProps {
  error: FormError | AuthError | NetworkError | string;
  className?: string;
  showIcon?: boolean;
  onRetry?: () => void;
  onDismiss?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  className = '',
  showIcon = true,
  onRetry,
  onDismiss
}) => {
  const getErrorIcon = () => {
    if (typeof error === 'string') return AlertCircle;
    
    switch (error.type) {
      case 'network_error':
      case 'timeout':
      case 'connection_failed':
        return Wifi;
      case 'validation':
        return AlertTriangle;
      case 'server':
      case 'invalid_credentials':
      case 'account_locked':
        return XCircle;
      default:
        return AlertCircle;
    }
  };

  const getErrorMessage = () => {
    if (typeof error === 'string') return error;
    return error.message;
  };

  const getErrorColor = () => {
    if (typeof error === 'string') return 'red';
    
    switch (error.type) {
      case 'validation':
        return 'orange';
      case 'network_error':
      case 'timeout':
        return 'blue';
      default:
        return 'red';
    }
  };

  const Icon = getErrorIcon();
  const message = getErrorMessage();
  const color = getErrorColor();

  const colorClasses = {
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: 'text-red-500'
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-800',
      icon: 'text-orange-500'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'text-blue-500'
    }
  };

  const colors = colorClasses[color];

  return (
    <div 
      className={`
        p-3 rounded-lg border flex items-start space-x-3
        ${colors.bg} ${colors.border} ${className}
      `}
      role="alert"
      aria-live="polite"
    >
      {showIcon && (
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colors.icon}`} />
      )}
      
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${colors.text}`}>
          {message}
        </p>
        
        {/* Show validation details if available */}
        {typeof error !== 'string' && error.type === 'validation' && error.details && (
          <ul className={`mt-2 text-xs ${colors.text} space-y-1`}>
            {error.details.map((detail, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="w-1 h-1 bg-current rounded-full"></span>
                <span>{detail.message}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center space-x-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className={`
              p-1 rounded hover:bg-white/50 transition-colors
              ${colors.icon} hover:${colors.icon}
            `}
            aria-label="Retry"
            title="Retry"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={`
              p-1 rounded hover:bg-white/50 transition-colors
              ${colors.icon} hover:${colors.icon}
            `}
            aria-label="Dismiss error"
            title="Dismiss"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// Field-level error component
interface FieldErrorProps {
  error?: string;
  className?: string;
}

export const FieldError: React.FC<FieldErrorProps> = ({ error, className = '' }) => {
  if (!error) return null;

  return (
    <div className={`flex items-center space-x-2 mt-1 ${className}`}>
      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
      <p className="text-sm text-red-600" role="alert">
        {error}
      </p>
    </div>
  );
};

// Success message component
interface SuccessMessageProps {
  message: string;
  className?: string;
  onDismiss?: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  className = '',
  onDismiss
}) => {
  return (
    <div 
      className={`
        p-3 rounded-lg border bg-green-50 border-green-200 flex items-start space-x-3
        ${className}
      `}
      role="alert"
      aria-live="polite"
    >
      <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-500" />
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-green-800">
          {message}
        </p>
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className="p-1 rounded hover:bg-white/50 transition-colors text-green-500"
          aria-label="Dismiss success message"
        >
          <XCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

// Form error summary component
interface FormErrorSummaryProps {
  errors: ValidationError[];
  className?: string;
}

export const FormErrorSummary: React.FC<FormErrorSummaryProps> = ({
  errors,
  className = ''
}) => {
  if (errors.length === 0) return null;

  return (
    <div 
      className={`
        p-4 rounded-lg border bg-red-50 border-red-200
        ${className}
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start space-x-3">
        <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-500" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800 mb-2">
            Please fix the following errors:
          </h3>
          <ul className="text-sm text-red-700 space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>{error.message}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
