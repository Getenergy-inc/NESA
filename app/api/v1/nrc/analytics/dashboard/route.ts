import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/configs/database';
import NRCVolunteer from '@/lib/models/NRCVolunteer';
import NRCNominee from '@/lib/models/NRCNominee';
import AGCTransaction from '@/lib/models/AGCTransaction';
import NRCTask from '@/lib/models/NRCTask';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'all';
    const country = searchParams.get('country');
    const region = searchParams.get('region');

    await connectDB();

    // Build date filter
    let dateFilter: any = {};
    if (period !== 'all') {
      const now = new Date();
      const startDate = new Date();
      
      switch (period) {
        case 'week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          startDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      dateFilter = { createdAt: { $gte: startDate } };
    }

    // Build location filter
    const locationFilter: any = {};
    if (country) locationFilter.country = country;
    if (region) locationFilter.region = region;

    // Volunteer statistics
    const totalVolunteers = await NRCVolunteer.countDocuments({
      ...locationFilter,
      ...dateFilter
    });

    const activeVolunteers = await NRCVolunteer.countDocuments({
      ...locationFilter,
      status: 'ACTIVE',
      ...dateFilter
    });

    const volunteersByCountry = await NRCVolunteer.aggregate([
      { $match: { ...locationFilter, ...dateFilter } },
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Nominee statistics
    const totalNominees = await NRCNominee.countDocuments(dateFilter);
    
    const nomineesByStatus = await NRCNominee.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const nomineesByCategory = await NRCNominee.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$awardCategory', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const nomineesByCountry = await NRCNominee.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // AGC statistics
    const agcStats = await AGCTransaction.aggregate([
      { $match: { status: 'COMPLETED', ...dateFilter } },
      {
        $group: {
          _id: '$type',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    const totalAGCDistributed = agcStats
      .filter(s => s._id === 'EARN' || s._id === 'BONUS')
      .reduce((sum, s) => sum + s.totalAmount, 0);

    const totalAGCWithdrawn = agcStats
      .filter(s => s._id === 'WITHDRAW')
      .reduce((sum, s) => sum + s.totalAmount, 0);

    // Task statistics
    const taskStats = await NRCTask.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Top performers
    const topPerformers = await NRCVolunteer.find({
      ...locationFilter,
      status: 'ACTIVE'
    })
      .sort({ nomineesVerified: -1 })
      .limit(10)
      .select('fullName displayName country nomineesVerified agcEarned level');

    // Recent activity
    const recentNominees = await NRCNominee.find(dateFilter)
      .sort({ dateCreated: -1 })
      .limit(10)
      .select('fullName awardCategory status dateCreated volunteerId');

    // Growth metrics
    const growthMetrics = await calculateGrowthMetrics(period);

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalVolunteers,
          activeVolunteers,
          totalNominees,
          totalAGCDistributed,
          totalAGCWithdrawn,
          agcInCirculation: totalAGCDistributed - totalAGCWithdrawn
        },
        volunteers: {
          total: totalVolunteers,
          active: activeVolunteers,
          byCountry: volunteersByCountry
        },
        nominees: {
          total: totalNominees,
          byStatus: nomineesByStatus,
          byCategory: nomineesByCategory,
          byCountry: nomineesByCountry
        },
        agc: {
          distributed: totalAGCDistributed,
          withdrawn: totalAGCWithdrawn,
          inCirculation: totalAGCDistributed - totalAGCWithdrawn,
          byType: agcStats
        },
        tasks: {
          byStatus: taskStats
        },
        topPerformers,
        recentActivity: recentNominees,
        growth: growthMetrics
      }
    });

  } catch (error: any) {
    console.error('Analytics dashboard error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to load analytics' },
      { status: 500 }
    );
  }
}

async function calculateGrowthMetrics(period: string) {
  const now = new Date();
  const previousPeriodStart = new Date();
  const currentPeriodStart = new Date();

  switch (period) {
    case 'week':
      previousPeriodStart.setDate(now.getDate() - 14);
      currentPeriodStart.setDate(now.getDate() - 7);
      break;
    case 'month':
      previousPeriodStart.setMonth(now.getMonth() - 2);
      currentPeriodStart.setMonth(now.getMonth() - 1);
      break;
    default:
      return null;
  }

  const previousVolunteers = await NRCVolunteer.countDocuments({
    createdAt: { $gte: previousPeriodStart, $lt: currentPeriodStart }
  });

  const currentVolunteers = await NRCVolunteer.countDocuments({
    createdAt: { $gte: currentPeriodStart }
  });

  const previousNominees = await NRCNominee.countDocuments({
    dateCreated: { $gte: previousPeriodStart, $lt: currentPeriodStart }
  });

  const currentNominees = await NRCNominee.countDocuments({
    dateCreated: { $gte: currentPeriodStart }
  });

  return {
    volunteers: {
      previous: previousVolunteers,
      current: currentVolunteers,
      growth: previousVolunteers > 0 
        ? ((currentVolunteers - previousVolunteers) / previousVolunteers * 100).toFixed(2)
        : 0
    },
    nominees: {
      previous: previousNominees,
      current: currentNominees,
      growth: previousNominees > 0
        ? ((currentNominees - previousNominees) / previousNominees * 100).toFixed(2)
        : 0
    }
  };
}
