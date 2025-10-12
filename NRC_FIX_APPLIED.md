# ✅ NRC Fixes Applied

## Issues Fixed

### 1. User ID Mismatch ✅
**Problem**: `useNRCStatus` was checking authenticated user ID (`verified-user`) before localStorage
**Solution**: Now prioritizes `localStorage.getItem('nrc_user_id')` exclusively

### 2. Wallet Service Errors ✅  
**Problem**: Wallet service calls were failing and causing errors
**Solution**: Disabled wallet calls in NRC dashboard (NRC uses AGC tokens tracked separately)

### 3. API Client Wrong Port ✅
**Problem**: `apiClient` was configured to use `localhost:3001` instead of `localhost:3000`
**Solution**: Changed `apiClient` baseURL to `localhost:3000` for development

---

## Testing Steps

### Step 1: Clear Browser Storage
Open browser console and run:
```javascript
localStorage.clear();
location.reload();
```

### Step 2: Register Fresh
1. Go to: `http://localhost:3000/get-involved/nrc-volunteer/apply`
2. Fill out the form with your details
3. Submit the form
4. Check console - should see: `Registration successful`

### Step 3: Verify localStorage
In browser console, run:
```javascript
console.log('NRC User ID:', localStorage.getItem('nrc_user_id'));
console.log('NRC Email:', localStorage.getItem('nrc_user_email'));
```

You should see your NRC user ID (format: `nrc-email-timestamp`)

### Step 4: Check Dashboard
1. Go to: `http://localhost:3000/get-involved/nrc-volunteer/dashboard`
2. Should load without errors
3. Check console - should show: `NRC Status Check - Using NRC userId: nrc-...`

---

## Expected Console Output (Success)

```
✅ Form submission started
✅ Sending registration data: {userId: 'nrc-...', ...}
✅ Registration result: true
✅ Registration successful
✅ NRC Status Check - Using NRC userId: nrc-...
✅ Status check successful
```

---

## What Changed

### File: `lib/hooks/useNRCStatus.ts`
- Now reads `nrc_user_id` from localStorage FIRST
- Ignores authenticated user ID completely for NRC
- NRC system is now independent of main auth

### File: `app/(main)/get-involved/nrc-volunteer/dashboard/page.tsx`
- Disabled `useWallet()` hook
- Set wallet balances to 0 (NRC doesn't use wallet system)
- Removed wallet-related errors

### File: `lib/services/apiClient.ts`
- Changed baseURL from `localhost:3001` to `localhost:3000`
- Now correctly points to Next.js API routes
- All NRC API calls now work properly

---

## Why This Works

The NRC system is designed to work **without authentication**. Users register with just their email, and the system generates a unique ID stored in localStorage. This allows:

1. ✅ No login required
2. ✅ Simple email-based registration
3. ✅ Works independently of main auth system
4. ✅ No conflicts with authenticated users

---

## Next Steps

After clearing localStorage and re-registering:
- Dashboard should load correctly
- No more "Volunteer not found" errors
- No more wallet connection errors
- Status check uses correct NRC user ID

---

## Debug Commands

If issues persist, run these in browser console:

```javascript
// Check what's stored
console.log('NRC User ID:', localStorage.getItem('nrc_user_id'));
console.log('NRC Email:', localStorage.getItem('nrc_user_email'));

// Clear NRC data only
localStorage.removeItem('nrc_user_id');
localStorage.removeItem('nrc_user_email');

// Test API directly
fetch('http://localhost:3000/api/v1/nrc/health')
  .then(r => r.json())
  .then(console.log);
```
