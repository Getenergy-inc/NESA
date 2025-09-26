import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IEndorsement extends Document {
  organization_name: string;
  contact_person_name: string;
  email: string;
  phone: string;
  country: string;
  website?: string;
  endorser_category: string;
  endorsement_type: string;
  endorsement_tier?: string;
  payment_method?: string;
  payment_reference?: string;
  payment_verified: boolean;
  payment_date?: string;
  endorsement_headline: string;
  endorsement_statement: string;
  logo_file?: string;
  video_file?: string;
  video_link?: string;
  consent_to_publish: boolean;
  authorized_to_submit: boolean;
  digital_signature: string;
  user_id?: string;
  submitted_by?: string;
  status: string;
  verified: boolean;
  verification_token: string;
  created_at: string;
  updated_at: string;
  approved_at?: string;
  certificate_generated: boolean;
  featured: boolean;
}

const EndorsementSchema: Schema<IEndorsement> = new Schema({
  organization_name: { type: String, required: true },
  contact_person_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  website: { type: String },
  endorser_category: { type: String, required: true },
  endorsement_type: { type: String, required: true },
  endorsement_tier: { type: String },
  payment_method: { type: String },
  payment_reference: { type: String },
  payment_verified: { type: Boolean, default: false },
  payment_date: { type: String },
  endorsement_headline: { type: String, required: true },
  endorsement_statement: { type: String, required: true },
  video_file: { type: String },
  video_link: { type: String },
  consent_to_publish: { type: Boolean, required: true },
  authorized_to_submit: { type: Boolean, required: true },
  digital_signature: { type: String, required: true },
  user_id: { type: String },
  submitted_by: { type: String },
  status: { type: String, default: 'pending_review' },
  verified: { type: Boolean, default: false },
  verification_token: { type: String },
  created_at: { type: String, default: () => new Date().toISOString() },
  updated_at: { type: String, default: () => new Date().toISOString() },
  approved_at: { type: String },
  certificate_generated: { type: Boolean, default: false },
  featured: { type: Boolean, default: false }
});

// Add indexes for better query performance
EndorsementSchema.index({ status: 1, verified: 1 });
EndorsementSchema.index({ approved_at: -1 });
EndorsementSchema.index({ endorser_category: 1 });
EndorsementSchema.index({ country: 1 });
EndorsementSchema.index({ featured: 1 });

interface IEndorsementModel extends Model<IEndorsement> {
  
}

export default (mongoose.models.Endorsement as IEndorsementModel) ||
  mongoose.model<IEndorsement, IEndorsementModel>('Endorsement', EndorsementSchema);