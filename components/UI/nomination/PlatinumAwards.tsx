"use client";
import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import Link from "next/link";
import { Medal, Building2, Upload, Download, Handshake, Wallet } from "lucide-react";

const PlatinumAwards = () => {
  const criteriaData = [
    { label: "📥 Nomination Method", value: "Chapter nomination or public application" },
    { label: "📁 Proof of Impact", value: "Upload documentation of education social impact" },
    { label: "📈 Certificate Access", value: "Minimum of 1,000 nominations or combined AGC-backed votes required" },
    { label: "🗳️ Voting Method", value: "Internal review (no public voting)" },
    { label: "🧮 Voting Weights", value: "Judges (50%), BOA (20%), Volunteers (10%), BOT (10%), Ambassadors (7%), CVO (3%)" },
    { label: "📜 Recognition", value: "Certificate downloadable after eligibility met" }
  ];

  const actions = [
    {
      title: "Submit Nomination",
      description: "Apply for institutional recognition through chapter or public nomination",
      icon: Building2,
      link: "/nomination/platinum/submit",
      buttonText: "Submit Application",
      color: "from-gray-500 to-gray-600",
      featured: true
    },
    {
      title: "Upload Impact Documentation",
      description: "Provide evidence of your educational social impact",
      icon: Upload,
      link: "/nomination/platinum/upload-docs",
      buttonText: "Upload Documents",
      color: "from-blue-500 to-blue-600",
      featured: true
    },
    {
      title: "Download Certificate",
      description: "Access your Platinum Certificate if eligibility requirements are met",
      icon: Download,
      link: "/certificates/download?type=platinum",
      buttonText: "Check Status",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Partner With This Category",
      description: "Become a strategic partner for institutional recognition",
      icon: Handshake,
      link: "/partnerships/platinum",
      buttonText: "Explore Partnership",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Top Up AGC Wallet",
      description: "Ensure you have funds for nomination support if needed",
      icon: Wallet,
      link: "/wallet",
      buttonText: "Top Up Wallet",
      color: "from-[#FFC247] to-[#E48900]"
    }
  ];

  const eligibleInstitutions = [
    { 
      category: "Government Bodies", 
      examples: ["Ministries of Education", "State Education Boards", "Federal Education Agencies"],
      icon: "🏛️"
    },
    { 
      category: "Diaspora Organizations", 
      examples: ["African Diaspora Groups", "Cultural Associations", "Educational Foundations"],
      icon: "🌍"
    },
    { 
      category: "International Partners", 
      examples: ["UN Agencies", "World Bank", "Bilateral Education Partners"],
      icon: "🤝"
    },
    { 
      category: "Major CSR Contributors", 
      examples: ["Corporate Foundations", "Banking Institutions", "Telecommunications Companies"],
      icon: "🏢"
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
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-full border border-gray-400/30 mb-6">
              <Medal className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-gray-400 font-medium">INSTITUTIONAL HONORS</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 inline-block text-transparent bg-clip-text mb-4">
              🏅 Platinum Certificate of Recognition Awards
            </h2>
            <div className="bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-400 px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">
              Non-Competitive | Verified Documentation
            </div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Honoring state actors, diaspora groups, ministries, and institutions with verified social impact in education.
            </p>
          </motion.div>

          {/* Main Content Card */}
          <motion.div variants={toTopV} className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-gray-400/20 rounded-2xl p-8 hover:border-gray-400/40 transition-all duration-300">
              
              {/* Criteria Table */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 inline-block text-transparent bg-clip-text mb-6 flex items-center">
                  <Medal className="w-6 h-6 text-gray-400 mr-3" />
                  Award Criteria & Details
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-400/20">
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Criteria</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {criteriaData.map((item, index) => (
                        <tr key={index} className="border-b border-gray-400/10 hover:bg-gray-400/5 transition-colors duration-200">
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
                <h4 className="text-xl font-bold text-gray-400 mb-4">Key Features:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Documentation-based verification process",
                    "Chapter nomination or direct application",
                    "Internal expert review system",
                    "1,000 nomination threshold for certificate access",
                    "Recognition for institutional impact",
                    "Partnership opportunities with NESA-Africa"
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

          {/* Eligible Institutions */}
          <motion.div variants={toTopV} className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 inline-block text-transparent bg-clip-text mb-4">
                Eligible Institutions
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Organizations and institutions that qualify for Platinum Certificate recognition
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {eligibleInstitutions.map((institution, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-gray-400/20 rounded-xl p-6 hover:border-gray-400/40 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl flex-shrink-0">{institution.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-gray-300 font-semibold text-lg mb-3">
                        {institution.category}
                      </h4>
                      <div className="space-y-2">
                        {institution.examples.map((example, exampleIndex) => (
                          <div key={exampleIndex} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
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

          {/* Action Buttons */}
          <motion.div variants={toTopV} className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 inline-block text-transparent bg-clip-text mb-4">
                Available Actions
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Steps to participate in the Platinum Certificate recognition process
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {actions.map((action, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className={`group ${action.featured ? 'md:col-span-1' : ''}`}
                >
                  <Link href={action.link}>
                    <div className={`bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-gray-400/20 rounded-xl p-6 hover:border-gray-400/40 transition-all duration-300 h-full cursor-pointer group-hover:transform group-hover:scale-105 ${
                      action.featured ? 'border-gray-400/40 bg-gradient-to-br from-gray-400/5 to-gray-600/5' : ''
                    }`}>
                      <div className="text-center">
                        {action.featured && (
                          <div className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">
                            FEATURED
                          </div>
                        )}
                        
                        <div className={`bg-gradient-to-r ${action.color} p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <action.icon className="w-8 h-8 text-white" />
                        </div>
                        
                        <h4 className="text-lg font-bold text-gray-300 mb-3">
                          {action.title}
                        </h4>
                        
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                          {action.description}
                        </p>
                        
                        <button className={`bg-gradient-to-r ${action.color} text-white font-semibold px-6 py-2 rounded-full text-sm hover:shadow-lg transition-all duration-300 w-full`}>
                          {action.buttonText}
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Documentation Requirements */}
          <motion.div variants={opacityV} className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-2xl p-6 border border-gray-400/30 text-center">
              <div className="flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-gray-400 mr-3" />
                <h3 className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 inline-block text-transparent bg-clip-text">
                  Documentation Requirements
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                Platinum Certificate recognition requires comprehensive documentation of your institution's 
                educational social impact. This includes impact reports, testimonials, and measurable outcomes.
              </p>
              <div className="bg-gradient-to-r from-gray-400/20 to-gray-600/20 rounded-lg p-4">
                <p className="text-gray-300 text-sm font-medium">
                  📋 <strong>Required Documents:</strong> Impact assessment reports, beneficiary testimonials, 
                  partnership agreements, financial impact statements, and measurable outcome data.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatinumAwards;