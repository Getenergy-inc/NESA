import { NextRequest, NextResponse } from 'next/server';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;


export async function POST(request: NextRequest) {
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

    // First, let's clear any existing data and start fresh
    try {
      await sheets.spreadsheets.values.clear({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Waitlist!A:Z',
      });
    } catch (error) {
      console.log('No existing data to clear');
    }

    // Add headers
    const headers = [
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Country',
      'Vote or Nominate',
      'Become Ambassador',
      'Join Webinar/Expo',
      'Sponsor or CSR Partner',
      'Apply as a Judge',
      'Join Local Chapter',
      'Join NESA Team',
      'Apply as NRC Volunteer',
      'Buy Merchandise',
      'Get Gala Ticket',
      'Donate',
      'Total Categories',
      'Categories List'
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Waitlist!A1:R1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [headers],
      },
    });

    // Add a test row
    const testRow = [
      new Date().toISOString(),
      'Test User',
      'test@example.com',
      '+1234567890',
      'US',
      'Yes',
      'No',
      'No',
      'No',
      'No',
      'No',
      'No',
      'No',
      'No',
      'No',
      'No',
      '1',
      'Vote or Nominate'
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Waitlist!A:R',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [testRow],
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Sheet fixed and test data added',
      sheetUrl: `https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}/edit`
    });

  } catch (error: any) {
    console.error('Fix sheet error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      errorCode: error.code
    }, { status: 500 });
  }
}