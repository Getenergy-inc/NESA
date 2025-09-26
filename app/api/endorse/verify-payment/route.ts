import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Endorsement from '@/lib/models/Endorsement';
import { sendEmail } from '@/lib/templates/emailTemplates';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;

// Endorsement tier pricing
const tierPricing: { [key: string]: number } = {
  bronze: 500,
  silver: 1000,
  gold: 2500,
  platinum: 5000,
  africa_blue_garnet: 250000
};

// Payment confirmation email template
const paymentConfirmationEmailTemplate = (organizationName: string, tier: string, amount: number) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Confirmed - NESA-Africa 2025</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
            .success-icon { color: #10b981; font-size: 48px; text-align: center; margin: 20px 0; }
            .highlight { background: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #f59e0b; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>NESA-Africa 2025</h1>
                <h2>Payment Confirmed</h2>
            </div>

            <div class="content">
                <div class="success-icon">✅</div>
                <h3>Dear ${organizationName},</h3>

                <p>Great news! Your payment for the NESA-Africa 2025 endorsement has been successfully verified.</p>

                <div class="highlight">
                    <strong>Payment Details:</strong><br>
                    Tier: ${tier}<br>
                    Amount: $${amount.toLocaleString()}<br>
                    Status: ✅ Verified
                </div>

                <p><strong>What happens next?</strong></p>
                <ul>
                    <li>Your endorsement is now in our review queue</li>
                    <li>Our team will review your submission within 2-3 business days</li>
                    <li>You'll receive an approval notification once reviewed</li>
                    <li>Approved endorsements will be featured on our Wall of Endorsers</li>
                </ul>

                <p>Thank you for your generous support of NESA-Africa 2025!</p>

                <p>Best regards,<br>
                <strong>The NESA-Africa Team</strong></p>
            </div>

            <div class="footer">
                <p style="margin: 0; font-size: 12px; color: #6b7280;">
                    📍 54, Fajolu Street, Surulere, Lagos<br>
                    📞 +234-907-962-1110 | +234-810-926-5897<br>
                    ✉️ endorse@nesa.africa
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { endorsementId, adminToken }: any = body;

    if (!endorsementId) {
      return NextResponse.json(
        { success: false, message: 'Endorsement ID is required' },
        { status: 400 }
      );
    }

    // Verify admin token (basic authentication)
    if (adminToken !== process.env.ADMIN_TOKEN) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Find the endorsement
    const endorsement = await Endorsement.findById(endorsementId);
    if (!endorsement) {
      return NextResponse.json(
        { success: false, message: 'Endorsement not found' },
        { status: 404 }
      );
    }

    // Check if payment is already verified
    if (endorsement.payment_verified) {
      return NextResponse.json(
        { success: false, message: 'Payment already verified' },
        { status: 400 }
      );
    }

    // Check if it's a paid endorsement with bank transfer
    if (endorsement.endorsement_type !== 'paid' || endorsement.payment_method !== 'bank_transfer') {
      return NextResponse.json(
        { success: false, message: 'This endorsement does not require manual payment verification' },
        { status: 400 }
      );
    }

    // Verify payment (in production, this would check actual bank records)
    // For now, we'll simulate payment verification
    const isPaymentValid = await simulatePaymentVerification(endorsement);

    if (!isPaymentValid) {
      return NextResponse.json(
        { success: false, message: 'Payment verification failed. Please check payment details.' },
        { status: 400 }
      );
    }

    // Update endorsement payment status
    endorsement.payment_verified = true;
    endorsement.status = 'pending_review'; // Move to review queue
    endorsement.payment_date = new Date().toISOString();
    endorsement.updated_at = new Date().toISOString();

    await endorsement.save();

    // Send payment confirmation email
    try {
      const tierPricing: { [key: string]: number } = {
        bronze: 500,
        silver: 1000,
        gold: 2500,
        platinum: 5000,
        africa_blue_garnet: 250000
      };

      const amount = endorsement.endorsement_tier ? tierPricing[endorsement.endorsement_tier as keyof typeof tierPricing] || 0 : 0;

      await sendEmail({
        to: endorsement.email,
        subject: 'Payment Confirmed - NESA-Africa 2025 Endorsement',
        html: paymentConfirmationEmailTemplate(
          endorsement.organization_name,
          endorsement.endorsement_tier || 'Unknown',
          amount
        )
      });

      console.log('✅ Payment confirmation email sent to:', endorsement.email);
    } catch (emailError) {
      console.error('❌ Failed to send payment confirmation email:', emailError);
      // Don't fail the entire request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully. Endorsement moved to review queue.',
      endorsement: {
        id: (endorsement._id as any).toString(),
        organization_name: endorsement.organization_name,
        email: endorsement.email,
        status: endorsement.status,
        payment_verified: endorsement.payment_verified,
        payment_method: endorsement.payment_method,
        endorsement_tier: endorsement.endorsement_tier
      }
    });

  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Simulate payment verification (in production, integrate with bank APIs)
async function simulatePaymentVerification(endorsement: any): Promise<boolean> {
  // In production, this would:
  // 1. Query bank API for transactions with the payment reference
  // 2. Verify the amount matches the expected tier price
  // 3. Check transaction date is within acceptable timeframe

  // For now, simulate verification (90% success rate for testing)
  const randomSuccess = Math.random() > 0.1;

  if (randomSuccess) {
    console.log(`✅ Simulated payment verification successful for endorsement: ${endorsement._id}`);
    return true;
  } else {
    console.log(`❌ Simulated payment verification failed for endorsement: ${endorsement._id}`);
    return false;
  }
}

// GET endpoint to check payment status
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const endorsementId = searchParams.get('endorsementId');

    if (!endorsementId) {
      return NextResponse.json(
        { success: false, message: 'Endorsement ID parameter is required' },
        { status: 400 }
      );
    }

    const endorsement = await Endorsement.findById(endorsementId);

    if (!endorsement) {
      return NextResponse.json(
        { success: false, message: 'Endorsement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      payment_status: {
        verified: endorsement.payment_verified,
        method: endorsement.payment_method,
        reference: endorsement.payment_reference,
        date: endorsement.payment_date,
        endorsement_status: endorsement.status,
        tier: endorsement.endorsement_tier
      }
    });

  } catch (error) {
    console.error('Error checking payment status:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}