# NESA-Africa 2025 Endorsement System Deployment Guide

This guide provides step-by-step instructions for deploying the NESA-Africa 2025 Endorsement system with email verification.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- SMTP email account (Gmail, SendGrid, etc.)
- Domain name with SSL certificate

## Deployment Steps

### 1. Clone and Configure the Repository

```bash
# Clone the repository
git clone https://github.com/your-org/nesa-africa.git
cd nesa-africa

# Install dependencies
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database connection
DATABASE_URL='postgresql://username:password@host:port/database?sslmode=require'

# Email configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="NESA Africa <your-email@gmail.com>"

# Base URL for links in emails
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Admin credentials (for demo purposes only - use a proper auth system in production)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure-password
```

### 3. Set Up the Database

Run the database migration to create the necessary tables:

```bash
# Generate Prisma client
npm run prisma:generate

# Run migration
npm run migrate
```

### 4. Test Email Configuration

Verify that your email configuration is working correctly:

```bash
# Add a test recipient to .env
echo "TEST_EMAIL_RECIPIENT=your-email@example.com" >> .env

# Run the email test script
npm run test:email
```

### 5. Build the Application

```bash
# Build the Next.js application
npm run build
```

### 6. Deploy to Production

#### Option 1: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

#### Option 2: Deploy to a VPS or Dedicated Server

```bash
# Start the production server
npm start
```

For production deployment, consider using a process manager like PM2:

```bash
# Install PM2
npm install -g pm2

# Start the application with PM2
pm2 start npm --name "nesa-africa" -- start

# Save the PM2 configuration
pm2 save

# Set up PM2 to start on system boot
pm2 startup
```

### 7. Set Up a Reverse Proxy (for VPS/Dedicated Server)

For Nginx:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 8. Set Up Continuous Integration/Deployment (Optional)

Create a GitHub Actions workflow file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Generate Prisma client
        run: npx prisma generate
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Post-Deployment Tasks

### 1. Test the Endorsement Flow

1. Submit a test endorsement
2. Verify the email
3. Log in to the admin panel and approve the endorsement
4. Check that the endorsement appears on the showcase page

### 2. Set Up Monitoring

Consider setting up monitoring for your application:

- [Sentry](https://sentry.io/) for error tracking
- [Uptime Robot](https://uptimerobot.com/) for uptime monitoring
- [LogDNA](https://www.logdna.com/) or [Papertrail](https://www.papertrail.com/) for log management

### 3. Set Up Database Backups

For PostgreSQL:

```bash
# Create a backup script
cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/path/to/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DATABASE_URL="postgresql://username:password@host:port/database"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Create backup
pg_dump $DATABASE_URL > $BACKUP_DIR/nesa_backup_$TIMESTAMP.sql

# Delete backups older than 30 days
find $BACKUP_DIR -name "nesa_backup_*.sql" -type f -mtime +30 -delete
EOF

# Make the script executable
chmod +x backup.sh

# Add to crontab to run daily
(crontab -l 2>/dev/null; echo "0 2 * * * /path/to/backup.sh") | crontab -
```

## Troubleshooting

### Database Connection Issues

- Verify that the DATABASE_URL is correct
- Check that the database server is accessible from your deployment environment
- Ensure the database user has the necessary permissions

### Email Sending Issues

- Verify that the email credentials are correct
- Check if your email provider requires additional security settings
- For Gmail, ensure you're using an App Password if 2FA is enabled

### Deployment Issues

- Check the application logs for errors
- Verify that all environment variables are set correctly
- Ensure the server has sufficient resources (memory, CPU)

## Security Recommendations

1. **Use Environment Variables**: Never hardcode sensitive information
2. **Implement Rate Limiting**: Prevent abuse of the endorsement submission endpoint
3. **Set Up CSRF Protection**: Protect against cross-site request forgery
4. **Enable HTTPS**: Ensure all traffic is encrypted
5. **Implement Proper Authentication**: Replace the simple admin authentication with a robust solution
6. **Regular Updates**: Keep dependencies up to date to patch security vulnerabilities