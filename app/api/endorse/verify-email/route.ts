import { NextRequest, NextResponse } from 'next/server';
import { endorsements } from '../submit/route'; // Import the shared endorsements array

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;

// Mock verification tokens (in a real app, this would be in a database)
// For demo purposes, we'll create some test tokens that always work
const DEMO_TOKENS: Record<string, string> = {
  'samuelowase02@gmail.com': '85af790f2feeb8453014ffdd2f377d40e292cc0e146f26e66e4f99ee8e63650b',
  'test@example.com': 'test_token_123',
  'demo@nesa.africa': 'demo_token_456'
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

    // Check if this is a demo email/token
    const isDemoToken = DEMO_TOKENS[email] === verification_token;
    
    // Find endorsement by email
    let endorsementIndex = endorsements.findIndex(
      endorsement => endorsement.email === email
    );

    // If not found but it's a demo token, create a mock endorsement
    if (endorsementIndex === -1 && isDemoToken) {
      const newEndorsement = {
        id: `demo-${Date.now()}`,
        organization_name: email.split('@')[0] + ' Organization',
        contact_person_name: 'Demo User',
        email: email,
        phone: '+1234567890',
        country: 'Demo Country',
        endorser_category: 'educational_institution',
        endorsement_type: 'free',
        endorsement_headline: 'Demo Endorsement',
        endorsement_statement: 'This is a demo endorsement for testing purposes.',
        consent_to_publish: true,
        authorized_to_submit: true,
        digital_signature: 'Demo User',
        status: 'pending_verification',
        verified: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      endorsements.push(newEndorsement);
      endorsementIndex = endorsements.length - 1;
    } else if (endorsementIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Invalid verification token or email' },
        { status: 404 }
      );
    }

    const endorsement = endorsements[endorsementIndex];

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

    // Check if this is a demo email/token
    const isDemoToken = DEMO_TOKENS[email] === token;
    
    // Find endorsement by email
    let endorsementIndex = endorsements.findIndex(
      endorsement => endorsement.email === email
    );

    // If not found but it's a demo token, create a mock endorsement
    if (endorsementIndex === -1 && isDemoToken) {
      const newEndorsement = {
        id: `demo-${Date.now()}`,
        organization_name: email.split('@')[0] + ' Organization',
        contact_person_name: 'Demo User',
        email: email,
        phone: '+1234567890',
        country: 'Demo Country',
        endorser_category: 'educational_institution',
        endorsement_type: 'free',
        endorsement_headline: 'Demo Endorsement',
        endorsement_statement: 'This is a demo endorsement for testing purposes.',
        consent_to_publish: true,
        authorized_to_submit: true,
        digital_signature: 'Demo User',
        status: 'pending_verification',
        verified: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      endorsements.push(newEndorsement);
      endorsementIndex = endorsements.length - 1;
    } else if (endorsementIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Invalid verification link' },
        { status: 404 }
      );
    }

    const endorsement = endorsements[endorsementIndex];

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
    endorsements[endorsementIndex] = {
      ...endorsement,
      verified: true,
      status: 'pending_review', // Move to next stage after email verification
      updated_at: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully! Your endorsement is now under review.',
      endorsement: {
        id: endorsement.id,
        organization_name: endorsement.organization_name,
        email: endorsement.email,
        verified: true,
        status: 'pending_review',
        created_at: endorsement.created_at
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
