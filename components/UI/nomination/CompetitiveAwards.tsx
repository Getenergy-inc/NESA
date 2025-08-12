"use client";
import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import Link from "next/link";
import { Award, Users, Vote, Download, UserPlus, DollarSign, Wallet, Lock } from "lucide-react";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

const CompetitiveAwards = () => {
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
    { label: "🎯 Eligibility", value: "Schools, individuals, startups, community orgs, media" },
    { label: "📥 Nomination", value: "Public submission (via AGC wallet only)" },
    { label: "📈 Certificate Access", value: "Requires minimum 1,000 nominations or combined votes" },
    { label: "🗳️ Voting Method", value: "Public Voting + Judges + Admin Review" },
    { label: "🧮 Voting Weights", value: "Public (40%), Judges (50%), BOT/BOA/CVO (10%)" },
    { label: "🏆 Winners", value: "1 Gold Certificate winner per subcategory" },
    { label: "📜 Recognition", value: "Non-winners with 1,000+ votes/nominations can download certificate" }
  ];

  // Define actions with role-based permissions
  const getActions = () => {
    const baseActions = [
      {
        title: "Start Nomination",
        description: isAuthenticated
          ? "Submit a nomination using your AGC wallet"
          : "Login to submit nominations",
        icon: isAuthenticated ? UserPlus : Lock,
        link: "/nomination/competitive/start",
        buttonText: isAuthenticated ? "Nominate Now" : "Login to Nominate",
        color: "from-[#FFC247] to-[#E48900]",
        featured: true,
        requiresAuth: true,
        allowedRoles: ["FREE_MEMBER", "STANDARD_MEMBER", "AMBASSADOR", "JUDGE", "VOLUNTEER", "NRC_VOLUNTEER", "ADMIN", "SUPER_ADMIN"]
      },
      {
        title: "Vote Using AGC",
        description: isAuthenticated
          ? "Support nominees and fund scholarships through voting"
          : "Login to vote for nominees",
        icon: isAuthenticated ? Vote : Lock,
        link: "/voting",
        buttonText: isAuthenticated ? "Vote Now" : "Login to Vote",
        color: "from-green-500 to-green-600",
        featured: true,
        requiresAuth: true,
        allowedRoles: ["FREE_MEMBER", "STANDARD_MEMBER", "AMBASSADOR", "JUDGE", "VOLUNTEER", "NRC_VOLUNTEER", "ADMIN", "SUPER_ADMIN"]
      },
      {
        title: "Download Certificate",
        description: isAuthenticated
          ? "Access your certificate if you meet the 1,000 vote threshold"
          : "Login to check certificate eligibility",
        icon: isAuthenticated ? Download : Lock,
        link: "/certificates/download?type=competitive",
        buttonText: isAuthenticated ? "Check Eligibility" : "Login to Check",
        color: "from-purple-500 to-purple-600",
        requiresAuth: true,
        allowedRoles: ["FREE_MEMBER", "STANDARD_MEMBER", "AMBASSADOR", "JUDGE", "VOLUNTEER", "NRC_VOLUNTEER", "ADMIN", "SUPER_ADMIN"]
      },
      {
        title: "Become a Judge",
        description: "Join our expert panel to evaluate nominations",
        icon: Users,
        link: "/judgeapply",
        buttonText: "Apply as Judge",
        color: "from-blue-500 to-blue-600",
        requiresAuth: false,
        allowedRoles: ["FREE_MEMBER", "STANDARD_MEMBER", "AMBASSADOR", "VOLUNTEER", "NRC_VOLUNTEER"]
      },
      {
        title: "Sponsor a Subcategory",
        description: "Support specific award subcategories through sponsorship",
        icon: DollarSign,
        link: "/sponsor?category=competitive",
        buttonText: "Sponsor Now",
        color: "from-orange-500 to-orange-600",
        requiresAuth: false,
        allowedRoles: ["FREE_MEMBER", "STANDARD_MEMBER", "AMBASSADOR", "SPONSOR", "ADMIN", "SUPER_ADMIN"]
      },
      {
        title: "Top Up AGC Wallet",
        description: isAuthenticated
          ? "Add funds to participate in nominations and voting"
          : "Login to access your AGC wallet",
        icon: isAuthenticated ? Wallet : Lock,
        link: "/wallet",
        buttonText: isAuthenticated ? "Top Up Wallet" : "Login for Wallet",
        color: "from-[#FFC247] to-[#E48900]",
        requiresAuth: true,
        allowedRoles: ["FREE_MEMBER", "STANDARD_MEMBER", "AMBASSADOR", "JUDGE", "VOLUNTEER", "NRC_VOLUNTEER", "ADMIN", "SUPER_ADMIN"]
      }
    ];

    // Filter actions based on user role
    return baseActions.filter(action => {
      if (!action.allowedRoles) return true;
      if (!isAuthenticated && !action.requiresAuth) return true;
      if (!isAuthenticated && action.requiresAuth) return true; // Show with login prompt
      return action.allowedRoles.includes(userRole || "");
    });
  };

  const actions = getActions();

  const subcategories = [
    { name: "STEM Education Excellence", count: "15 subcategories", icon: "🔬" },
    { name: "EdTech Innovation", count: "12 subcategories", icon: "💻" },
    { name: "Policy Advocacy", count: "10 subcategories", icon: "📋" },
    { name: "Educational Media", count: "8 subcategories", icon: "📺" },
    { name: "Community Impact", count: "18 subcategories", icon: "🏘️" },
    { name: "Teacher Excellence", count: "14 subcategories", icon: "👨‍🏫" },
    { name: "Student Achievement", count: "12 subcategories", icon: "🎓" },
    { name: "Infrastructure Development", count: "12 subcategories", icon: "🏗️" }
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
              <Award className="w-5 h-5 text-[#FFC247] mr-2" />
              <span className="text-[#FFC247] font-medium">COMPETITIVE EXCELLENCE</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
              🥇 Blue Garnet & Gold Certificate Awards
            </h2>
            <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 text-[#FFC247] px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">
              Competitive | Public Voting + Judges
            </div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Celebrating rising educators, youth leaders, NGOs, tech disruptors, and institutions making measurable educational impact (1–10 years).
            </p>
          </motion.div>

          {/* Main Content Card */}
          <motion.div variants={toTopV} className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-2xl p-8 hover:border-[#FFC247]/40 transition-all duration-300">
              
              {/* Criteria Table */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] text-transparent bg-clip-text mb-6 flex items-center">
                  <Award className="w-6 h-6 text-[#FFC247] mr-3" />
                  Award Criteria & Details
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#FFC247]/20">
                        <th className="text-left py-3 px-4 text-[#FFC247] font-semibold">Criteria</th>
                        <th className="text-left py-3 px-4 text-[#FFC247] font-semibold">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {criteriaData.map((item, index) => (
                        <tr key={index} className="border-b border-[#FFC247]/10 hover:bg-[#FFC247]/5 transition-colors duration-200">
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
                <h4 className="text-xl font-bold text-[#FFC247] mb-4">Key Features:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Public nomination and voting system",
                    "AGC wallet required for all participation",
                    "Combined public and expert judge evaluation",
                    "1,000 vote threshold for certificate access",
                    "Direct scholarship funding through votes",
                    "Transparent impact tracking and reporting"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#FFC247] to-[#E48900] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300 text-sm leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Subcategories Overview */}
          <motion.div variants={toTopV} className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                Award Subcategories
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Comprehensive coverage across 8 main categories with 101+ specialized subcategories
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {subcategories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-xl p-6 hover:border-[#FFC247]/40 transition-all duration-300 text-center"
                >
                  <div className="text-3xl mb-4">{category.icon}</div>
                  <h4 className="text-[#FFC247] font-semibold text-lg mb-2">
                    {category.name}
                  </h4>
                  <p className="text-gray-400 text-sm">{category.count}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={toTopV} className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                Available Actions
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Multiple ways to participate in the competitive award process
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {actions.map((action, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className={`group ${action.featured ? 'lg:col-span-1' : ''}`}
                >
                  <div
                    onClick={() => action.requiresAuth && !isAuthenticated ? handleAuthAction(action.link) : null}
                    className={`bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-xl p-6 hover:border-[#FFC247]/40 transition-all duration-300 h-full cursor-pointer group-hover:transform group-hover:scale-105 ${
                      action.featured ? 'border-[#FFC247]/40 bg-gradient-to-br from-[#FFC247]/5 to-[#E48900]/5' : ''
                    } ${!isAuthenticated && action.requiresAuth ? 'opacity-75' : ''}`}
                  >
                    {(!action.requiresAuth || isAuthenticated) ? (
                      <Link href={action.link} className="block h-full">
                        <div className="text-center h-full flex flex-col">
                          {action.featured && (
                            <div className="bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">
                              FEATURED
                            </div>
                          )}

                          <div className={`bg-gradient-to-r ${action.color} p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <action.icon className="w-8 h-8 text-white" />
                          </div>

                          <h4 className="text-lg font-bold text-[#FFC247] mb-3">
                            {action.title}
                          </h4>

                          <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-grow">
                            {action.description}
                          </p>

                          <div className={`bg-gradient-to-r ${action.color} text-white font-semibold px-6 py-2 rounded-full text-sm hover:shadow-lg transition-all duration-300 w-full mt-auto text-center`}>
                            {action.buttonText}
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="text-center h-full flex flex-col">
                        {action.featured && (
                          <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">
                            LOGIN REQUIRED
                          </div>
                        )}

                        <div className={`bg-gradient-to-r ${action.color} p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center opacity-75`}>
                          <action.icon className="w-8 h-8 text-white" />
                        </div>

                        <h4 className="text-lg font-bold text-gray-400 mb-3">
                          {action.title}
                        </h4>

                        <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">
                          {action.description}
                        </p>

                        <button
                          onClick={() => handleAuthAction(action.link)}
                          className="bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold px-6 py-2 rounded-full text-sm hover:shadow-lg transition-all duration-300 w-full mt-auto"
                        >
                          {action.buttonText}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Important Notice */}
          <motion.div variants={opacityV} className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 rounded-2xl p-6 border border-[#FFC247]/30 text-center">
              <div className="flex items-center justify-center mb-4">
                <Vote className="w-8 h-8 text-[#FFC247] mr-3" />
                <h3 className="text-xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                  AGC-Powered Impact
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                Every vote cast using AfriGold Coin directly contributes to scholarship funding, 
                creating a sustainable cycle where recognition drives educational support.
              </p>
              <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 rounded-lg p-4">
                <p className="text-[#FFC247] text-sm font-medium">
                  💡 <strong>Certificate Access:</strong> Reach 1,000 combined nominations or votes to unlock your 
                  downloadable Certificate of Recognition, even if you don't win the gold certificate.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompetitiveAwards;