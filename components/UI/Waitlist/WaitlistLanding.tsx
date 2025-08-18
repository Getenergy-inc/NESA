"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Users,
  Award,
  Globe,
  Heart,
  BookOpen,
  Star,
  CheckCircle,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import Image from 'next/image';
import styles from './waitlist.module.css';
import { useScrollToTopOnMount } from '@/lib/hooks/useScrollToTop';
import { WaitlistLanguageProvider, useWaitlistLanguage } from '@/lib/i18n/WaitlistLanguageContext';
import LanguageSelector from '@/components/UI/LanguageSelector/LanguageSelector';
import ClientOnly from '@/components/UI/ClientOnly/ClientOnly';

// Main content component that uses translations
const WaitlistLandingContent: React.FC = () => {
  const router = useRouter();
  const { t } = useWaitlistLanguage();

  // Ensure page starts at the top
  useScrollToTopOnMount();

  const features = [
    {
      icon: <Award className="w-6 h-6" />,
      title: t('waitlist.features.voteNominate.title'),
      description: t('waitlist.features.voteNominate.description')
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('waitlist.features.becomeAmbassador.title'),
      description: t('waitlist.features.becomeAmbassador.description')
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: t('waitlist.features.joinWebinars.title'),
      description: t('waitlist.features.joinWebinars.description')
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: t('waitlist.features.sponsorPartner.title'),
      description: t('waitlist.features.sponsorPartner.description')
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: t('waitlist.features.applyJudge.title'),
      description: t('waitlist.features.applyJudge.description')
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: t('waitlist.features.joinChapters.title'),
      description: t('waitlist.features.joinChapters.description')
    }
  ];

  const stats = [
    { number: "54", label: t('waitlist.stats.africanCountries'), suffix: "" },
    { number: "10K+", label: t('waitlist.stats.educatorsImpacted'), suffix: "" },
    { number: "500+", label: t('waitlist.stats.awardsGiven'), suffix: "" },
    { number: "1M+", label: t('waitlist.stats.studentsReached'), suffix: "" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bg/hero-image.jpeg"
            alt="NESA Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-primaryGold/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Floating Elements */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className={`absolute top-20 left-10 w-20 h-20 bg-primaryGold/20 rounded-full blur-xl ${styles.floatingElement}`}
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className={`absolute top-40 right-20 w-32 h-32 bg-deepGold/20 rounded-full blur-xl ${styles.floatingElement}`}
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className={`absolute bottom-40 left-20 w-24 h-24 bg-whiteGold/30 rounded-full blur-xl ${styles.floatingElement}`}
        />

        {/* Language Selector - Top Right */}
        <div className="absolute top-8 right-8 z-20">
          <ClientOnly fallback={<div className="w-24 h-10" />}>
            <LanguageSelector />
          </ClientOnly>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-primaryGold/10 backdrop-blur-sm border border-primaryGold/20 rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-primaryGold" />
              <span className="text-primaryGold font-semibold">{t('waitlist.hero.badge')}</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {t('waitlist.hero.title')}
            <span className="bg-gradient-to-r from-primaryGold to-deepGold bg-clip-text text-transparent">
              {" "}{t('waitlist.hero.titleHighlight')}{" "}
            </span>
            {t('waitlist.hero.titleEnd')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            {t('waitlist.hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                router.push('/waitlist/form');
              }}
              className={`group bg-gradient-to-r from-primaryGold to-deepGold hover:from-deepGold hover:to-primaryGold text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3 ${styles.primaryButton}`}
            >
              {t('waitlist.hero.joinWaitlistButton')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="group border-2 border-white/30 hover:border-primaryGold text-white hover:text-primaryGold px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
            >
              {t('waitlist.hero.learnMoreButton')}
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primaryGold mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-primaryGold rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 bg-primaryGold/10 text-primaryGold px-4 py-2 rounded-full text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                {t('waitlist.about.badge')}
              </span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('waitlist.about.title')}
              <span className="bg-gradient-to-r from-primaryGold to-deepGold bg-clip-text text-transparent">
                {" "}{t('waitlist.about.titleHighlight')}
              </span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('waitlist.about.description')}
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primaryGold to-deepGold rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primaryGold transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primaryGold via-deepGold to-primaryGold">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              {t('waitlist.cta.title')}
            </h2>

            <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
              {t('waitlist.cta.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  router.push('/waitlist/form');
                }}
                className="group bg-black hover:bg-gray-900 text-primaryGold px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5" />
                {t('waitlist.cta.joinButton')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-8 text-black/60">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>{t('waitlist.cta.benefits.freeToJoin')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>{t('waitlist.cta.benefits.exclusiveAccess')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>{t('waitlist.cta.benefits.earlyUpdates')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Main wrapper component with language provider
const WaitlistLanding: React.FC = () => {
  return (
    <WaitlistLanguageProvider>
      <WaitlistLandingContent />
    </WaitlistLanguageProvider>
  );
};

export default WaitlistLanding;