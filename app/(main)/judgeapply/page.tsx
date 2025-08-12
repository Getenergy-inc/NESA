'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import {
  Scale,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Calendar,
  Shield,
  UserCheck,
  Clock,
  Trophy,
  Heart
} from "lucide-react";
import Link from 'next/link';


// Judge application types
const APPLICATION_TYPES = [
  {
    id: 'individual',
    title: 'Individual Expert',
    description: 'Independent professionals applying personally',
    icon: UserCheck,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'organization',
    title: 'Partner Organization',
    description: 'On behalf of partner organization',
    icon: Users,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'sponsor',
    title: 'Sponsor-Backed Judge',
    description: 'Provided by official sponsors',
    icon: Award,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'institutional',
    title: 'Strategic Partner Institution',
    description: 'Via strategic partner institution',
    icon: Shield,
    color: 'from-orange-500 to-orange-600'
  }
];

// Timeline data
const TIMELINE_EVENTS = [
  {
    date: 'June 10, 2025',
    title: 'Applications Open',
    description: 'Judge nominations and applications begin',
    icon: Calendar,
    status: 'upcoming'
  },
  {
    date: 'July 15, 2025',
    title: 'Application Deadline',
    description: 'Final day for judge applications',
    icon: Clock,
    status: 'upcoming'
  },
  {
    date: 'July 20, 2025',
    title: 'Judges Announcement',
    description: 'Selected judges are confirmed',
    icon: CheckCircle,
    status: 'upcoming'
  },
  {
    date: 'August 1 - Sept 15, 2025',
    title: 'Evaluation Period',
    description: 'Online judging and scoring phase',
    icon: Scale,
    status: 'upcoming'
  }
];

// Benefits data
const JUDGE_BENEFITS = [
  {
    icon: Award,
    title: 'Digital Certification',
    description: 'Receive "NESA-Africa 2025 Certified Judge" badge and e-certificate'
  },
  {
    icon: Trophy,
    title: 'Recognition',
    description: 'Featured in official report and NESA TV Judges Hall'
  },
  {
    icon: Users,
    title: 'Networking',
    description: 'Connect with education leaders across Africa and diaspora'
  },
  {
    icon: Heart,
    title: 'Impact',
    description: 'Shape the future of education by recognizing excellence'
  }
];

// Hero Section Component
const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/judgeapply.png"
          alt="NESA-Africa Judges Arena"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-white px-6 md:px-12 lg:px-16 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="inline-flex items-center bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 rounded-full px-6 py-2 mb-6">
            <Scale className="w-5 h-5 text-orange-400 mr-2" />
            <span className="text-orange-300 font-medium">NESA-Africa 2025 Judges Arena</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight"
        >
          Shape Africa's Educational Future<br />
          <span className="text-orange-400">Become a Certified Judge</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-5xl mx-auto font-light mb-10"
        >
          Join Africa's most prestigious education awards as a certified judge. Help recognize excellence, innovation, and impact across the continent while connecting with education leaders and change-makers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/judge-application-form"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center group"
          >
            Apply as Judge
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/Judgesnominate"
            className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 flex items-center group"
          >
            Nominate a Judge
            <Users className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6"
        >
          <Link
            href="/judge-status"
            className="text-orange-300 hover:text-orange-200 transition-colors text-sm underline"
          >
            Check Application Status
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

// Application Types Section Component
const ApplicationTypesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Four Pathways to Become a Judge
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the application pathway that best fits your profile and expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {APPLICATION_TYPES.map((type, index) => {
            const IconComponent = type.icon;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {type.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {type.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Timeline Section Component
const TimelineSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Judges Arena Timeline 2025
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Key dates and milestones for the NESA-Africa 2025 judging process
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-orange-300 rounded-full hidden md:block"></div>

          <div className="space-y-8 md:space-y-12">
            {TIMELINE_EVENTS.map((event, index) => {
              const IconComponent = event.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8`}
                >
                  <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'} text-center md:mb-0 mb-4`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="text-orange-600 font-semibold text-sm mb-2">
                        {event.date}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Benefits Section Component
const BenefitsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Become a NESA Judge?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join a prestigious community of education leaders and make a lasting impact on Africa's educational landscape
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {JUDGE_BENEFITS.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
// Call to Action Section Component
const CallToActionSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Shape Africa's Educational Future?
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Join the most prestigious education awards in Africa. Applications are now open for qualified professionals, academics, and education experts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/judge-application-form"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center group"
            >
              Start Your Application
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/about-judges"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 flex items-center group"
            >
              Learn More
              <BookOpen className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Judges Arena Landing Page Component
const JudgesArenaLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Application Types Section */}
      <ApplicationTypesSection />

      {/* Timeline Section */}
      <TimelineSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Call to Action Section */}
      <CallToActionSection />
    </div>
  );
};

export default JudgesArenaLandingPage;