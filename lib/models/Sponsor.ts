import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ISponsor extends Document {
  company_name: string;
  name: string;
  email: string;
  phone: string;
  Business_reg_no: string;
  company_logo?: string;
  company_website?: string;
  industry?: string;
  sponsorshipType?: string;
  proposedAmount?: number;
  additionalNotes?: string;
  selectedPlan?: {
    id: string;
    name: string;
    category: string;
    price: number;
    priceRange?: string;
    badge: string;
    color: string;
    details: string[];
  };
  status: string;
  verified: boolean;
  verification_token: string;
  created_at: string;
  updated_at: string;
  approved_at?: string;
  payment_status: string;
  payment_reference?: string;
  payment_method?: string;
  payment_amount?: number;
  payment_date?: string;
  payment_details?: {
    method: string;
    currencies: string[];
    processingTime: string;
  };
  syncedToSheets: boolean;
  sheetRowId?: number;
}

const SponsorSchema: Schema<ISponsor> = new Schema({
  company_name: { 
    type: String, 
    required: [true, 'Company name is required'],
    trim: true,
    minlength: [2, 'Company name must be at least 2 characters'],
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  name: { 
    type: String, 
    required: [true, 'Contact person name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'],
    trim: true,
    minlength: [10, 'Phone number must be at least 10 characters'],
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  Business_reg_no: { 
    type: String, 
    required: [true, 'Business registration number is required'],
    trim: true
  },
  company_logo: { type: String },
  company_website: { type: String },
  industry: { type: String },
  sponsorshipType: { type: String },
  proposedAmount: { type: Number },
  additionalNotes: { type: String },
  selectedPlan: {
    id: { type: String },
    name: { type: String },
    category: { type: String },
    price: { type: Number },
    priceRange: { type: String },
    badge: { type: String },
    color: { type: String },
    details: [{ type: String }]
  },
  status: { type: String, default: 'pending' },
  verified: { type: Boolean, default: false },
  verification_token: { type: String },
  created_at: { type: String, default: () => new Date().toISOString() },
  updated_at: { type: String, default: () => new Date().toISOString() },
  approved_at: { type: String },
  payment_status: { type: String, default: 'pending' },
  payment_reference: { type: String },
  payment_method: { type: String },
  payment_amount: { type: Number },
  payment_date: { type: String },
  payment_details: {
    method: { type: String },
    currencies: [{ type: String }],
    processingTime: { type: String }
  },
  syncedToSheets: { type: Boolean, default: false },
  sheetRowId: { type: Number }
});

// Add indexes for better query performance
SponsorSchema.index({ email: 1 }, { unique: true });
SponsorSchema.index({ status: 1, verified: 1 });
SponsorSchema.index({ created_at: -1 });
SponsorSchema.index({ payment_status: 1 });
SponsorSchema.index({ company_name: 1 });
SponsorSchema.index({ syncedToSheets: 1 });

interface ISponsorModel extends Model<ISponsor> {}

export default (mongoose.models.Sponsor as ISponsorModel) ||
  mongoose.model<ISponsor, ISponsorModel>('Sponsor', SponsorSchema);