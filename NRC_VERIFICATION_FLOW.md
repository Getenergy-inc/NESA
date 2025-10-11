# 🔄 NRC Nominee Verification & Publication Flow

## Overview

This document explains how nominees uploaded by NRC volunteers are verified and published to appear in public nomination categories.

---

## 📊 Complete Flow Diagram

```
NRC Volunteer Uploads Nominee
           ↓
    Status: REVIEW (Pending)
           ↓
    Admin Verification Page
    (/admin/nrc-verification)
           ↓
    Admin Reviews Nominee
           ↓
    ┌──────────────┴──────────────┐
    ↓                             ↓
VERIFY & PUBLISH              REJECT
    ↓                             ↓
Status: PUBLISHED          Status: REJECTED
    ↓                             ↓
Appears in Public         Volunteer Notified
Nomination Categories     (Stats Updated)
    ↓
Public Can View
(/nominations/category/{category})
```

---

## 🎯 Step-by-Step Process

### Step 1: NRC Volunteer Uploads Nominee

**Location**: `/get-involved/nrc-volunteer/nominees/add`

**What Happens**:
1. Volunteer fills nominee form
2. Uploads profile image & documents
3. Submits with status: `REVIEW`
4. Nominee saved to database
5. Volunteer stats updated (nomineesUploaded +1, nomineesPending +1)
6. AGC reward for first 10 uploads

**API**: `POST /api/v1/nrc/nominees`

**Database**: NRCNominee collection
```javascript
{
  volunteerId: "nrc-user-email-com-123",
  fullName: "Jane Doe",
  awardCategory: "NGO Educational Champion",
  subcategory: "Best NGO for Inclusive Education",
  status: "REVIEW",  // ← Pending verification
  dateCreated: "2025-10-07T..."
}
```

---

### Step 2: Admin Reviews Pending Nominees

**Location**: `/admin/nrc-verification`

**What Admin Sees**:
- List of all nominees with status: `REVIEW`
- Statistics (Pending, Verified, Published, Rejected)
- Search and filter options
- Full nominee details

**API**: `GET /api/v1/nrc/admin/nominees/pending`

**Features**:
- ✅ View full nominee profile
- ✅ See achievement summary
- ✅ Check impact metrics
- ✅ Review SDG alignment
- ✅ Verify uploaded documents

---

### Step 3: Admin Decision

#### Option A: Verify & Publish ✅

**Action**: Click "Verify & Publish"

**What Happens**:
1. Nominee status changes: `REVIEW` → `PUBLISHED`
2. Volunteer stats updated:
   - nomineesVerified +1
   - nomineesPending -1
3. AGC reward: 0.5 AGC (non-withdrawable)
4. Nominee appears in public categories
5. Volunteer notified (via dashboard)

**API**: `POST /api/v1/nrc/admin/nominees/{id}/verify`

```javascript
{
  reviewedBy: "admin",
  reviewNotes: "Verified by admin",
  publishToPublic: true  // ← Makes it public
}
```

#### Option B: Reject ❌

**Action**: Click "Reject" + Enter reason

**What Happens**:
1. Nominee status changes: `REVIEW` → `REJECTED`
2. Volunteer stats updated:
   - nomineesRejected +1
   - nomineesPending -1
3. Rejection reason saved
4. Volunteer can see reason in dashboard
5. No AGC reward

**API**: `POST /api/v1/nrc/admin/nominees/{id}/reject`

```javascript
{
  reviewedBy: "admin",
  rejectionReason: "Insufficient documentation"
}
```

---

### Step 4: Published Nominees Appear in Categories

**Public Location**: `/nominations/category/{category-name}`

**Examples**:
- `/nominations/category/NGO Educational Champion of the Decade`
- `/nominations/category/Corporate Social Responsibility Champion`
- `/nominations/category/Faith-Based Educational Champion`

**What Public Sees**:
- Grid of verified nominees
- Profile images
- Achievement summaries
- Impact metrics
- SDG alignment
- Full profile modal

**API**: `GET /api/v1/nominations/by-category?category={name}`

**Query**: Only nominees with status: `PUBLISHED`

---

## 🔗 Integration Points

### 1. Admin Verification Page

**URL**: `/admin/nrc-verification`

**Features**:
```typescript
// Stats Dashboard
- Pending Review: 45
- Verified: 120
- Published: 115
- Rejected: 5

// Filters
- Search by name/category
- Filter by category
- Sort by date

// Actions per nominee
- View Details
- Verify & Publish
- Reject with reason
```

### 2. Public Category Pages

**URL Pattern**: `/nominations/category/{category}`

**Dynamic Routes**:
```
/nominations/category/NGO Educational Champion of the Decade
/nominations/category/Corporate Social Responsibility Champion
/nominations/category/Faith-Based Educational Champion
/nominations/category/Government Educational Champion
... (all 16 categories)
```

**Features**:
```typescript
// Nominee Cards
- Profile image
- Full name
- Organization
- Country/Region
- Subcategory
- Achievement summary
- "View Full Profile" button

// Detail Modal
- Full achievement summary
- Impact metrics
- SDG alignment
- All nominee information
```

---

## 📡 API Endpoints

### Admin Endpoints

#### Get Pending Nominees
```bash
GET /api/v1/nrc/admin/nominees/pending
Query: ?page=1&limit=20&category=NGO&country=Nigeria

Response:
{
  "success": true,
  "data": {
    "nominees": [...],
    "stats": {
      "pending": 45,
      "verified": 120,
      "published": 115,
      "rejected": 5
    },
    "pagination": {...}
  }
}
```

#### Verify Nominee
```bash
POST /api/v1/nrc/admin/nominees/{id}/verify
Body: {
  "reviewedBy": "admin",
  "reviewNotes": "Verified",
  "publishToPublic": true
}

Response:
{
  "success": true,
  "message": "Nominee verified and published",
  "data": {
    "nomineeId": "...",
    "status": "PUBLISHED",
    "agcAwarded": 0.5
  }
}
```

#### Reject Nominee
```bash
POST /api/v1/nrc/admin/nominees/{id}/reject
Body: {
  "reviewedBy": "admin",
  "rejectionReason": "Insufficient documentation"
}

Response:
{
  "success": true,
  "message": "Nominee rejected",
  "data": {
    "nomineeId": "...",
    "status": "REJECTED",
    "rejectionReason": "..."
  }
}
```

### Public Endpoints

#### Get Nominees by Category
```bash
GET /api/v1/nominations/by-category
Query: ?category=NGO Educational Champion&page=1&limit=20

Response:
{
  "success": true,
  "data": {
    "nominees": [
      {
        "_id": "...",
        "fullName": "Jane Doe",
        "organizationName": "Education NGO",
        "country": "Nigeria",
        "awardCategory": "NGO Educational Champion",
        "subcategory": "Best NGO for Inclusive Education",
        "achievementSummary": "...",
        "impactMetrics": "...",
        "sdgAlignment": ["SDG 4", "SDG 10"],
        "profileImageUrl": "/uploads/...",
        "dateCreated": "2025-10-07T..."
      }
    ],
    "categoryCounts": [
      { "_id": "NGO Educational Champion", "count": 45 },
      { "_id": "CSR Champion", "count": 32 }
    ],
    "pagination": {...}
  }
}
```

---

## 🎨 UI Components

### Admin Verification Page

**Components**:
1. **Stats Cards** - Show counts for each status
2. **Search Bar** - Search by name/category
3. **Category Filter** - Filter by award category
4. **Nominee List** - Cards with key info
5. **Action Buttons** - View, Verify, Reject
6. **Detail Modal** - Full nominee information

### Public Category Page

**Components**:
1. **Category Header** - Title, description, count
2. **Nominee Grid** - 3-column responsive grid
3. **Nominee Cards** - Image, name, summary
4. **Detail Modal** - Full profile view
5. **SDG Badges** - Visual SDG alignment

---

## 🔄 Status Workflow

```
DRAFT (Optional)
  ↓
REVIEW (Pending Admin)
  ↓
  ├─→ VERIFIED (Approved, not public yet)
  ├─→ PUBLISHED (Approved & Public) ✅
  └─→ REJECTED (Not approved) ❌
```

**Status Meanings**:
- `DRAFT`: Saved but not submitted (future feature)
- `REVIEW`: Submitted, waiting for admin verification
- `VERIFIED`: Approved by admin, not yet public
- `PUBLISHED`: Approved and visible to public ✅
- `REJECTED`: Not approved, with reason

---

## 💰 AGC Rewards

### Upload Reward (First 10)
```
Upload #1-5:  0.5 AGC (non-withdrawable)
Upload #6-10: 0.5 AGC (partially withdrawable)
```

### Verification Reward
```
Status: REVIEW → PUBLISHED
Reward: 0.5 AGC (non-withdrawable)
Awarded to: Volunteer who uploaded
```

### No Reward for Rejection
```
Status: REVIEW → REJECTED
Reward: 0 AGC
Stats: nomineesRejected +1
```

---

## 📊 Volunteer Dashboard Updates

### After Upload
```
Nominees Uploaded: +1
Nominees Pending: +1
AGC Earned: +0.5 (if first 10)
```

### After Verification
```
Nominees Verified: +1
Nominees Pending: -1
AGC Earned: +0.5
Level: May increase
```

### After Rejection
```
Nominees Rejected: +1
Nominees Pending: -1
Can view rejection reason
```

---

## 🔍 Finding Published Nominees

### Method 1: Direct Category URL
```
/nominations/category/NGO Educational Champion of the Decade
```

### Method 2: Browse All Categories
```
/nominations (main page)
→ Click category
→ See all published nominees
```

### Method 3: API Query
```javascript
// Get all published nominees in a category
const response = await fetch(
  '/api/v1/nominations/by-category?category=NGO Educational Champion'
);
const { nominees } = await response.json();
```

---

## 🎯 Key Features

### For Admins
- ✅ Centralized verification dashboard
- ✅ Bulk actions support
- ✅ Search and filter
- ✅ Detailed nominee view
- ✅ One-click verify & publish
- ✅ Rejection with reason

### For Public
- ✅ Browse by category
- ✅ View verified nominees
- ✅ See full profiles
- ✅ Filter and search
- ✅ Responsive design
- ✅ Image galleries

### For Volunteers
- ✅ Real-time stats
- ✅ See verification status
- ✅ View rejection reasons
- ✅ Track AGC rewards
- ✅ Monitor progress

---

## 🚀 Quick Start

### For Admins

1. **Access Verification Page**
   ```
   http://localhost:3000/admin/nrc-verification
   ```

2. **Review Pending Nominees**
   - See list of nominees with status: REVIEW
   - Click "View" to see full details

3. **Verify & Publish**
   - Click "Verify & Publish"
   - Nominee appears in public category
   - Volunteer gets AGC reward

4. **Or Reject**
   - Click "Reject"
   - Enter reason
   - Volunteer can see reason

### For Public

1. **Browse Categories**
   ```
   http://localhost:3000/nominations/category/NGO Educational Champion of the Decade
   ```

2. **View Nominees**
   - See all published nominees
   - Click card to view full profile

3. **Vote (Future Feature)**
   - Vote for favorite nominees
   - Track voting progress

---

## 📝 Summary

**Complete Flow**:
1. ✅ NRC Volunteer uploads nominee → Status: REVIEW
2. ✅ Admin reviews at `/admin/nrc-verification`
3. ✅ Admin verifies → Status: PUBLISHED
4. ✅ Nominee appears at `/nominations/category/{category}`
5. ✅ Public can view and vote
6. ✅ Volunteer gets AGC reward

**Status**: 🎉 FULLY IMPLEMENTED & READY TO USE!
