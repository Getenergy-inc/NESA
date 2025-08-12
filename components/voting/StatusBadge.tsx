import { Check, Award, Vote, TrendingUp } from "lucide-react";

interface StatusBadgeProps {
  status: string;
  votes: number;
  recentVotes: number;
}

export const StatusBadge = ({ status, votes, recentVotes }: StatusBadgeProps) => (
  <div className="flex items-center space-x-2">
    {status === "approved" && (
      <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-medium flex items-center">
        <Check size={14} className="mr-1" /> Approved
      </span>
    )}
    {status === "winner" && (
      <span className="bg-purple-100 text-purple-800 px-2.5 py-1 rounded-full text-xs font-medium flex items-center">
        <Award size={14} className="mr-1" /> Winner
      </span>
    )}
    <div className="flex items-center text-sm">
      <Vote size={14} className="text-yellow-600 mr-1" />
      <span className="font-medium">{votes.toLocaleString()}</span>
      {recentVotes > 0 && (
        <span className="text-green-600 ml-1.5 flex items-center">
          <TrendingUp size={14} className="mr-0.5" /> +{recentVotes}
        </span>
      )}
    </div>
  </div>
);