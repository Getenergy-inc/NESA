// components/Dashboard/ReferralInfo.tsx
'use client';
import React from 'react';
import { FiShare2, FiUsers, FiAward } from 'react-icons/fi';

const ReferralInfo: React.FC = () => {
  const referralLink = "https://example.com/ref/12345";
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    // You could add a toast notification here
  };

  return (
    <div className="bg-[#191307] rounded-lg overflow-hidden w-full h-auto flex flex-col border border-[#2A2108] group hover:border-[#E48900]/30 transition-all duration-300">
      {/* Header */}
      <div className="p-4 border-b border-[#2A2108]">
        <div className="flex items-center">
          <div className="p-2 rounded-lg mr-3" style={{ background: 'rgba(255, 194, 71, 0.1)' }}>
            <FiUsers className="w-5 h-5" style={{ color: '#FFC247' }} />
          </div>
          <h2 className="text-lg font-bold text-white">Referral Program</h2>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 flex-grow space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-400 mb-2">Your referral link</p>
          <div className="flex items-center">
            <input 
              type="text" 
              value={referralLink}
              readOnly
              className="flex-1 bg-[#1E1A0F] border border-[#2A2108] text-gray-300 py-2 px-3 rounded-l-lg text-sm truncate focus:outline-none focus:ring-1 focus:ring-[#FFC247]/50"
            />
            <button 
              onClick={copyToClipboard}
              className="bg-[#1E1A0F] hover:bg-[#2A2108] text-[#FFC247] py-2 px-3 rounded-r-lg border border-l-0 border-[#2A2108] transition-colors flex items-center"
              title="Copy to clipboard"
            >
              <FiShare2 size={16} />
              <span className="sr-only">Copy</span>
            </button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1E1A0F] p-3 rounded-lg border border-[#2A2108] hover:border-[#FFC247]/30 transition-colors">
            <p className="text-xs text-gray-400">Total Referrals</p>
            <p className="text-xl font-bold text-white">10</p>
          </div>
          <div className="bg-[#1E1A0F] p-3 rounded-lg border border-[#2A2108] hover:border-[#FFC247]/30 transition-colors">
            <p className="text-xs text-gray-400">Earnings</p>
            <p className="text-xl font-bold text-white flex items-center">
              <span style={{ color: '#FFC247' }}>$</span>250
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-[#2A2108]">
        <button 
          className="w-full flex items-center justify-center py-2.5 px-4 rounded-full text-sm font-medium transition-colors"
          style={{ 
            background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)',
            color: 'black'
          }}
        >
          <FiAward className="mr-2" size={16} />
          Upgrade to Ambassador
        </button>
      </div>
      
      {/* Hover effect accent */}
      <div className="h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default ReferralInfo;