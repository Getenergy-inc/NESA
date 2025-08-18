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
    const response = await apiClient.post('/api/auths/login', credentials);
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
    
    const response = await apiClient.post('/api/auths/verify-otp', backendData);
    
    // Handle new backend response structure
    if (response.data.success && response.data.data) {
      return {
        message: response.data.message,
        token: response.data.data.tokens?.accessToken,
        user: response.data.data.user || response.data.data.profile
      };
    }
    
    // Fallback for legacy response format
    return response.data;
  } catch (error: unknown) {
    const message = extractErrorMessage(error, 'OTP verification failed');
    throw new Error(message);
  }
};

export const signup = async (userData: UserData): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post('/api/auths/signup', userData);
    
    // Handle new backend response structure
    if (response.data.success && response.data.data) {
      return {
        message: response.data.message,
        token: response.data.data.tokens?.accessToken,
        user: response.data.data.user
      };
    }
    
    // Fallback for legacy response format
    return response.data;
  } catch (error: unknown) {
    const message = extractErrorMessage(error, 'Registration failed');
    throw new Error(message);
  }
};

export const changePassword = async (data: ChangePasswordData): Promise<ChangePasswordResponse> => {
  try {
    const response = await apiClient.post('/api/auths/change-password', data);
    return response.data;
  } catch (error: unknown) {
    const message = extractErrorMessage(error, 'Password change failed');
    throw new Error(message);
  }
};

export const resetPassword = async (email: string): Promise<ResetPasswordResponse> => {
  try {
    const response = await apiClient.post('/api/auths/reset-password', { email });
    return response.data;
  } catch (error: unknown) {
    const message = extractErrorMessage(error, 'Failed to reset password');
    throw new Error(message);
  }
};

// Legacy signup flow - removed duplicate, using the comprehensive one below

// Send OTP for different purposes
export const sendOTP = async (email: string, purpose: 'LOGIN' | 'VERIFY_EMAIL' | 'PASSWORD_RESET' = 'LOGIN'): Promise<{ message: string }> => {
  try {
    let endpoint = '/api/auths/send-otp'; // Default for login
    
    // Use specific endpoints based on purpose
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

    // Call backend signup-flow endpoint
    const response = await apiClient.post('/auth/signup-flow', backendData);

    // Map backend response to frontend format
    return mapBackendResponseToFrontend(response);
  } catch (error) {
    console.error('Signup flow failed:', error);
    throw new Error(error instanceof Error ? error.message : 'Signup failed');
  }
};

// OTP verification for email verification
export const verifyOtp = async (email: string, otp: string, type: string = 'VERIFY_EMAIL'): Promise<any> => {
  try {
    const response = await apiClient.post('/auth/verify-otp', { email, otp, type });
    return response;
  } catch (error) {
    console.error('OTP verification failed:', error);
    throw error;
  }
};

// Resend OTP
export const resendOtp = async (email: string, type: string = 'VERIFY_EMAIL'): Promise<any> => {
  try {
    const response = await apiClient.post('/auth/send-otp', { email, type });
    return response;
  } catch (error) {
    console.error('Resend OTP failed:', error);
    throw error;
  }
};

// Check email availability
export const checkEmailAvailability = async (email: string): Promise<{ available: boolean }> => {
  try {
    const response = await apiClient.post('/auth/check-email', { email });
    return response.data;
  } catch (error) {
    // If email check fails, assume it's available (graceful degradation)
    console.warn('Email availability check failed:', error);
    return { available: true };
  }
};