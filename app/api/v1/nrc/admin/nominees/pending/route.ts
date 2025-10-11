import { NextRequest, NextResponse } from 'next/server';
import connectNRCDB from '@/lib/configs/nrcDatabase';
import NRCNominee from '@/lib/models/NRCNominee';

export async function GET(request: NextRequest) {
  try {
    const conn = await connectNRCDB();

    // Get model from the NRC connection
    const NomineeModel = conn.models.NRCNominee || conn.model('NRCNominee', NRCNominee.schema);

    // Get all pending nominees (status: REVIEW)
    const nominees = await NomineeModel.find({ status: 'REVIEW' })
      .sort({ dateCreated: -1 })
      .lean();

    // Get stats
    const stats = {
      pending: await NomineeModel.countDocuments({ status: 'REVIEW' }),
      verified: await NomineeModel.countDocuments({ status: 'VERIFIED' }),
      published: await NomineeModel.countDocuments({ status: 'PUBLISHED' }),
      rejected: await NomineeModel.countDocuments({ status: 'REJECTED' }),
    };

    return NextResponse.json({
      success: true,
      data: {
        nominees,
        stats,
      },
    });
  } catch (error: any) {
    console.error('Error fetching pending nominees:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch pending nominees',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
