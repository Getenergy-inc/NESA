import { NextRequest, NextResponse } from 'next/server';
import connectNRCDB from '@/lib/configs/nrcDatabase';
import NRCNominee from '@/lib/models/NRCNominee';

/**
 * Check verified nominees in the database
 */
export async function GET(request: NextRequest) {
  try {
    const conn = await connectNRCDB();
    const NomineeModel = conn.models.NRCNominee || conn.model('NRCNominee', NRCNominee.schema);

    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    // Build query
    const query: any = {
      status: { $in: ['VERIFIED', 'PUBLISHED'] }
    };

    if (email) {
      query.email = email;
    }

    const nominees = await NomineeModel.find(query)
      .sort({ dateCreated: -1 })
      .select('fullName email awardCategory subcategory superAwardCategory status dateCreated reviewDate')
      .limit(20);

    console.log('Found verified nominees:', nominees.length);
    nominees.forEach((n: any) => {
      console.log({
        id: n._id,
        name: n.fullName,
        email: n.email,
        superCategory: n.superAwardCategory,
        category: n.awardCategory,
        subcategory: n.subcategory,
        status: n.status
      });
    });

    return NextResponse.json({
      success: true,
      count: nominees.length,
      nominees: nominees.map((n: any) => ({
        id: n._id,
        fullName: n.fullName,
        email: n.email,
        superAwardCategory: n.superAwardCategory,
        awardCategory: n.awardCategory,
        subcategory: n.subcategory,
        status: n.status,
        dateCreated: n.dateCreated,
        reviewDate: n.reviewDate
      }))
    });
  } catch (error: any) {
    console.error('Error fetching verified nominees:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch verified nominees',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
