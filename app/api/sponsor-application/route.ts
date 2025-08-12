import { NextRequest, NextResponse } from 'next/server';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['company_name', 'name', 'email', 'phone', 'Business_reg_no'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
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
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format' 
        },
        { status: 400 }
      );
    }

    // Generate application ID
    const applicationId = `NESA-SPONSOR-${Date.now().toString().slice(-8)}`;
    
    // Create sponsor application object
    const sponsorApplication = {
      id: applicationId,
      ...body,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      paymentStatus: 'pending',
      // Add any additional processing fields
    };

    // In a real application, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Send notification to admin
    // 4. Generate invoice if needed
    
    console.log('Sponsor Application Received:', sponsorApplication);

    // Simulate email sending (replace with actual email service)
    const emailData = {
      to: body.email,
      subject: 'NESA-Africa 2025 Sponsorship Application Received',
      template: 'sponsor-confirmation',
      data: {
        name: body.name,
        company: body.company_name,
        applicationId,
        selectedPlan: body.selectedPlan,
        nextSteps: [
          'Review your application details',
          'Await payment instructions via email',
          'Complete payment within 7 days',
          'Receive sponsorship confirmation and benefits'
        ]
      }
    };

    // Simulate admin notification
    const adminNotification = {
      to: 'partnerships@nesa.africa',
      subject: `New Sponsorship Application: ${body.company_name}`,
      template: 'admin-sponsor-notification',
      data: {
        applicationId,
        company: body.company_name,
        contact: body.name,
        email: body.email,
        phone: body.phone,
        selectedPlan: body.selectedPlan,
        proposedAmount: body.proposedAmount,
        sponsorshipType: body.sponsorshipType,
        additionalNotes: body.additionalNotes
      }
    };

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Sponsorship application submitted successfully',
      data: {
        applicationId,
        status: 'pending',
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

  } catch (error) {
    console.error('Sponsor application error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // This endpoint could be used to retrieve sponsor application status
  const { searchParams } = new URL(request.url);
  const applicationId = searchParams.get('applicationId');
  
  if (!applicationId) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Application ID is required' 
      },
      { status: 400 }
    );
  }

  // In a real application, you would query the database
  // For now, return a mock response
  return NextResponse.json({
    success: true,
    data: {
      applicationId,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      paymentStatus: 'pending',
      message: 'Your sponsorship application is being reviewed. You will receive payment instructions via email.'
    }
  });
}