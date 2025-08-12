import { Vote, TrendingUp } from "lucide-react";

interface StatsSectionProps {
  nominees: Array<{
    status: string;
    votes: number;
    isTrending: boolean;
  }>;
}

export const StatsSection = ({ nominees }: StatsSectionProps) => (
  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <p className="text-sm text-gray-500 mb-1">Total Nominations</p>
      <p className="text-2xl font-bold text-gray-900">{nominees.length}</p>
    </div>
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <p className="text-sm text-gray-500 mb-1">Approved</p>
      <p className="text-2xl font-bold text-gray-900">
        {nominees.filter(n => n.status === "approved" || n.status === "winner").length}
      </p>
    </div>
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <p className="text-sm text-gray-500 mb-1">Pending</p>
      <p className="text-2xl font-bold text-gray-900">
        {nominees.filter(n => n.status === "pending").length}
      </p>
    </div>
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <p className="text-sm text-gray-500 mb-1">Total Votes</p>
      <p className="text-2xl font-bold text-gray-900 flex items-center">
        <Vote className="w-5 h-5 mr-1 text-amber-500" />
        {nominees.reduce((sum, n) => sum + n.votes, 0).toLocaleString()}
      </p>
    </div>
    <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-xl border border-amber-200">
      <p className="text-sm text-amber-800 mb-1 flex items-center">
        <TrendingUp className="w-4 h-4 mr-1" /> Trending Now
      </p>
      <p className="text-2xl font-bold text-gray-900">
        {nominees.filter(n => n.isTrending).length}
      </p>
    </div>
  </div>
);