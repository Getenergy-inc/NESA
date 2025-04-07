// components/Dashboard/VotingOverviewCard.tsx
'use client';
import React from 'react';
import { FiCheckCircle, FiUsers, FiAward, FiClock, FiBarChart2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const VotingOverviewCard: React.FC = () => {
  const router = useRouter();
  
  // Sample data - replace with your actual data
  const votingStats = {
    totalNominations: 24,
    approvedForVoting: 18,
    votesCast: 156,
    leadingNominee: {
      name: "Sarah Johnson",
      votes: 42
    },
    daysRemaining: 7
  };

  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <FiBarChart2 className="mr-2 text-indigo-600" size={20} />
          Voting Overview
        </h2>
      </div>
      
      <div className="px-6 py-4 grid grid-cols-2 gap-4">
        {/* Total Nominations */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
              <FiUsers size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Nominations</p>
              <p className="text-xl font-semibold text-gray-800">{votingStats.totalNominations}</p>
            </div>
          </div>
        </div>
        
        {/* Approved for Voting */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-emerald-100 text-emerald-600">
              <FiCheckCircle size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Approved for Voting</p>
              <p className="text-xl font-semibold text-gray-800">{votingStats.approvedForVoting}</p>
            </div>
          </div>
        </div>
        
        {/* Votes Cast */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
              <FiAward size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Votes Cast</p>
              <p className="text-xl font-semibold text-gray-800">{votingStats.votesCast}</p>
            </div>
          </div>
        </div>
        
        {/* Days Remaining */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-amber-100 text-amber-600">
              <FiClock size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Days Remaining</p>
              <p className="text-xl font-semibold text-gray-800">{votingStats.daysRemaining}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Current Leader */}
      <div className="px-6 py-3 bg-indigo-50 border-t border-indigo-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
              <FiAward size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Current Leader</p>
              <p className="font-semibold text-gray-800">{votingStats.leadingNominee.name}</p>
            </div>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {votingStats.leadingNominee.votes} votes
          </span>
        </div>
      </div>
      
      {/* Footer Actions */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex space-x-3">
        <button 
          onClick={() => router.push('/dashboard/voting')}
          className="flex-1 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors"
        >
          View Voting
        </button>
        <button 
          onClick={() => router.push('/dashboard/nominations')}
          className="flex-1 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors"
        >
          View Nominations
        </button>
      </div>
    </div>
  );
};

export default VotingOverviewCard;