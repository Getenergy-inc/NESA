"use client";
import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import Link from "next/link";
import {
  Medal,
  Building2,
  Upload,
  Download,
  Handshake,
  Award,
  Users,
  FileText,
  Lock,
  Vote,
} from "lucide-react";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

const CompetitveGetInvolve = () => {
  const { isAuthenticated, userRole } = useAuthContext();
  const router = useRouter();

  // Handle authentication-required actions
  const handleAuthAction = (link: string) => {
    if (!isAuthenticated) {
      router.push("/account/login");
      return;
    }
    router.push(link);
  };

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
      requiresAuth: true,
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
      requiresAuth: true,
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
      requiresAuth: true,
    },
    {
      title: "Become a Reviewer",
      description:
        "Join our expert panel to evaluate non-competitive nominations",
      icon: Users,
      link: "/reviewer/apply",
      buttonText: "Apply as Reviewer",
      color: "from-green-500 to-green-600",
      requiresAuth: false,
    },
    {
      title: "Partnership Opportunities",
      description: "Partner with us to support institutional recognition",
      icon: Handshake,
      link: "/partnerships/non-competitive",
      buttonText: "Explore Partnership",
      color: "from-orange-500 to-orange-600",
      requiresAuth: false,
    },
    {
      title: "View Guidelines",
      description: "Read detailed guidelines for non-competitive nominations",
      icon: FileText,
      link: "/guidelines/non-competitive",
      buttonText: "View Guidelines",
      color: "from-indigo-500 to-indigo-600",
      requiresAuth: false,
    },
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
                  className={`group ${action.featured ? "lg:col-span-1" : ""}`}
                >
                  <div
                    onClick={() =>
                      action.requiresAuth && !isAuthenticated
                        ? handleAuthAction(action.link)
                        : null
                    }
                    className={`bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-xl p-6 hover:border-[#FFC247]/40 transition-all duration-300 h-full cursor-pointer group-hover:transform group-hover:scale-105 ${
                      action.featured
                        ? "border-[#FFC247]/40 bg-gradient-to-br from-[#FFC247]/5 to-[#E48900]/5"
                        : ""
                    } ${
                      !isAuthenticated && action.requiresAuth
                        ? "opacity-75"
                        : ""
                    }`}
                  >
                    {!action.requiresAuth || isAuthenticated ? (
                      <Link href={action.link} className="block h-full">
                        <div className="text-center h-full flex flex-col">
                          {action.featured && (
                            <div className="bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">
                              FEATURED
                            </div>
                          )}

                          <div
                            className={`bg-gradient-to-r ${action.color} p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                          >
                            <action.icon className="w-8 h-8 text-white" />
                          </div>

                          <h4 className="text-lg font-bold text-[#FFC247] mb-3">
                            {action.title}
                          </h4>

                          <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-grow">
                            {action.description}
                          </p>

                          <div
                            className={`bg-gradient-to-r ${action.color} text-white font-semibold px-6 py-2 rounded-full text-sm hover:shadow-lg transition-all duration-300 w-full mt-auto text-center`}
                          >
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

                        <div
                          className={`bg-gradient-to-r ${action.color} p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center opacity-75`}
                        >
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
                Every vote cast using AfriGold Coin directly contributes to
                scholarship funding, creating a sustainable cycle where
                recognition drives educational support.
              </p>
              <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 rounded-lg p-4">
                <p className="text-[#FFC247] text-sm font-medium">
                  💡 <strong>Certificate Access:</strong> Reach 1,000 combined
                  nominations or votes to unlock your downloadable Certificate
                  of Recognition, even if you don't win the gold certificate.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompetitveGetInvolve;
