// Application workflow service for role-based applications

import apiClient from './apiClient';

export type ApplicationType = 'JUDGE' | 'NRC_VOLUNTEER' | 'AMBASSADOR' | 'CHAPTER_LEADER';

export type ApplicationStatus = 
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'WITHDRAWN';

export interface ApplicationData {
  id?: string;
  userId: string;
  applicationType: ApplicationType;
  status: ApplicationStatus;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    city?: string;
  };
  professionalInfo: {
    currentPosition: string;
    organization: string;
    yearsOfExperience: number;
    educationLevel: string;
    fieldOfExpertise: string[];
    linkedinProfile?: string;
    resume?: File | string;
  };
  motivation: {
    whyApply: string;
    relevantExperience: string;
    timeCommitment: string;
    additionalInfo?: string;
  };
  references?: {
    name: string;
    position: string;
    organization: string;
    email: string;
    phone: string;
  }[];
  documents?: {
    type: string;
    name: string;
    url: string;
  }[];
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewComments?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApplicationResponse {
  success: boolean;
  message: string;
  data?: {
    application: ApplicationData;
    nextSteps?: string[];
  };
}

export interface ApplicationListResponse {
  success: boolean;
  message: string;
  data?: {
    applications: ApplicationData[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

class ApplicationService {
  // Submit new application
  async submitApplication(applicationData: Omit<ApplicationData, 'id' | 'status' | 'submittedAt'>): Promise<ApplicationResponse> {
    try {
      const response = await apiClient.post('/applications/submit', {
        ...applicationData,
        status: 'SUBMITTED',
        submittedAt: new Date().toISOString()
      });
      
      return {
        success: true,
        message: 'Application submitted successfully',
        data: response.data
      };
    } catch (error) {
      console.error('Application submission failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Application submission failed'
      };
    }
  }

  // Save application as draft
  async saveDraft(applicationData: Partial<ApplicationData>): Promise<ApplicationResponse> {
    try {
      const response = await apiClient.post('/applications/draft', {
        ...applicationData,
        status: 'DRAFT'
      });
      
      return {
        success: true,
        message: 'Draft saved successfully',
        data: response.data
      };
    } catch (error) {
      console.error('Draft save failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to save draft'
      };
    }
  }

  // Get user's applications
  async getUserApplications(userId: string): Promise<ApplicationListResponse> {
    try {
      const response = await apiClient.get(`/applications/user/${userId}`);
      
      return {
        success: true,
        message: 'Applications retrieved successfully',
        data: response.data
      };
    } catch (error) {
      console.error('Failed to get applications:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to retrieve applications'
      };
    }
  }

  // Get application by ID
  async getApplication(applicationId: string): Promise<ApplicationResponse> {
    try {
      const response = await apiClient.get(`/applications/${applicationId}`);
      
      return {
        success: true,
        message: 'Application retrieved successfully',
        data: response.data
      };
    } catch (error) {
      console.error('Failed to get application:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to retrieve application'
      };
    }
  }

  // Update application
  async updateApplication(applicationId: string, updates: Partial<ApplicationData>): Promise<ApplicationResponse> {
    try {
      const response = await apiClient.put(`/applications/${applicationId}`, updates);
      
      return {
        success: true,
        message: 'Application updated successfully',
        data: response.data
      };
    } catch (error) {
      console.error('Application update failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Application update failed'
      };
    }
  }

  // Withdraw application
  async withdrawApplication(applicationId: string, reason?: string): Promise<ApplicationResponse> {
    try {
      const response = await apiClient.put(`/applications/${applicationId}/withdraw`, { reason });
      
      return {
        success: true,
        message: 'Application withdrawn successfully',
        data: response.data
      };
    } catch (error) {
      console.error('Application withdrawal failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Application withdrawal failed'
      };
    }
  }

  // Upload document
  async uploadDocument(applicationId: string, file: File, documentType: string): Promise<ApplicationResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', documentType);
      formData.append('applicationId', applicationId);

      const response = await apiClient.post('/applications/upload-document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return {
        success: true,
        message: 'Document uploaded successfully',
        data: response.data
      };
    } catch (error) {
      console.error('Document upload failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Document upload failed'
      };
    }
  }

  // Get application requirements for a specific type
  async getApplicationRequirements(applicationType: ApplicationType): Promise<any> {
    try {
      const response = await apiClient.get(`/applications/requirements/${applicationType}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get requirements:', error);
      throw error;
    }
  }

  // Check application eligibility
  async checkEligibility(userId: string, applicationType: ApplicationType): Promise<any> {
    try {
      const response = await apiClient.get(`/applications/eligibility/${applicationType}?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Eligibility check failed:', error);
      throw error;
    }
  }
}

// Application validation utilities
export const validateApplicationData = (data: Partial<ApplicationData>, applicationType: ApplicationType): string[] => {
  const errors: string[] = [];

  // Common validations
  if (!data.personalInfo?.fullName) errors.push('Full name is required');
  if (!data.personalInfo?.email) errors.push('Email is required');
  if (!data.personalInfo?.phone) errors.push('Phone number is required');
  if (!data.personalInfo?.country) errors.push('Country is required');
  if (!data.personalInfo?.state) errors.push('State is required');

  if (!data.professionalInfo?.currentPosition) errors.push('Current position is required');
  if (!data.professionalInfo?.organization) errors.push('Organization is required');
  if (!data.professionalInfo?.yearsOfExperience) errors.push('Years of experience is required');
  if (!data.professionalInfo?.educationLevel) errors.push('Education level is required');

  if (!data.motivation?.whyApply) errors.push('Motivation for applying is required');
  if (!data.motivation?.relevantExperience) errors.push('Relevant experience is required');
  if (!data.motivation?.timeCommitment) errors.push('Time commitment information is required');

  // Type-specific validations
  switch (applicationType) {
    case 'JUDGE':
      if (!data.professionalInfo?.fieldOfExpertise?.length) {
        errors.push('Field of expertise is required for judge applications');
      }
      if ((data.professionalInfo?.yearsOfExperience || 0) < 5) {
        errors.push('Minimum 5 years of experience required for judge applications');
      }
      break;

    case 'NRC_VOLUNTEER':
      if (!data.professionalInfo?.fieldOfExpertise?.length) {
        errors.push('Research expertise is required for NRC volunteer applications');
      }
      break;

    case 'AMBASSADOR':
      if (!data.motivation?.relevantExperience) {
        errors.push('Community engagement experience is required for ambassador applications');
      }
      break;
  }

  return errors;
};

// Get application status display info
export const getApplicationStatusInfo = (status: ApplicationStatus) => {
  const statusInfo = {
    'DRAFT': { color: 'gray', label: 'Draft', description: 'Application is being prepared' },
    'SUBMITTED': { color: 'blue', label: 'Submitted', description: 'Application has been submitted for review' },
    'UNDER_REVIEW': { color: 'yellow', label: 'Under Review', description: 'Application is being reviewed by our team' },
    'APPROVED': { color: 'green', label: 'Approved', description: 'Application has been approved' },
    'REJECTED': { color: 'red', label: 'Rejected', description: 'Application was not approved' },
    'WITHDRAWN': { color: 'gray', label: 'Withdrawn', description: 'Application was withdrawn by applicant' }
  };

  return statusInfo[status] || statusInfo['DRAFT'];
};

export const applicationService = new ApplicationService();
export default applicationService;
