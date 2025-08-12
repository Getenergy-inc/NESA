"use client";

import React, { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessMessageProps {
  message: string;
  description?: string;
  duration?: number; // in milliseconds
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  description,
  duration = 5000,
  onClose,
  showCloseButton = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300); // Allow fade out animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`
      fixed top-4 right-4 z-50 max-w-sm w-full bg-white border border-green-200 rounded-lg shadow-lg
      transform transition-all duration-300 ease-in-out
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      ${className}
    `}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-green-800">
              {message}
            </h3>
            {description && (
              <p className="mt-1 text-sm text-green-700">
                {description}
              </p>
            )}
          </div>
          {showCloseButton && (
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={handleClose}
                className="inline-flex text-green-400 hover:text-green-600 focus:outline-none focus:text-green-600 transition-colors"
                aria-label="Close notification"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Progress bar */}
      {duration > 0 && (
        <div className="h-1 bg-green-100 rounded-b-lg overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all ease-linear"
            style={{
              animation: `shrink ${duration}ms linear forwards`
            }}
          />
        </div>
      )}
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default SuccessMessage;
