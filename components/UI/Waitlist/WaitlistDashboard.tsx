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
  Tag
} from 'lucide-react';

interface WaitlistEntry {
  _id: string;
  name: string;
  email: string;
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

const WaitlistDashboard: React.FC = () => {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [stats, setStats] = useState<WaitlistStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categoryLabels: { [key: string]: string } = {
    'vote_nominate': 'Vote or Nominate',
    'become_ambassador': 'Become Ambassador',
    'join_webinar_expo': 'Join Webinar/Expo',
    'sponsor_csr_partner': 'Sponsor or CSR Partner',
    'apply_judge': 'Apply as a Judge',
    'join_local_chapter': 'Join Local Chapter',
    'join_nesa_team': 'Join NESA Team',
    'apply_nrc_volunteer': 'Apply as NRC Volunteer',
    'get_gala_ticket': 'Get Gala Ticket',
    'donate': 'Donate'
  };

  const fetchData = async (page = 1) => {
    try {
      setRefreshing(true);
      
      // Fetch entries with timeout
      const entriesController = new AbortController();
      const entriesTimeout = setTimeout(() => entriesController.abort(), 10000);
      
      try {
        const entriesResponse = await fetch(`/api/waitlist?page=${page}&limit=10`, {
          signal: entriesController.signal
        });
        clearTimeout(entriesTimeout);
        
        if (entriesResponse.ok) {
          const entriesData = await entriesResponse.json();
          if (entriesData.success) {
            setEntries(entriesData.data.entries);
            setTotalPages(entriesData.data.pagination.pages);
          }
        } else {
          console.error('Failed to fetch entries:', entriesResponse.status);
        }
      } catch (entriesError: any) {
        clearTimeout(entriesTimeout);
        if (entriesError.name === 'AbortError') {
          console.error('Entries request timed out');
        } else {
          console.error('Error fetching entries:', entriesError);
        }
      }

      // Fetch stats with timeout
      const statsController = new AbortController();
      const statsTimeout = setTimeout(() => statsController.abort(), 10000);
      
      try {
        const statsResponse = await fetch('/api/waitlist?action=stats', {
          signal: statsController.signal
        });
        clearTimeout(statsTimeout);
        
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          if (statsData.success) {
            setStats(statsData.data);
          }
        } else {
          console.error('Failed to fetch stats:', statsResponse.status);
        }
      } catch (statsError: any) {
        clearTimeout(statsTimeout);
        if (statsError.name === 'AbortError') {
          console.error('Stats request timed out');
        } else {
          console.error('Error fetching stats:', statsError);
        }
      }
    } catch (error) {
      console.error('Error fetching waitlist data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleRefresh = () => {
    fetchData(currentPage);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primaryGold mx-auto mb-4" />
          <p className="text-gray-600">Loading waitlist data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Waitlist Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage and monitor your NESA waitlist</p>
          </div>
          
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 bg-primaryGold hover:bg-deepGold text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Entries</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.database.totalEntries}</p>
                </div>
                <Users className="w-8 h-8 text-primaryGold" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Sheets Synced</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.sheets ? stats.sheets.totalEntries : 'N/A'}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Most Popular</p>
                  <p className="text-lg font-bold text-gray-900">
                    {Object.entries(stats.database.categoryStats).length > 0
                      ? categoryLabels[Object.entries(stats.database.categoryStats).sort(([,a], [,b]) => b - a)[0][0]]
                      : 'N/A'}
                  </p>
                </div>
                <Tag className="w-8 h-8 text-blue-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Recent Signups</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.database.recentSignups.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
            </motion.div>
          </div>
        )}

        {/* Category Stats */}
        {stats && Object.keys(stats.database.categoryStats).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-md p-6 mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Category Breakdown</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(stats.database.categoryStats)
                .sort(([,a], [,b]) => b - a)
                .map(([category, count]) => (
                  <div key={category} className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-primaryGold">{count}</p>
                    <p className="text-sm text-gray-600">{categoryLabels[category] || category}</p>
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Entries Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Entries</h2>
          </div>

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
                    Categories
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Synced
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entries.map((entry) => (
                  <tr key={entry._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{entry.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default WaitlistDashboard;