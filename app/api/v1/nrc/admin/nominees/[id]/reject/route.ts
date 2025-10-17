import { NextRequest, NextResponse } from "next/server";
import connectNRCDB from "@/lib/configs/nrcDatabase";
import NRCNominee from "@/lib/models/NRCNominee";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conn = await connectNRCDB();

    const { id } = params;
    const body = await request.json();
    const { reviewedBy, rejectionReason } = body;

    // Get model from the NRC connection
    const NomineeModel = conn.models.NRCNominee || conn.model('NRCNominee', NRCNominee.schema);

    // Find the nominee
    const nominee = await NomineeModel.findById(id);
    if (!nominee) {
      return NextResponse.json(
        { success: false, message: "Nominee not found" },
        { status: 404 }
      );
    }

    // Update nominee status
    nominee.status = "REJECTED";
    nominee.reviewedBy = reviewedBy;
    nominee.rejectionReason = rejectionReason;
    nominee.reviewDate = new Date();
    await nominee.save();

    return NextResponse.json({
      success: true,
      message: "Nominee rejected",
      data: { nominee },
    });
  } catch (error: any) {
    console.error("Error rejecting nominee:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to reject nominee",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
