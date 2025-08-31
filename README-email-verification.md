# NESA-Africa 2025 Email Verification System

This document provides instructions for setting up and using the email verification system for the NESA-Africa 2025 Endorsement platform.

## Overview

The email verification system ensures that endorsement submissions are legitimate by requiring users to verify their email addresses before their endorsements are reviewed. This helps prevent spam and ensures that only valid endorsements are processed.

## Features

- Email verification for new endorsement submissions
- Secure token-based verification
- Admin review and approval/rejection workflow
- Email notifications for verification, approval, and rejection
- Status tracking for endorsements
- Showcase page for approved endorsements

## Setup Instructions

### 1. Database Configuration

The system uses PostgreSQL with Prisma ORM. Make sure your `.env` file contains the database connection string:

```
DATABASE_URL='postgresql://username:password@host:port/database?sslmode=require'
```

### 2. Email Configuration

Configure the email settings in your `.env` file:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="NESA Africa <your-email@gmail.com>"
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

For Gmail, you need to create an App Password:
1. Go to your Google Account > Security > 2-Step Verification
2. Scroll down to "App passwords"
3. Create a new app password for "Mail"
4. Use this password as EMAIL_PASS in your .env file

### 3. Database Migration

Run the database migration to create the necessary tables:

```bash
# Install dependencies
npm install

# Run the migration script
npm run migrate
```

## System Components

### Database Models

The system uses two main models:

1. **Endorsement**: Stores all endorsement data including verification status
2. **VerificationToken**: Manages email verification tokens

### API Endpoints

- `/api/endorse/submit`: Submit a new endorsement
- `/api/endorse/verify`: Verify an email using a token
- `/api/endorse/resend-verification`: Resend a verification email
- `/api/endorse/showcase`: Get approved endorsements for display
- `/api/admin/endorsements`: Admin endpoint for managing endorsements

### Frontend Pages

- `/get-involved/endorse-nesa-africa/verify`: Email verification page
- `/get-involved/endorse-nesa-africa/status`: Endorsement status check page
- `/get-involved/endorse-nesa-africa/showcase`: Wall of Endorsers page
- `/admin/endorsements`: Admin management page

## Workflow

### 1. Submission Process

1. User submits an endorsement form
2. System creates an endorsement record with status `pending_verification`
3. System generates a verification token and sends an email with a verification link
4. User receives an email with a link to verify their email address

### 2. Verification Process

1. User clicks the verification link in the email
2. System validates the token
3. If valid, system updates endorsement status to `pending_review` and marks it as verified
4. User sees a confirmation page

### 3. Admin Review Process

1. Admin logs in to the admin dashboard
2. Admin reviews pending endorsements
3. Admin approves or rejects each endorsement
4. System sends appropriate notification emails to users

### 4. Showcase Process

1. Approved endorsements are displayed on the Wall of Endorsers
2. Admin can feature selected endorsements to highlight them
3. Users can filter and search endorsements

## Troubleshooting

### Common Issues

1. **Emails Not Sending**
   - Check email credentials in .env file
   - Verify SMTP settings
   - Check server logs for email errors

2. **Verification Links Not Working**
   - Ensure NEXT_PUBLIC_BASE_URL is set correctly
   - Check token expiration (default: 24 hours)
   - Verify database connection

3. **Database Errors**
   - Check DATABASE_URL in .env file
   - Ensure database server is running
   - Run `npm run prisma:generate` to update client

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