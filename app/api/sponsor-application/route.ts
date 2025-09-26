import { NextRequest, NextResponse } from 'next/server';
import connectSponsorDB from '@/lib/configs/sponsorDatabase';
import Sponsor, { ISponsor } from '@/lib/models/Sponsor';
import sponsorSheetsService from '@/lib/services/sponsorSheetsService';
import { sendEmail } from '@/lib/templates/emailTemplates';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;

// Generate verification token
function generateVerificationToken(): string {
  return Math.random().toString(36).substr(2, 15);
}

export async function POST(request: NextRequest) {
  let requestBody: any;
  
  try {
    // Parse request body with timeout protection
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 30000);
    });
    
    const bodyPromise = request.json();
    requestBody = await Promise.race([bodyPromise, timeoutPromise]);
    
    // Connect to database with retry logic
    let dbConnected = false;
    let dbRetries = 3;
    
    while (!dbConnected && dbRetries > 0) {
      try {
        await connectSponsorDB();
        dbConnected = true;
      } catch (dbError) {
        dbRetries--;
        if (dbRetries === 0) {
          console.error('Sponsor database connection failed after retries:', dbError);
          throw new Error('Unable to connect to sponsor database');
        }
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // Validate required fields
    const requiredFields = ['company_name', 'name', 'email', 'phone', 'Business_reg_no'];
    const missingFields = requiredFields.filter(field => !requestBody[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(requestBody.email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format' 
        },
        { status: 400 }
      );
    }

    // Check if email already exists
    let existingEntry;
    try {
      existingEntry = await Sponsor.findOne({ email: requestBody.email.toLowerCase() });
    } catch (dbError) {
      console.error('Database query error:', dbError);
      throw new Error('Database query failed');
    }
    
    if (existingEntry) {
      // Update existing entry
      try {
        existingEntry.company_name = requestBody.company_name;
        existingEntry.name = requestBody.name;
        existingEntry.phone = requestBody.phone;
        existingEntry.Business_reg_no = requestBody.Business_reg_no;
        existingEntry.sponsorshipType = requestBody.sponsorshipType || existingEntry.sponsorshipType;
        existingEntry.proposedAmount = requestBody.proposedAmount || existingEntry.proposedAmount;
        existingEntry.additionalNotes = requestBody.additionalNotes || existingEntry.additionalNotes;
        existingEntry.selectedPlan = requestBody.selectedPlan || existingEntry.selectedPlan;
        
        // Update payment information if provided
        if (requestBody.payment_method) {
          existingEntry.payment_method = requestBody.payment_method;
        }
        
        // Only set payment reference if it doesn't exist
        if (!existingEntry.payment_reference && requestBody.payment_method) {
          existingEntry.payment_reference = `NESA-${Date.now().toString().slice(-6)}`;
        }
        
        existingEntry.updated_at = new Date().toISOString();
        await existingEntry.save();
      } catch (dbError) {
        console.error('Database update error:', dbError);
        throw new Error('Failed to update existing entry');
      }

      // Update in Google Sheets if it was previously synced
      let sheetsUpdateSuccess = true;
      if (existingEntry.syncedToSheets && existingEntry.sheetRowId) {
        try {
          // Update in Google Sheets using the sponsor sheets service
          await sponsorSheetsService.updateSponsorInSheets(existingEntry.sheetRowId, existingEntry);
          sheetsUpdateSuccess = true;
        } catch (sheetsError) {
          console.error('Error updating Google Sheets:', sheetsError);
          sheetsUpdateSuccess = false;
          // Don't fail the request if sheets update fails
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Sponsorship application updated successfully',
        data: {
          id: existingEntry._id,
          company_name: existingEntry.company_name,
          email: existingEntry.email,
          status: existingEntry.status,
          syncedToSheets: sheetsUpdateSuccess,
          isUpdate: true,
          nextSteps: [
            'Your updated application is being reviewed',
            'You will receive payment instructions via email',
            'Complete payment within 7 days',
            'Receive sponsorship confirmation and benefits'
          ],
          estimatedProcessingTime: '1-3 business days',
          contactInfo: {
            email: 'partnerships@nesa.africa',
            phone: '+234-907-962-1110'
          }
        }
      });
    }

    // Create new sponsor entry
    let savedEntry;
    try {
      const verificationToken = generateVerificationToken();
      
      const sponsorEntry = new Sponsor({
        company_name: requestBody.company_name.trim(),
        name: requestBody.name.trim(),
        email: requestBody.email.toLowerCase().trim(),
        phone: requestBody.phone.trim(),
        Business_reg_no: requestBody.Business_reg_no.trim(),
        sponsorshipType: requestBody.sponsorshipType || '',
        proposedAmount: requestBody.proposedAmount,
        additionalNotes: requestBody.additionalNotes || '',
        selectedPlan: requestBody.selectedPlan,
        status: 'pending',
        verified: false,
        verification_token: verificationToken,
        payment_status: 'pending',
        payment_method: requestBody.payment_method || '',
        payment_reference: `NESA-${Date.now().toString().slice(-6)}`
      });

      // Save to database
      savedEntry = await sponsorEntry.save();
    } catch (dbError) {
      console.error('Database save error:', dbError);
      
      // Handle specific MongoDB errors
      if (dbError && typeof dbError === 'object' && 'code' in dbError && (dbError as any).code === 11000) {
        return NextResponse.json(
          { success: false, message: 'This email is already registered as a sponsor' },
          { status: 409 }
        );
      }
      
      throw new Error('Failed to save sponsor entry');
    }

    // Add to Google Sheets with error handling
    let sheetRowId = null;
    let sheetsSuccess = false;
    try {
      sheetRowId = await sponsorSheetsService.addSponsorToSheets(savedEntry);

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
    }

    // Send confirmation email
    try {
      // In a real implementation, you would use a proper email template
      const emailHtml = `
        <h1>Thank you for your NESA-Africa 2025 Sponsorship Application</h1>
        <p>Dear ${requestBody.name},</p>
        <p>We have received your sponsorship application for ${requestBody.company_name}.</p>
        <p>Your application ID is: <strong>${savedEntry._id}</strong></p>
        <p>Your payment reference is: <strong>${savedEntry.payment_reference || 'To be provided'}</strong></p>
        ${requestBody.payment_method ? `<p>Selected payment method: <strong>${requestBody.payment_method}</strong></p>` : ''}
        ${requestBody.selectedPlan ? `<p>Selected sponsorship plan: <strong>${requestBody.selectedPlan.name} ($${requestBody.selectedPlan.price.toLocaleString()})</strong></p>` : ''}
        <p>Our team will review your application and contact you with next steps.</p>
        <p>Thank you for your interest in supporting NESA-Africa 2025!</p>
      `;

      await sendEmail({
        to: requestBody.email,
        subject: 'NESA-Africa 2025 Sponsorship Application Received',
        html: emailHtml
      });

      console.log('✅ Confirmation email sent to:', requestBody.email);
    } catch (emailError) {
      console.error('❌ Failed to send confirmation email:', emailError);
      // Don't fail the entire request if email fails - sponsorship is still saved
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Sponsorship application submitted successfully',
      data: {
        id: savedEntry._id,
        company_name: savedEntry.company_name,
        email: savedEntry.email,
        status: savedEntry.status,
        syncedToSheets: sheetsSuccess,
        nextSteps: [
          'Check your email for confirmation and payment instructions',
          'Complete payment using the provided methods',
          'Await sponsorship confirmation within 1-3 business days',
          'Receive your digital certificate and benefits activation'
        ],
        estimatedProcessingTime: '1-3 business days',
        contactInfo: {
          email: 'partnerships@nesa.africa',
          phone: '+234-907-962-1110'
        }
      }
    });

  } catch (error: any) {
    console.error('Sponsor API Error:', error);

    // Handle timeout errors
    if (error.message === 'Request timeout') {
      return NextResponse.json(
        { success: false, message: 'Request timed out. Please try again.' },
        { status: 408 }
      );
    }

    // Handle database errors
    if (error.message.includes('database')) {
      return NextResponse.json(
        { success: false, message: 'Database temporarily unavailable. Please try again.' },
        { status: 503 }
      );
    }

    // Handle duplicate email error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: 'This email is already registered as a sponsor' },
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

    // Generic server error
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Connect to sponsor database
    await connectSponsorDB();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const id = searchParams.get('id');
    
    if (!email && !id) {
      return NextResponse.json(
        { success: false, message: 'Email or ID parameter is required' },
        { status: 400 }
      );
    }

    let sponsor;
    if (email) {
      sponsor = await Sponsor.findOne({ email: email.toLowerCase() });
    } else if (id) {
      sponsor = await Sponsor.findById(id);
    }

    if (!sponsor) {
      return NextResponse.json(
        { success: false, message: 'Sponsorship application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: sponsor._id,
        company_name: sponsor.company_name,
        email: sponsor.email,
        status: sponsor.status,
        payment_status: sponsor.payment_status,
        created_at: sponsor.created_at,
        selectedPlan: sponsor.selectedPlan,
        message: 'Your sponsorship application is being reviewed. You will receive payment instructions via email.'
      }
    });

  } catch (error) {
    console.error('Error retrieving sponsor application:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}