import { RefreshCw } from "lucide-react";

interface HeaderProps {
  lastUpdated: string;
}

export const Header = ({ lastUpdated }: HeaderProps) => (
  <div className="flex justify-between items-start mb-8">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">2025 Awards Voting</h1>
      <p className="text-gray-600">Recognizing excellence in our community</p>
    </div>
    <div className="flex items-center text-sm text-gray-500">
      <RefreshCw size={14} className="mr-1.5" />
      Updated: {lastUpdated}
    </div>
  </div>
);