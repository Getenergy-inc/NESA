'use client';
import React, { useState } from 'react';
import { useNRCStatus } from '@/lib/hooks/useNRCStatus';
import { useNRCDashboard } from '@/lib/hooks/useNRCDashboard';

const NRCDashboard: React.FC = () => {
  const { volunteer, loading: statusLoading, canAccessDashboard } = useNRCStatus();
  const {
    dashboardData,
    tasks,
    transactions,
    leaderboard,
    loading,
    error,
    completeTask,
    withdrawAGC
  } = useNRCDashboard(volunteer?.id);

  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  if (statusLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!canAccessDashboard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You need to be an approved NRC volunteer to access this dashboard.
          </p>
          <button
            onClick={() => window.location.href = '/volunteer'}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Apply to Become a Volunteer
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 p-8 rounded-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const handleCompleteTask = async (taskId: string) => {
    const success = await completeTask(taskId, 'Task completed successfully');
    if (success) {
      alert('Task completed successfully!');
    }
  };

  const handleWithdrawAGC = async () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || !walletAddress) {
      alert('Please enter valid amount and wallet address');
      return;
    }

    const success = await withdrawAGC(amount, walletAddress);
    if (success) {
      alert('Withdrawal request submitted successfully!');
      setShowWithdrawModal(false);
      setWithdrawAmount('');
      setWalletAddress('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {volunteer?.fullName}!
          </h1>
          <p className="text-gray-600">
            NRC Volunteer Dashboard - {volunteer?.country}
          </p>
        </div>

        {/* Stats Overview */}
        {dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Uploads</h3>
              <p className="text-3xl font-bold text-blue-600">{dashboardData.totalUploads}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Verified Uploads</h3>
              <p className="text-3xl font-bold text-green-600">{dashboardData.verifiedUploads}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">AGC Earned</h3>
              <p className="text-3xl font-bold text-yellow-600">{dashboardData.agcEarned}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Current Rank</h3>
              <p className="text-3xl font-bold text-purple-600">#{dashboardData.rank}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tasks Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Recent Tasks</h2>
              <span className="text-sm text-gray-500">{tasks.length} tasks</span>
            </div>
            
            <div className="space-y-4">
              {tasks.slice(0, 5).map((task) => (
                <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{task.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Reward: {task.agcReward} AGC
                    </span>
                    {task.status === 'pending' && (
                      <button
                        onClick={() => handleCompleteTask(task.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AGC Wallet Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">AGC Wallet</h2>
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
              >
                Withdraw
              </button>
            </div>
            
            {dashboardData && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total AGC Earned</p>
                  <p className="text-2xl font-bold text-gray-800">{dashboardData.agcEarned}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Withdrawable Balance</p>
                  <p className="text-2xl font-bold text-green-600">{dashboardData.agcWithdrawable}</p>
                </div>
              </div>
            )}

            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Recent Transactions</h3>
              <div className="space-y-2">
                {transactions.slice(0, 3).map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{transaction.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount} AGC
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Leaderboard</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2">Rank</th>
                  <th className="text-left py-2">Volunteer</th>
                  <th className="text-left py-2">Uploads</th>
                  <th className="text-left py-2">Verification Rate</th>
                  <th className="text-left py-2">AGC Earned</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.slice(0, 10).map((entry, index) => (
                  <tr key={entry.volunteerId} className="border-b border-gray-100">
                    <td className="py-2">#{entry.rank}</td>
                    <td className="py-2 font-medium">{entry.name}</td>
                    <td className="py-2">{entry.uploads}</td>
                    <td className="py-2">{entry.verificationRate}%</td>
                    <td className="py-2">{entry.agcEarned} AGC</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Withdraw AGC</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount to Withdraw
                </label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Wallet Address
                </label>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter wallet address"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdrawAGC}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NRCDashboard;