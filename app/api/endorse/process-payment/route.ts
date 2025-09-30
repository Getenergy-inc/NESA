import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Endorsement from '@/lib/models/Endorsement';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;

// Endorsement tier pricing
const TIER_PRICING = {
  bronze: 500,
  silver: 1000,
  gold: 2500,
  platinum: 5000,
  africa_blue_garnet: 250000
};

// Bank transfer details
const BANK_DETAILS = {
  bank_name: 'Access Bank PLC',
  account_name: 'NESA-Africa',
  account_number: '1234567890',
  swift_code: 'ABNGNGLA',
  branch: 'Lagos Main Branch'
};

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { endorsementId, paymentMethod, userId }: any = body;

    if (!endorsementId || !paymentMethod) {
      return NextResponse.json(
        { success: false, message: 'Endorsement ID and payment method are required' },
        { status: 400 }
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

    // Check if already paid
    if (endorsement.payment_verified) {
      return NextResponse.json(
        { success: false, message: 'Payment already verified for this endorsement' },
        { status: 400 }
      );
    }

    // Validate endorsement type
    if (endorsement.endorsement_type !== 'paid') {
      return NextResponse.json(
        { success: false, message: 'This endorsement is not a paid endorsement' },
        { status: 400 }
      );
    }

    const tierAmount = TIER_PRICING[endorsement.endorsement_tier as keyof typeof TIER_PRICING];

    if (!tierAmount) {
      return NextResponse.json(
        { success: false, message: 'Invalid endorsement tier' },
        { status: 400 }
      );
    }

    let paymentResult;

    if (paymentMethod === 'gfa_wallet') {
      // Process GFA Wallet payment
      paymentResult = await processGFAWalletPayment(userId, tierAmount, endorsementId);

      if (paymentResult.success) {
        // Update endorsement payment status
        endorsement.payment_verified = true;
        endorsement.payment_method = 'gfa_wallet';
        endorsement.status = 'pending_review'; // Move to review queue
        endorsement.updated_at = new Date().toISOString();

        await endorsement.save();

        return NextResponse.json({
          success: true,
          message: 'Payment processed successfully via GFA Wallet',
          payment: {
            method: 'gfa_wallet',
            amount: tierAmount,
            currency: 'USD',
            transactionId: paymentResult.transactionId
          },
          endorsement: {
            id: (endorsement._id as any).toString(),
            status: endorsement.status,
            payment_verified: endorsement.payment_verified
          }
        });
      } else {
        return NextResponse.json(
          { success: false, message: paymentResult.message },
          { status: 400 }
        );
      }

    } else if (paymentMethod === 'bank_transfer') {
      // Generate payment reference for bank transfer
      const paymentReference = `NESA-END-${Date.now().toString().slice(-8)}-${endorsementId.slice(-4)}`;

      // Update endorsement with payment reference
      endorsement.payment_method = 'bank_transfer';
      endorsement.payment_reference = paymentReference;
      endorsement.status = 'pending_payment'; // Waiting for bank transfer
      endorsement.updated_at = new Date().toISOString();

      await endorsement.save();

      return NextResponse.json({
        success: true,
        message: 'Bank transfer payment initiated. Please complete the transfer using the details below.',
        payment: {
          method: 'bank_transfer',
          amount: tierAmount,
          currency: 'USD',
          reference: paymentReference,
          bank_details: BANK_DETAILS,
          instructions: [
            'Transfer the exact amount to the account details provided',
            'Include the payment reference in your transfer description',
            'Payment processing may take 1-3 business days',
            'You will receive a confirmation email once payment is verified'
          ]
        },
        endorsement: {
          id: (endorsement._id as any).toString(),
          status: endorsement.status,
          payment_reference: paymentReference
        }
      });

    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid payment method' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error processing payment:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

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