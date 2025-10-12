# ✅ NRC Status Mismatch - FIXED

## Problem

Admin verification page wasn't showing newly uploaded nominees because of a status mismatch:

- **Nominees were saved with**: `status: 'REVIEW'`
- **Admin API was looking for**: `status: 'PENDING'`

## Root Cause

The NRCNominee model defines these valid statuses:
```typescript
status: 'DRAFT' | 'REVIEW' | 'VERIFIED' | 'REJECTED' | 'PUBLISHED'
```

But the admin API was querying for `'PENDING'` which doesn't exist in the model.

## Solution

### 1. ✅ Fixed Admin API
**File**: `app/api/v1/nrc/admin/nominees/pending/route.ts`

```typescript
// Before (WRONG):
const nominees = await NRCNominee.find({ status: 'PENDING' })

// After (FIXED):
const nominees = await NRCNominee.find({ status: 'REVIEW' })
```

### 2. ✅ Fixed Status Counts
**File**: `app/api/v1/nrc/volunteers/[userId]/nominees/route.ts`

```typescript
// Before (WRONG):
const statusCounts = {
  pending: await NRCNominee.countDocuments({ status: 'PENDING' }),
  ...
}

// After (FIXED):
const statusCounts = {
  draft: await NRCNominee.countDocuments({ status: 'DRAFT' }),
  review: await NRCNominee.countDocuments({ status: 'REVIEW' }),
  verified: await NRCNominee.countDocuments({ status: 'VERIFIED' }),
  published: await NRCNominee.countDocuments({ status: 'PUBLISHED' }),
  rejected: await NRCNominee.countDocuments({ status: 'REJECTED' }),
}
```

### 3. ✅ Updated Status Display
**File**: `app/(main)/get-involved/nrc-volunteer/nominees/page.tsx`

Added all valid statuses:
- `DRAFT` → Blue badge "Draft"
- `REVIEW` → Yellow badge "Under Review"
- `VERIFIED` → Green badge "Verified"
- `PUBLISHED` → Green badge "Published"
- `REJECTED` → Red badge "Rejected"

---

## Status Flow

```
DRAFT → REVIEW → VERIFIED → PUBLISHED
           ↓
        REJECTED
```

1. **DRAFT** - Nominee saved but not submitted
2. **REVIEW** - Nominee submitted, waiting for admin verification
3. **VERIFIED** - Admin approved, not yet public
4. **PUBLISHED** - Admin approved and made public
5. **REJECTED** - Admin rejected with reason

---

## What Works Now

### ✅ Admin Verification Page
1. Go to `/admin/nrc-verification`
2. Now shows all nominees with status `REVIEW`
3. Can verify or reject
4. Stats show correct counts

### ✅ My Nominations Page
1. Go to `/get-involved/nrc-volunteer/nominees`
2. Shows all statuses correctly
3. Color-coded badges
4. Accurate status counts

---

## Testing

### Test 1: Upload a Nominee
```bash
# Upload a nominee
# Check database:
db.nrcnominees.findOne({ fullName: "Test Nominee" })
# Should show: status: "REVIEW"
```

### Test 2: Admin Page
```bash
# Go to /admin/nrc-verification
# Should see the nominee in pending list
```

### Test 3: Verify Nominee
```bash
# Click "Verify & Publish"
# Check database:
db.nrcnominees.findOne({ fullName: "Test Nominee" })
# Should show: status: "PUBLISHED"
```

### Test 4: My Nominations
```bash
# Go to /get-involved/nrc-volunteer/nominees
# Should see nominee with "Published" badge (green)
```

---

## API Responses

### GET /api/v1/nrc/admin/nominees/pending
```json
{
  "success": true,
  "data": {
    "nominees": [
      {
        "_id": "...",
        "fullName": "John Doe",
        "status": "REVIEW",
        "dateCreated": "2025-01-07T..."
      }
    ],
    "stats": {
      "pending": 5,
      "verified": 2,
      "published": 10,
      "rejected": 1
    }
  }
}
```

### GET /api/v1/nrc/volunteers/{userId}/nominees
```json
{
  "success": true,
  "data": {
    "nominees": [...],
    "statusCounts": {
      "draft": 0,
      "review": 3,
      "verified": 1,
      "published": 5,
      "rejected": 0
    }
  }
}
```

---

## Summary

**Fixed**: Status mismatch between model and API queries
**Result**: Admin page now correctly shows all pending nominees
**Bonus**: Added support for all 5 status types across the system

The admin verification page should now work perfectly! 🎉
