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
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">About AGC</h3>
              <p className="text-gray-600 text-sm mb-4">
                AfriGold Coin (AGC) is NESA's digital currency used for voting, nominations, and rewards.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span>Earn AGC through participation and referrals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span>Use AGC to vote for nominees</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span>Transfer AGC to other users</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Balance Types</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Withdrawable Balance</p>
                  <p className="text-sm text-gray-600">
                    AGC that can be transferred, used for voting, or withdrawn.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Locked Balance</p>
                  <p className="text-sm text-gray-600">
                    Bonus AGC that will be unlocked based on your activity and engagement.
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
