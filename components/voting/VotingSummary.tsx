interface VotingSummaryProps {
  rankings: Record<number, number>;
}

export const VotingSummary = ({ rankings }: VotingSummaryProps) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
    <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
      <div>
        <h3 className="font-medium text-gray-900">Your Ballot</h3>
        <p className="text-sm text-gray-500">
          {Object.keys(rankings).length} nominee(s) ranked
        </p>
      </div>
      <div className="flex space-x-3">
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">
          Save Draft
        </button>
        <button className="px-4 py-2 bg-yellow-500 rounded-lg text-white font-medium hover:bg-yellow-600">
          Submit Votes
        </button>
      </div>
    </div>
  </div>
);