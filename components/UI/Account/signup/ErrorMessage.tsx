"use client";

import React, { useEffect, useState } from 'react';
import { AlertCircle, X, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  description?: string;
  duration?: number; // in milliseconds, 0 for persistent
  onClose?: () => void;
  onRetry?: () => void;
  showCloseButton?: boolean;
  showRetryButton?: boolean;
  className?: string;
  type?: 'error' | 'warning';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  description,
  duration = 0, // Persistent by default for errors
  onClose,
  onRetry,
  showCloseButton = true,
  showRetryButton = false,
  className = '',
  type = 'error'
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  const handleRetry = () => {
    onRetry?.();
  };

  if (!isVisible) {
    return null;
  }

  const isError = type === 'error';
  const colorClasses = isError 
    ? {
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: 'text-red-500',
        title: 'text-red-800',
        description: 'text-red-700',
        button: 'text-red-400 hover:text-red-600 focus:text-red-600'
      }
    : {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        icon: 'text-yellow-500',
        title: 'text-yellow-800',
        description: 'text-yellow-700',
        button: 'text-yellow-400 hover:text-yellow-600 focus:text-yellow-600'
      };

  return (
    <div className={`
      fixed top-4 right-4 z-50 max-w-sm w-full ${colorClasses.bg} ${colorClasses.border} border rounded-lg shadow-lg
      transform transition-all duration-300 ease-in-out
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      ${className}
    `}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className={`h-6 w-6 ${colorClasses.icon}`} />
          </div>
          <div className="ml-3 flex-1">
            <h3 className={`text-sm font-medium ${colorClasses.title}`}>
              {message}
            </h3>
            {description && (
              <p className={`mt-1 text-sm ${colorClasses.description}`}>
                {description}
              </p>
            )}
            
            {/* Action buttons */}
            {(showRetryButton || showCloseButton) && (
              <div className="mt-3 flex space-x-3">
                {showRetryButton && (
                  <button
                    onClick={handleRetry}
                    className={`
                      inline-flex items-center text-sm font-medium ${colorClasses.button}
                      hover:underline focus:outline-none transition-colors
                    `}
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Try Again
                  </button>
                )}
                {showCloseButton && (
                  <button
                    onClick={handleClose}
                    className={`
                      text-sm font-medium ${colorClasses.button}
                      hover:underline focus:outline-none transition-colors
                    `}
                  >
                    Dismiss
                  </button>
                )}
              </div>
            )}
          </div>
          
          {showCloseButton && (
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={handleClose}
                className={`inline-flex ${colorClasses.button} focus:outline-none transition-colors`}
                aria-label="Close notification"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
