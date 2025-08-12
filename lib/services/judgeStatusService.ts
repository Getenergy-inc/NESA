// Judge Application Status Tracking Service
import apiClient from './apiClient';

export type ApplicationStatus = 
  | 'submitted'     // Initial application submitted
  | 'verified'      // Email verified
  | 'approved'      // Application approved by admin
  | 'rejected'      // Application rejected
  | 'account_created' // Judge account created
  | 'active';       // Judge is active and participating

export interface StatusUpdate {
  status: ApplicationStatus;
  timestamp: string;
  notes?: string;
  updated_by?: string;
}

export interface ApplicationStatusHistory {
  application_id: string;
  email: string;
  current_status: ApplicationStatus;
  status_history: StatusUpdate[];
  created_at: string;
  updated_at: string;
}

// Track status change
export const updateApplicationStatus = async (
  email: string, 
  newStatus: ApplicationStatus, 
  notes?: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.post('/api/judge-apply/update-status', {
      email,
      status: newStatus,
      notes,
      timestamp: new Date().toISOString()
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Status update error:', error);
    throw new Error(error.response?.data?.message || 'Failed to update status');
  }
};

// Get complete status history for an application
export const getApplicationStatusHistory = async (
  email: string
): Promise<ApplicationStatusHistory | null> => {
  try {
    const response = await apiClient.get(`/api/judge-apply/status-history/${encodeURIComponent(email)}`);
    return response.data.history;
  } catch (error: any) {
    console.error('Get status history error:', error);
    return null;
  }
};

// Get applications by status
export const getApplicationsByStatus = async (
  status?: ApplicationStatus
): Promise<any[]> => {
  try {
    const url = status 
      ? `/api/judge-apply/applications?status=${status}`
      : '/api/judge-apply/applications';
    
    const response = await apiClient.get(url);
    return response.data.applications || [];
  } catch (error: any) {
    console.error('Get applications by status error:', error);
    return [];
  }
};

// Get status statistics
export const getStatusStatistics = async (): Promise<{
  total: number;
  by_status: Record<ApplicationStatus, number>;
  recent_activity: StatusUpdate[];
}> => {
  try {
    const response = await apiClient.get('/api/judge-apply/statistics');
    return response.data;
  } catch (error: any) {
    console.error('Get statistics error:', error);
    return {
      total: 0,
      by_status: {
        submitted: 0,
        verified: 0,
        approved: 0,
        rejected: 0,
        account_created: 0,
        active: 0
      },
      recent_activity: []
    };
  }
};

// Bulk status update (for admin operations)
export const bulkUpdateStatus = async (
  emails: string[],
  newStatus: ApplicationStatus,
  notes?: string
): Promise<{ success: boolean; updated: number; failed: string[] }> => {
  try {
    const response = await apiClient.post('/api/judge-apply/bulk-update-status', {
      emails,
      status: newStatus,
      notes,
      timestamp: new Date().toISOString()
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Bulk status update error:', error);
    throw new Error(error.response?.data?.message || 'Failed to bulk update status');
  }
};

// Send status notification email
export const sendStatusNotification = async (
  email: string,
  status: ApplicationStatus,
  customMessage?: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.post('/api/judge-apply/send-status-notification', {
      email,
      status,
      customMessage
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Send status notification error:', error);
    throw new Error(error.response?.data?.message || 'Failed to send notification');
  }
};

// Get status display information
export const getStatusDisplayInfo = (status: ApplicationStatus): {
  label: string;
  color: string;
  icon: string;
  description: string;
} => {
  const statusInfo = {
    submitted: {
      label: 'Submitted',
      color: 'yellow',
      icon: '📝',
      description: 'Application has been submitted and is awaiting email verification'
    },
    verified: {
      label: 'Verified',
      color: 'blue',
      icon: '✅',
      description: 'Email has been verified and application is under review'
    },
    approved: {
      label: 'Approved',
      color: 'green',
      icon: '🎉',
      description: 'Application has been approved and judge can create account'
    },
    rejected: {
      label: 'Rejected',
      color: 'red',
      icon: '❌',
      description: 'Application has been rejected'
    },
    account_created: {
      label: 'Account Created',
      color: 'purple',
      icon: '👤',
      description: 'Judge account has been created successfully'
    },
    active: {
      label: 'Active Judge',
      color: 'emerald',
      icon: '⚖️',
      description: 'Judge is active and participating in evaluations'
    }
  };

  return statusInfo[status] || {
    label: 'Unknown',
    color: 'gray',
    icon: '❓',
    description: 'Unknown status'
  };
};

// Validate status transition
export const isValidStatusTransition = (
  currentStatus: ApplicationStatus,
  newStatus: ApplicationStatus
): boolean => {
  const validTransitions: Record<ApplicationStatus, ApplicationStatus[]> = {
    submitted: ['verified', 'rejected'],
    verified: ['approved', 'rejected'],
    approved: ['account_created', 'rejected'],
    rejected: ['submitted'], // Allow resubmission
    account_created: ['active', 'rejected'],
    active: ['rejected'] // Can deactivate
  };

  return validTransitions[currentStatus]?.includes(newStatus) || false;
};

// Get next possible statuses
export const getNextPossibleStatuses = (
  currentStatus: ApplicationStatus
): ApplicationStatus[] => {
  const transitions: Record<ApplicationStatus, ApplicationStatus[]> = {
    submitted: ['verified', 'rejected'],
    verified: ['approved', 'rejected'],
    approved: ['account_created', 'rejected'],
    rejected: ['submitted'],
    account_created: ['active', 'rejected'],
    active: ['rejected']
  };

  return transitions[currentStatus] || [];
};

// Calculate completion percentage
export const getCompletionPercentage = (status: ApplicationStatus): number => {
  const statusOrder: ApplicationStatus[] = [
    'submitted',
    'verified', 
    'approved',
    'account_created',
    'active'
  ];

  const currentIndex = statusOrder.indexOf(status);
  if (currentIndex === -1) return 0;
  
  return Math.round(((currentIndex + 1) / statusOrder.length) * 100);
};

// Get estimated time to completion
export const getEstimatedTimeToCompletion = (
  status: ApplicationStatus
): string => {
  const timeEstimates: Record<ApplicationStatus, string> = {
    submitted: '1-2 days (pending email verification)',
    verified: '2-3 business days (under review)',
    approved: 'Immediate (ready to create account)',
    rejected: 'N/A (application rejected)',
    account_created: '1-2 days (account setup)',
    active: 'Complete (judge is active)'
  };

  return timeEstimates[status] || 'Unknown';
};
