"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import {
  Users,
  ArrowRight,
  Scale,
  Award,
  CheckCircle,
  UserPlus,
  Heart,
  Target
} from "lucide-react";
import Link from 'next/link';
import EnhancedJudgeNominationForm from '@/components/UI/judgenominate/EnhancedNominateForm';

// Benefits of nominating a judge
const NOMINATION_BENEFITS = [
  {
    icon: Award,
    title: "Recognize Excellence",
    description: "Help identify outstanding professionals who can evaluate educational excellence"
  },
  {
    icon: Users,
    title: "Expand the Panel",
    description: "Contribute to building a diverse and expert panel of judges"
  },
  {
    icon: Target,
    title: "Shape Standards",
    description: "Influence the quality and standards of education evaluation across Africa"
  },
  {
    icon: Heart,
    title: "Give Back",
    description: "Support the growth and recognition of educational excellence in Africa"
  }
];

// Hero Section Component
const NominationHeroSection: React.FC = () => {
  return (
    <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/schoolboy.png"
          alt="Nominate a Judge for NESA-Africa"
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
            <UserPlus className="w-5 h-5 text-orange-400 mr-2" />
            <span className="text-orange-300 font-medium">Nominate a Judge</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight"
        >
          Recommend an Expert<br />
          <span className="text-orange-400">for Our Judges Panel</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-5xl mx-auto font-light mb-10"
        >
          Know someone who would make an excellent NESA-Africa judge? Nominate experienced professionals, academics, and education leaders to join our prestigious panel of evaluators.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/judgeapply"
            className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 flex items-center group"
          >
            Back to Judges Arena
            <Scale className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

// Benefits Section Component
const BenefitsSection: React.FC = () => {
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
            Why Nominate a Judge?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your nomination helps us build a diverse, expert panel that maintains the highest standards of educational evaluation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {NOMINATION_BENEFITS.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
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

const JudgeNomination = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <NominationHeroSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Enhanced Nomination Form */}
      <EnhancedJudgeNominationForm />
    </div>
  );
};

export default JudgeNomination;