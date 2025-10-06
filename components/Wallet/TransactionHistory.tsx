'use client';
import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { WalletTransaction } from '@/lib/services/walletService';

interface TransactionHistoryProps {
  transactions: WalletTransaction[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  loading = false,
  onLoadMore,
  hasMore = false
}) => {
  const formatAGC = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'CREDIT':
      case 'PURCHASE_USER':
        return <ArrowDownLeft className="w-5 h-5 text-green-600" />;
      case 'DEBIT':
      case 'TRANSFER':
        return <ArrowUpRight className="w-5 h-5 text-red-600" />;
      default:
        return <ArrowDownLeft className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'PENDING':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'FAILED':
      case 'CANCELLED':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'CREDIT':
      case 'PURCHASE_USER':
        return 'text-green-600';
      case 'DEBIT':
      case 'TRANSFER':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading && transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Transaction History</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-300 rounded w-1/2" />
              </div>
              <div className="h-6 bg-gray-300 rounded w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Transaction History</h3>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600">No transactions yet</p>
          <p className="text-sm text-gray-500 mt-2">Your transaction history will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Transaction History</h3>
      
      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
          >
            {/* Icon */}
            <div className="p-2 bg-gray-100 rounded-full">
              {getTransactionIcon(transaction.type)}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-gray-900 truncate">
                  {transaction.description || transaction.reason}
                </p>
                {getStatusIcon(transaction.status)}
              </div>
              <p className="text-sm text-gray-500">
                {formatDate(transaction.createdAt)}
              </p>
            </div>

            {/* Amount */}
            <div className="text-right">
              <p className={`font-bold text-lg ${getTransactionColor(transaction.type)}`}>
                {transaction.type === 'CREDIT' || transaction.type === 'PURCHASE_USER' ? '+' : '-'}
                {formatAGC(transaction.amount)} AGC
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {transaction.status.toLowerCase()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && onLoadMore && (
        <button
          onClick={onLoadMore}
          disabled={loading}
          className="w-full mt-4 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default TransactionHistory;
