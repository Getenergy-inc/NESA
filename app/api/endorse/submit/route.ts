import { NextRequest, NextResponse } from 'next/server';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;


// Mock database - In production, this would be replaced with actual database
let endorsements: any[] = [];

// Generate unique ID
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Generate verification token
function generateVerificationToken(): string {
  return Math.random().toString(36).substr(2, 15);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      organization_name,
      contact_person_name,
      email,
      phone,
      country,
      website,
      endorser_category,
      endorsement_type,
      endorsement_tier,
      payment_method,
      payment_reference,
      endorsement_headline,
      endorsement_statement,
      logo_file,
      video_file,
      video_link,
      consent_to_publish,
      authorized_to_submit,
      digital_signature,
      user_id,
      submitted_by
    } = body;

    // Validate required fields
    if (!organization_name || !contact_person_name || !email || !phone || !country || 
        !endorser_category || !endorsement_type || !endorsement_headline || 
        !endorsement_statement || !consent_to_publish || !authorized_to_submit || !digital_signature) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Check if endorsement already exists
    const existingEndorsement = endorsements.find(endorsement => endorsement.email === email);
    if (existingEndorsement) {
      return NextResponse.json(
        { success: false, message: 'An endorsement with this email already exists' },
        { status: 409 }
      );
    }

    // Validate paid endorsement requirements
    if (endorsement_type === 'paid') {
      if (!endorsement_tier || !payment_method) {
        return NextResponse.json(
          { success: false, message: 'Paid endorsements require tier and payment method' },
          { status: 400 }
        );
      }
      
      if (payment_method === 'bank_transfer' && !payment_reference) {
        return NextResponse.json(
          { success: false, message: 'Bank transfer requires payment reference' },
          { status: 400 }
        );
      }
    }

    // Create new endorsement
    const newEndorsement = {
      id: generateId(),
      organization_name,
      contact_person_name,
      email,
      phone,
      country,
      website: website || null,
      endorser_category,
      endorsement_type,
      endorsement_tier: endorsement_type === 'paid' ? endorsement_tier : null,
      payment_method: endorsement_type === 'paid' ? payment_method : null,
      payment_reference: payment_reference || null,
      payment_verified: false,
      endorsement_headline,
      endorsement_statement,
      logo_file: logo_file || null,
      video_file: video_file || null,
      video_link: video_link || null,
      consent_to_publish,
      authorized_to_submit,
      digital_signature,
      user_id: user_id || null,
      submitted_by: submitted_by || null,
      status: 'pending_review',
      verified: false,
      verification_token: generateVerificationToken(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      approved_at: null,
      certificate_generated: false,
      featured: false
    };

    // Add to mock database
    endorsements.push(newEndorsement);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Endorsement submitted successfully',
      endorsement: {
        id: newEndorsement.id,
        organization_name: newEndorsement.organization_name,
        email: newEndorsement.email,
        status: newEndorsement.status,
        verification_token: newEndorsement.verification_token,
        created_at: newEndorsement.created_at
      }
    });

  } catch (error) {
    console.error('Error submitting endorsement:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve endorsement status
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

    const endorsement = endorsements.find(endorsement => endorsement.email === email);
    
    if (!endorsement) {
      return NextResponse.json(
        { success: false, message: 'Endorsement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      endorsement: {
        id: endorsement.id,
        organization_name: endorsement.organization_name,
        email: endorsement.email,
        status: endorsement.status,
        verified: endorsement.verified,
        created_at: endorsement.created_at,
        endorsement_type: endorsement.endorsement_type,
        endorsement_tier: endorsement.endorsement_tier
      }
    });

  } catch (error) {
    console.error('Error retrieving endorsement:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
