'use client';
import { Wallet, Zap, ArrowUpRight, Gift, Users, Vote, ShoppingCart, ArrowDown, Clock  } from 'lucide-react';
import React from 'react';

const WalletSummary: React.FC = () => {
  const walletId = "NESA/VIS/2025/000123";
  const balance = 1250;
  const pendingEarnings = 350;
  
  const earningActivities = [
    { icon: <Users className="w-5 h-5 text-yellow-600" />, label: "Successful Referral", points: "+500" },
    { icon: <Gift className="w-5 h-5 text-yellow-600" />, label: "Nomination Made", points: "+200" },
    { icon: <Vote className="w-5 h-5 text-yellow-600" />, label: "Voting Activity", points: "+100" },
    { icon: <ShoppingCart className="w-5 h-5 text-yellow-600" />, label: "Merchandise Purchase", points: "+10 per $1" }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-50 to-dark-100 px-6 py-5 border-b border-dark-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-2.5 rounded-lg">
              <Wallet className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">GFA Wallet</h2>
              <p className="text-sm text-gray-500">Auto-generated wallet ID</p>
            </div>
          </div>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
            Active
          </span>
        </div>
      </div>
      
      {/* Wallet Details */}
      <div className="px-6 py-5 space-y-5">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-500">Wallet ID</span>
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-mono">
              {walletId}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Available Balance</span>
            <div className="flex items-center">
              <Zap className="w-5 h-5 text-yellow-500 mr-1" />
              <span className="text-2xl font-bold text-gray-900">{balance.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {/* Earnings Breakdown */}
        {/* <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Earn Points For:</h3>
          <div className="grid grid-cols-2 gap-3">
            {earningActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <div className="bg-yellow-100 p-1.5 rounded-lg">
                  {activity.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-600">{activity.label}</p>
                  <p className="text-xs font-medium text-yellow-600">{activity.points}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        
        {/* Pending Earnings */}
        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-600" />
            <span className="text-sm text-gray-700">Pending Earnings</span>
          </div>
          <span className="text-sm font-medium text-yellow-700">{pendingEarnings} pts</span>
        </div>
      </div>
      
      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors">
          <ArrowUpRight className="w-4 h-4" />
          Withdraw
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 py-2.5 px-4 border border-gray-300 rounded-lg text-sm font-medium transition-colors">
          <ArrowDown className="w-4 h-4" />
          Deposit
        </button>
      </div>
      
      {/* Hover effect accent */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default WalletSummary;