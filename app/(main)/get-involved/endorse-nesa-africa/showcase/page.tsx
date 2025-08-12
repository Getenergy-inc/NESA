"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Filter,
  Globe,
  Building2,
  ExternalLink,
  Star,
  ArrowRight,
  Users,
  Award
} from 'lucide-react';
import Button from '@/components/Common/Button';

interface Endorsement {
  id: string;
  organization_name: string;
  country: string;
  endorser_category: string;
  endorsement_type: string;
  endorsement_tier?: string;
  endorsement_headline: string;
  endorsement_statement: string;
  logo_file?: string;
  video_link?: string;
  website?: string;
  approved_at: string;
  featured: boolean;
}

const EndorserShowcasePage = () => {
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
  const [filteredEndorsements, setFilteredEndorsements] = useState<Endorsement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    fetchEndorsements();
  }, []);

  useEffect(() => {
    filterEndorsements();
  }, [endorsements, searchTerm, selectedCategory, selectedCountry, showFeaturedOnly]);

  const fetchEndorsements = async () => {
    try {
      const response = await fetch('/api/endorse/showcase');
      const data = await response.json();
      
      if (data.success) {
        setEndorsements(data.endorsements);
        setCategories(data.filters.categories);
        setCountries(data.filters.countries);
      }
    } catch (error) {
      console.error('Error fetching endorsements:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterEndorsements = () => {
    let filtered = endorsements;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(endorsement =>
        endorsement.organization_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        endorsement.endorsement_headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        endorsement.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(endorsement => endorsement.endorser_category === selectedCategory);
    }

    // Country filter
    if (selectedCountry !== 'all') {
      filtered = filtered.filter(endorsement => endorsement.country === selectedCountry);
    }

    // Featured filter
    if (showFeaturedOnly) {
      filtered = filtered.filter(endorsement => endorsement.featured);
    }

    setFilteredEndorsements(filtered);
  };

  const getCategoryLabel = (category: string) => {
    const categoryLabels: { [key: string]: string } = {
      'bilateral_multilateral': 'Bilateral & Multilateral',
      'government_ministry': 'Government Ministry',
      'corporate': 'Corporate',
      'diaspora': 'Diaspora',
      'academic': 'Academic',
      'development_foundation': 'Development Foundation',
      'faith_based': 'Faith-Based',
      'professional_body': 'Professional Body',
      'media_creative': 'Media & Creative',
      'ngo': 'NGO',
      'tech_innovation': 'Tech & Innovation',
      'local_government': 'Local Government',
      'education_icons': 'Education Icons',
      'civic_advocacy': 'Civic Advocacy',
      'policy_think_tank': 'Policy Think Tank',
      'public_private_partnership': 'Public-Private Partnership'
    };
    return categoryLabels[category] || category;
  };

  const getTierBadge = (tier?: string) => {
    if (!tier) return null;
    
    const tierColors: { [key: string]: string } = {
      'bronze': 'bg-amber-100 text-amber-800',
      'silver': 'bg-gray-100 text-gray-800',
      'gold': 'bg-yellow-100 text-yellow-800',
      'platinum': 'bg-purple-100 text-purple-800',
      'africa_blue_garnet': 'bg-blue-100 text-blue-800'
    };

    const tierLabels: { [key: string]: string } = {
      'bronze': 'Bronze',
      'silver': 'Silver',
      'gold': 'Gold',
      'platinum': 'Platinum',
      'africa_blue_garnet': 'Africa Blue Garnet'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tierColors[tier] || 'bg-gray-100 text-gray-800'}`}>
        {tierLabels[tier] || tier}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ea580c] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading endorsements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#17120a] via-[#1a140b] to-[#17120a] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#FFB92E] to-[#ea580c] bg-clip-text text-transparent">
              Wall of Endorsers
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto">
              Organizations and institutions supporting NESA-Africa 2025's mission for sustainable education impact
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 bg-[#ea580c]/20 px-4 py-2 rounded-lg">
                <Users className="w-5 h-5 text-[#ea580c]" />
                <span className="text-sm">{endorsements.length} Total Endorsers</span>
              </div>
              <div className="flex items-center gap-2 bg-[#ea580c]/20 px-4 py-2 rounded-lg">
                <Star className="w-5 h-5 text-[#ea580c]" />
                <span className="text-sm">{endorsements.filter(e => e.featured).length} Featured</span>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/get-involved/endorse-nesa-africa/upload">
                <Button
                  text="Join the Movement"
                  variant="filled"
                  size="large"
                  className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-8 py-4 text-lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search organizations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ea580c]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ea580c]"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {getCategoryLabel(category)}
                </option>
              ))}
            </select>

            {/* Country Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ea580c]"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="all">All Countries</option>
              {countries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            {/* Featured Toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showFeaturedOnly}
                onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                className="w-4 h-4 text-[#ea580c] border-gray-300 rounded focus:ring-[#ea580c]"
              />
              <span className="text-sm text-gray-700">Featured Only</span>
            </label>
          </div>
        </div>
      </section>

      {/* Endorsements Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredEndorsements.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No endorsements found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or filters.
              </p>
              <Link href="/get-involved/endorse-nesa-africa/upload">
                <Button
                  text="Be the First to Endorse"
                  variant="filled"
                  className="bg-[#ea580c] hover:bg-[#dc2626] text-white"
                />
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <p className="text-gray-600">
                  Showing {filteredEndorsements.length} of {endorsements.length} endorsements
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEndorsements.map((endorsement, index) => (
                  <motion.div
                    key={endorsement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                      endorsement.featured ? 'ring-2 ring-[#ea580c] ring-opacity-50' : ''
                    }`}
                  >
                    {endorsement.featured && (
                      <div className="bg-gradient-to-r from-[#ea580c] to-[#dc2626] text-white px-4 py-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Star className="w-4 h-4" />
                          <span className="text-sm font-semibold">Featured Endorser</span>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      {/* Logo and Organization */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {endorsement.logo_file ? (
                            <Image
                              src={endorsement.logo_file}
                              alt={`${endorsement.organization_name} logo`}
                              width={64}
                              height={64}
                              className="w-full h-full object-contain rounded-lg"
                            />
                          ) : (
                            <Building2 className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
                            {endorsement.organization_name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <Globe className="w-4 h-4" />
                            <span>{endorsement.country}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {getCategoryLabel(endorsement.endorser_category)}
                            </span>
                            {endorsement.endorsement_type === 'paid' && getTierBadge(endorsement.endorsement_tier)}
                          </div>
                        </div>
                      </div>

                      {/* Endorsement Content */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {endorsement.endorsement_headline}
                        </h4>
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {endorsement.endorsement_statement}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-xs text-gray-500">
                          Endorsed {new Date(endorsement.approved_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          {endorsement.video_link && (
                            <a
                              href={endorsement.video_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#ea580c] hover:text-[#dc2626] transition-colors"
                              title="Watch endorsement video"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                              </svg>
                            </a>
                          )}
                          {endorsement.website && (
                            <a
                              href={endorsement.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#ea580c] hover:text-[#dc2626] transition-colors"
                              title="Visit organization website"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#17120a] via-[#1a140b] to-[#17120a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join These Distinguished Endorsers
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Add your organization's voice to the movement for sustainable education impact across Africa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-involved/endorse-nesa-africa/upload">
                <Button
                  text="Submit Your Endorsement"
                  variant="filled"
                  size="large"
                  className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-8 py-4 text-lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                />
              </Link>
              <Link href="/get-involved/endorse-nesa-africa">
                <Button
                  text="Learn More"
                  variant="outline"
                  size="large"
                  className="border-white text-white hover:bg-white hover:text-[#17120a] px-8 py-4 text-lg"
                />
              </Link>
            </div>

            <div className="mt-8 text-sm text-gray-400">
              <p>Questions? Contact us at <a href="mailto:endorse@nesa.africa" className="text-[#ea580c] hover:underline">endorse@nesa.africa</a></p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EndorserShowcasePage;
