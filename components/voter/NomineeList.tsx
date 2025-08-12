import { User } from "lucide-react";
import { NomineeCard } from "./NomineeCard";

interface NomineeListProps {
  filteredNominees: Array<{
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
    
  }>;
  expandedNominee: number | null;
  setExpandedNominee: (id: number | null) => void;
}

export const NomineeList = ({
  filteredNominees,
  expandedNominee,
  setExpandedNominee
}: NomineeListProps) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    {/* Header */}
    <div className="hidden md:grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-200">
      <div className="col-span-5 font-medium text-sm text-gray-500">Nominee</div>
      <div className="col-span-3 font-medium text-sm text-gray-500">Category</div>
      <div className="col-span-2 font-medium text-sm text-gray-500">Status</div>
      <div className="col-span-2 font-medium text-sm text-gray-500">Votes</div>
    </div>

    {/* Empty State */}
    {filteredNominees.length === 0 && (
      <div className="p-12 text-center">
        <div className="mx-auto w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 mb-4">
          <User className="w-10 h-10" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No nominees found</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          No nominees match your search criteria. Try different keywords.
        </p>
      </div>
    )}

    {/* Nominees */}
    {filteredNominees.map(nominee => (
      <NomineeCard
        key={nominee.id}
        nominee={nominee}
        expandedNominee={expandedNominee}
        setExpandedNominee={setExpandedNominee}
      />
    ))}
  </div>
);