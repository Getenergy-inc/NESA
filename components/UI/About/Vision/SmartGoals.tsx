import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import { Target, BarChart3, CheckCircle, Puzzle, Calendar } from "lucide-react";

const SmartGoals = () => {
  const smartCategories = [
    {
      title: "🎯 Specific",
      icon: Target,
      color: "from-blue-500 to-blue-600",
      goals: [
        "Recognize 100+ changemakers in education annually",
        "Facilitate over $10 million in scholarships by 2027",
        "Establish sustainable education hubs in 5 regions by 2029",
        "Institutionalize awards in diaspora and bilateral partner territories"
      ]
    },
    {
      title: "📊 Measurable",
      icon: BarChart3,
      color: "from-green-500 to-green-600",
      goals: [
        "Reach 500,000+ digital engagements yearly",
        "Empower 50,000+ learners through scholarships and CSR",
        "Track 20% annual growth in nominations, votes, and partnerships"
      ]
    },
    {
      title: "⚙️ Achievable",
      icon: CheckCircle,
      color: "from-purple-500 to-purple-600",
      goals: [
        "Establish NESA-Africa chapters in 54 African countries and 25 diaspora zones",
        "Integrate AI for impact tracking and award evaluation",
        "Launch multilingual voter and nominee platforms for inclusion"
      ]
    },
    {
      title: "🧩 Relevant",
      icon: Puzzle,
      color: "from-orange-500 to-orange-600",
      goals: [
        "Tied to SDG 4 and Agenda 2063 education priorities",
        "Inclusive of marginalized groups, rural learners, women, and youth",
        "Promotes education-led community transformation via local chapters"
      ]
    },
    {
      title: "📅 Time-Bound",
      icon: Calendar,
      color: "from-red-500 to-red-600",
      goals: [
        "2025: Inaugural event and scholarship pilot",
        "2026–2028: Continental rollout and program scaling",
        "2029–2035: Consolidation into Africa's premier education sustainability hub"
      ]
    }
  ];

  const milestones = [
    {
      year: "2025",
      title: "Foundation Year",
      description: "Inaugural event and scholarship pilot",
      achievements: ["First NESA-Africa awards", "AGC wallet launch", "Pilot scholarships"],
      color: "from-[#FFC247] to-[#E48900]"
    },
    {
      year: "2026-2027",
      title: "Regional Expansion",
      description: "East & Southern Africa integration",
      achievements: ["Regional partnerships", "Diaspora activation", "CSR fund expansion"],
      color: "from-blue-400 to-blue-600"
    },
    {
      year: "2028",
      title: "Technology Integration",
      description: "AI-powered systems and certification",
      achievements: ["AI impact evaluation", "Award certification system", "Full Africa rotation"],
      color: "from-purple-400 to-purple-600"
    },
    {
      year: "2029-2035",
      title: "Continental Leadership",
      description: "Premier education sustainability hub",
      achievements: ["Policy coalitions", "1M learners reached", "100K scholarships", "1K awardees"],
      color: "from-green-400 to-green-600"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#191307] to-[#33270E]">
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
              📈 SMART Goals (2025–2035)
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Strategic, Measurable, Achievable, Relevant, and Time-bound objectives for transforming African education
            </p>
          </motion.div>

          {/* SMART Goals Grid */}
          <div className="space-y-8">
            {smartCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={opacityV}
                className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-2xl p-8 hover:border-[#FFC247]/40 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 p-3 rounded-full mr-4">
                    <category.icon className="w-8 h-8 text-[#FFC247]" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                    {category.title}
                  </h3>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.goals.map((goal, goalIndex) => (
                    <div
                      key={goalIndex}
                      className="bg-gradient-to-r from-[#33270E]/40 to-[#191307]/40 p-4 rounded-lg border border-[#FFC247]/10 hover:border-[#FFC247]/30 transition-all duration-300"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-[#FFC247] to-[#E48900] rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm leading-relaxed">{goal}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline Section */}
          <motion.div variants={toTopV} className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                🗺️ Roadmap to 2035
              </h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Our strategic timeline for achieving continental educational transformation
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-xl p-6 hover:border-[#FFC247]/40 transition-all duration-300 h-full">
                    <div className="text-center mb-4">
                      <div className={`bg-gradient-to-r ${milestone.color} text-white font-bold text-xl px-4 py-2 rounded-full inline-block mb-3`}>
                        {milestone.year}
                      </div>
                      <h4 className="text-[#FFC247] font-semibold text-lg mb-2">
                        {milestone.title}
                      </h4>
                      <p className="text-gray-400 text-sm mb-4">
                        {milestone.description}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      {milestone.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-[#FFC247] rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300 text-xs leading-relaxed">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Connector Line */}
                  {index < milestones.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#FFC247] to-[#E48900] transform -translate-y-1/2"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Success Metrics */}
          <motion.div variants={opacityV} className="bg-gradient-to-r from-[#33270E]/60 to-[#191307]/60 rounded-2xl p-8 border border-[#FFC247]/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                🎯 2035 Success Targets
              </h3>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { number: "1M+", label: "Learners Reached", icon: "👥" },
                { number: "100K", label: "Scholarships Issued", icon: "🎓" },
                { number: "1K+", label: "Awardees Recognized", icon: "🏆" },
                { number: "54+", label: "Countries Covered", icon: "🌍" }
              ].map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-3">{metric.icon}</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-2">
                    {metric.number}
                  </div>
                  <div className="text-gray-400 text-sm">{metric.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SmartGoals;