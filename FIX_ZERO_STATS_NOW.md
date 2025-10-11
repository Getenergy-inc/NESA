# 🚨 Fix Zero Stats - DO THIS NOW

## The Problem
Admin page shows all zeros because nominees were being saved to the **wrong database**.

## The Fix
✅ **DONE** - All 7 API routes now use the correct NRC database connection.

---

## What You Need To Do

### Option 1: Upload New Nominee (Recommended)
```
1. Go to: http://localhost:3000/get-involved/nrc-volunteer/apply
2. Register (if not already)
3. Go to dashboard
4. Click "Add New Nominee"
5. Fill form and submit
6. Go to admin page
7. Click "Refresh"
8. Should see your nominee! ✅
```

### Option 2: Restart Server
```bash
# Stop the dev server (Ctrl+C)
# Start it again
npm run dev
```

### Option 3: Check Database
```javascript
// In MongoDB shell
use nrc_database
db.nrcnominees.find().count()
// If 0, upload a nominee
// If > 0, check connection
```

---

## Quick Test

### Test 1: Upload
```
1. Upload a nominee
2. Check console - should see "Connected to NRC MongoDB"
3. Should see success message
```

### Test 2: Admin Page
```
1. Go to /admin/nrc-verification
2. Click "Refresh" button
3. Should see nominee
4. Stats should show: Pending Review: 1
```

### Test 3: Verify
```
1. Click "Verify & Publish"
2. Should see: "✅ Nominee verified successfully!"
3. Stats update: Published: 1
```

---

## Why It Was Broken

```typescript
// Before (WRONG):
await connectNRCDB();
const nominee = await NRCNominee.findById(id);
// ❌ Saved to DEFAULT database

// After (FIXED):
const conn = await connectNRCDB();
const NomineeModel = conn.model('NRCNominee', ...);
const nominee = await NomineeModel.findById(id);
// ✅ Saved to NRC database
```

---

## Expected Result

After uploading a nominee:

```
Admin Page Stats:
✅ Pending Review: 1 (or more)
✅ Verified: 0
✅ Published: 0
✅ Rejected: 0

Nominee List:
✅ Shows your nominee
✅ Can click "View"
✅ Can click "Verify & Publish"
✅ Can click "Reject"
```

---

## If Still Zero

1. **Check .env file**
   ```
   NRC_DATABASE_URL=mongodb://...
   ```

2. **Check MongoDB is running**
   ```bash
   # Should be running on port 27017
   ```

3. **Check console for errors**
   - Browser console (F12)
   - Terminal (Next.js server)

4. **Upload a NEW nominee**
   - Old nominees might be in wrong database
   - New ones will go to correct database

---

## 🎯 Action Plan

1. ✅ Code is fixed
2. 🔄 Upload a test nominee
3. 🔄 Refresh admin page
4. ✅ Should work!

**Do it now and let me know if you see the nominee!** 🚀
