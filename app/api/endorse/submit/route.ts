import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Endorsement from '@/lib/models/Endorsement';
import { endorsementVerificationEmailTemplate, sendEmail } from '@/lib/templates/emailTemplates';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;

// Generate verification token
function generateVerificationToken(): string {
  return Math.random().toString(36).substr(2, 15);
}

// Endorsement tier pricing
const TIER_PRICING = {
  bronze: 500,
  silver: 1000,
  gold: 2500,
  platinum: 5000,
  africa_blue_garnet: 250000
};

// Process GFA Wallet payment
async function processGFAWalletPayment(userId: string, amount: number, endorsementId: string) {
  try {
    // Check wallet balance
    const balanceResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gfa-wallet/balance?userId=${userId}`);
    const balanceData = await balanceResponse.json();

    if (!balanceData.success) {
      return { success: false, message: 'Unable to check wallet balance' };
    }

    const usdBalance = balanceData.wallet.balance.usd;

    if (usdBalance < amount) {
      return {
        success: false,
        message: `Insufficient balance. Required: $${amount}, Available: $${usdBalance}`
      };
    }

    // Process the payment
    const paymentResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gfa-wallet/balance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        amount: -amount, // Negative for debit
        currency: 'usd',
        type: 'endorsement_payment',
        description: `NESA-Africa Endorsement - ${endorsementId}`
      }),
    });

    const paymentData = await paymentResponse.json();

    if (paymentData.success) {
      return {
        success: true,
        transactionId: paymentData.wallet.lastTransaction.id,
        message: 'Payment processed successfully'
      };
    } else {
      return { success: false, message: paymentData.message || 'Payment processing failed' };
    }

  } catch (error) {
    console.error('GFA Wallet payment error:', error);
    return { success: false, message: 'Payment service temporarily unavailable' };
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

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
    }: any = body;

    // Validate required fields
    if (!organization_name || !contact_person_name || !email || !phone || !country ||
        !endorser_category || !endorsement_type || !endorsement_headline ||
        !endorsement_statement || !consent_to_publish || !authorized_to_submit || !digital_signature) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Note: user_id and submitted_by are now optional

    // Check if endorsement already exists
    const existingEndorsement = await Endorsement.findOne({ email });
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
    const newEndorsement = new Endorsement({
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
    });

    // Save to database
    await newEndorsement.save();

    let responseMessage = 'Endorsement submitted successfully';
    let nextStep = null;

    // Handle payment flow for paid endorsements
    if (endorsement_type === 'paid') {
      if (payment_method === 'gfa_wallet') {
        // For GFA wallet, process payment immediately
        try {
          const tierAmount = TIER_PRICING[endorsement_tier as keyof typeof TIER_PRICING] || 0;
          const paymentResult = await processGFAWalletPayment(user_id, tierAmount, (newEndorsement._id as any).toString());

          if (paymentResult.success) {
            newEndorsement.payment_verified = true;
            newEndorsement.status = 'pending_review';
            await newEndorsement.save();

            responseMessage = 'Endorsement submitted and payment processed successfully via GFA Wallet';
            nextStep = 'review';
          } else {
            responseMessage = `Endorsement submitted but payment failed: ${paymentResult.message}`;
            nextStep = 'payment_failed';
          }
        } catch (paymentError) {
          console.error('GFA Wallet payment error:', paymentError);
          responseMessage = 'Endorsement submitted but payment processing failed. Please contact support.';
          nextStep = 'payment_error';
        }
      } else if (payment_method === 'bank_transfer') {
        // For bank transfer, generate reference and set pending payment status
        const paymentReference = `NESA-END-${Date.now().toString().slice(-8)}-${(newEndorsement._id as any).toString().slice(-4)}`;
        newEndorsement.payment_reference = paymentReference;
        newEndorsement.status = 'pending_payment';
        await newEndorsement.save();

        responseMessage = 'Endorsement submitted. Please complete your bank transfer payment.';
        nextStep = 'bank_transfer';
      }
    } else {
      // For free endorsements, send verification email immediately
      try {
        const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nesa.africa'}/get-involved/endorse-nesa-africa/verify-email?email=${encodeURIComponent(email)}&token=${newEndorsement.verification_token}`;

        console.log('🔗 Generated verification URL:', verificationUrl);
        console.log('📧 Email:', email);
        console.log('🔑 Token:', newEndorsement.verification_token);

        const emailHtml = endorsementVerificationEmailTemplate({
          name: contact_person_name,
          verificationUrl
        });

        await sendEmail({
          to: email,
          subject: 'Verify Your NESA-Africa 2025 Endorsement',
          html: emailHtml
        });

        console.log('✅ Verification email sent to:', email);
        nextStep = 'email_verification';
      } catch (emailError) {
        console.error('❌ Failed to send verification email:', emailError);
        nextStep = 'email_error';
      }
    }

    // Return success response with next step information
    return NextResponse.json({
      success: true,
      message: responseMessage,
      endorsement: {
        id: (newEndorsement._id as any).toString(),
        organization_name: newEndorsement.organization_name,
        email: newEndorsement.email,
        status: newEndorsement.status,
        verification_token: newEndorsement.verification_token,
        created_at: newEndorsement.created_at,
        endorsement_type: newEndorsement.endorsement_type,
        payment_method: newEndorsement.payment_method,
        payment_reference: newEndorsement.payment_reference,
        payment_verified: newEndorsement.payment_verified
      },
      next_step: nextStep
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
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const endorsement = await Endorsement.findOne({ email });

    if (!endorsement) {
      return NextResponse.json(
        { success: false, message: 'Endorsement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      endorsement: {
        id: (endorsement._id as any).toString(),
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
