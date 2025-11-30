import apiClient from './apiClient';

// Types
export interface Vote {
  id: string;
  nominationId: string;
  nomineeName: string;
  nomineeCategory: string;
  agcAmount: number;
  weight: number;
  createdAt: string;
  nomination?: {
    fullName: string;
    category: string;
    photoUrl?: string;
  };
}

export interface VotingStats {
  nominationId: string;
  totalVotes: number;
  totalAgcSpent: number;
  uniqueVoters: number;
  averageVoteAmount: number;
  lastVoteDate?: string;
  voteDistribution?: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
}

export interface VotingSummary {
  totalVotes: number;
  totalAgcSpent: number;
  nominationsVotedFor: number;
  averageVotesPerNomination: number;
  lastVoteDate?: string;
}

export interface VoteResult {
  voteId: string;
  nominationId: string;
  nomineeName: string;
  nomineeCategory: string;
  agcAmount: number;
  weight: number;
  userRemainingBalance: number;
  totalVotesForNomination: number;
  createdAt: string;
}

export interface VotingStatus {
  allowed: boolean;
  reason?: string;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  totalVotes: number;
  totalAgcSpent: number;
  nominationsSupported: number;
  rank: number;
}

export interface GlobalVotingStats {
  totalNominations: number;
  approvedNominations: number;
  totalVotesCast: number;
  totalAgcSpent: number;
  uniqueVoters: number;
}

class VotingService {
  private baseUrl = '/api/v1/voting';
  
  readonly VOTE_COST = 3; // 3 AGC per vote

  /**
   * Cast a vote for a nomination
   */
  async castVote(nominationId: string): Promise<VoteResult> {
    try {
      const response = await apiClient.post(`${this.baseUrl}/cast`, {
        nominationId
      });
      return response.data.data;
    } catch (error: any) {
      console.error('Failed to cast vote:', error);
      throw new Error(error.response?.data?.message || 'Failed to cast vote');
    }
  }

  /**
   * Get current user's votes with pagination
   */
  async getMyVotes(page: number = 1, limit: number = 20): Promise<{
    votes: Vote[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/my-votes`, {
        params: { page, limit }
      });
      return response.data.data;
    } catch (error: any) {
      console.error('Failed to get votes:', error);
      throw new Error(error.response?.data?.message || 'Failed to get votes');
    }
  }

  /**
   * Get current user's voting summary
   */
  async getMySummary(): Promise<VotingSummary> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/my-summary`);
      return response.data.data;
    } catch (error: any) {
      console.error('Failed to get voting summary:', error);
      throw new Error(error.response?.data?.message || 'Failed to get voting summary');
    }
  }

  /**
   * Check if voting is currently allowed
   */
  async getVotingStatus(): Promise<VotingStatus> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/status`);
      return response.data.data;
    } catch (error: any) {
      console.error('Failed to get voting status:', error);
      throw new Error(error.response?.data?.message || 'Failed to get voting status');
    }
  }

  /**
   * Get voting statistics for a nomination
   */
  async getNominationStats(nominationId: string): Promise<VotingStats> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/stats/${nominationId}`);
      return response.data.data;
    } catch (error: any) {
      console.error('Failed to get nomination stats:', error);
      throw new Error(error.response?.data?.message || 'Failed to get nomination stats');
    }
  }

  /**
   * Get votes for a specific nomination
   */
  async getNominationVotes(nominationId: string, page: number = 1, limit: number = 20): Promise<{
    votes: Vote[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/nomination/${nominationId}`, {
        params: { page, limit }
      });
      return response.data.data;
    } catch (error: any) {
      console.error('Failed to get nomination votes:', error);
      throw new Error(error.response?.data?.message || 'Failed to get nomination votes');
    }
  }

  /**
   * Get leaderboard of top voters
   */
  async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/leaderboard`, {
        params: { limit }
      });
      return response.data.data;
    } catch (error: any) {
      console.error('Failed to get leaderboard:', error);
      throw new Error(error.response?.data?.message || 'Failed to get leaderboard');
    }
  }

  /**
   * Get global voting statistics
   */
  async getGlobalStats(): Promise<GlobalVotingStats> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/global-stats`);
      return response.data.data;
    } catch (error: any) {
      console.error('Failed to get global stats:', error);
      throw new Error(error.response?.data?.message || 'Failed to get global stats');
    }
  }

  /**
   * Format AGC amount for display
   */
  formatAGC(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  }
}

export const votingService = new VotingService();
export default votingService;
