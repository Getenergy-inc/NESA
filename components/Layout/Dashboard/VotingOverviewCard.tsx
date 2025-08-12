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
    <div className="bg-[#191307] rounded-lg overflow-hidden w-full h-auto flex flex-col">
      <div className="p-4 flex-grow">
        <div className="mb-4 flex items-center">
          <FiBarChart2 className="mr-2 text-white" size={20} />
          <h2 className="text-white text-lg font-bold">Voting Overview</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Total Nominations */}
          <div className="bg-[#1E1A0F] p-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-blue-500/20 text-blue-400">
                <FiUsers size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Total Nominations</p>
                <p className="text-xl font-semibold text-white">{votingStats.totalNominations}</p>
              </div>
            </div>
          </div>
          
          {/* Approved for Voting */}
          <div className="bg-[#1E1A0F] p-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-400">
                <FiCheckCircle size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Approved for Voting</p>
                <p className="text-xl font-semibold text-white">{votingStats.approvedForVoting}</p>
              </div>
            </div>
          </div>
          
          {/* Votes Cast */}
          <div className="bg-[#1E1A0F] p-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-indigo-500/20 text-indigo-400">
                <FiAward size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Votes Cast</p>
                <p className="text-xl font-semibold text-white">{votingStats.votesCast}</p>
              </div>
            </div>
          </div>
          
          {/* Days Remaining */}
          <div className="bg-[#1E1A0F] p-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-amber-500/20 text-amber-400">
                <FiClock size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Days Remaining</p>
                <p className="text-xl font-semibold text-white">{votingStats.daysRemaining}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Current Leader */}
        <div className="bg-[#1E1A0F] p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-indigo-500/20 text-indigo-400">
                <FiAward size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Current Leader</p>
                <p className="font-semibold text-white">{votingStats.leadingNominee.name}</p>
              </div>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-400">
              {votingStats.leadingNominee.votes} votes
            </span>
          </div>
        </div>
      </div>
      
      {/* Footer Actions */}
      <div className="p-4 flex space-x-3">
        <button 
          onClick={() => router.push('/member/vote')}
          className="flex-1 flex items-center justify-center bg-transparent hover:bg-gray-800 text-white border border-gray-600 py-2 px-4 rounded-full text-sm font-medium transition-colors"
        >
          View Voting
        </button>
        <button 
          onClick={() => router.push('/member/createnominee')}
          className="flex-1 flex items-center justify-center text-black font-semibold py-2 px-4 rounded-full text-sm transition-colors"
          style={{background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)'}}
        >
          Create a Nominee
        </button>
      </div>
    </div>
  );
};

export default VotingOverviewCard;