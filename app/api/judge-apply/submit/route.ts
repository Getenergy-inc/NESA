import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { judgeVerificationEmailTemplate, sendEmail } from '@/lib/templates/emailTemplates';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;


// Mock database - In production, replace with actual database
let judgeApplications: any[] = [];

// Send verification email using professional template
const sendVerificationEmail = async (email: string, name: string, token: string) => {
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/judge-verify?email=${encodeURIComponent(email)}&token=${token}`;

  const emailTemplate = judgeVerificationEmailTemplate({
    name,
    email,
    verificationUrl
  });

  await sendEmail(email, emailTemplate);
  return true;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      full_name,
      email,
      phone,
      state,
      education,
      experience,
      motivation,
      profileImage,
      documents
    } = body;

    // Validate required fields
    if (!full_name || !email || !phone || !state || !education || !experience || !motivation) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Check if application already exists
    const existingApplication = judgeApplications.find(app => app.email === email);
    if (existingApplication) {
      return NextResponse.json(
        { success: false, message: 'An application with this email already exists' },
        { status: 409 }
      );
    }

    // Generate verification token
    const verificationToken = uuidv4();
    const applicationId = uuidv4();

    // Create application record
    const application = {
      id: applicationId,
      full_name,
      email,
      phone,
      state,
      education,
      experience,
      motivation,
      profileImage,
      documents,
      status: 'submitted',
      verification_token: verificationToken,
      verified: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Store application (in production, save to database)
    judgeApplications.push(application);

    // Add to status tracking system
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/judge-apply/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(application)
      });
    } catch (trackingError) {
      console.error('Failed to add to tracking system:', trackingError);
      // Don't fail the application submission if tracking fails
    }

    // Send verification email
    try {
      await sendVerificationEmail(email, full_name, verificationToken);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Don't fail the application submission if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully. Please check your email for verification instructions.',
      application: {
        id: applicationId,
        status: 'submitted',
        email
      }
    });

  } catch (error) {
    console.error('Judge application submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve application status
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
      application: {
        id: application.id,
        full_name: application.full_name,
        email: application.email,
        status: application.status,
        verified: application.verified,
        created_at: application.created_at
      }
    });

  } catch (error) {
    console.error('Get application error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
