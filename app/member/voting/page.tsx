"use client";

import { useState, useEffect } from "react";
import { Filter, Flame, Check, Award } from "lucide-react";
import { Header } from "@/components/voting/Header";
import { FilterBar } from "@/components/voting/FilterBar";
import { NomineeCard } from "@/components/voting/NomineeCard";
import { LoadingSkeleton } from "@/components/voting/LoadingSkeleton";
import { VotingSummary } from "@/components/voting/VotingSummary";

interface Nominee {
  id: number;
  name: string;
  category: string;
  image: string;
  status: string;
  votes: number;
  recentVotes: number;
  description: string;
  dateSubmitted: string;
}

const NominationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedNominee, setExpandedNominee] = useState<number | null>(null);
  const [rankings, setRankings] = useState<Record<number, number>>({});
  const [nominees, setNominees] = useState<Nominee[]>([]); // Explicitly type the state
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  // Simulate real-time data fetch
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Replace with actual API call
      const mockData: Nominee[] = [
        {
          id: 1,
          name: "Aisha Bello",
          category: "Innovation in Technology",
          image: "/nominees/aisha.jpg",
          status: "approved",
          votes: 1245,
          recentVotes: 42,
          description: "Pioneered AI solutions for agricultural optimization.",
          dateSubmitted: "15 Jun 2025"
        },
        // ... (other nominees)
      ];
      setNominees(mockData); // No error now
      setIsLoading(false);
      setLastUpdated(new Date().toLocaleTimeString());
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const filters = [
    { id: "all", label: "All", icon: <Filter size={16} /> },
    { id: "trending", label: "Trending", icon: <Flame size={16} /> },
    { id: "approved", label: "Approved", icon: <Check size={16} /> },
    { id: "winner", label: "Winners", icon: <Award size={16} /> }
  ];

  const handleRankChange = (nomineeId: number, rank: number) => {
    setRankings(prev => ({ ...prev, [nomineeId]: rank }));
  };

  const filteredNominees = nominees
    .filter(nominee => {
      const matchesSearch = nominee.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === "all" ||
                          (activeFilter === "trending" ? nominee.recentVotes > 30 :
                           nominee.status === activeFilter);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (activeFilter === "trending") return b.recentVotes - a.recentVotes;
      return b.votes - a.votes;
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Header lastUpdated={lastUpdated} />

        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          filters={filters}
        />

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNominees.map(nominee => (
              <NomineeCard
                key={nominee.id}
                nominee={nominee}
                expandedNominee={expandedNominee}
                setExpandedNominee={setExpandedNominee}
                rankings={rankings}
                handleRankChange={handleRankChange}
              />
            ))}
          </div>
        )}

        {Object.keys(rankings).length > 0 && (
          <VotingSummary rankings={rankings} />
        )}
      </div>
    </div>
  );
};

export default NominationsPage;