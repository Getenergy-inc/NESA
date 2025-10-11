import { NextRequest, NextResponse } from 'next/server';
import connectNRCDB from '@/lib/configs/nrcDatabase';
import NRCNominee from '@/lib/models/NRCNominee';
import NRCVolunteer from '@/lib/models/NRCVolunteer';
import AGCTransaction from '@/lib/models/AGCTransaction';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conn = await connectNRCDB();

    const { id } = params;
    const body = await request.json();
    const { reviewedBy, reviewNotes, publishToPublic = true } = body;

    // Get models from the NRC connection
    const NomineeModel = conn.models.NRCNominee || conn.model('NRCNominee', NRCNominee.schema);
    const VolunteerModel = conn.models.NRCVolunteer || conn.model('NRCVolunteer', NRCVolunteer.schema);
    const TransactionModel = conn.models.AGCTransaction || conn.model('AGCTransaction', AGCTransaction.schema);

    // Find the nominee
    const nominee = await NomineeModel.findById(id);
    if (!nominee) {
      return NextResponse.json(
        { success: false, message: 'Nominee not found' },
        { status: 404 }
      );
    }

    // Update nominee status
    nominee.status = publishToPublic ? 'PUBLISHED' : 'VERIFIED';
    nominee.reviewedBy = reviewedBy;
    nominee.reviewNotes = reviewNotes;
    nominee.reviewDate = new Date();
    await nominee.save();

    // Award AGC tokens to the volunteer
    const volunteer = await VolunteerModel.findOne({ userId: nominee.volunteerId });
    if (volunteer) {
      const agcAmount = 10; // 10 AGC per verified nominee

      // Create AGC transaction
      await TransactionModel.create({
        volunteerId: volunteer.userId,
        type: 'EARNED',
        amount: agcAmount,
        description: `Nominee verified: ${nominee.fullName}`,
        status: 'COMPLETED',
        relatedNomineeId: nominee._id,
      });

      // Update volunteer's AGC balance
      volunteer.agcBalance = (volunteer.agcBalance || 0) + agcAmount;
      volunteer.agcWithdrawable = (volunteer.agcWithdrawable || 0) + agcAmount;
      volunteer.totalEarned = (volunteer.totalEarned || 0) + agcAmount;
      await volunteer.save();
    }

    return NextResponse.json({
      success: true,
      message: `Nominee ${publishToPublic ? 'verified and published' : 'verified'}`,
      data: { nominee },
    });
  } catch (error: any) {
    console.error('Error verifying nominee:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to verify nominee',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
