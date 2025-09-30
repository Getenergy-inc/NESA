import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Endorsement from '@/lib/models/Endorsement';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const type = searchParams.get('type') || 'all';
    const paymentStatus = searchParams.get('paymentStatus') || 'all';
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build query
    const query: any = {};

    if (status !== 'all') {
      query.status = status;
    }

    if (type !== 'all') {
      query.endorsement_type = type;
    }

    if (paymentStatus !== 'all') {
      if (paymentStatus === 'paid') {
        query.endorsement_type = 'paid';
      } else if (paymentStatus === 'unpaid') {
        query.$or = [
          { endorsement_type: 'free' },
          { payment_verified: false }
        ];
      } else if (paymentStatus === 'verified') {
        query.payment_verified = true;
      } else if (paymentStatus === 'pending') {
        query.payment_verified = false;
        query.endorsement_type = 'paid';
      }
    }

    // Search functionality
    if (search) {
      query.$or = [
        { organization_name: { $regex: search, $options: 'i' } },
        { contact_person_name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } }
      ];
    }

    // Get total count
    const total = await Endorsement.countDocuments(query);

    // Get endorsements with pagination
    const endorsements = await Endorsement.find(query)
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-__v');

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      endorsements,
      pagination: {
        total,
        page,
        limit,
        pages: totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching endorsements:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { id, status, admin_notes, featured }: any = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Endorsement ID is required' },
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

    // Update fields
    if (status) {
      endorsement.status = status;
      if (status === 'approved') {
        endorsement.approved_at = new Date().toISOString();
      }
    }

    if (admin_notes !== undefined) {
      (endorsement as any).admin_notes = admin_notes;
    }

    if (featured !== undefined) {
      endorsement.featured = featured;
    }

    endorsement.updated_at = new Date().toISOString();

    await endorsement.save();

    return NextResponse.json({
      success: true,
      endorsement,
      message: 'Endorsement updated successfully'
    });

  } catch (error) {
    console.error('Error updating endorsement:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Endorsement ID is required' },
        { status: 400 }
      );
    }

    const endorsement = await Endorsement.findByIdAndDelete(id);

    if (!endorsement) {
      return NextResponse.json(
        { success: false, message: 'Endorsement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Endorsement deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting endorsement:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}