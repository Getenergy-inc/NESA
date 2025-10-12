import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IAGCTransaction extends Document {
  volunteerId: string;
  type: 'EARN' | 'WITHDRAW' | 'BONUS' | 'PENALTY' | 'ADJUSTMENT';
  amount: number;
  description: string;
  nominationId?: string;
  isWithdrawable: boolean;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  
  // Withdrawal specific
  walletAddress?: string;
  transactionHash?: string;
  
  // Metadata
  processedBy?: string;
  processedDate?: Date;
  failureReason?: string;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAGCTransactionModel extends Model<IAGCTransaction> {
  getVolunteerTransactions(volunteerId: string, filters?: any): Promise<IAGCTransaction[]>;
  getVolunteerBalance(volunteerId: string): Promise<{ total: number; withdrawable: number; nonWithdrawable: number }>;
}

const AGCTransactionSchema = new Schema<IAGCTransaction>({
  volunteerId: {
    type: String,
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ['EARN', 'WITHDRAW', 'BONUS', 'PENALTY', 'ADJUSTMENT'],
    required: true,
    index: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  nominationId: {
    type: String,
    index: true
  },
  isWithdrawable: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'],
    default: 'COMPLETED',
    index: true
  },
  walletAddress: {
    type: String,
    trim: true
  },
  transactionHash: {
    type: String,
    trim: true
  },
  processedBy: {
    type: String
  },
  processedDate: {
    type: Date
  },
  failureReason: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Indexes
AGCTransactionSchema.index({ volunteerId: 1, timestamp: -1 });
AGCTransactionSchema.index({ volunteerId: 1, type: 1 });
AGCTransactionSchema.index({ status: 1, timestamp: -1 });

// Static methods
AGCTransactionSchema.statics.getVolunteerTransactions = async function(
  volunteerId: string,
  filters?: any
): Promise<IAGCTransaction[]> {
  const query: any = { volunteerId };
  
  if (filters?.type) {
    query.type = filters.type;
  }
  if (filters?.status) {
    query.status = filters.status;
  }
  
  return this.find(query)
    .sort({ timestamp: -1 })
    .limit(filters?.limit || 50);
};

AGCTransactionSchema.statics.getVolunteerBalance = async function(volunteerId: string) {
  const transactions = await this.find({ 
    volunteerId, 
    status: 'COMPLETED' 
  });
  
  let total = 0;
  let withdrawable = 0;
  let nonWithdrawable = 0;
  
  transactions.forEach((tx: IAGCTransaction) => {
    const amount = tx.type === 'WITHDRAW' || tx.type === 'PENALTY' ? -tx.amount : tx.amount;
    total += amount;
    
    if (tx.isWithdrawable) {
      withdrawable += amount;
    } else {
      nonWithdrawable += amount;
    }
  });
  
  return {
    total: Math.max(0, total),
    withdrawable: Math.max(0, withdrawable),
    nonWithdrawable: Math.max(0, nonWithdrawable)
  };
};

export default mongoose.models.AGCTransaction as IAGCTransactionModel || 
  mongoose.model<IAGCTransaction, IAGCTransactionModel>('AGCTransaction', AGCTransactionSchema);
