# 🧪 NRC Testing Guide

## Quick Test Flow

### Step 1: Register as NRC Volunteer
1. Go to: `http://localhost:3000/get-involved/nrc-volunteer/apply`
2. Fill out the form
3. Submit
4. Check console: Should see `nrc_user_id` saved to localStorage

### Step 2: Upload a Nominee
1. Go to dashboard: `http://localhost:3000/get-involved/nrc-volunteer/dashboard`
2. Click "Add New Nominee"
3. Fill out nominee form
4. Submit
5. Should see success message

### Step 3: View Your Nominations
1. Click "View My Nominations" from dashboard
2. OR go to: `http://localhost:3000/get-involved/nrc-volunteer/nominees`
3. Should see your uploaded nominee with "PENDING" status

### Step 4: Admin Verification
1. Go to: `http://localhost:3000/admin/nrc-verification`
2. Should see your nominee in the pending list
3. Click "Verify & Publish"
4. Confirm
5. Should see success message

### Step 5: Check Rewards
1. Go back to dashboard
2. Should see:
   - Nominees Uploaded: 1
   - AGC Balance: 10 AGC
   - Target Progress: Updated

### Step 6: View Leaderboard
1. Click "View Leaderboard" from dashboard
2. OR go to: `http://localhost:3000/get-involved/nrc-volunteer/leaderboard`
3. Should see yourself in the rankings
4. Toggle between "Most Uploads" and "Most AGC"

---

## API Testing with cURL

### 1. Check Health
```bash
curl http://localhost:3000/api/v1/nrc/health
```

### 2. Get Pending Nominees (Admin)
```bash
curl http://localhost:3000/api/v1/nrc/admin/nominees/pending
```

### 3. Get My Nominees
```bash
curl "http://localhost:3000/api/v1/nrc/volunteers/nrc-test-example-com-123/nominees"
```

### 4. Get Leaderboard
```bash
curl "http://localhost:3000/api/v1/nrc/leaderboard?type=uploads&limit=10"
```

### 5. Verify Nominee (Admin)
```bash
curl -X POST http://localhost:3000/api/v1/nrc/admin/nominees/NOMINEE_ID/verify \
  -H "Content-Type: application/json" \
  -d '{
    "reviewedBy": "admin",
    "reviewNotes": "Approved",
    "publishToPublic": true
  }'
```

---

## Browser Console Tests

### Check localStorage
```javascript
console.log('NRC User ID:', localStorage.getItem('nrc_user_id'));
console.log('NRC Email:', localStorage.getItem('nrc_user_email'));
```

### Test API Directly
```javascript
// Get my nominees
fetch('/api/v1/nrc/volunteers/' + localStorage.getItem('nrc_user_id') + '/nominees')
  .then(r => r.json())
  .then(console.log);

// Get leaderboard
fetch('/api/v1/nrc/leaderboard?type=uploads&limit=10')
  .then(r => r.json())
  .then(console.log);
```

---

## Expected Results

### After Registration
```javascript
localStorage.getItem('nrc_user_id')
// "nrc-email-example-com-1234567890"

localStorage.getItem('nrc_user_email')
// "email@example.com"
```

### After Upload
```json
{
  "success": true,
  "message": "Nominee uploaded successfully",
  "data": {
    "nomineeId": "...",
    "status": "PENDING"
  }
}
```

### View My Nominations Response
```json
{
  "success": true,
  "data": {
    "nominees": [
      {
        "_id": "...",
        "fullName": "John Doe",
        "status": "PENDING",
        "awardCategory": "...",
        "dateCreated": "2025-01-07T..."
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 1,
      "pages": 1
    },
    "statusCounts": {
      "pending": 1,
      "verified": 0,
      "published": 0,
      "rejected": 0
    }
  }
}
```

### After Verification
```json
{
  "success": true,
  "message": "Nominee verified and published",
  "data": {
    "nominee": {
      "status": "PUBLISHED",
      "reviewedBy": "admin",
      "reviewDate": "2025-01-07T..."
    }
  }
}
```

### Leaderboard Response
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "volunteerId": "nrc-...",
      "fullName": "John Doe",
      "displayName": "John Doe",
      "country": "Nigeria",
      "nomineesUploaded": 5,
      "agcEarned": 50,
      "level": "Bronze",
      "badge": null
    }
  ]
}
```

---

## Common Issues & Solutions

### Issue 1: "NRC user ID not found"
**Solution**: Register as NRC volunteer first at `/get-involved/nrc-volunteer/apply`

### Issue 2: "Volunteer not found"
**Solution**: Make sure you're using the NRC user ID from localStorage, not the auth user ID

### Issue 3: "Connection refused"
**Solution**: Make sure your Next.js dev server is running on port 3000

### Issue 4: Empty leaderboard
**Solution**: Upload and verify at least one nominee first

### Issue 5: No nominees showing
**Solution**: Check that you're logged in with the same browser/device you used to upload

---

## Database Checks

### Check if volunteer exists
```javascript
// In MongoDB shell or Compass
db.nrcvolunteers.findOne({ userId: "nrc-email-example-com-123" })
```

### Check nominees
```javascript
db.nrcnominees.find({ volunteerId: "nrc-email-example-com-123" })
```

### Check AGC transactions
```javascript
db.agctransactions.find({ volunteerId: "nrc-email-example-com-123" })
```

---

## Success Criteria

✅ **Registration Works**
- User can register without authentication
- NRC user ID saved to localStorage
- Volunteer record created in database

✅ **Upload Works**
- Volunteer can upload nominees
- Nominees saved with PENDING status
- Upload count increments

✅ **View Nominations Works**
- Volunteer can see their uploads
- Status displayed correctly
- Filters work

✅ **Admin Verification Works**
- Admin can see pending nominees
- Verify button works
- AGC tokens awarded automatically

✅ **Leaderboard Works**
- Shows top volunteers
- Rankings correct
- Current user highlighted

---

## Performance Benchmarks

| Operation | Expected Time |
|-----------|---------------|
| Register | < 1 second |
| Upload Nominee | < 2 seconds |
| View Nominations | < 500ms |
| Admin Verification | < 1 second |
| Leaderboard Load | < 500ms |

---

## Next Steps After Testing

1. ✅ Verify all features work
2. ✅ Check console for errors
3. ✅ Test with multiple volunteers
4. ✅ Test admin verification flow
5. ✅ Verify AGC rewards
6. 📝 Create "Add Nominee" page
7. 📝 Create "Program Timeline" page
8. 🚀 Deploy to production

---

## Support

If you encounter issues:
1. Check browser console for errors
2. Check Next.js terminal for API errors
3. Verify MongoDB connection
4. Check localStorage has NRC user ID
5. Clear localStorage and re-register if needed

Happy testing! 🎉
