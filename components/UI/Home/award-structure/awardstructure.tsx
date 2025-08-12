"use client";

import React from "react";

const AwardStructure = () => {
  return (
    <div className="bg-#FFF5E0 max-w-6xl mx-auto px-4 py-12">
      {/* Main title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-black">
        Sustainable Award Structure (2025–2030)
      </h1>

      {/* Competitive Awards Section */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
          Competitive Awards (Public Voting & Judges' Review)
        </h2>

        <div className="bg-[#FFC247] rounded-lg p-6 md:p-8 mb-6">
          <h3 className="text-xl font-bold mb-4">
            1. 2025 Competitive Categories
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Best Media Organization in Educational Advocacy (Nigeria & Africa-Wide)</li>
            <li>Best Corporate Social Responsibility (CSR) in Education (Africa - Regional Competition)</li>
            <li>Best NGO Contribution to Achieving Education for All (Africa - Regional Competition)</li>
            <li>Best EduTech Organization (Africa)</li>
            <li>Best NGO Contribution to Education in Nigeria</li>
            <li>Best Corporate Social Responsibility (CSR) in Education (Nigeria)</li>
          </ul>
        </div>

        <ul className="list-disc pl-6 space-y-3">
          <li>Voting Process: AFRI-Gold Coin digital voting (funding scholarships).</li>
          <li>Judging Process: Expert panel screening before final voting.</li>
        </ul>
      </section>

      {/* Non-Competitive Awards Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
          Non-Competitive Awards (Public Voting & Judges' Review)
        </h2>

        <div className="bg-[#FFC247] rounded-lg p-6 md:p-8 mb-6">
          <h3 className="text-xl font-bold mb-4">
            1. 2025 Non Competitive Categories
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Best Media Organization in Educational Advocacy (Nigeria & Africa-Wide)</li>
            <li>Best Corporate Social Responsibility (CSR) in Education (Africa - Regional Competition)</li>
            <li>Best NGO Contribution to Achieving Education for All (Africa - Regional Competition)</li>
            <li>Best EduTech Organization (Africa)</li>
          </ul>
        </div>

        <ul className="list-disc pl-6 space-y-3">
          <li>Recognition Process: Based on institutional impact, research, and long-term educational contribution.</li>
        </ul>
      </section>
    </div>
  );
};

export default AwardStructure;