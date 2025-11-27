'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  User,
  Wallet,
  Share2
} from 'lucide-react';
import { IoLogOut } from 'react-icons/io5';
import { useWallet } from '@/lib/hooks/useWallet';
import { useAuthContext } from '@/lib/context/AuthContext';
import WalletBalanceCard from '@/components/Wallet/WalletBalanceCard';
import TransactionHistory from '@/components/Wallet/TransactionHistory';

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
    refresh
  } = useWallet();

  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/account/login';
  };


  return (
    <div className="flex min-h-screen bg-gray-50 text-white pt-20">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-[#151007] p-6 flex pt-[50px] flex-col space-y-6 items-center md:items-start">
        <div className="flex flex-col gap-5">
          <button
            onClick={() => router.push('/ProfileSetting')}
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
            onClick={() => router.push('/ProfileSetting/refer')}
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
          <TransactionHistory
            transactions={transactions}
            loading={transactionsLoading}
          />

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
