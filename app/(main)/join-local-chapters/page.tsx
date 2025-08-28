"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeftCircle, FiMapPin, FiUsers, FiCalendar, FiMail, FiPhone, FiGlobe, FiCheck, FiX } from "react-icons/fi";
import { MapPin, Users, Calendar, Mail, Phone, Globe, Star, Search, Filter, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthContext } from '@/lib/context/AuthContext';

interface Chapter {
  id: string;
  name: string;
  country: string;
  city: string;
  region: string;
  description: string;
  memberCount: number;
  establishedDate: string;
  leaderName: string;
  leaderImage: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  meetingSchedule: string;
  activities: string[];
  achievements: string[];
  membershipFee: {
    free: boolean;
    standard?: number;
    premium?: number;
  };
  isActive: boolean;
  rating: number;
  image: string;
  upcomingEvents: {
    title: string;
    date: string;
    type: string;
  }[];
}

interface MembershipApplication {
  chapterId: string;
  membershipType: 'free' | 'standard' | 'premium';
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    profession: string;
    experience: string;
    motivation: string;
  };
}

const JoinLocalChapters: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthContext();
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [membershipType, setMembershipType] = useState<'free' | 'standard' | 'premium'>('free');
  const [applicationData, setApplicationData] = useState<MembershipApplication['personalInfo']>({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    profession: '',
    experience: '',
    motivation: ''
  });

  const regions = [
    'All Regions',
    'West Africa',
    'East Africa',
    'North Africa',
    'Central Africa',
    'Southern Africa',
    'Diaspora - North America',
    'Diaspora - Europe',
    'Diaspora - Asia'
  ];

  const chapters: Chapter[] = [
    {
      id: '1',
      name: 'NESA Lagos Chapter',
      country: 'Nigeria',
      city: 'Lagos',
      region: 'West Africa',
      description: 'Leading educational transformation in Lagos State through innovative programs and community partnerships.',
      memberCount: 245,
      establishedDate: '2023-03-15',
      leaderName: 'Dr. Adunni Olorunnisola',
      leaderImage: '/images/leaders/leader1.jpg',
      contactEmail: 'lagos@nesa-africa.org',
      contactPhone: '+234-901-234-5678',
      website: 'https://lagos.nesa-africa.org',
      meetingSchedule: 'Every 2nd Saturday, 10:00 AM',
      activities: ['Teacher Training', 'Student Mentorship', 'School Infrastructure', 'Digital Literacy'],
      achievements: ['50+ Teachers Trained', '20 Schools Supported', '1000+ Students Impacted'],
      membershipFee: {
        free: true,
        standard: 25,
        premium: 50
      },
      isActive: true,
      rating: 4.8,
      image: '/images/chapters/lagos.jpg',
      upcomingEvents: [
        { title: 'Teacher Training Workshop', date: '2025-02-15', type: 'Workshop' },
        { title: 'Student Scholarship Drive', date: '2025-02-28', type: 'Fundraising' }
      ]
    },
    {
      id: '2',
      name: 'NESA Nairobi Chapter',
      country: 'Kenya',
      city: 'Nairobi',
      region: 'East Africa',
      description: 'Empowering Kenyan youth through quality education and technology integration in learning.',
      memberCount: 189,
      establishedDate: '2023-05-20',
      leaderName: 'Prof. Grace Wanjiku',
      leaderImage: '/images/leaders/leader2.jpg',
      contactEmail: 'nairobi@nesa-africa.org',
      contactPhone: '+254-700-123-456',
      meetingSchedule: 'Every 3rd Sunday, 2:00 PM',
      activities: ['STEM Education', 'Girls in Tech', 'Rural Outreach', 'Leadership Development'],
      achievements: ['30+ STEM Programs', '500+ Girls Trained', '15 Rural Schools Connected'],
      membershipFee: {
        free: true,
        standard: 20,
        premium: 40
      },
      isActive: true,
      rating: 4.9,
      image: '/images/chapters/nairobi.jpg',
      upcomingEvents: [
        { title: 'Girls in Tech Summit', date: '2025-02-20', type: 'Conference' },
        { title: 'Rural School Visit', date: '2025-03-05', type: 'Outreach' }
      ]
    },
    {
      id: '3',
      name: 'NESA Accra Chapter',
      country: 'Ghana',
      city: 'Accra',
      region: 'West Africa',
      description: 'Promoting educational excellence and innovation across Ghana through collaborative initiatives.',
      memberCount: 156,
      establishedDate: '2023-07-10',
      leaderName: 'Dr. Kwame Asante',
      leaderImage: '/images/leaders/leader3.jpg',
      contactEmail: 'accra@nesa-africa.org',
      contactPhone: '+233-24-123-4567',
      meetingSchedule: 'Every 1st Saturday, 9:00 AM',
      activities: ['Curriculum Development', 'Teacher Exchange', 'Community Libraries', 'Adult Literacy'],
      achievements: ['25+ Curricula Developed', '100+ Teachers Exchanged', '10 Libraries Built'],
      membershipFee: {
        free: true,
        standard: 22,
        premium: 45
      },
      isActive: true,
      rating: 4.7,
      image: '/images/chapters/accra.jpg',
      upcomingEvents: [
        { title: 'Curriculum Innovation Workshop', date: '2025-02-25', type: 'Workshop' },
        { title: 'Community Library Opening', date: '2025-03-10', type: 'Event' }
      ]
    },
    {
      id: '4',
      name: 'NESA London Chapter',
      country: 'United Kingdom',
      city: 'London',
      region: 'Diaspora - Europe',
      description: 'Connecting African diaspora professionals to support education initiatives across Africa.',
      memberCount: 98,
      establishedDate: '2023-09-05',
      leaderName: 'Dr. Amina Hassan',
      leaderImage: '/images/leaders/leader4.jpg',
      contactEmail: 'london@nesa-africa.org',
      contactPhone: '+44-20-1234-5678',
      website: 'https://london.nesa-africa.org',
      meetingSchedule: 'Every 2nd Thursday, 7:00 PM',
      activities: ['Fundraising', 'Professional Networking', 'Mentorship Programs', 'Cultural Exchange'],
      achievements: ['£50K+ Raised', '200+ Professionals Connected', '50+ Mentorship Pairs'],
      membershipFee: {
        free: true,
        standard: 30,
        premium: 60
      },
      isActive: true,
      rating: 4.6,
      image: '/images/chapters/london.jpg',
      upcomingEvents: [
        { title: 'Annual Fundraising Gala', date: '2025-03-15', type: 'Fundraising' },
        { title: 'Professional Networking Event', date: '2025-03-22', type: 'Networking' }
      ]
    },
    {
      id: '5',
      name: 'NESA Cairo Chapter',
      country: 'Egypt',
      city: 'Cairo',
      region: 'North Africa',
      description: 'Advancing educational standards and cross-cultural learning in North Africa.',
      memberCount: 134,
      establishedDate: '2023-11-12',
      leaderName: 'Prof. Omar El-Rashid',
      leaderImage: '/images/leaders/leader5.jpg',
      contactEmail: 'cairo@nesa-africa.org',
      contactPhone: '+20-10-1234-5678',
      meetingSchedule: 'Every 4th Friday, 6:00 PM',
      activities: ['Language Programs', 'Cultural Exchange', 'Research Collaboration', 'Youth Development'],
      achievements: ['5 Languages Taught', '20+ Cultural Events', '15 Research Projects'],
      membershipFee: {
        free: true,
        standard: 18,
        premium: 35
      },
      isActive: true,
      rating: 4.5,
      image: '/images/chapters/cairo.jpg',
      upcomingEvents: [
        { title: 'Arabic-English Language Exchange', date: '2025-02-18', type: 'Cultural' },
        { title: 'Youth Leadership Summit', date: '2025-03-01', type: 'Conference' }
      ]
    }
  ];

  const filteredChapters = chapters.filter(chapter => {
    const matchesRegion = selectedRegion === 'all' || selectedRegion === 'All Regions' || chapter.region === selectedRegion;
    const matchesSearch = chapter.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         chapter.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chapter.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSearch && chapter.isActive;
  });

  const handleJoinChapter = async () => {
    if (!selectedChapter || !isAuthenticated) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowJoinModal(false);
      setShowSuccess(true);
      setSelectedChapter(null);
    } catch (error) {
      console.error('Join chapter failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please log in to join a local chapter</p>
          <button 
            onClick={() => router.push('/account/login')}
            className="bg-primaryGold hover:bg-deepGold text-white px-6 py-3 rounded-lg font-medium"
          >
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <button onClick={handleBack} className="flex items-center text-gray-600 mb-4">
            <FiArrowLeftCircle className="text-2xl mr-2" />
            <span>Back</span>
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Join Local Chapters</h1>
              <p className="text-gray-600">Connect with NESA communities worldwide and make a local impact</p>
            </div>
            
            {/* Stats Card */}
            <div className="mt-4 md:mt-0 bg-gradient-to-r from-primaryGold to-deepGold rounded-xl p-4 text-white min-w-[200px]">
              <div className="text-center">
                <p className="text-sm opacity-90">Active Chapters</p>
                <p className="text-2xl font-bold">{chapters.filter(c => c.isActive).length}</p>
                <p className="text-xs opacity-80">Across {new Set(chapters.map(c => c.region)).size} regions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Search Chapters</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, city, or country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent"
                />
              </div>
            </div>

            {/* Regions Filter */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Regions</h3>
              <div className="space-y-2">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region.toLowerCase())}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedRegion === region.toLowerCase() || (selectedRegion === 'all' && region === 'All Regions')
                        ? 'bg-primaryGold text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Chapter Benefits</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primaryGold mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Networking</p>
                    <p className="text-xs text-gray-500">Connect with like-minded professionals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primaryGold mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Events</p>
                    <p className="text-xs text-gray-500">Attend workshops and conferences</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-primaryGold mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Impact</p>
                    <p className="text-xs text-gray-500">Make a difference in education</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Members</p>
                    <p className="text-2xl font-bold text-gray-800">{chapters.reduce((sum, c) => sum + c.memberCount, 0).toLocaleString()}</p>
                  </div>
                  <Users className="w-8 h-8 text-primaryGold" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Countries</p>
                    <p className="text-2xl font-bold text-gray-800">{new Set(chapters.map(c => c.country)).size}</p>
                  </div>
                  <Globe className="w-8 h-8 text-primaryGold" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Rating</p>
                    <p className="text-2xl font-bold text-gray-800">{(chapters.reduce((sum, c) => sum + c.rating, 0) / chapters.length).toFixed(1)}</p>
                  </div>
                  <Star className="w-8 h-8 text-primaryGold" />
                </div>
              </div>
            </div>

            {/* Chapters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredChapters.map((chapter) => (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={chapter.image}
                      alt={chapter.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/localmap.png';
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-800">{chapter.rating}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-primaryGold text-white px-3 py-1 rounded-full text-sm font-medium">
                      {chapter.region}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{chapter.name}</h3>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {chapter.city}, {chapter.country}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-primaryGold mb-1">
                          <Users className="w-4 h-4 mr-1" />
                          <span className="font-bold">{chapter.memberCount}</span>
                        </div>
                        <p className="text-xs text-gray-500">members</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{chapter.description}</p>
                    
                    {/* Leader Info */}
                    <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="relative w-10 h-10">
                        <Image
                          src={chapter.leaderImage}
                          alt={chapter.leaderName}
                          fill
                          className="rounded-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/Avatar.png';
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-800">{chapter.leaderName}</p>
                        <p className="text-xs text-gray-500">Chapter Leader</p>
                      </div>
                    </div>
                    
                    {/* Activities */}
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-700 mb-2">Key Activities:</p>
                      <div className="flex flex-wrap gap-1">
                        {chapter.activities.slice(0, 3).map((activity, index) => (
                          <span key={index} className="text-xs bg-primaryGold/10 text-primaryGold px-2 py-1 rounded-full">
                            {activity}
                          </span>
                        ))}
                        {chapter.activities.length > 3 && (
                          <span className="text-xs text-gray-500">+{chapter.activities.length - 3} more</span>
                        )}
                      </div>
                    </div>

                    {/* Meeting Schedule */}
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      {chapter.meetingSchedule}
                    </div>

                    {/* Membership Options */}
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-700 mb-2">Membership:</p>
                      <div className="flex gap-2">
                        {chapter.membershipFee.free && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Free</span>
                        )}
                        {chapter.membershipFee.standard && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Standard ${chapter.membershipFee.standard}
                          </span>
                        )}
                        {chapter.membershipFee.premium && (
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                            Premium ${chapter.membershipFee.premium}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setSelectedChapter(chapter);
                        setShowJoinModal(true);
                      }}
                      className="w-full bg-primaryGold hover:bg-deepGold text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Users className="w-4 h-4" />
                      Join Chapter
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredChapters.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No chapters found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedRegion('all');
                    setSearchTerm('');
                  }}
                  className="mt-4 text-primaryGold hover:text-deepGold font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Join Modal */}
      <AnimatePresence>
        {showJoinModal && selectedChapter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Join {selectedChapter.name}</h2>
                  <button 
                    onClick={() => setShowJoinModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                {/* Chapter Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="relative w-16 h-16">
                      <Image
                        src={selectedChapter.image}
                        alt={selectedChapter.name}
                        fill
                        className="rounded-lg object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/localmap.png';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{selectedChapter.name}</h3>
                      <p className="text-gray-600">{selectedChapter.city}, {selectedChapter.country}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {selectedChapter.memberCount} members
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {selectedChapter.rating} rating
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Meeting Schedule:</p>
                      <p className="text-gray-600">{selectedChapter.meetingSchedule}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Leader:</p>
                      <p className="text-gray-600">{selectedChapter.leaderName}</p>
                    </div>
                  </div>
                </div>

                {/* Membership Type Selection */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Select Membership Type</h3>
                  <div className="space-y-3">
                    {selectedChapter.membershipFee.free && (
                      <div
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${membershipType === 'free' ? 'border-primaryGold bg-primaryGold/10' : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => setMembershipType('free')}
                      >
                        <div>
                          <h4 className="font-medium">Free Membership</h4>
                          <p className="text-sm text-gray-500">Basic access to chapter activities and events</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">Free</p>
                          {membershipType === 'free' && <FiCheck className="text-primaryGold mt-1" />}
                        </div>
                      </div>
                    )}
                    
                    {selectedChapter.membershipFee.standard && (
                      <div
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${membershipType === 'standard' ? 'border-primaryGold bg-primaryGold/10' : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => setMembershipType('standard')}
                      >
                        <div>
                          <h4 className="font-medium">Standard Membership</h4>
                          <p className="text-sm text-gray-500">Full access plus exclusive workshops and resources</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">${selectedChapter.membershipFee.standard}/year</p>
                          {membershipType === 'standard' && <FiCheck className="text-primaryGold mt-1" />}
                        </div>
                      </div>
                    )}
                    
                    {selectedChapter.membershipFee.premium && (
                      <div
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${membershipType === 'premium' ? 'border-primaryGold bg-primaryGold/10' : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => setMembershipType('premium')}
                      >
                        <div>
                          <h4 className="font-medium">Premium Membership</h4>
                          <p className="text-sm text-gray-500">All benefits plus leadership opportunities and priority support</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-purple-600">${selectedChapter.membershipFee.premium}/year</p>
                          {membershipType === 'premium' && <FiCheck className="text-primaryGold mt-1" />}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Application Form */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={applicationData.fullName}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, fullName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryGold focus:border-primaryGold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={applicationData.email}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryGold focus:border-primaryGold"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={applicationData.phone}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryGold focus:border-primaryGold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                      <input
                        type="text"
                        value={applicationData.profession}
                        onChange={(e) => setApplicationData(prev => ({ ...prev, profession: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryGold focus:border-primaryGold"
                        placeholder="e.g., Teacher, Engineer, Student"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience in Education</label>
                    <textarea
                      value={applicationData.experience}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, experience: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryGold focus:border-primaryGold"
                      rows={3}
                      placeholder="Describe your experience or interest in education..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Why do you want to join this chapter?</label>
                    <textarea
                      value={applicationData.motivation}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, motivation: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primaryGold focus:border-primaryGold"
                      rows={3}
                      placeholder="Share your motivation and how you plan to contribute..."
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setShowJoinModal(false)}
                    className="flex-1 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleJoinChapter}
                    disabled={loading || !applicationData.fullName || !applicationData.email || !applicationData.phone}
                    className="flex-1 bg-primaryGold hover:bg-deepGold text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md"
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheck className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
                <p className="text-gray-600 mb-6">
                  Your membership application has been submitted successfully. The chapter leader will review your application and contact you within 3-5 business days.
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full bg-primaryGold hover:bg-deepGold text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Continue Exploring
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JoinLocalChapters;