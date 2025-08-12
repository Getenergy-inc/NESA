import { NextRequest, NextResponse } from 'next/server';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function GET(request: NextRequest) {
  try {
    // Basic health check - don't connect to DB during build
    const isProduction = process.env.NODE_ENV === 'production';
    const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                       process.env.NODE_ENV === undefined ||
                       typeof window === 'undefined' && !process.env.MONGODB_URI;
    
    // During build time, just return a basic health status
    if (isBuildTime) {
      return NextResponse.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'build',
        phase: 'build',
        services: {
          api: 'operational'
        }
      });
    }
    
    // Runtime health check with database connection
    let databaseStatus = 'unknown';
    try {
      // Only attempt database connection at runtime and if MONGODB_URI exists
      if (process.env.MONGODB_URI) {
        const connectDB = (await import('@/lib/configs/database')).default;
        await connectDB();
        databaseStatus = 'connected';
      } else {
        databaseStatus = 'not_configured';
      }
    } catch (dbError) {
      console.warn('Database connection failed during health check:', dbError);
      databaseStatus = 'disconnected';
    }
    
    return NextResponse.json({
      status: databaseStatus === 'connected' ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      services: {
        database: databaseStatus,
        api: 'operational'
      }
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      services: {
        database: 'unknown',
        api: 'operational'
      },
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 503 });
  }
}