import { NextRequest, NextResponse } from 'next/server';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;


// Mock database - In production, replace with actual database
let judgeApplications: any[] = [
  // Sample data for testing
  {
    id: 'sample-1',
    full_name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+234123456789',
    state: 'Lagos',
    education: 'PhD in Educational Leadership',
    experience: '15 years in educational administration',
    motivation: 'Passionate about improving education standards across Africa',
    application_type: 'individual',
    expertise_areas: ['Educational Leadership', 'Policy & Governance'],
    category_preferences: ['Africa Icon', 'Competitive (Gold Certificate)'],
    region_interest: 'Africa',
    conflict_declaration: true,
    status: 'approved',
    verified: true,
    created_at: '2024-12-15T10:00:00.000Z',
    updated_at: '2024-12-16T14:30:00.000Z',
    notes: 'Excellent qualifications and strong motivation statement.',
    next_steps: 'Please create your judge account using the link provided.'
  },
  {
    id: 'sample-2',
    full_name: 'Prof. Michael Chen',
    email: 'michael.chen@university.edu',
    phone: '+1234567890',
    state: 'California',
    education: 'PhD in Educational Technology',
    experience: '20 years in higher education and research',
    motivation: 'Committed to recognizing innovation in African education',
    application_type: 'institutional',
    expertise_areas: ['Technology in Education', 'Research & Academia'],
    category_preferences: ['Platinum (Non-Competitive)'],
    region_interest: 'Diaspora',
    conflict_declaration: true,
    status: 'under_review',
    verified: true,
    created_at: '2024-12-14T08:00:00.000Z',
    updated_at: '2024-12-15T16:45:00.000Z',
    notes: 'Application is being reviewed by the BOT panel.',
    next_steps: 'Review process typically takes 5-7 business days.'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email parameter is required' },
        { status: 400 }
      );
    }

    // Find application by email
    const application = judgeApplications.find(app => 
      app.email.toLowerCase() === email.toLowerCase()
    );
    
    if (!application) {
      return NextResponse.json(
        { success: false, message: 'No application found with this email address' },
        { status: 404 }
      );
    }

    // Return application status information
    const statusResponse = {
      email: application.email,
      full_name: application.full_name,
      current_status: application.status,
      application_type: application.application_type,
      submitted_date: application.created_at,
      last_updated: application.updated_at,
      notes: application.notes,
      next_steps: application.next_steps,
      expertise_areas: application.expertise_areas,
      category_preferences: application.category_preferences,
      region_interest: application.region_interest
    };

    return NextResponse.json({
      success: true,
      application: statusResponse
    });

  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST endpoint to update application status (for admin use)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, status, notes, next_steps } = body;

    if (!email || !status) {
      return NextResponse.json(
        { success: false, message: 'Email and status are required' },
        { status: 400 }
      );
    }

    // Valid status values
    const validStatuses = [
      'submitted', 
      'verified', 
      'under_review', 
      'approved', 
      'rejected', 
      'account_created', 
      'active'
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status value' },
        { status: 400 }
      );
    }

    // Find and update application
    const applicationIndex = judgeApplications.findIndex(app => 
      app.email.toLowerCase() === email.toLowerCase()
    );
    
    if (applicationIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      );
    }

    // Update application
    judgeApplications[applicationIndex] = {
      ...judgeApplications[applicationIndex],
      status,
      notes: notes || judgeApplications[applicationIndex].notes,
      next_steps: next_steps || judgeApplications[applicationIndex].next_steps,
      updated_at: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Application status updated successfully',
      application: {
        email: judgeApplications[applicationIndex].email,
        full_name: judgeApplications[applicationIndex].full_name,
        current_status: judgeApplications[applicationIndex].status,
        updated_at: judgeApplications[applicationIndex].updated_at
      }
    });

  } catch (error) {
    console.error('Status update error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT endpoint to add new application to tracking (called from submit endpoint)
export async function PUT(request: NextRequest) {
  try {
    const applicationData = await request.json();

    // Add to tracking system
    judgeApplications.push({
      ...applicationData,
      status: 'submitted',
      verified: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      notes: 'Application submitted successfully. Email verification pending.',
      next_steps: 'Please check your email and verify your email address to proceed.'
    });

    return NextResponse.json({
      success: true,
      message: 'Application added to tracking system'
    });

  } catch (error) {
    console.error('Application tracking error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add application to tracking' },
      { status: 500 }
    );
  }
}

// DELETE endpoint to remove application (for admin use)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const applicationIndex = judgeApplications.findIndex(app => 
      app.email.toLowerCase() === email.toLowerCase()
    );
    
    if (applicationIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      );
    }

    // Remove application
    const removedApplication = judgeApplications.splice(applicationIndex, 1)[0];

    return NextResponse.json({
      success: true,
      message: 'Application removed successfully',
      removed_application: {
        email: removedApplication.email,
        full_name: removedApplication.full_name
      }
    });

  } catch (error) {
    console.error('Application removal error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
