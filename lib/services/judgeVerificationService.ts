// Judge Application Verification Service
import apiClient from './apiClient';

export interface JudgeApplicationData {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  state: string;
  education: string;
  experience: string;
  motivation: string;
  documents?: File | null;
  profileImage?: File | null;
  status: 'submitted' | 'verified' | 'approved' | 'rejected';
  verification_token?: string;
  created_at: string;
  updated_at: string;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
  application?: JudgeApplicationData;
  verification_token?: string;
}

export interface EmailVerificationData {
  email: string;
  verification_token: string;
}

// Submit judge application and trigger email verification
export const submitJudgeApplication = async (applicationData: any): Promise<VerificationResponse> => {
  try {
    const response = await apiClient.post('/api/judge-apply/submit', applicationData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.data;
  } catch (error: any) {
    console.error('Judge application submission error:', error);
    throw new Error(error.response?.data?.message || 'Failed to submit application');
  }
};

// Send verification email to judge applicant
export const sendVerificationEmail = async (email: string): Promise<VerificationResponse> => {
  try {
    const response = await apiClient.post('/api/judge-apply/send-verification', { email });
    return response.data;
  } catch (error: any) {
    console.error('Email verification error:', error);
    throw new Error(error.response?.data?.message || 'Failed to send verification email');
  }
};

// Verify email with token
export const verifyJudgeEmail = async (data: EmailVerificationData): Promise<VerificationResponse> => {
  try {
    const response = await apiClient.post('/api/judge-apply/verify-email', data);
    return response.data;
  } catch (error: any) {
    console.error('Email verification error:', error);
    throw new Error(error.response?.data?.message || 'Email verification failed');
  }
};

// Get application status by email
export const getApplicationStatus = async (email: string): Promise<JudgeApplicationData | null> => {
  try {
    const response = await apiClient.get(`/api/judge-apply/status/${email}`);
    return response.data.application;
  } catch (error: any) {
    console.error('Get application status error:', error);
    return null;
  }
};

// Resend verification email
export const resendVerificationEmail = async (email: string): Promise<VerificationResponse> => {
  try {
    const response = await apiClient.post('/api/judge-apply/resend-verification', { email });
    return response.data;
  } catch (error: any) {
    console.error('Resend verification error:', error);
    throw new Error(error.response?.data?.message || 'Failed to resend verification email');
  }
};

// Check if application exists and is verified
export const checkApplicationVerification = async (email: string): Promise<{
  exists: boolean;
  verified: boolean;
  application?: JudgeApplicationData;
}> => {
  try {
    const response = await apiClient.get(`/api/judge-apply/check-verification/${email}`);
    return response.data;
  } catch (error: any) {
    console.error('Check verification error:', error);
    return { exists: false, verified: false };
  }
};

// Generate signup link for verified judge
export const generateJudgeSignupLink = async (email: string): Promise<{
  signup_url: string;
  token: string;
}> => {
  try {
    const response = await apiClient.post('/api/judge-apply/generate-signup-link', { email });
    return response.data;
  } catch (error: any) {
    console.error('Generate signup link error:', error);
    throw new Error(error.response?.data?.message || 'Failed to generate signup link');
  }
};
