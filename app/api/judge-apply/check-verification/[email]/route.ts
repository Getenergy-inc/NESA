import { NextRequest, NextResponse } from 'next/server';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;


// Mock database - In production, replace with actual database
// This should be the same reference as in other judge-apply routes
let judgeApplications: any[] = [];

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const email = decodeURIComponent(params.email);

    if (!email) {
      return NextResponse.json(
        { 
          exists: false, 
          verified: false, 
          message: 'Email parameter is required' 
        },
        { status: 400 }
      );
    }

    // Find application by email
    const application = judgeApplications.find(app => app.email === email);
    
    if (!application) {
      return NextResponse.json({
        exists: false,
        verified: false,
        message: 'No application found for this email'
      });
    }

    return NextResponse.json({
      exists: true,
      verified: application.verified,
      application: {
        id: application.id,
        full_name: application.full_name,
        email: application.email,
        phone: application.phone,
        state: application.state,
        status: application.status,
        verified: application.verified,
        created_at: application.created_at
      }
    });

  } catch (error) {
    console.error('Check verification error:', error);
    return NextResponse.json(
      { 
        exists: false, 
        verified: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
