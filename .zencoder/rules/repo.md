---
description: Repository Information Overview
alwaysApply: true
---

# NESA Web Application Information

## Summary
NESA is a Next.js web application for managing educational awards, nominations, judging, and user interactions. The application includes features for user authentication, award nominations, judging processes, and administrative functions.

## Structure
- **app/**: Next.js App Router structure with route groups and API routes
- **components/**: Reusable UI components
- **lib/**: Utility functions, services, and configuration
- **public/**: Static assets (images, CSS, videos)
- **styles/**: Global and component-specific styles
- **scripts/**: Utility scripts for testing and health checks

## Language & Runtime
**Language**: TypeScript/JavaScript
**Version**: TypeScript 5.x
**Framework**: Next.js 14.2.33
**Node Version**: Requires Node.js with increased memory allocation (--max-old-space-size=4096)
**Build System**: Next.js build system
**Package Manager**: pnpm

## Dependencies
**Main Dependencies**:
- React 18.3.1
- Next.js 14.2.33
- next-auth 4.24.7
- mongoose 8.17.1
- axios 1.6.7
- react-hook-form 7.56.2
- tailwindcss 3.4.17
- framer-motion 10.16.16
- socket.io 4.8.1
- Material UI 7.3.2

**Development Dependencies**:
- TypeScript 5.x
- ESLint 8.x
- Jest 30.0.5
- Testing Library (React, Jest)
- Autoprefixer 10.4.21
- PostCSS 8.5.6

## Build & Installation
```bash
# Install dependencies
pnpm install

# Development
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start
```

## Server Configuration
**Server**: Custom Express server (server.js)
**Port**: 3000
**Deployment**: Configured for Netlify deployment
**Environment Variables**:
- MONGODB_URI
- NEXTAUTH_SECRET
- NEXTAUTH_URL
- ADMIN_USERNAME/PASSWORD
- GOOGLE_CLIENT_EMAIL
- GOOGLE_PRIVATE_KEY
- GOOGLE_SHEET_ID

## Authentication
**Framework**: NextAuth.js
**Providers**: Credentials provider
**Strategy**: JWT-based authentication
**Routes**: 
- Login: /account/login
- API: /api/auth/[...nextauth]
- Error: /api/auth/error

## Main Application Structure
**Entry Points**:
- Main application: app/page.tsx
- Admin dashboard: app/admin/dashboard/page.tsx
- Member area: app/member/page.tsx
- Judge portal: app/judge/page.tsx

**Key Features**:
- Award nominations and voting
- Judging system with categories
- Member profiles and wallets
- Admin dashboard for management
- Authentication and authorization

## Testing
**Framework**: Jest with Testing Library
**Test Location**: Not explicitly defined in project structure
**Run Command**:
```bash
# Health checks
pnpm health-check
pnpm health-check-full

# Integration tests
pnpm test:nrc-integration
pnpm test:nrc-auth
```

## Deployment Issues
The application is experiencing build failures on Netlify with the following issues:
1. TypeScript error: "i is not a constructor" in the NextAuth implementation
2. Failed to collect page data for /api/auth/[...nextauth]
3. Memory allocation issues requiring NODE_OPTIONS=--max-old-space-size=4096
4. CSS warnings related to IE compatibility in grid containers