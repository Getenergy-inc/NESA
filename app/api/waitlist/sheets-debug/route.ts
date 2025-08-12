import { NextRequest, NextResponse } from 'next/server';
import googleSheetsService from '@/lib/services/googleSheetsService';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;


export async function GET(request: NextRequest) {
  try {
    const debugInfo: any = {
      timestamp: new Date().toISOString(),
      environment: {
        googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL ? 'configured' : 'missing',
        googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY ? 'configured' : 'missing',
        googleSheetId: process.env.GOOGLE_SHEET_ID || 'missing'
      },
      tests: {}
    };

    // Test 1: Check if service is configured
    debugInfo.tests.serviceConfigured = !!(
      process.env.GOOGLE_CLIENT_EMAIL && 
      process.env.GOOGLE_PRIVATE_KEY && 
      process.env.GOOGLE_SHEET_ID
    );

    if (!debugInfo.tests.serviceConfigured) {
      return NextResponse.json({
        success: false,
        message: 'Google Sheets service not configured',
        debug: debugInfo
      });
    }

    // Test 2: Try to initialize sheet
    try {
      await googleSheetsService.initializeSheet();
      debugInfo.tests.sheetInitialized = true;
    } catch (error: any) {
      debugInfo.tests.sheetInitialized = false;
      debugInfo.tests.initError = error.message;
    }

    // Test 3: Try to get raw sheet data
    try {
      const { google } = require('googleapis');
      
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({ version: 'v4', auth });

      // Get spreadsheet info
      const spreadsheetInfo = await sheets.spreadsheets.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
      });

      debugInfo.tests.spreadsheetInfo = {
        title: spreadsheetInfo.data.properties?.title,
        sheets: spreadsheetInfo.data.sheets?.map((sheet: any) => ({
          title: sheet.properties.title,
          sheetId: sheet.properties.sheetId,
          gridProperties: sheet.properties.gridProperties
        }))
      };

      // Try to get all data from Waitlist sheet
      const allDataResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Waitlist!A:O',
      });

      debugInfo.tests.rawData = {
        range: allDataResponse.data.range,
        majorDimension: allDataResponse.data.majorDimension,
        values: allDataResponse.data.values || [],
        totalRows: (allDataResponse.data.values || []).length
      };

      // Try to get just headers
      const headersResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Waitlist!A1:O1',
      });

      debugInfo.tests.headers = headersResponse.data.values?.[0] || [];

    } catch (error: any) {
      debugInfo.tests.rawDataError = error.message;
      debugInfo.tests.errorCode = error.code;
    }

    // Test 4: Try to add a test entry
    try {
      const testEntry = {
        name: 'Test User',
        email: 'test@example.com',
        categories: ['vote_nominate'],
        timestamp: new Date()
      };

      const rowId = await googleSheetsService.addWaitlistEntry(testEntry);
      debugInfo.tests.testEntryAdded = {
        success: true,
        rowId: rowId
      };
    } catch (error: any) {
      debugInfo.tests.testEntryAdded = {
        success: false,
        error: error.message
      };
    }

    return NextResponse.json({
      success: true,
      debug: debugInfo
    });

  } catch (error: any) {
    console.error('Sheets debug error:', error);
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