"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeftCircle, FiCheckCircle, FiX, FiSearch, FiFilter } from "react-icons/fi";
import { Vote, Coins, Trophy, Users, Star, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthContext } from '@/lib/context/AuthContext';

interface Nominee {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  image: string;
  description: string;
  votes: number;
  achievements: string[];
  country: string;
}

interface VoteTransaction {
  id: string;
  nomineeId: string;
  nomineeName: string;
  category: string;
  amount: number;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
}

const VoteWithAfriGold: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [selectedNominee, setSelectedNominee] = useState<Nominee | null>(null);
  const [voteAmount, setVoteAmount] = useState<number>(1);
  const [agcBalance, setAgcBalance] = useState<number>(1250);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [recentVotes, setRecentVotes] = useState<VoteTransaction[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - replace with actual API calls
  const categories = [
    'All Categories',
    'Best EduTech Innovation',
    'Outstanding Teacher',
    'Educational Leadership',
    'Student Excellence',
    'Community Impact',
    'Research & Development'
  ];

  const nominees: Nominee[] = [
    {
      id: '1',
      name: 'Dr. Amina Hassan',
      category: 'Best EduTech Innovation',
      subCategory: 'AI in Education',
      image: '/images/nominees/nominee1.jpg',
      description: 'Revolutionary AI-powered learning platform transforming education across West Africa',
      votes: 2847,
      achievements: ['UNESCO Education Prize 2024', '50+ Schools Impacted', '10,000+ Students Reached'],
      country: 'Nigeria'
    },
    {
      id: '2',
      name: 'Prof. Kwame Asante',
      category: 'Educational Leadership',
      subCategory: 'University Administration',
      image: '/images/nominees/nominee2.jpg',
      description: 'Visionary leader who transformed rural education infrastructure in Ghana',
      votes: 1923,
      achievements: ['Education Minister Award', '25 Years Experience', 'Rural Education Pioneer'],
      country: 'Ghana'
    },
    {
      id: '3',
      name: 'Sarah Okonkwo',
      category: 'Outstanding Teacher',
      subCategory: 'Primary Education',
      image: '/images/nominees/nominee3.jpg',
      description: 'Dedicated teacher who developed innovative teaching methods for underserved communities',
      votes: 3156,
      achievements: ['Teacher of the Year 2023', 'Community Champion', 'Innovation in Teaching'],
      country: 'Kenya'
    }
  ];

  const filteredNominees = nominees.filter(nominee => {
    const matchesCategory = selectedCategory === 'all' || selectedCategory === 'All Categories' || nominee.category === selectedCategory;
    const matchesSearch = nominee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         nominee.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVote = async () => {
    if (!selectedNominee || !isAuthenticated) return;
    
    if (agcBalance < voteAmount) {
      alert('Insufficient AGC balance. Please top up your wallet.');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update balance
      setAgcBalance(prev => prev - voteAmount);
      
      // Add to recent votes
      const newVote: VoteTransaction = {
        id: Date.now().toString(),
        nomineeId: selectedNominee.id,
        nomineeName: selectedNominee.name,
        category: selectedNominee.category,
        amount: voteAmount,
        timestamp: new Date(),
        status: 'confirmed'
      };
      setRecentVotes(prev => [newVote, ...prev.slice(0, 4)]);
      
      setShowVoteModal(false);
      setShowSuccess(true);
      setSelectedNominee(null);
      setVoteAmount(1);
    } catch (error) {
      console.error('Voting failed:', error);
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
          <p className="text-gray-600 mb-6">Please log in to vote with AfriGold</p>
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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Vote with AfriGold</h1>
              <p className="text-gray-600">Support your favorite nominees using AGC tokens</p>
            </div>
            
            {/* AGC Balance Card */}
            <div className="mt-4 md:mt-0 bg-gradient-to-r from-primaryGold to-deepGold rounded-xl p-4 text-white min-w-[200px]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Your AGC Balance</p>
                  <div className="flex items-center mt-1">
                    <Image src="/svgs/africoin.svg" alt="AGC" width={24} height={24} className="mr-2" />
                    <span className="text-2xl font-bold">{agcBalance.toLocaleString()}</span>
                  </div>
                </div>
                <Coins className="w-8 h-8 opacity-80" />
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
              <h3 className="font-semibold text-gray-800 mb-4">Search Nominees</h3>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories Filter */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category.toLowerCase())}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category.toLowerCase() || (selectedCategory === 'all' && category === 'All Categories')
                        ? 'bg-primaryGold text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Votes */}
            {recentVotes.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Recent Votes</h3>
                <div className="space-y-3">
                  {recentVotes.map((vote) => (
                    <div key={vote.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm text-gray-800">{vote.nomineeName}</p>
                        <p className="text-xs text-gray-500">{vote.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-primaryGold">
                          <Image src="/svgs/africoin.svg" alt="AGC" width={16} height={16} className="mr-1" />
                          <span className="font-medium">{vote.amount}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          vote.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          vote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {vote.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Nominees</p>
                    <p className="text-2xl font-bold text-gray-800">{nominees.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-primaryGold" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Votes Cast</p>
                    <p className="text-2xl font-bold text-gray-800">{nominees.reduce((sum, n) => sum + n.votes, 0).toLocaleString()}</p>
                  </div>
                  <Vote className="w-8 h-8 text-primaryGold" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Categories</p>
                    <p className="text-2xl font-bold text-gray-800">{categories.length - 1}</p>
                  </div>
                  <Trophy className="w-8 h-8 text-primaryGold" />
                </div>
              </div>
            </div>

            {/* Nominees Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNominees.map((nominee) => (
                <motion.div
                  key={nominee.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={nominee.image}
                      alt={nominee.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/Avatar.png';
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm font-medium text-gray-800">{nominee.country}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{nominee.name}</h3>
                        <p className="text-sm text-primaryGold font-medium">{nominee.category}</p>
                        <p className="text-xs text-gray-500">{nominee.subCategory}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-primaryGold mb-1">
                          <Vote className="w-4 h-4 mr-1" />
                          <span className="font-bold">{nominee.votes.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-500">votes</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{nominee.description}</p>
                    
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-700 mb-2">Key Achievements:</p>
                      <div className="flex flex-wrap gap-1">
                        {nominee.achievements.slice(0, 2).map((achievement, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            {achievement}
                          </span>
                        ))}
                        {nominee.achievements.length > 2 && (
                          <span className="text-xs text-gray-500">+{nominee.achievements.length - 2} more</span>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setSelectedNominee(nominee);
                        setShowVoteModal(true);
                      }}
                      className="w-full bg-primaryGold hover:bg-deepGold text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Vote className="w-4 h-4" />
                      Vote with AGC
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredNominees.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No nominees found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
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

      {/* Vote Modal */}
      <AnimatePresence>
        {showVoteModal && selectedNominee && (
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
              className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Cast Your Vote</h2>
                  <button 
                    onClick={() => setShowVoteModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <div className="text-center mb-6">
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <Image
                      src={selectedNominee.image}
                      alt={selectedNominee.name}
                      fill
                      className="rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/Avatar.png';
                      }}
                    />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800">{selectedNominee.name}</h3>
                  <p className="text-primaryGold font-medium">{selectedNominee.category}</p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vote Amount (AGC)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Image src="/svgs/africoin.svg" alt="AGC" width={20} height={20} />
                    </div>
                    <input
                      type="number"
                      value={voteAmount}
                      onChange={(e) => setVoteAmount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primaryGold focus:border-primaryGold"
                      min="1"
                      max={agcBalance}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>Min: 1 AGC</span>
                    <span>Available: {agcBalance.toLocaleString()} AGC</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Cost:</span>
                    <div className="flex items-center text-primaryGold font-bold">
                      <Image src="/svgs/africoin.svg" alt="AGC" width={20} height={20} className="mr-1" />
                      {voteAmount.toLocaleString()} AGC
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowVoteModal(false)}
                    className="flex-1 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleVote}
                    disabled={loading || voteAmount > agcBalance}
                    className="flex-1 bg-primaryGold hover:bg-deepGold text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Voting...
                      </div>
                    ) : (
                      'Confirm Vote'
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
                  <FiCheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Vote Successful!</h2>
                <p className="text-gray-600 mb-6">
                  Your vote has been recorded on the blockchain and will be reflected shortly.
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full bg-primaryGold hover:bg-deepGold text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Continue Voting
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoteWithAfriGold;