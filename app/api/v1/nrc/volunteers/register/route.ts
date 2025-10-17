import { NextRequest, NextResponse } from 'next/server';
import connectNRCDB from '@/lib/configs/nrcDatabase';
import NRCVolunteer from '@/lib/models/NRCVolunteer';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, region, country, coordinator, displayName, badge, fullName, email } = body;

    // Validate required fields
    if (!userId || !region || !country) {
      return NextResponse.json(
        { success: false, message: 'userId, region, and country are required' },
        { status: 400 }
      );
    }

    // Connect to NRC database
    const conn = await connectNRCDB();
    
    // Get model from the NRC connection
    const VolunteerModel = conn.models.NRCVolunteer || conn.model('NRCVolunteer', NRCVolunteer.schema);

    // Check if volunteer already exists
    const existingVolunteer = await VolunteerModel.findOne({ userId });

    if (existingVolunteer) {
      // Return existing volunteer data instead of error
      return NextResponse.json({
        success: true,
        message: 'Volunteer already registered',
        data: {
          id: existingVolunteer._id,
          userId: existingVolunteer.userId,
          fullName: existingVolunteer.fullName,
          email: existingVolunteer.email,
          country: existingVolunteer.country,
          region: existingVolunteer.region,
          status: existingVolunteer.status,
          role: existingVolunteer.role,
          nomineesUploaded: existingVolunteer.nomineesUploaded,
          agcEarned: existingVolunteer.agcEarned,
          isExisting: true
        }
      });
    }

    // Create new volunteer
    const volunteer = new VolunteerModel({
      userId,
      fullName: fullName || displayName || 'NRC Volunteer',
      email: email || `volunteer-${userId}@nesa.africa`,
      country,
      region,
      coordinator,
      displayName,
      badge,
      status: 'ACTIVE',
      role: 'volunteer',
      approvalDate: new Date(),
      lastActive: new Date()
    });

    await volunteer.save();

    return NextResponse.json({
      success: true,
      message: 'Volunteer registered successfully',
      data: {
        id: volunteer._id,
        userId: volunteer.userId,
        fullName: volunteer.fullName,
        email: volunteer.email,
        country: volunteer.country,
        region: volunteer.region,
        status: volunteer.status,
        role: volunteer.role,
        nomineesUploaded: volunteer.nomineesUploaded,
        agcEarned: volunteer.agcEarned
      }
    });

  } catch (error: any) {
    console.error('Volunteer registration error:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: 'Volunteer already registered' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: error.message || 'Failed to register volunteer' },
      { status: 500 }
    );
  }
}
