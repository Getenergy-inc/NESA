import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Endorsement from '@/lib/models/Endorsement';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const country = searchParams.get('country');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');

    const query: any = {
      status: 'approved',
      verified: true,
    };

    // Apply filters
    if (category && category !== 'all') {
      query.endorser_category = category;
    }

    if (country && country !== 'all') {
      query.country = { $regex: new RegExp(`^${country}$`, 'i') };
    }

    if (featured === 'true') {
      query.featured = true;
    }

    // Apply pagination
    const limitNum = limit ? parseInt(limit) : 20;
    const offsetNum = offset ? parseInt(offset) : 0;

    const endorsements = await Endorsement.find(query)
      .sort({ approved_at: -1 })
      .skip(offsetNum)
      .limit(limitNum)
      .select('organization_name country endorser_category endorsement_type endorsement_tier endorsement_headline endorsement_statement logo_file video_link website approved_at featured');

    const totalCount = await Endorsement.countDocuments(query);

    // Get unique categories and countries for filters
    const filterDataSource = await Endorsement.find({ status: 'approved', verified: true }).select('endorser_category country');
    const categories = [...new Set(filterDataSource.map((e: any) => e.endorser_category))];
    const countries = [...new Set(filterDataSource.map((e: any) => e.country))].sort();

    return NextResponse.json({
      success: true,
      endorsements,
      pagination: {
        total: totalCount,
        limit: limitNum,
        offset: offsetNum,
        hasMore: offsetNum + limitNum < totalCount
      },
      filters: {
        categories,
        countries
      }
    });

  } catch (error) {
    console.error('Error retrieving endorsements:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
