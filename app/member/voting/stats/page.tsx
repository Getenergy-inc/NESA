'use client';
import { BarChart2, PieChart, Users, Award, Clock, Check, ChevronDown, RefreshCw } from 'lucide-react';
import { useState } from 'react';

const VotingStatsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('week');

  // Mock data
  const stats = {
    totalVotes: 12450,
    voters: 3250,
    participationRate: 78.5,
    leadingCategory: 'Innovation in Technology',
    leadingNominee: 'Aisha Bello',
    leadingVotes: 2156,
    categories: [
      { name: 'Innovation in Technology', votes: 2156, color: 'bg-yellow-400' },
      { name: 'Community Leadership', votes: 1892, color: 'bg-blue-400' },
      { name: 'Creative Arts', votes: 1567, color: 'bg-purple-400' },
      { name: 'Environmental Sustainability', votes: 1324, color: 'bg-green-400' },
      { name: 'Healthcare Advancement', votes: 987, color: 'bg-red-400' },
    ],
    timeline: [
      { day: 'Mon', votes: 450 },
      { day: 'Tue', votes: 1200 },
      { day: 'Wed', votes: 1800 },
      { day: 'Thu', votes: 2100 },
      { day: 'Fri', votes: 2400 },
      { day: 'Sat', votes: 1950 },
      { day: 'Sun', votes: 1650 },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Voting Statistics</h1>
            <p className="text-gray-600">Real-time insights and voting trends</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
                <option value="all">All time</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <button className="bg-white p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition ${activeTab === 'overview' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition ${activeTab === 'categories' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            By Category
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition ${activeTab === 'timeline' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            Timeline
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <BarChart2 className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h3 className="text-gray-500 font-medium">Total Votes</h3>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.totalVotes.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-2">Across all categories</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h3 className="text-gray-500 font-medium">Unique Voters</h3>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.voters.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-2">{stats.participationRate}% participation rate</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Award className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h3 className="text-gray-500 font-medium">Current Leader</h3>
                </div>
                <p className="text-xl font-bold text-gray-900">{stats.leadingNominee}</p>
                <p className="text-sm text-gray-500 mt-1">{stats.leadingVotes.toLocaleString()} votes in {stats.leadingCategory}</p>
              </div>
            </div>

            {/* Leading Categories */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-yellow-600" />
                Votes by Category
              </h3>
              <div className="space-y-4">
                {stats.categories.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{category.name}</span>
                      <span className="text-gray-500">{category.votes.toLocaleString()} votes</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`${category.color} h-2.5 rounded-full`} 
                        style={{ width: `${(category.votes / stats.totalVotes) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Detailed Category Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Votes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leading Nominee</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.categories.map((category, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{category.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{category.votes.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {((category.votes / stats.totalVotes) * 100).toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index === 0 ? stats.leadingNominee : `Nominee ${index + 1}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Voting Activity Timeline</h3>
            <div className="h-64">
              {/* This would be replaced with an actual chart library in production */}
              <div className="flex items-end h-48 gap-2 mt-8">
                {stats.timeline.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-yellow-400 rounded-t-sm hover:bg-yellow-500 transition"
                      style={{ height: `${(day.votes / 3000) * 100}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">{day.day}</span>
                    <span className="text-xs font-medium text-gray-700">{day.votes.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Last Updated */}
        <div className="mt-6 text-sm text-gray-500 flex items-center justify-end">
          <Clock className="w-4 h-4 mr-2" />
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default VotingStatsPage;