"use client";
import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import { useState } from "react";
import { Crown, Award, Medal, Filter } from "lucide-react";

interface AwardTypesFilterProps {
  onFilterChange: (filter: string) => void;
  activeFilter: string;
}

const AwardTypesFilter: React.FC<AwardTypesFilterProps> = ({ onFilterChange, activeFilter }) => {
  const filterOptions = [
    {
      id: "all",
      label: "All Categories",
      icon: Filter,
      color: "from-gray-500 to-gray-600",
      description: "View all award categories"
    },
    {
      id: "lifetime",
      label: "🔵 Africa Icon Blue Garnet Lifetime Awards",
      icon: Crown,
      color: "from-blue-600 to-indigo-700",
      description: "Non-Competitive | Honorary"
    },
    {
      id: "competitive",
      label: "🥇 Blue Garnet & Gold Certificate Awards",
      icon: Award,
      color: "from-[#FFC247] to-[#E48900]",
      description: "Competitive | Public Voting + Judges"
    },
    {
      id: "platinum",
      label: "🏅 Platinum Certificate of Recognition",
      icon: Medal,
      color: "from-gray-400 to-gray-600",
      description: "Non-Competitive | Verified Documentation"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-[#191307] to-[#33270E]" id="award-categories">
      <div className="container mx-auto px-4">
        <motion.div
          variants={parentV}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={toTopV} className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 rounded-full border border-[#FFC247]/30 mb-6">
              <Filter className="w-5 h-5 text-[#FFC247] mr-2" />
              <span className="text-[#FFC247] font-medium">FILTER BY AWARD TYPE</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
              🎖️ Explore Award Categories
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Choose from three distinct award categories, each designed to recognize different levels of educational impact and achievement
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={toTopV} className="space-y-4">
            {filterOptions.map((option, index) => (
              <motion.div
                key={option.id}
                variants={opacityV}
                className="max-w-4xl mx-auto"
              >
                <button
                  onClick={() => onFilterChange(option.id)}
                  className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    activeFilter === option.id
                      ? 'border-[#FFC247] bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 shadow-lg'
                      : 'border-[#FFC247]/20 bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 hover:border-[#FFC247]/40'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Icon */}
                    <div className={`bg-gradient-to-r ${option.color} p-3 rounded-full flex-shrink-0`}>
                      <option.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-lg md:text-xl font-bold ${
                          activeFilter === option.id 
                            ? 'bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text'
                            : 'text-white'
                        }`}>
                          {option.label}
                        </h3>
                        
                        {/* Active Indicator */}
                        {activeFilter === option.id && (
                          <div className="bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] px-3 py-1 rounded-full text-sm font-medium">
                            Active
                          </div>
                        )}
                      </div>
                      
                      <p className={`text-sm ${
                        activeFilter === option.id ? 'text-gray-300' : 'text-gray-400'
                      }`}>
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* Filter Summary */}
          <motion.div variants={opacityV} className="text-center">
            <div className="bg-gradient-to-r from-[#33270E]/60 to-[#191307]/60 rounded-2xl p-6 border border-[#FFC247]/20 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                {activeFilter === "all" && "All Award Categories"}
                {activeFilter === "lifetime" && "Lifetime Achievement Awards"}
                {activeFilter === "competitive" && "Competitive Excellence Awards"}
                {activeFilter === "platinum" && "Institutional Recognition Awards"}
              </h3>
              
              <p className="text-gray-300 text-sm">
                {activeFilter === "all" && "Viewing all available award categories across all recognition levels"}
                {activeFilter === "lifetime" && "Recognizing legendary education champions with 10+ years of impactful service"}
                {activeFilter === "competitive" && "Celebrating rising educators and institutions through public voting and expert evaluation"}
                {activeFilter === "platinum" && "Honoring state actors, diaspora groups, and institutions with verified social impact"}
              </p>
              
              {/* Quick Stats for Active Filter */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-lg font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                    {activeFilter === "all" && "101+"}
                    {activeFilter === "lifetime" && "15+"}
                    {activeFilter === "competitive" && "60+"}
                    {activeFilter === "platinum" && "26+"}
                  </div>
                  <div className="text-xs text-gray-400">Subcategories</div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                    {activeFilter === "all" && "Mixed"}
                    {activeFilter === "lifetime" && "Internal"}
                    {activeFilter === "competitive" && "Public"}
                    {activeFilter === "platinum" && "Internal"}
                  </div>
                  <div className="text-xs text-gray-400">Voting Method</div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                    {activeFilter === "all" && "Varies"}
                    {activeFilter === "lifetime" && "3 per sub"}
                    {activeFilter === "competitive" && "1 per sub"}
                    {activeFilter === "platinum" && "Verified"}
                  </div>
                  <div className="text-xs text-gray-400">Winners</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AwardTypesFilter;