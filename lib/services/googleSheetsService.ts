import { google } from 'googleapis';
import { ExternalServiceError } from '@/lib/utils/errorHandler';

const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
  console.warn('Google Sheets credentials not found. Sheets integration will be disabled.');
}

class GoogleSheetsService {
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

  async initializeSheet(): Promise<void> {
    if (!this.isConfigured()) {
      console.log('Google Sheets not configured, skipping initialization');
      return;
    }

    try {
      // Check if the sheet exists and has headers
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: 'Waitlist!A1:Z1',
      });

      const headers = response.data.values?.[0];
      
      // If no headers exist, create them
      if (!headers || headers.length === 0) {
        await this.createHeaders();
      }
    } catch (error: any) {
      if (error.code === 400) {
        // Sheet doesn't exist, create it
        await this.createSheet();
      } else {
        console.error('Error initializing Google Sheet:', error);
        throw error;
      }
    }
  }

  private async createSheet(): Promise<void> {
    if (!this.isConfigured()) return;

    try {
      // First check if the sheet already exists
      const spreadsheet = await this.sheets.spreadsheets.get({
        spreadsheetId: GOOGLE_SHEET_ID,
      });

      const waitlistSheet = spreadsheet.data.sheets?.find(
        (sheet: any) => sheet.properties.title === 'Waitlist'
      );

      if (!waitlistSheet) {
        // Create the sheet only if it doesn't exist
        await this.sheets.spreadsheets.batchUpdate({
          spreadsheetId: GOOGLE_SHEET_ID,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: 'Waitlist',
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
        console.log('✅ Created Waitlist sheet');
      } else {
        console.log('✅ Waitlist sheet already exists');
      }

      // Add headers
      await this.createHeaders();
    } catch (error: any) {
      console.error('Error creating Google Sheet:', error);
      
      // If the error is about the sheet already existing, that's okay
      if (error.message && error.message.includes('already exists')) {
        console.log('Sheet already exists, continuing...');
        await this.createHeaders();
      } else {
        throw error;
      }
    }
  }

  private async createHeaders(): Promise<void> {
    if (!this.isConfigured()) return;

    const headers = [
      'Timestamp',
      'Name',
      'Email',
      'Vote or Nominate',
      'Become Ambassador',
      'Join Webinar/Expo',
      'Sponsor or CSR Partner',
      'Apply as a Judge',
      'Join Local Chapter',
      'Join NESA Team',
      'Apply as NRC Volunteer',
      'Get Gala Ticket',
      'Donate',
      'Total Categories',
      'Categories List'
    ];

    try {
      // Check if headers already exist
      const existingHeaders = await this.sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: 'Waitlist!A1:O1',
      });

      const hasHeaders = existingHeaders.data.values && 
                        existingHeaders.data.values[0] && 
                        existingHeaders.data.values[0].length > 0;

      if (!hasHeaders) {
        // Add headers
        await this.sheets.spreadsheets.values.update({
          spreadsheetId: GOOGLE_SHEET_ID,
          range: 'Waitlist!A1:O1',
          valueInputOption: 'RAW',
          requestBody: {
            values: [headers],
          },
        });

        // Get the sheet ID for the Waitlist sheet
        const spreadsheet = await this.sheets.spreadsheets.get({
          spreadsheetId: GOOGLE_SHEET_ID,
        });

        const waitlistSheet = spreadsheet.data.sheets?.find(
          (sheet: any) => sheet.properties.title === 'Waitlist'
        );

        const sheetId = waitlistSheet?.properties.sheetId || 0;

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

        console.log('✅ Created headers in Google Sheet');
      } else {
        console.log('✅ Headers already exist in Google Sheet');
      }
    } catch (error: any) {
      console.error('Error creating headers:', error);
      
      // Don't throw error if it's just a formatting issue
      if (error.message && error.message.includes('format')) {
        console.log('Header formatting failed, but headers were created');
      } else {
        throw error;
      }
    }
  }

  async addWaitlistEntry(data: {
    name: string;
    email: string;
    categories: string[];
    timestamp: Date;
  }): Promise<number | null> {
    if (!this.isConfigured()) {
      console.log('Google Sheets not configured, skipping entry addition');
      return null;
    }

    try {
      // Ensure sheet is initialized with timeout
      const initTimeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Sheet initialization timeout')), 15000);
      });
      
      await Promise.race([this.initializeSheet(), initTimeout]);

      // Map categories to Yes/No values
      const categoryMapping: { [key: string]: string } = {
        'vote_nominate': 'Vote or Nominate',
        'become_ambassador': 'Become Ambassador',
        'join_webinar_expo': 'Join Webinar/Expo',
        'sponsor_csr_partner': 'Sponsor or CSR Partner',
        'apply_judge': 'Apply as a Judge',
        'join_local_chapter': 'Join Local Chapter',
        'join_nesa_team': 'Join NESA Team',
        'apply_nrc_volunteer': 'Apply as NRC Volunteer',
        'get_gala_ticket': 'Get Gala Ticket',
        'donate': 'Donate'
      };

      const categoryColumns = [
        'vote_nominate',
        'become_ambassador',
        'join_webinar_expo',
        'sponsor_csr_partner',
        'apply_judge',
        'join_local_chapter',
        'join_nesa_team',
        'apply_nrc_volunteer',
        'get_gala_ticket',
        'donate'
      ];

      const row = [
        data.timestamp.toISOString(),
        data.name,
        data.email,
        ...categoryColumns.map(cat => data.categories.includes(cat) ? 'Yes' : 'No'),
        data.categories.length.toString(),
        data.categories.map(cat => categoryMapping[cat] || cat).join(', ')
      ];

      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: 'Waitlist!A:O',
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

      console.log('✅ Added waitlist entry to Google Sheets:', data.email);
      return rowNumber;
    } catch (error: any) {
      console.error('❌ Error adding entry to Google Sheets:', error);
      
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

  async updateWaitlistEntry(rowId: number, data: {
    name: string;
    email: string;
    categories: string[];
    timestamp: Date;
  }): Promise<void> {
    if (!this.isConfigured()) {
      console.log('Google Sheets not configured, skipping entry update');
      return;
    }

    try {
      const categoryMapping: { [key: string]: string } = {
        'vote_nominate': 'Vote or Nominate',
        'become_ambassador': 'Become Ambassador',
        'join_webinar_expo': 'Join Webinar/Expo',
        'sponsor_csr_partner': 'Sponsor or CSR Partner',
        'apply_judge': 'Apply as a Judge',
        'join_local_chapter': 'Join Local Chapter',
        'join_nesa_team': 'Join NESA Team',
        'apply_nrc_volunteer': 'Apply as NRC Volunteer',
        'get_gala_ticket': 'Get Gala Ticket',
        'buy_merchandise': 'Buy Merchandise',
        'donate': 'Donate'
      };

      const categoryColumns = [
        'vote_nominate',
        'become_ambassador',
        'join_webinar_expo',
        'sponsor_csr_partner',
        'apply_judge',
        'join_local_chapter',
        'join_nesa_team',
        'apply_nrc_volunteer',
        'get_gala_ticket',
        'donate'
      ];

      const row = [
        data.timestamp.toISOString(),
        data.name,
        data.email,
        ...categoryColumns.map(cat => data.categories.includes(cat) ? 'Yes' : 'No'),
        data.categories.length.toString(),
        data.categories.map(cat => categoryMapping[cat] || cat).join(', ')
      ];

      await this.sheets.spreadsheets.values.update({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `Waitlist!A${rowId}:O${rowId}`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [row],
        },
      });

      console.log('✅ Updated waitlist entry in Google Sheets:', data.email);
    } catch (error) {
      console.error('❌ Error updating entry in Google Sheets:', error);
      throw error;
    }
  }

  async getWaitlistStats(): Promise<{
    totalEntries: number;
    categoryStats: { [key: string]: number };
  } | null> {
    if (!this.isConfigured()) {
      console.log('Google Sheets not configured, skipping stats retrieval');
      return null;
    }

    try {
      // First, try to initialize the sheet
      await this.initializeSheet();

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: 'Waitlist!A2:O',
      });

      const rows = response.data.values || [];
      const totalEntries = rows.length;

      const categoryStats: { [key: string]: number } = {};
      
      // Map to match the database category keys
      const categoryMapping: { [key: string]: string } = {
        'vote_nominate': 'Vote or Nominate',
        'become_ambassador': 'Become Ambassador',
        'join_webinar_expo': 'Join Webinar/Expo',
        'sponsor_csr_partner': 'Sponsor or CSR Partner',
        'apply_judge': 'Apply as a Judge',
        'join_local_chapter': 'Join Local Chapter',
        'join_nesa_team': 'Join NESA Team',
        'apply_nrc_volunteer': 'Apply as NRC Volunteer',
        'get_gala_ticket': 'Get Gala Ticket',
        'donate': 'Donate'
      };

      const categoryColumns = [
        'vote_nominate',
        'become_ambassador',
        'join_webinar_expo',
        'sponsor_csr_partner',
        'apply_judge',
        'join_local_chapter',
        'join_nesa_team',
        'apply_nrc_volunteer',
        'get_gala_ticket',
        'donate'
      ];

      categoryColumns.forEach((categoryKey, index) => {
        const count = rows.filter((row: any[]) => row[index + 3] === 'Yes').length;
        categoryStats[categoryKey] = count;
      });

      console.log('✅ Retrieved Google Sheets stats:', { totalEntries, categoryStats });
      return { totalEntries, categoryStats };
    } catch (error: any) {
      console.error('❌ Error getting waitlist stats from Google Sheets:', error);
      
      // If it's a 404 error, the sheet might not exist yet
      if (error.code === 404) {
        console.log('Sheet not found, returning empty stats');
        return { totalEntries: 0, categoryStats: {} };
      }
      
      return null;
    }
  }
}

export default new GoogleSheetsService();