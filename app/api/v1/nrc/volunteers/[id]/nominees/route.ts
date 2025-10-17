import { NextRequest, NextResponse } from 'next/server';
import connectNRCDB from '@/lib/configs/nrcDatabase';
import NRCNominee from '@/lib/models/NRCNominee';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conn = await connectNRCDB();

    const volunteerId = params.id;
    const { searchParams } = new URL(request.url);
    
    // Get model from the NRC connection
    const NomineeModel = conn.models.NRCNominee || conn.model('NRCNominee', NRCNominee.schema);
    
    // Get filter parameters
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const country = searchParams.get('country');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Build query
    const query: any = { volunteerId };
    
    if (status) {
      query.status = status.toUpperCase();
    }
    if (category) {
      query.awardCategory = category;
    }
    if (country) {
      query.country = country;
    }

    // Get nominees with pagination
    const skip = (page - 1) * limit;
    const nominees = await NomineeModel.find(query)
      .sort({ dateCreated: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await NomineeModel.countDocuments(query);

    // Get status counts
    const statusCounts = {
      draft: await NomineeModel.countDocuments({ volunteerId, status: 'DRAFT' }),
      review: await NomineeModel.countDocuments({ volunteerId, status: 'REVIEW' }),
      verified: await NomineeModel.countDocuments({ volunteerId, status: 'VERIFIED' }),
      published: await NomineeModel.countDocuments({ volunteerId, status: 'PUBLISHED' }),
      rejected: await NomineeModel.countDocuments({ volunteerId, status: 'REJECTED' }),
    };

    return NextResponse.json({
      success: true,
      data: {
        nominees,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
        statusCounts,
      },
    });
  } catch (error: any) {
    console.error('Error fetching volunteer nominees:', error);
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
