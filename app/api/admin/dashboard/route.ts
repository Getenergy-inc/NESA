import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth/admin';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(' ')[1];
    const isAdmin = await verifyAdminToken(token);
    
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get endorsement statistics
    const [
      totalEndorsements,
      pendingVerification,
      pendingReview,
      approved,
      rejected,
      featured
    ] = await Promise.all([
      prisma.endorsement.count(),
      prisma.endorsement.count({ where: { status: 'pending_verification' } }),
      prisma.endorsement.count({ where: { status: 'pending_review' } }),
      prisma.endorsement.count({ where: { status: 'approved' } }),
      prisma.endorsement.count({ where: { status: 'rejected' } }),
      prisma.endorsement.count({ where: { status: 'approved', featured: true } })
    ]);
    
    // Return dashboard statistics
    return NextResponse.json({
      success: true,
      endorsements: {
        total: totalEndorsements,
        pending_verification: pendingVerification,
        pending_review: pendingReview,
        approved: approved,
        rejected: rejected,
        featured: featured
      }
    });
    
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}