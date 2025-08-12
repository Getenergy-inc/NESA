import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import { Calendar, TrendingUp, Target, Globe, Award, Users } from "lucide-react";

const RoadmapTimeline = () => {
  const timelineData = [
    {
      year: "2025",
      title: "Foundation & Launch",
      subtitle: "First NESA-Africa awards, AGC wallet launch, and pilot scholarships",
      color: "from-[#FFC247] to-[#E48900]",
      icon: Award,
      milestones: [
        "Inaugural NESA-Africa Awards Ceremony (December 13)",
        "AfriGoldCoin (AGC) wallet platform launch",
        "Pilot scholarship program initiation",
        "Nigeria Local Chapter establishment",
        "First 100+ changemakers recognized",
        "Initial CSR partnerships secured"
      ],
      metrics: {
        awardees: "100+",
        scholarships: "500",
        chapters: "1",
        countries: "1"
      }
    },
    {
      year: "2026",
      title: "Regional Expansion",
      subtitle: "East & Southern Africa integration; diaspora partner activation",
      color: "from-blue-400 to-blue-600",
      icon: Globe,
      milestones: [
        "East Africa regional chapter launch",
        "Southern Africa integration",
        "Diaspora partner network activation",
        "NESA TV broadcasting expansion",
        "Multi-country scholarship programs",
        "Regional policy advocacy initiatives"
      ],
      metrics: {
        awardees: "300+",
        scholarships: "2,000",
        chapters: "15",
        countries: "10"
      }
    },
    {
      year: "2027",
      title: "Continental Scaling",
      subtitle: "Full Africa-wide hosting rotation begins; CSR fund expands",
      color: "from-green-400 to-green-600",
      icon: TrendingUp,
      milestones: [
        "Africa-wide hosting rotation system",
        "Major CSR fund expansion ($10M target)",
        "West & Central Africa integration",
        "Advanced scholarship distribution",
        "Continental policy coalitions",
        "Enhanced digital engagement platforms"
      ],
      metrics: {
        awardees: "500+",
        scholarships: "10,000",
        chapters: "35",
        countries: "25"
      }
    },
    {
      year: "2028",
      title: "Technology Integration",
      subtitle: "AI-powered impact evaluation and award certification system",
      color: "from-purple-400 to-purple-600",
      icon: Target,
      milestones: [
        "AI-powered impact tracking system",
        "Automated award certification platform",
        "Advanced analytics dashboard",
        "Blockchain-based transparency",
        "Smart contract scholarship distribution",
        "Predictive impact modeling"
      ],
      metrics: {
        awardees: "700+",
        scholarships: "25,000",
        chapters: "45",
        countries: "40"
      }
    },
    {
      year: "2029",
      title: "Policy Leadership",
      subtitle: "NESA-led policy coalitions on funding, STEM, and early childhood",
      color: "from-orange-400 to-red-600",
      icon: Users,
      milestones: [
        "Continental education policy coalitions",
        "STEM education advocacy programs",
        "Early childhood development initiatives",
        "Government partnership frameworks",
        "International funding mechanisms",
        "Research and development hubs"
      ],
      metrics: {
        awardees: "850+",
        scholarships: "50,000",
        chapters: "50",
        countries: "50"
      }
    },
    {
      year: "2035",
      title: "Continental Leadership",
      subtitle: "1 million learners reached; 100,000 scholarships issued; 1,000 awardees recognized continentally",
      color: "from-pink-400 to-rose-600",
      icon: Calendar,
      milestones: [
        "1 million learners reached milestone",
        "100,000 scholarships distributed",
        "1,000+ continental awardees",
        "Premier education sustainability hub",
        "Global recognition and partnerships",
        "Legacy foundation establishment"
      ],
      metrics: {
        awardees: "1,000+",
        scholarships: "100,000",
        chapters: "54+",
        countries: "54+"
      }
    }
  ];

  const keyAchievements = [
    { icon: "🎓", label: "Learners Reached", target: "1 Million+" },
    { icon: "💰", label: "Scholarships Issued", target: "100,000" },
    { icon: "🏆", label: "Awardees Recognized", target: "1,000+" },
    { icon: "🌍", label: "Countries Covered", target: "54+" },
    { icon: "🏢", label: "Local Chapters", target: "54+" },
    { icon: "🤝", label: "Partner Organizations", target: "500+" }
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
              🗺️ Roadmap to 2035
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our strategic journey towards becoming Africa's premier education transformation platform
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#FFC247] to-[#E48900] hidden lg:block"></div>

            <div className="space-y-12">
              {timelineData.map((phase, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className={`flex flex-col lg:flex-row items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                    <div className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-2xl p-8 hover:border-[#FFC247]/40 transition-all duration-300">
                      <div className="flex items-center mb-6">
                        <div className={`bg-gradient-to-r ${phase.color} p-3 rounded-full mr-4`}>
                          <phase.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <div className={`bg-gradient-to-r ${phase.color} text-white font-bold text-xl px-4 py-2 rounded-full inline-block mb-2`}>
                            {phase.year}
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                            {phase.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-gray-300 text-lg leading-relaxed mb-6">
                        {phase.subtitle}
                      </p>

                      {/* Milestones */}
                      <div className="mb-6">
                        <h4 className="text-[#FFC247] font-semibold text-lg mb-4">Key Milestones:</h4>
                        <div className="space-y-2">
                          {phase.milestones.map((milestone, milestoneIndex) => (
                            <div key={milestoneIndex} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-gradient-to-r from-[#FFC247] to-[#E48900] rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-gray-300 text-sm leading-relaxed">{milestone}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                            {phase.metrics.awardees}
                          </div>
                          <div className="text-xs text-gray-400">Awardees</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                            {phase.metrics.scholarships}
                          </div>
                          <div className="text-xs text-gray-400">Scholarships</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                            {phase.metrics.chapters}
                          </div>
                          <div className="text-xs text-gray-400">Chapters</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                            {phase.metrics.countries}
                          </div>
                          <div className="text-xs text-gray-400">Countries</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="hidden lg:flex w-2/12 justify-center">
                    <div className={`bg-gradient-to-r ${phase.color} w-16 h-16 rounded-full flex items-center justify-center border-4 border-[#191307] shadow-lg`}>
                      <phase.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="w-full lg:w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 2035 Vision Summary */}
          <motion.div variants={toTopV} className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 rounded-2xl p-8 border border-[#FFC247]/30">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                🎯 2035 Vision Achieved
              </h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                By 2035, NESA-Africa will be the continent's leading education transformation platform, 
                having created lasting impact across all 54 African countries and beyond.
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              {keyAchievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-r from-[#191307]/60 to-[#33270E]/40 p-6 rounded-xl border border-[#FFC247]/20 mb-4">
                    <div className="text-3xl mb-3">{achievement.icon}</div>
                    <div className="text-lg font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-1">
                      {achievement.target}
                    </div>
                    <div className="text-xs text-gray-400">{achievement.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Progress Tracking */}
          <motion.div variants={opacityV} className="bg-gradient-to-r from-[#33270E]/60 to-[#191307]/60 rounded-2xl p-8 border border-[#FFC247]/20">
            <div className="text-center mb-6">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                📊 Progress Tracking
              </h3>
              <p className="text-gray-300">
                Every milestone is measured, tracked, and celebrated with our community
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 p-6 rounded-xl border border-[#FFC247]/20">
                  <TrendingUp className="w-12 h-12 text-[#FFC247] mx-auto mb-4" />
                  <h4 className="text-[#FFC247] font-semibold text-lg mb-2">Real-time Analytics</h4>
                  <p className="text-gray-400 text-sm">
                    Live tracking of impact metrics and community engagement
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 p-6 rounded-xl border border-[#FFC247]/20">
                  <Target className="w-12 h-12 text-[#FFC247] mx-auto mb-4" />
                  <h4 className="text-[#FFC247] font-semibold text-lg mb-2">Milestone Celebrations</h4>
                  <p className="text-gray-400 text-sm">
                    Community recognition of achievements and progress
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 p-6 rounded-xl border border-[#FFC247]/20">
                  <Users className="w-12 h-12 text-[#FFC247] mx-auto mb-4" />
                  <h4 className="text-[#FFC247] font-semibold text-lg mb-2">Community Updates</h4>
                  <p className="text-gray-400 text-sm">
                    Regular progress reports and success story sharing
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

export default RoadmapTimeline;