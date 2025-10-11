# 🚀 NRC Implementation Plan

## ✅ What's Working Now

1. **Volunteer Registration** - Users can register as NRC volunteers
2. **Dashboard** - Shows stats, profile, quick actions
3. **Nominee Upload** - Volunteers can upload nominees
4. **Admin Verification** - Admins can verify/reject nominees
5. **AGC Rewards** - Automatic 10 AGC per verified nominee
6. **Status Tracking** - Nominees tracked through workflow

---

## 🔨 What Needs Implementation

### Priority 1: View My Nominations (CRITICAL)

**Why**: Volunteers can't see what they've uploaded

**Create**: `app/(main)/get-involved/nrc-volunteer/nominees/page.tsx`

```typescript
// Features:
- List all nominees by current volunteer
- Show status badges (Pending/Verified/Published/Rejected)
- Filter by status
- Search by name
- View details modal
- Edit pending nominees
- Delete pending nominees
```

**API Route**: `app/api/v1/nrc/volunteers/[userId]/nominees/route.ts`

```typescript
GET /api/v1/nrc/volunteers/{userId}/nominees
// Returns: Array of nominees with status
```

---

### Priority 2: Leaderboard (HIGH)

**Why**: Gamification and motivation

**Create**: `app/(main)/get-involved/nrc-volunteer/leaderboard/page.tsx`

```typescript
// Features:
- Top 20 volunteers by uploads
- Top 20 by AGC earned
- Filter by country/region
- Show: Rank, Name, Country, Uploads, AGC, Progress
- Highlight current user
- Refresh button
```

**API Route**: `app/api/v1/nrc/leaderboard/route.ts`

```typescript
GET /api/v1/nrc/leaderboard?type=uploads&limit=20&country=Nigeria
GET /api/v1/nrc/leaderboard?type=agc&limit=20
// Returns: Sorted array of volunteers
```

---

### Priority 3: Program Timeline (MEDIUM)

**Why**: Volunteers need to know deadlines

**Create**: `app/(main)/get-involved/nrc-volunteer/timeline/page.tsx`

```typescript
// Features:
- Visual timeline
- Program phases
- Important dates
- Deadlines
- Current phase indicator
- Countdown timers
```

**Data**: Can be hardcoded initially

```typescript
const timeline = [
  {
    phase: 'Registration',
    startDate: '2025-01-01',
    endDate: '2025-02-28',
    status: 'completed'
  },
  {
    phase: 'Nomination Period',
    startDate: '2025-03-01',
    endDate: '2025-06-30',
    status: 'active'
  },
  // ...
];
```

---

### Priority 4: Add Nominee Page (LOW)

**Why**: Might already exist, just needs routing

**Check if exists**: Look for nominee upload form component

**If not, create**: `app/(main)/get-involved/nrc-volunteer/nominees/add/page.tsx`

```typescript
// Features:
- Reuse NomineeUploadForm component
- Success message
- Redirect to "My Nominations"
```

---

## 📋 Implementation Order

### Week 1: Core Functionality
1. ✅ Fix API client port (DONE)
2. ✅ Fix user ID mismatch (DONE)
3. ✅ Create admin verification routes (DONE)
4. Create "View My Nominations" page
5. Create volunteer nominees API route

### Week 2: Engagement Features
6. Create Leaderboard page
7. Create Leaderboard API
8. Add filters and search
9. Test and polish

### Week 3: Polish & Timeline
10. Create Timeline page
11. Add timeline data
12. Update lastActive tracking
13. Add edit/delete nominee functionality

---

## 🎯 Quick Wins (Do These First)

### 1. View My Nominations Page (2-3 hours)

**File**: `app/(main)/get-involved/nrc-volunteer/nominees/page.tsx`

```typescript
'use client';
import { useState, useEffect } from 'react';
import { useNRCStatus } from '@/lib/hooks/useNRCStatus';

export default function MyNominations() {
  const { volunteer } = useNRCStatus();
  const [nominees, setNominees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (volunteer?.id) {
      fetchNominees();
    }
  }, [volunteer]);

  const fetchNominees = async () => {
    const userId = localStorage.getItem('nrc_user_id');
    const response = await fetch(`/api/v1/nrc/volunteers/${userId}/nominees`);
    const data = await response.json();
    if (data.success) {
      setNominees(data.data);
    }
    setLoading(false);
  };

  // ... render list with status badges
}
```

**API**: `app/api/v1/nrc/volunteers/[userId]/nominees/route.ts`

```typescript
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  await connectToNRCDatabase();
  
  const nominees = await NRCNominee.find({ 
    volunteerId: params.userId 
  }).sort({ dateCreated: -1 });

  return NextResponse.json({
    success: true,
    data: nominees
  });
}
```

---

### 2. Leaderboard Page (3-4 hours)

**File**: `app/(main)/get-involved/nrc-volunteer/leaderboard/page.tsx`

```typescript
'use client';
import { useState, useEffect } from 'react';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [type, setType] = useState('uploads'); // or 'agc'

  useEffect(() => {
    fetchLeaderboard();
  }, [type]);

  const fetchLeaderboard = async () => {
    const response = await fetch(`/api/v1/nrc/leaderboard?type=${type}&limit=20`);
    const data = await response.json();
    if (data.success) {
      setLeaders(data.data);
    }
  };

  // ... render leaderboard table
}
```

**API**: `app/api/v1/nrc/leaderboard/route.ts`

```typescript
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'uploads';
  const limit = parseInt(searchParams.get('limit') || '20');

  await connectToNRCDatabase();

  const sortField = type === 'uploads' ? 'nomineesUploaded' : 'agcBalance';
  
  const leaders = await NRCVolunteer.find({ status: 'ACTIVE' })
    .sort({ [sortField]: -1 })
    .limit(limit)
    .select('fullName country nomineesUploaded agcBalance');

  return NextResponse.json({
    success: true,
    data: leaders
  });
}
```

---

## 🐛 Known Issues to Fix

1. **lastActive not updating** - Add middleware to update on any action
2. **Hardcoded target** - Use volunteer.targetNominees from DB
3. **No edit functionality** - Add edit button for pending nominees
4. **No delete functionality** - Add delete button for pending nominees

---

## 📊 Success Metrics

After implementation, volunteers should be able to:
- ✅ Register and get approved
- ✅ Upload nominees
- ✅ View their uploads and status
- ✅ See their rank on leaderboard
- ✅ Track their AGC earnings
- ✅ Know program deadlines

Admins should be able to:
- ✅ See pending nominees
- ✅ Verify/reject nominees
- ✅ See verification stats
- ✅ Track volunteer performance

---

## 🎉 Summary

**Completed**:
- ✅ Core infrastructure
- ✅ Admin verification
- ✅ AGC rewards

**Next Up**:
1. View My Nominations (CRITICAL)
2. Leaderboard (HIGH)
3. Timeline (MEDIUM)

**Estimated Time**: 8-10 hours total for all missing features
