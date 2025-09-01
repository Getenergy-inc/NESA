# NRC Frontend-Only Demo Guide

## Overview
This guide demonstrates the complete NRC (National Research Committee) workflow using mock services and localStorage for data persistence. The system simulates a full backend experience without requiring any server infrastructure.

## 🎯 Complete User Journey Demo

### **Phase 1: User Discovery & Application**

1. **Navigate to NRC Landing Page**
   - Go to `/get-involved/nrc-volunteer`
   - Page shows program information, benefits, and requirements
   - CTA button shows "Login to Apply" if not authenticated

2. **User Authentication**
   - Click "Login to Apply" → redirects to login page
   - After login, button changes to "Apply Now"

3. **Submit Application**
   - Click "Apply Now" → redirects to `/get-involved/nrc-volunteer/apply`
   - Fill out comprehensive application form:
     - Personal information (name, email, phone, country)
     - Motivation statement (minimum 50 characters)
     - Experience description
     - Skills selection (multiple checkboxes)
     - Availability confirmation
     - Optional CV upload
     - Commitment and terms checkboxes
   - Submit application
   - Success message appears
   - Mock notification sent (check browser console for "📧 Mock Email Sent")

4. **Post-Application Status**
   - Return to landing page → button now shows "Application Pending"
   - Try to access dashboard → shows "Application Under Review" message
   - Application data stored in localStorage under `nrc_applications`

### **Phase 2: Admin Review & Approval**

5. **Admin Access**
   - Navigate to admin interface (component: `NRCManagement`)
   - View pending applications in "Applications" tab
   - See application details including motivation, experience, skills

6. **Application Review**
   - Click "Approve" or "Reject" on any application
   - Loading state shows during processing
   - Success notification appears
   - Application status updates in real-time
   - Mock email notification sent to applicant

7. **Volunteer Creation**
   - Approved applications automatically create volunteer records
   - Volunteer appears in "Volunteers" tab
   - Initial stats: 0 nominees uploaded, 0% completion rate

### **Phase 3: Approved User Experience**

8. **Dashboard Access**
   - Approved user returns to landing page
   - Button now shows "Go to Dashboard"
   - Click to access `/get-involved/nrc-volunteer/dashboard`
   - Protected route allows access for approved users

9. **Dashboard Features**
   - **Overview Tab**: Progress statistics, recent nominees
   - **My Nominees Tab**: List of uploaded nominees with search/filter
   - **Add Nominee Tab**: Upload new nominee profiles

10. **Nominee Upload**
    - Click "Add New Nominee" or use "Add Nominee" tab
    - Comprehensive form with:
      - Basic information (name, organization, country, region)
      - Contact details (email, phone, website, LinkedIn)
      - Award category selection
      - Achievement summary (minimum 100 characters)
      - Impact metrics and beneficiary counts
      - SDG alignment (multiple selection)
      - Supporting documents upload
    - Submit nominee profile
    - Success message and return to dashboard
    - Volunteer stats update automatically
    - Mock notification sent

### **Phase 4: Progress Tracking**

11. **Real-time Updates**
    - Dashboard shows updated nominee count
    - Completion percentage calculated automatically
    - Recent nominees list updates
    - Last active timestamp updates

12. **Admin Monitoring**
    - Admin can view all volunteers and their progress
    - Overview statistics update in real-time
    - Export functionality available
    - Bulk notification capabilities

## 🔧 Technical Implementation Details

### **Data Storage (localStorage)**
- `nrc_applications`: All submitted applications
- `nrc_volunteers`: Approved volunteer records
- `nrc_nominees`: All nominee profiles
- `nrc_notifications`: User notifications

### **Mock Services**
- **mockNRCService.ts**: Handles all NRC data operations
- **mockNotificationService.ts**: Manages notifications and emails
- **useNRCStatus.ts**: React hook for user status management

### **Access Control**
- **NRCProtectedRoute**: Protects dashboard access
- Status-based routing and UI updates
- Role-based permissions (Admin, NRC Volunteer)

### **State Management**
- Real-time status checking with `useNRCStatus` hook
- Automatic UI updates based on user status
- Persistent data across browser sessions

## 🧪 Testing Scenarios

### **Scenario 1: New User Application**
```
1. Visit landing page (not logged in)
2. Click "Login to Apply"
3. Login with any credentials
4. Return to landing page → "Apply Now"
5. Complete application form
6. Submit → Success message
7. Try dashboard access → "Application Under Review"
```

### **Scenario 2: Admin Approval Workflow**
```
1. Access admin interface
2. View pending applications
3. Click "Approve" on application
4. Verify volunteer created in "Volunteers" tab
5. Check notification sent (console log)
```

### **Scenario 3: Approved User Journey**
```
1. User with approved application visits landing page
2. Button shows "Go to Dashboard"
3. Access dashboard successfully
4. Upload nominee profiles
5. View progress updates in real-time
```

### **Scenario 4: Status Transitions**
```
1. Pending → Shows pending message
2. Approved → Gains dashboard access
3. Rejected → Shows rejection message
4. No application → Redirects to apply
```

## 📊 Demo Data

### **Sample Applications**
The system initializes with sample applications for:
- John Doe (South Africa) - Pending
- Marie Dubois (Senegal) - Pending

### **Sample Notifications**
Pre-loaded notifications for demo users showing application confirmations.

## 🎮 Interactive Demo Script

### **For Presentations:**

1. **"Let me show you our NRC volunteer system..."**
   - Navigate to landing page
   - Explain program benefits and requirements

2. **"Here's how someone applies..."**
   - Walk through application form
   - Highlight validation and user experience

3. **"Admins can review applications easily..."**
   - Show admin interface
   - Demonstrate approval process
   - Show real-time updates

4. **"Approved volunteers get full dashboard access..."**
   - Show dashboard features
   - Demonstrate nominee upload
   - Show progress tracking

5. **"The system handles everything automatically..."**
   - Show status transitions
   - Demonstrate notifications
   - Highlight data persistence

## 🔍 Verification Points

### **Data Persistence**
- Open browser DevTools → Application → Local Storage
- Verify data stored under correct keys
- Refresh page → data persists

### **Status Management**
- User status changes reflected immediately
- Protected routes work correctly
- UI updates based on status

### **Notifications**
- Check browser console for mock email logs
- Verify notification creation and storage
- Test notification templates

### **Admin Functions**
- Application approval/rejection works
- Volunteer creation automatic
- Statistics update in real-time
- Bulk operations available

## 🚀 Production Readiness

This frontend-only implementation demonstrates:
- ✅ Complete user workflows
- ✅ Data validation and error handling
- ✅ Real-time UI updates
- ✅ Role-based access control
- ✅ Notification system
- ✅ Progress tracking
- ✅ Admin management tools

**Ready for backend integration:**
- Replace localStorage with API calls
- Connect notification service to email provider
- Add real authentication system
- Implement file upload to cloud storage
- Add real-time updates with WebSockets

The mock services provide the exact interface that would be used with a real backend, making the transition seamless.
