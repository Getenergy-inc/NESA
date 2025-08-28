import { NextRequest, NextResponse } from 'next/server';
import { sendApprovalEmail, sendRejectionEmail } from '@/lib/email/endorsementVerification';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;

// Reference to the endorsements array (in a real app, this would be a database)
// This is just for demonstration - in a real app, you'd use a proper database
import { endorsements } from '../../endorse/submit/route';

// Admin authentication middleware (simplified for demo)
const isAdmin = (request: NextRequest): boolean => {
  // In a real app, you would check for admin authentication
  // For now, we'll just check for a mock admin token
  const authHeader = request.headers.get('authorization');
  return authHeader === 'Bearer admin-token-123';
};

// GET all endorsements (admin only)
export async function GET(request: NextRequest) {
  // Check admin authentication
  if (!isAdmin(request)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let filteredEndorsements = [...endorsements];
    
    // Filter by status if provided
    if (status) {
      filteredEndorsements = filteredEndorsements.filter(e => e.status === status);
    }
    
    // Sort by creation date (newest first)
    filteredEndorsements.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    
    return NextResponse.json({
      success: true,
      endorsements: filteredEndorsements,
      total: filteredEndorsements.length,
      statuses: {
        pending_verification: endorsements.filter(e => e.status === 'pending_verification').length,
        pending_review: endorsements.filter(e => e.status === 'pending_review').length,
        approved: endorsements.filter(e => e.status === 'approved').length,
        rejected: endorsements.filter(e => e.status === 'rejected').length
      }
    });
    
  } catch (error) {
    console.error('Error retrieving endorsements:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST to update endorsement status (admin only)
export async function POST(request: NextRequest) {
  // Check admin authentication
  if (!isAdmin(request)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { id, action, reason } = body;
    
    if (!id || !action) {
      return NextResponse.json(
        { success: false, message: 'Endorsement ID and action are required' },
        { status: 400 }
      );
    }
    
    // Find the endorsement
    const endorsementIndex = endorsements.findIndex(e => e.id === id);
    
    if (endorsementIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Endorsement not found' },
        { status: 404 }
      );
    }
    
    const endorsement = endorsements[endorsementIndex];
    
    // Process the action
    switch (action) {
      case 'approve':
        // Check if the endorsement is ready for approval
        if (endorsement.status !== 'pending_review' || !endorsement.verified) {
          return NextResponse.json(
            { success: false, message: 'Endorsement is not ready for approval' },
            { status: 400 }
          );
        }
        
        // Update the endorsement
        endorsements[endorsementIndex] = {
          ...endorsement,
          status: 'approved',
          approved_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        // Send approval email
        await sendApprovalEmail({
          email: endorsement.email,
          name: endorsement.contact_person_name,
          organization: endorsement.organization_name,
          endorsementId: endorsement.id
        });
        
        break;
        
      case 'reject':
        // Check if the endorsement is ready for rejection
        if (!['pending_verification', 'pending_review'].includes(endorsement.status)) {
          return NextResponse.json(
            { success: false, message: 'Endorsement cannot be rejected in its current state' },
            { status: 400 }
          );
        }
        
        if (!reason) {
          return NextResponse.json(
            { success: false, message: 'Reason for rejection is required' },
            { status: 400 }
          );
        }
        
        // Update the endorsement
        endorsements[endorsementIndex] = {
          ...endorsement,
          status: 'rejected',
          rejection_reason: reason,
          updated_at: new Date().toISOString()
        };
        
        // Send rejection email
        await sendRejectionEmail({
          email: endorsement.email,
          name: endorsement.contact_person_name,
          organization: endorsement.organization_name,
          endorsementId: endorsement.id,
          reason
        });
        
        break;
        
      case 'feature':
        // Check if the endorsement is approved
        if (endorsement.status !== 'approved') {
          return NextResponse.json(
            { success: false, message: 'Only approved endorsements can be featured' },
            { status: 400 }
          );
        }
        
        // Update the endorsement
        endorsements[endorsementIndex] = {
          ...endorsement,
          featured: true,
          updated_at: new Date().toISOString()
        };
        
        break;
        
      case 'unfeature':
        // Update the endorsement
        endorsements[endorsementIndex] = {
          ...endorsement,
          featured: false,
          updated_at: new Date().toISOString()
        };
        
        break;
        
      default:
        return NextResponse.json(
          { success: false, message: 'Invalid action' },
          { status: 400 }
        );
    }
    
    return NextResponse.json({
      success: true,
      message: `Endorsement ${action}d successfully`,
      endorsement: endorsements[endorsementIndex]
    });
    
  } catch (error) {
    console.error('Error updating endorsement:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}