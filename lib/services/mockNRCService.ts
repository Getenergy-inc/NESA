// Mock NRC Service for frontend-only demonstration
// This simulates backend functionality using localStorage

import {
  sendApplicationSubmittedNotification,
  sendApplicationApprovedNotification,
  sendApplicationRejectedNotification,
  sendNomineeSubmittedNotification
} from './mockNotificationService';

export interface NRCApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  motivation: string;
  experience: string;
  availability: string;
  skills: string[];
  commitment: boolean;
  terms: boolean;
  cv?: File;
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewDate?: string;
  reviewNotes?: string;
}

export interface NRCVolunteer {
  id: string;
  applicationId: string;
  fullName: string;
  email: string;
  country: string;
  approvalDate: string;
  nomineesUploaded: number;
  targetNominees: number;
  completionRate: number;
  lastActive: string;
  status: 'active' | 'inactive';
}

export interface NomineeProfile {
  id: string;
  volunteerId: string;
  fullName: string;
  organizationName?: string;
  country: string;
  region: string;
  email?: string;
  phone?: string;
  website?: string;
  linkedinProfile?: string;
  awardCategory: string;
  subcategory: string;
  achievementSummary: string;
  impactMetrics: string;
  beneficiariesCount?: string;
  yearsOfImpact?: string;
  sdgAlignment: string[];
  agendaAlignment: string;
  esgAlignment: string;
  verificationLinks?: string;
  mediaLinks?: string;
  additionalNotes?: string;
  supportingDocuments?: File[];
  profileImage?: File;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  dateCreated: string;
  completionScore: number;
}

export interface MockServiceResponse<T> {
  success: boolean;
  data?: T;
  message: string;
}

// Storage keys
const STORAGE_KEYS = {
  APPLICATIONS: 'nrc_applications',
  VOLUNTEERS: 'nrc_volunteers',
  NOMINEES: 'nrc_nominees',
  CURRENT_USER_NRC_STATUS: 'current_user_nrc_status'
};

// Utility functions
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const mockDelay = (ms: number = 1000): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// Storage helpers
const getFromStorage = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error reading from localStorage key ${key}:`, error);
    return [];
  }
};

const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage key ${key}:`, error);
  }
};

// Application Management
export const submitNRCApplication = async (applicationData: Omit<NRCApplication, 'id' | 'applicationDate' | 'status'>): Promise<MockServiceResponse<NRCApplication>> => {
  await mockDelay(1500);
  
  try {
    const applications = getFromStorage<NRCApplication>(STORAGE_KEYS.APPLICATIONS);
    
    // Check if email already exists
    const existingApplication = applications.find(app => app.email === applicationData.email);
    if (existingApplication) {
      return {
        success: false,
        message: 'An application with this email already exists.'
      };
    }
    
    const newApplication: NRCApplication = {
      ...applicationData,
      id: generateId(),
      applicationDate: new Date().toISOString(),
      status: 'pending'
    };
    
    applications.push(newApplication);
    saveToStorage(STORAGE_KEYS.APPLICATIONS, applications);

    // Send notification
    sendApplicationSubmittedNotification(newApplication.email, newApplication.fullName);

    return {
      success: true,
      data: newApplication,
      message: 'Application submitted successfully!'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to submit application. Please try again.'
    };
  }
};

// Get all applications (for admin)
export const getAllNRCApplications = async (): Promise<MockServiceResponse<NRCApplication[]>> => {
  await mockDelay(500);
  
  try {
    const applications = getFromStorage<NRCApplication>(STORAGE_KEYS.APPLICATIONS);
    return {
      success: true,
      data: applications,
      message: 'Applications retrieved successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to retrieve applications'
    };
  }
};

// Admin approval/rejection
export const reviewNRCApplication = async (
  applicationId: string, 
  action: 'approve' | 'reject', 
  reviewNotes?: string,
  reviewedBy: string = 'Admin'
): Promise<MockServiceResponse<NRCApplication>> => {
  await mockDelay(1000);
  
  try {
    const applications = getFromStorage<NRCApplication>(STORAGE_KEYS.APPLICATIONS);
    const applicationIndex = applications.findIndex(app => app.id === applicationId);
    
    if (applicationIndex === -1) {
      return {
        success: false,
        message: 'Application not found'
      };
    }
    
    const application = applications[applicationIndex];
    application.status = action === 'approve' ? 'approved' : 'rejected';
    application.reviewedBy = reviewedBy;
    application.reviewDate = new Date().toISOString();
    application.reviewNotes = reviewNotes;
    
    applications[applicationIndex] = application;
    saveToStorage(STORAGE_KEYS.APPLICATIONS, applications);
    
    // If approved, create volunteer record
    if (action === 'approve') {
      const volunteers = getFromStorage<NRCVolunteer>(STORAGE_KEYS.VOLUNTEERS);
      const newVolunteer: NRCVolunteer = {
        id: generateId(),
        applicationId: application.id,
        fullName: application.fullName,
        email: application.email,
        country: application.country,
        approvalDate: new Date().toISOString(),
        nomineesUploaded: 0,
        targetNominees: 200,
        completionRate: 0,
        lastActive: 'Never',
        status: 'active'
      };
      
      volunteers.push(newVolunteer);
      saveToStorage(STORAGE_KEYS.VOLUNTEERS, volunteers);

      // Send approval notification
      sendApplicationApprovedNotification(application.email, application.fullName);
    } else {
      // Send rejection notification
      sendApplicationRejectedNotification(application.email, application.fullName);
    }

    return {
      success: true,
      data: application,
      message: `Application ${action}d successfully`
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to ${action} application`
    };
  }
};

// Get all volunteers (for admin)
export const getAllNRCVolunteers = async (): Promise<MockServiceResponse<NRCVolunteer[]>> => {
  await mockDelay(500);
  
  try {
    const volunteers = getFromStorage<NRCVolunteer>(STORAGE_KEYS.VOLUNTEERS);
    return {
      success: true,
      data: volunteers,
      message: 'Volunteers retrieved successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to retrieve volunteers'
    };
  }
};

// Check user NRC status
export const checkUserNRCStatus = async (email: string): Promise<MockServiceResponse<{
  hasApplication: boolean;
  application?: NRCApplication;
  isApproved: boolean;
  volunteer?: NRCVolunteer;
}>> => {
  await mockDelay(300);
  
  try {
    const applications = getFromStorage<NRCApplication>(STORAGE_KEYS.APPLICATIONS);
    const volunteers = getFromStorage<NRCVolunteer>(STORAGE_KEYS.VOLUNTEERS);
    
    const application = applications.find(app => app.email === email);
    const volunteer = volunteers.find(vol => vol.email === email);
    
    return {
      success: true,
      data: {
        hasApplication: !!application,
        application,
        isApproved: application?.status === 'approved',
        volunteer
      },
      message: 'Status checked successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to check status'
    };
  }
};

// Nominee management
export const submitNomineeProfile = async (
  volunteerId: string,
  nomineeData: Omit<NomineeProfile, 'id' | 'volunteerId' | 'status' | 'dateCreated' | 'completionScore'>
): Promise<MockServiceResponse<NomineeProfile>> => {
  await mockDelay(1500);
  
  try {
    const nominees = getFromStorage<NomineeProfile>(STORAGE_KEYS.NOMINEES);
    
    const newNominee: NomineeProfile = {
      ...nomineeData,
      id: generateId(),
      volunteerId,
      status: 'submitted',
      dateCreated: new Date().toISOString(),
      completionScore: Math.floor(Math.random() * 20) + 80 // Random score between 80-100
    };
    
    nominees.push(newNominee);
    saveToStorage(STORAGE_KEYS.NOMINEES, nominees);
    
    // Update volunteer stats
    const volunteers = getFromStorage<NRCVolunteer>(STORAGE_KEYS.VOLUNTEERS);
    const volunteerIndex = volunteers.findIndex(vol => vol.id === volunteerId);
    if (volunteerIndex !== -1) {
      volunteers[volunteerIndex].nomineesUploaded += 1;
      volunteers[volunteerIndex].completionRate = (volunteers[volunteerIndex].nomineesUploaded / volunteers[volunteerIndex].targetNominees) * 100;
      volunteers[volunteerIndex].lastActive = new Date().toISOString();
      saveToStorage(STORAGE_KEYS.VOLUNTEERS, volunteers);

      // Send notification to volunteer
      const volunteer = volunteers[volunteerIndex];
      sendNomineeSubmittedNotification(volunteer.email, newNominee.fullName);
    }

    return {
      success: true,
      data: newNominee,
      message: 'Nominee profile submitted successfully!'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to submit nominee profile'
    };
  }
};

// Get nominees for a volunteer
export const getVolunteerNominees = async (volunteerId: string): Promise<MockServiceResponse<NomineeProfile[]>> => {
  await mockDelay(500);
  
  try {
    const nominees = getFromStorage<NomineeProfile>(STORAGE_KEYS.NOMINEES);
    const volunteerNominees = nominees.filter(nominee => nominee.volunteerId === volunteerId);
    
    return {
      success: true,
      data: volunteerNominees,
      message: 'Nominees retrieved successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to retrieve nominees'
    };
  }
};

// Initialize with sample data
export const initializeSampleData = (): void => {
  const applications = getFromStorage<NRCApplication>(STORAGE_KEYS.APPLICATIONS);
  
  if (applications.length === 0) {
    const sampleApplications: NRCApplication[] = [
      {
        id: 'app-1',
        fullName: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+234-123-456-7890',
        country: 'South Africa',
        motivation: 'Passionate about education reform in Africa and want to contribute to identifying outstanding leaders in the field.',
        experience: '5 years in educational research and policy development with focus on African education systems.',
        availability: 'Available full-time from July 15 - August 20, 2025',
        skills: ['Research & Data Collection', 'Academic Writing', 'Digital Tools'],
        commitment: true,
        terms: true,
        applicationDate: '2025-07-28T10:30:00Z',
        status: 'pending'
      },
      {
        id: 'app-2',
        fullName: 'Marie Dubois',
        email: 'marie.dubois@email.com',
        phone: '+221-987-654-3210',
        country: 'Senegal',
        motivation: 'Want to contribute to African education development and help identify impactful education leaders.',
        experience: 'PhD in Education Policy with 8 years experience in international development.',
        availability: 'Available part-time during the engagement period',
        skills: ['Research & Data Collection', 'Language Skills', 'Content Creation'],
        commitment: true,
        terms: true,
        applicationDate: '2025-07-27T14:15:00Z',
        status: 'pending'
      }
    ];
    
    saveToStorage(STORAGE_KEYS.APPLICATIONS, sampleApplications);
  }
};

// Initialize sample data on module load
if (typeof window !== 'undefined') {
  initializeSampleData();
}
