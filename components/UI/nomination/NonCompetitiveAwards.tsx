"use client";
import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import Link from "next/link";
import { Medal, Building2, Upload, Download, Handshake, Award, Users, FileText, Lock } from "lucide-react";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

const NonCompetitiveAwards = () => {
  const { isAuthenticated, userRole } = useAuthContext();
  const router = useRouter();

  // Handle authentication-required actions
  const handleAuthAction = (link: string) => {
    if (!isAuthenticated) {
      router.push('/account/login');
      return;
    }
    router.push(link);
  };

  const criteriaData = [
    { label: "🎯 Eligibility", value: "States, libraries, research institutes, faith organizations, political leaders" },
    { label: "📥 Nomination Method", value: "Public nomination + internal research and verification" },
    { label: "📁 Documentation", value: "Verified proof of educational impact and achievements" },
    { label: "🗳️ Voting Method", value: "Expert panel evaluation only (no public voting)" },
    { label: "🧮 Selection Process", value: "Internal review by judges, board members, and volunteers" },
    { label: "🏆 Recognition", value: "Platinum Certificate of Recognition" },
    { label: "📜 Certificate Access", value: "Downloadable upon verification and approval" }
  ];

  const actions = [
    {
      title: "Submit Nomination",
      description: isAuthenticated 
        ? "Nominate deserving institutions, states, or organizations" 
        : "Login to submit nominations",
      icon: isAuthenticated ? Building2 : Lock,
      link: "/nomination/non-competitive/submit",
      buttonText: isAuthenticated ? "Submit Nomination" : "Login to Nominate",
      color: "from-gray-500 to-gray-600",
      featured: true,
      requiresAuth: true
    },
    {
      title: "Upload Documentation",
      description: isAuthenticated 
        ? "Provide evidence of educational impact and achievements" 
        : "Login to upload documentation",
      icon: isAuthenticated ? Upload : Lock,
      link: "/nomination/non-competitive/upload-docs",
      buttonText: isAuthenticated ? "Upload Evidence" : "Login to Upload",
      color: "from-blue-500 to-blue-600",
      featured: true,
      requiresAuth: true
    },
    {
      title: "Download Certificate",
      description: isAuthenticated 
        ? "Access your Platinum Certificate once approved" 
        : "Login to check certificate status",
      icon: isAuthenticated ? Download : Lock,
      link: "/certificates/download?type=non-competitive",
      buttonText: isAuthenticated ? "Check Status" : "Login to Check",
      color: "from-purple-500 to-purple-600",
      requiresAuth: true
    },
    {
      title: "Become a Reviewer",
      description: "Join our expert panel to evaluate non-competitive nominations",
      icon: Users,
      link: "/reviewer/apply",
      buttonText: "Apply as Reviewer",
      color: "from-green-500 to-green-600",
      requiresAuth: false
    },
    {
      title: "Partnership Opportunities",
      description: "Partner with us to support institutional recognition",
      icon: Handshake,
      link: "/partnerships/non-competitive",
      buttonText: "Explore Partnership",
      color: "from-orange-500 to-orange-600",
      requiresAuth: false
    },
    {
      title: "View Guidelines",
      description: "Read detailed guidelines for non-competitive nominations",
      icon: FileText,
      link: "/guidelines/non-competitive",
      buttonText: "View Guidelines",
      color: "from-indigo-500 to-indigo-600",
      requiresAuth: false
    }
  ];

  const subcategories = [
    { name: "Educational-Friendly States", icon: "🏛️", count: "6 zones" },
    { name: "Tertiary Libraries", icon: "📚", count: "Best in Nigeria" },
    { name: "Research Institutes", icon: "🔬", count: "R&D Excellence" },
    { name: "Faith-Based Champions", icon: "⛪", count: "Christian & Islamic" },
    { name: "Political Leaders", icon: "🏛️", count: "Educational Support" },
    { name: "International Contributors", icon: "🌍", count: "Global Partners" },
    { name: "Diaspora Associations", icon: "✈️", count: "Impact Programs" },
    { name: "Bilateral Partners", icon: "🤝", count: "Collaborations" }
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
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-full border border-gray-400/30 mb-6">
              <Medal className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-gray-400 font-medium">NON-COMPETITIVE RECOGNITION</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 text-transparent bg-clip-text mb-4">
              🏅 Platinum Certificate of Recognition Awards
            </h2>
            <div className="bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-400 px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">
              Non-Competitive | Expert Panel Evaluation
            </div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Honoring state actors, diaspora groups, ministries, research institutes, and institutions with verified social impact in education.
            </p>
          </motion.div>

          {/* Main Content Card */}
          <motion.div variants={toTopV} className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-gray-400/20 rounded-2xl p-8 hover:border-gray-400/40 transition-all duration-300">
              
              {/* Criteria Table */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 text-transparent bg-clip-text mb-6 flex items-center">
                  <Award className="w-6 h-6 text-gray-400 mr-3" />
                  Award Criteria & Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {criteriaData.map((item, index) => (
                    <div key={index} className="flex justify-between items-start p-4 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-lg border border-gray-400/10">
                      <span className="text-gray-400 font-medium text-sm">{item.label}</span>
                      <span className="text-gray-300 text-sm text-right max-w-[60%]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-400 mb-4">Key Features:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Merit-based recognition system",
                    "Expert panel evaluation only",
                    "Verified documentation required",
                    "Institutional and governmental focus",
                    "No public voting involved",
                    "Platinum certificate recognition"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300 text-sm leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Subcategories Grid */}
          <motion.div variants={toTopV} className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 text-transparent bg-clip-text mb-8">
              Recognition Categories
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {subcategories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-gray-400/20 rounded-xl p-6 hover:border-gray-400/40 transition-all duration-300 text-center"
                >
                  <div className="text-3xl mb-4">{category.icon}</div>
                  <h4 className="text-gray-400 font-semibold text-lg mb-2">
                    {category.name}
                  </h4>
                  <p className="text-gray-500 text-sm">{category.count}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={toTopV} className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 text-transparent bg-clip-text mb-8">
              Get Involved
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {actions.map((action, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className={`group ${action.featured ? 'lg:col-span-1' : ''}`}
                >
                  {(!action.requiresAuth || isAuthenticated) ? (
                    <Link href={action.link} className="block h-full">
                      <div className={`bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-gray-400/20 rounded-xl p-6 hover:border-gray-400/40 transition-all duration-300 h-full cursor-pointer group-hover:transform group-hover:scale-105 ${
                        action.featured ? 'border-gray-400/40 bg-gradient-to-br from-gray-400/5 to-gray-600/5' : ''
                      }`}>
                        <div className="text-center h-full flex flex-col">
                          {action.featured && (
                            <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white text-xs px-3 py-1 rounded-full inline-block mb-4">
                              FEATURED
                            </div>
                          )}

                          <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <action.icon className="w-8 h-8 text-white" />
                          </div>

                          <h4 className="text-gray-300 font-bold text-lg mb-3">
                            {action.title}
                          </h4>

                          <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-grow">
                            {action.description}
                          </p>

                          <div className={`bg-gradient-to-r ${action.color} text-white px-6 py-3 rounded-full font-semibold text-sm hover:shadow-lg transition-all duration-300 w-full mt-auto text-center`}>
                            {action.buttonText}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div 
                      onClick={() => handleAuthAction(action.link)}
                      className={`bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-gray-400/20 rounded-xl p-6 hover:border-gray-400/40 transition-all duration-300 h-full cursor-pointer group-hover:transform group-hover:scale-105 opacity-75 ${
                        action.featured ? 'border-gray-400/40 bg-gradient-to-br from-gray-400/5 to-gray-600/5' : ''
                      }`}
                    >
                      <div className="text-center h-full flex flex-col">
                        {action.featured && (
                          <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">
                            LOGIN REQUIRED
                          </div>
                        )}
                        
                        <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 opacity-75`}>
                          <action.icon className="w-8 h-8 text-white" />
                        </div>
                        
                        <h4 className="text-lg font-bold text-gray-400 mb-3">
                          {action.title}
                        </h4>
                        
                        <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">
                          {action.description}
                        </p>
                        
                        <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold px-6 py-3 rounded-full text-sm hover:shadow-lg transition-all duration-300 w-full mt-auto text-center">
                          {action.buttonText}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Important Notice */}
          <motion.div variants={opacityV} className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-2xl p-6 border border-gray-400/30 text-center">
              <div className="flex items-center justify-center mb-4">
                <Medal className="w-8 h-8 text-gray-400 mr-3" />
                <h3 className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 text-transparent bg-clip-text">
                  Merit-Based Recognition
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                Non-competitive awards focus on verified achievements and institutional impact, 
                evaluated by expert panels without public voting requirements.
              </p>
              <div className="bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-lg p-4">
                <p className="text-gray-400 text-sm">
                  <strong>Note:</strong> All nominations undergo thorough verification and expert review 
                  to ensure recognition of genuine educational impact and institutional excellence.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NonCompetitiveAwards;
