# Judge Application Workflow - Testing Guide

## 🎯 Overview
This guide walks you through testing the complete judge application workflow from initial application submission to account creation.

## 🔄 Complete Workflow Steps

### Step 1: Judge Application Submission
1. **Navigate to**: `/judgeapply`
2. **Fill out the form** with test data:
   - Full Name: "John Doe"
   - Email: "john.doe@example.com"
   - Phone: "+234 123 456 7890"
   - State/Region: "Lagos"
   - Educational Background: "PhD in Education, University of Lagos"
   - Experience: "10+ years in educational leadership and curriculum development"
   - Motivation: "Passionate about advancing educational excellence across Africa"

3. **Submit the form** - Should show confirmation modal
4. **Confirm submission** - Should show success modal
5. **Check console logs** - Should see verification email details

### Step 2: Email Verification (Development Testing)
Since we're in development mode, check the console logs for the verification link:

```
📧 VERIFICATION EMAIL SENT TO: john.doe@example.com
👤 NAME: John Doe
🔗 VERIFICATION LINK: http://localhost:3000/judge-verify?email=john.doe%40example.com&token=abc123...
🎯 TOKEN: abc123...
```

### Step 3: Email Verification Process
1. **Copy the verification link** from console logs
2. **Open the link** in browser
3. **Should see**: "Congratulations, You have been approved..." page
4. **Check console logs** - Should see approval email details
5. **Click**: "Confirm Your Role as a Judge" button

### Step 4: Judge Account Creation
1. **Should redirect to**: `/judge-signup?email=john.doe@example.com`
2. **Form should be pre-filled** with name and email
3. **Enter password** and confirm password
4. **Submit form** - Should create judge account
5. **Should redirect to**: Judge dashboard

## 🧪 Test Scenarios

### ✅ Happy Path Testing
- [ ] Complete application submission
- [ ] Email verification works
- [ ] Account creation successful
- [ ] All modals display correctly
- [ ] Form validation works

### ⚠️ Error Scenarios
- [ ] Duplicate email application
- [ ] Invalid verification token
- [ ] Expired verification link
- [ ] Missing required fields
- [ ] Password mismatch

### 🔒 Security Testing
- [ ] Verification token expiration (24 hours)
- [ ] Invalid token handling
- [ ] Email parameter validation
- [ ] Unauthorized access prevention

## 🛠️ Development Tools

### Console Monitoring
Monitor these console outputs during testing:
```bash
# Application submission
📧 VERIFICATION EMAIL SENT TO: [email]
🔗 VERIFICATION LINK: [url]

# Email verification
📧 APPROVAL EMAIL SENT TO: [email]
🎉 STATUS: APPROVED
```

### API Testing
Test API endpoints directly:

```bash
# Submit application
curl -X POST http://localhost:3000/api/judge-apply/submit \
  -H "Content-Type: application/json" \
  -d '{"full_name":"John Doe","email":"test@example.com",...}'

# Check verification status
curl http://localhost:3000/api/judge-apply/check-verification/test@example.com
```

## 🐛 Common Issues & Solutions

### Issue: "Application not found"
**Solution**: Ensure the email matches exactly between submission and verification

### Issue: "Verification token expired"
**Solution**: Tokens expire after 24 hours. Submit a new application for testing

### Issue: "Form not pre-filled"
**Solution**: Check that verification was completed successfully before accessing signup

### Issue: Console logs not showing
**Solution**: Check browser developer tools console tab

## 📊 Testing Checklist

### Pre-Testing Setup
- [ ] Development server running (`npm run dev`)
- [ ] Browser developer tools open
- [ ] Console tab visible for monitoring

### Application Form Testing
- [ ] All form fields validate correctly
- [ ] Phone number input works
- [ ] File upload areas function
- [ ] Confirmation modal displays all data
- [ ] Success modal appears after submission

### Verification Testing
- [ ] Verification email logged to console
- [ ] Verification link works
- [ ] Approval page displays correctly
- [ ] Approval email logged to console

### Signup Testing
- [ ] Signup form pre-fills correctly
- [ ] Password validation works
- [ ] Account creation succeeds
- [ ] Proper redirection occurs

## 🚀 Production Deployment Notes

### Email Service Integration
Replace console logging with actual email service:
```typescript
// In API routes, replace:
console.log('📧 EMAIL SENT...');

// With:
await emailService.send({
  to: email,
  subject: 'Judge Application Verification',
  template: 'judge-verification',
  data: { name, verificationUrl }
});
```

### Database Integration
Replace mock arrays with database calls:
```typescript
// Replace:
let judgeApplications: any[] = [];

// With:
import { db } from '@/lib/database';
const applications = await db.judgeApplications.findMany();
```

## 📈 Monitoring & Analytics

### Key Metrics to Track
- Application submission rate
- Email verification completion rate
- Account creation success rate
- Time between application and signup

### Error Monitoring
- Failed email deliveries
- Expired token attempts
- Duplicate application attempts
- Form validation failures

## 🔧 Troubleshooting Commands

```bash
# Check if server is running
curl http://localhost:3000/api/health

# Test API endpoints
curl -X GET http://localhost:3000/api/judge-apply/submit?email=test@example.com

# Check application logs
tail -f logs/application.log
```

## 📞 Support Information

For issues during testing:
1. Check console logs first
2. Verify all required environment variables
3. Ensure database connections (if using real DB)
4. Check email service configuration (if using real email)

---

**Next Steps**: After successful testing, proceed with production email service integration and database setup.
