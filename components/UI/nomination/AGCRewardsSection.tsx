"use client";
import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import Link from "next/link";
import { Coins, Heart, Calendar, Gift, Tv, Users, Download } from "lucide-react";

const AGCRewardsSection = () => {
  const rewardOpportunities = [
    {
      title: "Webinar Attendance",
      description: "Earn 5 AGC by attending educational webinars",
      reward: "5 AGC",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      action: "Join Webinar",
      link: "/webinars"
    },
    {
      title: "EduAid Expo Participation",
      description: "Earn 5 AGC by attending the EduAid Africa Expo",
      reward: "5 AGC",
      icon: Calendar,
      color: "from-green-500 to-green-600",
      action: "Register for Expo",
      link: "/eduaid-expo"
    },
    {
      title: "Nominee Support",
      description: "Support any nominee using AGC and receive a donor certificate",
      reward: "Donor Certificate",
      icon: Heart,
      color: "from-red-500 to-red-600",
      action: "Support Nominee",
      link: "/voting"
    },
    {
      title: "Community Engagement",
      description: "Participate in community discussions and educational forums",
      reward: "Bonus AGC",
      icon: Tv,
      color: "from-purple-500 to-purple-600",
      action: "Join Community",
      link: "/community"
    }
  ];

  const certificateTypes = [
    {
      type: "Donor Certificate",
      description: "Awarded to supporters who contribute AGC to nominees",
      eligibility: "Any AGC contribution to nominees",
      availability: "After project cycle ends",
      icon: "🎁"
    },
    {
      type: "Participation Certificate",
      description: "Recognition for active community engagement",
      eligibility: "Webinar attendance or expo participation",
      availability: "Immediate after event",
      icon: "📜"
    },
    {
      type: "Community Champion Certificate",
      description: "For outstanding community contribution and engagement",
      eligibility: "Consistent community participation",
      availability: "Quarterly recognition",
      icon: "🏆"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-[#191307] to-[#33270E]">
      <div className="container mx-auto px-4">
        <motion.div
          variants={parentV}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={toTopV} className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 rounded-full border border-[#FFC247]/30 mb-6">
              <Coins className="w-5 h-5 text-[#FFC247] mr-2" />
              <span className="text-[#FFC247] font-medium">REWARDS & CERTIFICATES</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
              💰 AGC Rewards & Donor Certificates
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Earn AfriGold Coin (AGC) through community participation and receive recognition certificates for your contributions
            </p>
          </motion.div>

          {/* Earning Opportunities */}
          <motion.div variants={toTopV} className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                ✅ How to Earn AGC
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Multiple ways to earn AfriGold Coin and contribute to the educational transformation movement
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {rewardOpportunities.map((opportunity, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className="group"
                >
                  <Link href={opportunity.link}>
                    <div className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-xl p-6 hover:border-[#FFC247]/40 transition-all duration-300 h-full cursor-pointer group-hover:transform group-hover:scale-105">
                      <div className="text-center">
                        <div className={`bg-gradient-to-r ${opportunity.color} p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <opportunity.icon className="w-8 h-8 text-white" />
                        </div>
                        
                        <div className="bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">
                          {opportunity.reward}
                        </div>
                        
                        <h4 className="text-lg font-bold text-[#FFC247] mb-3">
                          {opportunity.title}
                        </h4>
                        
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                          {opportunity.description}
                        </p>
                        
                        <button className={`bg-gradient-to-r ${opportunity.color} text-white font-semibold px-6 py-2 rounded-full text-sm hover:shadow-lg transition-all duration-300 w-full`}>
                          {opportunity.action}
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Benefits */}
          <motion.div variants={opacityV} className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 rounded-2xl p-8 border border-[#FFC247]/30">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                  💸 Support & Recognition Benefits
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 p-6 rounded-xl border border-[#FFC247]/20 mb-4">
                    <Heart className="w-12 h-12 text-[#FFC247] mx-auto mb-4" />
                    <h4 className="text-[#FFC247] font-semibold text-lg mb-2">Direct Impact</h4>
                    <p className="text-gray-400 text-sm">
                      Every AGC contribution directly funds scholarships and educational programs
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 p-6 rounded-xl border border-[#FFC247]/20 mb-4">
                    <Gift className="w-12 h-12 text-[#FFC247] mx-auto mb-4" />
                    <h4 className="text-[#FFC247] font-semibold text-lg mb-2">Donor Recognition</h4>
                    <p className="text-gray-400 text-sm">
                      Receive downloadable donor certificates for your contributions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Certificate Types */}
          <motion.div variants={toTopV} className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                📥 Available Certificates
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Recognition certificates available for different types of community participation
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {certificateTypes.map((certificate, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-xl p-6 hover:border-[#FFC247]/40 transition-all duration-300"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{certificate.icon}</div>
                    
                    <h4 className="text-lg font-bold text-[#FFC247] mb-3">
                      {certificate.type}
                    </h4>
                    
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {certificate.description}
                    </p>
                    
                    <div className="space-y-2 text-xs">
                      <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 p-2 rounded">
                        <span className="text-[#FFC247] font-medium">Eligibility: </span>
                        <span className="text-gray-400">{certificate.eligibility}</span>
                      </div>
                      <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 p-2 rounded">
                        <span className="text-[#FFC247] font-medium">Available: </span>
                        <span className="text-gray-400">{certificate.availability}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Important Notice */}
          <motion.div variants={opacityV} className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#33270E]/60 to-[#191307]/60 rounded-2xl p-6 border border-[#FFC247]/20 text-center">
              <div className="flex items-center justify-center mb-4">
                <Download className="w-8 h-8 text-[#FFC247] mr-3" />
                <h3 className="text-xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                  Certificate Download Information
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                All certificates (including donor certificates) are downloadable after the project cycle ends. 
                This ensures proper verification and maintains the integrity of the recognition system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/certificates">
                  <button className="bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] font-semibold px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300">
                    Check Certificate Status
                  </button>
                </Link>
                <Link href="/wallet">
                  <button className="border border-[#FFC247] text-[#FFC247] font-semibold px-6 py-3 rounded-full hover:bg-[#FFC247]/10 transition-all duration-300">
                    Top Up AGC Wallet
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

export default AGCRewardsSection;