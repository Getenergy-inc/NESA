import { NextRequest, NextResponse } from 'next/server';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;


// Mock database - In production, this would be replaced with actual database
// This should be shared with the submit route in a real implementation
let endorsements: any[] = [
  // Sample approved endorsements for showcase
  {
    id: 'sample1',
    organization_name: 'UNESCO Africa',
    contact_person_name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@unesco.org',
    country: 'Kenya',
    endorser_category: 'multilateral_organization',
    endorsement_type: 'paid',
    endorsement_tier: 'platinum',
    endorsement_headline: 'Supporting Educational Excellence Across Africa',
    endorsement_statement: 'UNESCO Africa proudly endorses NESA-Africa 2025 as a transformative initiative that aligns perfectly with our mission to promote quality education for all. This continental movement represents the future of educational innovation and equity across Africa.',
    logo_file: '/images/endorsers/unesco-logo.png',
    status: 'approved',
    verified: true,
    created_at: '2024-01-15T10:00:00Z',
    approved_at: '2024-01-16T14:30:00Z',
    featured: true
  },
  {
    id: 'sample2',
    organization_name: 'African Development Bank',
    contact_person_name: 'Prof. Michael Adebayo',
    email: 'michael.adebayo@afdb.org',
    country: 'Côte d\'Ivoire',
    endorser_category: 'development_bank',
    endorsement_type: 'paid',
    endorsement_tier: 'gold',
    endorsement_headline: 'Investing in Africa\'s Educational Future',
    endorsement_statement: 'The African Development Bank recognizes NESA-Africa 2025 as a critical platform for celebrating and advancing educational excellence across our continent. We are proud to support this initiative that champions innovation, equity, and sustainable development in education.',
    logo_file: '/images/endorsers/afdb-logo.png',
    status: 'approved',
    verified: true,
    created_at: '2024-01-20T09:15:00Z',
    approved_at: '2024-01-21T11:45:00Z',
    featured: true
  },
  {
    id: 'sample3',
    organization_name: 'Mastercard Foundation',
    contact_person_name: 'Dr. Amina Hassan',
    email: 'amina.hassan@mastercardfdn.org',
    country: 'Canada',
    endorser_category: 'development_foundation',
    endorsement_type: 'paid',
    endorsement_tier: 'silver',
    endorsement_headline: 'Empowering Young Africans Through Education',
    endorsement_statement: 'Mastercard Foundation endorses NESA-Africa 2025 as an essential initiative that recognizes and celebrates the educators and innovators who are transforming lives across Africa. This aligns with our commitment to advancing education and economic inclusion for young people.',
    logo_file: '/images/endorsers/mastercard-foundation-logo.png',
    status: 'approved',
    verified: true,
    created_at: '2024-01-25T16:20:00Z',
    approved_at: '2024-01-26T10:15:00Z',
    featured: false
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const country = searchParams.get('country');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');

    // Filter approved endorsements only
    let filteredEndorsements = endorsements.filter(endorsement => 
      endorsement.status === 'approved' && endorsement.verified === true
    );

    // Apply filters
    if (category && category !== 'all') {
      filteredEndorsements = filteredEndorsements.filter(endorsement => 
        endorsement.endorser_category === category
      );
    }

    if (country && country !== 'all') {
      filteredEndorsements = filteredEndorsements.filter(endorsement => 
        endorsement.country.toLowerCase() === country.toLowerCase()
      );
    }

    if (featured === 'true') {
      filteredEndorsements = filteredEndorsements.filter(endorsement => 
        endorsement.featured === true
      );
    }

    // Sort by approval date (most recent first)
    filteredEndorsements.sort((a, b) => 
      new Date(b.approved_at).getTime() - new Date(a.approved_at).getTime()
    );

    // Apply pagination
    const totalCount = filteredEndorsements.length;
    const limitNum = limit ? parseInt(limit) : 20;
    const offsetNum = offset ? parseInt(offset) : 0;
    
    const paginatedEndorsements = filteredEndorsements.slice(offsetNum, offsetNum + limitNum);

    // Return public data only
    const publicEndorsements = paginatedEndorsements.map(endorsement => ({
      id: endorsement.id,
      organization_name: endorsement.organization_name,
      country: endorsement.country,
      endorser_category: endorsement.endorser_category,
      endorsement_type: endorsement.endorsement_type,
      endorsement_tier: endorsement.endorsement_tier,
      endorsement_headline: endorsement.endorsement_headline,
      endorsement_statement: endorsement.endorsement_statement,
      logo_file: endorsement.logo_file,
      video_link: endorsement.video_link,
      website: endorsement.website,
      approved_at: endorsement.approved_at,
      featured: endorsement.featured
    }));

    // Get unique categories and countries for filters
    const categories = [...new Set(endorsements
      .filter(e => e.status === 'approved')
      .map(e => e.endorser_category)
    )];
    
    const countries = [...new Set(endorsements
      .filter(e => e.status === 'approved')
      .map(e => e.country)
    )].sort();

    return NextResponse.json({
      success: true,
      endorsements: publicEndorsements,
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
