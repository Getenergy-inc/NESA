import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import { Heart, Users, Radio, Tv, MapPin, Globe, GraduationCap, Coins } from "lucide-react";

const SocialImpact = () => {
  const impactStrategies = [
    {
      title: "🌱 Scholarships & AGC Voting",
      description: "Every vote powers a child's education through the AfriGold Coin (AGC).",
      icon: GraduationCap,
      color: "from-green-500 to-emerald-600",
      features: [
        "AGC-powered voting system",
        "Direct scholarship funding",
        "Transparent impact tracking",
        "Community-driven selection",
        "Sustainable funding model"
      ],
      impact: "50,000+ learners empowered by 2035"
    },
    {
      title: "🤝 Local Chapters",
      description: "Community-run NESA chapters drive grassroots engagement, school rebuilding, teacher support, and data collection.",
      icon: Users,
      color: "from-blue-500 to-cyan-600",
      features: [
        "54 African countries coverage",
        "25 diaspora zones",
        "Grassroots engagement",
        "School rebuilding projects",
        "Teacher support programs",
        "Local data collection"
      ],
      impact: "10,000 Members + Localchapters by 2035"
    },
    {
      title: "📡 NESA TV & It's In Me Radio",
      description: "Broadcasting real-time education transformation and community voices across Africa.",
      icon: Tv,
      color: "from-purple-500 to-violet-600",
      features: [
        "Real-time education content",
        "Community voice amplification",
        "Pan-African broadcasting",
        "Educational programming",
        "Success story sharing",
        "Policy advocacy platform"
      ],
      impact: "500,000+ digital engagements yearly"
    },
    {
      title: "💡 Ambassadors & Diaspora Agents",
      description: "Mobilizing diaspora and youth as changemakers, mentors, and funders.",
      icon: Globe,
      color: "from-orange-500 to-red-600",
      features: [
        "Diaspora mobilization",
        "Youth changemaker programs",
        "Mentorship networks",
        "Funding facilitation",
        "Cross-border collaboration",
        "Cultural bridge building"
      ],
      impact: "1000+ Active Ambassadors"
    },
    {
      title: "📘 EduAid-Africa Expo & Webinar Series",
      description: "Creating policy spaces and learning exchanges across 54+ countries.",
      icon: MapPin,
      color: "from-teal-500 to-green-600",
      features: [
        "Policy dialogue forums",
        "Learning exchanges",
        "Continental networking",
        "Best practice sharing",
        "Innovation showcases",
        "Partnership facilitation"
      ],
      impact: "Annual continental gatherings"
    }
  ];

  const impactMetrics = [
    { number: "$10M+", label: "Scholarship Funding by 2027", icon: "💰" },
    { number: "1M+", label: "Learners Reached by 2035", icon: "👥" },
    { number: "100K", label: "Scholarships Issued", icon: "🎓" },
    { number: "54+", label: "Countries & Territories", icon: "🌍" }
  ];

  const communityPrograms = [
    {
      title: "School Rebuilding Initiative",
      description: "Reconstructing and modernizing educational infrastructure",
      icon: "🏗️",
      status: "Active in 12 countries"
    },
    {
      title: "Teacher Excellence Program",
      description: "Professional development and support for educators",
      icon: "👨‍🏫",
      status: "Training 5,000+ teachers"
    },
    {
      title: "Digital Literacy Campaign",
      description: "Bridging the digital divide in rural communities",
      icon: "💻",
      status: "Reaching 100+ communities"
    },
    {
      title: "Girls Education Initiative",
      description: "Promoting gender equality in education access",
      icon: "👩‍🎓",
      status: "Supporting 10,000+ girls"
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
              📚 Social Impact Strategy
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Comprehensive community engagement and sustainable development initiatives
            </p>
          </motion.div>

          {/* Impact Strategies */}
          <div className="space-y-8">
            {impactStrategies.map((strategy, index) => (
              <motion.div
                key={index}
                variants={opacityV}
                className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-2xl p-8 hover:border-[#FFC247]/40 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                  <div className="flex-1 mb-6 lg:mb-0">
                    <div className="flex items-center mb-4">
                      <div className={`bg-gradient-to-r ${strategy.color} p-3 rounded-full mr-4`}>
                        <strategy.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-2">
                          {strategy.title}
                        </h3>
                        <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 text-[#FFC247] px-3 py-1 rounded-full text-sm font-medium inline-block">
                          {strategy.impact}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {strategy.description}
                    </p>
                  </div>

                  <div className="lg:w-1/3">
                    <h4 className="text-[#FFC247] font-semibold text-lg mb-4">Key Features:</h4>
                    <div className="space-y-3">
                      {strategy.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-[#FFC247] to-[#E48900] rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300 text-sm leading-relaxed">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Impact Metrics */}
          <motion.div variants={toTopV} className="bg-gradient-to-r from-[#33270E]/60 to-[#191307]/60 rounded-2xl p-8 border border-[#FFC247]/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                📊 Impact Targets
              </h3>
              <p className="text-gray-300">Measurable outcomes driving educational transformation</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 p-6 rounded-xl border border-[#FFC247]/20 mb-4">
                    <div className="text-4xl mb-3">{metric.icon}</div>
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-2">
                      {metric.number}
                    </div>
                    <div className="text-gray-400 text-sm">{metric.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Community Programs */}
          <motion.div variants={toTopV} className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                🏘️ Community Programs
              </h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Direct intervention programs creating lasting change in communities
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {communityPrograms.map((program, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-xl p-6 hover:border-[#FFC247]/40 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl flex-shrink-0">{program.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-[#FFC247] font-semibold text-lg mb-2">
                        {program.title}
                      </h4>
                      <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                        {program.description}
                      </p>
                      <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 text-[#FFC247] px-3 py-1 rounded-full text-xs font-medium inline-block">
                        {program.status}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={opacityV} className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 rounded-2xl p-8 border border-[#FFC247]/30 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 p-4 rounded-full mr-4">
                <Heart className="w-10 h-10 text-[#FFC247]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                Join Our Impact Movement
              </h3>
            </div>
            <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto">
              Every contribution, vote, and participation creates ripple effects of positive change 
              across African communities. Together, we're building a sustainable future for education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] font-semibold px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300">
                Become a Chapter Leader
              </button>
              <button className="border border-[#FFC247] text-[#FFC247] font-semibold px-8 py-3 rounded-full hover:bg-[#FFC247]/10 transition-all duration-300">
                Support with AGC
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialImpact;