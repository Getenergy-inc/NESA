import { NextRequest, NextResponse } from 'next/server';
import connectNRCDB from '@/lib/configs/nrcDatabase';
import NRCNominee from '@/lib/models/NRCNominee';

/**
 * Quick endpoint to verify the latest nominee in REVIEW status
 * For testing purposes
 */
export async function POST(request: NextRequest) {
  try {
    const conn = await connectNRCDB();
    const body = await request.json();
    const { email } = body;

    // Get model from the NRC connection
    const NomineeModel = conn.models.NRCNominee || conn.model('NRCNominee', NRCNominee.schema);

    // Build query
    const query: any = { status: 'REVIEW' };
    if (email) {
      query.email = email;
    }

    // Find the latest nominee in REVIEW status
    const nominee = await NomineeModel.findOne(query).sort({ dateCreated: -1 });

    if (!nominee) {
      return NextResponse.json(
        { success: false, message: 'No nominee found in REVIEW status' },
        { status: 404 }
      );
    }

    console.log('Found nominee:', {
      id: nominee._id,
      name: nominee.fullName,
      email: nominee.email,
      category: nominee.awardCategory,
      subcategory: nominee.subcategory,
      status: nominee.status
    });

    // Update nominee status to VERIFIED
    nominee.status = 'VERIFIED';
    nominee.reviewedBy = 'admin-quick-verify';
    nominee.reviewDate = new Date();
    await nominee.save();

    console.log('Nominee verified:', nominee._id);

    return NextResponse.json({
      success: true,
      message: 'Nominee verified successfully',
      data: {
        id: nominee._id,
        fullName: nominee.fullName,
        email: nominee.email,
        awardCategory: nominee.awardCategory,
        subcategory: nominee.subcategory,
        status: nominee.status,
        reviewDate: nominee.reviewDate
      },
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

/**
 * Get all nominees in REVIEW status
 */
export async function GET(request: NextRequest) {
  try {
    const conn = await connectNRCDB();
    const NomineeModel = conn.models.NRCNominee || conn.model('NRCNominee', NRCNominee.schema);

    const nominees = await NomineeModel.find({ status: 'REVIEW' })
      .sort({ dateCreated: -1 })
      .select('fullName email awardCategory subcategory dateCreated')
      .limit(10);

    return NextResponse.json({
      success: true,
      count: nominees.length,
      nominees: nominees.map((n: any) => ({
        id: n._id,
        fullName: n.fullName,
        email: n.email,
        awardCategory: n.awardCategory,
        subcategory: n.subcategory,
        dateCreated: n.dateCreated
      }))
    });
  } catch (error: any) {
    console.error('Error fetching nominees:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch nominees',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
