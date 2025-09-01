"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, Mail, MessageCircle, Globe, Wallet, Award, Trophy, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut" as const,
      },
    },
  };

  const categories: FAQCategory[] = [
    {
      id: 'all',
      title: 'All Categories',
      icon: <Star className="w-5 h-5" />,
      description: 'Browse all frequently asked questions'
    },
    {
      id: 'about',
      title: 'About NESA-Africa',
      icon: <Globe className="w-5 h-5" />,
      description: 'Learn about our mission and organization'
    },
    {
      id: 'nominations',
      title: 'Nominations & Categories',
      icon: <Award className="w-5 h-5" />,
      description: 'How to nominate and award categories'
    },
    {
      id: 'voting',
      title: 'Voting & Decisions',
      icon: <Trophy className="w-5 h-5" />,
      description: 'Voting process and award decisions'
    },
    {
      id: 'support',
      title: 'Support & Donations',
      icon: <Wallet className="w-5 h-5" />,
      description: 'Donations, sponsorship, and support'
    },
    {
      id: 'events',
      title: 'Events & Chapters',
      icon: <MessageCircle className="w-5 h-5" />,
      description: 'Events, chapters, and participation'
    }
  ];

  const faqData: FAQItem[] = [
    // About NESA-Africa
    {
      id: 'q1',
      category: 'about',
      question: 'What is NESA-Africa 2025?',
      answer: 'NESA-Africa (New Education Standard Award Africa) 2025 is a pan-African education and social impact recognition program under the Santos Creations Educational Foundation (SCEF). It honors individuals, institutions, and organizations contributing to Africa\'s education ecosystem—through innovation, policy, infrastructure, community support, and sustainability.'
    },
    {
      id: 'q2',
      category: 'about',
      question: 'Who organizes NESA-Africa?',
      answer: 'NESA-Africa is an initiative of Santos Creations Educational Foundation (SCEF), founded in 1997 and formally registered in 2010, with a mission to transform education and empower change-makers across Africa and its global diaspora.'
    },
    
    // Nominations & Categories
    {
      id: 'q3',
      category: 'nominations',
      question: 'Who can I nominate for the awards?',
      answer: 'Anyone! You can nominate outstanding teachers, students, NGOs, policy makers, corporate sponsors, faith-based organizations, government leaders, and more—across over 160 subcategories in three award tiers: Africa Icon Blue Garnet Awards, Gold Certificate Competitive Awards, and Platinum Certificate of Recognition (Non-competitive).'
    },
    {
      id: 'q4',
      category: 'nominations',
      question: 'How do I nominate someone?',
      answer: 'Simply click the "Nominate Now" button, sign up or log in, choose a category, and submit a detailed profile of the nominee with supporting evidence or justification.'
    },
    {
      id: 'q5',
      category: 'nominations',
      question: 'Is there a cost to nominate?',
      answer: 'Every user receives free bonus AfriGold Coins (AGC) upon sign-up, which can be used for nominations. Additional AGC can be purchased at affordable rates.'
    },
    {
      id: 'q6',
      category: 'nominations',
      question: 'Can I nominate myself?',
      answer: 'Yes. Self-nominations are allowed in all categories except honorary awards (e.g. Africa Icon Awards).'
    },

    // Voting & Award Decisions
    {
      id: 'q7',
      category: 'voting',
      question: 'Can the public vote?',
      answer: 'Yes, for competitive categories only. Voting is powered by our AGC wallet system to ensure transparency. Some categories are judged only by appointed experts.'
    },
    {
      id: 'q8',
      category: 'voting',
      question: 'How do I vote?',
      answer: 'You must sign up, receive or buy AGC, and use it to vote for your favorite nominees during the voting window.'
    },
    {
      id: 'q9',
      category: 'voting',
      question: 'When does voting start and end?',
      answer: 'Voting opens on October 5, 2025, and ends on December 10, 2025.'
    },
    {
      id: 'q10',
      category: 'voting',
      question: 'How are winners selected?',
      answer: 'Winners are selected based on a combination of public votes, judges\' scores, and impact metrics, depending on the category.'
    },

    // Support & Donations
    {
      id: 'q11',
      category: 'support',
      question: 'How can I support NESA-Africa?',
      answer: 'You can: Donate via your AGC Wallet or bank, Sponsor an award or nominee, Support EduAid Africa or Rebuild My School programs, Purchase certificates or merchandise.'
    },
    {
      id: 'q12',
      category: 'support',
      question: 'Where does my donation go?',
      answer: 'Donations support scholarships, chapter development, award logistics, EduAid-Africa activities, and NESA TV media campaigns.'
    },
    {
      id: 'q13',
      category: 'support',
      question: 'Can organizations sponsor entire categories?',
      answer: 'Yes. Strategic sponsorship opportunities are available for full award categories, panels, or event segments.'
    },

    // Events & Chapters
    {
      id: 'q14',
      category: 'events',
      question: 'Where will the final awards gala be held?',
      answer: 'The main event holds at Muson Centre, Lagos, Nigeria on December 18, 2025.'
    },
    {
      id: 'q15',
      category: 'events',
      question: 'Is there a fee to attend?',
      answer: 'Yes. Onsite ticket starts at $50 or its AGC equivalent. Online viewing is free for users with AGC bonus, or just $1.'
    },
    {
      id: 'q16',
      category: 'events',
      question: 'Can I attend the event virtually?',
      answer: 'Absolutely. The entire event will be livestreamed globally via NESA TV and partner platforms.'
    },
    {
      id: 'q17',
      category: 'events',
      question: 'How do I join a NESA local chapter?',
      answer: 'After signing up, your profile is auto-linked to your country\'s online local chapter. You can choose to upgrade to standard or ambassador membership.'
    },
    {
      id: 'q18',
      category: 'events',
      question: 'What do local chapters do?',
      answer: 'They drive awareness, nominations, webinars, sponsor engagement, and host micro-events in alignment with NESA-Africa\'s mission.'
    },
    {
      id: 'q19',
      category: 'events',
      question: 'Are local chapters physical or virtual?',
      answer: 'Both. NESA supports online, hybrid, and fully physical chapters across Africa and diaspora communities.'
    },

    // Additional Support Questions
    {
      id: 'q20',
      category: 'support',
      question: 'How can I volunteer?',
      answer: 'You can apply as a volunteer for research, media, event planning, fundraising, or local chapter coordination.'
    },
    {
      id: 'q21',
      category: 'support',
      question: 'Can I partner with NESA-Africa as a business or media outlet?',
      answer: 'Yes. We offer co-branded sponsorships, media partnerships, and promotional opportunities for brands aligned with education and social impact.'
    },
    {
      id: 'q22',
      category: 'support',
      question: 'How do I access media content or replay webinars?',
      answer: 'All past events, NESA TV streams, and EduAid-Africa panels are available via your dashboard once you register.'
    },
    {
      id: 'q23',
      category: 'support',
      question: 'Will nominees receive certificates?',
      answer: 'Yes. All approved nominees receive a Letter of Recognition by email, and can download a certificate for a $10 fee (paid in AGC).'
    },
    {
      id: 'q24',
      category: 'support',
      question: 'Can I earn or withdraw AGC?',
      answer: 'You can earn withdrawable AGC by referring users or getting sponsors. Other AGC (e.g., bonus) are for platform use only (e.g. voting, nomination).'
    },
    {
      id: 'q25',
      category: 'support',
      question: 'What is the AGC Wallet?',
      answer: 'The AfriGold Coin Wallet is your personal digital wallet to receive bonuses, vote, nominate, sponsor, and track your earnings on NESA-Africa.'
    }
  ];

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-whiteGold via-[#fdf3dc] to-xlGold">
      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-darkBrown via-[#2a1f0a] to-secondaryDark text-white py-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primaryGold rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-deepGold rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-lightGold rounded-full blur-3xl opacity-20"></div>
        </div>

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #f3a928 2px, transparent 2px), radial-gradient(circle at 75% 75%, #FFB92E 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-5xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-primaryGold to-deepGold rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <HelpCircle className="text-darkBrown text-2xl" />
              </motion.div>
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-lightGold to-midGold rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: -360 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Star className="text-darkBrown text-xl" />
              </motion.div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-deepGold font-raleway leading-tight"
            >
              Frequently Asked
              <span className="block text-primaryGold">Questions</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-lightGold mb-12 leading-relaxed font-poppins max-w-3xl mx-auto"
            >
              Find answers to common questions about NESA-Africa 2025 awards, nominations, and more
            </motion.p>

            {/* Enhanced Search Bar */}
            <motion.div
              variants={itemVariants}
              className="relative max-w-3xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-darkBrown/60 w-6 h-6" />
                <motion.input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 rounded-2xl text-darkBrown placeholder-darkBrown/60 focus:outline-none focus:ring-4 focus:ring-primaryGold/30 bg-white/95 backdrop-blur-sm shadow-2xl text-lg font-medium border border-primaryGold/20"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primaryGold/20 to-deepGold/20 -z-10"
                  animate={{
                    boxShadow: searchTerm ? "0 0 30px rgba(243, 169, 40, 0.3)" : "0 0 0px rgba(243, 169, 40, 0)"
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primaryGold rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-deepGold rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Category Sidebar */}
            <motion.div
              className="lg:col-span-1"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                variants={cardVariants}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-primaryGold/20 p-6 sticky top-6 overflow-hidden"
              >
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primaryGold/10 to-transparent rounded-bl-full"></div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-primaryGold to-deepGold rounded-full flex items-center justify-center">
                    <Star className="text-darkBrown text-lg" />
                  </div>
                  <h3 className="text-xl font-bold text-darkBrown">Categories</h3>
                </div>

                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <motion.button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      variants={itemVariants}
                      whileHover="hover"
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 relative overflow-hidden ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-primaryGold/20 to-deepGold/20 text-darkBrown border-2 border-primaryGold/40 shadow-lg'
                          : 'hover:bg-lightGold/30 text-darkBrown/80 border-2 border-transparent hover:border-primaryGold/20 hover:shadow-md'
                      }`}
                    >
                      {selectedCategory === category.id && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primaryGold/10 to-deepGold/10"
                          layoutId="activeCategory"
                          transition={{ duration: 0.3 }}
                        />
                      )}

                      <div className="flex items-center space-x-3 relative z-10">
                        <motion.div
                          className={`${selectedCategory === category.id ? 'text-primaryGold' : 'text-darkBrown/60'} transition-colors duration-300`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {category.icon}
                        </motion.div>
                        <div>
                          <div className="font-semibold text-sm">{category.title}</div>
                          <div className="text-xs text-darkBrown/60 mt-1 leading-relaxed">{category.description}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* FAQ Content */}
            <motion.div
              className="lg:col-span-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                {filteredFAQs.length === 0 ? (
                  <motion.div
                    variants={itemVariants}
                    className="text-center py-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-primaryGold/20"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <HelpCircle className="w-20 h-20 text-primaryGold/60 mx-auto mb-6" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-darkBrown mb-3">No results found</h3>
                    <p className="text-darkBrown/70 text-lg">Try adjusting your search or browse different categories.</p>
                  </motion.div>
                ) : (
                  filteredFAQs.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      whileHover="hover"
                      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-primaryGold/20 overflow-hidden group"
                      style={{
                        background: openItems.has(item.id)
                          ? 'linear-gradient(135deg, rgba(243, 169, 40, 0.05) 0%, rgba(255, 185, 46, 0.05) 100%)'
                          : undefined
                      }}
                    >
                      <motion.button
                        onClick={() => toggleItem(item.id)}
                        className="w-full px-8 py-6 text-left transition-all duration-300 relative overflow-hidden"
                        whileHover={{ backgroundColor: "rgba(243, 169, 40, 0.05)" }}
                        whileTap={{ scale: 0.995 }}
                      >
                        {/* Hover effect background */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primaryGold/5 to-deepGold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />

                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-start space-x-4 flex-1">
                            <motion.div
                              className="w-8 h-8 bg-gradient-to-r from-primaryGold to-deepGold rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                              whileHover={{ scale: 1.1, rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <span className="text-darkBrown font-bold text-sm">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                            </motion.div>
                            <h3 className="text-xl font-semibold text-darkBrown pr-4 leading-relaxed group-hover:text-primaryGold transition-colors duration-300">
                              {item.question}
                            </h3>
                          </div>
                          <motion.div
                            className="flex-shrink-0"
                            animate={{ rotate: openItems.has(item.id) ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className={`w-6 h-6 transition-colors duration-300 ${
                              openItems.has(item.id) ? 'text-primaryGold' : 'text-darkBrown/40 group-hover:text-primaryGold'
                            }`} />
                          </motion.div>
                        </div>
                      </motion.button>

                      <AnimatePresence>
                        {openItems.has(item.id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-8 pb-8">
                              <div className="border-t border-primaryGold/20 pt-6">
                                <motion.p
                                  initial={{ y: 10, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  transition={{ delay: 0.1 }}
                                  className="text-darkBrown/80 leading-relaxed text-lg"
                                >
                                  {item.answer}
                                </motion.p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-br from-darkBrown via-[#2a1f0a] to-secondaryDark text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primaryGold rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-deepGold rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            className="max-w-6xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-deepGold mb-6 font-raleway">
                Still have questions?
              </h2>
              <p className="text-xl text-lightGold leading-relaxed font-poppins max-w-3xl mx-auto">
                Can't find what you're looking for? Our dedicated support team is here to help you succeed.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: <Mail className="w-10 h-10" />,
                  title: "Email Support",
                  description: "Get comprehensive help via email",
                  action: "support@nesa.africa",
                  href: "mailto:support@nesa.africa",
                  color: "from-primaryGold to-deepGold"
                },
                {
                  icon: <MessageCircle className="w-10 h-10" />,
                  title: "Live Chat",
                  description: "Chat with our support team",
                  action: "Start Chat",
                  href: "#",
                  color: "from-lightGold to-midGold"
                },
                {
                  icon: <Globe className="w-10 h-10" />,
                  title: "Join a Chapter",
                  description: "Connect with your local community",
                  action: "Find Your Chapter",
                  href: "/chapters",
                  color: "from-midGold to-primaryGold"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover="hover"
                  className="group"
                >
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-primaryGold/20 hover:border-primaryGold/40 transition-all duration-300 relative overflow-hidden"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(243, 169, 40, 0.2)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Background gradient on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-6`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="text-darkBrown">
                        {item.icon}
                      </div>
                    </motion.div>

                    <h3 className="font-bold text-xl text-deepGold mb-3 group-hover:text-primaryGold transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-lightGold/80 mb-6 leading-relaxed">
                      {item.description}
                    </p>

                    <motion.a
                      href={item.href}
                      className="inline-block bg-gradient-to-r from-primaryGold to-deepGold text-darkBrown font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.action}
                    </motion.a>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Additional CTA */}
            <motion.div
              variants={itemVariants}
              className="mt-16 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-primaryGold/20"
            >
              <h3 className="text-2xl font-bold text-primaryGold mb-4">
                Ready to get started?
              </h3>
              <p className="text-lightGold mb-6 text-lg">
                Join thousands of educators and changemakers in celebrating African excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/signup/comprehensive"
                  className="bg-gradient-to-r from-primaryGold to-deepGold text-darkBrown font-bold px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up Now
                </motion.a>
                <motion.a
                  href="/nominate"
                  className="border-2 border-primaryGold text-primaryGold font-bold px-8 py-4 rounded-xl hover:bg-primaryGold hover:text-darkBrown transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Nominate Someone
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
