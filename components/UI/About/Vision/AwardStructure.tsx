import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import { Crown, Award, Medal, Users, Building2, Globe } from "lucide-react";

const AwardStructure = () => {
  const awardTiers = [
    {
      id: 1,
      title: "Africa Icon Blue Garnet Award",
      subtitle: "Lifetime Recognition",
      description: "Non-competitive lifetime recognition for education trailblazers across Africa.",
      icon: Crown,
      color: "from-blue-600 to-indigo-700",
      features: [
        "Lifetime achievement recognition",
        "Continental education trailblazers",
        "Non-competitive selection",
        "Prestigious blue garnet trophy",
        "Legacy documentation",
        "Mentorship opportunities"
      ],
      eligibility: "Education leaders with 20+ years of transformative impact across Africa",
      badge: "🏆 LIFETIME"
    },
    {
      id: 2,
      title: "Blue Garnet & Gold Certificate Awards",
      subtitle: "Competitive Excellence",
      description: "Competitive public and judge-reviewed awards across 8 categories and 101 subcategories.",
      icon: Award,
      color: "from-[#FFC247] to-[#E48900]",
      features: [
        "8 main categories",
        "101 specialized subcategories",
        "Public voting component",
        "Expert judge evaluation",
        "CSR & STEM focus",
        "EdTech innovation recognition",
        "Policy advocacy awards",
        "Educational media excellence"
      ],
      eligibility: "Individuals, organizations, and institutions making measurable educational impact",
      badge: "🥇 COMPETITIVE"
    },
    {
      id: 3,
      title: "Platinum Certificate of Recognition Awards",
      subtitle: "Institutional Honors",
      description: "Non-competitive institutional honors for policy-makers, governments, global partners, and Education social Impact contributors achieving education for alls.",
      icon: Medal,
      color: "from-gray-400 to-gray-600",
      features: [
        "Government recognition",
        "Policy-maker honors",
        "Global partner appreciation",
        "Education social Impact contributors awards",
        "Institutional partnerships",
        "Diplomatic recognition"
      ],
      eligibility: "Governments, international organizations, and major CSR contributors",
      badge: "🏅 INSTITUTIONAL"
    }
  ];

  const categories = [
    { name: "STEM Education", icon: "🔬", count: "15 subcategories" },
    { name: "EdTech Innovation", icon: "💻", count: "12 subcategories" },
    { name: "Policy Advocacy", icon: "📋", count: "10 subcategories" },
    { name: "Educational Media", icon: "📺", count: "8 subcategories" },
    { name: "Community Impact", icon: "🏘️", count: "18 subcategories" },
    { name: "Teacher Excellence", icon: "👨‍🏫", count: "14 subcategories" },
    { name: "Student Achievement", icon: "🎓", count: "12 subcategories" },
    { name: "Infrastructure Development", icon: "🏗️", count: "12 subcategories" }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#33270E] to-[#191307]">
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
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
              🏅 Award Structure
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              A comprehensive three-tier recognition system celebrating excellence at every level
            </p>
          </motion.div>

          {/* Award Tiers */}
          <div className="space-y-8">
            {awardTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                variants={opacityV}
                className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-2xl overflow-hidden hover:border-[#FFC247]/40 transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                    {/* Award Info */}
                    <div className="flex-1 mb-6 lg:mb-0">
                      <div className="flex items-center mb-4">
                        <div className={`bg-gradient-to-r ${tier.color} p-3 rounded-full mr-4`}>
                          <tier.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                              {tier.title}
                            </h3>
                            <span className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 text-[#FFC247] px-3 py-1 rounded-full text-xs font-medium">
                              {tier.badge}
                            </span>
                          </div>
                          <p className="text-[#FFC247] font-medium text-lg">{tier.subtitle}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-lg leading-relaxed mb-6">
                        {tier.description}
                      </p>

                      <div className="bg-gradient-to-r from-[#33270E]/40 to-[#191307]/40 p-4 rounded-lg border border-[#FFC247]/10 mb-6">
                        <h4 className="text-[#FFC247] font-semibold mb-2">Eligibility:</h4>
                        <p className="text-gray-400 text-sm">{tier.eligibility}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="lg:w-1/3">
                      <h4 className="text-[#FFC247] font-semibold text-lg mb-4">Key Features:</h4>
                      <div className="space-y-3">
                        {tier.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-[#FFC247] to-[#E48900] rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-300 text-sm leading-relaxed">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Categories Overview */}
          <motion.div variants={toTopV} className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                📚 Award Categories
              </h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Comprehensive coverage across 8 <span className="text-blue-600">Blue Garnet</span> categories and 101 <span className="text-[#FFC247]">Gold Certificates</span> Sub Categories.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-xl p-6 hover:border-[#FFC247]/40 transition-all duration-300 text-center"
                >
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h4 className="text-[#FFC247] font-semibold text-lg mb-2">
                    {category.name}
                  </h4>
                  <p className="text-gray-400 text-sm">{category.count}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Selection Process */}
          <motion.div variants={opacityV} className="bg-gradient-to-r from-[#33270E]/60 to-[#191307]/60 rounded-2xl p-8 border border-[#FFC247]/20">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 p-3 rounded-full mr-4">
                  <Users className="w-8 h-8 text-[#FFC247]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                  Selection Process
                </h3>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 p-6 rounded-xl border border-[#FFC247]/20 mb-4">
                  <Users className="w-12 h-12 text-[#FFC247] mx-auto mb-4" />
                  <h4 className="text-[#FFC247] font-semibold text-lg mb-2">Public Nomination</h4>
                  <p className="text-gray-400 text-sm">
                    Community-driven nominations from across Africa and diaspora
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 p-6 rounded-xl border border-[#FFC247]/20 mb-4">
                  <Building2 className="w-12 h-12 text-[#FFC247] mx-auto mb-4" />
                  <h4 className="text-[#FFC247] font-semibold text-lg mb-2">Expert Review</h4>
                  <p className="text-gray-400 text-sm">
                    Rigorous evaluation by education experts and industry leaders
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 p-6 rounded-xl border border-[#FFC247]/20 mb-4">
                  <Globe className="w-12 h-12 text-[#FFC247] mx-auto mb-4" />
                  <h4 className="text-[#FFC247] font-semibold text-lg mb-2">Public Voting</h4>
                  <p className="text-gray-400 text-sm">
                    Community engagement through AfriGoldCoin (AGC) voting system
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AwardStructure;