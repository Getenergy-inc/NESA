import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/configs/database';
import NRCVolunteer from '@/lib/models/NRCVolunteer';
import NRCNominee from '@/lib/models/NRCNominee';
import AGCTransaction from '@/lib/models/AGCTransaction';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { period } = body;

    if (!period || !period.start || !period.end) {
      return NextResponse.json(
        { success: false, message: 'Period with start and end dates is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const startDate = new Date(period.start);
    const endDate = new Date(period.end);

    // Volunteer report
    const volunteers = await NRCVolunteer.find({
      createdAt: { $gte: startDate, $lte: endDate }
    }).select('fullName email country nomineesUploaded nomineesVerified agcEarned level');

    const volunteerStats = {
      total: volunteers.length,
      byCountry: await NRCVolunteer.aggregate([
        { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
        { $group: { _id: '$country', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      byLevel: await NRCVolunteer.aggregate([
        { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
        { $group: { _id: '$level', count: { $sum: 1 } } }
      ])
    };

    // Nominee report
    const nominees = await NRCNominee.find({
      dateCreated: { $gte: startDate, $lte: endDate }
    }).select('fullName country awardCategory subcategory status volunteerId');

    const nomineeStats = {
      total: nominees.length,
      byStatus: await NRCNominee.aggregate([
        { $match: { dateCreated: { $gte: startDate, $lte: endDate } } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      byCategory: await NRCNominee.aggregate([
        { $match: { dateCreated: { $gte: startDate, $lte: endDate } } },
        { $group: { _id: '$awardCategory', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      byCountry: await NRCNominee.aggregate([
        { $match: { dateCreated: { $gte: startDate, $lte: endDate } } },
        { $group: { _id: '$country', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
    };

    // AGC report
    const transactions = await AGCTransaction.find({
      timestamp: { $gte: startDate, $lte: endDate },
      status: 'COMPLETED'
    });

    const agcStats = {
      totalDistributed: transactions
        .filter(t => t.type === 'EARN' || t.type === 'BONUS')
        .reduce((sum, t) => sum + t.amount, 0),
      totalWithdrawn: transactions
        .filter(t => t.type === 'WITHDRAW')
        .reduce((sum, t) => sum + t.amount, 0),
      byType: await AGCTransaction.aggregate([
        { 
          $match: { 
            timestamp: { $gte: startDate, $lte: endDate },
            status: 'COMPLETED'
          } 
        },
        {
          $group: {
            _id: '$type',
            totalAmount: { $sum: '$amount' },
            count: { $sum: 1 }
          }
        }
      ])
    };

    // Top performers
    const topPerformers = await NRCVolunteer.find({
      createdAt: { $lte: endDate }
    })
      .sort({ nomineesVerified: -1 })
      .limit(20)
      .select('fullName country nomineesVerified agcEarned level');

    // Generate report
    const report = {
      period: {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      },
      generatedAt: new Date().toISOString(),
      summary: {
        volunteers: volunteerStats.total,
        nominees: nomineeStats.total,
        agcDistributed: agcStats.totalDistributed,
        agcWithdrawn: agcStats.totalWithdrawn
      },
      volunteers: {
        stats: volunteerStats,
        list: volunteers
      },
      nominees: {
        stats: nomineeStats,
        list: nominees
      },
      agc: agcStats,
      topPerformers
    };

    return NextResponse.json({
      success: true,
      message: 'Report generated successfully',
      data: report
    });

  } catch (error: any) {
    console.error('Report generation error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to generate report' },
      { status: 500 }
    );
  }
}
