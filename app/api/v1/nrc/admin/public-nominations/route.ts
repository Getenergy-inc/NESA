import { NextRequest, NextResponse } from "next/server";
import connectNRCDB from "@/lib/configs/nrcDatabase";
import NRCNominee from "@/lib/models/NRCNominee";

export const dynamic = "force-dynamic";

// Get all public nominations with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "PUBLIC_NOMINATION";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search");

    const conn = await connectNRCDB();
    const NomineeModel = conn.models.NRCNominee || conn.model('NRCNominee', NRCNominee.schema);

    const query: any = { isPublicSubmission: true };
    
    if (status && status !== 'ALL') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { nominatorName: { $regex: search, $options: 'i' } },
        { nominatorEmail: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [nominations, total] = await Promise.all([
      NomineeModel.find(query)
        .sort({ dateCreated: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      NomineeModel.countDocuments(query)
    ]);

    // Get statistics
    const stats = await NomineeModel.aggregate([
      { $match: { isPublicSubmission: true } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const statsMap = stats.reduce((acc: any, stat: any) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      data: {
        nominations,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
        stats: statsMap,
      },
    });
  } catch (error: any) {
    console.error("Get public nominations error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
