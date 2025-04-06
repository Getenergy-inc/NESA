// components/Dashboard/WalletSummary.tsx
'use client';
import React from 'react';

const WalletSummary: React.FC = () => {
  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          GFA Wallet
        </h2>
      </div>
      
      <div className="px-6 py-4 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <span className="text-gray-500">Wallet ID</span>
          <span className="font-medium text-gray-800">#GF-123456</span>
        </div>
        
        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <span className="text-gray-500">Available Balance</span>
          <span className="text-2xl font-bold text-indigo-600">$250.00</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Pending Transactions</span>
          <span className="font-medium text-gray-800">$0.00</span>
        </div>
      </div>
      
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex space-x-3">
        <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
          Deposit
        </button>
        <button className="flex-1 bg-white hover:bg-gray-50 text-gray-800 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium transition-colors">
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default WalletSummary;