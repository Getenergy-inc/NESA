'use client';
import React from 'react';
import { Wallet, Lock, TrendingUp, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface WalletBalanceCardProps {
  withdrawableBalance: number;
  lockedBalance: number;
  totalBalance: number;
  loading?: boolean;
  onRefresh?: () => void;
  showActions?: boolean;
  onPurchase?: () => void;
  onTransfer?: () => void;
}

export const WalletBalanceCard: React.FC<WalletBalanceCardProps> = ({
  withdrawableBalance,
  lockedBalance,
  totalBalance,
  loading = false,
  onRefresh,
  showActions = true,
  onPurchase,
  onTransfer
}) => {
  const formatAGC = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm opacity-90">Total Balance</p>
              <h2 className="text-3xl font-bold">
                {loading ? (
                  <span className="animate-pulse">---</span>
                ) : (
                  `${formatAGC(totalBalance)} AGC`
                )}
              </h2>
            </div>
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
              aria-label="Refresh balance"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>

        {/* Balance Breakdown */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4" />
              <p className="text-sm opacity-90">Withdrawable</p>
            </div>
            <p className="text-xl font-semibold">
              {loading ? (
                <span className="animate-pulse">---</span>
              ) : (
                `${formatAGC(withdrawableBalance)} AGC`
              )}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4" />
              <p className="text-sm opacity-90">Locked</p>
            </div>
            <p className="text-xl font-semibold">
              {loading ? (
                <span className="animate-pulse">---</span>
              ) : (
                `${formatAGC(lockedBalance)} AGC`
              )}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="flex gap-3">
            {onPurchase && (
              <button
                onClick={onPurchase}
                className="flex-1 bg-white text-orange-600 py-3 px-4 rounded-xl font-semibold hover:bg-orange-50 transition-colors"
              >
                Buy AGC
              </button>
            )}
            {onTransfer && (
              <button
                onClick={onTransfer}
                className="flex-1 bg-white/20 backdrop-blur-sm py-3 px-4 rounded-xl font-semibold hover:bg-white/30 transition-colors"
              >
                Transfer
              </button>
            )}
          </div>
        )}

        {/* Info Text */}
        <p className="text-xs opacity-75 mt-4">
          Locked balance includes signup bonuses and rewards that will be unlocked based on activity.
        </p>
      </div>
    </motion.div>
  );
};

export default WalletBalanceCard;
