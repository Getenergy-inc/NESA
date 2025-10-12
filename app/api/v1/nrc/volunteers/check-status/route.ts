import { NextRequest, NextResponse } from 'next/server';
import connectNRCDB from '@/lib/configs/nrcDatabase';
import NRCVolunteer from '@/lib/models/NRCVolunteer';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get userId from query params or headers (no auth required)
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Connect to NRC database
    const conn = await connectNRCDB();
    
    // Get model from the NRC connection
    const VolunteerModel = conn.models.NRCVolunteer || conn.model('NRCVolunteer', NRCVolunteer.schema);

    // Find volunteer by userId
    const volunteer = await VolunteerModel.findOne({ userId });

    if (!volunteer) {
      return NextResponse.json({
        success: false,
        message: 'Volunteer not found',
        data: {
          isVolunteer: false,
          profile: null
        }
      }, { status: 404 });
    }

    // Update last active
    volunteer.lastActive = new Date();
    await volunteer.save();

    return NextResponse.json({
      success: true,
      message: 'Volunteer status retrieved',
      data: {
        isVolunteer: true,
        profile: {
          id: volunteer._id,
          userId: volunteer.userId,
          fullName: volunteer.fullName,
          email: volunteer.email,
          phone: volunteer.phone,
          country: volunteer.country,
          region: volunteer.region,
          status: volunteer.status,
          role: volunteer.role,
          displayName: volunteer.displayName,
          badge: volunteer.badge,
          nomineesUploaded: volunteer.nomineesUploaded,
          nomineesVerified: volunteer.nomineesVerified,
          nomineesPending: volunteer.nomineesPending,
          nomineesRejected: volunteer.nomineesRejected,
          targetNominees: volunteer.targetNominees,
          completionRate: volunteer.completionRate,
          agcEarned: volunteer.agcEarned,
          agcWithdrawable: volunteer.agcWithdrawable,
          rank: volunteer.rank,
          level: volunteer.level,
          approvalDate: volunteer.approvalDate,
          lastActive: volunteer.lastActive
        }
      }
    });

  } catch (error: any) {
    console.error('Check status error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to check volunteer status' },
      { status: 500 }
    );
  }
}
