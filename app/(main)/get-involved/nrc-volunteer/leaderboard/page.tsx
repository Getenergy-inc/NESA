'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp, Users } from 'lucide-react';
import nrcService from '@/lib/services/nrcService';

interface LeaderboardEntry {
  rank: number;
  volunteerId: string;
  fullName: string;
  displayName: string;
  country: string;
  nomineesUploaded: number;
  agcEarned: number;
  level: string;
  badge: string | null;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<'uploads' | 'agc'>('uploads');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get current NRC user ID
    if (typeof window !== 'undefined') {
      setCurrentUserId(localStorage.getItem('nrc_user_id'));
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [type]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await nrcService.getLeaderboard(type, 20);
      setLeaderboard(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-600" />;
    return <span className="text-lg font-bold text-gray-600">{rank}</span>;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300';
    if (rank === 2) return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300';
    if (rank === 3) return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300';
    return 'bg-white border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Trophy className="w-8 h-8 text-orange-600" />
                NRC Volunteer Leaderboard
              </h1>
              <p className="text-gray-600 mt-2">
                Top performing volunteers in the Nomination Research Campaign
              </p>
            </div>
          </div>
        </motion.div>

        {/* Type Selector */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setType('uploads')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                type === 'uploads'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Users className="w-5 h-5 inline mr-2" />
              Most Uploads
            </button>
            <button
              onClick={() => setType('agc')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                type === 'agc'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <TrendingUp className="w-5 h-5 inline mr-2" />
              Most AGC Earned
            </button>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading leaderboard...</p>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <Award className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>No volunteers found yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {leaderboard.map((entry) => (
                <motion.div
                  key={entry.volunteerId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: entry.rank * 0.05 }}
                  className={`p-6 border-l-4 ${getRankBg(entry.rank)} ${
                    entry.volunteerId === currentUserId ? 'ring-2 ring-orange-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Rank */}
                      <div className="w-12 h-12 flex items-center justify-center">
                        {getRankIcon(entry.rank)}
                      </div>

                      {/* Volunteer Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {entry.displayName}
                          </h3>
                          {entry.volunteerId === currentUserId && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">
                              You
                            </span>
                          )}
                          {entry.badge && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">
                              {entry.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span>{entry.country}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-orange-600 font-medium">{entry.level}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex gap-8 text-center">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            {entry.nomineesUploaded}
                          </div>
                          <div className="text-xs text-gray-500">Uploads</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-orange-600">
                            {entry.agcEarned.toFixed(0)}
                          </div>
                          <div className="text-xs text-gray-500">AGC</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <h3 className="font-semibold text-blue-900 mb-2">How Rankings Work</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Rankings are updated in real-time based on verified nominees</li>
            <li>• Earn 10 AGC tokens for each verified nominee</li>
            <li>• Top performers receive special badges and recognition</li>
            <li>• Keep uploading quality nominees to climb the ranks!</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
