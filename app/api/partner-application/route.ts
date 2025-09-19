import { NextRequest, NextResponse } from 'next/server';
import connectPartnerDB from '@/lib/configs/partnerDatabase';
import mongoose, { Schema, Document, Model } from 'mongoose';
import partnerSheetsService from '@/lib/services/partnerSheetsService';
import { DatabaseError, ExternalServiceError } from '@/lib/utils/errorHandler';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;

// Define Partner interface
export interface IPartner extends Document {
  name: string;
  email: string;
  phone: string;
  brandName: string;
  brandLink: string;
  description: string;
  partnershipGoals: string;
  language?: string; // Add language field
  createdAt: Date;
  updatedAt: Date;
  syncedToSheets: boolean;
  sheetRowId?: number;
}

// Create Partner schema if it doesn't exist
let Partner: Model<IPartner>;

try {
  // Try to get the existing model
  Partner = mongoose.model<IPartner>('Partner');
} catch {
  // Define the schema if the model doesn't exist
  const PartnerSchema = new Schema<IPartner>({
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      minlength: [10, 'Phone number must be at least 10 characters'],
      maxlength: [20, 'Phone number cannot exceed 20 characters']
    },
    brandName: {
      type: String,
      required: [true, 'Brand name is required'],
      trim: true,
      minlength: [2, 'Brand name must be at least 2 characters'],
      maxlength: [100, 'Brand name cannot exceed 100 characters']
    },
    brandLink: {
      type: String,
      required: [true, 'Brand link is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters']
    },
    partnershipGoals: {
      type: String,
      required: [true, 'Partnership goals are required'],
      trim: true,
      minlength: [10, 'Partnership goals must be at least 10 characters']
    },
    language: {
      type: String,
      enum: ['en', 'fr', 'ar', 'sw', 'pt'],
      default: 'en'
    },
    syncedToSheets: {
      type: Boolean,
      default: false
    },
    sheetRowId: {
      type: Number,
      required: false
    }
  }, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

  // Index for faster queries
  PartnerSchema.index({ email: 1 }, { unique: true });
  PartnerSchema.index({ createdAt: -1 });
  PartnerSchema.index({ syncedToSheets: 1 });
  PartnerSchema.index({ brandName: 1 });

  // Create the model
  Partner = mongoose.model<IPartner>('Partner', PartnerSchema);
}

// Google Sheets functionality is now handled by partnerSheetsService
// No need for these functions anymore as they're encapsulated in the service

export async function POST(request: NextRequest) {
  let requestBody: any;
  
  try {
    // Parse request body with timeout protection
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 30000);
    });
    
    const bodyPromise = request.json();
    requestBody = await Promise.race([bodyPromise, timeoutPromise]);
    
    const { name, email, phone, brandName, brandLink, description, partnershipGoals, language } = requestBody;

    // Connect to database with retry logic
    let dbConnected = false;
    let dbRetries = 3;
    
    while (!dbConnected && dbRetries > 0) {
      try {
        await connectPartnerDB();
        dbConnected = true;
      } catch (dbError) {
        dbRetries--;
        if (dbRetries === 0) {
          console.error('Partner database connection failed after retries:', dbError);
          throw new DatabaseError('Unable to connect to partner database', dbError);
        }
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Validate required fields
    if (!name || !email || !phone || !brandName || !brandLink || !description || !partnershipGoals) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if email already exists with error handling
    let existingEntry;
    try {
      existingEntry = await Partner.findOne({ email: email.toLowerCase() });
    } catch (dbError) {
      console.error('Database query error:', dbError);
      throw new DatabaseError('Database query failed', dbError);
    }
    
    if (existingEntry) {
      // Update existing entry
      try {
        existingEntry.name = name;
        existingEntry.phone = phone;
        existingEntry.brandName = brandName;
        existingEntry.brandLink = brandLink;
        existingEntry.description = description;
        existingEntry.partnershipGoals = partnershipGoals;
        existingEntry.language = language || existingEntry.language || 'en';
        await existingEntry.save();
      } catch (dbError) {
        console.error('Database update error:', dbError);
        throw new DatabaseError('Failed to update existing entry', dbError);
      }

      // Update in Google Sheets if it was previously synced
      let sheetsUpdateSuccess = true;
      if (existingEntry.syncedToSheets && existingEntry.sheetRowId) {
        try {
          // Update in Google Sheets using the partner sheets service
          await partnerSheetsService.updatePartnerInSheets(existingEntry.sheetRowId, existingEntry);
          sheetsUpdateSuccess = true;
        } catch (sheetsError) {
          console.error('Error updating Google Sheets:', sheetsError);
          sheetsUpdateSuccess = false;
          // Don't fail the request if sheets update fails
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Partner application updated successfully',
        data: {
          id: existingEntry._id,
          name: existingEntry.name,
          email: existingEntry.email,
          language: existingEntry.language,
          syncedToSheets: sheetsUpdateSuccess,
          isUpdate: true
        }
      });
    }

    // Create new partner entry
    let savedEntry;
    try {
      const partnerEntry = new Partner({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        brandName: brandName.trim(),
        brandLink: brandLink.trim(),
        description: description.trim(),
        partnershipGoals: partnershipGoals.trim(),
        language: language || 'en'
      });

      // Save to database
      savedEntry = await partnerEntry.save();
    } catch (dbError) {
      console.error('Database save error:', dbError);
      
      // Handle specific MongoDB errors
      if (dbError && typeof dbError === 'object' && 'code' in dbError && (dbError as any).code === 11000) {
        return NextResponse.json(
          { success: false, message: 'This email is already registered as a partner' },
          { status: 409 }
        );
      }
      
      throw new DatabaseError('Failed to save partner entry', dbError);
    }

    // Add to Google Sheets with error handling
    let sheetRowId = null;
    let sheetsSuccess = false;
    try {
      sheetRowId = await partnerSheetsService.addPartnerToSheets(savedEntry);

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
      message: 'Partner application submitted successfully!',
      data: {
        id: savedEntry._id,
        name: savedEntry.name,
        email: savedEntry.email,
        language: savedEntry.language,
        syncedToSheets: sheetsSuccess,
        isUpdate: false
      }
    });

  } catch (error: any) {
    console.error('Partner API Error:', error);

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
        { success: false, message: 'This email is already registered as a partner' },
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
    // Connect to partner database
    await connectPartnerDB();

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    // Default: Get all partner entries (with pagination)
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const entries = await Partner.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await Partner.countDocuments();

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
    console.error('Partner GET API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}