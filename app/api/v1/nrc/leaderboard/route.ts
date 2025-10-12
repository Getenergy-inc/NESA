import { NextRequest, NextResponse } from 'next/server';
import connectNRCDB from '@/lib/configs/nrcDatabase';
import NRCVolunteer from '@/lib/models/NRCVolunteer';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = (searchParams.get('type') || 'uploads') as 'uploads' | 'agc' | 'weekly' | 'monthly' | 'allTime';
    const limit = parseInt(searchParams.get('limit') || '20');
    const country = searchParams.get('country');

    const conn = await connectNRCDB();

    // Get model from the NRC connection
    const VolunteerModel = conn.models.NRCVolunteer || conn.model('NRCVolunteer', NRCVolunteer.schema);

    // Build query
    const query: any = { status: 'ACTIVE' };
    if (country) {
      query.country = country;
    }

    // Determine sort field
    let sortField = 'nomineesUploaded';
    if (type === 'agc') {
      sortField = 'agcBalance';
    } else if (type === 'weekly' || type === 'monthly' || type === 'allTime') {
      // Use the getLeaderboard method if it exists
      try {
        const leaderboard = await VolunteerModel.getLeaderboard(type, limit);
        return NextResponse.json({
          success: true,
          data: leaderboard.map((volunteer: any, index: number) => ({
            rank: index + 1,
            volunteerId: volunteer.userId,
            fullName: volunteer.fullName,
            displayName: volunteer.displayName || volunteer.fullName,
            country: volunteer.country,
            nomineesUploaded: volunteer.nomineesUploaded,
            agcEarned: volunteer.agcEarned || volunteer.agcBalance,
            level: volunteer.level,
            badge: volunteer.badge
          }))
        });
      } catch (methodError) {
        // Fall back to simple query if method doesn't exist
        console.log('getLeaderboard method not found, using simple query');
      }
    }

    // Simple leaderboard query
    const volunteers = await VolunteerModel.find(query)
      .sort({ [sortField]: -1 })
      .limit(limit)
      .select('userId fullName displayName country nomineesUploaded agcBalance agcEarned level badge')
      .lean();

    return NextResponse.json({
      success: true,
      data: volunteers.map((volunteer: any, index: number) => ({
        rank: index + 1,
        volunteerId: volunteer.userId,
        fullName: volunteer.fullName,
        displayName: volunteer.displayName || volunteer.fullName,
        country: volunteer.country,
        nomineesUploaded: volunteer.nomineesUploaded || 0,
        agcEarned: volunteer.agcEarned || volunteer.agcBalance || 0,
        level: volunteer.level || 'Bronze',
        badge: volunteer.badge || null
      }))
    });

  } catch (error: any) {
    console.error('Leaderboard error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to get leaderboard' },
      { status: 500 }
    );
  }
}
