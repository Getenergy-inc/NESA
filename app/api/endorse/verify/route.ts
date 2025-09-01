import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth/tokens';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      return NextResponse.json(
        { success: false, message: 'Token and email are required' },
        { status: 400 }
      );
    }

    // Verify the token
    const isValid = await verifyToken({
      token,
      identifier: email,
      type: 'email_verification'
    });

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // Find the endorsement
    const endorsement = await prisma.endorsement.findUnique({
      where: { email }
    });

    if (!endorsement) {
      return NextResponse.json(
        { success: false, message: 'Endorsement not found' },
        { status: 404 }
      );
    }

    // Update the endorsement status
    const updatedEndorsement = await prisma.endorsement.update({
      where: { email },
      data: {
        status: 'pending_review',
        verified: true,
        updated_at: new Date()
      }
    });

    // Delete the token after successful verification
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: email,
        type: 'email_verification'
      }
    });

    // Return success
    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
      endorsement: {
        id: updatedEndorsement.id,
        organization_name: updatedEndorsement.organization_name,
        status: updatedEndorsement.status
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