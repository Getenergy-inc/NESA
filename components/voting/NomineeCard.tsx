import { ChevronDown } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import Image from "next/image";

interface NomineeCardProps {
  nominee: {
    id: number;
    name: string;
    category: string;
    image: string;
    status: string;
    votes: number;
    recentVotes: number;
    description: string;
  };
  expandedNominee: number | null;
  setExpandedNominee: (id: number | null) => void;
  rankings: Record<number, number>;
  handleRankChange: (nomineeId: number, rank: number) => void;
}

export const NomineeCard = ({
  nominee,
  expandedNominee,
  setExpandedNominee,
  rankings,
  handleRankChange,
}: NomineeCardProps) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition ${
      expandedNominee === nominee.id ? "ring-2 ring-yellow-500" : "hover:shadow-md"
    }`}
  >
    <div className="p-6">
      <div className="flex items-start space-x-4">
        <Image
          src={nominee.image}
          alt={nominee.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
        />
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">{nominee.name}</h3>
          <p className="text-sm text-gray-500">{nominee.category}</p>
          <div className="mt-2">
            <StatusBadge status={nominee.status} votes={nominee.votes} recentVotes={nominee.recentVotes} />
          </div>
        </div>
      </div>

      {expandedNominee === nominee.id && (
        <div className="mt-6 space-y-4">
          <p className="text-gray-600 text-sm">{nominee.description}</p>

          {/* Ranked Voting UI */}
          <div className="pt-4 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select rank (1st, 2nd, 3rd)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map(rank => (
                <button
                  key={rank}
                  onClick={() => handleRankChange(nominee.id, rank)}
                  className={`py-2 rounded-lg text-sm font-medium ${
                    rankings[nominee.id] === rank
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {rank}
                  {rank === 1 && 'st'}
                  {rank === 2 && 'nd'}
                  {rank === 3 && 'rd'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>

    <div
      className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center cursor-pointer"
      onClick={() => setExpandedNominee(expandedNominee === nominee.id ? null : nominee.id)}
    >
      <span className="text-sm text-yellow-600 font-medium">
        {expandedNominee === nominee.id ? "Hide details" : "View full profile"}
      </span>
      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
        expandedNominee === nominee.id ? "transform rotate-180" : ""
      }`} />
    </div>
  </div>
);