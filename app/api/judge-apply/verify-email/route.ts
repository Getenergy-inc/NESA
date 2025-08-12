import { NextRequest, NextResponse } from 'next/server';
import { judgeApprovalEmailTemplate, sendEmail } from '@/lib/templates/emailTemplates';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;


// Mock database - In production, replace with actual database
// This should be the same reference as in submit/route.ts
// In production, this would be a shared database connection
let judgeApplications: any[] = [];

// Send approval email using professional template
const sendApprovalEmail = async (email: string, name: string) => {
  const signupUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/judge-signup?email=${encodeURIComponent(email)}`;

  const emailTemplate = judgeApprovalEmailTemplate({
    name,
    email,
    signupUrl
  });

  await sendEmail(email, emailTemplate);
  return true;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, verification_token } = body;

    // Validate required fields
    if (!email || !verification_token) {
      return NextResponse.json(
        { success: false, message: 'Email and verification token are required' },
        { status: 400 }
      );
    }

    // Find application by email and token
    const applicationIndex = judgeApplications.findIndex(
      app => app.email === email && app.verification_token === verification_token
    );

    if (applicationIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Invalid verification token or email' },
        { status: 404 }
      );
    }

    const application = judgeApplications[applicationIndex];

    // Check if already verified
    if (application.verified) {
      return NextResponse.json(
        { success: false, message: 'Application has already been verified' },
        { status: 409 }
      );
    }

    // Check token expiration (24 hours)
    const createdAt = new Date(application.created_at);
    const now = new Date();
    const hoursDiff = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
    
    if (hoursDiff > 24) {
      return NextResponse.json(
        { success: false, message: 'Verification token has expired' },
        { status: 410 }
      );
    }

    // Update application status
    judgeApplications[applicationIndex] = {
      ...application,
      verified: true,
      status: 'approved', // Auto-approve for demo purposes
      updated_at: new Date().toISOString()
    };

    // Send approval email
    try {
      await sendApprovalEmail(email, application.full_name);
    } catch (emailError) {
      console.error('Failed to send approval email:', emailError);
      // Don't fail the verification if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully. Your application has been approved!',
      application: {
        id: application.id,
        full_name: application.full_name,
        email: application.email,
        status: 'approved',
        verified: true
      }
    });

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to check verification status
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

    return NextResponse.json({
      success: true,
      verified: application.verified,
      status: application.status,
      application: {
        id: application.id,
        full_name: application.full_name,
        email: application.email,
        verified: application.verified,
        status: application.status
      }
    });

  } catch (error) {
    console.error('Check verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
