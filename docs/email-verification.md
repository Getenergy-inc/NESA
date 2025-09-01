# Email Verification System Documentation

This document provides an overview of the email verification system implemented for the NESA-Africa 2025 Endorsement platform.

## Overview

The email verification system ensures that endorsement submissions are legitimate by requiring users to verify their email addresses before their endorsements are reviewed. This helps prevent spam and ensures that only valid endorsements are processed.

## System Components

1. **Database Models**:
   - `Endorsement`: Stores endorsement data including verification status
   - `VerificationToken`: Stores tokens for email verification

2. **API Endpoints**:
   - `/api/endorse/submit`: Submits a new endorsement and sends a verification email
   - `/api/endorse/verify`: Verifies an email using a token
   - `/api/endorse/resend-verification`: Resends a verification email
   - `/api/endorse/showcase`: Retrieves approved endorsements for display

3. **Frontend Pages**:
   - `/get-involved/endorse-nesa-africa/verify`: Handles email verification
   - `/get-involved/endorse-nesa-africa/status`: Allows users to check endorsement status
   - `/get-involved/endorse-nesa-africa/showcase`: Displays approved endorsements

4. **Utility Functions**:
   - `generateToken`: Creates secure tokens for email verification
   - `verifyToken`: Validates tokens
   - `sendVerificationEmail`: Sends emails with verification links

## Workflow

1. **Submission**:
   - User submits an endorsement form
   - System creates an endorsement record with status `pending_verification`
   - System generates a verification token and sends an email with a verification link

2. **Verification**:
   - User clicks the verification link in the email
   - System validates the token
   - If valid, system updates endorsement status to `pending_review` and marks it as verified
   - User sees a confirmation page

3. **Review**:
   - Admin reviews verified endorsements
   - Admin approves or rejects the endorsement
   - System sends appropriate notification emails

4. **Display**:
   - Approved endorsements are displayed on the Wall of Endorsers
   - Featured endorsements are highlighted

## Database Schema

### Endorsement Model
```prisma
model Endorsement {
  id                   String    @id @default(uuid())
  organization_name    String
  contact_person_name  String
  email                String    @unique
  phone                String
  country              String
  website              String?
  endorser_category    String
  endorsement_type     String
  endorsement_tier     String?
  payment_method       String?
  payment_reference    String?
  payment_verified     Boolean   @default(false)
  endorsement_headline String
  endorsement_statement String
  logo_file            String?
  video_file           String?
  video_link           String?
  consent_to_publish   Boolean
  authorized_to_submit Boolean
  digital_signature    String
  user_id              String?
  submitted_by         String?
  status               String    @default("pending_verification")
  verified             Boolean   @default(false)
  rejection_reason     String?
  created_at           DateTime  @default(now())
  updated_at           DateTime  @updatedAt
  approved_at          DateTime?
  certificate_generated Boolean  @default(false)
  featured             Boolean   @default(false)
}
```

### VerificationToken Model
```prisma
model VerificationToken {
  identifier String
  token      String   @unique
  type       String
  expires    DateTime

  @@unique([identifier, type])
  @@index([token])
}
```

## Setup Instructions

1. **Database Setup**:
   ```bash
   # Install dependencies
   pnpm add @prisma/client pg

   # Run migration
   pnpm run migrate
   ```

2. **Environment Variables**:
   ```
   # Database connection
   DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

   # Email configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM="NESA Africa <your-email@gmail.com>"

   # Base URL
   NEXT_PUBLIC_BASE_URL=https://your-domain.com
   ```

3. **Email Configuration**:
   - For Gmail, you need to create an App Password
   - Go to your Google Account > Security > 2-Step Verification > App passwords
   - Create a new app password for "Mail" and use it as EMAIL_PASS

## Maintenance and Troubleshooting

### Common Issues

1. **Emails Not Sending**:
   - Check email credentials in .env file
   - Verify SMTP settings
   - Check server logs for email errors

2. **Verification Links Not Working**:
   - Ensure NEXT_PUBLIC_BASE_URL is set correctly
   - Check token expiration (default: 24 hours)
   - Verify database connection

3. **Database Errors**:
   - Check DATABASE_URL in .env file
   - Ensure database server is running
   - Run `pnpm prisma generate` to update client

### Monitoring

- Check server logs for errors
- Monitor email delivery rates
- Review verification success rates

## Security Considerations

- Tokens expire after 24 hours
- Tokens are single-use and deleted after verification
- Email addresses must be unique
- Sensitive data is not included in verification links

## Future Improvements

- Add phone verification as an alternative
- Implement rate limiting for submissions
- Add analytics for verification rates
- Improve email templates with more personalization