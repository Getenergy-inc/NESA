import apiClient from './apiClient';

// Types matching backend
export interface NRCVolunteerRegistration {
  userId: string;
  region: string;
  country: string;
  coordinator?: string;
  teamLeadId?: string;
  displayName?: string;
  badge?: string;
}

export interface NRCDashboardData {
  totalUploads: number;
  verifiedUploads: number;
  pendingUploads: number;
  rejectedUploads: number;
  agcEarned: number;
  agcWithdrawable: number;
  currentWeekUploads: number;
  rank: number;
  level: string;
  nextLevelProgress: number;
  recentActivities: any[];
}

export interface NRCTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  deadline: string;
  status: string;
  category: string;
  agcReward: number;
  createdAt: string;
}

export interface AGCTransaction {
  id: string;
  volunteerId: string;
  type: string;
  amount: number;
  description: string;
  timestamp: string;
  status: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  errors?: string[];
}

class NRCService {
  // Updated to match the backend route structure
  private baseUrl = '/api/v1/nrc';

  // Volunteer Management
  async registerVolunteer(data: NRCVolunteerRegistration): Promise<any> {
    try {
      const response = await apiClient.post(`${this.baseUrl}/volunteers/register`, data);
      
      // Check if the response indicates success
      if (response.data.success) {
        return response.data.data; // Return the volunteer data
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error: any) {
      console.error('NRC Registration Error:', error);
      
      // Handle specific error cases
      if (error.response?.status === 409) {
        throw new Error('Volunteer already registered');
      }
      
      if (error.response?.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      
      throw new Error(error.response?.data?.message || error.message || 'Failed to register volunteer');
    }
  }

  async getVolunteerById(userId: string): Promise<any> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/volunteers/check-status`);
      return response.data.data?.profile || null;
    } catch (error: any) {
      // If volunteer not found, return null instead of throwing
      if (error.response?.status === 404) {
        return null;
      }
      throw new Error(error.response?.data?.message || 'Failed to get volunteer');
    }
  }

  async getVolunteerDashboard(volunteerId: string): Promise<NRCDashboardData> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/volunteers/${volunteerId}/dashboard`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get dashboard data');
    }
  }

  async getVolunteers(filters?: {
    role?: string;
    region?: string;
    country?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<any>> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, value.toString());
          }
        });
      }
      
      const response = await apiClient.get(`${this.baseUrl}/volunteers?${params}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get volunteers');
    }
  }

  async updateVolunteer(volunteerId: string, data: Partial<NRCVolunteerRegistration>): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.put(`${this.baseUrl}/volunteers/${volunteerId}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update volunteer');
    }
  }

  // Task Management
  async createTask(taskData: {
    volunteerId: string;
    title: string;
    description: string;
    assignedTo: string[];
    priority: 'low' | 'medium' | 'high' | 'urgent';
    deadline: string;
    agcReward: number;
    category: string;
    country?: string;
    region?: string;
  }): Promise<NRCTask> {
    try {
      const response = await apiClient.post(`${this.baseUrl}/tasks`, taskData);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create task');
    }
  }

  async getVolunteerTasks(volunteerId: string, filters?: {
    status?: string;
    priority?: string;
    page?: number;
    limit?: number;
  }): Promise<NRCTask[]> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, value.toString());
          }
        });
      }
      
      const response = await apiClient.get(`${this.baseUrl}/volunteers/${volunteerId}/tasks?${params}`);
      return response.data.data?.tasks || [];
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get tasks');
    }
  }

  async completeTask(taskId: string, completionNotes?: string): Promise<void> {
    try {
      await apiClient.put(`${this.baseUrl}/tasks/${taskId}/complete`, {
        completionNotes
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to complete task');
    }
  }

  // AGC & Rewards
  async processAGCTransaction(transactionData: {
    volunteerId: string;
    type: string;
    amount: number;
    description: string;
    nominationId?: string;
    isWithdrawable?: boolean;
  }): Promise<ApiResponse<AGCTransaction>> {
    try {
      const response = await apiClient.post(`${this.baseUrl}/agc/transactions`, transactionData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to process AGC transaction');
    }
  }

  async getAGCTransactions(volunteerId: string, filters?: {
    type?: string;
    page?: number;
    limit?: number;
  }): Promise<AGCTransaction[]> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, value.toString());
          }
        });
      }
      
      const response = await apiClient.get(`${this.baseUrl}/volunteers/${volunteerId}/agc/transactions?${params}`);
      return response.data.data?.transactions || [];
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get AGC transactions');
    }
  }

  async withdrawAGC(volunteerId: string, amount: number, walletAddress: string): Promise<void> {
    try {
      await apiClient.post(`${this.baseUrl}/volunteers/${volunteerId}/agc/withdraw`, {
        amount,
        walletAddress
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to withdraw AGC');
    }
  }

  // Analytics & Reporting
  async getLeaderboard(type: 'weekly' | 'monthly' | 'allTime' = 'monthly', limit: number = 10): Promise<any[]> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/leaderboard?type=${type}&limit=${limit}`);
      return response.data.data || [];
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get leaderboard');
    }
  }

  async generateReport(period: { start: string; end: string }): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.post(`${this.baseUrl}/reports/generate`, { period });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to generate report');
    }
  }

  async getAnalyticsOverview(filters?: {
    period?: string;
    country?: string;
    region?: string;
  }): Promise<any> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, value.toString());
          }
        });
      }
      
      const response = await apiClient.get(`${this.baseUrl}/analytics/dashboard?${params}`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get analytics overview');
    }
  }

  // Admin Functions
  async awardAGCForVerification(volunteerId: string, nominationId: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.post(`${this.baseUrl}/agc/award-verification`, {
        volunteerId,
        nominationId
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to award AGC');
    }
  }

  async processWeeklyBonuses(): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.post(`${this.baseUrl}/agc/process-weekly-bonuses`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to process weekly bonuses');
    }
  }

  async updateVolunteerRole(volunteerId: string, role: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.put(`${this.baseUrl}/volunteers/${volunteerId}/role`, { role });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update volunteer role');
    }
  }

  async bulkVolunteerOperations(operation: string, volunteerIds: string[], data?: any, reason?: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.post(`${this.baseUrl}/volunteers/bulk-operations`, {
        operation,
        volunteerIds,
        data,
        reason
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to perform bulk operation');
    }
  }

  // Volunteer Status Check
  async checkVolunteerStatus(): Promise<any> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/volunteers/check-status`);
      return response.data; // Return the full response including success flag
    } catch (error: any) {
      // If volunteer not found (404), return a structured response
      if (error.response?.status === 404) {
        return {
          success: false,
          message: 'Volunteer not found',
          data: null
        };
      }
      throw new Error(error.response?.data?.message || 'Failed to check volunteer status');
    }
  }

  // Nominee Management
  async createNominee(nomineeData: any): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.post(`${this.baseUrl}/nominees`, nomineeData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create nominee');
    }
  }

  async getVolunteerNominees(volunteerId: string, filters?: {
    status?: string;
    category?: string;
    country?: string;
    page?: number;
    limit?: number;
  }): Promise<any[]> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, value.toString());
          }
        });
      }
      
      const response = await apiClient.get(`${this.baseUrl}/volunteers/${volunteerId}/nominees?${params}`);
      return response.data.data?.nominees || [];
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get nominees');
    }
  }

  async updateNomineeStatus(nomineeId: string, status: string): Promise<void> {
    try {
      await apiClient.put(`${this.baseUrl}/nominees/${nomineeId}`, { status });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update nominee status');
    }
  }

  async updateNominee(nomineeId: string, data: any): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.put(`${this.baseUrl}/nominees/${nomineeId}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update nominee');
    }
  }

  async deleteNominee(nomineeId: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.delete(`${this.baseUrl}/nominees/${nomineeId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete nominee');
    }
  }

  async bulkNomineeOperations(operation: string, nomineeIds: string[], data?: any): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.post(`${this.baseUrl}/nominees/bulk`, {
        operation,
        nomineeIds,
        data
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to perform bulk nominee operation');
    }
  }
}

export const nrcService = new NRCService();
export default nrcService;