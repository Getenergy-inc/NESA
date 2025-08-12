"use client";

import { BadgeCheck, Zap, Users, Star, Award, Shield, ArrowRight, Check } from "lucide-react";
import { useState } from "react";

const UpgradeAccountPage = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const membershipOptions = [
    {
      id: "registered",
      title: "Registered Member (SCEF)",
      icon: <Users className="w-6 h-6" />,
      price: "Free",
      features: [
        "Basic voting rights",
        "Event notifications",
        "Community access",
        "Newsletter subscription"
      ],
      commission: "Earn 5% on referrals",
      recommended: false,
      buttonText: "Continue as Member"
    },
    {
      id: "ambassador",
      title: "Ambassador",
      icon: <Award className="w-6 h-6" />,
      price: "$49/year or Volunteer",
      features: [
        "All Registered Member benefits",
        "Exclusive networking opportunities",
        "Early access to events",
        "Ambassador badge on profile",
        "Training resources"
      ],
      commission: "Earn 15% on referrals",
      recommended: true,
      buttonText: "Become Ambassador"
    },
    {
      id: "chapter",
      title: "Local Chapter Member",
      icon: <Shield className="w-6 h-6" />,
      price: "$99/year",
      features: [
        "All Ambassador benefits",
        "Local leadership opportunities",
        "Chapter voting rights",
        "Meet local members",
        "Chapter resources",
        "Priority support"
      ],
      commission: "Earn 20% on referrals + chapter bonuses",
      recommended: false,
      buttonText: "Join Chapter"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Upgrade Your Account</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock exclusive features, higher commissions, and community benefits by upgrading your membership
          </p>
        </div>

        {/* Membership Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {membershipOptions.map((option) => (
            <div 
              key={option.id}
              className={`relative rounded-2xl overflow-hidden shadow-lg border-2 transition-all duration-300 ${
                option.recommended 
                  ? "border-yellow-400 transform md:-translate-y-4" 
                  : "border-gray-200"
              } ${
                selectedOption === option.id ? "ring-4 ring-yellow-300" : ""
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              {option.recommended && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 px-4 py-1 text-sm font-bold rounded-bl-lg">
                  RECOMMENDED
                </div>
              )}
              
              <div className="bg-white p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4 text-yellow-600">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{option.title}</h3>
                </div>
                
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">{option.price}</span>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center bg-yellow-50 text-yellow-800 px-4 py-2 rounded-lg">
                    <Star className="w-5 h-5 mr-2" />
                    <span className="font-medium">{option.commission}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-3 px-6 rounded-lg font-bold transition ${
                    selectedOption === option.id
                      ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                      : "bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {option.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Feature Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Features
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registered
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ambassador
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chapter
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Voting Rights
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Check className="w-5 h-5 text-yellow-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Check className="w-5 h-5 text-yellow-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Check className="w-5 h-5 text-yellow-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Referral Commission
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    5%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    15%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    20% + bonuses
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Exclusive Events
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Check className="w-5 h-5 text-yellow-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Check className="w-5 h-5 text-yellow-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Leadership Opportunities
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Check className="w-5 h-5 text-yellow-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Priority Support
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Check className="w-5 h-5 text-yellow-500 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">What Our Members Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Aisha Bello",
                role: "Ambassador",
                quote: "The ambassador program helped me grow my network and earn significant commissions.",
                avatar: "/avatars/aisha.jpg"
              },
              {
                name: "Chinedu Okoro",
                role: "Chapter Member",
                quote: "Being part of a local chapter gave me leadership experience and community connections.",
                avatar: "/avatars/chinedu.jpg"
              },
              {
                name: "Fatima Yusuf",
                role: "Registered Member",
                quote: "Even the free membership provides great value and opportunities to participate.",
                avatar: "/avatars/fatima.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-yellow-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl shadow-lg overflow-hidden p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to Upgrade?</h2>
          <p className="text-gray-800 mb-6 max-w-2xl mx-auto">
            Join thousands of members who are already benefiting from our premium membership tiers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-yellow-800 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition">
              Compare Plans
            </button>
            <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeAccountPage;