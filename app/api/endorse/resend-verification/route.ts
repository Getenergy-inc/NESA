import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateToken } from '@/lib/auth/tokens';
import { sendVerificationEmail } from '@/lib/email/endorsementVerification';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;

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
    
    // Find the endorsement
    const endorsement = await prisma.endorsement.findUnique({
      where: { email }
    });
    
    if (!endorsement) {
      return NextResponse.json(
        { success: false, message: 'No endorsement found with this email address' },
        { status: 404 }
      );
    }
    
    // Check if already verified
    if (endorsement.verified) {
      return NextResponse.json(
        { success: false, message: 'This endorsement is already verified' },
        { status: 400 }
      );
    }
    
    // Delete any existing tokens
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: email,
        type: 'email_verification'
      }
    });
    
    // Generate a new verification token
    const token = await generateToken({
      identifier: email,
      type: 'email_verification',
      expiresInHours: 24
    });
    
    // Send verification email
    await sendVerificationEmail({
      email,
      name: endorsement.contact_person_name,
      organization: endorsement.organization_name,
      token,
      endorsementId: endorsement.id
    });
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Verification email sent successfully'
    });
    
  } catch (error) {
    console.error('Error resending verification email:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}