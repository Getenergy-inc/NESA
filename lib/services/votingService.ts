import apiClient from './apiClient';

export interface VotingStatus {
  isOpen: boolean;
  startDate: string;
  endDate: string;
  message: string;
}

export interface Nominee {
  id: string;
  fullName: string;
  category: string;
  subcategory: string;
  country: string;
  stateRegion: string;
  impactSummary: string;
  achievementDescription: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  votes: number;
  createdAt: string;
  approvedAt?: string;
}

export interface VoteData {
  nominationId: string;
  agcAmount: number;
}

export interface MyVote {
  id: string;
  nominationId: string;
  nomination: Nominee;
  agcAmount: number;
  votedAt: string;
}

export interface VotingSummary {
  totalVotes: number;
  totalAgcSpent: number;
  categoriesVoted: string[];
  recentVotes: MyVote[];
}

class VotingService {
  private baseUrl = '/api/v1/voting';

  /**
   * Get voting status (public)
   */
  async getVotingStatus(): Promise<VotingStatus> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/status`);
      return response.data.data || response.data;
    } catch (error: any) {
      console.error('Failed to get voting status:', error);
      throw new Error(error.response?.data?.message || 'Failed to get voting status');
    }
  }

  /**
   * Get leaderboard (public)
   */
  async getLeaderboard(limit: number = 10): Promise<Nominee[]> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/leaderboard`, {
        params: { limit }
      });
      return response.data.data || response.data;
    } catch (error: any) {
      console.error('Failed to get leaderboard:', error);
      throw new Error(error.response?.data?.message || 'Failed to get leaderboard');
    }
  }

  /**
   * Cast a vote (requires authentication)
   */
  async castVote(voteData: VoteData): Promise<{
    success: boolean;
    message: string;
    data: any;
  }> {
    try {
      const response = await apiClient.post(`${this.baseUrl}/cast`, voteData);
      return response.data;
    } catch (error: any) {
      console.error('Failed to cast vote:', error);
      throw new Error(error.response?.data?.message || 'Failed to cast vote');
    }
  }

  /**
   * Get my votes (requires authentication)
   */
  async getMyVotes(page: number = 1, limit: number = 10): Promise<{
    votes: MyVote[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/my-votes`, {
        params: { page, limit }
      });
      return response.data.data || response.data;
    } catch (error: any) {
      console.error('Failed to get my votes:', error);
      throw new Error(error.response?.data?.message || 'Failed to get my votes');
    }
  }

  /**
   * Get my voting summary (requires authentication)
   */
  async getMySummary(): Promise<VotingSummary> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/my-summary`);
      return response.data.data || response.data;
    } catch (error: any) {
      console.error('Failed to get voting summary:', error);
      throw new Error(error.response?.data?.message || 'Failed to get voting summary');
    }
  }

  /**
   * Get voting stats for a nomination (public)
   */
  async getVotingStats(nominationId: string): Promise<{
    totalVotes: number;
    totalAgc: number;
    uniqueVoters: number;
  }> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/stats/${nominationId}`);
      return response.data.data || response.data;
    } catch (error: any) {
      console.error('Failed to get voting stats:', error);
      throw new Error(error.response?.data?.message || 'Failed to get voting stats');
    }
  }
}

export const votingService = new VotingService();
export default votingService;
