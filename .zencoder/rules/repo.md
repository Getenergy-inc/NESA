---
description: Repository Information Overview
alwaysApply: true
---

# NESA Africa Client Information

## Summary
This is a Next.js application for NESA Africa, featuring admin functionality, user authentication, and various client-side features. The application uses a hybrid approach with both Next.js App Router and Pages Router, with NextAuth.js for authentication. The project is built with TypeScript and uses Material UI for components.

## Structure
- **app/**: Next.js App Router pages and layouts
- **pages/**: Next.js Pages Router pages and API routes
- **components/**: React components organized by functionality
- **lib/**: Utility functions, providers, services, and hooks
- **public/**: Static assets (images, CSS, videos)
- **styles/**: Global CSS and styling files
- **types/**: TypeScript type definitions
- **scripts/**: Utility scripts for testing and health checks

## Language & Runtime
**Language**: TypeScript 5.x
**Framework**: Next.js 14.2.5
**Build System**: Next.js build system
**Package Manager**: pnpm (with pnpm-lock.yaml)

## Dependencies
**Main Dependencies**:
- next: ^14.2.5
- react: ^18.3.1
- react-dom: ^18
- next-auth: ^4.24.7
- @mui/material: ^7.3.2
- @mui/icons-material: ^7.3.2
- axios: ^1.6.7
- mongoose: ^8.17.1
- tailwindcss: ^3.4.17
- react-hook-form: ^7.56.2
- zod: ^3.24.4
- framer-motion: ^10.16.16
- express: ^5.1.0 (for custom server)

**Development Dependencies**:
- typescript: ^5
- eslint: ^8
- eslint-config-next: 14.0.4
- @types/react: ^18
- @types/node: ^20
- jest: ^30.0.5
- @testing-library/react: ^16.3.0

## Build & Installation
```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Production build with increased memory allocation
pnpm build

# Start production server
pnpm start
```

## Authentication
**Framework**: NextAuth.js 4.x
**Configuration**: 
- Uses Credentials provider for email/password login
- Custom admin authentication with hardcoded credentials (for development)
- JWT-based session strategy
- API routes in pages/api/auth/[...nextauth].ts
- Configuration in lib/auth.ts

## API Integration
**Client**: Axios-based apiClient with interceptors
**Base URL**: http://localhost:3001 (dev) or https://nesa-africa-backend-7sio.onrender.com (prod)
**Authentication**: JWT tokens passed via Authorization header
**Services**: Modular service files in lib/services/

## Routing & Middleware
**Middleware**: Custom Next.js middleware for authentication checks
**Protected Routes**: Admin and member routes require authentication
**Hybrid Routing**: Uses both App Router and Pages Router

## UI Framework
**Component Library**: Material UI 7.x
**Styling**: Combination of MUI styling, Tailwind CSS, and custom CSS
**Responsive Design**: Mobile-first approach with responsive components

## State Management
**Form State**: react-hook-form with zod validation
**Global State**: Context API and custom hooks
**API State**: Combination of custom hooks and React Query

## Environment Variables
**Authentication**:
- NEXTAUTH_URL: NextAuth base URL
- NEXTAUTH_SECRET: Secret for JWT encryption

**API**:
- NEXT_PUBLIC_API_BASE_URL: Backend API URL
- NEXT_PUBLIC_NODE_ENV: Environment (development/production)

## Testing
**Framework**: Jest with React Testing Library
**Test Scripts**: Various test scripts in the scripts directory
**Health Checks**: Simple and full health check scripts

## Server Configuration
**Custom Server**: Uses Express server (server.js)
**Memory Optimization**: Increased memory allocation for builds
**Webpack Config**: Custom webpack configuration for polyfills and optimizations