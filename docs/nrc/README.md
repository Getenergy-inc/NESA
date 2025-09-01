# NESA Nominee Research Corps (NRC) System Documentation

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Quick Start](#quick-start)
4. [Documentation Index](#documentation-index)
5. [System Requirements](#system-requirements)
6. [Installation](#installation)
7. [Configuration](#configuration)
8. [Support](#support)

## Overview

The NESA Nominee Research Corps (NRC) System is a comprehensive volunteer management platform designed to facilitate the identification and documentation of 6,000+ impactful individuals and organizations across Africa for the NESA-Africa 2025 Awards.

### Key Features

- **Volunteer Application System**: Complete application workflow with validation
- **Admin Management Interface**: Comprehensive tools for managing volunteers and applications
- **Dashboard System**: Real-time progress tracking and nominee management
- **Notification System**: Automated communications and status updates
- **Access Control**: Role-based permissions and protected routes
- **Data Management**: Complete CRUD operations with localStorage persistence

### System Components

```
NRC System
├── Frontend Application (React/Next.js)
├── Mock Services (localStorage-based)
├── Authentication Integration
├── Notification System
├── Admin Interface
└── User Dashboard
```

## Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Interface│    │  Mock Services  │    │  Data Storage   │
│                 │    │                 │    │                 │
│ • Landing Page  │◄──►│ • NRC Service   │◄──►│ • localStorage  │
│ • Application   │    │ • Notifications │    │ • Session Data  │
│ • Dashboard     │    │ • Auth Hook     │    │ • User State    │
│ • Admin Panel   │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack

- **Frontend Framework**: React 18 with Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **State Management**: React Context + Custom Hooks
- **Data Persistence**: localStorage (Mock Implementation)

## Quick Start

### 1. Access the System

Navigate to the NRC landing page:
```
/get-involved/nrc-volunteer
```

### 2. User Journey

1. **Discover**: Learn about the NRC program
2. **Apply**: Submit volunteer application
3. **Review**: Admin reviews and approves/rejects
4. **Access**: Approved users gain dashboard access
5. **Contribute**: Upload nominee profiles and track progress

### 3. Admin Access

Access the admin interface through the NRC Management component:
```typescript
import NRCManagement from '@/components/UI/admin/NRCManagement';
```

## Documentation Index

### Core Documentation

| Document | Description | Path |
|----------|-------------|------|
| [API Reference](./API_REFERENCE.md) | Complete API documentation for all services | `docs/nrc/API_REFERENCE.md` |
| [Component Guide](./COMPONENT_GUIDE.md) | Detailed component documentation | `docs/nrc/COMPONENT_GUIDE.md` |
| [User Guide](./USER_GUIDE.md) | End-user documentation | `docs/nrc/USER_GUIDE.md` |
| [Admin Guide](./ADMIN_GUIDE.md) | Administrator documentation | `docs/nrc/ADMIN_GUIDE.md` |
| [Developer Guide](./DEVELOPER_GUIDE.md) | Development and customization guide | `docs/nrc/DEVELOPER_GUIDE.md` |

### Technical Documentation

| Document | Description | Path |
|----------|-------------|------|
| [Architecture Guide](./ARCHITECTURE.md) | System architecture and design patterns | `docs/nrc/ARCHITECTURE.md` |
| [Data Models](./DATA_MODELS.md) | Database schema and data structures | `docs/nrc/DATA_MODELS.md` |
| [Security Guide](./SECURITY.md) | Security implementation and best practices | `docs/nrc/SECURITY.md` |
| [Testing Guide](./TESTING.md) | Testing strategies and procedures | `docs/nrc/TESTING.md` |
| [Deployment Guide](./DEPLOYMENT.md) | Production deployment instructions | `docs/nrc/DEPLOYMENT.md` |

### Implementation Guides

| Document | Description | Path |
|----------|-------------|------|
| [Mock Services](./MOCK_SERVICES.md) | Mock service implementation details | `docs/nrc/MOCK_SERVICES.md` |
| [State Management](./STATE_MANAGEMENT.md) | State management patterns and hooks | `docs/nrc/STATE_MANAGEMENT.md` |
| [Notification System](./NOTIFICATIONS.md) | Notification system implementation | `docs/nrc/NOTIFICATIONS.md` |
| [Access Control](./ACCESS_CONTROL.md) | Authentication and authorization | `docs/nrc/ACCESS_CONTROL.md` |

## System Requirements

### Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Development Environment

- **Node.js**: 18.0+
- **npm**: 8.0+
- **TypeScript**: 5.0+
- **React**: 18.0+
- **Next.js**: 14.0+

### Runtime Dependencies

```json
{
  "react": "^18.0.0",
  "next": "^14.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.0.0",
  "framer-motion": "^10.0.0",
  "react-hook-form": "^7.0.0",
  "zod": "^3.0.0",
  "lucide-react": "^0.263.0"
}
```

## Installation

### 1. Prerequisites

Ensure you have the required development environment set up:

```bash
node --version  # Should be 18.0+
npm --version   # Should be 8.0+
```

### 2. Project Setup

The NRC system is integrated into the existing NESA-Africa platform. No additional installation is required if you have the main project set up.

### 3. Verify Installation

Check that all NRC components are accessible:

```bash
# Check if NRC files exist
ls -la components/UI/nrc/
ls -la lib/services/mockNRCService.ts
ls -la lib/hooks/useNRCStatus.ts
```

### 4. Initialize Sample Data

The system automatically initializes with sample data when first accessed. To manually reset:

```typescript
import { initializeSampleData } from '@/lib/services/mockNRCService';
initializeSampleData();
```

## Configuration

### Environment Variables

No additional environment variables are required for the mock implementation. For production deployment, see the [Deployment Guide](./DEPLOYMENT.md).

### Feature Flags

The system includes several configurable features:

```typescript
// In your configuration file
const NRC_CONFIG = {
  ENABLE_NOTIFICATIONS: true,
  ENABLE_FILE_UPLOAD: true,
  MAX_NOMINEES_PER_VOLUNTEER: 200,
  APPLICATION_DEADLINE: '2025-07-14',
  PROGRAM_START_DATE: '2025-07-15',
  PROGRAM_END_DATE: '2025-08-20'
};
```

### Customization

The system is designed to be highly customizable:

- **Styling**: Modify TailwindCSS classes
- **Validation**: Update Zod schemas
- **Workflow**: Customize application and approval processes
- **Data Structure**: Extend interfaces and types

## Support

### Getting Help

1. **Documentation**: Check the relevant documentation files
2. **Code Comments**: Review inline code documentation
3. **Type Definitions**: Examine TypeScript interfaces
4. **Console Logs**: Check browser console for debug information

### Common Issues

| Issue | Solution | Reference |
|-------|----------|-----------|
| Application not submitting | Check form validation errors | [User Guide](./USER_GUIDE.md) |
| Dashboard access denied | Verify user approval status | [Access Control](./ACCESS_CONTROL.md) |
| Data not persisting | Check localStorage permissions | [Mock Services](./MOCK_SERVICES.md) |
| Admin functions not working | Verify admin role assignment | [Admin Guide](./ADMIN_GUIDE.md) |

### Debug Mode

Enable debug mode for detailed logging:

```typescript
// In browser console
localStorage.setItem('NRC_DEBUG', 'true');
```

### Performance Monitoring

Monitor system performance:

```typescript
// Check localStorage usage
console.log('NRC Data Size:', 
  JSON.stringify(localStorage).length / 1024 + ' KB'
);
```

## Version Information

- **Current Version**: 1.0.0
- **Last Updated**: 2025-01-30
- **Compatibility**: NESA-Africa Platform v2.0+
- **Status**: Production Ready (Frontend-Only)

## Next Steps

1. **Read the User Guide**: Understand the complete user journey
2. **Review Component Guide**: Learn about available components
3. **Check API Reference**: Understand service interfaces
4. **Explore Admin Guide**: Learn administrative functions
5. **Review Developer Guide**: Understand customization options

For detailed implementation information, start with the [Architecture Guide](./ARCHITECTURE.md) and [Developer Guide](./DEVELOPER_GUIDE.md).
