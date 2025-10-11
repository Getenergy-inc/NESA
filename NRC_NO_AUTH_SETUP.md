# 🔓 NRC No-Auth Setup

## Overview

The NRC system has been configured to work **without authentication requirements**. Users can register and participate without logging in to the main system.

---

## 🔑 How It Works

### User Identification
Instead of using authenticated user sessions, the system uses:

1. **Email-based User ID**: Generated from email address
   ```typescript
   const userId = `nrc-${email.replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}`;
   ```

2. **LocalStorage**: User ID stored in browser
   ```typescript
   localStorage.setItem('nrc_user_id', userId);
   localStorage.setItem('nrc_user_email', email);
   ```

3. **Query Parameters**: User ID passed in API calls
   ```typescript
   GET /api/v1/nrc/volunteers/check-status?userId=nrc-user-email-com-1234567890
   ```

---

## 📝 Registration Flow

### Step 1: User Fills Application
- User visits `/get-involved/nrc-volunteer/apply`
- Fills in name, email, country, etc.
- No login required

### Step 2: System Generates User ID
```typescript
// In NRCApplicationForm.tsx
const userId = `nrc-${data.email.replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}`;
```

### Step 3: Store in LocalStorage
```typescript
localStorage.setItem('nrc_user_id', userId);
localStorage.setItem('nrc_user_email', data.email);
```

### Step 4: Register with Backend
```typescript
POST /api/v1/nrc/volunteers/register
{
  "userId": "nrc-user-email-com-1234567890",
  "fullName": "John Doe",
  "email": "user@email.com",
  "country": "Nigeria",
  "region": "Africa"
}
```

---

## 🎯 Usage Examples

### Check Volunteer Status
```typescript
// Frontend
const userId = localStorage.getItem('nrc_user_id');
const status = await nrcService.checkVolunteerStatus(userId);

// API Call
GET /api/v1/nrc/volunteers/check-status?userId=nrc-user-email-com-1234567890
```

### Upload Nominee
```typescript
// Frontend
const userId = localStorage.getItem('nrc_user_id');
formData.append('volunteerId', userId);
await nrcService.createNominee(formData);

// API Call
POST /api/v1/nrc/nominees
FormData: {
  volunteerId: "nrc-user-email-com-1234567890",
  fullName: "Jane Smith",
  // ... other fields
}
```

### Access Dashboard
```typescript
// Frontend
const userId = localStorage.getItem('nrc_user_id');
const dashboard = await nrcService.getVolunteerDashboard(userId);

// API Call
GET /api/v1/nrc/volunteers/nrc-user-email-com-1234567890/dashboard
```

---

## 🔒 Security Considerations

### Current Approach
- ✅ No passwords to manage
- ✅ Simple user experience
- ✅ Email-based identification
- ✅ LocalStorage for persistence

### Limitations
- ⚠️ User ID stored in browser (can be cleared)
- ⚠️ No password protection
- ⚠️ Anyone with user ID can access data
- ⚠️ No email verification

### Recommendations for Production

#### Option 1: Add Email Verification
```typescript
// Send OTP to email on registration
POST /api/v1/nrc/volunteers/register
→ Send OTP email

// Verify OTP before activating
POST /api/v1/nrc/volunteers/verify
{ userId, otp }
→ Activate volunteer
```

#### Option 2: Add Simple Password
```typescript
// Store hashed password
POST /api/v1/nrc/volunteers/register
{
  userId,
  email,
  password: "hashed_password"
}

// Login with email + password
POST /api/v1/nrc/volunteers/login
{ email, password }
→ Return userId
```

#### Option 3: Magic Link
```typescript
// Send magic link to email
POST /api/v1/nrc/volunteers/send-magic-link
{ email }
→ Send email with unique link

// Access via magic link
GET /api/v1/nrc/volunteers/auth?token=unique_token
→ Set userId in localStorage
```

---

## 🧪 Testing

### Test Registration
```bash
# 1. Visit application page
http://localhost:3000/get-involved/nrc-volunteer/apply

# 2. Fill in form with email: test@example.com
# 3. Submit

# 4. Check localStorage
localStorage.getItem('nrc_user_id')
# Should return: nrc-test-example-com-1234567890

# 5. Check backend
curl "http://localhost:3000/api/v1/nrc/volunteers/check-status?userId=nrc-test-example-com-1234567890"
```

### Test Dashboard Access
```bash
# 1. After registration, visit dashboard
http://localhost:3000/get-involved/nrc-volunteer/dashboard

# 2. Should load with your data
# 3. Check browser console for userId being used
```

### Test Nominee Upload
```bash
# 1. Visit upload page
http://localhost:3000/get-involved/nrc-volunteer/nominees/add

# 2. Fill in nominee details
# 3. Submit

# 4. Check if userId is sent
# Open browser DevTools → Network → Check POST request
```

---

## 🔄 Migration Path

If you want to add authentication later:

### Step 1: Keep Existing Data
```typescript
// Map NRC user IDs to authenticated user IDs
UPDATE nrcvolunteers 
SET authenticatedUserId = 'auth-user-123'
WHERE userId = 'nrc-user-email-com-1234567890';
```

### Step 2: Update Frontend
```typescript
// Check for authenticated user first
const userId = user?.id || localStorage.getItem('nrc_user_id');
```

### Step 3: Gradual Migration
```typescript
// Support both methods
if (isAuthenticated) {
  // Use authenticated user ID
  userId = user.id;
} else {
  // Fall back to localStorage
  userId = localStorage.getItem('nrc_user_id');
}
```

---

## 📋 API Changes

### Before (With Auth)
```typescript
// Required authentication
GET /api/v1/nrc/volunteers/check-status
Headers: { Authorization: "Bearer token" }
→ Extract userId from token
```

### After (No Auth)
```typescript
// No authentication required
GET /api/v1/nrc/volunteers/check-status?userId=nrc-user-email-com-1234567890
→ Use userId from query parameter
```

---

## 🎯 Benefits

### For Users
- ✅ No account creation needed
- ✅ No password to remember
- ✅ Quick registration
- ✅ Immediate access

### For Development
- ✅ Simpler implementation
- ✅ No auth system integration
- ✅ Faster testing
- ✅ Easier debugging

### For Deployment
- ✅ No session management
- ✅ No token refresh logic
- ✅ Simpler infrastructure
- ✅ Lower complexity

---

## ⚠️ Important Notes

### Data Persistence
- User ID stored in **localStorage**
- Clearing browser data = losing access
- Recommend users save their email

### Recovery
If user loses access:
```typescript
// Admin can look up by email
GET /api/v1/nrc/volunteers?email=user@example.com
→ Return userId

// User can re-register with same email
// System will recognize existing volunteer
```

### Multiple Devices
- User ID is device-specific
- To access from another device:
  1. User provides email
  2. System looks up userId
  3. Store in localStorage on new device

---

## 🚀 Quick Start

### For New Users
1. Visit `/get-involved/nrc-volunteer/apply`
2. Fill in application form
3. Submit (no login required)
4. Access dashboard immediately

### For Returning Users
- System automatically detects userId from localStorage
- If localStorage cleared, re-register with same email
- System will recognize existing volunteer

---

## 📞 Support

### Common Issues

**Issue**: "User ID not found"
**Solution**: 
```typescript
// Check localStorage
console.log(localStorage.getItem('nrc_user_id'));

// If empty, re-register with same email
```

**Issue**: "Cannot access dashboard"
**Solution**:
```typescript
// Verify registration
const userId = localStorage.getItem('nrc_user_id');
const status = await fetch(`/api/v1/nrc/volunteers/check-status?userId=${userId}`);
```

**Issue**: "Lost access after clearing browser"
**Solution**:
```typescript
// Contact admin with email
// Admin can provide userId
// Or re-register with same email
```

---

## ✅ Summary

The NRC system now works **without authentication**:
- ✅ Email-based user identification
- ✅ LocalStorage for persistence
- ✅ No login required
- ✅ Immediate access after registration
- ✅ Simple and fast user experience

**Status**: 🔓 NO AUTH REQUIRED - READY TO USE
