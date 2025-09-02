// Frontend to Backend data mapping utilities for NESA signup flow

import { SignupFormData } from '@/lib/types/signup';

// Map frontend account types to backend enum format
export function mapAccountType(frontendType: string): string {
  const mapping: Record<string, string> = {
    'Individual': 'INDIVIDUAL',
    'NGO': 'NGO',
    'Corporation': 'CORPORATION',
    'Government': 'GOVERNMENT',
    'School': 'SCHOOL',
    'Diaspora Group': 'DIASPORA_GROUP'
  };
  return mapping[frontendType] || frontendType;
}

// Map frontend intents to backend enum format
export function mapIntents(frontendIntents: string[]): string[] {
  const mapping: Record<string, string> = {
    'Vote or Nominate': 'VOTE_OR_NOMINATE',
    'Apply for Eduaid Scholarship': 'APPLY_FOR_EDUAID_SCHOLARSHIP',
    'Become Ambassador': 'BECOME_AMBASSADOR',
    'Join Webinar/Expo': 'JOIN_WEBINAR_EXPO',
    'Sponsor or CSR Partner': 'SPONSOR_OR_CSR_PARTNER',
    'Apply as Judge': 'APPLY_AS_JUDGE',
    'Join Local Chapter': 'JOIN_LOCAL_CHAPTER',
    'Join NESA Team': 'JOIN_NESA_TEAM',
    'Get Gala Ticket': 'GET_GALA_TICKET',
    'Donate': 'DONATE',
    'Apply as NRC Volunteer': 'APPLY_AS_NRC_VOLUNTEER'
  };
  
  return frontendIntents.map(intent => mapping[intent] || intent);
}

// Map frontend gender to backend enum format
export function mapGender(frontendGender: string): string {
  const mapping: Record<string, string> = {
    'Male': 'MALE',
    'Female': 'FEMALE',
    'Other': 'OTHER',
    'Prefer not to say': 'PREFER_NOT_TO_SAY'
  };
  return mapping[frontendGender] || frontendGender;
}

// Map frontend language to backend enum format
export function mapLanguage(frontendLanguage: string): string {
  // Languages are already in correct format (EN, FR, AR, PT)
  return frontendLanguage;
}

// Main mapping function to convert frontend form data to backend format
export function mapFormDataToBackend(frontendData: SignupFormData): any {
  const baseData = {
    email: frontendData.email,
    password: frontendData.password,
    country: frontendData.country,
    state: frontendData.state,
    accountType: mapAccountType(frontendData.accountType),
    intents: frontendData.intents ? mapIntents(frontendData.intents) : undefined,
    preferredLanguage: frontendData.preferredLanguage ? mapLanguage(frontendData.preferredLanguage) : 'EN'
  };

  // Add account-type specific fields
  if (frontendData.accountType === 'Individual') {
    return {
      ...baseData,
      fullName: frontendData.fullName,
      phoneNumber: frontendData.phoneNumber,
      gender: frontendData.gender ? mapGender(frontendData.gender) : undefined,
      dateOfBirth: frontendData.dateOfBirth
    };
  } else {
    // Organization data
    return {
      ...baseData,
      organizationName: frontendData.organizationName,
      registrationNumber: frontendData.registrationNumber,
      contactPersonName: frontendData.contactPersonName,
      contactEmail: frontendData.contactEmail,
      contactPhone: frontendData.contactPhone,
      organizationType: frontendData.organizationType
    };
  }
}

// Map backend response to frontend format
export function mapBackendResponseToFrontend(backendResponse: any): any {
  return {
    success: backendResponse.success,
    message: backendResponse.message,
    user: backendResponse.data?.user ? {
      id: backendResponse.data.user.id,
      email: backendResponse.data.user.email,
      role: backendResponse.data.user.role,
      accountType: backendResponse.data.user.accountType,
      isVerified: backendResponse.data.user.isVerified,
      fullName: backendResponse.data.user.fullName,
      firstName: backendResponse.data.user.firstName,
      lastName: backendResponse.data.user.lastName
    } : undefined,
    tokens: backendResponse.data?.tokens
  };
}

// Determine expected dashboard route based on role and intents
export function getDashboardRoute(role: string, intents?: string[]): string {
  // Map backend roles to frontend dashboard routes
  switch (role) {
    case 'AMBASSADOR':
      return '/ambassador/dashboard';
    case 'JUDGE':
      return '/judge/dashboard';
    case 'NRC_VOLUNTEER':
      return '/get-involved/nrc-volunteer/dashboard';
    case 'SPONSOR':
      return '/sponsor/dashboard';
    case 'VOLUNTEER':
      return '/volunteer/dashboard';
    case 'ADMIN':
    case 'SUPER_ADMIN':
      return '/admin/dashboard';
    case 'CHAPTER_LEADER':
      return '/chapter/dashboard';
    default:
      return '/member/dashboard';
  }
}

// Determine if an intent requires an application process
export function requiresApplication(intent: string): boolean {
  const applicationRequiredIntents = [
    'Apply as Judge',
    'Apply as NRC Volunteer',
    'Become Ambassador', // May require application in some cases
    'Join NESA Team' // May require application for certain positions
  ];

  return applicationRequiredIntents.includes(intent);
}

// Get application type for an intent
export function getApplicationType(intent: string): string | null {
  const intentToApplicationType: Record<string, string> = {
    'Apply as Judge': 'JUDGE',
    'Apply as NRC Volunteer': 'NRC_VOLUNTEER',
    'Become Ambassador': 'AMBASSADOR',
    'Join NESA Team': 'VOLUNTEER'
  };

  return intentToApplicationType[intent] || null;
}

// Determine post-signup actions based on user intents
export function getPostSignupActions(intents: string[]): Array<{
  type: 'application' | 'redirect' | 'notification';
  action: string;
  data?: any;
}> {
  const actions: Array<{
    type: 'application' | 'redirect' | 'notification';
    action: string;
    data?: any;
  }> = [];

  for (const intent of intents) {
    if (requiresApplication(intent)) {
      const applicationType = getApplicationType(intent);
      if (applicationType) {
        actions.push({
          type: 'application',
          action: 'start_application',
          data: {
            applicationType,
            intent,
            message: `Complete your ${intent.toLowerCase()} application to get started.`
          }
        });
      }
    } else {
      // Direct access intents
      switch (intent) {
        case 'Vote or Nominate':
          actions.push({
            type: 'redirect',
            action: '/vote',
            data: { message: 'You can now vote and nominate candidates!' }
          });
          break;
        case 'Sponsor or CSR Partner':
          actions.push({
            type: 'redirect',
            action: '/sponsor/packages',
            data: { message: 'Explore our sponsorship packages.' }
          });
          break;
        case 'Join Local Chapter':
          actions.push({
            type: 'redirect',
            action: '/chapters',
            data: { message: 'Find and join your local NESA chapter.' }
          });
          break;
        default:
          actions.push({
            type: 'notification',
            action: 'welcome',
            data: { message: `Welcome! You can now access ${intent.toLowerCase()} features.` }
          });
      }
    }
  }

  return actions;
}

// Validate that frontend data meets backend requirements
export function validateBackendRequirements(frontendData: SignupFormData): string[] {
  const errors: string[] = [];

  // Required fields for all account types
  if (!frontendData.email) errors.push('Email is required');
  if (!frontendData.password) errors.push('Password is required');
  if (!frontendData.country) errors.push('Country is required');
  if (!frontendData.state) errors.push('State is required');
  if (!frontendData.accountType) errors.push('Account type is required');

  // Individual-specific requirements
  if (frontendData.accountType === 'Individual') {
    if (!frontendData.fullName) errors.push('Full name is required for individual accounts');
  }

  // Organization-specific requirements
  if (frontendData.accountType !== 'Individual') {
    if (!frontendData.organizationName) errors.push('Organization name is required');
    if (!frontendData.contactPersonName) errors.push('Contact person name is required');
    if (!frontendData.contactEmail) errors.push('Contact email is required');
  }

  return errors;
}
