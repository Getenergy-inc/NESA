import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/configs/database';
import Waitlist from '@/lib/models/Waitlist';
import googleSheetsService from '@/lib/services/googleSheetsService';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;


export async function GET(request: NextRequest) {
  try {
    const debugInfo: any = {
      timestamp: new Date().toISOString(),
      database: {
        status: 'unknown',
        connection: false,
        totalEntries: 0,
        sampleEntries: [],
        error: null
      },
      googleSheets: {
        configured: false,
        accessible: false,
        error: null,
        stats: null
      },
      environment: {
        mongoUri: process.env.MONGODB_URI ? 'configured' : 'missing',
        googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL ? 'configured' : 'missing',
        googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY ? 'configured' : 'missing',
        googleSheetId: process.env.GOOGLE_SHEET_ID ? 'configured' : 'missing'
      }
    };

    // Test Database Connection
    try {
      await connectDB();
      debugInfo.database.connection = true;
      debugInfo.database.status = 'connected';

      // Get total count
      const totalCount = await Waitlist.countDocuments();
      debugInfo.database.totalEntries = totalCount;

      // Get sample entries
      const sampleEntries = await Waitlist.find({})
        .sort({ createdAt: -1 })
        .limit(3)
        .select('name email phone country categories createdAt syncedToSheets');
      
      debugInfo.database.sampleEntries = sampleEntries.map(entry => ({
        id: entry._id,
        name: entry.name,
        email: entry.email,
        phone: entry.phone || 'Not set',
        country: entry.country || 'Not set',
        categoriesCount: entry.categories.length,
        createdAt: entry.createdAt,
        syncedToSheets: entry.syncedToSheets
      }));

    } catch (dbError: any) {
      debugInfo.database.status = 'error';
      debugInfo.database.error = dbError.message;
      console.error('Database debug error:', dbError);
    }

    // Test Google Sheets
    try {
      debugInfo.googleSheets.configured = !!(
        process.env.GOOGLE_CLIENT_EMAIL && 
        process.env.GOOGLE_PRIVATE_KEY && 
        process.env.GOOGLE_SHEET_ID
      );

      if (debugInfo.googleSheets.configured) {
        // Try to get stats from Google Sheets
        const sheetsStats = await googleSheetsService.getWaitlistStats();
        debugInfo.googleSheets.accessible = true;
        debugInfo.googleSheets.stats = sheetsStats;
      }
    } catch (sheetsError: any) {
      debugInfo.googleSheets.error = sheetsError.message;
      console.error('Google Sheets debug error:', sheetsError);
    }

    return NextResponse.json({
      success: true,
      debug: debugInfo
    });

  } catch (error: any) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      debug: {
        timestamp: new Date().toISOString(),
        generalError: error.message
      }
    }, { status: 500 });
  }
}