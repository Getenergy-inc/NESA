import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth/tokens';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;

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

    // Find endorsement by email
    const endorsement = await prisma.endorsement.findUnique({
      where: { email }
    });

    if (!endorsement) {
      return NextResponse.json(
        { success: false, message: 'Endorsement not found' },
        { status: 404 }
      );
    }

    // Verify the token
    const isValidToken = await verifyToken({
      token: verification_token,
      type: 'email_verification',
      identifier: email
    });

    if (!isValidToken) {
      return NextResponse.json(
        { success: false, message: 'Invalid verification token' },
        { status: 400 }
      );
    }

    // Check if already verified
    if (endorsement.verified) {
      return NextResponse.json({
        success: true,
        message: 'Email already verified',
        endorsement: {
          id: endorsement.id,
          organization_name: endorsement.organization_name,
          email: endorsement.email,
          verified: true,
          status: endorsement.status
        }
      });
    }

    // Update verification status
    const updatedEndorsement = await prisma.endorsement.update({
      where: { id: endorsement.id },
      data: {
        verified: true,
        status: 'pending_approval',
        updated_at: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
      endorsement: {
        id: updatedEndorsement.id,
        organization_name: updatedEndorsement.organization_name,
        email: updatedEndorsement.email,
        status: updatedEndorsement.status,
        verified: updatedEndorsement.verified
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

// GET endpoint to verify email via link click
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

    // Find the endorsement with matching email
    const endorsement = await prisma.endorsement.findUnique({
      where: { email }
    });

    if (!endorsement) {
      // Check if this is a valid token in the verification_tokens table
      const tokenRecord = await prisma.verificationToken.findFirst({
        where: {
          token,
          identifier: email,
          expires: { gt: new Date() }
        }
      });

      if (!tokenRecord) {
        return NextResponse.json(
          { success: false, message: 'Invalid verification link' },
          { status: 404 }
        );
      }

      // Token exists but endorsement doesn't - this shouldn't happen in production
      // but we'll handle it gracefully
      return NextResponse.json(
        { 
          success: false, 
          message: 'Endorsement not found. Please submit your endorsement first.' 
        },
        { status: 404 }
      );
    }

    // Verify the token
    const isValidToken = await verifyToken({
      token,
      type: 'email_verification',
      identifier: email
    });

    if (!isValidToken) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired verification link' },
        { status: 400 }
      );
    }

    // If already verified, just return the status
    if (endorsement.verified) {
      return NextResponse.json({
        success: true,
        message: 'Email already verified',
        endorsement: {
          id: endorsement.id,
          organization_name: endorsement.organization_name,
          email: endorsement.email,
          verified: true,
          status: endorsement.status,
          created_at: endorsement.created_at
        }
      });
    }

    // Update verification status
    const updatedEndorsement = await prisma.endorsement.update({
      where: { id: endorsement.id },
      data: {
        verified: true,
        status: 'pending_review',
        updated_at: new Date()
      }
    });

    // Delete the used token
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: email,
        token
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully! Your endorsement is now under review.',
      endorsement: {
        id: updatedEndorsement.id,
        organization_name: updatedEndorsement.organization_name,
        email: updatedEndorsement.email,
        verified: true,
        status: updatedEndorsement.status,
        created_at: updatedEndorsement.created_at
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
