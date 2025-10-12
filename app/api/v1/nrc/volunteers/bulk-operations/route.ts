import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/configs/database';
import NRCVolunteer from '@/lib/models/NRCVolunteer';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { operation, volunteerIds, data, reason } = body;

    if (!operation || !volunteerIds || !Array.isArray(volunteerIds)) {
      return NextResponse.json(
        { success: false, message: 'Operation and volunteerIds array are required' },
        { status: 400 }
      );
    }

    await connectDB();

    let result;
    let message = '';

    switch (operation) {
      case 'activate':
        result = await NRCVolunteer.updateMany(
          { userId: { $in: volunteerIds } },
          { $set: { status: 'ACTIVE', isActive: true } }
        );
        message = `Activated ${result.modifiedCount} volunteers`;
        break;

      case 'deactivate':
        result = await NRCVolunteer.updateMany(
          { userId: { $in: volunteerIds } },
          { $set: { status: 'INACTIVE', isActive: false } }
        );
        message = `Deactivated ${result.modifiedCount} volunteers`;
        break;

      case 'suspend':
        result = await NRCVolunteer.updateMany(
          { userId: { $in: volunteerIds } },
          { $set: { status: 'SUSPENDED', isActive: false } }
        );
        message = `Suspended ${result.modifiedCount} volunteers`;
        break;

      case 'updateRole':
        if (!data || !data.role) {
          return NextResponse.json(
            { success: false, message: 'Role is required for updateRole operation' },
            { status: 400 }
          );
        }
        result = await NRCVolunteer.updateMany(
          { userId: { $in: volunteerIds } },
          { $set: { role: data.role } }
        );
        message = `Updated role to ${data.role} for ${result.modifiedCount} volunteers`;
        break;

      case 'assignCoordinator':
        if (!data || !data.coordinator) {
          return NextResponse.json(
            { success: false, message: 'Coordinator is required for assignCoordinator operation' },
            { status: 400 }
          );
        }
        result = await NRCVolunteer.updateMany(
          { userId: { $in: volunteerIds } },
          { $set: { coordinator: data.coordinator } }
        );
        message = `Assigned coordinator to ${result.modifiedCount} volunteers`;
        break;

      case 'updateTarget':
        if (!data || !data.targetNominees) {
          return NextResponse.json(
            { success: false, message: 'Target nominees count is required' },
            { status: 400 }
          );
        }
        result = await NRCVolunteer.updateMany(
          { userId: { $in: volunteerIds } },
          { $set: { targetNominees: data.targetNominees } }
        );
        message = `Updated target to ${data.targetNominees} for ${result.modifiedCount} volunteers`;
        break;

      case 'delete':
        result = await NRCVolunteer.deleteMany(
          { userId: { $in: volunteerIds } }
        );
        message = `Deleted ${result.deletedCount} volunteers`;
        break;

      default:
        return NextResponse.json(
          { success: false, message: `Unknown operation: ${operation}` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message,
      data: {
        operation,
        affectedCount: result.modifiedCount || result.deletedCount || 0,
        volunteerIds,
        reason
      }
    });

  } catch (error: any) {
    console.error('Bulk operation error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to perform bulk operation' },
      { status: 500 }
    );
  }
}
