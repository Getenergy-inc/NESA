import { NextResponse } from 'next/server';
import connectDB from '@/lib/models/connectDB';
import Sponsor, { ISponsor } from '@/lib/models/Sponsor';

export async function GET() {
  try {
    await connectDB();

    const sponsors: ISponsor[] = await Sponsor.find({ status: 'approved' }).sort({ sponsorship_plan: 1, company_name: 1 });

    const formattedSponsors = sponsors.map(sponsor => ({
      _id: sponsor._id,
      company_name: sponsor.company_name,
      company_logo: sponsor.company_logo,
      company_website: sponsor.company_website,
      industry: sponsor.industry,
      sponsorship_plan: (sponsor as any).sponsorship_plan,
      status: sponsor.status,
    }));

    return NextResponse.json({
      success: true,
      sponsors: formattedSponsors,
    });

  } catch (error) {
    console.error('Error fetching sponsors:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: 'Failed to fetch sponsors', details: errorMessage }, { status: 500 });
  }
}