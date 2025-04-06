// components/Dashboard/ReferralInfo.tsx
'use client';
import React from 'react';
import { FiShare2, FiUsers, FiAward } from 'react-icons/fi';

const ReferralInfo: React.FC = () => {
  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <FiUsers className="mr-2 text-amber-600" size={20} />
          Referral Program
        </h2>
      </div>
      
      <div className="px-6 py-4 space-y-5">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Your referral link</p>
          <div className="flex items-center">
            <input 
              type="text" 
              value="https://example.com/ref/12345" 
              readOnly
              className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 rounded-l-lg text-sm truncate"
            />
            <button className="bg-amber-100 hover:bg-amber-200 text-amber-800 py-2 px-3 rounded-r-lg border border-l-0 border-gray-200 transition-colors">
              <FiShare2 size={16} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">Total Referrals</p>
            <p className="text-xl font-bold text-gray-800">10</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">Earnings</p>
            <p className="text-xl font-bold text-gray-800">$250</p>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <button className="w-full flex items-center justify-center bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors">
          <FiAward className="mr-2" size={16} />
          Upgrade to Ambassador
        </button>
      </div>
    </div>
  );
};

export default ReferralInfo;