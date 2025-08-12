import { useState } from "react";
import { Check, Clock, Award, Vote, ChevronDown, Flame, TrendingUp, X } from "lucide-react";

interface NomineeCardProps {
  nominee: {
    id: number;
    name: string;
    category: string;
    image: string;
    status: string;
    votes: number;
    trend: string;
    description: string;
    dateSubmitted: string;
    dateApproved: string | null;
    isTrending: boolean;
  };
  expandedNominee: number | null;
  setExpandedNominee: (id: number | null) => void;
}

const statusBadge = (status: string) => {
  switch(status) {
    case "approved":
      return (
        <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
          <Check className="w-4 h-4 mr-1" /> Approved
        </span>
      );
    case "pending":
      return (
        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
          <Clock className="w-4 h-4 mr-1" /> Pending
        </span>
      );
    case "rejected":
      return (
        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
          Rejected
        </span>
      );
    case "winner":
      return (
        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
          <Award className="w-4 h-4 mr-1" /> Winner
        </span>
      );
    default:
      return null;
  }
};

const trendingBadge = () => (
  <span className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
    <Flame className="w-3 h-3 mr-1" /> Trending
  </span>
);

export const NomineeCard = ({
  nominee,
  expandedNominee,
  setExpandedNominee
}: NomineeCardProps) => {
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = () => {
    setIsVoting(true);
    // Simulate API call
    setTimeout(() => {
      setIsVoting(false);
      setShowVoteModal(false);
      setShowSuccessModal(true);
      // Here you would typically update the nominee's vote count
    }, 1500);
  };

  return (
    <>
      <div
        key={nominee.id}
        className={`border-b border-gray-200 last:border-b-0 transition ${
          expandedNominee === nominee.id ? "bg-amber-50" : "hover:bg-gray-50"
        }`}
      >
        <div
          className="grid grid-cols-12 p-4 cursor-pointer"
          onClick={() => setExpandedNominee(expandedNominee === nominee.id ? null : nominee.id)}
        >
          <div className="col-span-12 md:col-span-5 flex items-center">
            <div className="relative mr-4">
              <img
                src={nominee.image}
                alt={nominee.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              {nominee.isTrending && (
                <div className="absolute -top-1 -right-1">
                  {trendingBadge()}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{nominee.name}</h3>
              <p className="text-sm text-gray-500 md:hidden">{nominee.category}</p>
            </div>
          </div>
          <div className="hidden md:flex md:col-span-3 items-center text-gray-700">
            {nominee.category}
          </div>
          <div className="hidden md:flex md:col-span-2 items-center">
            {statusBadge(nominee.status)}
          </div>
          <div className="hidden md:flex md:col-span-2 items-center">
            <div className="flex items-center">
              <Vote className="w-5 h-5 text-amber-500 mr-2" />
              <span className="font-medium text-gray-900">{nominee.votes.toLocaleString()}</span>
              {nominee.trend === "up" && (
                <span className="ml-2 text-xs bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded flex items-center">
                  <TrendingUp className="w-3 h-3 mr-0.5" /> 12%
                </span>
              )}
            </div>
          </div>

          {/* Mobile view */}
          <div className="col-span-12 md:hidden mt-3 flex justify-between items-center">
            <div className="flex items-center">
              <Vote className="w-4 h-4 text-amber-500 mr-1" />
              <span className="text-sm font-medium text-gray-900">{nominee.votes.toLocaleString()} votes</span>
              {nominee.isTrending && (
                <span className="ml-2">{trendingBadge()}</span>
              )}
            </div>
            <div className="flex items-center">
              {statusBadge(nominee.status)}
              <ChevronDown className={`w-5 h-5 text-gray-400 ml-2 transition-transform ${
                expandedNominee === nominee.id ? "transform rotate-180" : ""
              }`} />
            </div>
          </div>
        </div>

        {/* Expanded details */}
        {expandedNominee === nominee.id && (
          <div className="px-4 pb-4 md:px-6 md:pb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-inner">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <h4 className="font-bold text-gray-900 mb-2">Achievement Summary</h4>
                  <p className="text-gray-600">{nominee.description}</p>

                  {/* Voting progress bar */}
                  <div className="mt-6">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>Voting Progress</span>
                      <span>{Math.round((nominee.votes / 3000) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${Math.round((nominee.votes / 3000) * 100)}%`,
                          background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Nomination Details</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Date Submitted</p>
                      <p className="text-gray-700">{nominee.dateSubmitted}</p>
                    </div>
                    {nominee.dateApproved && (
                      <div>
                        <p className="text-sm text-gray-500">Date Approved</p>
                        <p className="text-gray-700">{nominee.dateApproved}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500">Current Votes</p>
                      <p className="text-gray-900 font-medium flex items-center">
                        <Vote className="w-4 h-4 mr-1 text-amber-500" />
                        {nominee.votes.toLocaleString()}
                      </p>
                    </div>
                    {nominee.isTrending && (
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <div className="flex items-center">
                          {trendingBadge()}
                          {nominee.trend === "up" && (
                            <span className="ml-2 text-xs bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded flex items-center">
                              <TrendingUp className="w-3 h-3 mr-0.5" /> 12%
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                {nominee.status === "approved" && (
                  <>
                    <button
                      onClick={() => setShowVoteModal(true)}
                      className="flex-1 flex items-center justify-center py-2 px-4 rounded-full font-medium transition-colors"
                      style={{
                        background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)',
                        color: 'black'
                      }}
                    >
                      <Vote className="w-5 h-5 mr-2" />
                      Cast Your Vote
                    </button>
                    <button className="flex-1 flex items-center justify-center bg-white hover:bg-gray-50 text-amber-600 py-2 px-4 rounded-full font-medium border border-amber-300 transition">
                      View Full Profile
                    </button>
                  </>
                )}
                {nominee.status === "winner" && (
                  <button
                    className="w-full flex items-center justify-center py-2 px-4 rounded-full font-medium transition-colors"
                    style={{
                      background: 'linear-gradient(90deg, #A855F7 -6.07%, #7E22CE 156.79%)',
                      color: 'white'
                    }}
                  >
                    <Award className="w-5 h-5 mr-2" />
                    View Winner's Story
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Voting Confirmation Modal */}
      {showVoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Confirm Your Vote</h3>
              <button
                onClick={() => setShowVoteModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                You're about to vote for <span className="font-semibold">{nominee.name}</span> in the
                <span className="font-semibold"> {nominee.category}</span> category.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
                <p className="text-amber-700 flex items-center">
                  <span className="font-bold mr-1">200 points</span> will be deducted from your account for this vote.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowVoteModal(false)}
                className="flex-1 py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleVote}
                disabled={isVoting}
                className="flex-1 py-2 px-4 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition flex items-center justify-center"
              >
                {isVoting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Confirm Vote"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Voting Successful Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Vote Successful!</h3>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Your vote for <span className="font-semibold">{nominee.name}</span> in the
                <span className="font-semibold"> {nominee.category}</span> category has been successfully cast.
              </p>
              <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4">
                <p className="text-emerald-700 flex items-center">
                  <span className="font-bold mr-1">Thank you for your vote!</span>
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 py-2 px-4 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};