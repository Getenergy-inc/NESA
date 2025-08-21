"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Mail, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useSignup } from '@/lib/context/SignupContext';
import { useAuthContext } from '@/lib/context/AuthContext';
import { ERROR_MESSAGES, createAuthError } from '@/lib/types/errors';
import { verifyOtp, resendOtp } from '@/lib/services/authService';
import Button from '@/components/Common/Button';
import ErrorDisplay, { SuccessMessage } from '@/components/Common/ErrorDisplay';

interface VerificationFormData {
  verificationCode: string;
}

const verificationSchema = z.object({
  verificationCode: z.string()
    .length(6, 'Verification code must be 6 digits')
    .regex(/^\d{6}$/, 'Verification code must contain only numbers')
});

const VerificationStep: React.FC = () => {
  const { formData, updateFormData, nextStep, previousStep, isLoading } = useSignup();
  const { setAuthenticationState } = useAuthContext();
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes
  const [isResending, setIsResending] = useState<boolean>(false);
  const [resendSuccess, setResendSuccess] = useState<boolean>(false);
  const [verificationError, setVerificationError] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [networkError, setNetworkError] = useState<string>('');
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const maxAttempts = 5;
  
  // Refs for OTP inputs
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const {
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    mode: 'onChange'
  });

  // Get email from form data
  const email = formData.accountType === 'Individual' 
    ? formData.email 
    : (formData as any)?.contactEmail || formData.email;

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setVerificationError('');

      // Update form value
      const otpString = newOtp.join('');
      setValue('verificationCode', otpString);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    
    if (pastedData.length === 6) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      setValue('verificationCode', pastedData);
      inputRefs.current[5]?.focus();
    }
  };

  // Resend verification email
  const handleResendEmail = async () => {
    setIsResending(true);
    setResendSuccess(false);
    setVerificationError('');
    setNetworkError('');

    try {
      // Use real API service
      await resendOtp(email, 'VERIFY_EMAIL');

      setResendSuccess(true);
      setTimeLeft(300); // Reset timer
      setOtp(['', '', '', '', '', '']); // Clear OTP
      setValue('verificationCode', '');
      setAttemptCount(0); // Reset attempt count

      // Clear success message after 5 seconds
      setTimeout(() => setResendSuccess(false), 5000);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('timeout') || error.message.includes('network')) {
          setNetworkError(ERROR_MESSAGES.NETWORK_ERROR);
        } else {
          setVerificationError('Failed to resend verification email. Please try again.');
        }
      } else {
        setVerificationError(ERROR_MESSAGES.UNKNOWN_ERROR);
      }
    } finally {
      setIsResending(false);
    }
  };

  // Submit verification
  const onSubmit = async (data: VerificationFormData) => {
    setIsVerifying(true);
    setVerificationError('');
    setNetworkError('');

    // Check attempt limit
    if (attemptCount >= maxAttempts) {
      setVerificationError(ERROR_MESSAGES.TOO_MANY_ATTEMPTS);
      setIsVerifying(false);
      return;
    }

    try {
      setAttemptCount(prev => prev + 1);

      // Use real API service
      const response = await verifyOtp(email, data.verificationCode, 'VERIFY_EMAIL');

      // Handle verification response
      if (response.success) {
        // Success - update form data and set authentication state
        updateFormData({ emailVerified: true });

        // Set authentication state with user data from response
        const userData = {
          ...formData,
          emailVerified: true,
          id: response.user?.id || 'verified-user',
          role: response.user?.role || 'FREE_MEMBER',
          accountType: response.user?.accountType || formData.accountType
        };

        setAuthenticationState(userData, response.token || 'verified-token');

        // Proceed to completion step
        nextStep();
      } else {
        if (timeLeft <= 0) {
          setVerificationError(ERROR_MESSAGES.OTP_EXPIRED);
        } else {
          setVerificationError(response.message || ERROR_MESSAGES.OTP_INVALID);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('timeout') || error.message.includes('network')) {
          setNetworkError(ERROR_MESSAGES.NETWORK_ERROR);
        } else {
          setVerificationError(ERROR_MESSAGES.UNKNOWN_ERROR);
        }
      } else {
        setVerificationError(ERROR_MESSAGES.UNKNOWN_ERROR);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Verify Your Email
        </h1>
        <p className="text-gray-600 mb-2">
          We've sent a 6-digit verification code to:
        </p>
        <p className="text-sm font-medium text-gray-900 bg-gray-100 px-3 py-1 rounded-lg inline-block">
          {email}
        </p>
      </div>

      {/* Success Message */}
      {resendSuccess && (
        <div className="mb-6">
          <SuccessMessage
            message="Verification code sent successfully! Please check your email."
            onDismiss={() => setResendSuccess(false)}
          />
        </div>
      )}

      {/* Error Messages */}
      {(verificationError || networkError) && (
        <div className="mb-6">
          <ErrorDisplay
            error={verificationError || networkError}
            onRetry={networkError ? handleResendEmail : undefined}
            onDismiss={() => {
              setVerificationError('');
              setNetworkError('');
            }}
          />
        </div>
      )}

      {/* Attempt Warning */}
      {attemptCount >= 3 && attemptCount < maxAttempts && (
        <div className="mb-6">
          <ErrorDisplay
            error={`Warning: ${maxAttempts - attemptCount} attempts remaining before account is temporarily locked.`}
          />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* OTP Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
            Enter Verification Code
          </label>
          <div className="flex justify-center space-x-2 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  if (el) inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`
                  w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg
                  focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors
                  ${digit ? 'border-orange-300 bg-orange-50' : 'border-gray-300'}
                  ${verificationError ? 'border-red-300' : ''}
                `}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>
          
          {errors.verificationCode && (
            <p className="text-sm text-red-600 text-center">{errors.verificationCode.message}</p>
          )}
          
          {verificationError && (
            <div className="flex items-center justify-center space-x-2 text-sm text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span>{verificationError}</span>
            </div>
          )}
        </div>

        {/* Timer and Resend */}
        <div className="text-center">
          {timeLeft > 0 ? (
            <p className="text-sm text-gray-600">
              Code expires in <span className="font-medium text-orange-600">{formatTime(timeLeft)}</span>
            </p>
          ) : (
            <p className="text-sm text-red-600">
              Verification code has expired
            </p>
          )}
          
          <div className="mt-3">
            {resendSuccess && (
              <div className="flex items-center justify-center space-x-2 text-sm text-green-600 mb-2">
                <CheckCircle className="w-4 h-4" />
                <span>Verification email sent successfully!</span>
              </div>
            )}
            
            <button
              type="button"
              onClick={handleResendEmail}
              disabled={isResending || timeLeft > 240} // Allow resend after 1 minute
              className={`
                text-sm font-medium transition-colors
                ${timeLeft > 240 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-orange-600 hover:text-orange-700'
                }
              `}
            >
              {isResending ? (
                <span className="flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </span>
              ) : (
                'Resend verification email'
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          text="Verify Email"
          variant="filled"
          size="medium"
          disabled={otp.join('').length !== 6 || isVerifying}
          loading={isVerifying}
          className="w-full py-3"
        />

        {/* Back Button */}
        <div className="text-center">
          <Button
            type="button"
            text="Back"
            variant="outline"
            size="medium"
            onClick={previousStep}
            disabled={isLoading || isVerifying}
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
            className="px-6 py-2"
          />
        </div>
      </form>

      {/* Help Text */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          Didn't receive the email? Check your spam folder or contact support.
        </p>
      </div>
    </div>
  );
};

export default VerificationStep;
