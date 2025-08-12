// Base nominee form interface
export interface BaseNomineeForm {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  country: string;
  stateRegion: string;
  gender?: 'M' | 'F' | 'Other';
  category: 'blue-garnet' | 'gold-certificate' | 'platinum-certificate';
  subcategory: string;
  summaryOfImpact: string;
  justification: string;
  photo?: File;
  supportingDocs?: File[];
  nominationSource: 'Internal' | 'External' | 'Self' | 'Staff';
  nominatedBy: string;
  nominatorEmail: string;
  nominatorPhone: string;
}

// Blue Garnet Awards (Lifetime Impact)
export interface BlueGarnetNominee extends BaseNomineeForm {
  yearOfImpact: string;
  lifeTimeAchievements: string[];
  legacyProjects: string[];
  publicRecognitions: string[];
  impactScope: 'National' | 'Regional' | 'Continental' | 'Global';
  sustainabilityMeasures: string;
}

// Gold Certificate Awards (Competitive)
export interface GoldCertificateNominee extends BaseNomineeForm {
  recentAchievements: string;
  measurableImpact: string;
  targetBeneficiaries: string;
  implementationPeriod: string;
  scalabilityPotential: string;
  innovationAspects: string;
  supportingEvidence: File[];
}

// Platinum Certificate (Institutions)
export interface PlatinumCertificateNominee extends BaseNomineeForm {
  affiliatedOrgSchool: string;
  organizationType: string;
  yearEstablished: string;
  institutionalAchievements: string[];
  partnerships: string[];
  governanceStructure: string;
  sustainabilityModel: string;
  beneficiaryReach: string;
}

// Form validation schemas
export const nomineeValidationMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must not exceed ${max} characters`,
  fileSize: 'File size must not exceed 10MB',
  fileType: 'File must be PNG, JPG, or PDF',
  achievements: 'Please add at least one achievement',
  url: 'Please enter a valid URL',
} as const;

// Award categories and subcategories
export const awardCategories = {
  'blue-garnet': {
    label: 'Africa Icon Blue Garnet Awards',
    description: 'Non-competitive, lifetime impact recognition',
    subcategories: [
      'Lifetime Achievement in Education',
      'Pioneer in Educational Innovation',
      'Legacy Builder in African Education',
      // Add more subcategories
    ]
  },
  'gold-certificate': {
    label: 'Gold Certificate Awards',
    description: 'Competitive awards with public voting',
    subcategories: [
      'Educational Innovation',
      'Community Impact',
      'Technology Integration',
      // Add more subcategories
    ]
  },
  'platinum-certificate': {
    label: 'Platinum Certificate of Recognition',
    description: 'Non-competitive institutional awards',
    subcategories: [
      'Educational Institution Excellence',
      'Corporate Education Initiative',
      'NGO Education Program',
      // Add more subcategories
    ]
  }
} as const;
