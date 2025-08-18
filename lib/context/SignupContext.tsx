"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  SignupFormData, 
  SignupStep, 
  StepProgress, 
  SignupContextType, 
  SignupResponse 
} from '../types/signup';
import { signupFlow } from '../services/authService';
import { validateBackendRequirements } from '../utils/signupMapping';

// Default step order
const STEP_ORDER: SignupStep[] = [
  'account-type',
  'intent-selection',
  'personal-info', // or 'organization-info' based on account type
  'role-selection',
  'verification',
  'completion'
];

// Initial form data
const initialFormData: Partial<SignupFormData> = {
  accountType: undefined,
  intents: [],
  email: '',
  password: '',
  confirmPassword: '',
  country: '',
  state: '',
  preferredLanguage: 'EN',
  termsAccepted: false,
  privacyAccepted: false
};

// Initial step progress
const initialStepProgress: StepProgress = {
  currentStep: 'account-type',
  completedSteps: [],
  totalSteps: STEP_ORDER.length,
  progressPercentage: 0
};

// Local storage key
const STORAGE_KEY = 'nesa-signup-form-data';

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<Partial<SignupFormData>>(initialFormData);
  const [stepProgress, setStepProgress] = useState<StepProgress>(initialStepProgress);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load form data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setFormData(parsed.formData || initialFormData);
        setStepProgress(parsed.stepProgress || initialStepProgress);
      }
    } catch (error) {
      console.error('Error loading saved form data:', error);
      // Clear corrupted data
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    try {
      const dataToSave = {
        formData,
        stepProgress,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  }, [formData, stepProgress]);

  // Update form data
  const updateFormData = (newData: Partial<SignupFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
    setError(null); // Clear any previous errors
  };

  // Calculate progress percentage
  const calculateProgress = (currentStep: SignupStep, completedSteps: SignupStep[]): number => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    const completedCount = completedSteps.length;
    return Math.round(((completedCount + (currentIndex + 1) * 0.5) / STEP_ORDER.length) * 100);
  };

  // Get next step based on form data
  const getNextStep = (currentStep: SignupStep, formData: Partial<SignupFormData>): SignupStep | null => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);

    if (currentIndex === -1 || currentIndex >= STEP_ORDER.length - 1) {
      return null;
    }

    let nextStep = STEP_ORDER[currentIndex + 1];

    // Handle account type routing
    if (currentStep === 'intent-selection') {
      if (formData.accountType === 'Individual') {
        nextStep = 'personal-info';
      } else {
        nextStep = 'organization-info' as SignupStep;
      }
    }

    // Handle role-selection step (conditional)
    if (currentStep === 'personal-info' || currentStep === 'organization-info') {
      const roleRequiredIntents = ['Become Ambassador', 'Join NESA Team', 'Apply as Judge', 'Apply as NRC Volunteer'];
      const hasRoleIntent = formData.intents?.some(intent => roleRequiredIntents.includes(intent));

      if (hasRoleIntent) {
        nextStep = 'role-selection';
      } else {
        nextStep = 'verification';
      }
    }

    // After role-selection, go to verification
    if (currentStep === 'role-selection') {
      nextStep = 'verification';
    }

    return nextStep;
  };

  // Get previous step
  const getPreviousStep = (currentStep: SignupStep, formData: Partial<SignupFormData>): SignupStep | null => {
    if (currentStep === 'account-type') {
      return null;
    }

    // Handle reverse navigation based on current step
    switch (currentStep) {
      case 'intent-selection':
        return 'account-type';

      case 'personal-info':
      case 'organization-info':
        return 'intent-selection';

      case 'role-selection':
        return formData.accountType === 'Individual' ? 'personal-info' : 'organization-info' as SignupStep;

      case 'verification':
        // Check if role-selection was shown
        const roleRequiredIntents = ['Become Ambassador', 'Join NESA Team', 'Apply as Judge'];
        const hasRoleIntent = formData.intents?.some(intent => roleRequiredIntents.includes(intent));

        if (hasRoleIntent) {
          return 'role-selection';
        } else {
          return formData.accountType === 'Individual' ? 'personal-info' : 'organization-info' as SignupStep;
        }

      case 'completion':
        return 'verification';

      default:
        return null;
    }
  };

  // Scroll to form top with smooth behavior
  const scrollToFormTop = () => {
    // Use requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
      try {
        // Try to find the form container with priority order
        const formContainer = document.getElementById('signup-form-content') ||
                             document.querySelector('.signup-form-container') ||
                             document.querySelector('[role="main"]') ||
                             document.querySelector('.signup-step-content') ||
                             document.querySelector('form') ||
                             document.querySelector('main');

        if (formContainer) {
          // Calculate offset for better positioning (account for fixed headers/navigation)
          const isMobile = window.innerWidth < 768;
          const offset = isMobile ? 20 : 40; // More offset on mobile for better UX

          const elementTop = formContainer.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = Math.max(0, elementTop - offset); // Ensure we don't scroll to negative position

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Additional focus management for accessibility
          if (isMobile) {
            // On mobile, also ensure the form container is focused for screen readers
            setTimeout(() => {
              if (formContainer instanceof HTMLElement) {
                formContainer.focus({ preventScroll: true });
              }
            }, 300); // Wait for scroll animation to complete
          }
        } else {
          // Fallback to window scroll
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      } catch (error) {
        // Fallback for any errors
        console.warn('Error during scroll to form top:', error);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  };

  // Move to next step
  const nextStep = () => {
    const next = getNextStep(stepProgress.currentStep, formData);
    if (next) {
      const newCompletedSteps = [...stepProgress.completedSteps];
      if (!newCompletedSteps.includes(stepProgress.currentStep)) {
        newCompletedSteps.push(stepProgress.currentStep);
      }

      const newStepProgress: StepProgress = {
        currentStep: next,
        completedSteps: newCompletedSteps,
        totalSteps: STEP_ORDER.length,
        progressPercentage: calculateProgress(next, newCompletedSteps)
      };

      setStepProgress(newStepProgress);

      // Scroll to top of form after step transition
      scrollToFormTop();
    }
  };

  // Move to previous step
  const previousStep = () => {
    const previous = getPreviousStep(stepProgress.currentStep, formData);
    if (previous) {
      const newCompletedSteps = stepProgress.completedSteps.filter(step => step !== previous);

      const newStepProgress: StepProgress = {
        currentStep: previous,
        completedSteps: newCompletedSteps,
        totalSteps: STEP_ORDER.length,
        progressPercentage: calculateProgress(previous, newCompletedSteps)
      };

      setStepProgress(newStepProgress);

      // Scroll to top of form after step transition
      scrollToFormTop();
    }
  };

  // Go to specific step
  const goToStep = (step: SignupStep) => {
    const stepIndex = STEP_ORDER.indexOf(step);
    if (stepIndex !== -1) {
      const newCompletedSteps = STEP_ORDER.slice(0, stepIndex);

      const newStepProgress: StepProgress = {
        currentStep: step,
        completedSteps: newCompletedSteps,
        totalSteps: STEP_ORDER.length,
        progressPercentage: calculateProgress(step, newCompletedSteps)
      };

      setStepProgress(newStepProgress);

      // Scroll to top of form after step transition
      scrollToFormTop();
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData(initialFormData);
    setStepProgress(initialStepProgress);
    setError(null);
    setIsLoading(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Submit form
  const submitForm = async (): Promise<SignupResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate that we have complete form data
      const validationErrors = validateBackendRequirements(formData as SignupFormData);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors[0]);
      }

      // Use real API service instead of mock
      const response = await signupFlow(formData as SignupFormData);

      if (response.success) {
        // Clear form data on successful signup
        localStorage.removeItem(STORAGE_KEY);

        // Move to completion step
        setStepProgress(prev => ({
          ...prev,
          currentStep: 'completion',
          completedSteps: [...STEP_ORDER.slice(0, -1)],
          progressPercentage: 100
        }));
      } else {
        setError(response.message);
      }

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: SignupContextType = {
    formData,
    stepProgress,
    updateFormData,
    nextStep,
    previousStep,
    goToStep,
    resetForm,
    submitForm,
    isLoading,
    error
  };

  return (
    <SignupContext.Provider value={contextValue}>
      {children}
    </SignupContext.Provider>
  );
};

// Custom hook to use signup context
export const useSignup = (): SignupContextType => {
  const context = useContext(SignupContext);
  if (context === undefined) {
    throw new Error('useSignup must be used within a SignupProvider');
  }
  return context;
};

// Hook to check if a step is accessible
export const useStepAccessibility = () => {
  const { stepProgress, formData } = useSignup();

  const isStepAccessible = (step: SignupStep): boolean => {
    const stepIndex = STEP_ORDER.indexOf(step);
    const currentIndex = STEP_ORDER.indexOf(stepProgress.currentStep);
    
    // Current step and completed steps are always accessible
    if (step === stepProgress.currentStep || stepProgress.completedSteps.includes(step)) {
      return true;
    }
    
    // Next step is accessible if current step would be completed
    if (stepIndex === currentIndex + 1) {
      return true;
    }
    
    return false;
  };

  return { isStepAccessible };
};
