import mongoose, { Document, Schema, Model } from 'mongoose';

export interface INRCNominee extends Document {
  volunteerId: string;
  
  // Basic Information
  fullName: string;
  organizationName?: string;
  country: string;
  region: string;
  
  // Contact Information
  email?: string;
  phone?: string;
  website?: string;
  linkedinProfile?: string;
  
  // Award Category
  superAwardCategory: string;
  awardCategory: string;
  subcategory: string;
  
  // Impact & Achievement
  achievementSummary: string;
  impactMetrics: string;
  beneficiariesCount?: string;
  yearsOfImpact?: string;
  
  // Alignment
  sdgAlignment: string[];
  agendaAlignment: string;
  esgAlignment: string;
  
  // Supporting Information
  verificationLinks?: string;
  mediaLinks?: string;
  additionalNotes?: string;
  
  // Files
  profileImageUrl?: string;
  supportingDocuments?: string[];
  
  // Status & Workflow
  status: 'DRAFT' | 'REVIEW' | 'VERIFIED' | 'REJECTED' | 'PUBLISHED';
  reviewedBy?: string;
  reviewDate?: Date;
  reviewNotes?: string;
  rejectionReason?: string;
  
  // AGC Rewards
  agcAwarded: number;
  agcAwardedDate?: Date;
  
  // Metadata
  dateCreated: Date;
  lastModified: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface INRCNomineeModel extends Model<INRCNominee> {
  getNomineesByVolunteer(volunteerId: string, filters?: any): Promise<INRCNominee[]>;
  getNomineesByStatus(status: string): Promise<INRCNominee[]>;
  getStatsByVolunteer(volunteerId: string): Promise<any>;
}

const NRCNomineeSchema = new Schema<INRCNominee>({
  volunteerId: {
    type: String,
    required: true,
    index: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  organizationName: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  region: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  linkedinProfile: {
    type: String,
    trim: true
  },
  superAwardCategory: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  awardCategory: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  subcategory: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  achievementSummary: {
    type: String,
    required: true
  },
  impactMetrics: {
    type: String,
    required: true
  },
  beneficiariesCount: {
    type: String,
    trim: true
  },
  yearsOfImpact: {
    type: String,
    trim: true
  },
  sdgAlignment: [{
    type: String,
    trim: true
  }],
  agendaAlignment: {
    type: String,
    required: true
  },
  esgAlignment: {
    type: String,
    required: true
  },
  verificationLinks: {
    type: String
  },
  mediaLinks: {
    type: String
  },
  additionalNotes: {
    type: String
  },
  profileImageUrl: {
    type: String
  },
  supportingDocuments: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['DRAFT', 'REVIEW', 'VERIFIED', 'REJECTED', 'PUBLISHED'],
    default: 'REVIEW',
    index: true
  },
  reviewedBy: {
    type: String
  },
  reviewDate: {
    type: Date
  },
  reviewNotes: {
    type: String
  },
  rejectionReason: {
    type: String
  },
  agcAwarded: {
    type: Number,
    default: 0
  },
  agcAwardedDate: {
    type: Date
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for performance
NRCNomineeSchema.index({ volunteerId: 1, status: 1 });
NRCNomineeSchema.index({ country: 1, awardCategory: 1 });
NRCNomineeSchema.index({ status: 1, dateCreated: -1 });
NRCNomineeSchema.index({ fullName: 'text', achievementSummary: 'text' });

// Static methods
NRCNomineeSchema.statics.getNomineesByVolunteer = async function(
  volunteerId: string,
  filters?: any
): Promise<INRCNominee[]> {
  const query: any = { volunteerId };
  
  if (filters?.status) {
    query.status = filters.status;
  }
  if (filters?.category) {
    query.awardCategory = filters.category;
  }
  if (filters?.country) {
    query.country = filters.country;
  }
  
  return this.find(query)
    .sort({ dateCreated: -1 })
    .limit(filters?.limit || 100);
};

NRCNomineeSchema.statics.getNomineesByStatus = async function(
  status: string
): Promise<INRCNominee[]> {
  return this.find({ status })
    .sort({ dateCreated: -1 });
};

NRCNomineeSchema.statics.getStatsByVolunteer = async function(volunteerId: string) {
  const stats = await this.aggregate([
    { $match: { volunteerId } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
  
  const result = {
    total: 0,
    draft: 0,
    review: 0,
    verified: 0,
    rejected: 0,
    published: 0
  };
  
  stats.forEach((stat: any) => {
    result.total += stat.count;
    result[stat._id.toLowerCase() as keyof typeof result] = stat.count;
  });
  
  return result;
};

// Pre-save middleware
NRCNomineeSchema.pre('save', function(next) {
  this.lastModified = new Date();
  next();
});

export default mongoose.models.NRCNominee as INRCNomineeModel || 
  mongoose.model<INRCNominee, INRCNomineeModel>('NRCNominee', NRCNomineeSchema);
