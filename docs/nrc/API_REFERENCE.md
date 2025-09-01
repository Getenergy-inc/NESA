# NRC API Reference

## Overview

This document provides comprehensive API documentation for all NRC services, including mock implementations and interfaces that would be used with a real backend.

## Table of Contents

1. [Mock NRC Service](#mock-nrc-service)
2. [Mock Notification Service](#mock-notification-service)
3. [Data Types](#data-types)
4. [Error Handling](#error-handling)
5. [Usage Examples](#usage-examples)

## Mock NRC Service

**File**: `lib/services/mockNRCService.ts`

### Interfaces

#### NRCApplication
```typescript
interface NRCApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  motivation: string;
  experience: string;
  availability: string;
  skills: string[];
  commitment: boolean;
  terms: boolean;
  cv?: File;
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewDate?: string;
  reviewNotes?: string;
}
```

#### NRCVolunteer
```typescript
interface NRCVolunteer {
  id: string;
  applicationId: string;
  fullName: string;
  email: string;
  country: string;
  approvalDate: string;
  nomineesUploaded: number;
  targetNominees: number;
  completionRate: number;
  lastActive: string;
  status: 'active' | 'inactive';
}
```

#### NomineeProfile
```typescript
interface NomineeProfile {
  id: string;
  volunteerId: string;
  fullName: string;
  organizationName?: string;
  country: string;
  region: string;
  email?: string;
  phone?: string;
  website?: string;
  linkedinProfile?: string;
  awardCategory: string;
  subcategory: string;
  achievementSummary: string;
  impactMetrics: string;
  beneficiariesCount?: string;
  yearsOfImpact?: string;
  sdgAlignment: string[];
  agendaAlignment: string;
  esgAlignment: string;
  verificationLinks?: string;
  mediaLinks?: string;
  additionalNotes?: string;
  supportingDocuments?: File[];
  profileImage?: File;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  dateCreated: string;
  completionScore: number;
}
```

### API Methods

#### submitNRCApplication
Submits a new NRC volunteer application.

```typescript
async function submitNRCApplication(
  applicationData: Omit<NRCApplication, 'id' | 'applicationDate' | 'status'>
): Promise<MockServiceResponse<NRCApplication>>
```

**Parameters:**
- `applicationData`: Application data without system-generated fields

**Returns:**
- `MockServiceResponse<NRCApplication>`: Response with created application

**Example:**
```typescript
const response = await submitNRCApplication({
  fullName: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  country: "Nigeria",
  motivation: "Passionate about education...",
  experience: "5 years in education...",
  availability: "Available full-time",
  skills: ["Research", "Writing"],
  commitment: true,
  terms: true
});

if (response.success) {
  console.log("Application submitted:", response.data);
} else {
  console.error("Error:", response.message);
}
```

#### getAllNRCApplications
Retrieves all NRC applications (admin only).

```typescript
async function getAllNRCApplications(): Promise<MockServiceResponse<NRCApplication[]>>
```

**Returns:**
- `MockServiceResponse<NRCApplication[]>`: All applications

**Example:**
```typescript
const response = await getAllNRCApplications();
if (response.success) {
  const applications = response.data || [];
  console.log(`Found ${applications.length} applications`);
}
```

#### reviewNRCApplication
Reviews an NRC application (approve/reject).

```typescript
async function reviewNRCApplication(
  applicationId: string,
  action: 'approve' | 'reject',
  reviewNotes?: string,
  reviewedBy: string = 'Admin'
): Promise<MockServiceResponse<NRCApplication>>
```

**Parameters:**
- `applicationId`: ID of the application to review
- `action`: 'approve' or 'reject'
- `reviewNotes`: Optional review notes
- `reviewedBy`: Name of the reviewer

**Returns:**
- `MockServiceResponse<NRCApplication>`: Updated application

**Example:**
```typescript
const response = await reviewNRCApplication(
  'app-123',
  'approve',
  'Excellent qualifications',
  'Admin User'
);

if (response.success) {
  console.log("Application approved:", response.data);
}
```

#### getAllNRCVolunteers
Retrieves all NRC volunteers (admin only).

```typescript
async function getAllNRCVolunteers(): Promise<MockServiceResponse<NRCVolunteer[]>>
```

**Returns:**
- `MockServiceResponse<NRCVolunteer[]>`: All volunteers

#### checkUserNRCStatus
Checks the NRC status for a specific user.

```typescript
async function checkUserNRCStatus(email: string): Promise<MockServiceResponse<{
  hasApplication: boolean;
  application?: NRCApplication;
  isApproved: boolean;
  volunteer?: NRCVolunteer;
}>>
```

**Parameters:**
- `email`: User's email address

**Returns:**
- Status information for the user

**Example:**
```typescript
const response = await checkUserNRCStatus('user@example.com');
if (response.success && response.data) {
  const { hasApplication, isApproved, volunteer } = response.data;
  
  if (isApproved && volunteer) {
    console.log("User is approved volunteer:", volunteer.fullName);
  } else if (hasApplication) {
    console.log("User has pending application");
  }
}
```

#### submitNomineeProfile
Submits a new nominee profile.

```typescript
async function submitNomineeProfile(
  volunteerId: string,
  nomineeData: Omit<NomineeProfile, 'id' | 'volunteerId' | 'status' | 'dateCreated' | 'completionScore'>
): Promise<MockServiceResponse<NomineeProfile>>
```

**Parameters:**
- `volunteerId`: ID of the volunteer submitting the nominee
- `nomineeData`: Nominee data without system-generated fields

**Returns:**
- `MockServiceResponse<NomineeProfile>`: Created nominee profile

#### getVolunteerNominees
Retrieves all nominees for a specific volunteer.

```typescript
async function getVolunteerNominees(volunteerId: string): Promise<MockServiceResponse<NomineeProfile[]>>
```

**Parameters:**
- `volunteerId`: ID of the volunteer

**Returns:**
- `MockServiceResponse<NomineeProfile[]>`: Volunteer's nominees

## Mock Notification Service

**File**: `lib/services/mockNotificationService.ts`

### Interfaces

#### Notification
```typescript
interface Notification {
  id: string;
  userId: string;
  type: 'application_submitted' | 'application_approved' | 'application_rejected' | 'nominee_submitted' | 'system_update';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}
```

### API Methods

#### createNotification
Creates a new notification.

```typescript
function createNotification(
  userId: string,
  type: Notification['type'],
  title: string,
  message: string,
  actionUrl?: string
): void
```

#### getUserNotifications
Gets all notifications for a user.

```typescript
function getUserNotifications(userId: string): Notification[]
```

#### markNotificationAsRead
Marks a notification as read.

```typescript
function markNotificationAsRead(notificationId: string): void
```

#### Helper Functions

```typescript
// Pre-built notification senders
function sendApplicationSubmittedNotification(userEmail: string, applicantName: string): void
function sendApplicationApprovedNotification(userEmail: string, applicantName: string): void
function sendApplicationRejectedNotification(userEmail: string, applicantName: string): void
function sendNomineeSubmittedNotification(userEmail: string, nomineeName: string): void
```

## Data Types

### MockServiceResponse
Generic response type for all service methods.

```typescript
interface MockServiceResponse<T> {
  success: boolean;
  data?: T;
  message: string;
}
```

### Storage Keys
Constants for localStorage keys.

```typescript
const STORAGE_KEYS = {
  APPLICATIONS: 'nrc_applications',
  VOLUNTEERS: 'nrc_volunteers',
  NOMINEES: 'nrc_nominees',
  CURRENT_USER_NRC_STATUS: 'current_user_nrc_status'
};
```

## Error Handling

### Common Error Scenarios

1. **Duplicate Application**
```typescript
{
  success: false,
  message: 'An application with this email already exists.'
}
```

2. **Application Not Found**
```typescript
{
  success: false,
  message: 'Application not found'
}
```

3. **Storage Error**
```typescript
{
  success: false,
  message: 'Failed to save data. Please try again.'
}
```

### Error Handling Pattern

```typescript
try {
  const response = await submitNRCApplication(data);
  
  if (response.success) {
    // Handle success
    console.log('Success:', response.message);
    const application = response.data;
  } else {
    // Handle error
    console.error('Error:', response.message);
    showErrorMessage(response.message);
  }
} catch (error) {
  // Handle unexpected errors
  console.error('Unexpected error:', error);
  showErrorMessage('An unexpected error occurred');
}
```

## Usage Examples

### Complete Application Flow

```typescript
// 1. Submit application
const applicationResponse = await submitNRCApplication({
  fullName: "Jane Smith",
  email: "jane@example.com",
  // ... other fields
});

// 2. Check status
const statusResponse = await checkUserNRCStatus("jane@example.com");

// 3. Admin review (if admin)
if (statusResponse.data?.hasApplication) {
  const reviewResponse = await reviewNRCApplication(
    statusResponse.data.application!.id,
    'approve'
  );
}

// 4. Submit nominee (if approved)
if (statusResponse.data?.isApproved && statusResponse.data.volunteer) {
  const nomineeResponse = await submitNomineeProfile(
    statusResponse.data.volunteer.id,
    {
      fullName: "Dr. Example",
      country: "Kenya",
      // ... other nominee fields
    }
  );
}
```

### Admin Dashboard Data Loading

```typescript
const loadAdminData = async () => {
  const [applicationsResponse, volunteersResponse] = await Promise.all([
    getAllNRCApplications(),
    getAllNRCVolunteers()
  ]);

  if (applicationsResponse.success) {
    setApplications(applicationsResponse.data || []);
  }

  if (volunteersResponse.success) {
    setVolunteers(volunteersResponse.data || []);
  }
};
```

### Volunteer Dashboard Data Loading

```typescript
const loadVolunteerData = async (volunteerId: string) => {
  const nomineesResponse = await getVolunteerNominees(volunteerId);
  
  if (nomineesResponse.success) {
    setNominees(nomineesResponse.data || []);
    
    // Calculate statistics
    const nominees = nomineesResponse.data || [];
    const stats = {
      total: nominees.length,
      approved: nominees.filter(n => n.status === 'approved').length,
      pending: nominees.filter(n => n.status === 'submitted').length,
      drafts: nominees.filter(n => n.status === 'draft').length
    };
    
    setStatistics(stats);
  }
};
```

## Production Migration

When migrating to a real backend, replace the mock service calls with HTTP requests:

```typescript
// Mock implementation
const response = await submitNRCApplication(data);

// Production implementation
const response = await fetch('/api/nrc/applications', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
const result = await response.json();
```

The interface remains the same, making migration seamless.

## Rate Limiting & Performance

### Mock Implementation Delays
The mock services include realistic delays to simulate network requests:

```typescript
const mockDelay = (ms: number = 1000): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));
```

### Performance Considerations

1. **localStorage Limits**: Browser localStorage typically has a 5-10MB limit
2. **Data Serialization**: Large files are not actually stored, only metadata
3. **Memory Usage**: Keep nominee lists paginated for large datasets
4. **Search Performance**: Implement client-side filtering efficiently

### Optimization Tips

```typescript
// Efficient data filtering
const filteredNominees = useMemo(() => {
  return nominees.filter(nominee =>
    nominee.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [nominees, searchQuery]);

// Debounced search
const debouncedSearch = useCallback(
  debounce((query: string) => setSearchQuery(query), 300),
  []
);
```
