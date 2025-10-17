import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/configs/database';
import NRCTask from '@/lib/models/NRCTask';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const volunteerId = params.id;
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    await connectDB();

    const query: any = { assignedTo: volunteerId };
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const skip = (page - 1) * limit;

    const tasks = await NRCTask.find(query)
      .sort({ deadline: 1, priority: -1 })
      .skip(skip)
      .limit(limit);

    const total = await NRCTask.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: {
        tasks,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error: any) {
    console.error('Get volunteer tasks error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to get tasks' },
      { status: 500 }
    );
  }
}
