# NRC System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         NRC ECOSYSTEM                                │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│   VOLUNTEERS     │         │     ADMINS       │         │   PUBLIC         │
│                  │         │                  │         │   VISITORS       │
│  - Register      │         │  - Review        │         │                  │
│  - Add Nominees  │         │  - Verify        │         │  - Browse        │
│  - Track Status  │         │  - Reject        │         │  - View Nominees │
│  - Earn AGC      │         │  - Manage        │         │  - Nominate      │
└────────┬─────────┘         └────────┬─────────┘         └────────┬─────────┘
         │                            │                            │
         │                            │                            │
         ▼                            ▼                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        WEB APPLICATION                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────┐  ┌────────────────────┐  ┌───────────────┐ │
│  │  Volunteer Portal  │  │   Admin Panel      │  │ Public Pages  │ │
│  │                    │  │                    │  │               │ │
│  │  /nrc-volunteer/   │  │  /admin/           │  │ /nomination/  │ │
│  │  - Apply           │  │  - Pending List    │  │ - Categories  │ │
│  │  - Dashboard       │  │  - Verification    │  │ - Nominees    │ │
│  │  - Add Nominee     │  │  - AGC Management  │  │ - Details     │ │
│  └────────┬───────────┘  └────────┬───────────┘  └───────┬───────┘ │
│           │                       │                      │         │
└───────────┼───────────────────────┼──────────────────────┼─────────┘
            │                       │                      │
            ▼                       ▼                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          API LAYER                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │  NRC API         │  │  Admin API       │  │  Public API      │  │
│  │                  │  │                  │  │                  │  │
│  │  /api/v1/nrc/    │  │  /api/v1/nrc/    │  │  /api/v1/public/ │  │
│  │  - volunteers    │  │  admin/          │  │  - nominees      │  │
│  │  - nominees      │  │  - nominees      │  │                  │  │
│  │  - leaderboard   │  │  - verification  │  │  (Read-only)     │  │
│  │  - agc           │  │  - agc           │  │                  │  │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘  │
│           │                     │                      │            │
└───────────┼─────────────────────┼──────────────────────┼────────────┘
            │                     │                      │
            └─────────────────────┴──────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       SERVICE LAYER                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │  nrcService      │  │  walletService   │  │  publicNominee   │  │
│  │                  │  │                  │  │  Service         │  │
│  │  - CRUD ops      │  │  - AGC rewards   │  │                  │  │
│  │  - Validation    │  │  - Transactions  │  │  - Fetch public  │  │
│  │  - File upload   │  │  - Balance       │  │  - Transform     │  │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘  │
│           │                     │                      │            │
└───────────┼─────────────────────┼──────────────────────┼────────────┘
            │                     │                      │
            └─────────────────────┴──────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       DATABASE LAYER                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │  NRCVolunteer    │  │  NRCNominee      │  │  AGCTransaction  │  │
│  │  Model           │  │  Model           │  │  Model           │  │
│  │                  │  │                  │  │                  │  │
│  │  - volunteerId   │  │  - fullName      │  │  - userId        │  │
│  │  - email         │  │  - category      │  │  - amount        │  │
│  │  - status        │  │  - subcategory   │  │  - type          │  │
│  │  - agcBalance    │  │  - status        │  │  - description   │  │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘  │
│           │                     │                      │            │
└───────────┼─────────────────────┼──────────────────────┼────────────┘
            │                     │                      │
            └─────────────────────┴──────────────────────┘
                                  │
                                  ▼
                        ┌──────────────────┐
                        │   MongoDB        │
                        │   Database       │
                        └──────────────────┘
```

---

## Data Flow Diagrams

### 1. Volunteer Adds Nominee

```
Volunteer
    │
    ├─► Fill Form (NomineeUploadForm.tsx)
    │   ├─ Select Super Category
    │   ├─ Select Award Category
    │   ├─ Select Subcategory
    │   ├─ Fill Details
    │   └─ Upload Files
    │
    ├─► Submit (nrcService.createNominee)
    │   ├─ Validate Data
    │   ├─ Upload Files
    │   └─ Create FormData
    │
    ├─► API Call (POST /api/v1/nrc/nominees)
    │   ├─ Authenticate
    │   ├─ Validate
    │   └─ Save to DB
    │
    └─► Database (NRCNominee)
        ├─ status: REVIEW
        ├─ volunteerId: xxx
        └─ All nominee data
```

### 2. Admin Verifies Nominee

```
Admin
    │
    ├─► View Pending (Admin Panel)
    │   └─ GET /api/v1/nrc/admin/nominees/pending
    │
    ├─► Review Nominee
    │   ├─ Check details
    │   ├─ Verify information
    │   └─ Make decision
    │
    ├─► Verify (PUT /api/v1/nrc/admin/nominees/:id/verify)
    │   ├─ Update status → VERIFIED
    │   ├─ Award AGC to volunteer
    │   └─ Save changes
    │
    └─► Database Updated
        ├─ Nominee: status = VERIFIED
        └─ Volunteer: agcBalance += reward
```

### 3. Public Views Nominees

```
Public Visitor
    │
    ├─► Browse Categories (/nomination/sub-categories/...)
    │   └─ View static page
    │
    ├─► Click "See Nominees"
    │   └─ Navigate to /nominees?category=...&subcategory=...
    │
    ├─► SeeAll Component Loads
    │   ├─ Load static nominees (hardcoded)
    │   └─ Fetch NRC nominees (API call)
    │
    ├─► API Call (GET /api/v1/public/nominees)
    │   ├─ Filter: status = VERIFIED/PUBLISHED
    │   ├─ Filter: category = xxx
    │   ├─ Filter: subcategory = yyy
    │   └─ Return transformed data
    │
    ├─► Merge Data
    │   ├─ Static nominees
    │   ├─ + NRC nominees
    │   └─ = Combined list
    │
    └─► Display
        ├─ Show all nominees
        ├─ Show count (featured + community)
        └─ Render cards
```

---

## Component Architecture

### Volunteer Portal

```
/get-involved/nrc-volunteer/
│
├── page.tsx (Landing)
│   └── NRCLandingPage.tsx
│
├── apply/
│   └── page.tsx
│       └── NRCApplicationForm.tsx
│
├── dashboard/
│   └── page.tsx
│       └── Dashboard Component
│
└── nominees/
    └── add/
        └── page.tsx
            └── NomineeUploadForm.tsx
                ├── Award Category Selection
                ├── Subcategory Selection
                ├── Nominee Details Form
                ├── File Upload
                └── Submit Logic
```

### Public Pages

```
/nomination/sub-categories/
│
├── africa-lifetime-education-icon/
│   └── page.tsx
│
├── best-ngo-contribution/
│   └── page.tsx
│
├── africa-diaspora-impact/
│   └── page.tsx
│
└── [other-categories]/
    └── page.tsx

/nominees/
└── page.tsx
    └── SeeAll.tsx
        ├── Category Display
        ├── Subcategory Display
        ├── Nominee Display
        ├── Static Data Loading
        ├── NRC Data Fetching
        └── Data Merging
```

---

## Configuration Files

### Award Categories

```
lib/configs/awardCategories.ts
│
├── SUPER_AWARD_CATEGORIES[]
│   ├── africa-icon-blue-garnet
│   ├── blue-garnet-gold-certificate
│   └── platinum-certificate
│
├── AWARD_CATEGORIES[]
│   ├── value (database key)
│   ├── label (display name)
│   ├── superCategory (parent)
│   └── subcategories[]
│       ├── value
│       └── label
│
└── Helper Functions
    ├── getCategoryLabel()
    ├── getSubcategoryLabel()
    ├── getSubcategories()
    └── getSuperCategory()
```

### Category Mapping

```
lib/utils/categoryMapping.ts
│
├── CATEGORY_DISPLAY_TO_VALUE_MAP{}
│   └── Maps display names → database values
│
├── CATEGORY_VALUE_TO_DISPLAY_MAP{}
│   └── Maps database values → display names
│
├── CATEGORY_ALIASES{}
│   └── Alternative names → database values
│
└── Functions
    ├── getCategoryValue()
    └── getCategoryDisplayName()
```

---

## Database Schema

### NRCNominee

```javascript
{
  // Identity
  volunteerId: String (required, indexed),
  
  // Basic Info
  fullName: String (required),
  organizationName: String,
  country: String (required, indexed),
  region: String (required),
  
  // Contact
  email: String,
  phone: String,
  website: String,
  linkedinProfile: String,
  
  // Award Category
  superAwardCategory: String (required, indexed),
  awardCategory: String (required, indexed),
  subcategory: String (required, indexed),
  
  // Impact
  achievementSummary: String (required),
  impactMetrics: String (required),
  beneficiariesCount: String,
  yearsOfImpact: String,
  
  // Alignment
  sdgAlignment: [String],
  agendaAlignment: String (required),
  esgAlignment: String (required),
  
  // Files
  profileImageUrl: String,
  supportingDocuments: [String],
  
  // Status
  status: Enum ['DRAFT', 'REVIEW', 'VERIFIED', 'REJECTED', 'PUBLISHED'],
  reviewedBy: String,
  reviewDate: Date,
  reviewNotes: String,
  rejectionReason: String,
  
  // AGC
  agcAwarded: Number (default: 0),
  agcAwardedDate: Date,
  
  // Metadata
  dateCreated: Date,
  lastModified: Date,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## API Endpoints

### NRC API (Authenticated)

```
POST   /api/v1/nrc/nominees              - Create nominee
GET    /api/v1/nrc/nominees              - Get volunteer's nominees
PUT    /api/v1/nrc/nominees/:id          - Update nominee
DELETE /api/v1/nrc/nominees/:id          - Delete nominee

GET    /api/v1/nrc/volunteers/check-status  - Check volunteer status
GET    /api/v1/nrc/leaderboard              - Get AGC leaderboard
```

### Admin API (Admin Only)

```
GET    /api/v1/nrc/admin/nominees/pending     - Get pending nominees
PUT    /api/v1/nrc/admin/nominees/:id/verify  - Verify nominee
PUT    /api/v1/nrc/admin/nominees/:id/reject  - Reject nominee
POST   /api/v1/nrc/agc/process-weekly-bonuses - Process AGC bonuses
POST   /api/v1/nrc/agc/award-verification     - Award verification bonus
```

### Public API (No Auth)

```
GET    /api/v1/public/nominees  - Get verified/published nominees
       Query params:
       - awardCategory: string
       - subcategory: string
```

---

## Security Model

```
┌─────────────────────────────────────────┐
│         AUTHENTICATION                   │
├─────────────────────────────────────────┤
│                                          │
│  Volunteers:                             │
│  - Cookie-based auth                     │
│  - JWT tokens                            │
│  - Session management                    │
│                                          │
│  Admins:                                 │
│  - Role-based access                     │
│  - Admin-only routes                     │
│  - Elevated permissions                  │
│                                          │
│  Public:                                 │
│  - No authentication                     │
│  - Read-only access                      │
│  - Filtered data (VERIFIED only)         │
│                                          │
└─────────────────────────────────────────┘
```

---

## File Storage

```
public/uploads/nominees/
│
├── images/
│   ├── profile/
│   │   └── [volunteerId]-[timestamp]-[filename]
│   │
│   └── thumbnails/
│       └── [generated thumbnails]
│
└── documents/
    └── [volunteerId]-[timestamp]-[filename]
```

---

## Performance Optimization

### Caching Strategy

```
Static Data (awardData.ts)
    └─► Loaded once at build time
    └─► Cached in memory

NRC Data (Database)
    └─► Fetched on demand
    └─► Cached for 5 minutes
    └─► Invalidated on updates

Images
    └─► CDN delivery
    └─► Lazy loading
    └─► Progressive enhancement
```

### Database Indexes

```
NRCNominee:
  - volunteerId (single)
  - status (single)
  - country (single)
  - awardCategory (single)
  - superAwardCategory (single)
  - { volunteerId, status } (compound)
  - { country, awardCategory } (compound)
  - { status, dateCreated } (compound)
  - { fullName, achievementSummary } (text)
```

---

## Monitoring & Logging

```
Application Logs:
  - API requests/responses
  - Database operations
  - File uploads
  - Errors and exceptions

Analytics:
  - Nominee submissions
  - Verification rates
  - Category popularity
  - User engagement

Performance:
  - API response times
  - Database query times
  - Page load times
  - File upload speeds
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────┐
│         PRODUCTION ENVIRONMENT           │
├─────────────────────────────────────────┤
│                                          │
│  Next.js Application                     │
│  ├─ Server-side rendering                │
│  ├─ API routes                           │
│  └─ Static generation                    │
│                                          │
│  MongoDB Atlas                           │
│  ├─ Replica set                          │
│  ├─ Automatic backups                    │
│  └─ Monitoring                           │
│                                          │
│  File Storage                            │
│  ├─ Local filesystem                     │
│  └─ CDN (optional)                       │
│                                          │
└─────────────────────────────────────────┘
```

---

**Version**: 1.0.0  
**Last Updated**: 2025-10-11  
**Status**: Production Ready ✅
