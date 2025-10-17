# ⚠️ SERVER RESTART REQUIRED

## Issue
The Mongoose schema for `NRCNominee` has been updated, but the changes aren't being recognized because:
1. Mongoose caches schemas in memory
2. The old schema is still loaded
3. The database connection is reusing the cached model

## Solution
**You MUST restart your development server** for the schema changes to take effect.

### Steps to Restart

#### Windows (CMD)
```cmd
# Stop the server (Ctrl+C in the terminal running npm run dev)
# Then restart:
npm run dev
```

#### Windows (PowerShell)
```powershell
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

#### Mac/Linux
```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

## What Changed in the Schema

### 1. `volunteerId` Field
```typescript
volunteerId: {
  type: String,
  required: false,  // ← Changed from true to false
  index: true
}
```

### 2. `status` Enum
```typescript
status: {
  type: String,
  enum: ['DRAFT', 'REVIEW', 'VERIFIED', 'REJECTED', 'PUBLISHED', 'PUBLIC_NOMINATION'],  // ← Added PUBLIC_NOMINATION
  default: 'REVIEW',
  index: true
}
```

### 3. New Fields Added
- `isPublicSubmission: Boolean`
- `nominatorName: String`
- `nominatorEmail: String`
- `nominatorPhone: String`
- `nominatorRelationship: String`

## After Restart

Once you restart the server:
1. The new schema will be loaded
2. `PUBLIC_NOMINATION` status will be valid
3. `volunteerId` will be optional
4. Public nominations will work correctly

## Verification

After restarting, test by:
1. Go to `/nominateform`
2. Fill out the form
3. Upload an image
4. Submit
5. Should succeed without validation errors

## If Still Having Issues

If you still see the error after restarting:

### Option 1: Clear Mongoose Cache
Add this to your API route temporarily:
```typescript
// Force clear the model cache
delete mongoose.connection.models.NRCNominee;
delete mongoose.models.NRCNominee;
```

### Option 2: Drop and Recreate Collection
**⚠️ WARNING: This will delete all data in the collection!**
```javascript
// In MongoDB shell or Compass
db.nrcnominees.drop()
```

### Option 3: Check Database Connection
Make sure you're connecting to the correct database:
```typescript
// In lib/configs/nrcDatabase.ts
console.log('Connected to:', mongoose.connection.name);
```

## Current Status

✅ Model file updated: `lib/models/NRCNominee.ts`
✅ API updated: `app/api/v1/public/nominate/route.ts`
✅ Form updated: `components/UI/nomination/PublicNominationForm.tsx`
⏳ **Server restart needed**: Please restart now
❌ Won't work until restart

## Quick Checklist

- [ ] Stop the development server (Ctrl+C)
- [ ] Restart with `npm run dev`
- [ ] Wait for compilation to complete
- [ ] Test the nomination form
- [ ] Verify no validation errors
- [ ] Check that image uploads work

---

**TL;DR**: Stop your server (Ctrl+C) and restart it with `npm run dev`. The schema changes won't work until you do this!
