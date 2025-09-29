---
description: Repository Information Overview
alwaysApply: true
---

# NESA Client Application Information

## Summary
A Next.js application for the NESA (Nigerian Economic Summit Association) platform. The application handles user authentication, profile management, and various features for members, sponsors, and administrators.

## Structure
- `/app`: Next.js app router structure with pages and API routes
- `/components`: React components organized by feature and UI elements
- `/lib`: Utility functions, services, providers, and types
- `/public`: Static assets like images and fonts
- `/scripts`: Build and deployment helper scripts

## Language & Runtime
**Language**: TypeScript/JavaScript
**Version**: TypeScript 5.x
**Framework**: Next.js 14.2.5
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- next: ^14.2.5
- react: ^18.3.1
- react-dom: ^18
- axios: ^1.6.7
- next-auth: ^4.24.7 (to be removed)
- @mui/material: ^7.3.2
- @tanstack/react-query: ^5.26.3
- tailwindcss: ^3.4.17

## Build & Installation
```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build

# Start production server
npm start
```

## Authentication
**Current Implementation**: 
- Using NextAuth.js with custom credentials provider
- Authentication API calls to external backend at https://nesa-africa-backend-7sio.onrender.com
- JWT token-based authentication with cookies

**Planned Changes**:
- Remove NextAuth.js dependency
- Use direct API calls to backend for authentication
- Store authentication tokens in cookies or localStorage
- Update middleware to check for custom auth tokens

## Deployment
**Platform**: Netlify
**Configuration**: netlify.toml with redirects for protected routes
**Build Command**: Uses custom build helper script to handle build errors