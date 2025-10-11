import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/configs/database';
import AGCTransaction from '@/lib/models/AGCTransaction';
import NRCVolunteer from '@/lib/models/NRCVolunteer';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { volunteerId, type, amount, description, nominationId, isWithdrawable } = body;

    if (!volunteerId || !type || !amount || !description) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    // Verify volunteer exists
    const volunteer = await NRCVolunteer.findOne({ userId: volunteerId });
    if (!volunteer) {
      return NextResponse.json(
        { success: false, message: 'Volunteer not found' },
        { status: 404 }
      );
    }

    // Create transaction
    const transaction = new AGCTransaction({
      volunteerId,
      type,
      amount,
      description,
      nominationId,
      isWithdrawable: isWithdrawable || false,
      status: 'COMPLETED',
      timestamp: new Date()
    });

    await transaction.save();

    // Update volunteer balance
    if (type === 'EARN' || type === 'BONUS') {
      volunteer.agcEarned += amount;
      if (isWithdrawable) {
        volunteer.agcWithdrawable += amount;
      } else {
        volunteer.agcNonWithdrawable += amount;
      }
    } else if (type === 'WITHDRAW' || type === 'PENALTY') {
      volunteer.agcWithdrawable -= amount;
    }

    await volunteer.save();

    return NextResponse.json({
      success: true,
      message: 'Transaction processed successfully',
      data: {
        id: transaction._id,
        type: transaction.type,
        amount: transaction.amount,
        timestamp: transaction.timestamp
      }
    });

  } catch (error: any) {
    console.error('Transaction error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to process transaction' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const volunteerId = searchParams.get('volunteerId');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!volunteerId) {
      return NextResponse.json(
        { success: false, message: 'Volunteer ID is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const query: any = { volunteerId };
    if (type) query.type = type;

    const skip = (page - 1) * limit;

    const transactions = await AGCTransaction.find(query)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await AGCTransaction.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: {
        transactions,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error: any) {
    console.error('Get transactions error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to get transactions' },
      { status: 500 }
    );
  }
}
