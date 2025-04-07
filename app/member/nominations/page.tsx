"use client";

import { Award, Check, Clock, User, Vote, Search, Filter, ChevronDown } from "lucide-react";
import { useState } from "react";

const NominationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedNominee, setExpandedNominee] = useState<number | null>(null);

  const filters = [
    { id: "all", label: "All Nominations" },
    { id: "pending", label: "Pending Review" },
    { id: "approved", label: "Approved for Voting" },
    { id: "rejected", label: "Rejected" },
    { id: "winner", label: "Winners" }
  ];

  const nominees = [
    {
      id: 1,
      name: "Aisha Bello",
      category: "Innovation in Technology",
      image: "/images/nesa-card.png",
      status: "approved",
      votes: 1245,
      description: "Pioneered AI solutions for agricultural optimization in West Africa. Her work has helped increase crop yields by 30% for small-scale farmers.",
      dateSubmitted: "15 Jun 2025",
      dateApproved: "20 Jun 2025"
    },
    {
      id: 2,
      name: "Chinedu Okoro",
      category: "Community Leadership",
      image: "/images/nesa-card.png",
      status: "pending",
      votes: 0,
      description: "Founded youth education initiatives across 5 states, providing STEM education to over 10,000 underserved students.",
      dateSubmitted: "18 Jun 2025",
      dateApproved: null
    },
    {
      id: 3,
      name: "Fatima Yusuf",
      category: "Creative Arts",
      image: "/images/nesa-card.png",
      status: "approved",
      votes: 892,
      description: "Award-winning filmmaker highlighting African stories through documentary and narrative cinema. Her latest work premiered at Cannes.",
      dateSubmitted: "10 Jun 2025",
      dateApproved: "12 Jun 2025"
    },
    {
      id: 4,
      name: "Kwame Mensah",
      category: "Environmental Sustainability",
      image: "/images/nesa-card.png",
      status: "winner",
      votes: 2156,
      description: "Developed affordable solar solutions for rural communities, bringing renewable energy to 50+ villages.",
      dateSubmitted: "5 Jun 2025",
      dateApproved: "8 Jun 2025"
    },
    {
      id: 5,
      name: "Ngozi Eze",
      category: "Healthcare Advancement",
      image: "/images/nesa-card.png",
      status: "rejected",
      votes: 0,
      description: "Proposed mobile clinic initiative that didn't meet this year's funding criteria but shows great potential.",
      dateSubmitted: "12 Jun 2025",
      dateApproved: null
    }
  ];

  const filteredNominees = nominees.filter(nominee => {
    const matchesSearch = nominee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         nominee.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || nominee.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const statusBadge = (status: string) => {
    switch(status) {
      case "approved":
        return (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Check className="w-4 h-4 mr-1" /> Approved
          </span>
        );
      case "pending":
        return (
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Clock className="w-4 h-4 mr-1" /> Pending
          </span>
        );
      case "rejected":
        return (
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            Rejected
          </span>
        );
      case "winner":
        return (
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Award className="w-4 h-4 mr-1" /> Winner
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-yellow-100 text-yellow-800 rounded-full px-6 py-2 mb-4">
            <Award className="w-5 h-5 mr-2" />
            <span className="font-medium">2025 NESA Excellence Awards</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nominations</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Review this year's nominees and cast your votes for outstanding achievements
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search nominees or categories..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
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
                    ? "bg-yellow-500 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
            <p className="text-sm text-gray-500 mb-1">Pending Review</p>
            <p className="text-2xl font-bold text-gray-900">
              {nominees.filter(n => n.status === "pending").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Total Votes Cast</p>
            <p className="text-2xl font-bold text-gray-900">
              {nominees.reduce((sum, n) => sum + n.votes, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Nominees List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-200">
            <div className="col-span-4 font-medium text-sm text-gray-500">Nominee</div>
            <div className="col-span-3 font-medium text-sm text-gray-500">Category</div>
            <div className="col-span-2 font-medium text-sm text-gray-500">Status</div>
            <div className="col-span-2 font-medium text-sm text-gray-500">Votes</div>
            <div className="col-span-1"></div>
          </div>

          {/* Empty State */}
          {filteredNominees.length === 0 && (
            <div className="p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500 mb-4">
                <User className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No nominees found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {searchQuery 
                  ? "No nominees match your search criteria. Try different keywords."
                  : "There are currently no nominees in this category."}
              </p>
            </div>
          )}

          {/* Nominees */}
          {filteredNominees.map(nominee => (
            <div 
              key={nominee.id} 
              className={`border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition ${
                expandedNominee === nominee.id ? "bg-yellow-50" : ""
              }`}
            >
              <div 
                className="grid grid-cols-12 p-4 cursor-pointer"
                onClick={() => setExpandedNominee(expandedNominee === nominee.id ? null : nominee.id)}
              >
                <div className="col-span-12 md:col-span-4 flex items-center">
                  <img 
                    src={nominee.image} 
                    alt={nominee.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{nominee.name}</h3>
                    <p className="text-sm text-gray-500 md:hidden">{nominee.category}</p>
                  </div>
                </div>
                <div className="hidden md:flex md:col-span-3 items-center text-gray-700">
                  {nominee.category}
                </div>
                <div className="hidden md:flex md:col-span-2 items-center">
                  {statusBadge(nominee.status)}
                </div>
                <div className="hidden md:flex md:col-span-2 items-center">
                  <div className="flex items-center">
                    <Vote className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="font-medium">{nominee.votes.toLocaleString()}</span>
                  </div>
                </div>
                <div className="hidden md:flex md:col-span-1 items-center justify-end">
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedNominee === nominee.id ? "transform rotate-180" : ""
                  }`} />
                </div>

                {/* Mobile view */}
                <div className="col-span-12 md:hidden mt-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <Vote className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{nominee.votes.toLocaleString()} votes</span>
                  </div>
                  <div className="flex items-center">
                    {statusBadge(nominee.status)}
                    <ChevronDown className={`w-5 h-5 text-gray-400 ml-2 transition-transform ${
                      expandedNominee === nominee.id ? "transform rotate-180" : ""
                    }`} />
                  </div>
                </div>
              </div>

              {/* Expanded details */}
              {expandedNominee === nominee.id && (
                <div className="px-4 pb-4 md:px-6 md:pb-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <h4 className="font-bold text-gray-900 mb-2">Achievement Summary</h4>
                        <p className="text-gray-600">{nominee.description}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Nomination Details</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">Date Submitted</p>
                            <p className="text-gray-700">{nominee.dateSubmitted}</p>
                          </div>
                          {nominee.dateApproved && (
                            <div>
                              <p className="text-sm text-gray-500">Date Approved</p>
                              <p className="text-gray-700">{nominee.dateApproved}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-sm text-gray-500">Current Votes</p>
                            <p className="text-gray-700 font-medium">{nominee.votes.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      {nominee.status === "approved" && (
                        <>
                          <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-600 transition flex-1">
                            Cast Your Vote
                          </button>
                          <button className="bg-white border border-yellow-500 text-yellow-500 px-6 py-2 rounded-lg font-medium hover:bg-yellow-50 transition flex-1">
                            View Full Profile
                          </button>
                        </>
                      )}
                      {nominee.status === "pending" && (
                        <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium cursor-not-allowed flex-1">
                          Voting Not Open Yet
                        </button>
                      )}
                      {nominee.status === "winner" && (
                        <button className="bg-purple-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-600 transition flex-1">
                          View Winner's Story
                        </button>
                      )}
                      {nominee.status === "rejected" && (
                        <button className="bg-gray-100 text-gray-500 px-6 py-2 rounded-lg font-medium cursor-not-allowed flex-1">
                          Nomination Not Approved
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl shadow-lg overflow-hidden p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Have someone to nominate?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6">
            Submit your nomination for next year's awards and help recognize outstanding achievements in our community.
          </p>
          <button className="bg-white text-yellow-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            Submit a Nomination
          </button>
        </div>
      </div>
    </div>
  );
};

export default NominationsPage;