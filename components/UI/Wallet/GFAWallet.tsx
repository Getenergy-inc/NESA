"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus,
  Minus,
  RefreshCw,
  Eye,
  EyeOff,
  TrendingUp,
  DollarSign,
  Coins
} from 'lucide-react';
import Button from '@/components/Common/Button';

interface WalletBalance {
  agc: number; // AfriGold Coin
  usd: number;
  ngn: number;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  currency: string;
  description: string;
  timestamp: string;
  status: string;
}

interface GFAWalletProps {
  userId?: string;
  compact?: boolean;
  showTransactions?: boolean;
}

const GFAWallet: React.FC<GFAWalletProps> = ({ 
  userId = 'user123', 
  compact = false, 
  showTransactions = true 
}) => {
  const [balance, setBalance] = useState<WalletBalance>({ agc: 0, usd: 0, ngn: 0 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchWalletData();
  }, [userId]);

  const fetchWalletData = async () => {
    try {
      setRefreshing(true);
      const response = await fetch(`/api/gfa-wallet/balance?userId=${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setBalance(data.wallet.balance);
        // Mock transactions for display
        setTransactions([
          {
            id: 'tx001',
            type: 'endorsement_payment',
            amount: -500,
            currency: 'usd',
            description: 'NESA-Africa Endorsement - Silver Tier',
            timestamp: '2024-01-20T14:30:00Z',
            status: 'completed'
          },
          {
            id: 'tx002',
            type: 'deposit',
            amount: 1000,
            currency: 'usd',
            description: 'Wallet Top-up',
            timestamp: '2024-01-15T10:15:00Z',
            status: 'completed'
          },
          {
            id: 'tx003',
            type: 'agc_purchase',
            amount: 250,
            currency: 'agc',
            description: 'AfriGold Coin Purchase',
            timestamp: '2024-01-10T09:20:00Z',
            status: 'completed'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleTopUp = async (amount: number, currency: string) => {
    try {
      const response = await fetch('/api/gfa-wallet/balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          amount,
          currency,
          type: 'deposit',
          description: `Wallet top-up - ${currency.toUpperCase()}`
        }),
      });

      const result = await response.json();
      if (result.success) {
        setBalance(result.wallet.balance);
        fetchWalletData(); // Refresh to get updated transactions
      }
    } catch (error) {
      console.error('Error topping up wallet:', error);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    switch (currency) {
      case 'agc':
        return `${amount.toLocaleString()} AGC`;
      case 'usd':
        return `$${amount.toLocaleString()}`;
      case 'ngn':
        return `₦${amount.toLocaleString()}`;
      default:
        return amount.toLocaleString();
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'agc_purchase':
        return <ArrowDownLeft className="w-4 h-4 text-green-600" />;
      case 'endorsement_payment':
      case 'withdrawal':
        return <ArrowUpRight className="w-4 h-4 text-red-600" />;
      default:
        return <CreditCard className="w-4 h-4 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-[#ea580c] to-[#dc2626] text-white rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            <span className="font-semibold">GFA Wallet</span>
          </div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="text-white/80 hover:text-white"
          >
            {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <div className="mt-2">
          {showBalance ? (
            <div className="text-lg font-bold">
              {formatCurrency(balance.usd, 'usd')}
            </div>
          ) : (
            <div className="text-lg font-bold">••••••</div>
          )}
          <div className="text-sm text-white/80">
            {showBalance ? `${formatCurrency(balance.agc, 'agc')} available` : 'Balance hidden'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* USD Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-[#ea580c] to-[#dc2626] text-white rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-6 h-6" />
              <span className="font-semibold">USD Balance</span>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-white/80 hover:text-white"
            >
              {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="text-3xl font-bold mb-2">
            {showBalance ? formatCurrency(balance.usd, 'usd') : '••••••'}
          </div>
          <div className="text-white/80 text-sm">
            Available for transactions
          </div>
        </motion.div>

        {/* AfriGold Coin Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Coins className="w-6 h-6" />
              <span className="font-semibold">AfriGold Coin</span>
            </div>
            <TrendingUp className="w-5 h-5 text-white/80" />
          </div>
          <div className="text-3xl font-bold mb-2">
            {showBalance ? formatCurrency(balance.agc, 'agc') : '••••••'}
          </div>
          <div className="text-white/80 text-sm">
            Premium currency
          </div>
        </motion.div>

        {/* NGN Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wallet className="w-6 h-6" />
              <span className="font-semibold">NGN Balance</span>
            </div>
            <button
              onClick={fetchWalletData}
              className={`text-white/80 hover:text-white ${refreshing ? 'animate-spin' : ''}`}
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
          <div className="text-3xl font-bold mb-2">
            {showBalance ? formatCurrency(balance.ngn, 'ngn') : '••••••'}
          </div>
          <div className="text-white/80 text-sm">
            Local currency
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            text="Top Up USD"
            variant="outline"
            size="small"
            onClick={() => handleTopUp(100, 'usd')}
            className="border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white"
            icon={<Plus className="w-4 h-4" />}
          />
          <Button
            text="Buy AGC"
            variant="outline"
            size="small"
            onClick={() => handleTopUp(50, 'agc')}
            className="border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white"
            icon={<Coins className="w-4 h-4" />}
          />
          <Button
            text="Add NGN"
            variant="outline"
            size="small"
            onClick={() => handleTopUp(50000, 'ngn')}
            className="border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
            icon={<Plus className="w-4 h-4" />}
          />
          <Button
            text="Refresh"
            variant="outline"
            size="small"
            onClick={fetchWalletData}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
            icon={<RefreshCw className="w-4 h-4" />}
          />
        </div>
      </motion.div>

      {/* Recent Transactions */}
      {showTransactions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(transaction.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount), transaction.currency)}
                  </p>
                  <p className="text-sm text-gray-600 capitalize">{transaction.status}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GFAWallet;
