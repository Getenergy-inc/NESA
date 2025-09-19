'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star, TrendingUp } from 'lucide-react';

// Define the volunteer type
interface Volunteer {
  rank: number;
  name: string;
  country: string;
  avatar: string;
  uploads: number;
  verified: number;
  agc: number;
}

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'allTime'>('monthly');

  // Sample leaderboard data - will be fetched from API
  const leaderboardData: Record<string, Volunteer[]> = {
    weekly: [
      { rank: 1, name: 'John Doe', country: 'Kenya', avatar: '👨🏾‍💻', uploads: 120, verified: 110, agc: 550 },
      { rank: 2, name: 'Jane Smith', country: 'Nigeria', avatar: '👩🏾‍🔬', uploads: 105, verified: 98, agc: 490 },
      { rank: 3, name: 'David Osei', country: 'Ghana', avatar: '👨🏿‍🎓', uploads: 95, verified: 90, agc: 450 },
      { rank: 4, name: 'Amina Hassan', country: 'Tanzania', avatar: '👩🏽‍🏫', uploads: 85, verified: 80, agc: 400 },
      { rank: 5, name: 'Michael Abebe', country: 'Ethiopia', avatar: '👨🏾‍🔧', uploads: 75, verified: 70, agc: 350 }
    ],
    monthly: [
      { rank: 1, name: 'Sarah Kimani', country: 'Kenya', avatar: '👩🏾‍💼', uploads: 320, verified: 290, agc: 1450 },
      { rank: 2, name: 'Emmanuel Adeyemi', country: 'Nigeria', avatar: '👨🏿‍🚀', uploads: 280, verified: 260, agc: 1300 },
      { rank: 3, name: 'Fatima Diallo', country: 'Senegal', avatar: '👩🏿‍⚕️', uploads: 250, verified: 230, agc: 1150 },
      { rank: 4, name: 'Robert Mensah', country: 'Ghana', avatar: '👨🏾‍🍳', uploads: 220, verified: 200, agc: 1000 },
      { rank: 5, name: 'Zainab Mohammed', country: 'Egypt', avatar: '👩🏽‍🔧', uploads: 190, verified: 170, agc: 850 }
    ],
    allTime: [
      { rank: 1, name: 'Daniel Mwangi', country: 'Kenya', avatar: '👨🏾‍🎨', uploads: 1200, verified: 1100, agc: 5500 },
      { rank: 2, name: 'Chioma Okonkwo', country: 'Nigeria', avatar: '👩🏿‍🏭', uploads: 1100, verified: 1000, agc: 5000 },
      { rank: 3, name: 'Kwame Asante', country: 'Ghana', avatar: '👨🏿‍✈️', uploads: 1000, verified: 900, agc: 4500 },
      { rank: 4, name: 'Aisha Juma', country: 'Tanzania', avatar: '👩🏾‍🌾', uploads: 900, verified: 800, agc: 4000 },
      { rank: 5, name: 'Tewodros Haile', country: 'Ethiopia', avatar: '👨🏾‍🏫', uploads: 800, verified: 700, agc: 3500 }
    ]
  };

  const currentData = leaderboardData[timeframe];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <Star className="w-6 h-6 text-blue-500" />;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3: return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default: return 'bg-gradient-to-r from-blue-400 to-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">NRC Leaderboard</h1>
              <p className="text-gray-600 mt-2">Top performing volunteers across Africa</p>
            </div>
            <div className="flex space-x-2">
              {(['weekly', 'monthly', 'allTime'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    timeframe === period
                      ? 'bg-[#ea580c] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period === 'allTime' ? 'All Time' : period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        {currentData.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-3 gap-6 mb-8"
          >
            {currentData.slice(0, 3).map((volunteer, index) => (
            <div
              key={volunteer.rank}
              className={`relative bg-white rounded-lg shadow-lg p-6 text-center ${
                index === 0 ? 'md:order-2 transform md:scale-110' : 
                index === 1 ? 'md:order-1' : 'md:order-3'
              }`}
            >
              <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full ${getRankBg(volunteer.rank)} flex items-center justify-center`}>
                {getRankIcon(volunteer.rank)}
              </div>
              <div className="mt-6">
                <div className="text-4xl mb-2">{volunteer.avatar}</div>
                <h3 className="text-xl font-bold text-gray-900">{volunteer.name}</h3>
                <p className="text-gray-600">{volunteer.country}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Uploads:</span>
                    <span className="font-semibold">{volunteer.uploads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Verified:</span>
                    <span className="font-semibold text-green-600">{volunteer.verified}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">AGC Earned:</span>
                    <span className="font-semibold text-yellow-600">{volunteer.agc}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        ) : null}

        {/* Full Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Complete Rankings
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volunteer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uploads
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Success Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AGC Earned
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((volunteer) => (
                  <tr key={volunteer.rank} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getRankIcon(volunteer.rank)}
                        <span className="ml-2 text-lg font-bold text-gray-900">#{volunteer.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{volunteer.avatar}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{volunteer.name}</div>
                          <div className="text-sm text-gray-500">{volunteer.country}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{volunteer.uploads}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">{volunteer.verified}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600">
                        {Math.round((volunteer.verified / volunteer.uploads) * 100)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-yellow-600">{volunteer.agc} AGC</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}