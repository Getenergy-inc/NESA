'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Award, 
  Plus, 
  Search, 
  Filter,
  Loader2,
  TrendingUp,
  Users,
  Star
} from 'lucide-react';
import nominationService, { Nomination } from '@/lib/services/nominationService';
import { SUPER_AWARD_CATEGORIES } from '@/lib/configs/awardCategories';

export default function MemberNominatePage() {
  const router = useRouter();
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  useEffect(() => {
    loadNominations();
  }, [currentPage, selectedCategory]);

  const loadNominations = async () => {
    try {
      setLoading(true);
      const filters: any = {
        page: currentPage,
        limit,
        status: 'APPROVED'
      };
      
      if (selectedCategory !== 'all') {
        filters.category = selectedCategory;
      }
      
      const response = await nominationService.getPublicNominations(filters);
      setNominations(response.nominations);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error('Failed to load nominations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNominations = nominations.filter(nom => {
    const matchesSearch = nom.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nom.awardCategory?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nom.achievementSummary?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleNominateClick = (categoryValue: string) => {
    router.push(`/nominateform?category=${categoryValue}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nominations</h1>
          <p className="text-gray-600">Browse existing nominations or submit a new one</p>
        </div>

        {/* Nomination Category Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {SUPER_AWARD_CATEGORIES.map((category, index) => {
            const icons = [Star, Award, TrendingUp];
            const Icon = icons[index];
            const colors = [
              'from-yellow-500 to-orange-600',
              'from-blue-500 to-indigo-600',
              'from-purple-500 to-pink-600'
            ];
            
            return (
              <div
                key={category.value}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`bg-gradient-to-r ${colors[index]} p-6 text-white`}>
                  <Icon className="w-12 h-12 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{category.label}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">
                    Submit a nomination for this prestigious award category
                  </p>
                  <button
                    onClick={() => handleNominateClick(category.value)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    Nominate
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Browse Nominations</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search nominations..."
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
                <option value="all">All Categories</option>
                {SUPER_AWARD_CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Nominations Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
          </div>
        ) : filteredNominations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Nominations Found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery ? 'Try adjusting your search criteria' : 'Be the first to submit a nomination!'}
            </p>
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
                  {/* Nominee Header */}
                  <div className="relative h-32 bg-gradient-to-br from-orange-400 to-orange-600">
                    <div className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold">
                      {nomination.fullName.charAt(0)}
                    </div>
                  </div>

                  {/* Nominee Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {nomination.fullName}
                    </h3>
                    {nomination.organizationName && (
                      <p className="text-sm text-gray-500 mb-2">
                        {nomination.organizationName}
                      </p>
                    )}
                    <p className="text-sm text-orange-600 font-medium mb-1">
                      {nomination.awardCategory}
                    </p>
                    {nomination.subcategory && (
                      <p className="text-xs text-gray-500 mb-3">
                        {nomination.subcategory}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {nomination.achievementSummary}
                    </p>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>📍 {nomination.country}</span>
                      {nomination.region && <span>• {nomination.region}</span>}
                    </div>
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
