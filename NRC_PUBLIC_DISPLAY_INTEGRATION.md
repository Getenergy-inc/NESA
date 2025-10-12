# NRC Public Display Integration

## Overview
This integration connects the NRC (Nominee Recognition Campaign) volunteer system with the public-facing nominee display pages. When volunteers add nominees through the NRC system and admins verify them, they automatically appear on the public website alongside existing hardcoded nominees.

## How It Works

### 1. Data Flow
```
Volunteer adds nominee → NRC Database (status: REVIEW)
                              ↓
Admin verifies nominee → Status changes to VERIFIED/PUBLISHED
                              ↓
Public API fetches verified nominees → Merges with static data
                              ↓
Displays on public pages (e.g., /nominees?category=...&subcategory=...)
```

### 2. Components

#### API Endpoint
- **Path**: `/api/v1/public/nominees`
- **Method**: GET
- **Query Params**:
  - `awardCategory`: The award category value (e.g., 'africa-lifetime-education-icon')
  - `subcategory`: The subcategory title
- **Returns**: Array of verified/published nominees in display format

#### Service
- **File**: `lib/services/publicNomineeService.ts`
- **Purpose**: Fetches nominees from the public API
- **Method**: `getNominees(awardCategory?, subcategory?)`

#### Display Component
- **File**: `components/UI/SeeAll/seeall.tsx`
- **Purpose**: Displays merged list of static + NRC nominees
- **Features**:
  - Shows loading state while fetching
  - Displays count of featured vs community-nominated
  - Seamlessly merges both data sources

### 3. Category Mapping

The system uses a mapping file to ensure category names match between:
- The NRC form (uses values like 'africa-lifetime-education-icon')
- The public display pages (uses full titles like 'Africa Lifetime Education Icon Special Recognition Award')

**File**: `lib/utils/categoryMapping.ts`

### 4. Data Transformation

NRC Database Format → Display Format:
```typescript
{
  fullName → name
  profileImageUrl → image
  achievementSummary → achievement
  region → state
  country → country
  organizationName → organization
}
```

## Current Implementation Status

### ✅ Fully Implemented - All Categories
- **Africa Icon Blue Garnet Award** (1 category)
  - Africa Lifetime Education Icon Special Recognition Award
  
- **Blue Garnet & Gold Certificate Awards** (7 categories)
  - Best NGO Contribution to Achieving Education for All
  - Africa Diaspora Association Educational Impact Projects
  - Overall Best CSR for Education in Nigeria Award 2024
  - Best EduTech Organization in Nigeria and Africa 2024
  - Overall Best Educational Friendly State in Nigeria 2024
  - Best Research and Development by Tertiary Institutions
  - Overall Best Global Education Excellence Award

- **Platinum Certificate of Recognition Awards** (8 categories)
  - CSR for Education Special Recognition Award in Africa
  - Best Library in Nigerian Tertiary Institutions Award
  - Best Media Organization with Outstanding Education Focus
  - Christian Faith Organization Educational Champion
  - Islamic Faith Organization Educational Champion
  - Best Educational Support by a Political Leader
  - Creative Arts Industry Contribution to Education
  - Support for Education in STEM in Nigeria 2024

**Total: 16 award categories fully integrated** ✅

## Testing

### To test the integration:

1. **Add a nominee through NRC**:
   - Go to `/get-involved/nrc-volunteer/nominees/add`
   - Fill out the form for "Africa Icon Blue Garnet Award"
   - Select a subcategory
   - Submit

2. **Verify the nominee** (as admin):
   - Go to admin panel
   - Find the nominee in pending list
   - Change status to "VERIFIED" or "PUBLISHED"

3. **View on public page**:
   - Go to `/nomination/sub-categories/africa-lifetime-education-icon`
   - Click "See Existing Nominees" for the subcategory
   - The new nominee should appear alongside existing ones

## Benefits

✅ **No data loss**: All existing hardcoded nominees still display
✅ **Automatic updates**: New verified nominees appear immediately
✅ **Scalable**: Easy to extend to other categories
✅ **Flexible**: Can gradually migrate hardcoded data to database
✅ **Transparent**: Shows users which nominees are community-nominated

## Next Steps

1. Extend to all 16 award categories
2. Add filtering/sorting options
3. Add nominee detail pages
4. Implement search functionality
5. Add admin tools to manage public display
