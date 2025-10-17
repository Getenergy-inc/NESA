import { NextRequest, NextResponse } from 'next/server';
import connectNRCDB from '@/lib/configs/nrcDatabase';
import NRCNominee from '@/lib/models/NRCNominee';
import { getCategoryLabel } from '@/lib/configs/awardCategories';

export const dynamic = 'force-dynamic';

/**
 * Get published nominees by category for public display
 * This API serves the public category pages with NRC-verified nominees
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Connect to NRC database
    const conn = await connectNRCDB();
    const NomineeModel = conn.models.NRCNominee || conn.model('NRCNominee', NRCNominee.schema);

    // Build query for published nominees only
    const query: any = { status: 'PUBLISHED' };
    
    if (category) {
      query.awardCategory = category;
    }
    
    if (subcategory) {
      query.subcategory = subcategory;
    }

    const skip = (page - 1) * limit;

    const nominees = await NomineeModel.find(query)
      .sort({ dateCreated: -1 })
      .skip(skip)
      .limit(limit)
      .select('fullName organizationName country region awardCategory subcategory achievementSummary impactMetrics sdgAlignment profileImageUrl dateCreated');

    const total = await NomineeModel.countDocuments(query);

    // Get categories with counts
    const categoryCounts = await NomineeModel.aggregate([
      { $match: { status: 'PUBLISHED' } },
      {
        $group: {
          _id: '$awardCategory',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    return NextResponse.json({
      success: true,
      data: {
        nominees,
        categoryCounts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error: any) {
    console.error('Get nominees by category error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to get nominees' },
      { status: 500 }
    );
  }
}
