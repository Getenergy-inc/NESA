import { NextRequest, NextResponse } from "next/server";
import connectNRCDB from "@/lib/configs/nrcDatabase";
import NRCNominee from "@/lib/models/NRCNominee";
import { writeFile } from "fs/promises";
import { join } from "path";

export const dynamic = "force-dynamic";

// Simple rate limiting (in-memory, for production use Redis)
const submissionTracker = new Map<string, number[]>();

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxSubmissions = 3; // Max 3 submissions per hour

  const submissions = submissionTracker.get(identifier) || [];
  const recentSubmissions = submissions.filter((time) => now - time < windowMs);

  if (recentSubmissions.length >= maxSubmissions) {
    return false;
  }

  recentSubmissions.push(now);
  submissionTracker.set(identifier, recentSubmissions);
  return true;
}

// Check for duplicate submissions
async function checkDuplicate(
  NomineeModel: any,
  nomineeEmail: string,
  nomineeName: string,
  category: string
): Promise<boolean> {
  const recentSubmission = await NomineeModel.findOne({
    $or: [
      { email: nomineeEmail?.toLowerCase() },
      {
        fullName: { $regex: new RegExp(`^${nomineeName}$`, "i") },
        awardCategory: category,
      },
    ],
    dateCreated: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // Last 24 hours
  });

  return !!recentSubmission;
}

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
    // Check if request is FormData or JSON
    const contentType = request.headers.get("content-type");
    let body: any;
    let profileImage: File | null = null;

    if (contentType?.includes("multipart/form-data")) {
      // Handle FormData (with image)
      const formData = await request.formData();

      // Extract file
      const imageFile = formData.get("profileImage") as File | null;
      if (imageFile && imageFile.size > 0) {
        profileImage = imageFile;
      }

      // Extract other fields
      body = {};
      for (const [key, value] of formData.entries()) {
        if (key !== "profileImage") {
          body[key] = value;
        }
      }
    } else {
      // Handle JSON (no image)
      body = await request.json();
    }

    // Extract fields
    const {
      // Nominee Information
      fullName,
      organizationName,
      country,
      region,
      email,
      phone,
      website,

      // Award Category
      superAwardCategory,
      awardCategory,
      subcategory,

      // Achievement
      achievementSummary,
      whyDeserving,
      impactDescription,

      // Nominator Information
      nominatorName,
      nominatorEmail,
      nominatorPhone,
      nominatorRelationship,

      // Optional
      verificationLinks,
      additionalNotes,
    } = body;

    // Validate required fields
    if (
      !fullName ||
      !country ||
      !awardCategory ||
      !subcategory ||
      !achievementSummary ||
      !nominatorEmail
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields. Please provide nominee name, country, category, achievement summary, and your email.",
        },
        { status: 400 }
      );
    }

    // Rate limiting by nominator email
    const rateLimitKey = nominatorEmail.toLowerCase();
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many submissions. Please wait an hour before submitting again.",
        },
        { status: 429 }
      );
    }

    // Connect to database
    const conn = await connectNRCDB();

    // Force delete and recreate the model to ensure schema is up to date
    if (conn.models.NRCNominee) {
      delete conn.models.NRCNominee;
    }

    const NomineeModel = conn.model("NRCNominee", NRCNominee.schema);

    // Check for duplicates
    if (email) {
      const isDuplicate = await checkDuplicate(
        NomineeModel,
        email,
        fullName,
        awardCategory
      );
      if (isDuplicate) {
        return NextResponse.json(
          {
            success: false,
            message:
              "This nominee has already been submitted recently. Please check existing nominations.",
          },
          { status: 409 }
        );
      }
    }

    // Handle image upload
    let profileImageUrl = "";
    if (profileImage) {
      try {
        profileImageUrl = await saveFile(profileImage, "nominees/profiles");
      } catch (error) {
        console.error("Error saving profile image:", error);
        // Continue without image if upload fails
      }
    }

    // Create public nomination - omit volunteerId entirely for public submissions
    const nomineeData: any = {
      // Nominee details
      fullName: fullName.trim(),
      organizationName: organizationName?.trim(),
      country: country.trim(),
      region: region?.trim() || "Not specified",
      email: email?.toLowerCase().trim(),
      phone: phone?.trim(),
      website: website?.trim(),

      // Category
      superAwardCategory: superAwardCategory || "blue-garnet-gold-certificate",
      awardCategory: awardCategory.trim(),
      subcategory: subcategory.trim(),

      // Achievement
      achievementSummary: achievementSummary.trim(),
      impactMetrics: impactDescription?.trim() || whyDeserving?.trim(),

      // Alignment (optional for public nominations)
      sdgAlignment: [],
      agendaAlignment: "To be reviewed",
      esgAlignment: "To be reviewed",

      // Supporting info
      verificationLinks: verificationLinks?.trim(),
      additionalNotes: additionalNotes?.trim(),
      profileImageUrl: profileImageUrl || undefined,

      // Nominator info
      nominatorName: nominatorName?.trim(),
      nominatorEmail: nominatorEmail.toLowerCase().trim(),
      nominatorPhone: nominatorPhone?.trim(),
      nominatorRelationship: nominatorRelationship?.trim(),

      // Status flags
      status: "PUBLIC_NOMINATION",
      isPublicSubmission: true,
      // Don't include volunteerId at all for public nominations

      // Metadata
      dateCreated: new Date(),
      agcAwarded: 0,
    };

    const nominee = new NomineeModel(nomineeData);

    await nominee.save();

    // Send confirmation emails (don't wait for them to complete)
    try {
      const { sendNominationEmails } = await import(
        "@/lib/services/emailService"
      );
      const { getCategoryLabel, getSubcategoryLabel } = await import(
        "@/lib/configs/awardCategories"
      );

      // Send emails in background
      sendNominationEmails({
        nomineeName: fullName.trim(),
        nomineeEmail: email?.toLowerCase().trim() || "",
        nominatorName: nominatorName?.trim() || "Anonymous",
        nominatorEmail: nominatorEmail.toLowerCase().trim(),
        category: getCategoryLabel(awardCategory.trim()),
        subcategory: getSubcategoryLabel(
          awardCategory.trim(),
          subcategory.trim()
        ),
        achievement: achievementSummary.trim(),
      }).catch((err) => console.error("Failed to send emails:", err));

      console.log("Email sending initiated");
    } catch (emailError) {
      console.error("Email service error:", emailError);
      // Don't fail the nomination if email setup fails
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you! Your nomination has been submitted successfully and will be reviewed by our team.",
      data: {
        id: nominee._id,
        fullName: nominee.fullName,
        category: nominee.awardCategory,
        status: nominee.status,
      },
    });
  } catch (error: any) {
    console.error("Public nomination error:", error);

    // Check if it's a schema validation error
    if (error.name === "ValidationError") {
      const errors = Object.keys(error.errors || {});

      // If it's the volunteerId or status error, provide helpful message
      if (errors.includes("volunteerId") || errors.includes("status")) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Server configuration error. Please restart the development server to apply schema changes. See RESTART_SERVER_REQUIRED.md for instructions.",
            error: error.message,
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error.message || "Failed to submit nomination. Please try again.",
      },
      { status: 500 }
    );
  }
}

// Get public nomination statistics
export async function GET(request: NextRequest) {
  try {
    const conn = await connectNRCDB();
    const NomineeModel =
      conn.models.NRCNominee || conn.model("NRCNominee", NRCNominee.schema);

    const stats = await NomineeModel.aggregate([
      { $match: { isPublicSubmission: true } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalPublic = await NomineeModel.countDocuments({
      isPublicSubmission: true,
    });

    return NextResponse.json({
      success: true,
      data: {
        total: totalPublic,
        byStatus: stats,
      },
    });
  } catch (error: any) {
    console.error("Get public nomination stats error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
