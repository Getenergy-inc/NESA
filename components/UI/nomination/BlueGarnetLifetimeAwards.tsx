"use client";
import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import Link from "next/link";
import { Crown, Users, Award, Download, DollarSign, Wallet } from "lucide-react";

const BlueGarnetLifetimeAwards = () => {
  const criteriaData = [
    { label: "🎓 Eligibility", value: "Icons with 10+ years of education social impact" },
    { label: "📥 Nomination", value: "Public nomination + internal research and board review" },
    { label: "🗳️ Voting Method", value: "Internal closed voting only" },
    { label: "🧮 Voting Weights", value: "BOT (10%), BOA (20%), Ambassadors (7%), Volunteers (10%), CVO (3%), Judges (50%)" },
    { label: "🏆 Winners per Subcategory", value: "3 winners per subcategory" },
    { label: "📜 Recognition", value: "All nominees receive downloadable Blue Garnet Certificate of Recognition" },
    { label: "💬 Requirement", value: "No public voting or AGC required for final selection" }
  ];

  const actions = [
    {
      title: "Nominate an Icon",
      description: "Submit a nomination for a legendary education champion",
      icon: Crown,
      link: "/nomination/sub-categories/africa-lifetime-education-icon",
      buttonText: "Start Nomination",
      color: "from-blue-600 to-indigo-700"
    },
    {
      title: "Sponsor This Category",
      description: "Support lifetime achievement recognition through sponsorship",
      icon: DollarSign,
      link: "/sponsor?category=lifetime",
      buttonText: "Become Sponsor",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Download Certificate",
      description: "Access your Blue Garnet Certificate if eligible",
      icon: Download,
      link: "/certificates/download?type=lifetime",
      buttonText: "Download Now",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Top Up AGC Wallet",
      description: "Add funds to participate in other award categories",
      icon: Wallet,
      link: "/wallet",
      buttonText: "Top Up Wallet",
      color: "from-[#FFC247] to-[#E48900]"
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
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/20 to-indigo-700/20 rounded-full border border-blue-500/30 mb-6">
              <Crown className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-blue-400 font-medium">LIFETIME ACHIEVEMENT</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 inline-block text-transparent bg-clip-text mb-4">
              🔵 Africa Icon Blue Garnet Lifetime Awards
            </h2>
            <div className="bg-gradient-to-r from-blue-600/20 to-indigo-700/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">
              Non-Competitive | Honorary
            </div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Recognizing legendary education champions with over 10 years of impactful education service across Africa and the diaspora.
            </p>
          </motion.div>

          {/* Main Content Card */}
          <motion.div variants={toTopV} className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/40 transition-all duration-300">
              
              {/* Criteria Table */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 text-transparent bg-clip-text mb-6 flex items-center">
                  <Award className="w-6 h-6 text-blue-400 mr-3" />
                  Award Criteria & Details
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blue-500/20">
                        <th className="text-left py-3 px-4 text-blue-400 font-semibold">Criteria</th>
                        <th className="text-left py-3 px-4 text-blue-400 font-semibold">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {criteriaData.map((item, index) => (
                        <tr key={index} className="border-b border-blue-500/10 hover:bg-blue-500/5 transition-colors duration-200">
                          <td className="py-4 px-4 text-gray-300 font-medium whitespace-nowrap">
                            {item.label}
                          </td>
                          <td className="py-4 px-4 text-gray-400 leading-relaxed">
                            {item.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-blue-400 mb-4">Key Features:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Lifetime achievement recognition for education legends",
                    "Internal board review and research process",
                    "No public voting or AGC requirements",
                    "Automatic certificate eligibility for all nominees",
                    "Continental recognition across Africa and diaspora",
                    "Mentorship and legacy documentation opportunities"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300 text-sm leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={toTopV} className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 inline-block text-transparent bg-clip-text mb-4">
                Available Actions
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Choose how you'd like to participate in the Africa Icon Blue Garnet Lifetime Awards
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {actions.map((action, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className="group"
                >
                  <Link href={action.link}>
                    <div className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300 h-full cursor-pointer group-hover:transform group-hover:scale-105">
                      <div className="text-center">
                        <div className={`bg-gradient-to-r ${action.color} p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <action.icon className="w-8 h-8 text-white" />
                        </div>
                        
                        <h4 className="text-lg font-bold text-blue-400 mb-3">
                          {action.title}
                        </h4>
                        
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                          {action.description}
                        </p>
                        
                        <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-6 py-2 rounded-full text-sm hover:shadow-lg transition-all duration-300 w-full group-hover:from-blue-400 group-hover:to-indigo-500">
                          {action.buttonText}
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Special Notice */}
          <motion.div variants={opacityV} className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600/10 to-indigo-700/10 rounded-2xl p-6 border border-blue-500/30 text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-blue-400 mr-3" />
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 inline-block text-transparent bg-clip-text">
                  Special Recognition Process
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                This category represents the highest honor in African education recognition. 
                Nominees are evaluated through a comprehensive internal review process involving 
                board members, ambassadors, volunteers, and expert judges.
              </p>
              <div className="bg-gradient-to-r from-blue-500/20 to-indigo-600/20 rounded-lg p-4">
                <p className="text-blue-300 text-sm font-medium">
                  💡 <strong>Pro Tip:</strong> All nominees automatically receive a downloadable Blue Garnet Certificate of Recognition, 
                  regardless of winning status. This ensures every education legend is properly acknowledged.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlueGarnetLifetimeAwards;