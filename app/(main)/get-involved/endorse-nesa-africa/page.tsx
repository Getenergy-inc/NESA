"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Heart,
  Users,
  Globe,
  Award,
  Building2,
  GraduationCap,
  Handshake,
  ArrowRight,
  Calendar,
  CheckCircle
} from 'lucide-react';
import Button from '@/components/Common/Button';

const EndorseNesaAfricaPage = () => {
  const endorsementCategories = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Bilateral & Multilateral Agencies",
      examples: "UN, UNESCO, AU, ECOWAS, GIZ, World Bank",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Government Ministries & Parastatals",
      examples: "MoEs, LGAs, Parliamentary Committees",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Handshake className="w-6 h-6" />,
      title: "Corporate Institutions",
      examples: "CSR Units, ESG-aligned Enterprises",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Diaspora Organizations",
      examples: "African community groups in UK, US, Canada",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Academic Institutions",
      examples: "Universities, Research Think Tanks",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Development Foundations",
      examples: "Ford, Mastercard Foundation, Mo Ibrahim",
      color: "from-pink-500 to-pink-600"
    }
  ];

  const endorsementTiers = [
    {
      name: "Free Endorsement",
      subtitle: "Goodwill Support",
      price: "Free",
      features: [
        "Logo on Wall of Endorsers",
        "Digital Certificate",
        "Optional Video/Letter Upload",
        "Newsletter Feature Possibility"
      ],
      buttonText: "Submit Free Endorsement",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Bronze Endorser",
      subtitle: "$500 - $999",
      price: "$500+",
      features: [
        "Certificate of Endorsement",
        "2 Gala Tickets",
        "Public Recognition",
        "Logo Display"
      ],
      buttonText: "Choose Bronze",
      buttonVariant: "filled" as const,
      popular: false
    },
    {
      name: "Silver Endorser",
      subtitle: "$1,000 - $2,499",
      price: "$1,000+",
      features: [
        "Public Acknowledgement",
        "Logo on Endorsers Wall",
        "3 Gala Tickets",
        "Social Media Feature"
      ],
      buttonText: "Choose Silver",
      buttonVariant: "filled" as const,
      popular: true
    },
    {
      name: "Gold Endorser",
      subtitle: "$2,500 - $4,999",
      price: "$2,500+",
      features: [
        "Featured in NESA Magazine",
        "VVIP Table Access",
        "Media Interview Opportunity",
        "Premium Recognition"
      ],
      buttonText: "Choose Gold",
      buttonVariant: "filled" as const,
      popular: false
    }
  ];

  const benefits = [
    {
      icon: <CheckCircle className="w-6 h-6 text-[#ea580c]" />,
      title: "Credibility & Legacy Impact",
      description: "Be part of a historic educational movement aligned with SDG 4, AU Agenda 2063, and ESG values."
    },
    {
      icon: <Globe className="w-6 h-6 text-[#ea580c]" />,
      title: "Pan-African Influence",
      description: "Reach 40M+ Africans digitally, influence 5,000 education stakeholders."
    },
    {
      icon: <Award className="w-6 h-6 text-[#ea580c]" />,
      title: "Recognition Across Media",
      description: "NESA TV interviews, gala visibility, and social media coverage."
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-[#ea580c]" />,
      title: "Champion Access to Education",
      description: "Back scholarships, innovation projects, and local chapter expansion."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#17120a] via-[#1a140b] to-[#17120a] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#FFB92E] to-[#ea580c] bg-clip-text text-transparent">
              Endorse the Movement for Sustainable Education Impact
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto">
              Join organizations across the world in endorsing the NESA-Africa 2025 mission. 
              Support 6,000+ nominees and 5,000 changemakers across 54 African countries.
            </p>
            
            {/* Key Deadlines */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center gap-2 bg-[#ea580c]/20 px-4 py-2 rounded-lg">
                <Calendar className="w-5 h-5 text-[#ea580c]" />
                <span className="text-sm">Nominee Endorsement: Sept 20, 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-[#ea580c]/20 px-4 py-2 rounded-lg">
                <Calendar className="w-5 h-5 text-[#ea580c]" />
                <span className="text-sm">Institutional Endorsement: Nov 30, 2025</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-involved/endorse-nesa-africa/upload">
                <Button
                  text="Sign Up to Endorse"
                  variant="filled"
                  size="large"
                  className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-8 py-4 text-lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                />
              </Link>
              <Link href="/get-involved/endorse-nesa-africa/showcase">
                <Button
                  text="View All Endorsers"
                  variant="outline"
                  size="large"
                  className="border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white px-8 py-4 text-lg"
                />
              </Link>
              <Link href="/get-involved/sponsor">
                <Button
                  text="Become a Sponsor"
                  variant="outline"
                  size="large"
                  className="border-white text-white hover:bg-white hover:text-[#17120a] px-8 py-4 text-lg"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Does It Mean Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Does It Mean to Endorse NESA-Africa?
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Endorsing NESA-Africa means supporting a continental movement for education transformation.
              It means standing behind 6,000+ nominees, 5,000 change-makers, and a roadmap for scholarship
              access, education equity, and EdTech innovation.
            </p>
            <p className="text-xl font-semibold text-[#ea580c] mt-4">
              You're not just endorsing an award — you're backing a blueprint for Africa's education future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who Can Endorse Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Who Can Endorse NESA-Africa 2025?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We welcome endorsement from 16 institutional categories across Africa and the diaspora
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {endorsementCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-white mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {category.examples}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/get-involved/endorse-nesa-africa/upload">
              <Button
                text="Sign Up to Endorse Now"
                variant="filled"
                size="large"
                className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-8 py-4 text-lg"
                icon={<ArrowRight className="w-5 h-5" />}
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Endorse Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Endorse NESA-Africa?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Strategic value and alignment for your organization
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex gap-4 p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Endorsement Tiers Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Endorsement Tiers & Recognition
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the level of support that aligns with your organization's capacity and goals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {endorsementTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                  tier.popular
                    ? 'border-[#ea580c] bg-gradient-to-br from-[#ea580c]/5 to-[#ea580c]/10'
                    : 'border-gray-200 bg-white hover:border-[#ea580c]/30'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#ea580c] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {tier.subtitle}
                  </p>
                  <p className="text-2xl font-bold text-[#ea580c]">
                    {tier.price}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#ea580c] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/get-involved/endorse-nesa-africa/upload" className="block">
                  <Button
                    text={tier.buttonText}
                    variant={tier.buttonVariant}
                    size="medium"
                    fullWidth
                    className={
                      tier.buttonVariant === 'filled'
                        ? 'bg-[#ea580c] hover:bg-[#dc2626] text-white'
                        : 'border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white'
                    }
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#17120a] via-[#1a140b] to-[#17120a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Endorse NESA-Africa 2025?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the movement for sustainable education impact across Africa.
              Your endorsement makes a difference.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-involved/endorse-nesa-africa/upload">
                <Button
                  text="Submit Your Endorsement"
                  variant="filled"
                  size="large"
                  className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-8 py-4 text-lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                />
              </Link>
              <Link href="/get-involved/endorse-nesa-africa/showcase">
                <Button
                  text="View Current Endorsers"
                  variant="outline"
                  size="large"
                  className="border-white text-white hover:bg-white hover:text-[#17120a] px-8 py-4 text-lg"
                />
              </Link>
            </div>

            <div className="mt-8 text-sm text-gray-400">
              <p>Questions? Contact us at <a href="mailto:endorse@nesa.africa" className="text-[#ea580c] hover:underline">endorse@nesa.africa</a></p>
              <p>Phone/WhatsApp: <a href="tel:+2349079621110" className="text-[#ea580c] hover:underline">+234-907-962-1110</a></p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EndorseNesaAfricaPage;
