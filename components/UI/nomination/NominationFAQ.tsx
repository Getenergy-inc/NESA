"use client";
import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Wallet, Users, Award, Download, BarChart3 } from "lucide-react";
import Link from "next/link";

const NominationFAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqData = [
    {
      question: "Is a wallet required?",
      answer: "Yes. All voting, donations, and nominations require an AGC wallet. This ensures transparency and enables direct scholarship funding through every vote cast.",
      icon: Wallet,
      color: "from-blue-500 to-blue-600",
      actionText: "Top Up Here",
      actionLink: "/wallet"
    },
    {
      question: "Who can nominate?",
      answer: "Anyone — public nominations are welcome in all categories. Whether you're an educator, student, parent, or community member, you can nominate deserving candidates across all award categories.",
      icon: Users,
      color: "from-green-500 to-green-600",
      actionText: "Start Nominating",
      actionLink: "/get-involved/nomination"
    },
    {
      question: "How do I earn free AGC?",
      answer: "Attend webinars and EduAid Africa Expo events (5 AGC per event). You can also earn AGC through community engagement, participating in educational forums, and supporting the NESA-Africa mission.",
      icon: Award,
      color: "from-[#FFC247] to-[#E48900]",
      actionText: "View Events",
      actionLink: "/events"
    },
    {
      question: "What if I'm nominated but not a winner?",
      answer: "You can still earn a Certificate of Recognition if you receive 1,000+ AGC-backed nominations or votes. This ensures that impactful contributors are recognized even if they don't win the top prize.",
      icon: Download,
      color: "from-purple-500 to-purple-600",
      actionText: "Check Status",
      actionLink: "/certificates"
    },
    {
      question: "Are donor certificates available?",
      answer: "Yes — donors who contribute AGC will receive a downloadable Donor Certificate. This recognizes your contribution to the scholarship fund and educational transformation movement.",
      icon: Award,
      color: "from-orange-500 to-orange-600",
      actionText: "Support Nominees",
      actionLink: "/voting"
    },
    {
      question: "How can I check my voting results or impact?",
      answer: "Log in to your dashboard via the NESA-Africa portal. You can track your nominations, votes cast, AGC balance, certificate eligibility, and overall impact on the educational community.",
      icon: BarChart3,
      color: "from-teal-500 to-teal-600",
      actionText: "View Dashboard",
      actionLink: "/profile"
    },
    {
      question: "Where can I download my certificate?",
      answer: "From your user dashboard once thresholds are met and project cycle ends. All certificates are verified and issued after the award cycle completion to ensure authenticity.",
      icon: Download,
      color: "from-red-500 to-red-600",
      actionText: "Access Certificates",
      actionLink: "/certificates"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

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
              <HelpCircle className="w-5 h-5 text-[#FFC247] mr-2" />
              <span className="text-[#FFC247] font-medium">FREQUENTLY ASKED QUESTIONS</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
              ❓ Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Get answers to common questions about nominations, voting, certificates, and participation
            </p>
          </motion.div>

          {/* FAQ Items */}
          <motion.div variants={toTopV} className="max-w-4xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                variants={opacityV}
                className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-2xl overflow-hidden hover:border-[#FFC247]/40 transition-all duration-300"
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-[#FFC247]/5 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`bg-gradient-to-r ${faq.color} p-3 rounded-full flex-shrink-0`}>
                      <faq.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-[#FFC247]">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    {openFAQ === index ? (
                      <ChevronUp className="w-6 h-6 text-[#FFC247]" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-[#FFC247]" />
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === index ? "auto" : 0,
                    opacity: openFAQ === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <div className="pl-16">
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {faq.answer}
                      </p>
                      
                      {faq.actionText && faq.actionLink && (
                        <Link href={faq.actionLink}>
                          <button className={`bg-gradient-to-r ${faq.color} text-white font-semibold px-6 py-2 rounded-full text-sm hover:shadow-lg transition-all duration-300 inline-flex items-center`}>
                            <span className="mr-2">{faq.actionText}</span>
                            <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Help Section */}
          <motion.div variants={opacityV} className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 rounded-2xl p-8 border border-[#FFC247]/30 text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 p-4 rounded-full mr-4">
                  <HelpCircle className="w-10 h-10 text-[#FFC247]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                  Need More Help?
                </h3>
              </div>
              
              <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
                Can't find the answer you're looking for? Our support team is here to help you 
                navigate the nomination and voting process.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 p-6 rounded-xl border border-[#FFC247]/20 mb-4">
                    <Users className="w-12 h-12 text-[#FFC247] mx-auto mb-4" />
                    <h4 className="text-[#FFC247] font-semibold text-lg mb-2">Community Support</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Join our community forums for peer-to-peer help
                    </p>
                    <Link href="/community">
                      <button className="bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] font-semibold px-4 py-2 rounded-full text-sm hover:shadow-lg transition-all duration-300">
                        Join Community
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 p-6 rounded-xl border border-[#FFC247]/20 mb-4">
                    <HelpCircle className="w-12 h-12 text-[#FFC247] mx-auto mb-4" />
                    <h4 className="text-[#FFC247] font-semibold text-lg mb-2">Help Center</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Browse our comprehensive help documentation
                    </p>
                    <Link href="/help">
                      <button className="bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] font-semibold px-4 py-2 rounded-full text-sm hover:shadow-lg transition-all duration-300">
                        Visit Help Center
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 p-6 rounded-xl border border-[#FFC247]/20 mb-4">
                    <Wallet className="w-12 h-12 text-[#FFC247] mx-auto mb-4" />
                    <h4 className="text-[#FFC247] font-semibold text-lg mb-2">Direct Support</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Contact our support team directly for assistance
                    </p>
                    <Link href="/contact">
                      <button className="bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] font-semibold px-4 py-2 rounded-full text-sm hover:shadow-lg transition-all duration-300">
                        Contact Support
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={opacityV} className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-r from-[#33270E]/60 to-[#191307]/60 rounded-2xl p-6 border border-[#FFC247]/20">
              <h4 className="text-xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                📬 Contact Information
              </h4>
              <div className="space-y-2 text-gray-300">
                <p><strong>Email:</strong> juliusaawoniyi@gmail.com</p>
                <p><strong>Phone:</strong> +234 805 667 7770</p>
                <p><strong>Address:</strong> 19 Godwin Okigbo Street, Marsha Kilo, Surulere, Lagos, Nigeria</p>
                <p><strong>Host:</strong> Santos Creations Educational Foundation (SCEF)</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NominationFAQ;