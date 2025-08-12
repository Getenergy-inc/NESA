'use client';
import { Wallet, Zap, ArrowUpRight, Gift, Users, Vote, ShoppingCart, ArrowDown, Clock, X } from 'lucide-react';
import React, { useState } from 'react';

const WalletSummary: React.FC = () => {
  const [showEarningsModal, setShowEarningsModal] = useState(false);
  const walletId = "NESA/VIS/2025/000123";
  const balance = 1250;
  const pendingEarnings = 350;
  
  const earningActivities = [
    { icon: <Users className="w-5 h-5" />, label: "Successful Referral", points: "+500", description: "Earn points for every successful referral that leads to a nomination" },
    { icon: <Gift className="w-5 h-5" />, label: "Nomination Made", points: "+200", description: "Get points for each valid nomination you submit" },
    { icon: <Vote className="w-5 h-5" />, label: "Voting Activity", points: "+100", description: "Earn points for participating in voting activities" },
    { icon: <ShoppingCart className="w-5 h-5" />, label: "Merchandise Purchase", points: "+10 per $1", description: "Receive 10 points for every $1 spent on official merchandise" }
  ];

  return (
    <>
      <div className="bg-[#191307] rounded-lg overflow-hidden w-full h-auto flex flex-col border border-[#2A2108] group hover:border-[#E48900]/30 transition-all duration-300">
        {/* Header */}
        <div className="p-4 border-b border-[#2A2108]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ background: 'linear-gradient(135deg, #FFC247 0%, #E48900 100%)' }}>
                <Wallet className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">GFA Wallet</h2>
                <p className="text-sm text-gray-400">Auto-generated wallet ID</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">
              Active
            </span>
          </div>
        </div>
        
        {/* Wallet Details */}
        <div className="p-4 flex-grow space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Wallet ID</span>
              <span className="text-xs bg-[#1E1A0F] text-gray-300 px-2 py-1 rounded font-mono">
                {walletId}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Available Balance</span>
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-2" style={{ color: '#FFC247' }} />
                <span className="text-2xl font-bold text-white">{balance.toLocaleString()}</span>
                <span className="ml-1 text-sm text-gray-400">pts</span>
              </div>
            </div>
          </div>
          
          {/* Earning Activities - Now clickable */}
          <div 
            className="cursor-pointer hover:bg-[#1E1A0F]/50 transition-colors rounded-lg p-2"
            onClick={() => setShowEarningsModal(true)}
          >
            <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
              <span>How to earn more points.</span>
              <ArrowUpRight className="w-3 h-3 ml-1" />
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {earningActivities.slice(0, 2).map((activity, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-[#1E1A0F] rounded-lg">
                  <div className="p-1.5 rounded-lg" style={{ background: 'rgba(255, 194, 71, 0.1)' }}>
                    {React.cloneElement(activity.icon, { className: "w-4 h-4", style: { color: '#FFC247' } })}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{activity.label}</p>
                    <p className="text-xs font-medium" style={{ color: '#FFC247' }}>{activity.points}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Pending Earnings */}
          <div className="flex justify-between items-center p-3 rounded-lg" style={{ background: 'rgba(255, 194, 71, 0.05)', border: '1px solid rgba(255, 194, 71, 0.15)' }}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: '#FFC247' }} />
              <span className="text-sm text-gray-400">Pending Earnings</span>
            </div>
            <span className="text-sm font-medium" style={{ color: '#FFC247' }}>{pendingEarnings} pts</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="p-4 flex flex-col sm:flex-row gap-3 border-t border-[#2A2108]">
          <button 
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-sm font-medium transition-colors"
            style={{ 
              background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)',
              color: 'black'
            }}
          >
            <ArrowUpRight className="w-4 h-4" />
            Withdraw
          </button>
          <button 
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-sm font-medium transition-colors border border-gray-600 hover:bg-gray-800/50 text-white"
          >
            <ArrowDown className="w-4 h-4" />
            Deposit
          </button>
        </div>
        
        {/* Hover effect accent */}
        <div className="h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Earnings Modal */}
      {showEarningsModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#191307] rounded-lg max-w-md w-full border border-[#2A2108] max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-[#2A2108] flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Earning Activities</h3>
              <button 
                onClick={() => setShowEarningsModal(false)}
                className="p-1 rounded-full hover:bg-[#1E1A0F] transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {earningActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-[#1E1A0F] rounded-lg">
                  <div className="p-2 rounded-lg mt-0.5" style={{ background: 'rgba(255, 194, 71, 0.1)' }}>
                    {React.cloneElement(activity.icon, { className: "w-5 h-5", style: { color: '#FFC247' } })}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-white">{activity.label}</h4>
                      <span className="text-sm font-medium px-2 py-1 rounded" style={{ background: 'rgba(255, 194, 71, 0.1)', color: '#FFC247' }}>
                        {activity.points}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-400">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-[#2A2108]">
              <button 
                onClick={() => setShowEarningsModal(false)}
                className="w-full py-2 px-4 rounded-full text-black font-semibold text-sm transition-colors"
                style={{ background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletSummary;