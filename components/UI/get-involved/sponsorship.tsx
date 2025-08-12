import React from 'react';

export default function SponsorshipPackages() {
const packages = [
    {
        tier: "Platinum Sponsor",
        price: "$250,000+",
        benefits: [
            'Title Sponsor – "Powered by [Your Company]" on all official platforms',
            "Speaking Slot at the Opening Ceremony",
            "Premier Branding on NESA Africa TV, billboards, and digital platforms",
            "Feature Article in International Media & Press Releases",
            "30 VIP Event Passes + Priority Seating",
            "Exclusive Sponsor Interview & Documentary",
        ],
    },
    {
        tier: "Gold Sponsor",
        price: "$150,000",
        benefits: [
            "Major Branding on NESA Africa TV & Live Stream",
            "Feature on Event Brochures & Social Media",
            "Opportunity to Sponsor an Award Category",
            "15 VIP Event Passes",
            "Branded Digital & Physical Event Materials",
        ],
    },
    {
        tier: "Silver Sponsor",
        price: "$75,000",
        benefits: [
            "Logo Placement on the Event Website & Venue",
            "Recognition in Official Press Releases",
            "Sponsor Highlight on Social Media",
            "8 VIP Event Passes",
            "On-Screen Branding During the Award Ceremony",
        ],
    },
    {
        tier: "Bronze Sponsor",
        price: "$30,000",
        benefits: [
            "Company Name on the Website & Social Media Mentions",
            "Brand Exposure on Event Flyers & Publications",
            "5 VIP Event Passes",
            "Recognition in the NESA Africa 2025 Annual Report",
        ],
    },
    {
        tier: "Category Sponsor",
        price: "$20,000",
        benefits: [
            "Sponsor a Specific Award Category (e.g., Best CSR in Education)",
            "Present Award on Stage",
            "Company Mention in Award Speeches & Press Releases",
            "3 VIP Event Passes",
            "Bronze Sponsor",
        ],
    },
    {
        tier: "Exhibitor Package",
        price: "$10,000",
        benefits: [
            "Exhibit Space at the NESA Africa 2025 Education Expo",
            "Direct Engagement with 5,000+ Delegates",
            "2 VIP Event Passes",
        ],
    },
];

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Our NESA Sponsorship Packages</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <div key={index} className="border border-amber-200 rounded-lg p-6 flex flex-col">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{pkg.tier}</h3>
            <div className="text-4xl font-bold text-gray-900 mb-6">{pkg.price}</div>
            
            <ul className="flex-grow">
              {pkg.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start mb-3">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}