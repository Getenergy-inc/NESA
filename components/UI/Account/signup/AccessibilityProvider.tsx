"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AccessibilityContextType {
  announceToScreenReader: (message: string) => void;
  focusElement: (elementId: string) => void;
  isHighContrast: boolean;
  isReducedMotion: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
  setFontSize: (size: 'normal' | 'large' | 'extra-large') => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'extra-large'>('normal');

  // Check for user preferences on mount
  useEffect(() => {
    // Check for high contrast preference
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(highContrastQuery.matches);
    
    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      setIsHighContrast(e.matches);
    };
    
    highContrastQuery.addEventListener('change', handleHighContrastChange);

    // Check for reduced motion preference
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(reducedMotionQuery.matches);
    
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

    // Load saved font size preference
    const savedFontSize = localStorage.getItem('nesa-font-size') as 'normal' | 'large' | 'extra-large';
    if (savedFontSize) {
      setFontSize(savedFontSize);
    }

    return () => {
      highContrastQuery.removeEventListener('change', handleHighContrastChange);
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  // Apply font size to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-normal', 'font-large', 'font-extra-large');
    root.classList.add(`font-${fontSize}`);
    
    // Save preference
    localStorage.setItem('nesa-font-size', fontSize);
  }, [fontSize]);

  // Apply high contrast mode
  useEffect(() => {
    const root = document.documentElement;
    if (isHighContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  // Apply reduced motion
  useEffect(() => {
    const root = document.documentElement;
    if (isReducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
  }, [isReducedMotion]);

  const announceToScreenReader = (message: string) => {
    // Create a live region for screen reader announcements
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const focusElement = (elementId: string) => {
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const contextValue: AccessibilityContextType = {
    announceToScreenReader,
    focusElement,
    isHighContrast,
    isReducedMotion,
    fontSize,
    setFontSize
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
      
      {/* Global accessibility styles */}
      <style jsx global>{`
        /* Font size variations */
        .font-normal {
          font-size: 16px;
        }
        
        .font-large {
          font-size: 18px;
        }
        
        .font-extra-large {
          font-size: 20px;
        }
        
        /* High contrast mode */
        .high-contrast {
          --tw-bg-white: #000000;
          --tw-text-gray-900: #ffffff;
          --tw-text-gray-600: #cccccc;
          --tw-border-gray-300: #666666;
          --tw-bg-orange-500: #ffaa00;
          --tw-text-orange-600: #ffcc00;
        }
        
        /* Reduced motion */
        .reduced-motion *,
        .reduced-motion *::before,
        .reduced-motion *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
        
        /* Focus styles for better accessibility */
        .focus-visible:focus {
          outline: 2px solid #f97316;
          outline-offset: 2px;
        }
        
        /* Screen reader only content */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        
        /* Skip link for keyboard navigation */
        .skip-link {
          position: absolute;
          top: -40px;
          left: 6px;
          background: #f97316;
          color: white;
          padding: 8px;
          text-decoration: none;
          border-radius: 4px;
          z-index: 1000;
        }
        
        .skip-link:focus {
          top: 6px;
        }
        
        /* Ensure interactive elements are large enough */
        button, 
        input[type="button"], 
        input[type="submit"], 
        input[type="reset"], 
        input[type="checkbox"], 
        input[type="radio"], 
        select,
        a {
          min-height: 44px;
          min-width: 44px;
        }
        
        /* Better focus indicators for form elements */
        input:focus,
        select:focus,
        textarea:focus {
          outline: 2px solid #f97316;
          outline-offset: 2px;
        }
        
        /* Error state accessibility */
        [aria-invalid="true"] {
          border-color: #ef4444 !important;
        }
        
        /* Loading state accessibility */
        [aria-busy="true"] {
          cursor: wait;
        }
        
        /* Disabled state accessibility */
        [disabled], 
        [aria-disabled="true"] {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        /* Better contrast for placeholder text */
        ::placeholder {
          color: #6b7280;
          opacity: 1;
        }
        
        /* Responsive text scaling */
        @media (max-width: 640px) {
          .font-normal { font-size: 14px; }
          .font-large { font-size: 16px; }
          .font-extra-large { font-size: 18px; }
        }
        
        /* Print styles */
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

// Hook for keyboard navigation
export const useKeyboardNavigation = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape key to close modals/dropdowns
      if (event.key === 'Escape') {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.blur) {
          activeElement.blur();
        }
      }
      
      // Tab navigation improvements
      if (event.key === 'Tab') {
        // Add visual focus indicators
        document.body.classList.add('keyboard-navigation');
      }
    };
    
    const handleMouseDown = () => {
      // Remove keyboard navigation class when using mouse
      document.body.classList.remove('keyboard-navigation');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
};

// Hook for form accessibility
export const useFormAccessibility = (formId: string) => {
  const { announceToScreenReader } = useAccessibility();
  
  const announceError = (fieldName: string, error: string) => {
    announceToScreenReader(`Error in ${fieldName}: ${error}`);
  };
  
  const announceSuccess = (message: string) => {
    announceToScreenReader(`Success: ${message}`);
  };
  
  const announceProgress = (currentStep: number, totalSteps: number) => {
    announceToScreenReader(`Step ${currentStep} of ${totalSteps}`);
  };
  
  return {
    announceError,
    announceSuccess,
    announceProgress
  };
};
