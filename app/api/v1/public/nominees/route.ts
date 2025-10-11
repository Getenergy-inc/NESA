import { NextRequest, NextResponse } from "next/server";
import connectNRCDB from "@/lib/configs/nrcDatabase";
import NRCNominee from "@/lib/models/NRCNominee";

export async function GET(request: NextRequest) {
  try {
    const conn = await connectNRCDB();

    // Get model from the NRC connection
    const NomineeModel =
      conn.models.NRCNominee || conn.model("NRCNominee", NRCNominee.schema);

    const searchParams = request.nextUrl.searchParams;
    const awardCategory = searchParams.get("awardCategory");
    const subcategory = searchParams.get("subcategory");

    console.log("Public API Query:", { awardCategory, subcategory });

    // Build query - only fetch VERIFIED or PUBLISHED nominees
    const query: any = {
      status: { $in: ["VERIFIED", "PUBLISHED"] },
    };

    if (awardCategory) {
      query.awardCategory = awardCategory;
    }

    if (subcategory) {
      query.subcategory = subcategory;
    }

    console.log("Database query:", query);

    // Fetch nominees from database
    const nominees = await NomineeModel.find(query)
      .sort({ dateCreated: -1 })
      .select(
        "fullName organizationName profileImageUrl achievementSummary country region awardCategory subcategory"
      )
      .lean();

    console.log("Found nominees:", nominees.length);

    // Transform to match the display format
    const transformedNominees = nominees.map((nominee: any) => ({
      name: nominee.fullName,
      image: nominee.profileImageUrl || "/images/nesa-card2.png", // fallback image
      achievement: nominee.achievementSummary,
      state: nominee.region,
      country: nominee.country,
      organization: nominee.organizationName,
      source: "nrc", // Mark as coming from NRC database
    }));

    return NextResponse.json({
      success: true,
      count: transformedNominees.length,
      nominees: transformedNominees,
    });
  } catch (error: any) {
    console.error("Error fetching public nominees:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch nominees",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
