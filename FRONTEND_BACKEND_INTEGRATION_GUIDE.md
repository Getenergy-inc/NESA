# Frontend-Backend Integration Guide

## Overview

This guide explains how the frontend consumes the backend authentication endpoints and provides examples of the complete signup and authentication flow.

## Backend Endpoints Available

### Legacy Endpoints (Currently Used)
- `POST /api/auths/signup` - User registration
- `POST /api/auths/login` - User login
- `POST /api/auths/verify-otp` - OTP verification
- `POST /api/auths/send-otp` - Send OTP
- `POST /api/auths/verify-email` - Email verification

### New Enhanced Endpoints (Available)
- `POST /api/v1/auth/signup-flow` - Comprehensive signup
- `POST /api/v1/auth/login` - Enhanced login
- `POST /api/v1/auth/otp/send-login` - Send login OTP
- `POST /api/v1/auth/otp/send-verify-email` - Send email verification OTP
- `POST /api/v1/auth/otp/verify` - Verify OTP with purpose
- `GET /api/v1/auth/me` - Get user profile with wallet/chapter data

## Complete Signup Flow Implementation

### 1. Basic Signup Flow

```typescript
import { useAuth } from '@/lib/hooks/useAuth';

const SignupComponent = () => {
  const { register, verifyEmail, sendOTPCode } = useAuth();

  const handleSignup = async (formData) => {
    try {
      // Step 1: Register user
      const signupData = {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        role: formData.role,
        state: formData.state,
        region: formData.region,
        nomineeType: formData.nomineeType
      };

      const result = await register(signupData);
      console.log('Signup successful:', result.message);
      
      // Step 2: User will receive email verification
      // Redirect to OTP verification page
      
    } catch (error) {
      console.error('Signup failed:', error.message);
    }
  };

  const handleOTPVerification = async (email, otp) => {
    try {
      const result = await verifyEmail(email, otp);
      console.log('Email verified:', result.message);
      // User is now fully authenticated
    } catch (error) {
      console.error('OTP verification failed:', error.message);
    }
  };

  return (
    // Your signup form JSX
  );
};
```

### 2. Enhanced Signup Flow (Recommended)

```typescript
import { useAuth } from '@/lib/hooks/useAuth';

const EnhancedSignupComponent = () => {
  const { registerWithFlow, sendOTPCode, verifyEmail } = useAuth();

  const handleEnhancedSignup = async (formData) => {
    try {
      // Comprehensive signup with all user data
      const signupData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        country: formData.country,
        state: formData.state,
        accountType: formData.accountType, // 'INDIVIDUAL' or 'ORGANIZATION'
        intents: formData.intents, // Array of user intents
        
        // Organization fields (if applicable)
        organizationName: formData.organizationName,
        organizationType: formData.organizationType,
        registrationNumber: formData.registrationNumber,
        
        // Optional fields
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        division: formData.division,
        functions: formData.functions,
        referralCode: formData.referralCode
      };

      const result = await registerWithFlow(signupData);
      console.log('Enhanced signup successful:', result.message);
      
      // User receives verification email automatically
      // Redirect to email verification page
      
    } catch (error) {
      console.error('Enhanced signup failed:', error.message);
    }
  };

  return (
    // Your enhanced signup form JSX
  );
};
```

### 3. Login with OTP Flow

```typescript
import { useAuth } from '@/lib/hooks/useAuth';

const LoginComponent = () => {
  const { signIn, sendOTPCode, verifyEmail } = useAuth();

  const handleLogin = async (email, password) => {
    try {
      // Step 1: Attempt login
      const result = await signIn({ email, password });
      
      if (result.requiresOTP) {
        // Step 2: Send OTP for additional verification
        await sendOTPCode(email, 'LOGIN');
        console.log('OTP sent to your email');
        // Show OTP input form
      } else {
        console.log('Login successful');
        // User is authenticated
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const handleOTPLogin = async (email, otp) => {
    try {
      const result = await verifyEmail(email, otp);
      console.log('OTP verified, login successful');
      // User is now authenticated
    } catch (error) {
      console.error('OTP verification failed:', error.message);
    }
  };

  return (
    // Your login form JSX
  );
};
```

## API Response Formats

### Signup Response
```typescript
{
  success: true,
  message: "Account created successfully! Please check your email for verification.",
  data: {
    user: {
      id: "user-id",
      email: "user@example.com",
      firstName: "John",
      lastName: "Doe",
      role: "USER",
      emailVerified: false,
      // ... other user fields
    },
    tokens: {
      accessToken: "jwt-access-token",
      refreshToken: "jwt-refresh-token",
      expiresIn: 3600
    }
  }
}
```

### Login Response
```typescript
{
  success: true,
  message: "Login successful",
  data: {
    user: {
      id: "user-id",
      email: "user@example.com",
      // ... user fields
    },
    tokens: {
      accessToken: "jwt-access-token",
      expiresIn: 3600
    }
  }
}
```

### OTP Verification Response
```typescript
{
  success: true,
  message: "OTP verified successfully",
  data: {
    user: {
      id: "user-id",
      email: "user@example.com",
      emailVerified: true,
      // ... user fields
    },
    tokens: {
      accessToken: "jwt-access-token",
      refreshToken: "jwt-refresh-token",
      expiresIn: 3600
    }
  }
}
```

## Error Handling

The frontend services automatically handle backend errors and provide user-friendly messages:

```typescript
try {
  await register(userData);
} catch (error) {
  // error.message contains user-friendly error message
  console.error(error.message);
  
  // Common error messages:
  // - "Email already exists"
  // - "Invalid email or password"
  // - "OTP verification failed"
  // - "Registration failed"
}
```

## Authentication State Management

The `useAuth` hook manages authentication state automatically:

```typescript
const {
  user,              // Current user object
  isAuthenticated,   // Boolean authentication status
  userRole,          // User role (USER, ADMIN, etc.)
  accountType,       // Account type (INDIVIDUAL, ORGANIZATION)
  isLoading,         // Loading state during auth operations
  error              // Current error message
} = useAuth();

// Authentication state is automatically updated when:
// - User logs in successfully
// - OTP is verified
// - User logs out
// - Token expires
```

## Cookie Management

Authentication tokens are automatically managed via cookies:

- `token` - JWT access token (7 days for verified users)
- `userId` - User ID for API calls
- `emailVerified` - Email verification status
- `tempToken` - Temporary token during signup flow
- `tempUserId` - Temporary user ID during signup flow

## Migration from Legacy to New Endpoints

To migrate to the new enhanced endpoints:

1. **Update API base URL** in `apiClient.ts` to use `/api/v1/auth/*` endpoints
2. **Use `registerWithFlow`** instead of `register` for comprehensive signup
3. **Use `sendOTPCode`** with purpose parameter for different OTP types
4. **Use `getEnhancedProfile`** to get user data with wallet and chapter information

## Best Practices

1. **Always handle errors** - Use try-catch blocks around auth operations
2. **Show loading states** - Use `isLoading` from useAuth hook
3. **Validate forms** - Ensure required fields match backend validation
4. **Secure token storage** - Tokens are automatically stored in secure cookies
5. **Handle token refresh** - The API client automatically handles token refresh

## Example Complete Implementation

```typescript
import { useAuth } from '@/lib/hooks/useAuth';
import { useState } from 'react';

const AuthFlow = () => {
  const {
    registerWithFlow,
    signIn,
    verifyEmail,
    sendOTPCode,
    isLoading,
    error,
    isAuthenticated,
    user
  } = useAuth();

  const [step, setStep] = useState('signup'); // 'signup', 'login', 'otp'
  const [email, setEmail] = useState('');

  const handleSignup = async (formData) => {
    try {
      await registerWithFlow(formData);
      setEmail(formData.email);
      setStep('otp');
    } catch (err) {
      console.error('Signup failed:', err.message);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      await signIn(credentials);
      if (!isAuthenticated) {
        setEmail(credentials.email);
        setStep('otp');
      }
    } catch (err) {
      console.error('Login failed:', err.message);
    }
  };

  const handleOTPVerification = async (otp) => {
    try {
      await verifyEmail(email, otp);
      // User is now authenticated
    } catch (err) {
      console.error('OTP verification failed:', err.message);
    }
  };

  const resendOTP = async () => {
    try {
      await sendOTPCode(email, 'VERIFY_EMAIL');
    } catch (err) {
      console.error('Failed to resend OTP:', err.message);
    }
  };

  if (isAuthenticated) {
    return <div>Welcome, {user?.firstName}!</div>;
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      
      {step === 'signup' && (
        <SignupForm onSubmit={handleSignup} />
      )}
      
      {step === 'login' && (
        <LoginForm onSubmit={handleLogin} />
      )}
      
      {step === 'otp' && (
        <OTPForm 
          onSubmit={handleOTPVerification}
          onResend={resendOTP}
          email={email}
        />
      )}
    </div>
  );
};
```

This implementation provides a complete authentication flow that properly consumes your backend endpoints with proper error handling, loading states, and user feedback.