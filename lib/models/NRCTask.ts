import mongoose, { Document, Schema, Model } from 'mongoose';

export interface INRCTask extends Document {
  title: string;
  description: string;
  assignedTo: string[];
  createdBy: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  deadline: Date;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  category: string;
  agcReward: number;
  
  // Location filters
  country?: string;
  region?: string;
  
  // Completion details
  completedBy?: string;
  completedDate?: Date;
  completionNotes?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

export interface INRCTaskModel extends Model<INRCTask> {
  getVolunteerTasks(volunteerId: string, filters?: any): Promise<INRCTask[]>;
  getTasksByStatus(status: string): Promise<INRCTask[]>;
}

const NRCTaskSchema = new Schema<INRCTask>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  assignedTo: [{
    type: String,
    required: true,
    index: true
  }],
  createdBy: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
    index: true
  },
  deadline: {
    type: Date,
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING',
    index: true
  },
  category: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  agcReward: {
    type: Number,
    default: 0
  },
  country: {
    type: String,
    trim: true,
    index: true
  },
  region: {
    type: String,
    trim: true,
    index: true
  },
  completedBy: {
    type: String
  },
  completedDate: {
    type: Date
  },
  completionNotes: {
    type: String
  }
}, {
  timestamps: true
});

// Indexes
NRCTaskSchema.index({ assignedTo: 1, status: 1 });
NRCTaskSchema.index({ deadline: 1, status: 1 });
NRCTaskSchema.index({ priority: 1, status: 1 });

// Static methods
NRCTaskSchema.statics.getVolunteerTasks = async function(
  volunteerId: string,
  filters?: any
): Promise<INRCTask[]> {
  const query: any = { assignedTo: volunteerId };
  
  if (filters?.status) {
    query.status = filters.status;
  }
  if (filters?.priority) {
    query.priority = filters.priority;
  }
  
  return this.find(query)
    .sort({ deadline: 1, priority: -1 })
    .limit(filters?.limit || 50);
};

NRCTaskSchema.statics.getTasksByStatus = async function(status: string): Promise<INRCTask[]> {
  return this.find({ status })
    .sort({ deadline: 1 });
};

export default mongoose.models.NRCTask as INRCTaskModel || 
  mongoose.model<INRCTask, INRCTaskModel>('NRCTask', NRCTaskSchema);
