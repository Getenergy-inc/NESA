import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/configs/database';
import NRCVolunteer from '@/lib/models/NRCVolunteer';
import NRCNominee from '@/lib/models/NRCNominee';
import AGCTransaction from '@/lib/models/AGCTransaction';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const volunteerId = params.id;

    if (!volunteerId) {
      return NextResponse.json(
        { success: false, message: 'Volunteer ID is required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Get volunteer data
    const volunteer = await NRCVolunteer.findOne({ userId: volunteerId });

    if (!volunteer) {
      return NextResponse.json(
        { success: false, message: 'Volunteer not found' },
        { status: 404 }
      );
    }

    // Get nominee stats
    const nomineeStats = await NRCNominee.getStatsByVolunteer(volunteerId);

    // Get recent nominees
    const recentNominees = await NRCNominee.find({ volunteerId })
      .sort({ dateCreated: -1 })
      .limit(5)
      .select('fullName awardCategory status dateCreated');

    // Get AGC balance
    const agcBalance = await AGCTransaction.getVolunteerBalance(volunteerId);

    // Get recent transactions
    const recentTransactions = await AGCTransaction.find({ 
      volunteerId,
      status: 'COMPLETED'
    })
      .sort({ timestamp: -1 })
      .limit(10)
      .select('type amount description timestamp isWithdrawable');

    // Calculate weekly uploads (reset if needed)
    const now = new Date();
    const lastReset = new Date(volunteer.lastWeeklyReset);
    const daysSinceReset = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceReset >= 7) {
      volunteer.weeklyUploads = 0;
      volunteer.lastWeeklyReset = now;
      await volunteer.save();
    }

    // Get leaderboard position
    const leaderboard = await NRCVolunteer.find({ status: 'ACTIVE' })
      .sort({ nomineesUploaded: -1, agcEarned: -1 })
      .select('userId nomineesUploaded');
    
    const rank = leaderboard.findIndex(v => v.userId === volunteerId) + 1;

    // Calculate next level progress
    const levelThresholds = {
      'Bronze': 0,
      'Silver': 50,
      'Gold': 100,
      'Platinum': 150,
      'Diamond': 200
    };
    
    const currentThreshold = levelThresholds[volunteer.level as keyof typeof levelThresholds] || 0;
    const nextLevel = Object.entries(levelThresholds).find(([_, threshold]) => threshold > currentThreshold);
    const nextThreshold = nextLevel ? nextLevel[1] : 200;
    const nextLevelProgress = Math.min(100, Math.round((volunteer.nomineesVerified / nextThreshold) * 100));

    return NextResponse.json({
      success: true,
      data: {
        totalUploads: nomineeStats.total,
        verifiedUploads: nomineeStats.verified,
        pendingUploads: nomineeStats.review,
        rejectedUploads: nomineeStats.rejected,
        agcEarned: agcBalance.total,
        agcWithdrawable: agcBalance.withdrawable,
        currentWeekUploads: volunteer.weeklyUploads,
        rank: rank || 0,
        level: volunteer.level,
        nextLevelProgress,
        recentActivities: recentNominees.map((nominee: any) => ({
          id: nominee._id,
          type: 'nominee_upload',
          title: `Uploaded nominee: ${nominee.fullName}`,
          category: nominee.awardCategory,
          status: nominee.status,
          timestamp: nominee.dateCreated
        })),
        recentTransactions: recentTransactions.map((tx: any) => ({
          id: tx._id,
          type: tx.type,
          amount: tx.amount,
          description: tx.description,
          timestamp: tx.timestamp,
          isWithdrawable: tx.isWithdrawable
        }))
      }
    });

  } catch (error: any) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to load dashboard data' },
      { status: 500 }
    );
  }
}
