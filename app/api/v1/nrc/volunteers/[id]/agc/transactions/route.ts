import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/configs/database';
import AGCTransaction from '@/lib/models/AGCTransaction';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const volunteerId = params.id;
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    await connectDB();

    const transactions = await AGCTransaction.getVolunteerTransactions(volunteerId, {
      type,
      page,
      limit
    });

    const total = await AGCTransaction.countDocuments({ 
      volunteerId,
      ...(type && { type })
    });

    return NextResponse.json({
      success: true,
      data: {
        transactions,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error: any) {
    console.error('Get transactions error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to get transactions' },
      { status: 500 }
    );
  }
}
