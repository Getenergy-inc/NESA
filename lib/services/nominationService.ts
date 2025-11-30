import apiClient from './apiClient';

export interface Nomination {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  stateRegion: string;
  category: string;
  subcategory: string;
  impactSummary: string;
  achievementDescription: string;
  sdgAlignment?: string[];
  agendaAlignment?: string;
  esgAlignment?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  votes?: number;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  rejectedAt?: string;
  reviewNotes?: string;
  rejectionReason?: string;
}

export interface CreateNominationData {
  fullName: string;
  organizationName?: string;
  email?: string;
  phone?: string;
  country: string;
  region?: string;
  website?: string;
  awardCategory: string;
  subcategory: string;
  achievementSummary: string;
  impactMetrics?: string;
  verificationLinks?: string;
  nominatorName: string;
  nominatorEmail: string;
  nominatorPhone?: string;
  nominatorRelationship: string;
  additionalNotes?: string;
}

export interface NominationFilters {
  page?: number;
  limit?: number;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  country?: string;
  category?: string;
}

class NominationService {
  private baseUrl = '/api/v1/nominations';

  /**
   * Create a public nomination (authentication required)
   * NOTE: As of recent changes, creating a public nomination requires the user to be authenticated.
   */
  async createPublicNomination(data: CreateNominationData): Promise<{
    success: boolean;
    message: string;
    data: Nomination;
  }> {
    try {
      const response = await apiClient.post(`${this.baseUrl}/public`, data);
      return response.data;
    } catch (error: any) {
      console.error('Failed to create nomination:', error);
      throw new Error(error.response?.data?.message || 'Failed to create nomination');
    }
  }

  /**
   * Create a new nomination (requires authentication)
   */
  async createNomination(data: CreateNominationData): Promise<{
    success: boolean;
    message: string;
    data: Nomination;
  }> {
    try {
      const response = await apiClient.post(this.baseUrl, data);
      return response.data;
    } catch (error: any) {
      console.error('Failed to create nomination:', error);
      throw new Error(error.response?.data?.message || 'Failed to create nomination');
    }
  }

  /**
   * Get nominations with filters (requires authentication)
   */
  async getNominations(filters?: NominationFilters): Promise<{
    nominations: Nomination[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    try {
      const response = await apiClient.get(this.baseUrl, {
        params: filters
      });
      return response.data.data || response.data;
    } catch (error: any) {
      console.error('Failed to get nominations:', error);
      throw new Error(error.response?.data?.message || 'Failed to get nominations');
    }
  }

  /**
   * Get public nominations (no authentication required)
   */
  async getPublicNominations(filters?: NominationFilters): Promise<{
    nominations: Nomination[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/public`, {
        params: filters
      });
      return response.data.data || response.data;
    } catch (error: any) {
      console.error('Failed to get public nominations:', error);
      throw new Error(error.response?.data?.message || 'Failed to get public nominations');
    }
  }

  /**
   * Get nomination by ID (requires authentication)
   */
  async getNominationById(nominationId: string): Promise<Nomination> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/${nominationId}`);
      return response.data.data || response.data;
    } catch (error: any) {
      console.error('Failed to get nomination:', error);
      throw new Error(error.response?.data?.message || 'Failed to get nomination');
    }
  }

  /**
   * Search nominations (requires authentication)
   */
  async searchNominations(query: string, page: number = 1, limit: number = 10): Promise<{
    query: string;
    results: Nomination[];
    pagination: {
      page: number;
      limit: number;
      total: number;
    };
  }> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/search`, {
        params: { q: query, page, limit }
      });
      return response.data.data || response.data;
    } catch (error: any) {
      console.error('Failed to search nominations:', error);
      throw new Error(error.response?.data?.message || 'Failed to search nominations');
    }
  }

  /**
   * Get nominations by volunteer (requires authentication)
   */
  async getNominationsByVolunteer(volunteerId: string): Promise<{
    volunteerId: string;
    nominations: Nomination[];
    stats: {
      total: number;
      approved: number;
      pending: number;
      rejected: number;
    };
  }> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/volunteer/${volunteerId}`);
      return response.data.data || response.data;
    } catch (error: any) {
      console.error('Failed to get volunteer nominations:', error);
      throw new Error(error.response?.data?.message || 'Failed to get volunteer nominations');
    }
  }

  /**
   * Upload supporting document (requires authentication)
   */
  async uploadSupportingDocument(nominationId: string, documentData: {
    filename: string;
    originalName: string;
    type: string;
    size: number;
    description?: string;
  }): Promise<{
    success: boolean;
    message: string;
    data: any;
  }> {
    try {
      const response = await apiClient.post(
        `${this.baseUrl}/${nominationId}/documents`,
        documentData
      );
      return response.data;
    } catch (error: any) {
      console.error('Failed to upload document:', error);
      throw new Error(error.response?.data?.message || 'Failed to upload document');
    }
  }
}

export const nominationService = new NominationService();
export default nominationService;
