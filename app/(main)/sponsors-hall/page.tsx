'use client';

import { motion } from 'framer-motion';
import { FiStar, FiAward, FiTv, FiGlobe, FiUsers, FiCheck, FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

// Type definitions for sponsors
interface BaseSponsor {
  id: number;
  name: string;
  logo: string;
  website: string;
  contribution: number;
  year: number;
  benefits: string[];
}

interface CategorySponsor extends BaseSponsor {
  category: string;
}

type Sponsor = BaseSponsor | CategorySponsor;

// Mock sponsor data - in real app, this would come from API
const sponsors = {
  'africa-blue-garnet': [
    {
      id: 1,
      name: 'Global Education Foundation',
      logo: '/images/logos/sponsor1.png',
      website: 'https://globaleducation.org',
      contribution: 250000,
      year: 2025,
      benefits: ['Title Sponsor', 'NESA TV Feature', '30 VIP Passes', 'Documentary Co-Production']
    }
  ],
  'diamond-garnet': [
    {
      id: 2,
      name: 'African Development Bank',
      logo: '/images/logos/sponsor2.png',
      website: 'https://afdb.org',
      contribution: 180000,
      year: 2025,
      benefits: ['Co-sponsor 3 Categories', 'Red Carpet Feature', '25 VIP Passes']
    }
  ],
  'gold-garnet': [
    {
      id: 3,
      name: 'Shell Nigeria',
      logo: '/images/shell.png',
      website: 'https://shell.com.ng',
      contribution: 150000,
      year: 2025,
      benefits: ['Major Category Sponsor', 'Keynote Session', '15 VIP Passes']
    },
    {
      id: 4,
      name: 'MTN Foundation',
      logo: '/images/mtn.png',
      website: 'https://mtn.com',
      contribution: 150000,
      year: 2025,
      benefits: ['Major Category Sponsor', 'Brand on Banners', '15 VIP Passes']
    }
  ],
  'silver-garnet': [
    {
      id: 5,
      name: 'Chevron Nigeria',
      logo: '/images/chevron.png',
      website: 'https://chevron.com',
      contribution: 75000,
      year: 2025,
      benefits: ['Corporate Sponsor', 'Social Media Highlights', '8 VIP Passes']
    }
  ],
  'category-sponsors': [
    {
      id: 6,
      name: 'ExxonMobil',
      logo: '/images/exxonmobil.png',
      website: 'https://exxonmobil.com',
      contribution: 20000,
      year: 2025,
      category: 'Best CSR in Education',
      benefits: ['Category Presentation', '3 VIP Passes']
    },
    {
      id: 7,
      name: 'Total Energies',
      logo: '/images/total.png',
      website: 'https://totalenergies.com',
      contribution: 20000,
      year: 2025,
      category: 'Best EduTech Organization',
      benefits: ['Category Presentation', '3 VIP Passes']
    }
  ],
  'media-sponsors': [
    {
      id: 8,
      name: 'MainOne',
      logo: '/images/mainone.png',
      website: 'https://mainone.net',
      contribution: 8000,
      year: 2025,
      benefits: ['NESA TV Season Sponsor', 'Studio Branding']
    }
  ]
};

const tierInfo = [
  {
    id: 'africa-blue-garnet',
    name: 'Africa Blue Garnet',
    badge: '🏆 Title Sponsor',
    color: 'from-blue-600 to-blue-800',
    minAmount: 250000,
    description: 'Our premier title sponsors driving continental education transformation'
  },
  {
    id: 'diamond-garnet',
    name: 'Diamond Garnet',
    badge: '💎 Co-Sponsor',
    color: 'from-purple-600 to-purple-800',
    minAmount: 180000,
    description: 'Premium corporate partners co-sponsoring major categories'
  },
  {
    id: 'gold-garnet',
    name: 'Gold Garnet',
    badge: '🥇 Major Sponsor',
    color: 'from-yellow-500 to-yellow-700',
    minAmount: 150000,
    description: 'Major corporate sponsors supporting key award categories'
  },
  {
    id: 'silver-garnet',
    name: 'Silver Garnet',
    badge: '🥈 Corporate Sponsor',
    color: 'from-gray-400 to-gray-600',
    minAmount: 75000,
    description: 'Corporate sponsors with significant brand visibility'
  },
  {
    id: 'category-sponsors',
    name: 'Category Sponsors',
    badge: '🏆 Category Sponsor',
    color: 'from-green-600 to-green-800',
    minAmount: 20000,
    description: 'Dedicated sponsors of specific award categories'
  },
  {
    id: 'media-sponsors',
    name: 'Media Sponsors',
    badge: '📺 Media Sponsor',
    color: 'from-red-600 to-red-800',
    minAmount: 8000,
    description: 'Partners supporting NESA TV and media initiatives'
  }
];

export default function SponsorsHallPage() {
  const totalSponsors = Object.values(sponsors).flat().length;
  const totalContribution = Object.values(sponsors).flat().reduce((sum, sponsor) => sum + sponsor.contribution, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            NESA-Africa 2025 Hall of Sponsors
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Celebrating our partners in transforming African education
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{totalSponsors}</div>
              <div className="text-gray-600">Total Sponsors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">${totalContribution.toLocaleString()}</div>
              <div className="text-gray-600">Total Contribution</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">54+</div>
              <div className="text-gray-600">Countries Impacted</div>
            </div>
          </div>

          <Link 
            href="/sponsor"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg"
          >
            Become a Sponsor
            <FiExternalLink className="ml-2 w-4 h-4" />
          </Link>
        </motion.div>

        {/* Sponsor Tiers */}
        {tierInfo.map((tier, tierIndex) => {
          const tierSponsors = sponsors[tier.id as keyof typeof sponsors] || [];
          
          if (tierSponsors.length === 0) return null;

          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: tierIndex * 0.1 }}
              className="mb-12"
            >
              {/* Tier Header */}
              <div className="flex items-center mb-6">
                <div className={`p-4 rounded-full bg-gradient-to-r ${tier.color} text-white mr-4`}>
                  <FiStar className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{tier.name}</h2>
                  <p className="text-gray-600">{tier.description}</p>
                  <span className="inline-block mt-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    {tier.badge} • ${tier.minAmount.toLocaleString()}+
                  </span>
                </div>
              </div>

              {/* Sponsors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tierSponsors.map((sponsor, index) => (
                  <motion.div
                    key={sponsor.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (tierIndex * 0.1) + (index * 0.05) }}
                    className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-200 overflow-hidden"
                  >
                    <div className="p-6">
                      {/* Sponsor Logo and Info */}
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                          <Image
                            src={sponsor.logo}
                            alt={sponsor.name}
                            width={64}
                            height={64}
                            className="object-contain"
                            onError={(e) => {
                              // Fallback to initials if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<div class="text-gray-600 font-semibold text-lg">${sponsor.name.split(' ').map(n => n[0]).join('')}</div>`;
                              }
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">{sponsor.name}</h3>
                          <p className="text-sm text-gray-600">
                            ${sponsor.contribution.toLocaleString()} • {sponsor.year}
                          </p>
                          {'category' in sponsor && sponsor.category && (
                            <p className="text-xs text-blue-600 font-medium">{sponsor.category}</p>
                          )}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Sponsorship Benefits:</h4>
                        <div className="space-y-1">
                          {sponsor.benefits.slice(0, 3).map((benefit, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600">
                              <FiCheck className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                              {benefit}
                            </div>
                          ))}
                          {sponsor.benefits.length > 3 && (
                            <div className="text-xs text-gray-500 italic">
                              +{sponsor.benefits.length - 3} more benefits
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Website Link */}
                      {sponsor.website && (
                        <a
                          href={sponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Visit Website
                          <FiExternalLink className="ml-1 w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {/* Recognition Badge */}
                    <div className={`px-6 py-3 bg-gradient-to-r ${tier.color} text-white text-center`}>
                      <span className="text-sm font-medium">{tier.badge}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-8 border border-yellow-200"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Join Our Hall of Sponsors
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Partner with NESA-Africa 2025 to drive educational transformation across the continent. 
            Choose from our flexible sponsorship packages and make a lasting impact on African education.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/sponsor"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg"
            >
              Apply to Sponsor
              <FiAward className="ml-2 w-4 h-4" />
            </Link>
            
            <Link 
              href="/sponsorship"
              className="inline-flex items-center px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all border border-gray-300"
            >
              View Sponsorship Packages
              <FiExternalLink className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Interested in Sponsoring?</h3>
          <p className="text-gray-600 mb-4">
            Contact our partnerships team to discuss custom sponsorship opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:partnerships@nesa.africa" 
              className="flex items-center justify-center px-4 py-2 text-yellow-600 hover:text-yellow-700 font-medium"
            >
              partnerships@nesa.africa
            </a>
            <a 
              href="tel:+234-907-962-1110" 
              className="flex items-center justify-center px-4 py-2 text-yellow-600 hover:text-yellow-700 font-medium"
            >
              +234-907-962-1110
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}