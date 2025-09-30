import { google } from 'googleapis';
import { ExternalServiceError } from '@/lib/utils/errorHandler';
import { IPartner } from '@/app/api/partner-application/route';

const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

class PartnerSheetsService {
  private sheets: any;
  private auth: any;

  constructor() {
    if (GOOGLE_CLIENT_EMAIL && GOOGLE_PRIVATE_KEY) {
      this.auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: GOOGLE_CLIENT_EMAIL,
          private_key: GOOGLE_PRIVATE_KEY,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
    }
  }

  private isConfigured(): boolean {
    return !!(GOOGLE_CLIENT_EMAIL && GOOGLE_PRIVATE_KEY && GOOGLE_SHEET_ID && this.sheets);
  }

  async initializePartnerSheet(): Promise<void> {
    if (!this.isConfigured()) {
      console.log('Google Sheets not configured, skipping initialization');
      return;
    }

    try {
      // Check if the sheet exists and has headers
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: 'Partners!A1:Z1',
      });

      const headers = response.data.values?.[0];
      
      // If no headers exist, create them
      if (!headers || headers.length === 0) {
        await this.createPartnerHeaders();
      }
    } catch (error: any) {
      if (error.code === 400) {
        // Sheet doesn't exist, create it
        await this.createPartnerSheet();
      } else {
        console.error('Error initializing Partner Google Sheet:', error);
        throw error;
      }
    }
  }

  private async createPartnerSheet(): Promise<void> {
    if (!this.isConfigured()) return;

    try {
      // First check if the sheet already exists
      const spreadsheet = await this.sheets.spreadsheets.get({
        spreadsheetId: GOOGLE_SHEET_ID,
      });

      const partnerSheet = spreadsheet.data.sheets?.find(
        (sheet: any) => sheet.properties.title === 'Partners'
      );

      if (!partnerSheet) {
        // Create the sheet only if it doesn't exist
        await this.sheets.spreadsheets.batchUpdate({
          spreadsheetId: GOOGLE_SHEET_ID,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: 'Partners',
                    gridProperties: {
                      rowCount: 1000,
                      columnCount: 20,
                    },
                  },
                },
              },
            ],
          },
        });
        console.log('✅ Created Partners sheet');
      } else {
        console.log('✅ Partners sheet already exists');
      }

      // Add headers
      await this.createPartnerHeaders();
    } catch (error: any) {
      console.error('Error creating Partners Google Sheet:', error);
      
      // If the error is about the sheet already existing, that's okay
      if (error.message && error.message.includes('already exists')) {
        console.log('Sheet already exists, continuing...');
        await this.createPartnerHeaders();
      } else {
        throw error;
      }
    }
  }

  private async createPartnerHeaders(): Promise<void> {
    if (!this.isConfigured()) return;

    const headers = [
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Brand Name',
      'Brand Link',
      'Description',
      'Partnership Goals'
    ];

    try {
      // Check if headers already exist
      const existingHeaders = await this.sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: 'Partners!A1:H1',
      });

      const hasHeaders = existingHeaders.data.values && 
                        existingHeaders.data.values[0] && 
                        existingHeaders.data.values[0].length > 0;

      if (!hasHeaders) {
        // Add headers
        await this.sheets.spreadsheets.values.update({
          spreadsheetId: GOOGLE_SHEET_ID,
          range: 'Partners!A1:H1',
          valueInputOption: 'RAW',
          requestBody: {
            values: [headers],
          },
        });

        // Get the sheet ID for the Partners sheet
        const spreadsheet = await this.sheets.spreadsheets.get({
          spreadsheetId: GOOGLE_SHEET_ID,
        });

        const partnerSheet = spreadsheet.data.sheets?.find(
          (sheet: any) => sheet.properties.title === 'Partners'
        );

        const sheetId = partnerSheet?.properties.sheetId || 0;

        // Format headers
        await this.sheets.spreadsheets.batchUpdate({
          spreadsheetId: GOOGLE_SHEET_ID,
          requestBody: {
            requests: [
              {
                repeatCell: {
                  range: {
                    sheetId: sheetId,
                    startRowIndex: 0,
                    endRowIndex: 1,
                    startColumnIndex: 0,
                    endColumnIndex: headers.length,
                  },
                  cell: {
                    userEnteredFormat: {
                      backgroundColor: { red: 0.2, green: 0.2, blue: 0.2 },
                      textFormat: {
                        foregroundColor: { red: 1, green: 1, blue: 1 },
                        bold: true,
                      },
                    },
                  },
                  fields: 'userEnteredFormat(backgroundColor,textFormat)',
                },
              },
            ],
          },
        });

        console.log('✅ Created headers in Partners Google Sheet');
      } else {
        console.log('✅ Headers already exist in Partners Google Sheet');
      }
    } catch (error: any) {
      console.error('Error creating Partner headers:', error);
      
      // Don't throw error if it's just a formatting issue
      if (error.message && error.message.includes('format')) {
        console.log('Header formatting failed, but headers were created');
      } else {
        throw error;
      }
    }
  }

  async addPartnerToSheets(data: IPartner): Promise<number | null> {
    if (!this.isConfigured()) {
      console.log('Google Sheets not configured, skipping entry addition');
      return null;
    }

    try {
      // Ensure sheet is initialized with timeout
      const initTimeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Sheet initialization timeout')), 15000);
      });
      
      await Promise.race([this.initializePartnerSheet(), initTimeout]);

      const row = [
        data.createdAt.toISOString(),
        data.name,
        data.email,
        data.phone,
        data.brandName,
        data.brandLink,
        data.description,
        data.partnershipGoals
      ];

      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: 'Partners!A:H',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [row],
        },
      });

      // Extract row number from the response
      const updatedRange = response.data.updates?.updatedRange;
      const rowMatch = updatedRange?.match(/!A(\d+):/);
      const rowNumber = rowMatch ? parseInt(rowMatch[1]) : null;

      console.log('✅ Added partner entry to Google Sheets:', data.email);
      return rowNumber;
    } catch (error: any) {
      console.error('❌ Error adding partner to Google Sheets:', error);
      
      // Handle specific Google Sheets API errors
      if (error.code === 403) {
        throw new ExternalServiceError('Google Sheets access denied. Please check permissions.', 'sheets', error);
      } else if (error.code === 429) {
        throw new ExternalServiceError('Google Sheets rate limit exceeded. Please try again later.', 'sheets', error);
      } else if (error.code === 404) {
        throw new ExternalServiceError('Google Sheet not found. Please check configuration.', 'sheets', error);
      } else if (error.message === 'Sheet initialization timeout') {
        throw new ExternalServiceError('Google Sheets service timeout. Please try again.', 'sheets', error);
      } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        throw new ExternalServiceError('Unable to connect to Google Sheets. Please check your connection.', 'sheets', error);
      }
      
      throw new ExternalServiceError('Google Sheets integration failed', 'sheets', error);
    }
  }

  async updatePartnerInSheets(rowId: number, data: IPartner): Promise<void> {
    if (!this.isConfigured()) {
      console.log('Google Sheets not configured, skipping entry update');
      return;
    }

    try {
      const row = [
        data.createdAt.toISOString(),
        data.name,
        data.email,
        data.phone,
        data.brandName,
        data.brandLink,
        data.description,
        data.partnershipGoals
      ];

      await this.sheets.spreadsheets.values.update({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `Partners!A${rowId}:H${rowId}`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [row],
        },
      });

      console.log('✅ Updated partner entry in Google Sheets:', data.email);
    } catch (error) {
      console.error('❌ Error updating partner in Google Sheets:', error);
      throw error;
    }
  }

  async getPartnerStats(): Promise<{
    totalPartners: number;
  } | null> {
    if (!this.isConfigured()) {
      console.log('Google Sheets not configured, skipping stats retrieval');
      return null;
    }

    try {
      // First, try to initialize the sheet
      await this.initializePartnerSheet();

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: 'Partners!A2:H',
      });

      const rows = response.data.values || [];
      const totalPartners = rows.length;

      console.log('✅ Retrieved Partner Google Sheets stats:', { totalPartners });
      return { totalPartners };
    } catch (error: any) {
      console.error('❌ Error getting partner stats from Google Sheets:', error);
      
      // If it's a 404 error, the sheet might not exist yet
      if (error.code === 404) {
        console.log('Sheet not found, returning empty stats');
        return { totalPartners: 0 };
      }
      
      return null;
    }
  }
}

export default new PartnerSheetsService();