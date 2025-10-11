# 🚀 NRC Quick Reference

## Start Development

```bash
npm run dev
```

## Test URLs

```
Landing:    http://localhost:3000/get-involved/nrc-volunteer
Apply:      http://localhost:3000/get-involved/nrc-volunteer/apply
Dashboard:  http://localhost:3000/get-involved/nrc-volunteer/dashboard
Upload:     http://localhost:3000/get-involved/nrc-volunteer/nominees/add
Leaderboard: http://localhost:3000/get-involved/nrc-volunteer/leaderboard
```

## API Endpoints

```
Health:     GET  /api/v1/nrc/health
Register:   POST /api/v1/nrc/volunteers/register
Status:     GET  /api/v1/nrc/volunteers/check-status?userId={id}
Dashboard:  GET  /api/v1/nrc/volunteers/{id}/dashboard
Nominees:   POST /api/v1/nrc/nominees
Leaderboard: GET /api/v1/nrc/leaderboard
```

## User Flow (No Auth)

```
1. Visit /get-involved/nrc-volunteer
2. Click "Apply Now"
3. Fill form (email, name, country)
4. Submit → User ID generated
5. Access dashboard immediately
6. Upload nominees
7. Earn AGC rewards
```

## LocalStorage Keys

```javascript
localStorage.getItem("nrc_user_id"); // User ID
localStorage.getItem("nrc_user_email"); // Email
```

## Test Commands

```bash
# Backend tests
node script/test-nrc-backend.js

# Health check
curl http://localhost:3000/api/v1/nrc/health

# Register volunteer
curl -X POST http://localhost:3000/api/v1/nrc/volunteers/register \
  -H "Content-Type: application/json" \
  -d '{"userId":"test-123","fullName":"Test","email":"test@example.com","country":"Nigeria","region":"Africa"}'
```

## Environment Variables

```env
MONGODB_URI=your_mongodb_connection_string
NRC_DATABASE_URL=your_nrc_mongodb_connection_string  # Optional
```

## Key Features

- ✅ No authentication required
- ✅ Email-based user ID
- ✅ LocalStorage persistence
- ✅ File uploads (images, documents)
- ✅ AGC reward system
- ✅ Gamification (levels, ranks)
- ✅ Real-time leaderboard

## Documentation

- `NRC_NO_AUTH_SETUP.md` - No-auth details
- `NRC_FINAL_STATUS.md` - Complete status
- `app/api/v1/nrc/README.md` - API reference
- `NRC_QUICK_START.md` - Getting started

## Status

🎉 **COMPLETE & READY** - No authentication required!
