import { NextRequest, NextResponse } from "next/server";
import connectNRCDB from "@/lib/configs/nrcDatabase";
import NRCNominee from "@/lib/models/NRCNominee";

export const dynamic = "force-dynamic";

// Update public nomination status
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { action, reviewNotes, rejectionReason } = body;

    const conn = await connectNRCDB();
    const NomineeModel = conn.models.NRCNominee || conn.model('NRCNominee', NRCNominee.schema);

    const nominee = await NomineeModel.findById(id);
    if (!nominee) {
      return NextResponse.json(
        { success: false, message: "Nomination not found" },
        { status: 404 }
      );
    }

    if (!nominee.isPublicSubmission) {
      return NextResponse.json(
        { success: false, message: "Not a public nomination" },
        { status: 400 }
      );
    }

    let newStatus = nominee.status;
    let message = "";

    switch (action) {
      case 'APPROVE':
        newStatus = 'REVIEW';
        message = "Public nomination approved and moved to review queue";
        break;
      case 'REJECT':
        newStatus = 'REJECTED';
        nominee.rejectionReason = rejectionReason || 'Does not meet criteria';
        message = "Public nomination rejected";
        break;
      case 'REQUEST_INFO':
        // Keep as PUBLIC_NOMINATION but add notes
        message = "Information requested from nominator";
        break;
      case 'UPGRADE':
        newStatus = 'VERIFIED';
        message = "Public nomination upgraded to verified nominee";
        break;
      default:
        return NextResponse.json(
          { success: false, message: "Invalid action" },
          { status: 400 }
        );
    }

    nominee.status = newStatus;
    nominee.reviewNotes = reviewNotes || nominee.reviewNotes;
    nominee.reviewDate = new Date();
    nominee.lastModified = new Date();

    await nominee.save();

    // TODO: Send email notification to nominator

    return NextResponse.json({
      success: true,
      message,
      data: nominee,
    });
  } catch (error: any) {
    console.error("Update public nomination error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Delete public nomination
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const conn = await connectNRCDB();
    const NomineeModel = conn.models.NRCNominee || conn.model('NRCNominee', NRCNominee.schema);

    const nominee = await NomineeModel.findById(id);
    if (!nominee) {
      return NextResponse.json(
        { success: false, message: "Nomination not found" },
        { status: 404 }
      );
    }

    if (!nominee.isPublicSubmission) {
      return NextResponse.json(
        { success: false, message: "Not a public nomination" },
        { status: 400 }
      );
    }

    await NomineeModel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Public nomination deleted",
    });
  } catch (error: any) {
    console.error("Delete public nomination error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
