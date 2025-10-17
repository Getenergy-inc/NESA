import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/configs/database';
import NRCNominee from '@/lib/models/NRCNominee';
import NRCVolunteer from '@/lib/models/NRCVolunteer';
import AGCTransaction from '@/lib/models/AGCTransaction';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const nomineeId = params.id;

    await connectDB();

    const nominee = await NRCNominee.findById(nomineeId);
    if (!nominee) {
      return NextResponse.json(
        { success: false, message: 'Nominee not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: nominee
    });

  } catch (error: any) {
    console.error('Get nominee error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to get nominee' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const nomineeId = params.id;
    const body = await request.json();

    await connectDB();

    const nominee = await NRCNominee.findById(nomineeId);
    if (!nominee) {
      return NextResponse.json(
        { success: false, message: 'Nominee not found' },
        { status: 404 }
      );
    }

    const oldStatus = nominee.status;

    // Update nominee fields
    Object.keys(body).forEach(key => {
      if (key !== '_id' && key !== 'volunteerId') {
        (nominee as any)[key] = body[key];
      }
    });

    nominee.lastModified = new Date();
    await nominee.save();

    // Handle status changes
    if (body.status && body.status !== oldStatus) {
      const volunteer = await NRCVolunteer.findOne({ userId: nominee.volunteerId });
      
      if (volunteer) {
        // Update volunteer stats based on status change
        if (oldStatus === 'REVIEW' && body.status === 'VERIFIED') {
          volunteer.nomineesPending -= 1;
          volunteer.nomineesVerified += 1;
          
          // Award AGC for verification
          const agcAmount = 0.5;
          const transaction = new AGCTransaction({
            volunteerId: nominee.volunteerId,
            type: 'EARN',
            amount: agcAmount,
            description: `Nominee verified: ${nominee.fullName}`,
            nominationId: nomineeId,
            isWithdrawable: false,
            status: 'COMPLETED',
            timestamp: new Date()
          });
          
          await transaction.save();
          
          volunteer.agcEarned += agcAmount;
          volunteer.agcNonWithdrawable += agcAmount;
          
          nominee.agcAwarded = agcAmount;
          nominee.agcAwardedDate = new Date();
          await nominee.save();
        } else if (oldStatus === 'REVIEW' && body.status === 'REJECTED') {
          volunteer.nomineesPending -= 1;
          volunteer.nomineesRejected += 1;
        }
        
        await volunteer.updateStats();
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Nominee updated successfully',
      data: nominee
    });

  } catch (error: any) {
    console.error('Update nominee error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update nominee' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const nomineeId = params.id;

    await connectDB();

    const nominee = await NRCNominee.findById(nomineeId);
    if (!nominee) {
      return NextResponse.json(
        { success: false, message: 'Nominee not found' },
        { status: 404 }
      );
    }

    // Update volunteer stats
    const volunteer = await NRCVolunteer.findOne({ userId: nominee.volunteerId });
    if (volunteer) {
      volunteer.nomineesUploaded -= 1;
      
      if (nominee.status === 'REVIEW') {
        volunteer.nomineesPending -= 1;
      } else if (nominee.status === 'VERIFIED') {
        volunteer.nomineesVerified -= 1;
      } else if (nominee.status === 'REJECTED') {
        volunteer.nomineesRejected -= 1;
      }
      
      await volunteer.save();
    }

    await NRCNominee.findByIdAndDelete(nomineeId);

    return NextResponse.json({
      success: true,
      message: 'Nominee deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete nominee error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete nominee' },
      { status: 500 }
    );
  }
}
