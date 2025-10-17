import { NextRequest, NextResponse } from "next/server";
import connectNRCDB from "@/lib/configs/nrcDatabase";
import NRCNominee from "@/lib/models/NRCNominee";
import NRCVolunteer from "@/lib/models/NRCVolunteer";
import AGCTransaction from "@/lib/models/AGCTransaction";
import { writeFile } from "fs/promises";
import { join } from "path";

export const dynamic = "force-dynamic";

// Helper function to save uploaded files
async function saveFile(file: File, folder: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Create unique filename
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${uniqueSuffix}-${file.name.replace(/\s/g, "-")}`;
  const filepath = join(process.cwd(), "public", "uploads", folder, filename);

  await writeFile(filepath, buffer);
  return `/uploads/${folder}/${filename}`;
}

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();

    // Extract fields
    const volunteerId = formData.get("volunteerId") as string;
    const fullName = formData.get("fullName") as string;
    const country = formData.get("country") as string;
    const region = formData.get("region") as string;
    const awardCategory = formData.get("awardCategory") as string;
    const subcategory = formData.get("subcategory") as string;
    const achievementSummary = formData.get("achievementSummary") as string;
    const impactMetrics = formData.get("impactMetrics") as string;
    const sdgAlignment = formData.get("sdgAlignment") as string;
    const agendaAlignment = formData.get("agendaAlignment") as string;
    const esgAlignment = formData.get("esgAlignment") as string;
    const status = (formData.get("status") as string) || "REVIEW";

    // Validate required fields
    if (
      !volunteerId ||
      !fullName ||
      !country ||
      !region ||
      !awardCategory ||
      !subcategory
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to NRC database
    const conn = await connectNRCDB();

    // Get models from the NRC connection
    const VolunteerModel = conn.models.NRCVolunteer || conn.model('NRCVolunteer', NRCVolunteer.schema);
    const NomineeModel = conn.models.NRCNominee || conn.model('NRCNominee', NRCNominee.schema);
    const TransactionModel = conn.models.AGCTransaction || conn.model('AGCTransaction', AGCTransaction.schema);

    // Verify volunteer exists
    const volunteer = await VolunteerModel.findOne({ userId: volunteerId });
    if (!volunteer) {
      return NextResponse.json(
        { success: false, message: "Volunteer not found" },
        { status: 404 }
      );
    }

    // Handle file uploads
    let profileImageUrl = "";
    const supportingDocuments: string[] = [];

    // Profile image
    const profileImage = formData.get("profileImage") as File;
    if (profileImage && profileImage.size > 0) {
      try {
        profileImageUrl = await saveFile(profileImage, "nominees/profiles");
      } catch (error) {
        console.error("Error saving profile image:", error);
      }
    }

    // Supporting documents
    const docs = formData.getAll("supportingDocuments") as File[];
    for (const doc of docs) {
      if (doc && doc.size > 0) {
        try {
          const docUrl = await saveFile(doc, "nominees/documents");
          supportingDocuments.push(docUrl);
        } catch (error) {
          console.error("Error saving document:", error);
        }
      }
    }

    // Create nominee
    const nominee = new NomineeModel({
      volunteerId,
      fullName,
      organizationName: formData.get("organizationName") as string,
      country,
      region,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      website: formData.get("website") as string,
      linkedinProfile: formData.get("linkedinProfile") as string,
      superAwardCategory: formData.get("superAwardCategory") as string,
      awardCategory,
      subcategory,
      achievementSummary,
      impactMetrics,
      beneficiariesCount: formData.get("beneficiariesCount") as string,
      yearsOfImpact: formData.get("yearsOfImpact") as string,
      sdgAlignment: sdgAlignment ? sdgAlignment.split(",") : [],
      agendaAlignment,
      esgAlignment,
      verificationLinks: formData.get("verificationLinks") as string,
      mediaLinks: formData.get("mediaLinks") as string,
      additionalNotes: formData.get("additionalNotes") as string,
      profileImageUrl,
      supportingDocuments,
      status,
      dateCreated: new Date(),
    });

    await nominee.save();

    // Update volunteer stats
    volunteer.nomineesUploaded += 1;
    volunteer.weeklyUploads += 1;

    if (status === "REVIEW") {
      volunteer.nomineesPending += 1;
    }

    volunteer.lastActive = new Date();
    await volunteer.save();

    // Award AGC for first 10 uploads
    if (volunteer.nomineesUploaded <= 10) {
      const agcAmount = 0.5;
      const transaction = new TransactionModel({
        volunteerId,
        type: "EARN",
        amount: agcAmount,
        description: `First 10 uploads bonus - Upload #${volunteer.nomineesUploaded}`,
        nominationId: (nominee._id as any).toString(),
        isWithdrawable: volunteer.nomineesUploaded > 5, // First 5 non-withdrawable
        status: "COMPLETED",
        timestamp: new Date(),
      });

      await transaction.save();

      volunteer.agcEarned += agcAmount;
      if (transaction.isWithdrawable) {
        volunteer.agcWithdrawable += agcAmount;
      } else {
        volunteer.agcNonWithdrawable += agcAmount;
      }

      await volunteer.save();
    }

    return NextResponse.json({
      success: true,
      message: "Nominee created successfully",
      data: {
        id: nominee._id,
        fullName: nominee.fullName,
        awardCategory: nominee.awardCategory,
        status: nominee.status,
        agcAwarded: volunteer.nomineesUploaded <= 10 ? 0.5 : 0,
      },
    });
  } catch (error: any) {
    console.error("Create nominee error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create nominee" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const volunteerId = searchParams.get("volunteerId");
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const conn = await connectNRCDB();

    // Get model from the NRC connection
    const NomineeModel = conn.models.NRCNominee || conn.model('NRCNominee', NRCNominee.schema);

    const query: any = {};
    if (volunteerId) query.volunteerId = volunteerId;
    if (status) query.status = status;
    if (category) query.awardCategory = category;

    const skip = (page - 1) * limit;

    const nominees = await NomineeModel.find(query)
      .sort({ dateCreated: -1 })
      .skip(skip)
      .limit(limit)
      .select("-__v");

    const total = await NomineeModel.countDocuments(query);

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
      },
    });
  } catch (error: any) {
    console.error("Get nominees error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to get nominees" },
      { status: 500 }
    );
  }
}
