import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/configs/database';
import NRCVolunteer from '@/lib/models/NRCVolunteer';
import NRCNominee from '@/lib/models/NRCNominee';
import AGCTransaction from '@/lib/models/AGCTransaction';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { volunteerId, nominationId } = body;

    if (!volunteerId || !nominationId) {
      return NextResponse.json(
        { success: false, message: 'volunteerId and nominationId are required' },
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

    // Verify nominee exists and belongs to volunteer
    const nominee = await NRCNominee.findById(nominationId);
    if (!nominee) {
      return NextResponse.json(
        { success: false, message: 'Nominee not found' },
        { status: 404 }
      );
    }

    if (nominee.volunteerId !== volunteerId) {
      return NextResponse.json(
        { success: false, message: 'Nominee does not belong to this volunteer' },
        { status: 403 }
      );
    }

    // Check if AGC already awarded
    if (nominee.agcAwarded > 0) {
      return NextResponse.json(
        { success: false, message: 'AGC already awarded for this nominee' },
        { status: 400 }
      );
    }

    // Award AGC
    const agcAmount = 0.5;
    const transaction = new AGCTransaction({
      volunteerId,
      type: 'EARN',
      amount: agcAmount,
      description: `Nominee verified: ${nominee.fullName}`,
      nominationId,
      isWithdrawable: false,
      status: 'COMPLETED',
      timestamp: new Date()
    });

    await transaction.save();

    // Update volunteer balance
    volunteer.agcEarned += agcAmount;
    volunteer.agcNonWithdrawable += agcAmount;
    await volunteer.save();

    // Update nominee
    nominee.agcAwarded = agcAmount;
    nominee.agcAwardedDate = new Date();
    await nominee.save();

    return NextResponse.json({
      success: true,
      message: 'AGC awarded successfully',
      data: {
        volunteerId,
        nominationId,
        agcAwarded: agcAmount,
        newBalance: volunteer.agcEarned
      }
    });

  } catch (error: any) {
    console.error('Award AGC error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to award AGC' },
      { status: 500 }
    );
  }
}
