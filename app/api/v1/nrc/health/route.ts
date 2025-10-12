import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/configs/database';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    await connectDB();

    return NextResponse.json({
      success: true,
      message: 'NRC API is healthy',
      data: {
        status: 'operational',
        timestamp: new Date().toISOString(),
        database: 'connected',
        version: '1.0.0'
      }
    });

  } catch (error: any) {
    console.error('Health check error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'NRC API health check failed',
        data: {
          status: 'degraded',
          timestamp: new Date().toISOString(),
          database: 'disconnected',
          error: error.message
        }
      },
      { status: 503 }
    );
  }
}
