"use client";
import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import Link from "next/link";
import { 
  UserPlus, 
  Vote, 
  Download, 
  Wallet, 
  DollarSign, 
  Users, 
  Calendar, 
  HelpCircle,
  ArrowRight 
} from "lucide-react";

const ActionButtons = () => {
  const journeyActions = [
    {
      title: "📝 Nominate a Changemaker",
      description: "Recognize outstanding educators and institutions making a difference",
      icon: UserPlus,
      link: "/get-involved/nomination",
      buttonText: "Start Nomination",
      color: "from-[#FFC247] to-[#E48900]",
      featured: true
    },
    {
      title: "✅ Vote for a Candidate",
      description: "Support nominees using AGC and fund scholarships directly",
      icon: Vote,
      link: "/voting",
      buttonText: "Vote Now With AGC",
      color: "from-green-500 to-green-600",
      featured: true
    },
    {
      title: "📥 Download My Certificate",
      description: "Access your certificates if you meet eligibility requirements",
      icon: Download,
      link: "/certificates",
      buttonText: "Claim Certificate",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "💳 Fund My AGC Wallet",
      description: "Top up your AfriGold Coin wallet to participate in voting",
      icon: Wallet,
      link: "/wallet",
      buttonText: "Top Up Wallet",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "💼 Become a Sponsor or CSR Partner",
      description: "Partner with NESA-Africa to amplify educational impact",
      icon: DollarSign,
      link: "/sponsor",
      buttonText: "Sponsor NESA-Africa",
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "🌍 Join or Support My Country Chapter",
      description: "Connect with local NESA chapters in your region",
      icon: Users,
      link: "/local-chapters",
      buttonText: "Join a Chapter",
      color: "from-teal-500 to-teal-600"
    },
    {
      title: "🏛️ Watch the Awards Gala / EduAid Expo",
      description: "Attend the continental education celebration events",
      icon: Calendar,
      link: "/events",
      buttonText: "Get Tickets",
      color: "from-red-500 to-red-600"
    },
    {
      title: "🤝 Volunteer or Join Research Corps",
      description: "Contribute your skills to the education transformation movement",
      icon: Users,
      link: "/volunteer",
      buttonText: "Apply Now",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const quickStats = [
    { number: "54+", label: "Countries Covered", icon: "🌍" },
    { number: "1000+", label: "Expected Nominees", icon: "👥" },
    { number: "101", label: "Award Subcategories", icon: "🏆" },
    { number: "3", label: "Award Tiers", icon: "📋" }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-[#191307] to-[#33270E]" id="quick-actions">
      <div className="container mx-auto px-4">
        <motion.div
          variants={parentV}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={toTopV} className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 rounded-full border border-[#FFC247]/30 mb-6">
              <ArrowRight className="w-5 h-5 text-[#FFC247] mr-2" />
              <span className="text-[#FFC247] font-medium">START YOUR JOURNEY</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
              💼 Start Your Journey
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Choose how you'd like to participate in Africa's premier education transformation movement
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={toTopV} className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className="bg-gradient-to-br from-[#191307]/60 to-[#33270E]/40 backdrop-blur-sm border border-[#FFC247]/20 rounded-xl p-6 text-center hover:border-[#FFC247]/40 transition-all duration-300"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Grid */}
          <motion.div variants={toTopV} className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                Choose Your Path
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Multiple ways to contribute to Africa's educational transformation
              </p>
            </div>

            {/* Featured Actions */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
              {journeyActions.filter(action => action.featured).map((action, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className="group"
                >
                  <Link href={action.link}>
                    <div className="bg-gradient-to-br from-[#FFC247]/5 to-[#E48900]/5 backdrop-blur-sm border border-[#FFC247]/40 rounded-2xl p-8 hover:border-[#FFC247]/60 transition-all duration-300 cursor-pointer group-hover:transform group-hover:scale-105">
                      <div className="flex items-center space-x-6">
                        <div className={`bg-gradient-to-r ${action.color} p-4 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <action.icon className="w-10 h-10 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block">
                            FEATURED
                          </div>
                          <h4 className="text-xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-3">
                            {action.title}
                          </h4>
                          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                            {action.description}
                          </p>
                          <div className="flex items-center text-[#FFC247] font-medium group-hover:text-[#E48900] transition-colors duration-300">
                            <span className="mr-2">{action.buttonText}</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Regular Actions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {journeyActions.filter(action => !action.featured).map((action, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className="group"
                >
                  <Link href={action.link}>
                    <div className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-xl p-6 hover:border-[#FFC247]/40 transition-all duration-300 h-full cursor-pointer group-hover:transform group-hover:scale-105">
                      <div className="text-center">
                        <div className={`bg-gradient-to-r ${action.color} p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <action.icon className="w-8 h-8 text-white" />
                        </div>
                        
                        <h4 className="text-lg font-bold text-[#FFC247] mb-3">
                          {action.title}
                        </h4>
                        
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                          {action.description}
                        </p>
                        
                        <button className={`bg-gradient-to-r ${action.color} text-white font-semibold px-6 py-2 rounded-full text-sm hover:shadow-lg transition-all duration-300 w-full flex items-center justify-center`}>
                          <span className="mr-2">{action.buttonText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={opacityV} className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 rounded-2xl p-8 border border-[#FFC247]/30 text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 p-4 rounded-full mr-4">
                  <Users className="w-10 h-10 text-[#FFC247]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                  Join the Movement
                </h3>
              </div>
              
              <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
                Be part of the continental movement that's recognizing excellence, driving innovation, 
                and creating sustainable change in African education. Every action you take creates 
                ripple effects of positive impact.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-involved/nomination">
                  <button className="bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] font-bold text-lg px-8 py-4 rounded-full hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Start Nominating Today
                  </button>
                </Link>
                <Link href="/faq">
                  <button className="border-2 border-[#FFC247] text-[#FFC247] font-bold text-lg px-8 py-4 rounded-full hover:bg-[#FFC247]/10 transition-all duration-300 flex items-center">
                    <HelpCircle className="w-5 h-5 mr-2" />
                    Have Questions?
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ActionButtons;