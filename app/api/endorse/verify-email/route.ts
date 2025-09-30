import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Endorsement from '@/lib/models/Endorsement';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

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
    const endorsement = await Endorsement.findOne({
      email,
      verification_token
    });

    if (!endorsement) {
      return NextResponse.json(
        { success: false, message: 'Invalid verification token or email' },
        { status: 404 }
      );
    }

    // Check if already verified
    if (endorsement.verified) {
      return NextResponse.json(
        { success: false, message: 'Email already verified' },
        { status: 400 }
      );
    }

    // Update verification status
    endorsement.verified = true;
    endorsement.status = 'pending_approval'; // Move to next stage after email verification
    endorsement.updated_at = new Date().toISOString();

    await endorsement.save();

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
      endorsement: {
        id: (endorsement._id as any).toString(),
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
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (!email || !token) {
      return NextResponse.json(
        { success: false, message: 'Email and token parameters are required' },
        { status: 400 }
      );
    }

    const endorsement = await Endorsement.findOne({
      email,
      verification_token: token
    });

    if (!endorsement) {
      return NextResponse.json(
        { success: false, message: 'Invalid verification link' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      endorsement: {
        id: (endorsement._id as any).toString(),
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
