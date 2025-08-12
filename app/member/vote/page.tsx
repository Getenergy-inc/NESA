"use client";

import { useState } from "react";
import { Header } from "@/components/voter/Header";
import { StatsSection } from "@/components/voter/StatsSection";
import { Controls } from "@/components/voter/Controls";
import { NomineeList } from "@/components/voter/NomineeList";
import { CTA } from "@/components/voter/CTA";

interface Nominee {
  id: number;
  name: string;
  category: string;
  image: string;
  status: string;
  votes: number;
  trend?: string; // Allow undefined for trend
  description: string;
  dateSubmitted: string;
  dateApproved: string | null; // Allow null for dateApproved
  isTrending: boolean;
}

const NominationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedNominee, setExpandedNominee] = useState<number | null>(null);

  const filters = [
    { id: "all", label: "All Nominations" },
    { id: "pending", label: "Pending Review" },
    { id: "approved", label: "Approved for Voting" },
    { id: "rejected", label: "Rejected" },
    { id: "winner", label: "Winners" },
    { id: "trending", label: "Trending Now" }
  ];

  const nominees: Nominee[] = [
    {
      id: 1,
      name: "Aisha Bello",
      category: "Innovation in Technology",
      image: "/images/nesa-card.png",
      status: "approved",
      votes: 1245,
      trend: "up",
      description: "Pioneered AI solutions for agricultural optimization in West Africa. Her work has helped increase crop yields by 30% for small-scale farmers.",
      dateSubmitted: "15 Jun 2025",
      dateApproved: "20 Jun 2025",
      isTrending: true
    },
    {
      id: 2,
      name: "Chinedu Okoro",
      category: "Community Leadership",
      image: "/images/nesa-card.png",
      status: "pending",
      votes: 0,
      trend: undefined, // Explicitly set undefined for trend
      description: "Founded youth education initiatives across 5 states, providing STEM education to over 10,000 underserved students.",
      dateSubmitted: "18 Jun 2025",
      dateApproved: null, // Allow null here
      isTrending: false
    },
    {
      id: 3,
      name: "Fatima Yusuf",
      category: "Creative Arts",
      image: "/images/nesa-card.png",
      status: "approved",
      votes: 892,
      trend: "up",
      description: "Award-winning filmmaker highlighting African stories through documentary and narrative cinema. Her latest work premiered at Cannes.",
      dateSubmitted: "10 Jun 2025",
      dateApproved: "12 Jun 2025",
      isTrending: true
    },
    {
      id: 4,
      name: "Kwame Mensah",
      category: "Environmental Sustainability",
      image: "/images/nesa-card.png",
      status: "winner",
      votes: 2156,
      trend: "neutral", // Provide a default value for trend
      description: "Developed affordable solar solutions for rural communities, bringing renewable energy to 50+ villages.",
      dateSubmitted: "5 Jun 2025",
      dateApproved: "8 Jun 2025",
      isTrending: false
    },
    {
      id: 5,
      name: "Ngozi Eze",
      category: "Healthcare Advancement",
      image: "/images/nesa-card.png",
      status: "rejected",
      votes: 0,
      trend: undefined, // Explicitly set undefined for trend
      description: "Proposed mobile clinic initiative that didn't meet this year's funding criteria but shows great potential.",
      dateSubmitted: "12 Jun 2025",
      dateApproved: null, // Allow null here
      isTrending: false
    }
  ];

  const filteredNominees = nominees.map(nominee => ({
    ...nominee,
    trend: nominee.trend || "neutral" // Default to "neutral" if trend is undefined
  })).filter(nominee => {
    const matchesSearch = nominee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nominee.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" ||
                        (activeFilter === "trending" ? nominee.isTrending : nominee.status === activeFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <StatsSection nominees={nominees} />
        <Controls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          filters={filters}
        />
        <NomineeList
          filteredNominees={filteredNominees}
          expandedNominee={expandedNominee}
          setExpandedNominee={setExpandedNominee}
        />
        <CTA />
      </div>
    </div>
  );
};

export default NominationsPage;