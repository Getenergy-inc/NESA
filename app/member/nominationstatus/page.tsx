// app/dashboard/voting/page.tsx
import React from 'react';
import { FiAward, FiCheckCircle, FiUsers, FiArrowLeft, FiBarChart2, FiClock, FiUser } from 'react-icons/fi';
import Link from 'next/link';

const VotingPage = () => {
  // Sample data - replace with your actual data
  const nominees = [
    {
      id: 1,
      name: 'Sarah Johnson',
      votes: 42,
      percentage: 28,
      status: 'leading',
      description: 'Community leader with outstanding contributions'
    },
    {
      id: 2,
      name: 'Michael Chen',
      votes: 38,
      percentage: 25,
      status: 'active',
      description: 'Innovative thinker with multiple awards'
    },
    {
      id: 3,
      name: 'John Smith',
      votes: 32,
      percentage: 21,
      status: 'active',
      description: 'Experienced professional with 10+ years in the industry'
    },
    {
      id: 4,
      name: 'Emma Davis',
      votes: 22,
      percentage: 14,
      status: 'active',
      description: 'Young professional with great potential'
    },
    {
      id: 5,
      name: 'David Wilson',
      votes: 12,
      percentage: 8,
      status: 'active',
      description: 'Technical expert with numerous publications'
    }
  ];

  const totalVotes = nominees.reduce((sum, nominee) => sum + nominee.votes, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/dashboard" className="mr-4 p-1 rounded-lg hover:bg-white transition-colors">
            <FiArrowLeft size={20} className="text-gray-600" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FiAward className="mr-2 text-indigo-600" size={24} />
            Voting Center
          </h1>
        </div>
        <div className="text-sm text-gray-500">
          {totalVotes} total votes cast
        </div>
      </div>

      {/* Stats Summary */}
      <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-4 border-b border-gray-100">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Total Nominations</p>
          <p className="text-xl font-semibold text-gray-800 flex items-center">
            <FiUsers className="mr-2 text-blue-500" size={18} />
            {nominees.length}
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Total Votes</p>
          <p className="text-xl font-semibold text-gray-800 flex items-center">
            <FiCheckCircle className="mr-2 text-emerald-500" size={18} />
            {totalVotes}
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Leading Candidate</p>
          <p className="text-xl font-semibold text-gray-800 flex items-center">
            <FiAward className="mr-2 text-indigo-500" size={18} />
            {nominees[0].name}
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Voting Closes In</p>
          <p className="text-xl font-semibold text-gray-800 flex items-center">
            <FiClock className="mr-2 text-amber-500" size={18} />
            7 days
          </p>
        </div>
      </div>

      {/* Voting Progress */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
          <FiBarChart2 className="mr-2 text-indigo-500" size={18} />
          Voting Progress
        </h3>
        <div className="space-y-4">
          {nominees.map((nominee) => (
            <div key={nominee.id} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">{nominee.name}</span>
                <span className="text-xs font-medium text-gray-500">
                  {nominee.votes} votes ({nominee.percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    nominee.status === 'leading' ? 'bg-indigo-600' : 'bg-blue-500'
                  }`} 
                  style={{ width: `${nominee.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nominees List */}
      <div className="divide-y divide-gray-100">
        {nominees.map((nominee) => (
          <div key={nominee.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-4">
              <div className={`mt-1 p-2 rounded-full ${
                nominee.status === 'leading' ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-100 text-blue-600'
              }`}>
                <FiUser size={20} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{nominee.name}</h3>
                    <p className="text-sm text-gray-500">{nominee.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      nominee.status === 'leading' ? 'bg-indigo-100 text-indigo-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {nominee.votes} votes
                    </span>
                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline">
                      Vote
                    </button>
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${
                      nominee.status === 'leading' ? 'bg-indigo-600' : 'bg-blue-500'
                    }`} 
                    style={{ width: `${nominee.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotingPage;