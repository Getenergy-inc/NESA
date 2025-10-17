import { NextRequest, NextResponse } from "next/server";
import connectNRCDB from "@/lib/configs/nrcDatabase";
import NRCNominee from "@/lib/models/NRCNominee";

export const dynamic = "force-dynamic";

// GET all public nominations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    const conn = await connectNRCDB();
    const NomineeModel =
      conn.models.NRCNominee || conn.model("NRCNominee", NRCNominee.schema);

    // Build query
    const query: any = { isPublicSubmission: true };
    if (status) query.status = status;
    if (category) query.awardCategory = category;

    // Get total count
    const total = await NomineeModel.countDocuments(query);

    // Get paginated results
    const nominees = await NomineeModel.find(query)
      .sort({ dateCreated: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Get statistics
    const stats = await NomineeModel.aggregate([
      { $match: { isPublicSubmission: true } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    return NextResponse.json({
      success: true,
      data: {
        nominees,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
        stats,
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
