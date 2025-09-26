import { google } from 'googleapis';
import { ISponsor } from '../models/Sponsor';
import { JWT } from 'google-auth-library';

// Sheet configuration
const SHEET_ID = process.env.SPONSOR_SHEET_ID || process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = 'Sponsors';

// Column headers for the sponsors sheet
const HEADERS = [
  'ID',
  'Company Name',
  'Contact Person',
  'Email',
  'Phone',
  'Business Reg No',
  'Sponsorship Type',
  'Proposed Amount',
  'Selected Plan',
  'Plan Price',
  'Status',
  'Payment Status',
  'Payment Reference',
  'Payment Method',
  'Payment Amount',
  'Payment Date',
  'Submitted Date',
  'Notes'
];

// Initialize Google Sheets API client
async function getAuthClient(): Promise<JWT> {
  try {
    const credentials = {
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    };

    const client = new JWT(credentials);
    await client.authorize();
    return client;
  } catch (error) {
    console.error('Error initializing Google Sheets auth client:', error);
    throw new Error('Failed to initialize Google Sheets client');
  }
}

// Initialize the sheet if it doesn't exist
async function initializeSheet(): Promise<void> {
  try {
    const authClient = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    // Check if the sheet exists
    const response = await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
    });

    const sheetExists = response.data.sheets?.some(
      (sheet) => sheet.properties?.title === SHEET_NAME
    );

    if (!sheetExists) {
      // Create the sheet
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: SHEET_NAME,
                },
              },
            },
          ],
        },
      });

      // Add headers
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!A1:R1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [HEADERS],
        },
      });

      // Format headers (bold, freeze)
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SHEET_ID,
        requestBody: {
          requests: [
            {
              repeatCell: {
                range: {
                  sheetId: response.data.sheets?.length || 0,
                  startRowIndex: 0,
                  endRowIndex: 1,
                },
                cell: {
                  userEnteredFormat: {
                    textFormat: {
                      bold: true,
                    },
                    backgroundColor: {
                      red: 0.9,
                      green: 0.9,
                      blue: 0.9,
                    },
                  },
                },
                fields: 'userEnteredFormat(textFormat,backgroundColor)',
              },
            },
            {
              updateSheetProperties: {
                properties: {
                  sheetId: response.data.sheets?.length || 0,
                  gridProperties: {
                    frozenRowCount: 1,
                  },
                },
                fields: 'gridProperties.frozenRowCount',
              },
            },
          ],
        },
      });
    }
  } catch (error) {
    console.error('Error initializing sponsor sheet:', error);
    throw new Error('Failed to initialize sponsor sheet');
  }
}

// Add a sponsor to the Google Sheet
async function addSponsorToSheets(sponsor: ISponsor): Promise<number | null> {
  try {
    await initializeSheet();
    
    const authClient = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    // Get the next available row
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:A`,
    });

    const rowCount = response.data.values?.length || 1;
    const nextRow = rowCount + 1;

    // Format the sponsor data for the sheet
    const rowData = [
      sponsor._id.toString(),
      sponsor.company_name,
      sponsor.name,
      sponsor.email,
      sponsor.phone,
      sponsor.Business_reg_no,
      sponsor.sponsorshipType || '',
      sponsor.proposedAmount?.toString() || '',
      sponsor.selectedPlan?.name || '',
      sponsor.selectedPlan?.price?.toString() || '',
      sponsor.status,
      sponsor.payment_status,
      sponsor.payment_reference || '',
      sponsor.payment_method || '',
      sponsor.payment_amount?.toString() || '',
      sponsor.payment_date || '',
      sponsor.created_at,
      sponsor.additionalNotes || ''
    ];

    // Add the data to the sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A${nextRow}:R${nextRow}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData],
      },
    });

    return nextRow;
  } catch (error) {
    console.error('Error adding sponsor to Google Sheets:', error);
    return null;
  }
}

// Update a sponsor in the Google Sheet
async function updateSponsorInSheets(rowId: number, sponsor: ISponsor): Promise<boolean> {
  try {
    const authClient = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    // Format the sponsor data for the sheet
    const rowData = [
      sponsor._id.toString(),
      sponsor.company_name,
      sponsor.name,
      sponsor.email,
      sponsor.phone,
      sponsor.Business_reg_no,
      sponsor.sponsorshipType || '',
      sponsor.proposedAmount?.toString() || '',
      sponsor.selectedPlan?.name || '',
      sponsor.selectedPlan?.price?.toString() || '',
      sponsor.status,
      sponsor.payment_status,
      sponsor.payment_reference || '',
      sponsor.payment_method || '',
      sponsor.payment_amount?.toString() || '',
      sponsor.payment_date || '',
      sponsor.created_at,
      sponsor.additionalNotes || ''
    ];

    // Update the data in the sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A${rowId}:R${rowId}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData],
      },
    });

    return true;
  } catch (error) {
    console.error('Error updating sponsor in Google Sheets:', error);
    return false;
  }
}

// Get sponsor statistics from the sheet
async function getSponsorStats(): Promise<{
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}> {
  try {
    const authClient = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    // Get all status values
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!K2:K`,
    });

    const statuses = response.data.values || [];
    
    // Count statuses
    let pending = 0;
    let approved = 0;
    let rejected = 0;

    statuses.forEach((row) => {
      const status = row[0];
      if (status === 'pending') pending++;
      else if (status === 'approved') approved++;
      else if (status === 'rejected') rejected++;
    });

    return {
      total: statuses.length,
      pending,
      approved,
      rejected,
    };
  } catch (error) {
    console.error('Error getting sponsor stats from Google Sheets:', error);
    return {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
    };
  }
}

const sponsorSheetsService = {
  initializeSheet,
  addSponsorToSheets,
  updateSponsorInSheets,
  getSponsorStats,
};

export default sponsorSheetsService;