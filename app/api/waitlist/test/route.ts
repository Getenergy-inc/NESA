import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/configs/database';
import Waitlist from '@/lib/models/Waitlist';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Test data with new fields
    const testData = {
      name: 'Test User',
      email: `test-${Date.now()}@example.com`,
      phone: '+1234567890',
      country: 'US',
      categories: ['vote_nominate', 'become_ambassador']
    };

    console.log('Creating test entry with data:', testData);

    const testEntry = new Waitlist(testData);
    const savedEntry = await testEntry.save();

    console.log('Test entry saved:', savedEntry);

    return NextResponse.json({
      success: true,
      message: 'Test entry created successfully',
      data: {
        id: savedEntry._id,
        name: savedEntry.name,
        email: savedEntry.email,
        phone: savedEntry.phone,
        country: savedEntry.country,
        categories: savedEntry.categories,
        createdAt: savedEntry.createdAt
      }
    });

  } catch (error: any) {
    console.error('Test API Error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Test failed',
      error: error.message,
      details: error
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get the latest entry to verify schema
    const latestEntry = await Waitlist.findOne({})
      .sort({ createdAt: -1 })
      .select('name email phone country categories createdAt');

    if (!latestEntry) {
      return NextResponse.json({
        success: true,
        message: 'No entries found',
        data: null
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Latest entry retrieved',
      data: {
        id: latestEntry._id,
        name: latestEntry.name,
        email: latestEntry.email,
        phone: latestEntry.phone || 'Not set',
        country: latestEntry.country || 'Not set',
        categories: latestEntry.categories,
        createdAt: latestEntry.createdAt,
        hasNewFields: !!(latestEntry.phone && latestEntry.country)
      }
    });

  } catch (error: any) {
    console.error('Test GET API Error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Test failed',
      error: error.message
    }, { status: 500 });
  }
}