import { Search } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  filters: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
  }>;
}

export const FilterBar = ({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  filters,
}: FilterBarProps) => (
  <div className="flex flex-col md:flex-row gap-4 mb-8">
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search nominees..."
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
    <div className="flex space-x-2">
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition ${
            activeFilter === filter.id
              ? "bg-yellow-500 text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {filter.icon}
          <span className="ml-2">{filter.label}</span>
        </button>
      ))}
    </div>
  </div>
);