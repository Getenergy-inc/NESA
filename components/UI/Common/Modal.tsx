"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  className?: string;
  contentClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  className = '',
  contentClassName = ''
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px'; // Prevent layout shift
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-sm';
      case 'md':
        return 'max-w-md';
      case 'lg':
        return 'max-w-lg';
      case 'xl':
        return 'max-w-xl';
      case 'full':
        return 'max-w-full mx-4';
      default:
        return 'max-w-md';
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[9999] overflow-y-auto ${className}`}
          style={{ margin: 0, padding: 0 }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
        >
          <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`relative bg-white rounded-xl shadow-2xl w-full ${getSizeClasses()} mx-auto max-h-[calc(100vh-4rem)] ${contentClassName}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                  {title && (
                    <h2 id="modal-title" className="text-lg sm:text-xl font-semibold text-gray-900">
                      {title}
                    </h2>
                  )}
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors ml-auto"
                      aria-label="Close modal"
                    >
                      <FiX size={20} />
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className={`${title || showCloseButton ? '' : 'p-4 sm:p-6'} max-h-[calc(100vh-8rem)] overflow-y-auto`}>
                {children}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Specialized Modal Components
export const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
  isLoading?: boolean;
}> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmButtonClass = 'bg-orange-500 hover:bg-orange-600 text-white',
  isLoading = false
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    size="md"
    closeOnBackdropClick={!isLoading}
  >
    <div className="p-6">
      <p className="text-gray-700 mb-6">{message}</p>
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="w-full sm:w-auto px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${confirmButtonClass}`}
        >
          {isLoading ? 'Loading...' : confirmText}
        </button>
      </div>
    </div>
  </Modal>
);

export const SuccessModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
  icon?: React.ReactNode;
}> = ({
  isOpen,
  onClose,
  title,
  message,
  buttonText = 'OK',
  onButtonClick,
  icon
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    size="md"
  >
    <div className="p-6 text-center">
      {icon && (
        <div className="flex justify-center mb-4">
          {icon}
        </div>
      )}
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">{message}</p>
      <button
        onClick={onButtonClick || onClose}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
      >
        {buttonText}
      </button>
    </div>
  </Modal>
);

export const ErrorModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  buttonText?: string;
}> = ({
  isOpen,
  onClose,
  title = 'Error',
  message,
  buttonText = 'Try Again'
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    size="md"
  >
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
          <FiX className="w-4 h-4 text-red-600" />
        </div>
        <h2 className="text-lg font-bold text-red-600">{title}</h2>
      </div>
      <p className="text-gray-700 mb-6 leading-relaxed">{message}</p>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg transition-all duration-200"
        >
          {buttonText}
        </button>
      </div>
    </div>
  </Modal>
);

export default Modal;
