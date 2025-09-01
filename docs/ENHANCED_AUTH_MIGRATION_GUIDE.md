# Enhanced Authentication Endpoints Migration Guide

## Overview

This document outlines the migration from legacy authentication endpoints (`/api/auths/*`) to the enhanced authentication endpoints (`/api/v1/auth/*`). All authentication-related API calls have been updated to use the new enhanced endpoints.

## Changes Made

### 1. Updated Endpoints

| Functionality | Legacy Endpoint | Enhanced Endpoint |
|---------------|----------------|-------------------|
| Login | `/api/auths/login` | `/api/v1/auth/login` |
| Signup | `/api/auths/signup` | `/api/v1/auth/signup` |
| OTP Verification | `/api/auths/verify-otp` | `/api/v1/auth/otp/verify` |
| Send Login OTP | `/api/auths/send-otp` | `/api/v1/auth/otp/send-login` |
| Send Email Verification OTP | `/api/auths/send-otp` | `/api/v1/auth/otp/send-verify-email` |
| Send Password Reset OTP | `/api/auths/send-otp` | `/api/v1/auth/password-reset/send-otp` |
| Change Password | `/api/auths/change-password` | `/api/v1/auth/password/change` |
| Reset Password | `/api/auths/reset-password` | `/api/v1/auth/password-reset/request` |
| Comprehensive Signup | `/auth/signup-flow` | `/api/v1/auth/signup-flow` |
| Get User Profile | N/A | `/api/v1/auth/me` |
| Check Email Availability | `/auth/check-email` | `/api/v1/auth/check-email` |

### 2. Response Handling

The enhanced endpoints use a consistent response structure:

```typescript
{
  success: boolean,
  message: string,
  data: {
    user: {
      // User data
    },
    tokens: {
      accessToken: string,
      refreshToken?: string,
      expiresIn: number
    }
  }
}
```

All service functions have been updated to handle this response structure.

## Testing the Migration

### 1. Authentication Flow Testing

Test the complete authentication flow to ensure all endpoints are working correctly:

1. **Signup**:
   - Create a new user account
   - Verify that you receive a verification email

2. **Email Verification**:
   - Enter the OTP received in the email
   - Verify that you can successfully verify your email

3. **Login**:
   - Log in with your credentials
   - Verify that you receive an authentication token

4. **Profile Retrieval**:
   - Access your profile information
   - Verify that you can see your user data

5. **Password Management**:
   - Test changing your password
   - Test the password reset flow

### 2. Error Handling Testing

Test error scenarios to ensure proper error handling:

1. **Invalid Credentials**:
   - Attempt to log in with incorrect credentials
   - Verify that you receive an appropriate error message

2. **Invalid OTP**:
   - Enter an incorrect OTP
   - Verify that you receive an appropriate error message

3. **Email Already Exists**:
   - Attempt to register with an email that already exists
   - Verify that you receive an appropriate error message

## Troubleshooting

If you encounter issues with the enhanced endpoints:

1. **Check Network Requests**:
   - Use browser developer tools to inspect network requests
   - Verify that requests are being sent to the correct endpoints
   - Check the request payload format

2. **Check Response Format**:
   - Verify that the response format matches the expected structure
   - Look for any error messages in the response

3. **Check Console Logs**:
   - Look for any error messages in the browser console
   - The API client includes detailed logging for debugging

## Next Steps

1. **Update Components**:
   - Ensure all components are using the updated authentication hooks
   - Test all authentication-related functionality

2. **Update Documentation**:
   - Update any documentation that references the legacy endpoints
   - Ensure all developers are aware of the new endpoint structure

3. **Clean Up Legacy Code**:
   - Once testing is complete, remove any remaining references to legacy endpoints
   - Remove any duplicate or unused functions