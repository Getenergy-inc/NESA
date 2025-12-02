'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Clock,
  Loader2,
  AlertCircle
} from 'lucide-react';
import VoteButton from '@/components/voting/VoteButton';
import { useVoting } from '@/lib/hooks/useVoting';
import { useWallet } from '@/lib/hooks/useWallet';
import nominationService, { Nomination } from '@/lib/services/nominationService';

export default function VotingPage() {
  const router = useRouter();
  const { checkVotingStatus, votingStatus, VOTE_COST } = useVoting();
  const { withdrawableBalance, loading: walletLoading } = useWallet();
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<string[]>(['all']);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  useEffect(() => {
    checkVotingStatus();
    loadNominations();
  }, [currentPage, selectedCategory]);

  const loadNominations = async () => {
    try {
      setLoading(true);
      setError('');
      
      const filters: any = {
        page: currentPage,
        limit,
        status: 'APPROVED' // Only show approved nominations
      };
      
      if (selectedCategory !== 'all') {
        filters.category = selectedCategory;
      }
      
      const response = await nominationService.getPublicNominations(filters);
      setNominations(response.nominations);
      setTotalPages(response.pagination.totalPages);
      
      // Extract unique categories from nominations
      const uniqueCategories = ['all', ...new Set(response.nominations.map(n => n.category))];
      setCategories(uniqueCategories);
    } catch (err: any) {
      console.error('Failed to load nominations:', err);
      setError(err.message || 'Failed to load nominations');
    } finally {
      setLoading(false);
    }
  };

  const filteredNominations = nominations.filter(nom => {
    const matchesSearch = nom.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nom.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nom.impactSummary?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleVoteSuccess = () => {
    // Refresh nominations to update vote counts
    loadNominations();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Vote for Nominees</h1>
              <p className="text-gray-600">Support outstanding individuals and organizations</p>
            </div>
            <button
              onClick={() => router.push('/member/voting/history')}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              <Clock className="w-4 h-4" />
              My Votes
            </button>
          </div>

          {/* Voting Status Alert */}
          {votingStatus && !votingStatus.allowed && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 flex items-start gap-3 mb-6">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-900">Voting Temporarily Unavailable</p>
                <p className="text-sm text-yellow-800 mt-1">
                  {votingStatus.reason || 'Voting is currently frozen. Please check back later.'}
                </p>
              </div>
            </div>
          )}

          {/* Balance Info */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Your Purchased AGC</p>
              <p className="text-2xl font-bold">
                {walletLoading ? '---' : withdrawableBalance.toFixed(2)} AGC
              </p>
              <p className="text-xs opacity-75 mt-1">
                {Math.floor(withdrawableBalance / VOTE_COST)} votes available
              </p>
            </div>
            <button
              onClick={() => router.push('/member/wallet/purchase')}
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
            >
              Buy More AGC
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search nominees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all appearance-none bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-semibold">Error Loading Nominations</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={loadNominations}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Nominations Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
          </div>
        ) : filteredNominations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-gray-600 mb-4">No nominees found matching your criteria.</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNominations.map((nomination) => (
                <div
                  key={nomination.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Nominee Photo */}
                  <div className="relative h-48 bg-gradient-to-br from-orange-400 to-orange-600">
                    <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
                      {nomination.fullName.charAt(0)}
                    </div>
                    {/* Vote Count Badge */}
                    {nomination.votes !== undefined && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-orange-600" />
                        <span className="font-bold text-gray-900">{nomination.votes}</span>
                      </div>
                    )}
                  </div>

                  {/* Nominee Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {nomination.fullName}
                    </h3>
                    <p className="text-sm text-orange-600 font-medium mb-1">
                      {nomination.category}
                    </p>
                    {nomination.subcategory && (
                      <p className="text-xs text-gray-500 mb-3">
                        {nomination.subcategory}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {nomination.impactSummary || nomination.achievementDescription}
                    </p>

                    {/* Vote Button */}
                    <VoteButton
                      nominationId={nomination.id}
                      nomineeName={nomination.fullName}
                      nomineeCategory={nomination.category}
                      currentVotes={nomination.votes || 0}
                      onVoteSuccess={handleVoteSuccess}
                      variant="compact"
                      className="w-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1 || loading}
                  className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="text-gray-700 px-4">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages || loading}
                  className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
