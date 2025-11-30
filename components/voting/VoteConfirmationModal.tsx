'use client';
import React, { useState } from 'react';
import { X, Vote, Wallet, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useVoting } from '@/lib/hooks/useVoting';
import { useWallet } from '@/lib/hooks/useWallet';

interface VoteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  nominationId: string;
  nomineeName: string;
  nomineeCategory: string;
  nomineePhoto?: string;
  onSuccess?: () => void;
}

export const VoteConfirmationModal: React.FC<VoteConfirmationModalProps> = ({
  isOpen,
  onClose,
  nominationId,
  nomineeName,
  nomineeCategory,
  nomineePhoto,
  onSuccess
}) => {
  const { castVote, loading, VOTE_COST } = useVoting();
  const { withdrawableBalance, refresh: refreshWallet } = useWallet();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const remainingBalance = withdrawableBalance - VOTE_COST;
  const hasEnoughBalance = withdrawableBalance >= VOTE_COST;

  const handleVote = async () => {
    if (!hasEnoughBalance) {
      setError('Insufficient Purchased AGC. Please purchase more AGC to vote.');
      return;
    }

    setError('');
    
    try {
      await castVote(nominationId);
      setSuccess(true);
      refreshWallet();
      
      // Auto-close after 2 seconds and call onSuccess
      setTimeout(() => {
        onClose();
        onSuccess?.();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to cast vote');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Vote className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Confirm Vote</h2>
                <p className="text-sm opacity-90">Cast your vote</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              disabled={loading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {success ? (
            /* Success State */
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Vote Cast Successfully! 🎉
              </h3>
              <p className="text-gray-600">
                Your vote for {nomineeName} has been recorded.
              </p>
            </div>
          ) : (
            <>
              {/* Nominee Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                {nomineePhoto ? (
                  <img
                    src={nomineePhoto}
                    alt={nomineeName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold">
                    {nomineeName.charAt(0)}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">{nomineeName}</h3>
                  <p className="text-sm text-gray-600">{nomineeCategory}</p>
                </div>
              </div>

              {/* Vote Cost */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-700">Vote Cost</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {VOTE_COST} AGC
                  </span>
                </div>
                <div className="border-t border-orange-200 pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Current Balance</span>
                    <span className="font-semibold text-gray-900">
                      {withdrawableBalance.toFixed(2)} AGC
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">After Vote</span>
                    <span className={`font-semibold ${hasEnoughBalance ? 'text-green-600' : 'text-red-600'}`}>
                      {hasEnoughBalance ? remainingBalance.toFixed(2) : '0.00'} AGC
                    </span>
                  </div>
                </div>
              </div>

              {/* Insufficient Balance Warning */}
              {!hasEnoughBalance && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-red-900 mb-1">
                      Insufficient Purchased AGC
                    </p>
                    <p className="text-xs text-red-700">
                      You need {VOTE_COST} Purchased AGC to vote. Current balance: {withdrawableBalance.toFixed(2)} AGC.
                      Bonus AGC cannot be used for voting.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Info */}
              <div className="bg-blue-50 rounded-lg p-3 flex items-start gap-2">
                <Wallet className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-900">
                  Votes are final and cannot be undone. Only Purchased AGC can be used for voting.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                {hasEnoughBalance ? (
                  <button
                    onClick={handleVote}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Voting...
                      </>
                    ) : (
                      <>
                        <Vote className="w-5 h-5" />
                        Cast Vote
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => window.location.href = '/member/wallet/purchase'}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Wallet className="w-5 h-5" />
                    Buy AGC
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoteConfirmationModal;
