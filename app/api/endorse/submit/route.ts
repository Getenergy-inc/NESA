import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { sendVerificationEmail } from '@/lib/email/endorsementVerification';
import crypto from 'crypto';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;

// Mock database - In production, this would be replaced with actual database
// This is shared with the showcase route
export let endorsements: any[] = [
  // Sample approved endorsements from showcase route
  {
    id: 'sample1',
    organization_name: 'UNESCO Africa',
    contact_person_name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@unesco.org',
    phone: '+254712345678',
    country: 'Kenya',
    endorser_category: 'multilateral_organization',
    endorsement_type: 'paid',
    endorsement_tier: 'platinum',
    payment_method: 'bank_transfer',
    payment_reference: 'UNESCO-2024-001',
    payment_verified: true,
    endorsement_headline: 'Supporting Educational Excellence Across Africa',
    endorsement_statement: 'UNESCO Africa proudly endorses NESA-Africa 2025 as a transformative initiative that aligns perfectly with our mission to promote quality education for all. This continental movement represents the future of educational innovation and equity across Africa.',
    logo_file: '/images/endorsers/unesco-logo.png',
    consent_to_publish: true,
    authorized_to_submit: true,
    digital_signature: 'Dr. Sarah Johnson',
    status: 'approved',
    verified: true,
    created_at: '2024-01-15T10:00:00Z',
    approved_at: '2024-01-16T14:30:00Z',
    updated_at: '2024-01-16T14:30:00Z',
    certificate_generated: true,
    featured: true
  },
  {
    id: 'sample2',
    organization_name: 'African Development Bank',
    contact_person_name: 'Prof. Michael Adebayo',
    email: 'michael.adebayo@afdb.org',
    phone: '+22507654321',
    country: 'Côte d\'Ivoire',
    endorser_category: 'development_bank',
    endorsement_type: 'paid',
    endorsement_tier: 'gold',
    payment_method: 'credit_card',
    payment_verified: true,
    endorsement_headline: 'Investing in Africa\'s Educational Future',
    endorsement_statement: 'The African Development Bank recognizes NESA-Africa 2025 as a critical platform for celebrating and advancing educational excellence across our continent. We are proud to support this initiative that champions innovation, equity, and sustainable development in education.',
    logo_file: '/images/endorsers/afdb-logo.png',
    consent_to_publish: true,
    authorized_to_submit: true,
    digital_signature: 'Prof. Michael Adebayo',
    status: 'approved',
    verified: true,
    created_at: '2024-01-20T09:15:00Z',
    approved_at: '2024-01-21T11:45:00Z',
    updated_at: '2024-01-21T11:45:00Z',
    certificate_generated: true,
    featured: true
  },
  {
    id: 'sample3',
    organization_name: 'Mastercard Foundation',
    contact_person_name: 'Dr. Amina Hassan',
    email: 'amina.hassan@mastercardfdn.org',
    phone: '+16135551234',
    country: 'Canada',
    endorser_category: 'development_foundation',
    endorsement_type: 'paid',
    endorsement_tier: 'silver',
    payment_method: 'bank_transfer',
    payment_reference: 'MCF-2024-123',
    payment_verified: true,
    endorsement_headline: 'Empowering Young Africans Through Education',
    endorsement_statement: 'Mastercard Foundation endorses NESA-Africa 2025 as an essential initiative that recognizes and celebrates the educators and innovators who are transforming lives across Africa. This aligns with our commitment to advancing education and economic inclusion for young people.',
    logo_file: '/images/endorsers/mastercard-foundation-logo.png',
    consent_to_publish: true,
    authorized_to_submit: true,
    digital_signature: 'Dr. Amina Hassan',
    status: 'approved',
    verified: true,
    created_at: '2024-01-25T16:20:00Z',
    approved_at: '2024-01-26T10:15:00Z',
    updated_at: '2024-01-26T10:15:00Z',
    certificate_generated: true,
    featured: false
  }
];

// Store verification tokens (in a real app, this would be in a database)
const verificationTokens: Record<string, { token: string, endorsementId: string, expires: Date }> = {};

// Generate unique ID
function generateId(): string {
  return uuidv4();
}

// Generate verification token
function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
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
        { 
          success: false, 
          error: 'email_exists',
          message: 'An endorsement with this email already exists',
          endorsementId: existingEndorsement.id,
          status: existingEndorsement.status
        },
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

    // Generate a unique ID for the endorsement
    const id = generateId();
    
    // Generate a verification token
    const token = generateVerificationToken();
    
    // Set token expiration (24 hours)
    const expires = new Date();
    expires.setHours(expires.getHours() + 24);
    
    // Store the token
    verificationTokens[email] = {
      token,
      endorsementId: id,
      expires
    };

    // Create new endorsement
    const newEndorsement = {
      id,
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
      status: 'pending_verification',
      verified: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      approved_at: null,
      certificate_generated: false,
      featured: false
    };

    // Add to mock database
    endorsements.push(newEndorsement);

    // Send verification email
    await sendVerificationEmail({
      email,
      name: contact_person_name,
      organization: organization_name,
      token,
      endorsementId: id
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Endorsement submitted successfully. Please check your email to verify.',
      endorsement: {
        id: newEndorsement.id,
        organization_name: newEndorsement.organization_name,
        email: newEndorsement.email,
        status: newEndorsement.status,
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
    const token = searchParams.get('token');

    // If token is provided, this is a verification request
    if (email && token) {
      // Check if token exists and is valid
      const tokenData = verificationTokens[email];
      if (!tokenData || tokenData.token !== token) {
        return NextResponse.json(
          { success: false, message: 'Invalid or expired token' },
          { status: 400 }
        );
      }
      
      // Check if token is expired
      if (new Date() > tokenData.expires) {
        return NextResponse.json(
          { success: false, message: 'Token has expired' },
          { status: 400 }
        );
      }
      
      // Find the endorsement
      const endorsementIndex = endorsements.findIndex(e => e.id === tokenData.endorsementId);
      if (endorsementIndex === -1) {
        return NextResponse.json(
          { success: false, message: 'Endorsement not found' },
          { status: 404 }
        );
      }
      
      // Update the endorsement
      endorsements[endorsementIndex] = {
        ...endorsements[endorsementIndex],
        status: 'pending_review',
        verified: true,
        updated_at: new Date().toISOString()
      };
      
      // Remove the token
      delete verificationTokens[email];
      
      // Return success
      return NextResponse.json({
        success: true,
        message: 'Email verified successfully',
        endorsement: {
          id: endorsements[endorsementIndex].id,
          organization_name: endorsements[endorsementIndex].organization_name,
          status: endorsements[endorsementIndex].status
        }
      });
    }
    
    // If only email is provided, this is a status check
    if (email && !token) {
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
    }
    
    // If neither email nor token is provided
    return NextResponse.json(
      { success: false, message: 'Email parameter is required' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
