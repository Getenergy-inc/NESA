import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Endorsement from '@/lib/models/Endorsement';
import { authenticateAdmin } from '@/lib/auth/admin'; // Placeholder for your admin auth middleware

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Uncomment the line below to secure the endpoint with admin authentication
    // await authenticateAdmin(request);
    await dbConnect();

    const { id } = params;
    const body = await request.json();
    const { status, featured } = body;

    if (!status && typeof featured !== 'boolean') {
      return NextResponse.json(
        { success: false, message: 'A valid status or featured flag must be provided.' },
        { status: 400 }
      );
    }

    const endorsement = await Endorsement.findById(id);

    if (!endorsement) {
      return NextResponse.json(
        { success: false, message: 'Endorsement not found' },
        { status: 404 }
      );
    }

    if (status) {
      endorsement.status = status;
      if (status === 'approved') {
        endorsement.approved_at = new Date().toISOString();
      }
    }

    if (typeof featured === 'boolean') {
      endorsement.featured = featured;
    }

    await endorsement.save();

    return NextResponse.json({ success: true, data: endorsement });
  } catch (error: any) {
    console.error('Error updating endorsement:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}