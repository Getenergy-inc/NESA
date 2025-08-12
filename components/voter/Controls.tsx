import { Search } from "lucide-react";

interface ControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  filters: Array<{
    id: string;
    label: string;
  }>;
}

export const Controls = ({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  filters
}: ControlsProps) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
    {/* Search */}
    <div className="relative w-full md:w-96">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search nominees or categories..."
        className="block w-full pl-10 pr-3 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 placeholder-gray-400"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    {/* Filters */}
    <div className="flex flex-wrap gap-2 w-full md:w-auto">
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeFilter === filter.id
              ? filter.id === "trending"
                ? "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200"
                : "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  </div>
);