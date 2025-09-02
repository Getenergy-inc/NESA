// authService.ts
import apiClient from './apiClient';
import { SignupFormData, SignupResponse } from '@/lib/types/signup';
import { mapFormDataToBackend, mapBackendResponseToFrontend } from '@/lib/utils/signupMapping';

interface Credentials {
  email: string;
  password: string;
}

interface OTPData {
  email: string;
  otp: string;
}

interface UserData {
  fullName: string;
  nomineeType: string;
  email: string;
  password: string;
  role: string;
  state: string;
  region: string;
  phoneNumber: string;
  image?: string;
  [key: string]: any;
}

interface AuthResponse {
  message: string;
  token?: string;
  user: {
    id: string;
    email: string;
    name?: string;
    [key: string]: any;
  };
}

interface ChangePasswordData {
  email: string;
  oldPassword: string;
  newPassword: string;
}

interface ChangePasswordResponse {
  status: number;
  message: string;
}

interface ResetPasswordResponse {
  status: number;
  message: string;
}

export const login = async (credentials: Credentials): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post('/api/v1/auth/login', credentials);
    
    // Handle enhanced response structure
    if (response.data.success && response.data.data) {
      return {
        message: response.data.message,
        token: response.data.data.tokens?.accessToken,
        user: response.data.data.user
      };
    }
    
    return response.data;
  } catch (error: unknown) {
    const message = extractErrorMessage(error, 'Invalid email or password');
    throw new Error(message);
  }
};

export const verifyOTP = async (data: OTPData): Promise<AuthResponse> => {
  try {
    // Transform frontend data to match backend expectations
    const backendData = {
      email: data.email,
      code: data.otp, // Backend expects 'code' not 'otp'
      purpose: 'LOGIN' // Default purpose for login flow
    };
    
    const response = await apiClient.post('/api/v1/auth/otp/verify', backendData);
    
    // Handle enhanced response structure
    if (response.data.success && response.data.data) {
      return {
        message: response.data.message,
        token: response.data.data.tokens?.accessToken,
        user: response.data.data.user || response.data.data.profile
      };
    }
    
    return response.data;
  } catch (error: unknown) {
    const message = extractErrorMessage(error, 'OTP verification failed');
    throw new Error(message);
  }
};

export const signup = async (userData: UserData): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post('/api/v1/auth/signup', userData);
    
    // Handle enhanced response structure
    if (response.data.success && response.data.data) {
      return {
        message: response.data.message,
        token: response.data.data.tokens?.accessToken,
        user: response.data.data.user
      };
    }
    
    return response.data;
  } catch (error: unknown) {
    const message = extractErrorMessage(error, 'Registration failed');
    throw new Error(message);
  }
};

export const changePassword = async (data: ChangePasswordData): Promise<ChangePasswordResponse> => {
  try {
    const response = await apiClient.post('/api/v1/auth/password/change', data);
    return response.data;
  } catch (error: unknown) {
    const message = extractErrorMessage(error, 'Password change failed');
    throw new Error(message);
  }
};

export const resetPassword = async (email: string): Promise<ResetPasswordResponse> => {
  try {
    const response = await apiClient.post('/api/v1/auth/password-reset/request', { email });
    return response.data;
  } catch (error: unknown) {
    const message = extractErrorMessage(error, 'Failed to reset password');
    throw new Error(message);
  }
};

// Legacy signup flow - removed duplicate, using the comprehensive one below

// Send OTP for different purposes - using enhanced endpoints
export const sendOTP = async (email: string, purpose: 'LOGIN' | 'VERIFY_EMAIL' | 'PASSWORD_RESET' = 'LOGIN'): Promise<{ message: string }> => {
  try {
    // Use specific enhanced endpoints based on purpose
    let endpoint = '/api/v1/auth/otp/send-login'; // Default for login
    
    if (purpose === 'VERIFY_EMAIL') {
      endpoint = '/api/v1/auth/otp/send-verify-email';
    } else if (purpose === 'PASSWORD_RESET') {
      endpoint = '/api/v1/auth/password-reset/send-otp';
    }
    
    const response = await apiClient.post(endpoint, { email });
    
    if (response.data.success) {
      return { message: response.data.message };
    }
    
    return response.data;
  } catch (error: unknown) {
    const message = extractErrorMessage(error, 'Failed to send OTP');
    throw new Error(message);
  }
};

// Get enhanced user profile with wallet and chapter data
export const getMe = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/api/v1/auth/me');
    
    if (response.data.success) {
      return response.data.data;
    }
    
    return response.data;
  } catch (error: unknown) {
    const message = extractErrorMessage(error, 'Failed to fetch profile');
    throw new Error(message);
  }
};

// Helper function to safely extract error messages
const extractErrorMessage = (error: unknown, fallback: string): string => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as any).response?.data?.message === 'string'
  ) {
    return (error as any).response.data.message;
  }
  if (error instanceof Error) return error.message;
  return fallback;
};

// Comprehensive signup flow for NESA platform
export const signupFlow = async (userData: SignupFormData): Promise<SignupResponse> => {
  try {
    // Map frontend data to backend format
    const backendData = mapFormDataToBackend(userData);

    // Call backend signup-flow endpoint with correct path
    const response = await apiClient.post('/api/v1/auth/signup-flow', backendData);

    // Map backend response to frontend format
    return mapBackendResponseToFrontend(response);
  } catch (error) {
    console.error('Signup flow failed:', error);
    throw new Error(error instanceof Error ? error.message : 'Signup failed');
  }
};

// OTP verification for email verification - using enhanced endpoint
export const verifyOtp = async (email: string, otp: string, purpose: string = 'VERIFY_EMAIL'): Promise<any> => {
  try {
    const response = await apiClient.post('/api/v1/auth/otp/verify', { 
      email, 
      code: otp, // Backend expects 'code' not 'otp'
      purpose 
    });
    return response;
  } catch (error) {
    console.error('OTP verification failed:', error);
    throw error;
  }
};

// Resend OTP - using enhanced endpoint
export const resendOtp = async (email: string, purpose: string = 'VERIFY_EMAIL'): Promise<any> => {
  try {
    // Select the appropriate endpoint based on purpose
    let endpoint = '/api/v1/auth/otp/send-login'; // Default for login
    
    if (purpose === 'VERIFY_EMAIL') {
      endpoint = '/api/v1/auth/otp/send-verify-email';
    } else if (purpose === 'PASSWORD_RESET') {
      endpoint = '/api/v1/auth/password-reset/send-otp';
    }
    
    const response = await apiClient.post(endpoint, { email });
    return response;
  } catch (error) {
    console.error('Resend OTP failed:', error);
    throw error;
  }
};

// Check email availability - using enhanced endpoint
export const checkEmailAvailability = async (email: string): Promise<{ available: boolean }> => {
  try {
    const response = await apiClient.post('/api/v1/auth/check-email', { email });
    return response.data;
  } catch (error) {
    // If email check fails, assume it's available (graceful degradation)
    console.warn('Email availability check failed:', error);
    return { available: true };
  }
};