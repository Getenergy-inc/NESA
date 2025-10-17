import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/configs/database';
import NRCTask from '@/lib/models/NRCTask';
import AGCTransaction from '@/lib/models/AGCTransaction';
import NRCVolunteer from '@/lib/models/NRCVolunteer';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const taskId = params.id;
    const body = await request.json();
    const { completionNotes, completedBy } = body;

    await connectDB();

    // Find task
    const task = await NRCTask.findById(taskId);
    if (!task) {
      return NextResponse.json(
        { success: false, message: 'Task not found' },
        { status: 404 }
      );
    }

    if (task.status === 'COMPLETED') {
      return NextResponse.json(
        { success: false, message: 'Task already completed' },
        { status: 400 }
      );
    }

    // Update task
    task.status = 'COMPLETED';
    task.completedBy = completedBy;
    task.completedDate = new Date();
    task.completionNotes = completionNotes;
    await task.save();

    // Award AGC if task has reward
    if (task.agcReward > 0 && completedBy) {
      const volunteer = await NRCVolunteer.findOne({ userId: completedBy });
      
      if (volunteer) {
        const transaction = new AGCTransaction({
          volunteerId: completedBy,
          type: 'EARN',
          amount: task.agcReward,
          description: `Task completion reward: ${task.title}`,
          isWithdrawable: true,
          status: 'COMPLETED',
          timestamp: new Date()
        });

        await transaction.save();

        volunteer.agcEarned += task.agcReward;
        volunteer.agcWithdrawable += task.agcReward;
        await volunteer.save();
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Task completed successfully',
      data: {
        id: task._id,
        status: task.status,
        completedDate: task.completedDate,
        agcAwarded: task.agcReward
      }
    });

  } catch (error: any) {
    console.error('Complete task error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to complete task' },
      { status: 500 }
    );
  }
}
