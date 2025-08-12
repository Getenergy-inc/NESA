import { NextRequest, NextResponse } from 'next/server';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;


// Mock database - In production, replace with actual database
let judgeApplications: any[] = [];
let statusHistory: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, status, notes, timestamp } = body;

    if (!email || !status) {
      return NextResponse.json(
        { success: false, message: 'Email and status are required' },
        { status: 400 }
      );
    }

    // Find application
    const applicationIndex = judgeApplications.findIndex(app => app.email === email);
    
    if (applicationIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      );
    }

    const application = judgeApplications[applicationIndex];
    const previousStatus = application.status;

    // Update application status
    judgeApplications[applicationIndex] = {
      ...application,
      status,
      updated_at: timestamp || new Date().toISOString()
    };

    // Add to status history
    const historyEntry = {
      application_id: application.id,
      email,
      previous_status: previousStatus,
      new_status: status,
      timestamp: timestamp || new Date().toISOString(),
      notes: notes || '',
      updated_by: 'system' // In production, get from auth context
    };

    statusHistory.push(historyEntry);

    return NextResponse.json({
      success: true,
      message: `Status updated from ${previousStatus} to ${status}`,
      application: {
        id: application.id,
        email: application.email,
        status,
        updated_at: application.updated_at
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

// GET endpoint to retrieve current status
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

    const application = judgeApplications.find(app => app.email === email);
    
    if (!application) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      );
    }

    // Get status history for this application
    const history = statusHistory
      .filter(entry => entry.email === email)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json({
      success: true,
      application: {
        id: application.id,
        email: application.email,
        full_name: application.full_name,
        status: application.status,
        created_at: application.created_at,
        updated_at: application.updated_at
      },
      status_history: history
    });

  } catch (error) {
    console.error('Get status error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
