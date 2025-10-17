# Quick Start - Email Notifications

## ✅ Errors Fixed
- Fixed `createTransporter` → `createTransport`
- Removed duplicate exports in awardCategories.ts

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Nodemailer
```bash
npm install nodemailer @types/nodemailer
```

### Step 2: Add to .env
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="NESA-Africa Awards <your-email@gmail.com>"
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 3: Get Gmail App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" → "Other"
3. Name it "NESA"
4. Copy the password
5. Paste as `SMTP_PASS` in .env

### Step 4: Test
1. Submit a nomination at `/nominateform`
2. Check console for "Email sending initiated"
3. Check both email inboxes
4. Done! ✅

## 📧 What Emails Look Like

### Nominee Email
```
Subject: 🏆 You've Been Nominated for NESA-Africa 2025 Awards!

[Orange gradient header with NESA logo]

Congratulations! You've Been Nominated! 🎉

Dear John Doe,

We are thrilled to inform you that you have been nominated 
for the prestigious NESA-Africa 2025 Awards!

[Yellow box with nomination details]
📋 Nomination Details:
Category: Best EduTech Organization
Subcategory: Best EduTech Startup
Nominated by: Jane Smith

[Learn More button]
```

### Nominator Email
```
Subject: ✅ Thank You for Your NESA-Africa 2025 Nomination

[Orange gradient header with NESA logo]

Thank You for Your Nomination! 🙏

Dear Jane Smith,

Thank you for taking the time to nominate an outstanding 
individual/organization for the NESA-Africa 2025 Awards!

[Yellow confirmation box]
✅ Nomination Confirmed
Your nomination has been successfully submitted

[Nominate Another button]
```

## 🎨 Email Features
- ✅ NESA orange/gold branding
- ✅ Professional HTML design
- ✅ Mobile responsive
- ✅ Beautiful gradients
- ✅ Call-to-action buttons
- ✅ Footer with links

## 🐛 Troubleshooting

### "Authentication failed"
- Use App Password, not regular password
- Enable 2FA first on Google Account

### "Connection timeout"
- Check firewall settings
- Try port 465 with `SMTP_SECURE=true`

### Emails not received
- Check spam folder
- Verify email addresses
- Check console for errors

## ✅ That's It!

Once nodemailer is installed and .env is configured, emails will automatically send when someone submits a nomination.

---

**Time to setup**: 5 minutes
**Difficulty**: Easy
**Status**: Ready to use
