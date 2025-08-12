import React from 'react';

export default function NESARoadmap() {
  const milestones = [
    {
      year: "2025",
      description: "First NESA Africa Awards, hosted by SCEF Nigeria Local Chapter."
    },
    {
      year: "2026",
      description: "Expansion to East Africa, increased partnerships, and diaspora engagement."
    },
    {
      year: "2027",
      description: "Full regional hosting rotation begins, major funding agreements in place."
    },
    {
      year: "2028",
      description: "Integration of African-led research initiatives & AI-driven impact tracking."
    },
    {
      year: "2029",
      description: "Annual CSR fund surpasses $10 million, creating scholarship & infrastructure projects"
    },
    {
      year: "2030",
      description: "NESA Africa established as the leading education impact initiative in Africa."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <div className="flex items-center mb-8">
        <h1 className="_under_border text-3xl font-bold text-gray-800">Our Road map to 2030</h1>
        
      </div>

      <div className="relative pl-20">
  {/* Continuous Vertical Line */}
  <div className="absolute left-10 top-0 bottom-0 w-1 bg-yellow-400" />

  {/* Timeline Items */}
  <div className="space-y-12">
    {milestones.map((milestone, index) => (
      <div key={index} className="flex items-start">
        {/* Year */}
        <div className="w-24 text-2xl font-bold text-gray-800">
          {milestone.year}
        </div>

        {/* Content */}
        <div className="ml-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            <span className="font-semibold">
              {milestone.description.split(',')[0]}
            </span>
            {milestone.description.includes(',') && (
              <span>, {milestone.description.split(',').slice(1).join(',')}</span>
            )}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>



    </div>
  );
}