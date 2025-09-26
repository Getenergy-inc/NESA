---
description: Repository Information Overview
alwaysApply: true
---

# NESA Africa Client Information

## Summary
This is a Next.js application for NESA Africa, featuring admin functionality, user authentication, and various client-side features. The application uses NextAuth.js for authentication and includes multiple page routes for different sections of the website.

## Structure
- **app/**: Next.js app router pages and API routes
- **components/**: React components organized by functionality
- **lib/**: Utility functions, providers, and services
- **public/**: Static assets
- **styles/**: CSS and styling files
- **types/**: TypeScript type definitions

## Language & Runtime
**Language**: TypeScript/JavaScript
**Version**: Uses Next.js 14
**Build System**: npm
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- next: Next.js framework
- react/react-dom: React library
- next-auth: Authentication library
- @mui/material: Material UI components
- mongodb: MongoDB database client

**Development Dependencies**:
- typescript: TypeScript compiler
- eslint: Code linting
- @types/react: TypeScript definitions for React

## Build & Installation
```bash
npm install
npm run dev     # Development server
npm run build   # Production build
npm start       # Start production server
```

## Authentication
**Framework**: NextAuth.js
**Configuration**: 
- Uses Credentials provider for email/password login
- Custom admin authentication via environment variables
- JWT-based session management

## API Routes
**Authentication**: `/api/auth/[...nextauth]`
**Environment Check**: `/api/check-env`
**Admin Check**: `/api/check-admin-env`

## Main Components
**Providers**:
- NextAuthProvider: Wraps application with SessionProvider
- ThemeProvider: Provides MUI theme

**UI Components**:
- Login: Handles user authentication
- AdminLayout: Layout for admin pages
- Various page-specific components

## Environment Variables
**Authentication**:
- ADMIN_USERNAME: Admin username
- ADMIN_PASSWORD: Admin password
- ADMIN_TOKEN: Admin authentication token
- NEXTAUTH_URL: NextAuth base URL
- NEXTAUTH_SECRET: Secret for JWT encryption

**Database**:
- MONGODB_URI: MongoDB connection string
- DATABASE_URL: PostgreSQL connection string

## Testing
**Framework**: Not explicitly defined
**Test Location**: No dedicated test directory found

## Deployment
**Configuration**: No explicit deployment configuration found
**Environment**: Supports development and production environments