"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PartnerLanguageProvider, usePartnerLanguage } from "@/lib/i18n/PartnerLanguageContext";
import PartnerLanguageSelector from "@/components/UI/PartnerLanguageSelector/PartnerLanguageSelector";
import ClientOnly from "@/components/UI/ClientOnly/ClientOnly";

// Main content component that uses translations
const PartnersPageContent = () => {
  const { t } = usePartnerLanguage();
  
  return (
    <div className="relative">
      {/* Language Selector - Top Right (positioned below navbar) */}
      <div className="absolute top-24 md:top-32 right-8 z-[100]">
        <ClientOnly fallback={<div className="w-24 h-10" />}>
          <PartnerLanguageSelector />
        </ClientOnly>
      </div>
      {/* Hero Section with Background Image */}
      <section className="min-h-screen relative">
        <Image
          src="/images/partnerhero.jpg"
          alt="Partnership background"
          width={1920}
          height={1080}
          className="w-full h-full object-cover absolute top-0 left-0"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-bold text-5xl md:text-6xl mb-6 text-deepGold"
            >
              {t('partner.hero.title')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 leading-relaxed"
            >
              {t('partner.hero.description')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col md:flex-row gap-4 items-center justify-center"
            >
              <Link href="/nesa-media/partner/apply">
                <button className="bg-deepGold hover:bg-darkGold text-black font-bold px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105">
                  {t('partner.hero.button')}
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About NESA Media Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-2"
              >
                <div className="w-10 h-10 bg-deepGold rounded-full flex items-center justify-center">
                  <span className="text-black font-bold">NM</span>
                </div>
                <span className="text-deepGold text-sm font-semibold tracking-wider uppercase">
                  {t('partner.about.badge')}
                </span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                {t('partner.about.title')}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                {t('partner.about.description1')}
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                {t('partner.about.description2')}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-4"
              >
                <Link href="/nesa-media">
                  <button className="bg-transparent hover:bg-deepGold/10 border-2 border-deepGold text-deepGold font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                    {t('partner.about.button')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <motion.div 
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-xl overflow-hidden h-48 md:h-64"
              >
                <Image
                  src="/images/media/1.png"
                  alt="NESA Media content"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-xl overflow-hidden h-48 md:h-64 mt-8"
              >
                <Image
                  src="/images/media/2.png"
                  alt="NESA Media content"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-xl overflow-hidden h-48 md:h-64"
              >
                <Image
                  src="/images/media/3.png"
                  alt="NESA Media content"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-xl overflow-hidden h-48 md:h-64 mt-8"
              >
                <Image
                  src="/images/media/4.png"
                  alt="NESA Media content"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-6 text-gray-900"
          >
            {t('partner.benefits.title')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center text-gray-600 max-w-3xl mx-auto mb-16 text-lg"
          >
            {t('partner.benefits.description')}
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: t('partner.benefits.benefit1.title'),
                desc: t('partner.benefits.benefit1.description')
              },
              {
                number: "02",
                title: t('partner.benefits.benefit2.title'),
                desc: t('partner.benefits.benefit2.description')
              },
              {
                number: "03",
                title: t('partner.benefits.benefit3.title'),
                desc: t('partner.benefits.benefit3.description')
              }
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="text-center p-8 rounded-xl bg-gray-50 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-deepGold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-black">{benefit.number}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-6 text-gray-900"
          >
            {t('partner.process.title')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center text-gray-600 max-w-3xl mx-auto mb-16 text-lg"
          >
            {t('partner.process.description')}
          </motion.p>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: t('partner.process.step1.title'),
                  desc: t('partner.process.step1.description'),
                },
                {
                  step: "02",
                  title: t('partner.process.step2.title'),
                  desc: t('partner.process.step2.description'),
                },
                {
                  step: "03",
                  title: t('partner.process.step3.title'),
                  desc: t('partner.process.step3.description'),
                },
                {
                  step: "04",
                  title: t('partner.process.step4.title'),
                  desc: t('partner.process.step4.description'),
                },
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="text-center relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="w-20 h-20 bg-deepGold rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <span className="text-2xl font-bold text-black">
                      {item.step}
                    </span>
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-darkGold/30 transform translate-x-4"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-6"
          >
            {t('partner.cta.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-4 text-gray-300 max-w-2xl mx-auto"
          >
            {t('partner.cta.description1')}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl mb-8 text-deepGold max-w-2xl mx-auto"
          >

            Partner with us
          </button>
            {t('partner.cta.description2')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/nesa-media/partner/apply">
              <button className="bg-deepGold hover:bg-darkGold text-black font-bold px-8 py-4 text-lg rounded-xl transition-all duration-300">
                {t('partner.cta.button')}
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              Partnership Application
            </h3>

            {isSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-green-600 mb-2">
                  Success!
                </h4>
                <p className="text-gray-600">
                  Your application has been submitted successfully. We'll be in
                  touch soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600">
                    <AlertCircle size={16} />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGold focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGold focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="brandName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Brand Name *
                  </label>
                  <input
                    id="brandName"
                    type="text"
                    value={formData.brandName}
                    onChange={(e) =>
                      handleInputChange("brandName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGold focus:border-transparent"
                    placeholder="Enter your brand name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="brandLink"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Brand Website *
                  </label>
                  <input
                    id="brandLink"
                    type="url"
                    value={formData.brandLink}
                    onChange={(e) =>
                      handleInputChange("brandLink", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGold focus:border-transparent"
                    placeholder="https://yourbrand.com"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-deepGold hover:bg-darkGold text-black font-bold py-3 rounded-xl transition-colors"
                >
                  Partner
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>

// Wrapper component that provides the language context
const PartnersPage = () => {
  return (
    <PartnerLanguageProvider>
      <PartnersPageContent />
    </PartnerLanguageProvider>
  );
};

export default PartnersPage;
