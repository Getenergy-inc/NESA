// Error types for NESA-Africa application

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface FormError {
  type: 'validation' | 'network' | 'server' | 'timeout';
  message: string;
  details?: ValidationError[];
  code?: string;
}

export interface AuthError {
  type: 'invalid_credentials' | 'account_not_found' | 'account_locked' | 'otp_invalid' | 'otp_expired' | 'too_many_attempts' | 'network_error' | 'timeout';
  message: string;
  code?: string;
  retryAfter?: number; // seconds
}

export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: any;
}

export interface NetworkError {
  type: 'timeout' | 'connection_failed' | 'server_error';
  message: string;
  originalError?: Error;
}

// Error message constants
export const ERROR_MESSAGES = {
  // Validation errors
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long',
  PASSWORD_WEAK: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  INVALID_FILE_TYPE: 'Please upload a valid file type',
  FILE_TOO_LARGE: 'File size must be less than 5MB',
  TERMS_NOT_ACCEPTED: 'You must accept the terms and conditions',
  PRIVACY_NOT_ACCEPTED: 'You must accept the privacy policy',
  
  // Authentication errors
  INVALID_CREDENTIALS: 'Invalid email or password. Please check your credentials and try again.',
  ACCOUNT_NOT_FOUND: 'No account found with this email address.',
  ACCOUNT_LOCKED: 'Your account has been temporarily locked due to multiple failed login attempts.',
  OTP_INVALID: 'Invalid verification code. Please check the code and try again.',
  OTP_EXPIRED: 'Verification code has expired. Please request a new code.',
  TOO_MANY_ATTEMPTS: 'Too many failed attempts. Please try again later.',
  
  // Network errors
  NETWORK_ERROR: 'Network error. Please check your internet connection and try again.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  
  // General errors
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
  FORM_SUBMISSION_FAILED: 'Failed to submit form. Please try again.',
  DATA_LOAD_FAILED: 'Failed to load data. Please refresh the page.',
} as const;

// Error severity levels
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface ErrorWithSeverity extends FormError {
  severity: ErrorSeverity;
  timestamp: Date;
  userId?: string;
  context?: Record<string, any>;
}

// Helper functions for error handling
export const createValidationError = (field: string, message: string, code?: string): ValidationError => ({
  field,
  message,
  code
});

export const createFormError = (
  type: FormError['type'], 
  message: string, 
  details?: ValidationError[], 
  code?: string
): FormError => ({
  type,
  message,
  details,
  code
});

export const createAuthError = (
  type: AuthError['type'], 
  message: string, 
  code?: string, 
  retryAfter?: number
): AuthError => ({
  type,
  message,
  code,
  retryAfter
});

// Error classification helpers
export const isValidationError = (error: any): error is ValidationError => {
  return error && typeof error.field === 'string' && typeof error.message === 'string';
};

export const isFormError = (error: any): error is FormError => {
  return error && typeof error.type === 'string' && typeof error.message === 'string';
};

export const isAuthError = (error: any): error is AuthError => {
  return error && typeof error.type === 'string' && typeof error.message === 'string';
};

export const isNetworkError = (error: any): error is NetworkError => {
  return error && typeof error.type === 'string' && typeof error.message === 'string';
};
