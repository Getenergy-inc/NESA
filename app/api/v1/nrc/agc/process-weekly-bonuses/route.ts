import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/configs/database';
import NRCVolunteer from '@/lib/models/NRCVolunteer';
import AGCTransaction from '@/lib/models/AGCTransaction';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Get current date
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Find top 3 volunteers by weekly uploads
    const topVolunteers = await NRCVolunteer.find({
      status: 'ACTIVE',
      weeklyUploads: { $gt: 0 }
    })
      .sort({ weeklyUploads: -1 })
      .limit(3)
      .select('userId fullName weeklyUploads agcEarned');

    if (topVolunteers.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No volunteers eligible for weekly bonus',
        data: { awarded: 0 }
      });
    }

    const bonuses = [
      { rank: 1, amount: 3, description: 'Weekly Best Researcher - 1st Place' },
      { rank: 2, amount: 2, description: 'Weekly Best Researcher - 2nd Place' },
      { rank: 3, amount: 1, description: 'Weekly Best Researcher - 3rd Place' }
    ];

    const results = [];

    for (let i = 0; i < topVolunteers.length; i++) {
      const volunteer = topVolunteers[i];
      const bonus = bonuses[i];

      // Create bonus transaction
      const transaction = new AGCTransaction({
        volunteerId: volunteer.userId,
        type: 'BONUS',
        amount: bonus.amount,
        description: `${bonus.description} - ${volunteer.weeklyUploads} uploads`,
        isWithdrawable: true,
        status: 'COMPLETED',
        timestamp: now
      });

      await transaction.save();

      // Update volunteer balance
      volunteer.agcEarned += bonus.amount;
      volunteer.agcWithdrawable += bonus.amount;
      
      // Reset weekly uploads
      volunteer.weeklyUploads = 0;
      volunteer.lastWeeklyReset = now;
      
      await volunteer.save();

      results.push({
        rank: bonus.rank,
        volunteerId: volunteer.userId,
        fullName: volunteer.fullName,
        weeklyUploads: volunteer.weeklyUploads,
        bonusAwarded: bonus.amount
      });
    }

    // Reset weekly uploads for all other volunteers
    await NRCVolunteer.updateMany(
      { 
        status: 'ACTIVE',
        userId: { $nin: topVolunteers.map(v => v.userId) }
      },
      { 
        $set: { 
          weeklyUploads: 0,
          lastWeeklyReset: now
        } 
      }
    );

    return NextResponse.json({
      success: true,
      message: `Weekly bonuses processed for ${results.length} volunteers`,
      data: {
        processedAt: now.toISOString(),
        awarded: results.length,
        totalAGC: results.reduce((sum, r) => sum + r.bonusAwarded, 0),
        winners: results
      }
    });

  } catch (error: any) {
    console.error('Process weekly bonuses error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to process weekly bonuses' },
      { status: 500 }
    );
  }
}
