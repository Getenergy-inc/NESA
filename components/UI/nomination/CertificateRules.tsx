"use client";
import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import { Scale, CheckCircle, XCircle, Award, Users, Crown } from "lucide-react";

const CertificateRules = () => {
  const ruleCategories = [
    {
      category: "🥇 Blue Garnet & Gold Certificate Awards",
      type: "Competitive",
      rule: "Must earn 1,000 AGC-backed nominations or public votes (combined) to unlock downloadable Certificate of Recognition",
      applies: true,
      icon: Award,
      color: "from-[#FFC247] to-[#E48900]",
      examples: [
        "Rising educators with measurable impact",
        "Youth leaders in education",
        "NGOs and tech disruptors",
        "Educational institutions (1-10 years impact)"
      ]
    },
    {
      category: "🏅 Platinum Certificate of Recognition",
      type: "Non-Competitive",
      rule: "Must earn 1,000 AGC-backed nominations or combined votes to unlock downloadable Certificate of Recognition",
      applies: true,
      icon: Users,
      color: "from-gray-400 to-gray-600",
      examples: [
        "State actors and government bodies",
        "Diaspora groups and associations",
        "Ministries and federal agencies",
        "Major CSR contributors"
      ]
    },
    {
      category: "🔵 Africa Icon Blue Garnet Awards",
      type: "Lifetime Achievement",
      rule: "This rule does NOT apply - All nominees automatically receive certificates",
      applies: false,
      icon: Crown,
      color: "from-blue-600 to-indigo-700",
      examples: [
        "Education legends (10+ years impact)",
        "Continental education champions",
        "Lifetime achievement honorees",
        "Legendary education advocates"
      ]
    }
  ];

  const thresholdBreakdown = [
    {
      source: "Public Nominations",
      description: "Community-driven nominations count toward the 1,000 threshold",
      weight: "1:1 ratio",
      icon: "👥"
    },
    {
      source: "AGC-Backed Votes",
      description: "Votes cast using AfriGold Coin count toward the threshold",
      weight: "1:1 ratio",
      icon: "🪙"
    },
    {
      source: "Combined Total",
      description: "Nominations + AGC votes must reach 1,000 minimum",
      weight: "Combined",
      icon: "📊"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-[#33270E] to-[#191307]">
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
              <Scale className="w-5 h-5 text-[#FFC247] mr-2" />
              <span className="text-[#FFC247] font-medium">CERTIFICATE ACCESS RULES</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
              ⚖️ Certificate Access Rule
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Understanding the requirements for downloading your Certificate of Recognition
            </p>
          </motion.div>

          {/* Main Rule Statement */}
          <motion.div variants={toTopV} className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 rounded-2xl p-8 border border-[#FFC247]/30 text-center">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-6">
                📋 General Certificate Rule
              </h3>
              <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 rounded-xl p-6 mb-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  If you're not a category winner, and you belong to either the <strong>competitive Gold</strong> or 
                  <strong> non-competitive Platinum</strong> awards, you must earn:
                </p>
              </div>
              <div className="bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] p-6 rounded-xl font-bold text-xl mb-6">
                ✅ 1,000 AGC-backed nominations or public votes (combined)
              </div>
              <p className="text-gray-300 text-lg">
                to unlock your downloadable Certificate of Recognition.
              </p>
            </div>
          </motion.div>

          {/* Category-Specific Rules */}
          <motion.div variants={toTopV} className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                Category-Specific Rules
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                How the certificate access rule applies to each award category
              </p>
            </div>

            <div className="space-y-6 max-w-6xl mx-auto">
              {ruleCategories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-2xl p-8 hover:border-[#FFC247]/40 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                    {/* Category Info */}
                    <div className="flex-1 mb-6 lg:mb-0">
                      <div className="flex items-center mb-4">
                        <div className={`bg-gradient-to-r ${category.color} p-3 rounded-full mr-4`}>
                          <category.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-2">
                            {category.category}
                          </h4>
                          <div className={`bg-gradient-to-r ${category.color} text-white px-3 py-1 rounded-full text-sm font-medium inline-block`}>
                            {category.type}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4 mb-6">
                        {category.applies ? (
                          <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                        )}
                        <div>
                          <p className={`text-lg leading-relaxed ${category.applies ? 'text-gray-300' : 'text-green-300'}`}>
                            {category.rule}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Examples */}
                    <div className="lg:w-1/3">
                      <h5 className="text-[#FFC247] font-semibold text-lg mb-4">Includes:</h5>
                      <div className="space-y-2">
                        {category.examples.map((example, exampleIndex) => (
                          <div key={exampleIndex} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#FFC247] to-[#E48900] rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-400 text-sm leading-relaxed">{example}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Threshold Breakdown */}
          <motion.div variants={toTopV} className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                📊 How the 1,000 Threshold Works
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Understanding what counts toward your certificate eligibility
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {thresholdBreakdown.map((item, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-xl p-6 hover:border-[#FFC247]/40 transition-all duration-300 text-center"
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h4 className="text-[#FFC247] font-semibold text-lg mb-3">
                    {item.source}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 text-[#FFC247] px-3 py-1 rounded-full text-xs font-medium">
                    {item.weight}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Important Clarifications */}
          <motion.div variants={opacityV} className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#33270E]/60 to-[#191307]/60 rounded-2xl p-8 border border-[#FFC247]/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                  💡 Important Clarifications
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#FFC247] font-semibold mb-2">Winners Always Get Certificates</h4>
                    <p className="text-gray-400 text-sm">Category winners automatically receive their certificates regardless of vote count.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#FFC247] font-semibold mb-2">Lifetime Awards Exception</h4>
                    <p className="text-gray-400 text-sm">Africa Icon Blue Garnet awardees receive certificates automatically - no vote threshold required.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#FFC247] font-semibold mb-2">Combined Counting</h4>
                    <p className="text-gray-400 text-sm">Nominations and AGC votes are counted together - you need 1,000 total, not 1,000 of each.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#FFC247] font-semibold mb-2">Real-Time Tracking</h4>
                    <p className="text-gray-400 text-sm">You can track your progress toward the 1,000 threshold in real-time through your dashboard.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificateRules;