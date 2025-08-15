import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/configs/database';
import Waitlist from '@/lib/models/Waitlist';
import googleSheetsService from '@/lib/services/googleSheetsService';
import { DatabaseError, ExternalServiceError } from '@/lib/utils/errorHandler';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function POST(request: NextRequest) {
  let requestBody: any;
  
  try {
    // Parse request body with timeout protection
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 30000);
    });
    
    const bodyPromise = request.json();
    requestBody = await Promise.race([bodyPromise, timeoutPromise]);
    
    const { name, email, phone, country, categories } = requestBody;

    // Connect to database with retry logic
    let dbConnected = false;
    let dbRetries = 3;
    
    while (!dbConnected && dbRetries > 0) {
      try {
        await connectDB();
        dbConnected = true;
      } catch (dbError) {
        dbRetries--;
        if (dbRetries === 0) {
          console.error('Database connection failed after retries:', dbError);
          throw new DatabaseError('Unable to connect to database', dbError);
        }
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Validate required fields
    if (!name || !email || !phone || !country || !categories || !Array.isArray(categories)) {
      return NextResponse.json(
        { success: false, message: 'Name, email, phone, country, and categories are required' },
        { status: 400 }
      );
    }

    // Validate categories
    const validCategories = [
      'vote_nominate',
      'become_ambassador',
      'join_webinar_expo',
      'sponsor_csr_partner',
      'apply_judge',
      'join_local_chapter',
      'join_nesa_team',
      'apply_nrc_volunteer',
      'buy_merchandise',
      'get_gala_ticket',
      'donate'
    ];

    const invalidCategories = categories.filter((cat: string) => !validCategories.includes(cat));
    if (invalidCategories.length > 0) {
      return NextResponse.json(
        { success: false, message: `Invalid categories: ${invalidCategories.join(', ')}` },
        { status: 400 }
      );
    }

    if (categories.length === 0) {
      return NextResponse.json(
        { success: false, message: 'At least one category must be selected' },
        { status: 400 }
      );
    }

    // Check if email already exists with error handling
    let existingEntry;
    try {
      existingEntry = await Waitlist.findOne({ email: email.toLowerCase() });
    } catch (dbError) {
      console.error('Database query error:', dbError);
      throw new DatabaseError('Database query failed', dbError);
    }
    
    if (existingEntry) {
      // Update existing entry
      try {
        existingEntry.name = name;
        existingEntry.phone = phone;
        existingEntry.country = country;
        existingEntry.categories = categories;
        await existingEntry.save();
      } catch (dbError) {
        console.error('Database update error:', dbError);
        throw new DatabaseError('Failed to update existing entry', dbError);
      }

      // Update in Google Sheets if it was previously synced
      let sheetsUpdateSuccess = true;
      if (existingEntry.syncedToSheets && existingEntry.sheetRowId) {
        try {
          await googleSheetsService.updateWaitlistEntry(existingEntry.sheetRowId, {
            name,
            email: email.toLowerCase(),
            phone,
            country,
            categories,
            timestamp: existingEntry.updatedAt
          });
        } catch (sheetsError) {
          console.error('Error updating Google Sheets:', sheetsError);
          sheetsUpdateSuccess = false;
          // Don't fail the request if sheets update fails
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Waitlist entry updated successfully',
        data: {
          id: existingEntry._id,
          name: existingEntry.name,
          email: existingEntry.email,
          phone: existingEntry.phone,
          country: existingEntry.country,
          categories: existingEntry.categories,
          syncedToSheets: sheetsUpdateSuccess,
          isUpdate: true
        }
      });
    }

    // Create new waitlist entry
    let savedEntry;
    try {
      const waitlistEntry = new Waitlist({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        country: country.trim(),
        categories
      });

      // Save to database
      savedEntry = await waitlistEntry.save();
    } catch (dbError) {
      console.error('Database save error:', dbError);
      
      // Handle specific MongoDB errors
      if (dbError && typeof dbError === 'object' && 'code' in dbError && (dbError as any).code === 11000) {
        return NextResponse.json(
          { success: false, message: 'This email is already on the waitlist' },
          { status: 409 }
        );
      }
      
      throw new DatabaseError('Failed to save waitlist entry', dbError);
    }

    // Add to Google Sheets with error handling
    let sheetRowId = null;
    let sheetsSuccess = false;
    try {
      sheetRowId = await googleSheetsService.addWaitlistEntry({
        name: savedEntry.name,
        email: savedEntry.email,
        phone: savedEntry.phone,
        country: savedEntry.country,
        categories: savedEntry.categories,
        timestamp: savedEntry.createdAt
      });

      if (sheetRowId) {
        // Update the database entry with sheet row ID
        try {
          savedEntry.syncedToSheets = true;
          savedEntry.sheetRowId = sheetRowId;
          await savedEntry.save();
          sheetsSuccess = true;
        } catch (dbUpdateError) {
          console.error('Error updating database with sheet row ID:', dbUpdateError);
          // Entry is saved, just sheets sync status won't be updated
        }
      }
    } catch (sheetsError) {
      console.error('Error adding to Google Sheets:', sheetsError);
      // Don't fail the request if sheets integration fails
      // Log the error for monitoring
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!',
      data: {
        id: savedEntry._id,
        name: savedEntry.name,
        email: savedEntry.email,
        phone: savedEntry.phone,
        country: savedEntry.country,
        categories: savedEntry.categories,
        syncedToSheets: sheetsSuccess,
        isUpdate: false
      }
    });

  } catch (error: any) {
    console.error('Waitlist API Error:', error);

    // Handle timeout errors
    if (error.message === 'Request timeout') {
      return NextResponse.json(
        { success: false, message: 'Request timed out. Please try again.' },
        { status: 408 }
      );
    }

    // Handle database errors
    if (error instanceof DatabaseError) {
      return NextResponse.json(
        { success: false, message: 'Database temporarily unavailable. Please try again.' },
        { status: 503 }
      );
    }

    // Handle external service errors
    if (error instanceof ExternalServiceError) {
      // For sheets errors, we might still want to indicate partial success
      return NextResponse.json(
        { success: false, message: 'Service temporarily unavailable. Please try again.' },
        { status: 503 }
      );
    }

    // Handle duplicate email error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: 'This email is already on the waitlist' },
        { status: 409 }
      );
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, message: messages.join(', ') },
        { status: 400 }
      );
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, message: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Handle network/connection errors
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      return NextResponse.json(
        { success: false, message: 'Service temporarily unavailable. Please try again.' },
        { status: 503 }
      );
    }

    // Generic server error
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'stats') {
      // Get waitlist statistics
      const totalCount = await Waitlist.countDocuments();
      const categoryStats = await Waitlist.getCategoryStats();
      const recentSignups = await Waitlist.getRecentSignups(5);

      // Get Google Sheets stats if available
      const sheetsStats = await googleSheetsService.getWaitlistStats();

      return NextResponse.json({
        success: true,
        data: {
          database: {
            totalEntries: totalCount,
            categoryStats: categoryStats.reduce((acc: any, stat: any) => {
              acc[stat._id] = stat.count;
              return acc;
            }, {}),
            recentSignups
          },
          sheets: sheetsStats
        }
      });
    }

    // Default: Get all waitlist entries (with pagination)
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const entries = await Waitlist.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await Waitlist.countDocuments();

    return NextResponse.json({
      success: true,
      data: {
        entries,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error: any) {
    console.error('Waitlist GET API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}