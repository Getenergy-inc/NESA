import { NextRequest, NextResponse } from 'next/server';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;


// Mock database for judge nominations
let judgeNominations: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const nominationData = await request.json();

    // Validate required fields
    const requiredFields = [
      'nominee_full_name',
      'nominee_email',
      'nominee_current_role',
      'nominee_country',
      'nominator_name',
      'nominator_email',
      'nominator_relationship',
      'reason_for_nomination',
      'specific_achievements',
      'why_good_judge'
    ];

    for (const field of requiredFields) {
      if (!nominationData[field]) {
        return NextResponse.json(
          { success: false, message: `${field.replace('_', ' ')} is required` },
          { status: 400 }
        );
      }
    }

    // Validate email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(nominationData.nominee_email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid nominee email format' },
        { status: 400 }
      );
    }

    if (!emailRegex.test(nominationData.nominator_email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid nominator email format' },
        { status: 400 }
      );
    }

    // Check if nominee has already been nominated
    const existingNomination = judgeNominations.find(
      nomination => nomination.nominee_email.toLowerCase() === nominationData.nominee_email.toLowerCase()
    );

    if (existingNomination) {
      return NextResponse.json(
        { success: false, message: 'This person has already been nominated as a judge' },
        { status: 409 }
      );
    }

    // Create nomination record
    const nomination = {
      id: `nomination_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...nominationData,
      status: 'submitted',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      reviewed: false,
      notes: 'Nomination submitted successfully. Pending review by SOBCD + BOT Panel.'
    };

    // Store nomination
    judgeNominations.push(nomination);

    // Send notification emails (in production, implement actual email service)
    try {
      // Email to nominator
      console.log(`Sending confirmation email to nominator: ${nominationData.nominator_email}`);
      
      // Email to nominee (optional notification)
      console.log(`Sending notification email to nominee: ${nominationData.nominee_email}`);
      
      // Email to admin panel
      console.log('Sending notification to admin panel about new nomination');
    } catch (emailError) {
      console.error('Failed to send notification emails:', emailError);
      // Don't fail the nomination if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Judge nomination submitted successfully',
      nomination: {
        id: nomination.id,
        nominee_name: nomination.nominee_full_name,
        nominee_email: nomination.nominee_email,
        nominator_name: nomination.nominator_name,
        status: nomination.status,
        created_at: nomination.created_at
      }
    });

  } catch (error) {
    console.error('Judge nomination submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve nominations (for admin use)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const status = searchParams.get('status');

    let filteredNominations = judgeNominations;

    // Filter by nominee email if provided
    if (email) {
      filteredNominations = filteredNominations.filter(
        nomination => nomination.nominee_email.toLowerCase() === email.toLowerCase()
      );
    }

    // Filter by status if provided
    if (status) {
      filteredNominations = filteredNominations.filter(
        nomination => nomination.status === status
      );
    }

    // Return summary information (not full details for privacy)
    const nominationSummaries = filteredNominations.map(nomination => ({
      id: nomination.id,
      nominee_name: nomination.nominee_full_name,
      nominee_email: nomination.nominee_email,
      nominee_role: nomination.nominee_current_role,
      nominee_country: nomination.nominee_country,
      nominator_name: nomination.nominator_name,
      status: nomination.status,
      created_at: nomination.created_at,
      updated_at: nomination.updated_at
    }));

    return NextResponse.json({
      success: true,
      nominations: nominationSummaries,
      total: nominationSummaries.length
    });

  } catch (error) {
    console.error('Judge nominations retrieval error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT endpoint to update nomination status (for admin use)
export async function PUT(request: NextRequest) {
  try {
    const { id, status, notes, admin_action } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: 'Nomination ID and status are required' },
        { status: 400 }
      );
    }

    const validStatuses = ['submitted', 'under_review', 'approved', 'rejected', 'contacted'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status value' },
        { status: 400 }
      );
    }

    // Find and update nomination
    const nominationIndex = judgeNominations.findIndex(nomination => nomination.id === id);
    
    if (nominationIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Nomination not found' },
        { status: 404 }
      );
    }

    // Update nomination
    judgeNominations[nominationIndex] = {
      ...judgeNominations[nominationIndex],
      status,
      notes: notes || judgeNominations[nominationIndex].notes,
      admin_action: admin_action || judgeNominations[nominationIndex].admin_action,
      updated_at: new Date().toISOString(),
      reviewed: true
    };

    // If approved, potentially create a judge application entry
    if (status === 'approved') {
      console.log(`Nomination approved for ${judgeNominations[nominationIndex].nominee_email}`);
      // In production, this could trigger an automatic judge application creation
      // or send an invitation email to the nominee to apply directly
    }

    return NextResponse.json({
      success: true,
      message: 'Nomination status updated successfully',
      nomination: {
        id: judgeNominations[nominationIndex].id,
        nominee_name: judgeNominations[nominationIndex].nominee_full_name,
        status: judgeNominations[nominationIndex].status,
        updated_at: judgeNominations[nominationIndex].updated_at
      }
    });

  } catch (error) {
    console.error('Nomination status update error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE endpoint to remove nomination (for admin use)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Nomination ID is required' },
        { status: 400 }
      );
    }

    const nominationIndex = judgeNominations.findIndex(nomination => nomination.id === id);
    
    if (nominationIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Nomination not found' },
        { status: 404 }
      );
    }

    // Remove nomination
    const removedNomination = judgeNominations.splice(nominationIndex, 1)[0];

    return NextResponse.json({
      success: true,
      message: 'Nomination removed successfully',
      removed_nomination: {
        id: removedNomination.id,
        nominee_name: removedNomination.nominee_full_name,
        nominee_email: removedNomination.nominee_email
      }
    });

  } catch (error) {
    console.error('Nomination removal error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
