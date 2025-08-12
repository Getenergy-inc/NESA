// authService.ts
import apiClient from './apiClient';

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
    const response = await apiClient.post('/api/auths/verify-otp', data);
    return response.data;
  } catch (error: unknown) {
    const message = extractErrorMessage(error, 'OTP verification failed');
    throw new Error(message);
  }
};

export const signup = async (userData: UserData): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post('/api/auths/signup', userData);
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