"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Phone, ArrowLeft, LogIn } from 'lucide-react';
import { MdLocationPin } from 'react-icons/md';
import { SignupProvider, useSignup } from '@/lib/context/SignupContext';
import { SignupStep } from '@/lib/types/signup';
import './signup-animations.css';


import AccountTypeStep from './Steps/AccountTypeStep';
import IntentSelectionStep from './Steps/IntentSelectionStep';
import PersonalInfoStep from './Steps/PersonalInfoStep';
import OrganizationInfoStep from './Steps/OrganizationInfoStep';
import RoleSelectionStep from './Steps/RoleSelectionStep';
import VerificationStep from './Steps/VerificationStep';
import CompletionStep from './Steps/CompletionStep';

// Navigation buttons component
const NavigationButtons: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex flex-row items-center gap-3">
      {/* Go Back Button */}
      <button
        onClick={handleGoBack}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-white/70 rounded-lg transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 backdrop-blur-sm"
        aria-label="Go back to previous page"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleGoBack();
          }
        }}
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
        <span className="text-sm font-medium hidden sm:inline">Go Back</span>
        <span className="text-sm font-medium sm:hidden">Back</span>
      </button>

      {/* Login Button */}
      <Link
        href="/account/login"
        className="flex items-center gap-2 px-3 sm:px-4 py-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50/80 rounded-lg transition-all duration-200 group border border-orange-200 hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 backdrop-blur-sm"
        aria-label="Navigate to login page"
        tabIndex={0}
      >
        <LogIn className="w-4 h-4" />
        <span className="text-sm font-medium">Login</span>
      </Link>
    </div>
  );
};

// Progress indicator component
const ProgressIndicator: React.FC = () => {
  const { stepProgress, formData } = useSignup();

  const getStepLabel = (step: SignupStep): string => {
    switch (step) {
      case 'account-type':
        return 'Account Type';
      case 'intent-selection':
        return 'Purpose';
      case 'personal-info':
        return 'Personal Info';
      case 'organization-info':
        return 'Organization Info';
      case 'role-selection':
        return 'Role & Division';
      case 'verification':
        return 'Verification';
      case 'completion':
        return 'Complete';
      default:
        return step;
    }
  };

  const getVisibleSteps = (): SignupStep[] => {
    const baseSteps: SignupStep[] = ['account-type', 'intent-selection'];

    // Add personal or organization info step
    if (formData.accountType === 'Individual') {
      baseSteps.push('personal-info');
    } else if (formData.accountType) {
      baseSteps.push('organization-info');
    }

    // Add role selection step if user has volunteer/staff intents
    const roleRequiredIntents = ['Become Ambassador', 'Join NESA Team', 'Apply as Judge', 'Apply as NRC Volunteer'];
    const hasRoleIntent = formData.intents?.some(intent => roleRequiredIntents.includes(intent));
    if (hasRoleIntent) {
      baseSteps.push('role-selection');
    }

    // Add verification and completion steps
    baseSteps.push('verification');
    baseSteps.push('completion');

    return baseSteps;
  };

  const visibleSteps = getVisibleSteps();
  const currentStepIndex = visibleSteps.indexOf(stepProgress.currentStep);

  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentStepIndex + 1) / visibleSteps.length) * 100}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {visibleSteps.map((step, index) => {
          const isCompleted = stepProgress.completedSteps.includes(step);
          const isCurrent = step === stepProgress.currentStep;

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center relative">
                {/* Step Circle */}
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-lg
                    ${isCompleted
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-200'
                      : isCurrent
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-200 scale-110'
                        : 'bg-white text-gray-400 border-2 border-gray-300 shadow-gray-100'
                    }
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Step Label */}
                <span className={`
                  mt-3 text-sm font-semibold text-center max-w-20 leading-tight
                  ${isCurrent
                    ? 'text-orange-600'
                    : isCompleted
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }
                `}>
                  {getStepLabel(step)}
                </span>

                {/* Current Step Indicator */}
                {isCurrent && (
                  <div className="absolute -bottom-2 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                )}
              </div>

              {/* Connecting Line */}
              {index < visibleSteps.length - 1 && (
                <div className="flex-1 flex items-center px-2">
                  <div className={`
                    w-full h-1 rounded-full transition-all duration-500
                    ${index < currentStepIndex
                      ? 'bg-gradient-to-r from-green-500 to-green-600'
                      : 'bg-gray-300'
                    }
                  `} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Progress Text */}
      <div className="mt-6 text-center">
        <div className="text-lg font-semibold text-gray-800 mb-1">
          Step {currentStepIndex + 1} of {visibleSteps.length}
        </div>
        <div className="text-sm text-gray-600">
          {Math.round(((currentStepIndex + 1) / visibleSteps.length) * 100)}% Complete
        </div>
      </div>
    </div>
  );
};

// Error boundary component
class SignupErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Signup flow error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">
              We encountered an error while processing your signup. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main signup flow content component
const SignupFlowContent: React.FC = () => {
  const { stepProgress, error } = useSignup();

  const renderCurrentStep = () => {
    switch (stepProgress.currentStep) {
      case 'account-type':
        return <AccountTypeStep />;
      case 'intent-selection':
        return <IntentSelectionStep />;
      case 'personal-info':
        return <PersonalInfoStep />;
      case 'organization-info':
        return <OrganizationInfoStep />;
      case 'role-selection':
        return <RoleSelectionStep />;
      case 'verification':
        return <VerificationStep />;
      case 'completion':
        return <CompletionStep />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Step not found</h2>
            <p className="text-gray-600">The requested step could not be found.</p>
          </div>
        );
    }
  };

  // Show completion step without internal layout (PublicLayout handles navbar/footer)
  if (stepProgress.currentStep === 'completion') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <CompletionStep />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with Logo */}
        <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/NESA Logo 2.png"
                alt="NESA-Africa"
                width={50}
                height={50}
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">NESA-Africa</h1>
                <p className="text-sm text-gray-600">Join Our Community</p>
              </div>
            </div>
            <NavigationButtons />
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
          <div className="w-full max-w-4xl">
            {/* Progress Indicator */}
            <div className="mb-8">
              <ProgressIndicator />
            </div>

            {/* Main Form Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden scale-in hover-lift smooth-transition">
              <div className="p-6 sm:p-8 lg:p-12 fade-in-up">
                {/* Global Error Message */}
                {error && (
                  <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start space-x-3" role="alert" aria-live="polite">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{error}</p>
                    </div>
                  </div>
                )}

                {/* Current Step Content */}
                <div
                  id="signup-form-content"
                  role="main"
                  aria-label="Signup form content"
                  className="signup-step-content slide-in-right"
                  tabIndex={-1}
                >
                  {renderCurrentStep()}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                By continuing, you agree to our{' '}
                <a href="/terms" className="text-orange-600 hover:text-orange-700 font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-orange-600 hover:text-orange-700 font-medium">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main signup flow component with provider
const SignupFlow: React.FC = () => {
  return (
    <SignupErrorBoundary>
      <SignupProvider>
        <SignupFlowContent />
      </SignupProvider>
    </SignupErrorBoundary>
  );
};

export default SignupFlow;
