# 🔧 NRC Database Connection - COMPLETE FIX

## Problem: Stats Showing Zero

The admin page was showing all zeros because **ALL NRC API routes were using the wrong database connection**.

```
Pending Review: 0
Verified: 0
Published: 0
Rejected: 0
```

## Root Cause

**Every NRC route** was calling `await connectNRCDB()` but then using models directly:

```typescript
// ❌ WRONG - Models use default mongoose connection
await connectNRCDB();
const nominee = await NRCNominee.findById(id);
```

This meant:
- Nominees were being saved to the **default database**
- Admin routes were reading from the **NRC database**
- Result: No nominees found!

## Solution

Get models from the NRC connection explicitly:

```typescript
// ✅ CORRECT - Models use NRC connection
const conn = await connectNRCDB();
const NomineeModel = conn.models.NRCNominee || 
  conn.model('NRCNominee', NRCNominee.schema);
const nominee = await NomineeModel.findById(id);
```

---

## Files Fixed (7 Routes)

### 1. ✅ Nominee Upload Route
**File**: `app/api/v1/nrc/nominees/route.ts` (POST)
- Fixed NomineeModel usage
- Fixed VolunteerModel usage
- Fixed TransactionModel usage

### 2. ✅ Nominee List Route
**File**: `app/api/v1/nrc/nominees/route.ts` (GET)
- Fixed NomineeModel usage

### 3. ✅ Admin Pending Route
**File**: `app/api/v1/nrc/admin/nominees/pending/route.ts`
- Already fixed ✅

### 4. ✅ Admin Verify Route
**File**: `app/api/v1/nrc/admin/nominees/[id]/verify/route.ts`
- Already fixed ✅

### 5. ✅ Admin Reject Route
**File**: `app/api/v1/nrc/admin/nominees/[id]/reject/route.ts`
- Already fixed ✅

### 6. ✅ Volunteer Nominees Route
**File**: `app/api/v1/nrc/volunteers/[userId]/nominees/route.ts`
- Already fixed ✅

### 7. ✅ Leaderboard Route
**File**: `app/api/v1/nrc/leaderboard/route.ts`
- Fixed VolunteerModel usage

---

## What This Fixes

### Before (Broken):
```
Upload Nominee → Saves to DEFAULT database
Admin Page → Reads from NRC database
Result: No nominees found! ❌
```

### After (Fixed):
```
Upload Nominee → Saves to NRC database ✅
Admin Page → Reads from NRC database ✅
Result: Nominees found! ✅
```

---

## Testing Steps

### Step 1: Clear Old Data (Optional)
If you have nominees in the wrong database, they won't show up. You can either:
- Delete them from the default database
- Or just upload new ones (recommended)

### Step 2: Upload a Test Nominee
```
1. Go to: /get-involved/nrc-volunteer/apply
2. Register as volunteer
3. Go to dashboard
4. Click "Add New Nominee"
5. Fill form and submit
```

### Step 3: Check Admin Page
```
1. Go to: /admin/nrc-verification
2. Click "Refresh" button
3. Should now see your nominee! ✅
4. Stats should show: Pending Review: 1
```

### Step 4: Verify It Works
```
1. Click "Verify & Publish"
2. Should see green toast: "✅ Nominee verified..."
3. Stats update: Published: 1
4. Volunteer gets 10 AGC
```

---

## Database Check

### Check if nominees exist in NRC database:
```javascript
// In MongoDB shell or Compass
// Connect to NRC database
use nrc_database

// Count nominees
db.nrcnominees.find().count()
// Should show count > 0

// See nominees
db.nrcnominees.find().pretty()
```

### Check if volunteers exist:
```javascript
db.nrcvolunteers.find().count()
db.nrcvolunteers.find().pretty()
```

---

## Why This Happened

Mongoose has two ways to use models:

### Method 1: Default Connection (What was happening)
```typescript
import NRCNominee from '@/lib/models/NRCNominee';

// This uses mongoose.model() - default connection
const nominee = await NRCNominee.findById(id);
```

### Method 2: Specific Connection (What we need)
```typescript
const conn = await connectNRCDB();

// This uses conn.model() - NRC connection
const NomineeModel = conn.models.NRCNominee || 
  conn.model('NRCNominee', NRCNominee.schema);
const nominee = await NomineeModel.findById(id);
```

---

## Pattern for All NRC Routes

Use this pattern in every NRC API route:

```typescript
export async function POST(request: NextRequest) {
  try {
    // 1. Get NRC connection
    const conn = await connectNRCDB();
    
    // 2. Get models from that connection
    const NomineeModel = conn.models.NRCNominee || 
      conn.model('NRCNominee', NRCNominee.schema);
    const VolunteerModel = conn.models.NRCVolunteer || 
      conn.model('NRCVolunteer', NRCVolunteer.schema);
    const TransactionModel = conn.models.AGCTransaction || 
      conn.model('AGCTransaction', AGCTransaction.schema);
    
    // 3. Use the models
    const nominee = await NomineeModel.findById(id);
    const volunteer = await VolunteerModel.findOne({ userId });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
```

---

## Summary

**Fixed**: All 7 NRC API routes now use correct database connection
**Result**: Nominees are saved and retrieved from the same database
**Status**: Admin page should now show correct stats! ✅

---

## Next Steps

1. **Upload a new nominee** - This will save to the correct database
2. **Refresh admin page** - Should now see the nominee
3. **Verify it** - Should work without errors
4. **Check stats** - Should update correctly

The stats should no longer show zero! 🎉

---

## If Stats Still Show Zero

### Possible Reasons:

1. **No nominees uploaded yet**
   - Solution: Upload a test nominee

2. **Old nominees in wrong database**
   - Solution: Upload new nominees (they'll go to correct database now)

3. **MongoDB connection issue**
   - Check .env file has NRC_DATABASE_URL
   - Check MongoDB is running
   - Check console for connection errors

4. **Cache issue**
   - Restart Next.js dev server
   - Hard refresh browser (Ctrl+Shift+R)

---

## Test Command

Run this to test the API:
```bash
node test-nrc-api.js
```

Should show:
```
✅ Health: { success: true }
📊 Stats:
  Pending: 1
  Verified: 0
  Published: 0
  Rejected: 0
📝 Nominees: 1
```

---

## 🎉 All Fixed!

Every NRC route now uses the correct database connection. Upload a nominee and it should appear on the admin page immediately!
