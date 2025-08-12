'use client';

import { motion } from 'framer-motion';
import { FiTv, FiGlobe, FiUsers, FiAward, FiMail, FiCalendar, FiDownload, FiStar } from 'react-icons/fi';

const benefitCategories = [
  {
    id: 'visibility',
    title: 'Brand Visibility & Recognition',
    icon: FiGlobe,
    color: 'from-blue-500 to-blue-700',
    benefits: [
      {
        title: 'Global Digital Reach',
        description: 'Reach 10+ million viewers across Africa and diaspora',
        tiers: ['All tiers']
      },
      {
        title: 'Website Recognition',
        description: 'Logo and profile on nesa.africa with backlinks',
        tiers: ['All tiers']
      },
      {
        title: 'Social Media Features',
        description: 'Regular features across NESA social platforms',
        tiers: ['Silver+']
      },
      {
        title: 'Press & Media Coverage',
        description: 'International media features and press releases',
        tiers: ['Gold+']
      }
    ]
  },
  {
    id: 'events',
    title: 'Event Access & Networking',
    icon: FiUsers,
    color: 'from-green-500 to-green-700',
    benefits: [
      {
        title: 'VIP Gala Passes',
        description: 'Exclusive access to awards ceremony and networking',
        tiers: ['2-30 passes based on tier']
      },
      {
        title: 'Speaking Opportunities',
        description: 'Keynote and panel speaking slots',
        tiers: ['Gold+']
      },
      {
        title: 'Red Carpet Access',
        description: 'Premium red carpet experience and photo ops',
        tiers: ['Diamond+']
      },
      {
        title: 'VIP Lounge Access',
        description: 'Exclusive networking in sponsor lounge',
        tiers: ['Platinum+']
      }
    ]
  },
  {
    id: 'media',
    title: 'Media & Content Opportunities',
    icon: FiTv,
    color: 'from-red-500 to-red-700',
    benefits: [
      {
        title: 'NESA TV Features',
        description: 'Interviews and documentary features',
        tiers: ['Gold+']
      },
      {
        title: 'Studio Branding',
        description: 'Logo placement in NESA TV studio',
        tiers: ['Media Sponsors']
      },
      {
        title: 'Content Co-Creation',
        description: 'Collaborate on educational content',
        tiers: ['Diamond+']
      },
      {
        title: 'Podcast Sponsorship',
        description: "Sponsor 'It's In Me' Radio episodes",
        tiers: ['Media Sponsors']
      }
    ]
  },
  {
    id: 'awards',
    title: 'Award & Recognition Rights',
    icon: FiAward,
    color: 'from-purple-500 to-purple-700',
    benefits: [
      {
        title: 'Category Naming Rights',
        description: 'Name award categories after your brand',
        tiers: ['Category Sponsors']
      },
      {
        title: 'Award Presentation',
        description: 'Present awards on stage during ceremony',
        tiers: ['Category+']
      },
      {
        title: 'Certificate Co-Branding',
        description: 'Your logo on winner certificates',
        tiers: ['Silver+']
      },
      {
        title: 'Trophy Branding',
        description: 'Logo placement on physical awards',
        tiers: ['Gold+']
      }
    ]
  },
  {
    id: 'digital',
    title: 'Digital Assets & Certificates',
    icon: FiDownload,
    color: 'from-yellow-500 to-yellow-700',
    benefits: [
      {
        title: 'Digital Certificates',
        description: 'Downloadable sponsorship certificates',
        tiers: ['All tiers']
      },
      {
        title: 'Social Media Badges',
        description: 'Digital badges for your platforms',
        tiers: ['All tiers']
      },
      {
        title: 'Impact Reports',
        description: 'Detailed reports on sponsorship impact',
        tiers: ['All tiers']
      },
      {
        title: 'Custom Graphics',
        description: 'Branded graphics and promotional materials',
        tiers: ['Silver+']
      }
    ]
  },
  {
    id: 'impact',
    title: 'Educational Impact & CSR',
    icon: FiStar,
    color: 'from-indigo-500 to-indigo-700',
    benefits: [
      {
        title: 'Scholarship Funding',
        description: 'Direct contribution to educational scholarships',
        tiers: ['All tiers']
      },
      {
        title: 'School Rebuilding',
        description: 'Support for Rebuild My School Africa initiative',
        tiers: ['Gold+']
      },
      {
        title: 'CSR Documentation',
        description: 'Comprehensive CSR impact documentation',
        tiers: ['All tiers']
      },
      {
        title: 'Community Programs',
        description: 'Support local chapter development',
        tiers: ['Silver+']
      }
    ]
  }
];

const testimonials = [
  {
    company: 'Shell Nigeria',
    logo: '/images/shell.png',
    quote: 'Partnering with NESA-Africa has significantly enhanced our education CSR visibility across the continent.',
    author: 'CSR Director',
    tier: 'Gold Garnet Sponsor'
  },
  {
    company: 'MTN Foundation',
    logo: '/images/mtn.png',
    quote: 'The networking opportunities and brand exposure through NESA have been exceptional for our foundation.',
    author: 'Foundation Manager',
    tier: 'Category Sponsor'
  }
];

export default function BenefitsShowcase() {
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Sponsorship Benefits
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the full range of benefits and opportunities available to NESA-Africa sponsors, 
            from brand visibility to educational impact.
          </p>
        </motion.div>

        {/* Benefits Categories */}
        <div className="space-y-16">
          {benefitCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-white rounded-xl shadow-sm border p-8"
            >
              {/* Category Header */}
              <div className="flex items-center mb-8">
                <div className={`p-4 rounded-full bg-gradient-to-r ${category.color} text-white mr-6`}>
                  <category.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                  <p className="text-gray-600">Maximize your impact and visibility</p>
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.benefits.map((benefit, benefitIndex) => (
                  <motion.div
                    key={benefitIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (categoryIndex * 0.1) + (benefitIndex * 0.05) }}
                    className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{benefit.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {benefit.tiers.map((tier, tierIndex) => (
                        <span
                          key={tierIndex}
                          className="px-2 py-1 bg-white text-gray-700 text-xs rounded-full border"
                        >
                          {tier}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What Our Sponsors Say
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-gray-600 font-semibold text-sm">
                      {testimonial.company.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.company}</h4>
                    <p className="text-sm text-gray-600">{testimonial.tier}</p>
                  </div>
                </div>
                
                <blockquote className="text-gray-700 italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
                
                <p className="text-sm text-gray-600">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-20 text-center bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-12 border border-yellow-200"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Make an Impact?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of forward-thinking organizations committed to transforming African education. 
            Choose your sponsorship tier and start making a difference today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/sponsor"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg font-semibold"
            >
              Apply to Sponsor
              <FiAward className="ml-2 w-5 h-5" />
            </a>
            
            <a
              href="/sponsorship"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all border border-gray-300 font-semibold"
            >
              View All Packages
              <FiGlobe className="ml-2 w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}