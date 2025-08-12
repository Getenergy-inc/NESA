'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiGlobe, FiAward, FiTrendingUp, FiStar, FiExternalLink, FiCheck, FiArrowRight, FiPlay, FiTarget, FiHeart, FiBookOpen, FiTv, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';
import SponsorFormWrapper from "@/components/UI/SponsorForm/SponsorFormWrapper";
import Link from 'next/link';
import Image from 'next/image';

// Mock sponsor data
const featuredSponsors = [
  {
    id: 1,
    name: 'Shell Nigeria',
    logo: '/images/shell.png',
    tier: 'Gold Garnet Sponsor',
    contribution: 150000,
    year: 2025,
    description: 'Supporting educational excellence across Africa'
  },
  {
    id: 2,
    name: 'MTN Foundation',
    logo: '/images/mtn.png',
    tier: 'Category Sponsor',
    contribution: 20000,
    year: 2025,
    description: 'Empowering digital education initiatives'
  },
  {
    id: 3,
    name: 'African Development Bank',
    logo: '/images/afdb.png',
    tier: 'Diamond Garnet Sponsor',
    contribution: 180000,
    year: 2025,
    description: 'Investing in Africa\'s educational future'
  },
  {
    id: 4,
    name: 'Chevron Nigeria',
    logo: '/images/chevron.png',
    tier: 'Silver Garnet Sponsor',
    contribution: 75000,
    year: 2025,
    description: 'Championing sustainable education development'
  }
];

const sponsorshipStats = {
  totalSponsors: 24,
  totalContribution: 1250000,
  countriesImpacted: 54,
  studentsReached: 2500000
};

const impactAreas = [
  {
    icon: FiBookOpen,
    title: 'Educational Excellence',
    description: 'Supporting outstanding educators and institutions across Africa',
    impact: '2.5M+ students reached'
  },
  {
    icon: FiGlobe,
    title: 'Continental Reach',
    description: 'Connecting education leaders from all 54 African countries',
    impact: '54 countries engaged'
  },
  {
    icon: FiTv,
    title: 'Media & Visibility',
    description: 'Global platform reaching millions through NESA TV and digital channels',
    impact: '10M+ global audience'
  },
  {
    icon: FiTarget,
    title: 'Sustainable Development',
    description: 'Driving long-term educational transformation and capacity building',
    impact: '500+ institutions supported'
  }
];

const sponsorshipBenefits = [
  {
    category: 'Brand Visibility',
    benefits: [
      'Logo placement on nesa.africa with 10M+ annual visitors',
      'Recognition in NESA Annual Report distributed globally',
      'Social media features across all NESA platforms',
      'Press releases and media coverage',
      'Digital certificates and badges for your platforms'
    ]
  },
  {
    category: 'Event Access',
    benefits: [
      'VIP passes to awards ceremony and gala dinner',
      'Exclusive networking opportunities with education leaders',
      'Speaking opportunities at pre-event sessions',
      'Red carpet access and photo opportunities',
      'Private sponsor lounge access'
    ]
  },
  {
    category: 'Media Opportunities',
    benefits: [
      'Featured interviews on NESA TV',
      'Documentary participation and co-production rights',
      'Podcast sponsorship on "It\'s In Me" Radio',
      'Content collaboration opportunities',
      'Studio branding and logo placement'
    ]
  },
  {
    category: 'Social Impact',
    benefits: [
      'Direct contribution to educational scholarships',
      'Support for Rebuild My School Africa initiative',
      'CSR documentation and impact reporting',
      'Community development program participation',
      'Educational resource development support'
    ]
  }
];

export default function SponsorPage() {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return <SponsorFormWrapper />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'), 
                               url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'),
                               linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #dc2626 100%)`
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transform African
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Education
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Partner with NESA-Africa 2025 to drive educational excellence across the continent. 
              Join leading organizations making a lasting impact on African education.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                {sponsorshipStats.totalSponsors}
              </div>
              <div className="text-gray-300 text-sm md:text-base">Proud Sponsors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                ${(sponsorshipStats.totalContribution / 1000000).toFixed(1)}M
              </div>
              <div className="text-gray-300 text-sm md:text-base">Total Investment</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                {sponsorshipStats.countriesImpacted}+
              </div>
              <div className="text-gray-300 text-sm md:text-base">Countries Reached</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                {(sponsorshipStats.studentsReached / 1000000).toFixed(1)}M+
              </div>
              <div className="text-gray-300 text-sm md:text-base">Lives Impacted</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xl font-bold rounded-full hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              Become a Sponsor
              <FiArrowRight className="ml-3 w-6 h-6" />
            </button>
            
            <Link
              href="/sponsor-benefits"
              className="inline-flex items-center px-10 py-5 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-semibold rounded-full hover:bg-white/30 hover:border-white/50 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <FiStar className="mr-3 w-5 h-5" />
              View Benefits
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center text-white">
            <span className="text-sm mb-2">Discover More</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Impact Areas Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Impact Across Africa
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              NESA-Africa is the continent's premier platform for recognizing and celebrating 
              educational excellence, innovation, and leadership.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <area.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{area.title}</h3>
                <p className="text-gray-600 mb-4">{area.description}</p>
                <div className="text-sm font-semibold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full inline-block">
                  {area.impact}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sponsors Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #f59e0b 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #ea580c 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full text-yellow-800 text-sm font-semibold mb-6">
              <FiStar className="w-4 h-4 mr-2" />
              Trusted by Leading Organizations
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Our Esteemed
              <span className="block bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Partners
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join an exclusive community of visionary organizations that are already transforming 
              African education and creating lasting impact across the continent.
            </p>
          </motion.div>

          {/* Premium Sponsor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {featuredSponsors.slice(0, 2).map((sponsor, index) => (
              <motion.div
                key={sponsor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
              >
                {/* Premium Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    PREMIUM
                  </div>
                </div>

                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-orange-50 opacity-60"></div>
                
                <div className="relative z-10 p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mr-6 overflow-hidden border border-gray-100">
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={96}
                        height={96}
                        className="object-contain p-2"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="text-gray-700 font-bold text-2xl">${sponsor.name.split(' ').map(n => n[0]).join('')}</div>`;
                          }
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{sponsor.name}</h3>
                      <div className="flex items-center text-yellow-600 mb-2">
                        <FiStar className="w-4 h-4 mr-1 fill-current" />
                        <span className="text-sm font-semibold">{sponsor.tier}</span>
                      </div>
                      <div className="text-3xl font-bold text-gray-900">
                        ${sponsor.contribution.toLocaleString()}
                        <span className="text-sm font-normal text-gray-600 ml-1">investment</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">{sponsor.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <FiCalendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">Partner since {sponsor.year}</span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <FiCheck className="w-4 h-4 mr-2" />
                      <span className="text-sm font-semibold">Verified Partner</span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            ))}
          </div>

          {/* Standard Sponsor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
            {featuredSponsors.slice(2).map((sponsor, index) => (
              <motion.div
                key={sponsor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index + 2) * 0.1 }}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mr-4 overflow-hidden border border-gray-100">
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={64}
                        height={64}
                        className="object-contain p-1"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="text-gray-600 font-bold text-lg">${sponsor.name.split(' ').map(n => n[0]).join('')}</div>`;
                          }
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{sponsor.name}</h3>
                      <div className="flex items-center text-yellow-600 mb-1">
                        <FiStar className="w-3 h-3 mr-1 fill-current" />
                        <span className="text-xs font-semibold">{sponsor.tier}</span>
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        ${sponsor.contribution.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{sponsor.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Partner since {sponsor.year}</span>
                    <div className="flex items-center text-green-600">
                      <FiCheck className="w-3 h-3 mr-1" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Join Our Distinguished Community
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Be part of an exclusive network of organizations committed to educational excellence. 
                Your partnership creates lasting impact and positions your brand alongside industry leaders.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/sponsors-hall"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                >
                  <FiUsers className="w-5 h-5 mr-2" />
                  View All Partners
                  <FiExternalLink className="ml-2 w-4 h-4" />
                </Link>
                
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                >
                  <FiAward className="w-5 h-5 mr-2" />
                  Become a Partner
                  <FiArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sponsorship Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Sponsorship Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Maximize your brand visibility, network with education leaders, and create lasting social impact
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sponsorshipBenefits.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-3">
                    <FiCheck className="w-4 h-4 text-white" />
                  </div>
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start">
                      <FiCheck className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/sponsor-benefits"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-700 rounded-full hover:bg-gray-50 transition-all duration-300 font-semibold border border-gray-200"
            >
              View Detailed Benefits
              <FiExternalLink className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join our community of forward-thinking organizations committed to transforming African education. 
              Your partnership creates lasting impact across the continent.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-12 py-6 bg-white text-gray-900 text-xl font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Apply to Become a Sponsor
                <FiArrowRight className="ml-3 w-6 h-6" />
              </button>
              
              <Link 
                href="/sponsor-benefits"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold"
              >
                <FiStar className="w-5 h-5 mr-2" />
                View Benefits
                <FiExternalLink className="ml-2 w-4 h-4" />
              </Link>
              
              <Link 
                href="/sponsor-tracker"
                className="inline-flex items-center px-6 py-3 border border-white/50 text-white rounded-full hover:bg-white/10 transition-all duration-300 font-medium text-sm"
              >
                Track Application
                <FiExternalLink className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Payment Information Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6">
              <FiCheck className="w-4 h-4 mr-2" />
              Secure Payment Options
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Official Payment Details
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Make your sponsorship payment directly to our official NESA-Africa account. 
              Multiple currency options available for your convenience.
            </p>
          </motion.div>

          {/* Bank Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl mb-12"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">NEW EDUCATION STANDARDS AWARD</h3>
              <p className="text-blue-100">PROVIDUS Bank</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Naira Account */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">₦</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Nigerian Naira</h4>
                    <p className="text-xs text-blue-200">NGN Account</p>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-4">
                  <p className="text-xs text-blue-200 mb-1">Account Number</p>
                  <p className="text-lg font-mono font-bold text-white tracking-wider">1305476015</p>
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText('1305476015')}
                  className="w-full mt-3 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-all duration-200"
                >
                  Copy Account Number
                </button>
              </div>

              {/* USD Account */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">$</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">US Dollar</h4>
                    <p className="text-xs text-blue-200">USD Account</p>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-4">
                  <p className="text-xs text-blue-200 mb-1">Account Number</p>
                  <p className="text-lg font-mono font-bold text-white tracking-wider">1305486988</p>
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText('1305486988')}
                  className="w-full mt-3 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-all duration-200"
                >
                  Copy Account Number
                </button>
              </div>

              {/* GBP Account */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">£</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">British Pound</h4>
                    <p className="text-xs text-blue-200">GBP Account</p>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-4">
                  <p className="text-xs text-blue-200 mb-1">Account Number</p>
                  <p className="text-lg font-mono font-bold text-white tracking-wider">1305532926</p>
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText('1305532926')}
                  className="w-full mt-3 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-all duration-200"
                >
                  Copy Account Number
                </button>
              </div>

              {/* EUR Account */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">€</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Euro</h4>
                    <p className="text-xs text-blue-200">EUR Account</p>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-4">
                  <p className="text-xs text-blue-200 mb-1">Account Number</p>
                  <p className="text-lg font-mono font-bold text-white tracking-wider">1305532933</p>
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText('1305532933')}
                  className="w-full mt-3 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-all duration-200"
                >
                  Copy Account Number
                </button>
              </div>
            </div>

            {/* Important Notes */}
            <div className="mt-8 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <FiCheck className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-yellow-100 mb-2">Payment Instructions</h4>
                  <ul className="text-sm text-yellow-200 space-y-1">
                    <li>• Include your company name and "NESA Sponsorship" in the payment reference</li>
                    <li>• Send payment confirmation to partnerships@nesa.africa</li>
                    <li>• Allow 2-3 business days for payment verification</li>
                    <li>• You will receive an official receipt and sponsorship certificate upon confirmation</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-full text-green-100">
              <FiCheck className="w-5 h-5 mr-2" />
              <span className="font-semibold">Verified Official Account • Secure Payments Guaranteed</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">Questions About Sponsorship?</h3>
          <p className="text-gray-300 mb-8">
            Our partnerships team is ready to discuss custom sponsorship opportunities and answer any questions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="mailto:partnerships@nesa.africa" 
              className="inline-flex items-center px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-all duration-300 font-semibold"
            >
              <FiMail className="w-5 h-5 mr-2" />
              partnerships@nesa.africa
            </a>
            <a 
              href="tel:+234-907-962-1110" 
              className="inline-flex items-center px-6 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-semibold"
            >
              <FiPhone className="w-5 h-5 mr-2" />
              +234-907-962-1110
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}