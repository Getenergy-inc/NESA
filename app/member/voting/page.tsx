"use client";

import { Award, Check, Clock, User, Vote, Search, Filter, ChevronDown, Flame, TrendingUp, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

const NominationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedNominee, setExpandedNominee] = useState<number | null>(null);
  const [rankings, setRankings] = useState<Record<number, number>>({});
  const [nominees, setNominees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  // Simulate real-time data fetch
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Replace with actual API call
      const mockData = [
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
      setNominees(mockData);
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

  // Enhanced Status Badge with real-time indicators
  const StatusBadge = ({ status, votes, recentVotes }) => (
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with real-time update */}
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

        {/* Filters & Search */}
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

        {/* Nominee Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNominees.map(nominee => (
              <div 
                key={nominee.id}
                className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition ${
                  expandedNominee === nominee.id ? "ring-2 ring-yellow-500" : "hover:shadow-md"
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <img 
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
            ))}
          </div>
        )}

        {/* Voting Summary Panel */}
        {Object.keys(rankings).length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default NominationsPage;