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

// ----------------------
// Legacy-compatible APIs
// ----------------------

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
    // New route under v1
    const response = await apiClient.post('/api/v1/auth/change-password', data);
    return response.data;
  } catch (error: unknown) {
    const message = extractErrorMessage(error, 'Password change failed');
    throw new Error(message);
  }
};

// Kept for backward compatibility: now requests a reset email/token (token-based flow)
export const resetPassword = async (email: string): Promise<ResetPasswordResponse> => {
  try {
    const response = await apiClient.post('/api/v1/auth/request-password-reset', { email });
    return response.data;
  } catch (error: unknown) {
    const message = extractErrorMessage(error, 'Failed to request password reset');
    throw new Error(message);
  }
};

// ----------------------
// Unified OTP helpers
// ----------------------

// Send OTP for different purposes (maps to correct endpoints)
export const sendOTP = async (
  email: string,
  purpose: 'LOGIN' | 'VERIFY_EMAIL' | 'PASSWORD_RESET' = 'LOGIN'
): Promise<{ message: string }> => {
  try {
    let endpoint = '/api/v1/auth/otp/send-login';

    if (purpose === 'VERIFY_EMAIL') {
      endpoint = '/api/v1/auth/otp/send-verify-email';
    } else if (purpose === 'PASSWORD_RESET') {
      endpoint = '/api/v1/auth/password-reset/send-otp';
    }

    const response = await apiClient.post(endpoint, { email });

    if (response.data?.success) {
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

// ----------------------
// Comprehensive signup flow (new)
// ----------------------
export const signupFlow = async (userData: SignupFormData): Promise<SignupResponse> => {
  try {
    // Map frontend data to backend format
    const backendData = mapFormDataToBackend(userData);

    // Call backend signup-flow endpoint (v1)
    const response = await apiClient.post('/api/v1/auth/signup-flow', backendData);

    // Map backend response to frontend format
    return mapBackendResponseToFrontend(response);
  } catch (error) {
    console.error('Signup flow failed:', error);
    throw new Error(error instanceof Error ? error.message : 'Signup failed');
  }
};

// OTP verification for email verification or login (new unified endpoint)
export const verifyOtp = async (
  email: string,
  otp: string,
  type: 'VERIFY_EMAIL' | 'LOGIN' | 'PASSWORD_RESET' = 'VERIFY_EMAIL'
): Promise<any> => {
  try {
    const response = await apiClient.post('/api/v1/auth/otp/verify', {
      email,
      code: otp,
      purpose: type,
    });
    return response.data;
  } catch (error) {
    console.error('OTP verification failed:', error);
    throw error;
  }
};

// Resend OTP mapped to new endpoints
export const resendOtp = async (
  email: string,
  type: 'VERIFY_EMAIL' | 'LOGIN' | 'PASSWORD_RESET' = 'VERIFY_EMAIL'
): Promise<any> => {
  try {
    let endpoint = '/api/v1/auth/otp/send-verify-email';
    if (type === 'LOGIN') endpoint = '/api/v1/auth/otp/send-login';
    if (type === 'PASSWORD_RESET') endpoint = '/api/v1/auth/password-reset/send-otp';

    const response = await apiClient.post(endpoint, { email });
    return response.data;
  } catch (error) {
    console.error('Resend OTP failed:', error);
    throw error;
  }
};

// Check email availability (no backend route implemented yet)
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

// ----------------------
// Additional minimal wrappers (new)
// ----------------------

export const logout = async (): Promise<{ message?: string }> => {
  const response = await apiClient.post('/api/v1/auth/logout');
  return response.data;
};

export const refreshToken = async (): Promise<any> => {
  // Requires CSRF cookie/header set by backend at /csrf
  const response = await apiClient.post('/api/v1/auth/refresh-token');
  return response.data;
};

export const verifyEmail = async (token: string): Promise<any> => {
  const response = await apiClient.post('/api/v1/auth/verify-email', { token });
  return response.data;
};

export const resendVerification = async (email: string): Promise<any> => {
  const response = await apiClient.post('/api/v1/auth/resend-verification', { email });
  return response.data;
};

export const getProfile = async (): Promise<any> => {
  const response = await apiClient.get('/api/v1/auth/profile');
  return response.data;
};

export const updateProfile = async (data: Record<string, any>): Promise<any> => {
  const response = await apiClient.put('/api/v1/auth/profile', data);
  return response.data;
};

export const deleteAccount = async (password: string): Promise<any> => {
  // Axios supports sending a body with DELETE via the `data` option
  const response = await apiClient.delete('/api/v1/auth/account', { data: { password } });
  return response.data;
};

// ----------------------
// Password reset helpers (new)
// ----------------------

export const requestPasswordReset = async (email: string): Promise<{ message?: string }> => {
  const response = await apiClient.post('/api/v1/auth/request-password-reset', { email });
  return response.data;
};

export const confirmPasswordResetOtp = async (
  email: string,
  code: string,
  newPassword: string
): Promise<{ message?: string }> => {
  const response = await apiClient.post('/api/v1/auth/password-reset/confirm-otp', {
    email,
    code,
    newPassword,
  });
  return response.data;
};