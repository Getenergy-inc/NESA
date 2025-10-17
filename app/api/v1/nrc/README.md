# NRC (Nominee Research Corps) Backend API

Complete backend implementation for the NESA Nominee Research Corps volunteer program.

## 📁 Project Structure

```
app/api/v1/nrc/
├── health/                    # Health check endpoint
├── volunteers/
│   ├── register/             # Volunteer registration
│   ├── check-status/         # Check volunteer status
│   └── [id]/
│       ├── dashboard/        # Volunteer dashboard data
│       ├── tasks/            # Volunteer tasks
│       ├── nominees/         # Volunteer nominees
│       └── agc/
│           ├── transactions/ # AGC transaction history
│           └── withdraw/     # AGC withdrawal
├── nominees/
│   ├── route.ts              # Create/List nominees
│   └── [id]/                 # Get/Update/Delete nominee
├── tasks/
│   ├── route.ts              # Create/List tasks
│   └── [id]/
│       └── complete/         # Complete task
├── agc/
│   └── transactions/         # AGC transactions
└── leaderboard/              # Volunteer leaderboard
```

## 🗄️ Database Models

### NRCVolunteer
- User registration and profile
- Statistics (uploads, verifications, AGC balance)
- Gamification (rank, level, badges)
- Status tracking

### NRCNominee
- Nominee profiles with full details
- Award category classification
- SDG/AU Agenda/ESG alignment
- File attachments (profile image, documents)
- Status workflow (DRAFT → REVIEW → VERIFIED/REJECTED)

### NRCTask
- Task assignment and management
- Priority and deadline tracking
- AGC rewards for completion

### AGCTransaction
- Token earning and spending
- Withdrawable vs non-withdrawable balance
- Transaction history and status

## 🔌 API Endpoints

### Health Check
```
GET /api/v1/nrc/health
```
Check API and database connectivity.

### Volunteer Management

#### Register Volunteer
```
POST /api/v1/nrc/volunteers/register
Body: {
  userId: string,
  region: string,
  country: string,
  fullName: string,
  email: string,
  displayName?: string,
  coordinator?: string,
  badge?: string
}
```

#### Check Volunteer Status
```
GET /api/v1/nrc/volunteers/check-status?userId={userId}
```

#### Get Volunteer Dashboard
```
GET /api/v1/nrc/volunteers/{userId}/dashboard
```
Returns:
- Upload statistics
- AGC balance
- Recent activities
- Rank and level
- Recent transactions

### Nominee Management

#### Create Nominee
```
POST /api/v1/nrc/nominees
Content-Type: multipart/form-data

Fields:
- volunteerId: string
- fullName: string
- country: string
- region: string
- awardCategory: string
- subcategory: string
- achievementSummary: string
- impactMetrics: string
- sdgAlignment: string (comma-separated)
- agendaAlignment: string
- esgAlignment: string
- profileImage: File
- supportingDocuments: File[]
- status: 'DRAFT' | 'REVIEW'
```

#### List Nominees
```
GET /api/v1/nrc/nominees?volunteerId={id}&status={status}&page={page}&limit={limit}
```

#### Get Volunteer's Nominees
```
GET /api/v1/nrc/volunteers/{userId}/nominees?status={status}&category={category}
```

#### Update Nominee
```
PUT /api/v1/nrc/nominees/{nomineeId}
Body: { ...fields to update }
```

#### Delete Nominee
```
DELETE /api/v1/nrc/nominees/{nomineeId}
```

### Task Management

#### Create Task
```
POST /api/v1/nrc/tasks
Body: {
  title: string,
  description: string,
  assignedTo: string[],
  priority: 'low' | 'medium' | 'high' | 'urgent',
  deadline: string (ISO date),
  category: string,
  agcReward: number,
  country?: string,
  region?: string
}
```

#### List Tasks
```
GET /api/v1/nrc/tasks?volunteerId={id}&status={status}&priority={priority}
```

#### Get Volunteer Tasks
```
GET /api/v1/nrc/volunteers/{userId}/tasks?status={status}
```

#### Complete Task
```
PUT /api/v1/nrc/tasks/{taskId}/complete
Body: {
  completedBy: string,
  completionNotes?: string
}
```

### AGC (Token) Management

#### Create Transaction
```
POST /api/v1/nrc/agc/transactions
Body: {
  volunteerId: string,
  type: 'EARN' | 'WITHDRAW' | 'BONUS' | 'PENALTY',
  amount: number,
  description: string,
  nominationId?: string,
  isWithdrawable: boolean
}
```

#### Get Transactions
```
GET /api/v1/nrc/agc/transactions?volunteerId={id}&type={type}&page={page}
```

#### Get Volunteer Transactions
```
GET /api/v1/nrc/volunteers/{userId}/agc/transactions?type={type}
```

#### Withdraw AGC
```
POST /api/v1/nrc/volunteers/{userId}/agc/withdraw
Body: {
  amount: number,
  walletAddress: string
}
```

### Leaderboard

#### Get Leaderboard
```
GET /api/v1/nrc/leaderboard?type=weekly|monthly|allTime&limit=10
```

## 💰 AGC Reward System

### Earning AGC
1. **First 10 Uploads**: 0.5 AGC per upload
   - First 5: Non-withdrawable
   - Next 5: Partially withdrawable

2. **Verified Nominee**: 0.5 AGC (non-withdrawable)

3. **Weekly Best Researcher**: 3 AGC bonus (withdrawable)

4. **Task Completion**: Variable AGC based on task

### Withdrawal
- Only withdrawable AGC can be withdrawn
- Requires valid wallet address
- Processed immediately (mock implementation)
- Transaction hash generated for tracking

## 🎮 Gamification

### Levels
- **Bronze**: 0-49 verified uploads
- **Silver**: 50-99 verified uploads
- **Gold**: 100-149 verified uploads
- **Platinum**: 150-199 verified uploads
- **Diamond**: 200+ verified uploads

### Ranking
- Based on total verified uploads
- Secondary sort by AGC earned
- Updated in real-time

## 📊 Status Workflow

### Volunteer Status
- **PENDING**: Application submitted
- **ACTIVE**: Approved and active
- **INACTIVE**: Temporarily inactive
- **SUSPENDED**: Access suspended

### Nominee Status
- **DRAFT**: Saved but not submitted
- **REVIEW**: Submitted for review
- **VERIFIED**: Approved by admin
- **REJECTED**: Not approved
- **PUBLISHED**: Published to public

### Task Status
- **PENDING**: Not started
- **IN_PROGRESS**: Being worked on
- **COMPLETED**: Finished
- **CANCELLED**: Cancelled

### Transaction Status
- **PENDING**: Processing
- **COMPLETED**: Successful
- **FAILED**: Failed
- **CANCELLED**: Cancelled

## 🔒 Security Considerations

1. **Authentication**: Integrate with your auth system
2. **Authorization**: Verify user permissions
3. **File Upload**: Validate file types and sizes
4. **Rate Limiting**: Implement rate limiting
5. **Input Validation**: All inputs are validated
6. **SQL Injection**: Using Mongoose ORM prevents SQL injection

## 🚀 Deployment

### Environment Variables
```env
MONGODB_URI=mongodb://...
NRC_DATABASE_URL=mongodb://...  # Optional, falls back to MONGODB_URI
```

### File Storage
- Profile images: `public/uploads/nominees/profiles/`
- Documents: `public/uploads/nominees/documents/`

### Production Considerations
1. Use cloud storage (AWS S3, Cloudinary) for files
2. Implement proper authentication middleware
3. Add rate limiting
4. Set up monitoring and logging
5. Configure CORS properly
6. Use environment-specific configs

## 📝 Testing

Test the API using the provided test scripts:
```bash
node script/test-nrc-with-auth.js
node script/test-nrc-integration.js
```

## 🔄 Integration with Frontend

The frontend service (`lib/services/nrcService.ts`) is already configured to work with these endpoints. No changes needed on the frontend.

## 📈 Analytics & Reporting

Future enhancements:
- Weekly/monthly reports
- Country-wise statistics
- Category distribution
- Performance metrics
- Export functionality

## 🐛 Troubleshooting

### Database Connection Issues
- Verify `MONGODB_URI` or `NRC_DATABASE_URL` is set
- Check network connectivity
- Ensure MongoDB is running

### File Upload Issues
- Verify upload directories exist
- Check file permissions
- Validate file size limits

### AGC Balance Mismatch
- Check transaction history
- Verify status changes
- Review calculation logic

## 📞 Support

For issues or questions, contact the development team.
