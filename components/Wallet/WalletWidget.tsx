'use client';
import React from 'react';
import { Wallet, TrendingUp, Gift, Sparkles, ArrowRight, CreditCard } from 'lucide-react';
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
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow">
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
              onClick={() => router.push('/member/ProfileSetting/ProfileWallet')}
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
    <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">My Wallet</h3>
            <p className="text-xs opacity-80">AGC Balance Overview</p>
          </div>
        </div>

        {/* Balance Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Purchased AGC Card */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-200 group">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-green-400/20 rounded-lg">
                <CreditCard className="w-4 h-4 text-green-100" />
              </div>
              <p className="text-sm font-semibold">Purchased AGC</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold tracking-tight">
                {loading ? (
                  <span className="animate-pulse">---</span>
                ) : (
                  formatAGC(withdrawableBalance)
                )}
              </p>
              <p className="text-xs opacity-75 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                ≈ ${loading ? '---' : formatAGC(withdrawableBalance * 0.05)} USD
              </p>
            </div>
            {showActions && (
              <button
                onClick={() => router.push('/member/ProfileSetting/ProfileWallet')}
                className="mt-3 w-full bg-white/20 hover:bg-white/30 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 group-hover:gap-3"
              >
                <span>Buy More</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Bonus AGC Card */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-yellow-400/20 rounded-lg">
                <Gift className="w-4 h-4 text-yellow-100" />
              </div>
              <p className="text-sm font-semibold">Bonus AGC</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold tracking-tight">
                {loading ? (
                  <span className="animate-pulse">---</span>
                ) : (
                  formatAGC(lockedBalance)
                )}
              </p>
              <p className="text-xs opacity-75">For voting & platform use</p>
            </div>
            <div className="mt-3 py-2 px-3 bg-yellow-400/10 rounded-lg">
              <p className="text-xs text-yellow-100">🎁 Earned from bonuses</p>
            </div>
          </div>
        </div>

        {/* Total Balance Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">Total Balance</span>
            </div>
            <div className="text-right">
              <p className="text-2xl sm:text-3xl font-bold">
                {loading ? (
                  <span className="animate-pulse">---</span>
                ) : (
                  `${formatAGC(totalBalance)} AGC`
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {showActions && (
          <button
            onClick={() => router.push('/member/ProfileSetting/ProfileWallet')}
            className="w-full bg-white text-orange-600 py-3 px-4 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group"
          >
            <span>View Full Wallet</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

export default WalletWidget;
