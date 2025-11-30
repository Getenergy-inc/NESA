import { useState, useCallback } from 'react';
import votingService, { Vote, VotingSummary, VotingStatus } from '../services/votingService';

export const useVoting = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [summary, setSummary] = useState<VotingSummary | null>(null);
  const [votingStatus, setVotingStatus] = useState<VotingStatus | null>(null);

  const castVote = useCallback(async (nominationId: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await votingService.castVote(nominationId);
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to cast vote';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMyVotes = useCallback(async (page: number = 1, limit: number = 20) => {
    setLoading(true);
    setError(null);

    try {
      const data = await votingService.getMyVotes(page, limit);
      setVotes(data.votes);
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch votes';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMySummary = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await votingService.getMySummary();
      setSummary(data);
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch summary';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkVotingStatus = useCallback(async () => {
    setError(null);

    try {
      const status = await votingService.getVotingStatus();
      setVotingStatus(status);
      return status;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to check voting status';
      setError(errorMessage);
      throw err;
    }
  }, []);

  return {
    loading,
    error,
    votes,
    summary,
    votingStatus,
    castVote,
    fetchMyVotes,
    fetchMySummary,
    checkVotingStatus,
    VOTE_COST: votingService.VOTE_COST
  };
};
