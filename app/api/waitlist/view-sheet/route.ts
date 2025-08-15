import { NextRequest, NextResponse } from 'next/server';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;


export async function GET(request: NextRequest) {
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

    // Get all data from the sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Waitlist!A:R',
    });

    const rows = response.data.values || [];
    
    // Format the data for easy viewing
    const formattedData = rows.map((row: any[], index: number) => ({
      rowNumber: index + 1,
      timestamp: row[0] || '',
      name: row[1] || '',
      email: row[2] || '',
      phone: row[3] || '',
      country: row[4] || '',
      voteNominate: row[5] || '',
      becomeAmbassador: row[6] || '',
      joinWebinarExpo: row[7] || '',
      sponsorCSR: row[8] || '',
      applyJudge: row[9] || '',
      joinLocalChapter: row[10] || '',
      joinNESATeam: row[11] || '',
      applyNRCVolunteer: row[12] || '',
      buyMerchandise: row[13] || '',
      getGalaTicket: row[14] || '',
      donate: row[15] || '',
      totalCategories: row[16] || '',
      categoriesList: row[17] || ''
    }));

    return NextResponse.json({
      success: true,
      data: {
        totalRows: rows.length,
        sheetUrl: `https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}/edit`,
        rawData: rows,
        formattedData: formattedData
      }
    });

  } catch (error: any) {
    console.error('View sheet error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      errorCode: error.code
    }, { status: 500 });
  }
}