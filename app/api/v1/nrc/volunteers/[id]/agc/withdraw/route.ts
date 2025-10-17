import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/configs/database';
import NRCVolunteer from '@/lib/models/NRCVolunteer';
import AGCTransaction from '@/lib/models/AGCTransaction';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const volunteerId = params.id;
    const body = await request.json();
    const { amount, walletAddress } = body;

    if (!amount || !walletAddress) {
      return NextResponse.json(
        { success: false, message: 'Amount and wallet address are required' },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { success: false, message: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    await connectDB();

    // Get volunteer
    const volunteer = await NRCVolunteer.findOne({ userId: volunteerId });
    if (!volunteer) {
      return NextResponse.json(
        { success: false, message: 'Volunteer not found' },
        { status: 404 }
      );
    }

    // Check if volunteer has sufficient withdrawable balance
    if (volunteer.agcWithdrawable < amount) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Insufficient withdrawable balance. Available: ${volunteer.agcWithdrawable} AGC` 
        },
        { status: 400 }
      );
    }

    // Create withdrawal transaction
    const transaction = new AGCTransaction({
      volunteerId,
      type: 'WITHDRAW',
      amount,
      description: `AGC withdrawal to ${walletAddress}`,
      isWithdrawable: true,
      status: 'PENDING',
      walletAddress,
      timestamp: new Date()
    });

    await transaction.save();

    // Update volunteer balance (deduct immediately, will be refunded if withdrawal fails)
    volunteer.agcWithdrawable -= amount;
    await volunteer.save();

    // TODO: Integrate with actual blockchain/payment system
    // For now, mark as completed immediately
    transaction.status = 'COMPLETED';
    transaction.processedDate = new Date();
    transaction.transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;
    await transaction.save();

    return NextResponse.json({
      success: true,
      message: 'Withdrawal request processed successfully',
      data: {
        transactionId: transaction._id,
        amount: transaction.amount,
        walletAddress: transaction.walletAddress,
        status: transaction.status,
        transactionHash: transaction.transactionHash
      }
    });

  } catch (error: any) {
    console.error('Withdrawal error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to process withdrawal' },
      { status: 500 }
    );
  }
}
