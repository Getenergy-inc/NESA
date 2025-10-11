import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/configs/database';
import NRCTask from '@/lib/models/NRCTask';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      volunteerId,
      title,
      description,
      assignedTo,
      priority,
      deadline,
      agcReward,
      category,
      country,
      region
    } = body;

    if (!title || !description || !assignedTo || !deadline || !category) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    const task = new NRCTask({
      title,
      description,
      assignedTo: Array.isArray(assignedTo) ? assignedTo : [assignedTo],
      createdBy: volunteerId || 'system',
      priority: priority || 'medium',
      deadline: new Date(deadline),
      category,
      agcReward: agcReward || 0,
      country,
      region,
      status: 'PENDING'
    });

    await task.save();

    return NextResponse.json({
      success: true,
      message: 'Task created successfully',
      data: {
        id: task._id,
        title: task.title,
        assignedTo: task.assignedTo,
        deadline: task.deadline,
        status: task.status
      }
    });

  } catch (error: any) {
    console.error('Create task error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create task' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const volunteerId = searchParams.get('volunteerId');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    await connectDB();

    const query: any = {};
    if (volunteerId) query.assignedTo = volunteerId;
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const skip = (page - 1) * limit;

    const tasks = await NRCTask.find(query)
      .sort({ deadline: 1, priority: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

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
    console.error('Get tasks error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to get tasks' },
      { status: 500 }
    );
  }
}
