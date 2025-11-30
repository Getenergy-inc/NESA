'use client';
import React, { useState } from 'react';
import { Vote, TrendingUp } from 'lucide-react';
import VoteConfirmationModal from './VoteConfirmationModal';

interface VoteButtonProps {
  nominationId: string;
  nomineeName: string;
  nomineeCategory: string;
  nomineePhoto?: string;
  currentVotes?: number;
  onVoteSuccess?: () => void;
  variant?: 'primary' | 'secondary' | 'compact';
  className?: string;
}

export const VoteButton: React.FC<VoteButtonProps> = ({
  nominationId,
  nomineeName,
  nomineeCategory,
  nomineePhoto,
  currentVotes = 0,
  onVoteSuccess,
  variant = 'primary',
  className = ''
}) => {
  const [showModal, setShowModal] = useState(false);
  const [votes, setVotes] = useState(currentVotes);

  const handleVoteSuccess = () => {
    setVotes(prev => prev + 1);
    onVoteSuccess?.();
  };

  const formatVotes = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  if (variant === 'compact') {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg ${className}`}
        >
          <Vote className="w-4 h-4" />
          <span>Vote</span>
          {votes > 0 && (
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
              {formatVotes(votes)}
            </span>
          )}
        </button>

        <VoteConfirmationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          nominationId={nominationId}
          nomineeName={nomineeName}
          nomineeCategory={nomineeCategory}
          nomineePhoto={nomineePhoto}
          onSuccess={handleVoteSuccess}
        />
      </>
    );
  }

  if (variant === 'secondary') {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className={`flex items-center justify-between gap-3 px-6 py-3 border-2 border-orange-500 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all ${className}`}
        >
          <div className="flex items-center gap-2">
            <Vote className="w-5 h-5" />
            <span>Vote Now</span>
          </div>
          {votes > 0 && (
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>{formatVotes(votes)} votes</span>
            </div>
          )}
        </button>

        <VoteConfirmationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          nominationId={nominationId}
          nomineeName={nomineeName}
          nomineeCategory={nomineeCategory}
          nomineePhoto={nomineePhoto}
          onSuccess={handleVoteSuccess}
        />
      </>
    );
  }

  // Primary variant (default)
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 ${className}`}
      >
        <Vote className="w-6 h-6" />
        <span>Vote for {nomineeName.split(' ')[0]}</span>
        {votes > 0 && (
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            {formatVotes(votes)} votes
          </span>
        )}
      </button>

      <VoteConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        nominationId={nominationId}
        nomineeName={nomineeName}
        nomineeCategory={nomineeCategory}
        nomineePhoto={nomineePhoto}
        onSuccess={handleVoteSuccess}
      />
    </>
  );
};

export default VoteButton;
