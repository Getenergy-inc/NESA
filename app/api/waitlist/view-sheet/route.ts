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
      range: 'Waitlist!A:O',
    });

    const rows = response.data.values || [];
    
    // Format the data for easy viewing
    const formattedData = rows.map((row: any[], index: number) => ({
      rowNumber: index + 1,
      timestamp: row[0] || '',
      name: row[1] || '',
      email: row[2] || '',
      voteNominate: row[3] || '',
      becomeAmbassador: row[4] || '',
      joinWebinarExpo: row[5] || '',
      sponsorCSR: row[6] || '',
      applyJudge: row[7] || '',
      joinLocalChapter: row[8] || '',
      joinNESATeam: row[9] || '',
      applyNRCVolunteer: row[10] || '',
      getGalaTicket: row[11] || '',
      donate: row[12] || '',
      totalCategories: row[13] || '',
      categoriesList: row[14] || ''
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