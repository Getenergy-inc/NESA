'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  User,
  Wallet,
  Share2,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';
import { IoLogOut } from 'react-icons/io5';
import { useWallet } from '@/lib/hooks/useWallet';
import { useAuthContext } from '@/lib/context/AuthContext';
import WalletBalanceCard from '@/components/Wallet/WalletBalanceCard';

export default function WalletPage() {
  const router = useRouter();
  const { logout } = useAuthContext();
  const {
    withdrawableBalance,
    lockedBalance,
    totalBalance,
    transactions,
    loading,
    transactionsLoading,
    error,
    refresh,
    fetchTransactions
  } = useWallet();

  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    fetchTransactions(currentPage, transactionsPerPage);
  }, [currentPage]);

  const handleLogout = () => {
    logout();
    window.location.href = '/account/login';
  };

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
      case 'PURCHASE_COMPANY':
        return <ArrowDownLeft className="w-5 h-5 text-green-600" />;
      case 'DEBIT':
      case 'TRANSFER':
        return <ArrowUpRight className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
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
      case 'PURCHASE_COMPANY':
        return 'text-green-600';
      case 'DEBIT':
      case 'TRANSFER':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-white pt-20">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-[#151007] p-6 flex pt-[50px] flex-col space-y-6 items-center md:items-start">
        <div className="flex flex-col gap-5">
          <button
            onClick={() => router.push('/member/profile')}
            className="flex items-center px-2 md:px-4 py-2 rounded text-sm hover:bg-white/10"
          >
            <User className="w-5 h-5" />
            <span className="hidden md:inline ml-2">Profile Settings</span>
          </button>

          <button className="font-normal px-2 md:px-4 py-2 border bg-white text-black border-white/30 rounded text-sm flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            <span className="hidden md:inline ml-2">Wallet</span>
          </button>

          <button
            onClick={() => router.push('/member/referrals')}
            className="flex items-center px-2 md:px-4 py-2 rounded text-sm hover:bg-white/10"
          >
            <Share2 className="w-5 h-5" />
            <span className="hidden md:inline ml-2">Referrals</span>
          </button>

          {/* Logout Button */}
          <div className="flex justify-center mt-4 sm:mt-6 mb-8 sm:mb-12">
            <button
              onClick={handleLogout}
              className="px-3 sm:px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-300 hover:opacity-80 active:transform active:scale-95"
              style={{ fontSize: '18px', marginBottom: '24px' }}
            >
              <IoLogOut size={24} style={{ color: '#CDA292' }} />
              <span style={{ fontSize: '18px', color: '#CDA292' }}>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 space-y-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wallet</h1>
            <p className="text-gray-600">Manage your AGC balance and transactions</p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Wallet Balance Card */}
          <div className="mb-8">
            <WalletBalanceCard
              withdrawableBalance={withdrawableBalance}
              lockedBalance={lockedBalance}
              totalBalance={totalBalance}
              loading={loading}
              onRefresh={refresh}
              showActions={true}
              onPurchase={() => setShowPurchaseModal(true)}
              onTransfer={() => setShowTransferModal(true)}
            />
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
              <button
                onClick={() => fetchTransactions(currentPage, transactionsPerPage)}
                className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center gap-2"
                disabled={transactionsLoading}
              >
                {transactionsLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Refresh'
                )}
              </button>
            </div>

            {transactionsLoading && transactions.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-12">
                <Wallet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No transactions yet</p>
                <p className="text-gray-400 text-sm mt-2">Your transaction history will appear here</p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-900">
                              {transaction.description || transaction.reason}
                            </p>
                            {getStatusIcon(transaction.status)}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {formatDate(transaction.createdAt)}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {transaction.type.replace(/_/g, ' ')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${getTransactionColor(transaction.type)}`}>
                          {transaction.type === 'DEBIT' || transaction.type === 'TRANSFER' ? '-' : '+'}
                          {formatAGC(transaction.amount)} AGC
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          transaction.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                          transaction.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1 || transactionsLoading}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-gray-700 px-4">Page {currentPage}</span>
                  <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={transactions.length < transactionsPerPage || transactionsLoading}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Wallet className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">About AGC</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                AfriGold Coin (AGC) is NESA's digital currency used for voting, nominations, and platform activities.
              </p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-3 p-2 bg-white/50 rounded-lg">
                  <span className="text-orange-600 text-lg">💰</span>
                  <span>Purchase AGC to support nominees and participate</span>
                </li>
                <li className="flex items-start gap-3 p-2 bg-white/50 rounded-lg">
                  <span className="text-orange-600 text-lg">🎁</span>
                  <span>Earn bonus AGC through signups and referrals</span>
                </li>
                <li className="flex items-start gap-3 p-2 bg-white/50 rounded-lg">
                  <span className="text-orange-600 text-lg">🗳️</span>
                  <span>Use AGC to vote for your favorite nominees</span>
                </li>
                <li className="flex items-start gap-3 p-2 bg-white/50 rounded-lg">
                  <span className="text-orange-600 text-lg">↔️</span>
                  <span>Transfer AGC to other NESA members</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-6 border border-blue-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Image src="/images/NESA Logo 2.png" alt="AGC" width={20} height={20} className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Balance Types</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-xl border border-green-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">💳</span>
                    <p className="font-semibold text-gray-900">Purchased AGC</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    AGC you've purchased with real money. Can be used for all platform activities including voting, transfers, and donations.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Conversion: $1 USD = 20 AGC
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-yellow-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🎁</span>
                    <p className="font-semibold text-gray-900">Bonus AGC</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Free AGC earned from signups, referrals, and platform bonuses. Can be used for voting and platform activities.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Earn more through referrals and participation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals - To be implemented */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Purchase AGC</h3>
            <p className="text-gray-600 mb-4">Purchase functionality coming soon!</p>
            <button
              onClick={() => setShowPurchaseModal(false)}
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showTransferModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Transfer AGC</h3>
            <p className="text-gray-600 mb-4">Transfer functionality coming soon!</p>
            <button
              onClick={() => setShowTransferModal(false)}
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
