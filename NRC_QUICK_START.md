# 🚀 NRC System - Quick Start

## Test It Now (2 Minutes)

### Step 1: Register (30 seconds)
```
1. Go to: http://localhost:3000/get-involved/nrc-volunteer/apply
2. Fill: Name, Email, Country
3. Submit
4. ✅ You're registered!
```

### Step 2: Upload Nominee (1 minute)
```
1. Dashboard → "Add New Nominee"
2. Fill: Name, Category, Achievement
3. Upload: Profile image (optional)
4. Submit
5. ✅ Nominee uploaded!
```

### Step 3: Verify (30 seconds)
```
1. Go to: http://localhost:3000/admin/nrc-verification
2. See your nominee
3. Click "Verify & Publish"
4. ✅ Done! You got 10 AGC!
```

---

## All Routes

### Volunteer Routes
```
/get-involved/nrc-volunteer/apply          → Register
/get-involved/nrc-volunteer/dashboard      → Dashboard
/get-involved/nrc-volunteer/nominees/add   → Upload
/get-involved/nrc-volunteer/nominees       → My Uploads
/get-involved/nrc-volunteer/leaderboard    → Rankings
```

### Admin Routes
```
/admin/nrc-verification                    → Verify Nominees
```

---

## Status Colors

| Status | Color | Meaning |
|--------|-------|---------|
| 🟡 REVIEW | Yellow | Waiting for admin |
| 🟢 VERIFIED | Green | Admin approved |
| 🟢 PUBLISHED | Green | Public & approved |
| 🔴 REJECTED | Red | Admin rejected |

---

## AGC Rewards

```
Upload Nominee → REVIEW → Admin Verifies → +10 AGC ✅
```

---

## Common Commands

### Check localStorage
```javascript
localStorage.getItem('nrc_user_id')
```

### Clear and restart
```javascript
localStorage.clear()
location.reload()
```

### Test API
```bash
curl http://localhost:3000/api/v1/nrc/health
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "User ID not found" | Register first |
| "Connection refused" | Check port 3000 |
| Empty admin page | Upload a nominee first |
| No AGC reward | Check database connection |

---

## That's It! 🎉

The system is ready. Start testing!
