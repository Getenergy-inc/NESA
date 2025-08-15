"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  User,
  TrendingUp,
  Calendar,
  Download,
  RefreshCw,
  Eye,
  Mail,
  Phone,
  Globe,
  Tag,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Filter,
  Search,
  X
} from 'lucide-react';

interface WaitlistEntry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  categories: string[];
  createdAt: string;
  syncedToSheets: boolean;
}

interface WaitlistStats {
  database: {
    totalEntries: number;
    categoryStats: { [key: string]: number };
    recentSignups: WaitlistEntry[];
  };
  sheets: {
    totalEntries: number;
    categoryStats: { [key: string]: number };
  } | null;
}

const categoryLabels: { [key: string]: string } = {
  'vote_nominate': 'Vote/Nominate',
  'become_ambassador': 'Ambassador',
  'join_webinar_expo': 'Webinar/Expo',
  'sponsor_csr_partner': 'Sponsor/CSR',
  'apply_judge': 'Judge',
  'join_local_chapter': 'Local Chapter',
  'join_nesa_team': 'NESA Team',
  'apply_nrc_volunteer': 'NRC Volunteer',
  'get_gala_ticket': 'Gala Ticket',
  'donate': 'Donate'
};

const WaitlistDashboardFixed: React.FC = () => {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [stats, setStats] = useState<WaitlistStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards'); // Default to cards for mobile

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const fetchData = async (page = 1) => {
    try {
      setRefreshing(true);
      setError(null);
      
      // Fetch entries with better error handling
      try {
        const entriesResponse = await fetch(`/api/waitlist?page=${page}&limit=10`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (entriesResponse.ok) {
          const entriesData = await entriesResponse.json();
          console.log('Entries response:', entriesData); // Debug log
          
          if (entriesData.success && entriesData.data) {
            setEntries(entriesData.data.entries || []);
            setTotalPages(entriesData.data.pagination?.pages || 1);
            setCurrentPage(entriesData.data.pagination?.page || 1);
          } else {
            console.error('Invalid entries response:', entriesData);
            setError('Failed to load entries data');
          }
        } else {
          console.error('Entries request failed:', entriesResponse.status, entriesResponse.statusText);
          setError(`Failed to fetch entries: ${entriesResponse.status}`);
        }
      } catch (entriesError: any) {
        console.error('Error fetching entries:', entriesError);
        setError('Network error while fetching entries');
      }

      // Fetch stats with better error handling
      try {
        const statsResponse = await fetch('/api/waitlist?action=stats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          console.log('Stats response:', statsData); // Debug log
          
          if (statsData.success && statsData.data) {
            setStats(statsData.data);
          } else {
            console.error('Invalid stats response:', statsData);
            setError('Failed to load statistics');
          }
        } else {
          console.error('Stats request failed:', statsResponse.status, statsResponse.statusText);
          setError(`Failed to fetch stats: ${statsResponse.status}`);
        }
      } catch (statsError: any) {
        console.error('Error fetching stats:', statsError);
        setError('Network error while fetching statistics');
      }
    } catch (error: any) {
      console.error('Error fetching waitlist data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const handleRefresh = () => {
    fetchData(currentPage);
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.country?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || entry.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryGold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Waitlist Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage and monitor waitlist entries</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    viewMode === 'cards' 
                      ? 'bg-primaryGold text-black' 
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    viewMode === 'table' 
                      ? 'bg-primaryGold text-black' 
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-800 font-medium">Error Loading Data</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
              <button
                onClick={handleRefresh}
                className="text-red-600 hover:text-red-800 text-sm font-medium mt-2 underline"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}

        {/* Stats Cards */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Entries</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                    {stats.database.totalEntries}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Synced to Sheets</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                    {stats.sheets?.totalEntries || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Sync</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                    {stats.database.totalEntries - (stats.sheets?.totalEntries || 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                    {Object.keys(stats.database.categoryStats).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Tag className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Category Breakdown */}
        {stats && Object.keys(stats.database.categoryStats).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100"
          >
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6">Category Breakdown</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(stats.database.categoryStats)
                .sort(([,a], [,b]) => b - a)
                .map(([category, count]) => (
                  <div key={category} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <p className="text-xl md:text-2xl font-bold text-primaryGold">{count}</p>
                    <p className="text-xs md:text-sm text-gray-600 mt-1 leading-tight">
                      {categoryLabels[category] || category}
                    </p>
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 border border-gray-100"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent bg-white min-w-[150px]"
              >
                <option value="all">All Categories</option>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Entries Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
        >
          <div className="px-4 md:px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                Entries ({filteredEntries.length})
              </h2>
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </div>

          {filteredEntries.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No entries found</p>
              <p className="text-gray-500 text-sm mt-1">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'No waitlist entries have been submitted yet'
                }
              </p>
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              {viewMode === 'cards' && (
                <div className="p-4 space-y-4">
                  {filteredEntries.map((entry) => (
                    <div key={entry._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{entry.name}</span>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          entry.syncedToSheets
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {entry.syncedToSheets ? 'Synced' : 'Pending'}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{entry.email}</span>
                      </div>

                      {/* Add phone number */}

                      <div className="flex items-center gap-2 mb-3">
                        <Phone className="w-4 h-4 text-grey-400"/>
                        <span className="text-sm text-grey-600">{entry.phone || "N/A"} </span>
                      </div>

                      {/* Add country */}

                      <div className="flex items-center gap-2 mb-3">
                        <Globe className="w-4 h-4 text-grey-400"/>
                        <span className="text-sm text-grey-600">{entry.country || "N/A"} </span>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {entry.categories.slice(0, 2).map((category) => (
                            <span
                              key={category}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primaryGold/10 text-primaryGold"
                            >
                              {categoryLabels[category] || category}
                            </span>
                          ))}
                          {entry.categories.length > 2 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                              +{entry.categories.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {formatDate(entry.createdAt)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Desktop Table View */}
              {viewMode === 'table' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 
                          Phone
                        </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 
                         Country
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Categories
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredEntries.map((entry) => (
                        <tr key={entry._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <User className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-sm font-medium text-gray-900">{entry.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-600">{entry.email}</span>
                            </div>
                          </td>
                           <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Globe className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-600">{entry.email}</span>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {entry.categories.slice(0, 3).map((category) => (
                                <span
                                  key={category}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primaryGold/10 text-primaryGold"
                                >
                                  {categoryLabels[category] || category}
                                </span>
                              ))}
                              {entry.categories.length > 3 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                  +{entry.categories.length - 3} more
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {formatDate(entry.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              entry.syncedToSheets
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {entry.syncedToSheets ? 'Synced' : 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 md:px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                            currentPage === page
                              ? 'bg-primaryGold text-black'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default WaitlistDashboardFixed;