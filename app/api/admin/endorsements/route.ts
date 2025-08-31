import { NextRequest, NextResponse } from 'next/server';
import { sendApprovalEmail, sendRejectionEmail } from '@/lib/email/endorsementVerification';
import { prisma } from '@/lib/prisma';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;

// Admin authentication middleware (uses env token)
const isAdmin = (request: NextRequest): boolean => {
  // Expect the Authorization header to carry the admin token
  const authHeader = request.headers.get('authorization');
  const expectedToken = process.env.ADMIN_TOKEN || 'admin-token-123';
  return authHeader === `Bearer ${expectedToken}`;
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
    
    // Build where clause for filtering
    const whereClause: any = {};
    if (status) {
      whereClause.status = status;
    }
    
    // Get all endorsements with filter
    const endorsements = await prisma.endorsement.findMany({
      where: whereClause,
      orderBy: {
        created_at: 'desc'
      }
    });
    
    // Get counts for each status
    const statusCounts = await prisma.$transaction([
      prisma.endorsement.count({ where: { status: 'pending_verification' } }),
      prisma.endorsement.count({ where: { status: 'pending_review' } }),
      prisma.endorsement.count({ where: { status: 'approved' } }),
      prisma.endorsement.count({ where: { status: 'rejected' } })
    ]);
    
    return NextResponse.json({
      success: true,
      endorsements,
      total: endorsements.length,
      statuses: {
        pending_verification: statusCounts[0],
        pending_review: statusCounts[1],
        approved: statusCounts[2],
        rejected: statusCounts[3]
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
    const endorsement = await prisma.endorsement.findUnique({
      where: { id }
    });
    
    if (!endorsement) {
      return NextResponse.json(
        { success: false, message: 'Endorsement not found' },
        { status: 404 }
      );
    }
    
    let updatedEndorsement;
    
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
        updatedEndorsement = await prisma.endorsement.update({
          where: { id },
          data: {
            status: 'approved',
            approved_at: new Date(),
            updated_at: new Date()
          }
        });
        
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
        updatedEndorsement = await prisma.endorsement.update({
          where: { id },
          data: {
            status: 'rejected',
            rejection_reason: reason,
            updated_at: new Date()
          }
        });
        
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
        updatedEndorsement = await prisma.endorsement.update({
          where: { id },
          data: {
            featured: true,
            updated_at: new Date()
          }
        });
        
        break;
        
      case 'unfeature':
        // Update the endorsement
        updatedEndorsement = await prisma.endorsement.update({
          where: { id },
          data: {
            featured: false,
            updated_at: new Date()
          }
        });
        
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
      endorsement: updatedEndorsement
    });
    
  } catch (error) {
    console.error('Error updating endorsement:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}