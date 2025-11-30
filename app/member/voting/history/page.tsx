'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Vote, 
  Calendar, 
  TrendingUp,
  Loader2,
  Award
} from 'lucide-react';
import { useVoting } from '@/lib/hooks/useVoting';
import votingService from '@/lib/services/votingService';

export default function VotingHistoryPage() {
  const router = useRouter();
  const { fetchMyVotes, fetchMySummary, loading } = useVoting();
  const [votes, setVotes] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  useEffect(() => {
    loadData();
  }, [currentPage]);

  const loadData = async () => {
    try {
      const [votesData, summaryData] = await Promise.all([
        fetchMyVotes(currentPage, limit),
        fetchMySummary()
      ]);
      
      setVotes(votesData.votes);
      setTotalPages(votesData.pagination.totalPages);
      setSummary(summaryData);
    } catch (error) {
      console.error('Failed to load voting data:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Voting History</h1>
              <p className="text-gray-600">View all your votes and voting statistics</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
              <div className="flex items-center gap-3 mb-2">
                <Vote className="w-5 h-5 text-orange-600" />
                <p className="text-sm text-gray-600">Total Votes</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{summary.totalVotes}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-gray-600">AGC Spent</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{summary.totalAgcSpent}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-green-600" />
                <p className="text-sm text-gray-600">Nominees Supported</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{summary.nominationsVotedFor}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <p className="text-sm text-gray-600">Avg per Nominee</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {summary.averageVotesPerNomination?.toFixed(1) || '0.0'}
              </p>
            </div>
          </div>
        )}

        {/* Votes List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Your Votes</h2>
          </div>

          {loading && votes.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
            </div>
          ) : votes.length === 0 ? (
            <div className="text-center py-12">
              <Vote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Votes Yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't cast any votes yet. Start supporting your favorite nominees!
              </p>
              <button
                onClick={() => router.push('/member/vote')}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all"
              >
                Browse Nominees
              </button>
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-200">
                {votes.map((vote) => (
                  <div
                    key={vote.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {vote.nomination?.photoUrl ? (
                        <img
                          src={vote.nomination.photoUrl}
                          alt={vote.nomineeName}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold">
                          {vote.nomineeName.charAt(0)}
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">
                          {vote.nomineeName}
                        </h3>
                        <p className="text-sm text-gray-600">{vote.nomineeCategory}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(vote.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Vote className="w-4 h-4" />
                            Weight: {vote.weight}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-orange-600">
                          {vote.agcAmount} AGC
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Spent</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-6 border-t border-gray-200 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1 || loading}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-gray-700 px-4">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages || loading}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
