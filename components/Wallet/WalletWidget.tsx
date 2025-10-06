'use client';
import React from 'react';
import { Wallet, TrendingUp, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/lib/hooks/useWallet';

interface WalletWidgetProps {
  compact?: boolean;
  showActions?: boolean;
}

export const WalletWidget: React.FC<WalletWidgetProps> = ({ 
  compact = false,
  showActions = true 
}) => {
  const router = useRouter();
  const { totalBalance, withdrawableBalance, lockedBalance, loading } = useWallet();

  const formatAGC = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  if (compact) {
    return (
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Wallet className="w-4 h-4" />
              <p className="text-xs opacity-90">AGC Balance</p>
            </div>
            <h3 className="text-2xl font-bold">
              {loading ? (
                <span className="animate-pulse">---</span>
              ) : (
                `${formatAGC(totalBalance)}`
              )}
            </h3>
          </div>
          {showActions && (
            <button
              onClick={() => router.push('/ProfileSetting/ProfileWallet')}
              className="bg-white text-orange-600 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-orange-50 transition-colors"
            >
              View
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white/20 rounded-lg">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm opacity-90">Total Balance</p>
            <h3 className="text-2xl font-bold">
              {loading ? (
                <span className="animate-pulse">---</span>
              ) : (
                `${formatAGC(totalBalance)} AGC`
              )}
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center gap-1 mb-1">
            <TrendingUp className="w-3 h-3" />
            <p className="text-xs opacity-90">Withdrawable</p>
          </div>
          <p className="text-lg font-semibold">
            {loading ? '---' : formatAGC(withdrawableBalance)}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center gap-1 mb-1">
            <Lock className="w-3 h-3" />
            <p className="text-xs opacity-90">Locked</p>
          </div>
          <p className="text-lg font-semibold">
            {loading ? '---' : formatAGC(lockedBalance)}
          </p>
        </div>
      </div>

      {showActions && (
        <button
          onClick={() => router.push('/ProfileSetting/ProfileWallet')}
          className="w-full bg-white text-orange-600 py-2 px-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
        >
          View Full Wallet
        </button>
      )}
    </div>
  );
};

export default WalletWidget;
