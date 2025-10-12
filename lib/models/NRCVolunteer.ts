import mongoose, { Document, Schema, Model } from "mongoose";

export interface INRCVolunteer extends Document {
  userId: string;
  fullName: string;
  email: string;
  phone?: string;
  country: string;
  region: string;
  coordinator?: string;
  teamLeadId?: string;
  displayName?: string;
  badge?: string;
  role: "volunteer" | "coordinator" | "team_lead" | "admin";
  status: "PENDING" | "ACTIVE" | "INACTIVE" | "SUSPENDED";

  // Statistics
  nomineesUploaded: number;
  nomineesVerified: number;
  nomineesPending: number;
  nomineesRejected: number;
  targetNominees: number;
  completionRate: number;

  // AGC Wallet
  agcEarned: number;
  agcWithdrawable: number;
  agcNonWithdrawable: number;

  // Gamification
  rank: number;
  level: string;
  weeklyUploads: number;
  lastWeeklyReset: Date;

  // Metadata
  approvalDate?: Date;
  lastActive: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface INRCVolunteerModel extends Model<INRCVolunteer> {
  getLeaderboard(
    type: "weekly" | "monthly" | "allTime",
    limit: number
  ): Promise<INRCVolunteer[]>;
  getVolunteerStats(volunteerId: string): Promise<any>;
}

const NRCVolunteerSchema = new Schema<INRCVolunteer>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    region: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    coordinator: {
      type: String,
      trim: true,
    },
    teamLeadId: {
      type: String,
      trim: true,
    },
    displayName: {
      type: String,
      trim: true,
    },
    badge: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["volunteer", "coordinator", "team_lead", "admin"],
      default: "volunteer",
    },
    status: {
      type: String,
      enum: ["PENDING", "ACTIVE", "INACTIVE", "SUSPENDED"],
      default: "ACTIVE",
      index: true,
    },
    nomineesUploaded: {
      type: Number,
      default: 0,
    },
    nomineesVerified: {
      type: Number,
      default: 0,
    },
    nomineesPending: {
      type: Number,
      default: 0,
    },
    nomineesRejected: {
      type: Number,
      default: 0,
    },
    targetNominees: {
      type: Number,
      default: 200,
    },
    completionRate: {
      type: Number,
      default: 0,
    },
    agcEarned: {
      type: Number,
      default: 0,
    },
    agcWithdrawable: {
      type: Number,
      default: 0,
    },
    agcNonWithdrawable: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 0,
    },
    level: {
      type: String,
      default: "Bronze",
    },
    weeklyUploads: {
      type: Number,
      default: 0,
    },
    lastWeeklyReset: {
      type: Date,
      default: Date.now,
    },
    approvalDate: {
      type: Date,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance (userId and email already indexed in schema)
NRCVolunteerSchema.index({ country: 1, status: 1 });
NRCVolunteerSchema.index({ nomineesUploaded: -1 });
NRCVolunteerSchema.index({ agcEarned: -1 });

// Static methods
NRCVolunteerSchema.statics.getLeaderboard = async function (
  type: "weekly" | "monthly" | "allTime" = "monthly",
  limit: number = 10
): Promise<INRCVolunteer[]> {
  const sortField = type === "weekly" ? "weeklyUploads" : "nomineesUploaded";

  return this.find({ status: "ACTIVE" })
    .sort({ [sortField]: -1, agcEarned: -1 })
    .limit(limit)
    .select(
      "fullName displayName country nomineesUploaded agcEarned rank level badge"
    );
};

NRCVolunteerSchema.statics.getVolunteerStats = async function (
  volunteerId: string
) {
  const volunteer = await this.findOne({ userId: volunteerId });

  if (!volunteer) {
    throw new Error("Volunteer not found");
  }

  return {
    totalUploads: volunteer.nomineesUploaded,
    verifiedUploads: volunteer.nomineesVerified,
    pendingUploads: volunteer.nomineesPending,
    rejectedUploads: volunteer.nomineesRejected,
    agcEarned: volunteer.agcEarned,
    agcWithdrawable: volunteer.agcWithdrawable,
    currentWeekUploads: volunteer.weeklyUploads,
    rank: volunteer.rank,
    level: volunteer.level,
    completionRate: volunteer.completionRate,
  };
};

// Instance methods
NRCVolunteerSchema.methods.updateStats = async function () {
  this.completionRate =
    this.targetNominees > 0
      ? Math.round((this.nomineesVerified / this.targetNominees) * 100)
      : 0;

  // Update level based on uploads
  if (this.nomineesVerified >= 200) {
    this.level = "Diamond";
  } else if (this.nomineesVerified >= 150) {
    this.level = "Platinum";
  } else if (this.nomineesVerified >= 100) {
    this.level = "Gold";
  } else if (this.nomineesVerified >= 50) {
    this.level = "Silver";
  } else {
    this.level = "Bronze";
  }

  await this.save();
};

export default (mongoose.models.NRCVolunteer as INRCVolunteerModel) ||
  mongoose.model<INRCVolunteer, INRCVolunteerModel>(
    "NRCVolunteer",
    NRCVolunteerSchema
  );
