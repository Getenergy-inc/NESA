import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/models/connectDB';
import Sponsor from '@/lib/models/Sponsor';
import { getServerSession } from 'next-auth';
import { authenticateAdmin } from '@/lib/auth/admin';
import authOptions from '@/lib/utils/auth-options';
import { sendEmail } from '@/lib/templates/emailTemplates';

// Get all sponsors with optional filtering
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session?.user?.isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const plan = searchParams.get('plan');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Build query
    const query: any = {};
    if (status && status !== 'all') query.status = status;
    if (plan && plan !== 'all') query.sponsorship_plan = plan;
    if (search) {
      query.$or = [
        { company_name: { $regex: search, $options: 'i' } }, // Search by company name
        { email: { $regex: search, $options: 'i' } }, // Search by contact email
      ];
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const sponsors = await Sponsor.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const total = await Sponsor.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      sponsors,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch sponsors' },
      { status: 500 }
    );
  }
}

// Update sponsor status
export async function PATCH(request: NextRequest) {
  try {
    // Check admin authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session?.user?.isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status, adminNotes } = body;
    
    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Find and update the sponsor
    const sponsor = await Sponsor.findById(id);
    
    if (!sponsor) {
      return NextResponse.json(
        { success: false, error: 'Sponsor not found' },
        { status: 404 }
      );
    }
    
    // Update fields
    sponsor.status = status;
    if (adminNotes !== undefined) (sponsor as any).admin_notes = adminNotes;
    sponsor.updated_at = new Date().toISOString();
    
    // Save changes
    await sponsor.save();
    
    // Send email notification if status changed to approved or rejected
    if (status === 'approved' || status === 'rejected') {
      const emailSubject = status === 'approved' 
        ? 'Your NESA Africa Sponsorship Application has been Approved!'
        : 'Update on Your NESA Africa Sponsorship Application';
      
      const emailContent = status === 'approved'
        ? `
          <h1>Congratulations!</h1>
          <p>Your application to sponsor NESA Africa has been approved.</p>
          <p>Sponsorship Plan: ${(sponsor as any).sponsorship_plan || sponsor.selectedPlan?.name || 'N/A'}</p>
          <p>Payment Reference: ${sponsor.payment_reference || 'N/A'}</p>
          <h2>Next Steps</h2>
          <p>Our team will be in touch shortly to discuss the implementation of your sponsorship benefits.</p>
          <p>If you have any questions, please contact us at partnerships@nesaafrica.org</p>
        `
        : `
          <h1>Application Update</h1>
          <p>We have reviewed your application to sponsor NESA Africa.</p>
          <p>Unfortunately, we are unable to proceed with your application at this time.</p>
          <p>If you would like more information, please contact us at partnerships@nesaafrica.org</p>
        `;
      
      await sendEmail({
        to: sponsor.email,
        subject: emailSubject,
        html: emailContent
      });
    }
    
    return NextResponse.json({
      success: true,
      message: `Sponsor status updated to ${status}`,
      sponsor
    });
  } catch (error) {
    console.error('Error updating sponsor:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update sponsor' },
      { status: 500 }
    );
  }
}

// Delete sponsor
export async function DELETE(request: NextRequest) {
  try {
    // Check admin authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session?.user?.isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing sponsor ID' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Find and delete the sponsor
    const result = await Sponsor.findByIdAndDelete(id);
    
    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Sponsor not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Sponsor deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting sponsor:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete sponsor' },
      { status: 500 }
    );
  }
}