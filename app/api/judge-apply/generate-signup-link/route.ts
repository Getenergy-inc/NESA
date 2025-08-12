import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;


// Mock database - In production, replace with actual database
let judgeApplications: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Find verified application
    const application = judgeApplications.find(
      app => app.email === email && app.verified === true
    );

    if (!application) {
      return NextResponse.json(
        { success: false, message: 'No verified application found for this email' },
        { status: 404 }
      );
    }

    // Generate signup token
    const signupToken = uuidv4();
    
    // Update application with signup token
    const applicationIndex = judgeApplications.findIndex(app => app.email === email);
    judgeApplications[applicationIndex] = {
      ...application,
      signup_token: signupToken,
      updated_at: new Date().toISOString()
    };

    // Generate signup URL
    const signupUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/judge-signup?email=${encodeURIComponent(email)}&token=${signupToken}`;

    return NextResponse.json({
      success: true,
      signup_url: signupUrl,
      token: signupToken
    });

  } catch (error) {
    console.error('Generate signup link error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
