import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/configs/database';
import NRCNominee from '@/lib/models/NRCNominee';
import NRCVolunteer from '@/lib/models/NRCVolunteer';
import AGCTransaction from '@/lib/models/AGCTransaction';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { operation, nomineeIds, data } = body;

    if (!operation || !nomineeIds || !Array.isArray(nomineeIds)) {
      return NextResponse.json(
        { success: false, message: 'Operation and nomineeIds array are required' },
        { status: 400 }
      );
    }

    await connectDB();

    let result;
    let message = '';

    switch (operation) {
      case 'verify':
        // Get nominees before update
        const nomineesToVerify = await NRCNominee.find({
          _id: { $in: nomineeIds },
          status: 'REVIEW'
        });

        result = await NRCNominee.updateMany(
          { _id: { $in: nomineeIds }, status: 'REVIEW' },
          { 
            $set: { 
              status: 'VERIFIED',
              reviewDate: new Date(),
              reviewedBy: data?.reviewedBy || 'admin'
            } 
          }
        );

        // Award AGC for each verified nominee
        for (const nominee of nomineesToVerify) {
          const volunteer = await NRCVolunteer.findOne({ userId: nominee.volunteerId });
          
          if (volunteer) {
            const agcAmount = 0.5;
            const transaction = new AGCTransaction({
              volunteerId: nominee.volunteerId,
              type: 'EARN',
              amount: agcAmount,
              description: `Bulk verification: ${nominee.fullName}`,
              nominationId: nominee._id.toString(),
              isWithdrawable: false,
              status: 'COMPLETED',
              timestamp: new Date()
            });
            
            await transaction.save();
            
            volunteer.nomineesVerified += 1;
            volunteer.nomineesPending -= 1;
            volunteer.agcEarned += agcAmount;
            volunteer.agcNonWithdrawable += agcAmount;
            await volunteer.updateStats();
          }
        }

        message = `Verified ${result.modifiedCount} nominees`;
        break;

      case 'reject':
        // Get nominees before update
        const nomineesToReject = await NRCNominee.find({
          _id: { $in: nomineeIds },
          status: 'REVIEW'
        });

        result = await NRCNominee.updateMany(
          { _id: { $in: nomineeIds }, status: 'REVIEW' },
          { 
            $set: { 
              status: 'REJECTED',
              reviewDate: new Date(),
              reviewedBy: data?.reviewedBy || 'admin',
              rejectionReason: data?.rejectionReason || 'Bulk rejection'
            } 
          }
        );

        // Update volunteer stats
        for (const nominee of nomineesToReject) {
          const volunteer = await NRCVolunteer.findOne({ userId: nominee.volunteerId });
          
          if (volunteer) {
            volunteer.nomineesRejected += 1;
            volunteer.nomineesPending -= 1;
            await volunteer.save();
          }
        }

        message = `Rejected ${result.modifiedCount} nominees`;
        break;

      case 'publish':
        result = await NRCNominee.updateMany(
          { _id: { $in: nomineeIds }, status: 'VERIFIED' },
          { $set: { status: 'PUBLISHED' } }
        );
        message = `Published ${result.modifiedCount} nominees`;
        break;

      case 'updateCategory':
        if (!data || !data.awardCategory) {
          return NextResponse.json(
            { success: false, message: 'Award category is required' },
            { status: 400 }
          );
        }
        result = await NRCNominee.updateMany(
          { _id: { $in: nomineeIds } },
          { $set: { awardCategory: data.awardCategory } }
        );
        message = `Updated category for ${result.modifiedCount} nominees`;
        break;

      case 'delete':
        // Get nominees before deletion
        const nomineesToDelete = await NRCNominee.find({
          _id: { $in: nomineeIds }
        });

        result = await NRCNominee.deleteMany(
          { _id: { $in: nomineeIds } }
        );

        // Update volunteer stats
        for (const nominee of nomineesToDelete) {
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
        }

        message = `Deleted ${result.deletedCount} nominees`;
        break;

      default:
        return NextResponse.json(
          { success: false, message: `Unknown operation: ${operation}` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message,
      data: {
        operation,
        affectedCount: result.modifiedCount || result.deletedCount || 0,
        nomineeIds
      }
    });

  } catch (error: any) {
    console.error('Bulk nominee operation error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to perform bulk operation' },
      { status: 500 }
    );
  }
}
