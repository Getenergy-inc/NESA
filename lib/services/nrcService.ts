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

  // Helper to make direct fetch calls (bypassing apiClient which points to external backend)
  private async fetchNRC(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }
    
    return response.json();
  }

  // Volunteer Management
  async registerVolunteer(data: NRCVolunteerRegistration): Promise<any> {
    try {
      const response = await this.fetchNRC('/volunteers/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      // Check if the response indicates success
      if (response.success) {
        return response.data; // Return the volunteer data
      } else {
        throw new Error(response.message || 'Registration failed');
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
      const response = await this.fetchNRC(`/volunteers/check-status?userId=${userId}`);
      return response.data?.profile || null;
    } catch (error: any) {
      // If volunteer not found, return null instead of throwing
      if (error.message?.includes('404')) {
        return null;
      }
      throw new Error(error.message || 'Failed to get volunteer');
    }
  }

  async getVolunteerDashboard(volunteerId: string): Promise<NRCDashboardData> {
    try {
      const response = await this.fetchNRC(`/volunteers/${volunteerId}/dashboard`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get dashboard data');
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
      
      const response = await this.fetchNRC(`/volunteers?${params}`);
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get volunteers');
    }
  }

  async updateVolunteer(volunteerId: string, data: Partial<NRCVolunteerRegistration>): Promise<ApiResponse<any>> {
    try {
      const response = await this.fetchNRC(`/volunteers/${volunteerId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update volunteer');
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
      const response = await this.fetchNRC('/tasks', {
        method: 'POST',
        body: JSON.stringify(taskData),
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create task');
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
      
      const response = await this.fetchNRC(`/volunteers/${volunteerId}/tasks?${params}`);
      return response.data?.tasks || [];
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get tasks');
    }
  }

  async completeTask(taskId: string, completionNotes?: string): Promise<void> {
    try {
      await this.fetchNRC(`/tasks/${taskId}/complete`, {
        method: 'PUT',
        body: JSON.stringify({ completionNotes }),
      });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to complete task');
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
      const response = await this.fetchNRC('/agc/transactions', {
        method: 'POST',
        body: JSON.stringify(transactionData),
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to process AGC transaction');
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
      
      const response = await this.fetchNRC(`/volunteers/${volunteerId}/agc/transactions?${params}`);
      return response.data?.transactions || [];
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get AGC transactions');
    }
  }

  async withdrawAGC(volunteerId: string, amount: number, walletAddress: string): Promise<void> {
    try {
      await this.fetchNRC(`/volunteers/${volunteerId}/agc/withdraw`, {
        method: 'POST',
        body: JSON.stringify({ amount, walletAddress }),
      });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to withdraw AGC');
    }
  }

  // Analytics & Reporting
  async getLeaderboard(type: 'uploads' | 'agc' | 'weekly' | 'monthly' | 'allTime' = 'uploads', limit: number = 20): Promise<any[]> {
    try {
      const response = await this.fetchNRC(`/leaderboard?type=${type}&limit=${limit}`);
      return response.data || [];
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get leaderboard');
    }
  }

  async generateReport(period: { start: string; end: string }): Promise<ApiResponse<any>> {
    try {
      const response = await this.fetchNRC('/reports/generate', {
        method: 'POST',
        body: JSON.stringify({ period }),
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to generate report');
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
      
      const response = await this.fetchNRC(`/analytics/dashboard?${params}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get analytics overview');
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
  async checkVolunteerStatus(userId?: string): Promise<any> {
    try {
      // If userId is provided, pass it as query param
      const endpoint = userId 
        ? `/volunteers/check-status?userId=${userId}`
        : `/volunteers/check-status`;
        
      const response = await this.fetchNRC(endpoint);
      return response; // Return the full response including success flag
    } catch (error: any) {
      // If volunteer not found (404), return a structured response
      if (error.message?.includes('404')) {
        return {
          success: false,
          message: 'Volunteer not found',
          data: null
        };
      }
      throw new Error(error.message || 'Failed to check volunteer status');
    }
  }

  // Nominee Management
  async createNominee(nomineeData: any): Promise<ApiResponse<any>> {
    try {
      console.log('Creating nominee with FormData...');
      
      // Log FormData entries for debugging
      if (nomineeData instanceof FormData) {
        console.log('FormData entries:');
        for (let pair of nomineeData.entries()) {
          const value = pair[1] instanceof File 
            ? `File: ${(pair[1] as File).name} (${(pair[1] as File).size} bytes)` 
            : pair[1];
          console.log(`${pair[0]}: ${value}`);
        }
      } else {
        console.warn('nomineeData is not FormData!', typeof nomineeData);
      }
      
      // Use apiClient to send FormData. Axios will correctly set the
      // 'Content-Type': 'multipart/form-data' header with the boundary.
      console.log(`Sending request to ${this.baseUrl}/nominees...`);
      const response = await apiClient.post(`${this.baseUrl}/nominees`, nomineeData, {
        headers: {
          // Let Axios set the Content-Type for FormData
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      
      return response.data;
    } catch (error: any) {
      console.error('Create nominee error:', error);
      // Propagate a more informative error message from the server if available
      throw new Error(error.response?.data?.message || error.message || 'Failed to create nominee');
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
      
      const response = await this.fetchNRC(`/volunteers/${volunteerId}/nominees?${params}`);
      return response.data?.nominees || [];
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get nominees');
    }
  }

  async updateNomineeStatus(nomineeId: string, status: string): Promise<void> {
    try {
      await this.fetchNRC(`/nominees/${nomineeId}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update nominee status');
    }
  }

  async updateNominee(nomineeId: string, data: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.fetchNRC(`/nominees/${nomineeId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update nominee');
    }
  }

  async deleteNominee(nomineeId: string): Promise<ApiResponse<any>> {
    try {
      const response = await this.fetchNRC(`/nominees/${nomineeId}`, {
        method: 'DELETE',
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete nominee');
    }
  }

  async bulkNomineeOperations(operation: string, nomineeIds: string[], data?: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.fetchNRC('/nominees/bulk', {
        method: 'POST',
        body: JSON.stringify({ operation, nomineeIds, data }),
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || "");
    }
  }
}

export const nrcService = new NRCService();
export default nrcService;