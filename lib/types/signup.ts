// TypeScript interfaces and types for NESA-Africa signup system

export type AccountType = 
  | "Individual" 
  | "NGO" 
  | "Corporation" 
  | "Government" 
  | "School" 
  | "Diaspora Group";

export type UserIntent =
  | "Vote or Nominate"
  | "Apply for Eduaid Scholarship"
  | "Become Ambassador"
  | "Join Webinar/Expo"
  | "Sponsor or CSR Partner"
  | "Apply as Judge"
  | "Join Local Chapter"
  | "Join NESA Team"
  | "Get Gala Ticket"
  | "Donate"
  | "Apply as NRC Volunteer";

export type UserRole =
  | "Free Member"
  | "Standard Member"
  | "Ambassador"
  | "Judge"
  | "Volunteer"
  | "NRC Volunteer"
  | "Intern"
  | "Nominee"
  | "Sponsor"
  | "Chapter Leader"
  | "Admin";

export type Division = 
  | "SOBCD" // Strategic Operations
  | "OMBDD" // Marketing & Business Dev
  | "TDSD"  // Technology & Digital Services
  | "LSC";  // Local Chapter Services

export type UserFunction = 
  | "Admin/Governance"
  | "Media/Content"
  | "Fundraising/Sponsorship"
  | "Tech/Web/Dev"
  | "Legal/Compliance"
  | "Event/Chapter Growth";

export type Gender = "Male" | "Female" | "Other" | "Prefer not to say";

export type Language = "EN" | "FR" | "AR" | "PT";

// Base form data interface
export interface BaseFormData {
  accountType: AccountType;
  intents: UserIntent[];
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  state: string;
  preferredLanguage: Language;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  // Role-specific data (optional)
  division?: Division;
  functions?: UserFunction[];
  referralCode?: string;
  // Email verification
  emailVerified?: boolean;
}

// Individual account form data
export interface IndividualFormData extends BaseFormData {
  accountType: "Individual";
  fullName: string;
  phoneNumber: string;
  gender: Gender;
  dateOfBirth: string;
  profileImage?: File;
}

// Organization account form data
export interface OrganizationFormData extends BaseFormData {
  accountType: Exclude<AccountType, "Individual">;
  organizationName: string;
  registrationNumber: string;
  contactPersonName: string;
  contactEmail: string;
  contactPhone: string;
  verificationDocument?: File;
  organizationType: string;
}

// Combined form data type
export type SignupFormData = IndividualFormData | OrganizationFormData;

// Role-specific additional data
export interface RoleSpecificData {
  division?: Division;
  functions?: UserFunction[];
  referralCode?: string;
}

// Complete user profile data
export type UserProfileData = SignupFormData & RoleSpecificData & {
  id?: string;
  role: UserRole;
  chapterId?: string;
  walletId?: string;
  agcBalance?: number;
  referrerId?: string;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

// Chapter information
export interface Chapter {
  id: string;
  name: string;
  country: string;
  region: string;
  type: "online" | "hybrid" | "physical";
  leaderId?: string;
  walletId?: string;
  memberCount?: number;
}

// Wallet information
export interface Wallet {
  id: string;
  userId: string;
  agcWithdrawableBalance: number;
  agcLockedBalance: number;
  currencyEquivalentBalance: number;
  lastUpdated: Date;
}

// AGC bonus information
export interface AGCBonus {
  type: "withdrawable" | "non-withdrawable";
  amount: number;
  reason: string;
  trigger: "signup" | "referral" | "campaign" | "voting" | "nomination";
}

// API response types
export interface SignupResponse {
  success: boolean;
  message: string;
  user?: UserProfileData;
  wallet?: Wallet;
  chapter?: Chapter;
  agcBonus?: AGCBonus;
  token?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: ValidationError[];
}

// Form step types
export type SignupStep = 
  | "account-type"
  | "intent-selection" 
  | "personal-info"
  | "organization-info"
  | "role-selection"
  | "verification"
  | "completion";

export interface StepProgress {
  currentStep: SignupStep;
  completedSteps: SignupStep[];
  totalSteps: number;
  progressPercentage: number;
}

// Form validation schemas (for Zod)
export interface FormValidationRules {
  required: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidator?: (value: any) => boolean | string;
}

// Mock service response types
export interface MockServiceResponse<T = any> {
  success: boolean;
  data?: T;
  message: string;
  delay?: number; // For simulating network delay
}

// Country and region data
export interface Country {
  code: string;
  name: string;
  regions: Region[];
}

export interface Region {
  code: string;
  name: string;
  chapters: Chapter[];
}

// Upload file types
export interface FileUpload {
  file: File;
  preview?: string;
  uploadProgress?: number;
  uploaded?: boolean;
  url?: string;
}

// Form context types
export interface SignupContextType {
  formData: Partial<SignupFormData>;
  stepProgress: StepProgress;
  updateFormData: (data: Partial<SignupFormData>) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: SignupStep) => void;
  resetForm: () => void;
  submitForm: () => Promise<SignupResponse>;
  isLoading: boolean;
  error: string | null;
}

// Component prop types
export interface StepComponentProps {
  onNext: () => void;
  onPrevious: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
}
