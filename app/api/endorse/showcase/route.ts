import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const country = searchParams.get('country');
    const featured = searchParams.get('featured') === 'true';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;

    // Build the where clause for filtering
    const whereClause: any = {
      status: 'approved',
      verified: true
    };

    if (category && category !== 'all') {
      whereClause.endorser_category = category;
    }

    if (country && country !== 'all') {
      whereClause.country = {
        equals: country,
        mode: 'insensitive'
      };
    }

    if (featured) {
      whereClause.featured = true;
    }

    // Get total count for pagination
    const totalCount = await prisma.endorsement.count({
      where: whereClause
    });

    // Get paginated endorsements
    const endorsements = await prisma.endorsement.findMany({
      where: whereClause,
      orderBy: {
        approved_at: 'desc'
      },
      skip: offset,
      take: limit,
      select: {
        id: true,
        organization_name: true,
        country: true,
        endorser_category: true,
        endorsement_type: true,
        endorsement_tier: true,
        endorsement_headline: true,
        endorsement_statement: true,
        logo_file: true,
        video_link: true,
        website: true,
        approved_at: true,
        featured: true
      }
    });

    // Get unique categories and countries for filters
    const categoriesData = await prisma.endorsement.findMany({
      where: {
        status: 'approved'
      },
      select: {
        endorser_category: true
      },
      distinct: ['endorser_category']
    });
    
    const countriesData = await prisma.endorsement.findMany({
      where: {
        status: 'approved'
      },
      select: {
        country: true
      },
      distinct: ['country'],
      orderBy: {
        country: 'asc'
      }
    });

    // Explicitly define the type for the `c` parameter
    const categories = categoriesData.map((c: { endorser_category: string | null }) => c.endorser_category);
    const countries = countriesData.map((c: { country: string | null }) => c.country);

    return NextResponse.json({
      success: true,
      endorsements,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
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
