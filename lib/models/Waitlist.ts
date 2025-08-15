import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IWaitlist extends Document {
  name: string;
  email: string;
  phone: string;
  country: string;
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
  syncedToSheets: boolean;
  sheetRowId?: number;
}

export interface IWaitlistModel extends Model<IWaitlist> {
  getCategoryStats(): Promise<Array<{ _id: string; count: number }>>;
  getRecentSignups(limit?: number): Promise<IWaitlist[]>;
}

const WaitlistSchema = new Schema<IWaitlist>({
  name: {
    type: String,
    required: [true, 'Name is required'],
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
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
    minlength: [2, 'Country code must be at least 2 characters'],
    maxlength: [3, 'Country code cannot exceed 3 characters']
  },
  categories: [{
    type: String,
    required: true,
    enum: [
      'vote_nominate',
      'become_ambassador',
      'join_webinar_expo',
      'sponsor_csr_partner',
      'apply_judge',
      'join_local_chapter',
      'join_nesa_team',
      'apply_nrc_volunteer',
      'buy_merchandise',
      'get_gala_ticket',
      'donate'
    ]
  }],
  syncedToSheets: {
    type: Boolean,
    default: false
  },
  sheetRowId: {
    type: Number,
    required: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for faster queries
WaitlistSchema.index({ email: 1 }, { unique: true });
WaitlistSchema.index({ createdAt: -1 });
WaitlistSchema.index({ syncedToSheets: 1 });
WaitlistSchema.index({ country: 1 });
WaitlistSchema.index({ phone: 1 });

// Virtual for formatted categories
WaitlistSchema.virtual('formattedCategories').get(function() {
  const categoryLabels: { [key: string]: string } = {
    'vote_nominate': 'Vote or Nominate',
    'become_ambassador': 'Become Ambassador',
    'join_webinar_expo': 'Join Webinar/Expo',
    'sponsor_csr_partner': 'Sponsor or CSR Partner',
    'apply_judge': 'Apply as a Judge',
    'join_local_chapter': 'Join Local Chapter',
    'join_nesa_team': 'Join NESA Team',
    'apply_nrc_volunteer': 'Apply as NRC Volunteer',
    'buy_merchandise': 'Buy Merchandise',
    'get_gala_ticket': 'Get Gala Ticket',
    'donate': 'Donate'
  };
  
  return this.categories.map(cat => categoryLabels[cat] || cat);
});

// Pre-save middleware to ensure at least one category is selected
WaitlistSchema.pre('save', function(next) {
  if (this.categories.length === 0) {
    next(new Error('At least one category must be selected'));
  } else {
    next();
  }
});

// Static method to get category statistics
WaitlistSchema.statics.getCategoryStats = async function() {
  const pipeline: any[] = [
    { $unwind: '$categories' },
    { $group: { _id: '$categories', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ];
  
  return this.aggregate(pipeline);
};

// Static method to get recent signups
WaitlistSchema.statics.getRecentSignups = async function(limit = 10) {
  return this.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('name email phone country categories createdAt');
};

export default (mongoose.models.Waitlist as IWaitlistModel) || mongoose.model<IWaitlist, IWaitlistModel>('Waitlist', WaitlistSchema);