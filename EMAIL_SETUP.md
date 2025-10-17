# Email Setup Guide

## Environment Variables Required

Add these to your `.env` file:

```env
# Email Configuration (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=nesa-africa@yourdomain.com

# App URL (for email links)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Gmail Setup (Recommended for Development)

### 1. Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Security → 2-Step Verification
3. Turn it on

### 2. Generate App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Other (Custom name)"
3. Name it "NESA Nominations"
4. Copy the 16-character password
5. Use this as `SMTP_PASS` in your .env

### 3. Update .env
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx  # App password from step 2
SMTP_FROM="NESA-Africa Awards <your-gmail@gmail.com>"
```

## Other Email Providers

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-mailgun-password
```

### AWS SES
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-ses-smtp-username
SMTP_PASS=your-ses-smtp-password
```

## Install Nodemailer

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

## Testing Emails

### 1. Test Configuration
Create a test file `test-email.js`:

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password',
  },
});

transporter.sendMail({
  from: '"NESA Test" <your-email@gmail.com>',
  to: 'test@example.com',
  subject: 'Test Email',
  text: 'This is a test email',
}).then(info => {
  console.log('Email sent:', info.messageId);
}).catch(err => {
  console.error('Error:', err);
});
```

Run: `node test-email.js`

### 2. Test in Application
1. Submit a nomination
2. Check console for "Email sending initiated"
3. Check both nominee and nominator emails
4. Check spam folder if not received

## Email Templates

The system sends two beautiful HTML emails:

### 1. Nominee Email
- Subject: "🏆 You've Been Nominated for NESA-Africa 2025 Awards!"
- Contains:
  - Congratulations message
  - Nomination details
  - Category information
  - Why they were nominated
  - Next steps
  - About NESA-Africa
  - Call-to-action button

### 2. Nominator Email
- Subject: "✅ Thank You for Your NESA-Africa 2025 Nomination"
- Contains:
  - Thank you message
  - Nomination confirmation
  - Summary of nomination
  - What happens next
  - About NESA-Africa
  - Nominate another button

## Customization

### Update Email Templates
Edit `lib/services/emailService.ts`:
- Modify HTML templates
- Change colors (currently NESA orange/gold)
- Update content
- Add/remove sections

### Update Email Sender
Change the "from" name and email:
```typescript
from: `"Your Organization" <${process.env.SMTP_FROM}>`,
```

### Add More Email Types
Add new functions in `emailService.ts`:
```typescript
export async function sendApprovalEmail(data) {
  // Email when nomination is approved
}

export async function sendRejectionEmail(data) {
  // Email when nomination is rejected
}
```

## Troubleshooting

### Emails Not Sending
1. Check console for errors
2. Verify .env variables are set
3. Test SMTP credentials
4. Check firewall/antivirus
5. Try different SMTP port (465 for secure)

### Gmail "Less Secure Apps" Error
- Use App Password (not regular password)
- Enable 2FA first
- Generate new App Password

### Emails Going to Spam
- Use a verified domain
- Add SPF/DKIM records
- Use professional email service
- Avoid spam trigger words

### Rate Limiting
- Gmail: 500 emails/day
- SendGrid: 100 emails/day (free)
- Consider upgrading for production

## Production Recommendations

### 1. Use Professional Email Service
- SendGrid (recommended)
- Mailgun
- AWS SES
- Postmark

### 2. Add Email Queue
- Use Bull or BullMQ
- Process emails in background
- Retry failed emails
- Track email status

### 3. Add Email Tracking
- Track opens
- Track clicks
- Monitor bounces
- Handle unsubscribes

### 4. Add Email Templates Service
- Use MJML for responsive emails
- Store templates in database
- Allow admin to edit templates
- A/B test email content

## Security Best Practices

1. **Never commit .env file**
   - Add to .gitignore
   - Use environment variables in production

2. **Use App Passwords**
   - Never use main account password
   - Rotate passwords regularly

3. **Validate Email Addresses**
   - Check format before sending
   - Verify domain exists
   - Use email verification service

4. **Rate Limit Email Sending**
   - Prevent abuse
   - Respect provider limits
   - Implement cooldown periods

## Monitoring

### Track Email Metrics
- Delivery rate
- Open rate
- Click rate
- Bounce rate
- Spam complaints

### Set Up Alerts
- Failed email sends
- High bounce rate
- SMTP errors
- Rate limit reached

## Next Steps

1. ✅ Install nodemailer
2. ✅ Configure .env variables
3. ✅ Test email sending
4. ✅ Submit test nomination
5. ✅ Verify emails received
6. ✅ Check email appearance
7. ✅ Test on mobile devices
8. ✅ Monitor for errors

---

**Status**: Ready to use
**Provider**: Configurable (Gmail, SendGrid, etc.)
**Templates**: Beautiful NESA-branded HTML emails
**Testing**: Test before production use
