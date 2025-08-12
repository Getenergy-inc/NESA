// Zod validation schemas for NESA-Africa signup forms

import { z } from 'zod';
import { AccountType, UserIntent, Gender, Language, Division, UserFunction } from '../types/signup';

// Common validation patterns
const emailSchema = z.string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
    'Password must contain at least one uppercase letter, one lowercase letter, and one number');

const phoneSchema = z.string()
  .min(10, 'Phone number must be at least 10 digits')
  .regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number');

const nameSchema = z.string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must not exceed 100 characters')
  .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name can only contain letters, spaces, hyphens, apostrophes, and periods');

// File validation
const fileSchema = z.instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
  .refine(
    (file) => ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(file.type),
    'File must be a JPEG, PNG, WebP image or PDF document'
  );

// Account type schema
const accountTypeSchema = z.enum(['Individual', 'NGO', 'Corporation', 'Government', 'School', 'Diaspora Group'] as const);

// User intent schema
const userIntentSchema = z.enum([
  'Vote or Nominate',
  'Apply for Eduaid Scholarship',
  'Become Ambassador',
  'Join Webinar/Expo',
  'Sponsor or CSR Partner',
  'Apply as Judge',
  'Join Local Chapter',
  'Join NESA Team',
  'Get Gala Ticket',
  'Donate',
  'Apply as NRC Volunteer'
] as const);

// Gender schema
const genderSchema = z.enum(['Male', 'Female', 'Other', 'Prefer not to say'] as const);

// Language schema
const languageSchema = z.enum(['EN', 'FR', 'AR', 'PT'] as const);

// Division schema
const divisionSchema = z.enum(['SOBCD', 'OMBDD', 'TDSD', 'LSC'] as const);

// Function schema
const functionSchema = z.enum([
  'Admin/Governance',
  'Media/Content', 
  'Fundraising/Sponsorship',
  'Tech/Web/Dev',
  'Legal/Compliance',
  'Event/Chapter Growth'
] as const);

// Base form fields (without password confirmation validation)
const baseFormFields = {
  accountType: accountTypeSchema,
  intents: z.array(userIntentSchema)
    .min(1, 'Please select at least one intent')
    .max(6, 'Please select no more than 6 intents'),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  country: z.string().min(1, 'Please select a country'),
  state: z.string().min(1, 'Please select a state/region'),
  preferredLanguage: languageSchema,
  termsAccepted: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
  privacyAccepted: z.boolean().refine(val => val === true, 'You must accept the privacy policy')
};

// Individual form schema
export const individualFormSchema = z.object({
  ...baseFormFields,
  accountType: z.literal('Individual'),
  fullName: nameSchema,
  phoneNumber: phoneSchema,
  gender: genderSchema,
  dateOfBirth: z.string()
    .min(1, 'Date of birth is required')
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 13 && age <= 120;
    }, 'You must be at least 13 years old'),
  profileImage: fileSchema.optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Organization form schema
export const organizationFormSchema = z.object({
  ...baseFormFields,
  accountType: z.enum(['NGO', 'Corporation', 'Government', 'School', 'Diaspora Group'] as const),
  organizationName: z.string()
    .min(2, 'Organization name must be at least 2 characters')
    .max(200, 'Organization name must not exceed 200 characters'),
  registrationNumber: z.string()
    .min(1, 'Registration number is required')
    .max(50, 'Registration number must not exceed 50 characters'),
  contactPersonName: nameSchema,
  contactEmail: emailSchema,
  contactPhone: phoneSchema,
  verificationDocument: fileSchema.optional(),
  organizationType: z.string().min(1, 'Please specify the organization type')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Role-specific data schema
export const roleSpecificSchema = z.object({
  division: divisionSchema.optional(),
  functions: z.array(functionSchema).optional(),
  referralCode: z.string().optional()
});

// Role selection step schema
export const roleSelectionStepSchema = z.object({
  division: divisionSchema.optional(),
  functions: z.array(functionSchema).optional(),
  referralCode: z.string().optional()
});

// Email verification step schema
export const verificationStepSchema = z.object({
  verificationCode: z.string()
    .length(6, 'Verification code must be 6 digits')
    .regex(/^\d{6}$/, 'Verification code must contain only numbers')
});

// Step-specific schemas for multi-step validation
export const accountTypeStepSchema = z.object({
  accountType: accountTypeSchema
});

export const intentSelectionStepSchema = z.object({
  intents: z.array(userIntentSchema)
    .min(1, 'Please select at least one intent')
    .max(6, 'Please select no more than 6 intents')
    .refine((intents) => {
      // Mutual exclusion: Scholarship and Sponsor cannot be selected together
      const hasScholarship = intents.includes('Apply for Eduaid Scholarship');
      const hasSponsor = intents.includes('Sponsor or CSR Partner');
      return !(hasScholarship && hasSponsor);
    }, {
      message: 'You cannot select both "Apply for Eduaid Scholarship" and "Sponsor or CSR Partner" at the same time'
    })
});

export const personalInfoStepSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  phoneNumber: phoneSchema,
  gender: genderSchema,
  dateOfBirth: z.string()
    .min(1, 'Date of birth is required')
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 13 && age <= 120;
    }, 'You must be at least 13 years old'),
  country: z.string().min(1, 'Please select a country'),
  state: z.string().min(1, 'Please select a state/region'),
  preferredLanguage: languageSchema
});

export const organizationInfoStepSchema = z.object({
  organizationName: z.string().min(2, 'Organization name is required'),
  registrationNumber: z.string().min(1, 'Registration number is required'),
  contactPersonName: nameSchema,
  contactEmail: emailSchema,
  contactPhone: phoneSchema,
  country: z.string().min(1, 'Please select a country'),
  state: z.string().min(1, 'Please select a state/region'),
  organizationType: z.string().min(1, 'Please specify the organization type'),
  preferredLanguage: languageSchema
});

export const passwordStepSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export const termsStepSchema = z.object({
  termsAccepted: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
  privacyAccepted: z.boolean().refine(val => val === true, 'You must accept the privacy policy')
});

// Combined schemas for different account types
export const signupFormSchema = z.union([
  individualFormSchema,
  organizationFormSchema
]);

// Email validation for checking existing emails
export const emailCheckSchema = z.object({
  email: emailSchema
});

// Referral code validation
export const referralCodeSchema = z.object({
  referralCode: z.string()
    .min(3, 'Referral code must be at least 3 characters')
    .max(20, 'Referral code must not exceed 20 characters')
    .regex(/^[A-Z0-9]+$/, 'Referral code can only contain uppercase letters and numbers')
});

// Password strength checker
export const checkPasswordStrength = (password: string): {
  score: number;
  feedback: string[];
} => {
  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 8) score += 1;
  else feedback.push('At least 8 characters');

  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('At least one lowercase letter');

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('At least one uppercase letter');

  if (/\d/.test(password)) score += 1;
  else feedback.push('At least one number');

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
  else feedback.push('At least one special character (optional but recommended)');

  return { score, feedback };
};

// Type exports for form data
export type IndividualFormData = z.infer<typeof individualFormSchema>;
export type OrganizationFormData = z.infer<typeof organizationFormSchema>;
export type SignupFormData = z.infer<typeof signupFormSchema>;
export type RoleSpecificData = z.infer<typeof roleSpecificSchema>;
