// Mock service functions for NESA-Africa signup system
// These simulate backend API calls and will be replaced with real API calls later

import { 
  SignupFormData, 
  SignupResponse, 
  UserProfileData, 
  Chapter, 
  Wallet, 
  AGCBonus, 
  MockServiceResponse,
  Country,
  Region,
  AccountType,
  UserIntent,
  UserRole
} from '../types/signup';

// Mock delay function to simulate network requests
const mockDelay = (ms: number = 1000): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// Mock countries and regions data
export const mockCountriesData: Country[] = [
  {
    code: 'NG',
    name: 'Nigeria',
    regions: [
      { code: 'LA', name: 'Lagos', chapters: [] },
      { code: 'AB', name: 'Abuja', chapters: [] },
      { code: 'KA', name: 'Kano', chapters: [] }
    ]
  },
  {
    code: 'GH',
    name: 'Ghana',
    regions: [
      { code: 'GA', name: 'Greater Accra', chapters: [] },
      { code: 'AS', name: 'Ashanti', chapters: [] }
    ]
  },
  {
    code: 'KE',
    name: 'Kenya',
    regions: [
      { code: 'NR', name: 'Nairobi', chapters: [] },
      { code: 'MO', name: 'Mombasa', chapters: [] }
    ]
  },
  {
    code: 'ZA',
    name: 'South Africa',
    regions: [
      { code: 'WC', name: 'Western Cape', chapters: [] },
      { code: 'GP', name: 'Gauteng', chapters: [] }
    ]
  }
];

// Mock chapter assignment based on country and region
export const assignChapter = async (country: string, region: string): Promise<MockServiceResponse<Chapter>> => {
  await mockDelay(500);
  
  const chapterId = `${country}-${region}-${Date.now()}`;
  const chapter: Chapter = {
    id: chapterId,
    name: `NESA Online Chapter – ${country} (${region})`,
    country,
    region,
    type: 'online',
    memberCount: Math.floor(Math.random() * 500) + 50
  };

  return {
    success: true,
    data: chapter,
    message: `Successfully assigned to ${chapter.name}`
  };
};

// Mock wallet creation
export const createWallet = async (userId: string): Promise<MockServiceResponse<Wallet>> => {
  await mockDelay(800);
  
  const wallet: Wallet = {
    id: `wallet_${userId}_${Date.now()}`,
    userId,
    agcWithdrawableBalance: 0,
    agcLockedBalance: 0,
    currencyEquivalentBalance: 0,
    lastUpdated: new Date()
  };

  return {
    success: true,
    data: wallet,
    message: 'Wallet created successfully'
  };
};

// Mock AGC bonus calculation
export const calculateAGCBonus = (accountType: AccountType, intents: UserIntent[]): AGCBonus => {
  let amount = 1; // Base bonus
  let type: 'withdrawable' | 'non-withdrawable' = 'non-withdrawable';
  
  // Bonus based on account type
  if (accountType === 'Individual') {
    amount += 1;
  } else {
    amount += 0; // Organizations get different benefits
  }
  
  // Bonus based on intents
  if (intents.includes('Become Ambassador')) {
    amount += 3;
    type = 'withdrawable';
  }
  if (intents.includes('Apply as Judge')) {
    amount += 2;
  }
  if (intents.includes('Apply as NRC Volunteer')) {
    amount += 2;
  }
  if (intents.includes('Join NESA Team')) {
    amount += 2;
  }
  
  return {
    type,
    amount,
    reason: 'signup_bonus',
    trigger: 'signup'
  };
};

// Mock role assignment based on intents
export const assignUserRole = (intents: UserIntent[]): UserRole => {
  if (intents.includes('Become Ambassador')) return 'Ambassador';
  if (intents.includes('Apply as Judge')) return 'Judge';
  if (intents.includes('Apply as NRC Volunteer')) return 'NRC Volunteer';
  if (intents.includes('Join NESA Team')) return 'Volunteer';
  if (intents.includes('Sponsor or CSR Partner')) return 'Sponsor';
  return 'Free Member';
};

// Mock email verification
export const sendVerificationEmail = async (email: string): Promise<MockServiceResponse<void>> => {
  await mockDelay(1000);
  
  // Simulate occasional failures
  if (Math.random() < 0.1) {
    return {
      success: false,
      message: 'Failed to send verification email. Please try again.'
    };
  }
  
  return {
    success: true,
    message: 'Verification email sent successfully'
  };
};

// Mock file upload (for profile images and documents)
export const uploadFile = async (file: File): Promise<MockServiceResponse<string>> => {
  await mockDelay(2000);
  
  // Simulate upload failure for large files
  if (file.size > 5 * 1024 * 1024) { // 5MB
    return {
      success: false,
      message: 'File size too large. Please upload a file smaller than 5MB.'
    };
  }
  
  // Generate mock URL
  const mockUrl = `https://mock-cdn.nesa-africa.com/uploads/${Date.now()}_${file.name}`;
  
  return {
    success: true,
    data: mockUrl,
    message: 'File uploaded successfully'
  };
};

// Main signup service function
export const signupUser = async (formData: SignupFormData): Promise<SignupResponse> => {
  await mockDelay(2000);
  
  try {
    // Simulate validation errors
    if (formData.email === 'test@error.com') {
      throw new Error('Email already exists');
    }
    
    // Generate user ID
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Assign chapter
    const chapterResponse = await assignChapter(formData.country, formData.state);
    if (!chapterResponse.success || !chapterResponse.data) {
      throw new Error('Failed to assign chapter');
    }
    
    // Create wallet
    const walletResponse = await createWallet(userId);
    if (!walletResponse.success || !walletResponse.data) {
      throw new Error('Failed to create wallet');
    }
    
    // Calculate AGC bonus
    const agcBonus = calculateAGCBonus(formData.accountType, formData.intents);
    
    // Update wallet with bonus
    walletResponse.data.agcLockedBalance = agcBonus.type === 'non-withdrawable' ? agcBonus.amount : 0;
    walletResponse.data.agcWithdrawableBalance = agcBonus.type === 'withdrawable' ? agcBonus.amount : 0;
    
    // Assign role
    const role = assignUserRole(formData.intents);
    
    // Create user profile
    const userProfile: UserProfileData = {
      ...formData,
      id: userId,
      role,
      chapterId: chapterResponse.data.id,
      walletId: walletResponse.data.id,
      agcBalance: agcBonus.amount,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Generate mock JWT token
    const token = `mock_jwt_${userId}_${Date.now()}`;
    
    return {
      success: true,
      message: 'Account created successfully! Please check your email for verification.',
      user: userProfile,
      wallet: walletResponse.data,
      chapter: chapterResponse.data,
      agcBonus,
      token
    };
    
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Signup failed. Please try again.'
    };
  }
};

// Mock function to check if email exists
export const checkEmailExists = async (email: string): Promise<MockServiceResponse<boolean>> => {
  await mockDelay(500);
  
  // Mock some existing emails
  const existingEmails = ['admin@nesa.com', 'test@existing.com', 'user@taken.com'];
  const exists = existingEmails.includes(email.toLowerCase());
  
  return {
    success: true,
    data: exists,
    message: exists ? 'Email already exists' : 'Email is available'
  };
};

// Mock function to validate referral code
export const validateReferralCode = async (code: string): Promise<MockServiceResponse<boolean>> => {
  await mockDelay(300);
  
  // Mock some valid referral codes
  const validCodes = ['NESA2025', 'AMBASSADOR123', 'JUDGE456', 'VOLUNTEER789'];
  const isValid = validCodes.includes(code.toUpperCase());
  
  return {
    success: true,
    data: isValid,
    message: isValid ? 'Valid referral code' : 'Invalid referral code'
  };
};

// Export countries data getter
export const getCountriesData = async (): Promise<MockServiceResponse<Country[]>> => {
  await mockDelay(300);
  
  return {
    success: true,
    data: mockCountriesData,
    message: 'Countries data retrieved successfully'
  };
};
