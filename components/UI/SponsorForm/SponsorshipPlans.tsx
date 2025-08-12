'use client'

import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { FiArrowLeftCircle, FiCheck, FiStar, FiAward, FiTv, FiGlobe, FiUsers } from "react-icons/fi";
import { motion } from 'framer-motion';

// Corporate Sponsorship Tiers
const corporatePlans = [
  {
    id: 'africa-blue-garnet',
    name: 'Africa Blue Garnet',
    category: 'Premium Corporate',
    price: 250000,
    badge: '🏆 Title Sponsor',
    color: 'from-blue-600 to-blue-800',
    icon: FiStar,
    popular: true,
    details: [
      'Title Sponsor across all platforms ("Powered by [Your Brand]")',
      'NESA TV Interview & Documentary Feature',
      '30 VIP Gala Passes + Priority Seating',
      'Africa Impact Documentary Co-Production',
      'Diamond Recognition Plaque',
      'VIP Lounge Naming Rights',
      'Certificate of Social Impact (downloadable)',
      'Global Press Feature & Media Coverage',
      'Keynote Speaking Opportunity',
      'Full Event Branding Rights'
    ]
  },
  {
    id: 'diamond-garnet',
    name: 'Diamond Garnet',
    category: 'Premium Corporate',
    price: 180000,
    badge: '💎 Co-Sponsor',
    color: 'from-purple-600 to-purple-800',
    icon: FiAward,
    popular: false,
    priceRange: '$150,000+',
    details: [
      'Co-sponsor of 3 major categories or events',
      'Full-page branding on all materials',
      '25 VIP passes + Red Carpet Feature',
      'Speaking slot at main event',
      'Premium booth at EduAid Expo',
      'Social media campaign features',
      'Certificate of Partnership'
    ]
  },
  {
    id: 'gold-garnet',
    name: 'Gold Garnet',
    category: 'Major Corporate',
    price: 150000,
    badge: '🥇 Major Sponsor',
    color: 'from-yellow-500 to-yellow-700',
    icon: FiAward,
    popular: false,
    priceRange: '$100,000 - $179,999',
    details: [
      'Sponsor one major category',
      'Keynote session opportunity',
      'Brand on all physical banners',
      '15 VIP passes',
      'Logo on certificates',
      'Media interview opportunities',
      'Digital badge for website'
    ]
  },
  {
    id: 'silver-garnet',
    name: 'Silver Garnet',
    category: 'Corporate',
    price: 75000,
    badge: '🥈 Corporate Sponsor',
    color: 'from-gray-400 to-gray-600',
    icon: FiUsers,
    popular: false,
    priceRange: '$50,000 - $99,999',
    details: [
      'Branding in printed and digital media',
      '8 VIP passes',
      'Social media highlights',
      'Logo in event booklet',
      'Recognition during ceremony',
      'Certificate of sponsorship'
    ]
  },
  {
    id: 'bronze-garnet',
    name: 'Bronze Garnet',
    category: 'Corporate',
    price: 30000,
    badge: '🥉 Supporting Sponsor',
    color: 'from-orange-600 to-orange-800',
    icon: FiUsers,
    popular: false,
    priceRange: '$25,000 - $49,999',
    details: [
      'Website & event mentions',
      'Logo in event booklet',
      '5 VIP passes',
      'Digital recognition',
      'Certificate of support'
    ]
  }
];

// Category & Specialized Sponsorships
const categoryPlans = [
  {
    id: 'category-sponsor',
    name: 'Category Sponsor',
    category: 'Award Category',
    price: 20000,
    badge: '🏆 Category Sponsor',
    color: 'from-green-600 to-green-800',
    icon: FiAward,
    popular: false,
    priceRange: '$15,000 - $25,000',
    details: [
      'Name and present specific award on stage',
      '3 VIP passes',
      'Category branding rights',
      'Recognition during award presentation',
      'Certificate of category sponsorship'
    ]
  },
  {
    id: 'expo-exhibitor',
    name: 'EduAid Expo Exhibitor',
    category: 'Exhibition',
    price: 10000,
    badge: '🏢 Exhibitor',
    color: 'from-teal-600 to-teal-800',
    icon: FiGlobe,
    popular: false,
    priceRange: '$8,000 - $12,000',
    details: [
      'Booth at EduAid Expo',
      'Visibility to 5,000+ delegates',
      '2 VIP passes',
      'Exhibitor directory listing',
      'Networking opportunities'
    ]
  },
  {
    id: 'media-sponsor',
    name: 'NESA TV & Media Sponsor',
    category: 'Media',
    price: 8000,
    badge: '📺 Media Sponsor',
    color: 'from-red-600 to-red-800',
    icon: FiTv,
    popular: false,
    priceRange: '$6,000 - $10,000',
    details: [
      'Full Season Sponsor (10 Episodes)',
      'Studio Branding',
      'Promo Clips & Ad Placement',
      'Social media features',
      'Media partnership certificate'
    ]
  },
  {
    id: 'regional-sponsor',
    name: 'Regional Awards Sponsor',
    category: 'Regional',
    price: 5000,
    badge: '🌍 Regional Sponsor',
    color: 'from-indigo-600 to-indigo-800',
    icon: FiGlobe,
    popular: false,
    priceRange: '$3,000 - $7,000',
    details: [
      'Sponsor specific African region',
      'Regional branding rights',
      'Nominee support',
      'Digital visibility',
      'Regional impact certificate'
    ]
  }
];

// Individual & Small Business Tiers
const individualPlans = [
  {
    id: 'platinum-donor',
    name: 'Platinum Donor',
    category: 'Individual/Small Business',
    price: 5000,
    badge: '🟣 Platinum',
    color: 'from-purple-500 to-purple-700',
    icon: FiStar,
    popular: false,
    priceRange: '$5,000+',
    details: [
      'Segment naming rights',
      'Keynote spotlight',
      'Full media coverage',
      '10 gala tickets',
      'Main sponsor label',
      'Downloadable certificate'
    ]
  },
  {
    id: 'gold-donor',
    name: 'Gold Donor',
    category: 'Individual/Small Business',
    price: 2500,
    priceRange: '$2,500 - $4,999',
    badge: '🔵 Gold',
    color: 'from-blue-500 to-blue-700',
    icon: FiAward,
    popular: true,
    details: [
      'Co-branding on a subcategory',
      'Donor media interviews',
      'VVIP table for 5',
      'Social media features',
      'Gold donor certificate'
    ]
  },
  {
    id: 'silver-donor',
    name: 'Silver Donor',
    category: 'Individual/Small Business',
    price: 1000,
    priceRange: '$1,000 - $2,499',
    badge: '🟡 Silver',
    color: 'from-gray-400 to-gray-600',
    icon: FiUsers,
    popular: false,
    details: [
      'Logo on category certificates',
      'Donor roll of honor',
      'Social media features',
      '3 gala tickets',
      'Silver donor certificate'
    ]
  },
  {
    id: 'bronze-donor',
    name: 'Bronze Donor',
    category: 'Individual/Small Business',
    price: 500,
    priceRange: '$500 - $999',
    badge: '🟢 Bronze',
    color: 'from-green-500 to-green-700',
    icon: FiCheck,
    popular: false,
    details: [
      'Logo listing on website',
      'Downloadable donor certificate',
      '2 gala tickets',
      'Recognition in annual report',
      'Digital badge for social media'
    ]
  }
];

const allPlans = [...corporatePlans, ...categoryPlans, ...individualPlans];

export default function SponsorshipPlans({
  selectedPlan,
  onSelect,
  onSubmit,
  onBack
}: {
  selectedPlan?: any
  onSelect: (plan: any) => void
  onSubmit: () => void
  onBack: () => void
}) {
  const [selected, setSelected] = useState(selectedPlan || allPlans[0])
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = [
    { id: 'all', name: 'All Plans', count: allPlans.length },
    { id: 'Premium Corporate', name: 'Premium Corporate', count: corporatePlans.filter(p => p.category === 'Premium Corporate').length },
    { id: 'Corporate', name: 'Corporate', count: corporatePlans.filter(p => p.category.includes('Corporate')).length },
    { id: 'Award Category', name: 'Category & Specialized', count: categoryPlans.length },
    { id: 'Individual/Small Business', name: 'Individual & Small Business', count: individualPlans.length }
  ]

  const filteredPlans = activeCategory === 'all' 
    ? allPlans 
    : allPlans.filter(plan => 
        activeCategory === 'Corporate' 
          ? plan.category.includes('Corporate')
          : plan.category === activeCategory
      )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div className="flex items-center mb-4 lg:mb-0">
            <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-6">
              <FiArrowLeftCircle className="text-2xl mr-2" />
              <span>Back</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Sponsorship Plan</h1>
              <p className="text-gray-600">
                Select the perfect sponsorship package to support NESA-Africa 2025 and showcase your commitment to African education
              </p>
            </div>
          </div>
          
          {selected && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg"
              onClick={onSubmit}
            >
              Continue to Payment
            </motion.button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 p-4 bg-white rounded-lg shadow-sm border">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-yellow-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Selected Plan Summary */}
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-3 rounded-full bg-gradient-to-r ${selected.color} text-white mr-4`}>
                  <selected.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selected.name}</h3>
                  <p className="text-gray-600">{selected.badge}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  ${selected.price.toLocaleString()}
                  {selected.priceRange && (
                    <div className="text-sm font-normal text-gray-600">{selected.priceRange}</div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Plans Grid */}
        <RadioGroup value={selected} onChange={(plan) => {
          setSelected(plan)
          onSelect(plan)
        }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan, index) => (
              <RadioGroup.Option
                key={plan.id}
                value={plan}
                className={({ checked }) => `
                  relative cursor-pointer rounded-xl border-2 transition-all duration-200 hover:shadow-lg
                  ${checked 
                    ? 'border-yellow-500 bg-yellow-50 shadow-lg ring-2 ring-yellow-200' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                  }
                  ${plan.popular ? 'ring-2 ring-blue-200 border-blue-300' : ''}
                `}
              >
                {({ checked }) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6"
                  >
                    {/* Popular Badge */}
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}

                    {/* Plan Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${plan.color} text-white`}>
                        <plan.icon className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          ${plan.price.toLocaleString()}
                        </div>
                        {plan.priceRange && (
                          <div className="text-xs text-gray-500">{plan.priceRange}</div>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{plan.category}</p>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {plan.badge}
                      </span>
                    </div>

                    {/* Benefits List */}
                    <div className="space-y-2">
                      {plan.details.slice(0, checked ? plan.details.length : 4).map((benefit, idx) => (
                        <div key={idx} className="flex items-start">
                          <FiCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                      {!checked && plan.details.length > 4 && (
                        <div className="text-sm text-gray-500 italic">
                          +{plan.details.length - 4} more benefits...
                        </div>
                      )}
                    </div>

                    {/* Selection Indicator */}
                    <div className="mt-6 flex items-center justify-center">
                      <div className={`w-4 h-4 rounded-full border-2 transition-all ${
                        checked 
                          ? 'bg-yellow-500 border-yellow-500' 
                          : 'border-gray-300'
                      }`}>
                        {checked && (
                          <FiCheck className="w-3 h-3 text-white m-0.5" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>

        {/* Additional Information */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">All Sponsorship Levels Include:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Downloadable Certificate of Social Impact',
              'Recognition on nesa.africa website',
              'Sponsor Profile in NESA Annual Report',
              'Digital badges for website & social media'
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need a custom sponsorship package? Contact us at{' '}
            <a href="mailto:partnerships@nesa.africa" className="text-yellow-600 hover:text-yellow-700 font-medium">
              partnerships@nesa.africa
            </a>
            {' '}or call{' '}
            <a href="tel:+234-907-962-1110" className="text-yellow-600 hover:text-yellow-700 font-medium">
              +234-907-962-1110
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
