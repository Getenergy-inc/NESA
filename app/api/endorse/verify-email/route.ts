import { NextRequest, NextResponse } from 'next/server';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;


// Mock database - In production, this would be replaced with actual database
// This should be shared with the submit route in a real implementation
let endorsements: any[] = [];

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

    // Find endorsement by email and token
    const endorsementIndex = endorsements.findIndex(
      endorsement => endorsement.email === email && endorsement.verification_token === verification_token
    );

    if (endorsementIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Invalid verification token or email' },
        { status: 404 }
      );
    }

    const endorsement = endorsements[endorsementIndex];

    // Check if already verified
    if (endorsement.verified) {
      return NextResponse.json(
        { success: false, message: 'Email already verified' },
        { status: 400 }
      );
    }

    // Update verification status
    endorsements[endorsementIndex] = {
      ...endorsement,
      verified: true,
      status: 'pending_approval', // Move to next stage after email verification
      updated_at: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
      endorsement: {
        id: endorsement.id,
        organization_name: endorsement.organization_name,
        email: endorsement.email,
        status: 'pending_approval',
        verified: true
      }
    });

  } catch (error) {
    console.error('Error verifying email:', error);
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
    const token = searchParams.get('token');

    if (!email || !token) {
      return NextResponse.json(
        { success: false, message: 'Email and token parameters are required' },
        { status: 400 }
      );
    }

    const endorsement = endorsements.find(
      endorsement => endorsement.email === email && endorsement.verification_token === token
    );

    if (!endorsement) {
      return NextResponse.json(
        { success: false, message: 'Invalid verification link' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      endorsement: {
        id: endorsement.id,
        organization_name: endorsement.organization_name,
        email: endorsement.email,
        verified: endorsement.verified,
        status: endorsement.status,
        created_at: endorsement.created_at
      }
    });

  } catch (error) {
    console.error('Error checking verification status:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
