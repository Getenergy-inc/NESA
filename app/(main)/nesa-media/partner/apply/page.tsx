"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { X, CheckCircle, AlertCircle, ArrowLeft, Building, Mail, User, Globe, Phone, FileText, Wifi, WifiOff, RefreshCw } from "lucide-react";
import Link from "next/link";
import { PartnerLanguageProvider, usePartnerLanguage } from "@/lib/i18n/PartnerLanguageContext";
import PartnerLanguageSelector from "@/components/UI/PartnerLanguageSelector/PartnerLanguageSelector";
import ClientOnly from "@/components/UI/ClientOnly/ClientOnly";

// Helper function to check connection status
const checkConnectionStatus = () => {
  return typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' 
    ? navigator.onLine 
    : true; // Default to true if we can't detect
};

// Main content component that uses translations
const PartnerApplicationContent = () => {
  const router = useRouter();
  const { t, currentLanguage } = usePartnerLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    brandName: "",
    brandLink: "",
    description: "",
    partnershipGoals: "",
  });
  
  // Monitor connection status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (error) {
        setError("");
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setError(t('partner.apply.errors.noConnection'));
    };

    setIsOnline(checkConnectionStatus());
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [error]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  // Retry with backoff helper
  const retryWithBackoff = async (fn: () => Promise<any>, maxRetries: number, initialDelay: number) => {
    let retries = 0;
    let delay = initialDelay;
    
    while (retries < maxRetries) {
      try {
        return await fn();
      } catch (error) {
        retries++;
        if (retries >= maxRetries) throw error;
        
        // Wait before retrying with exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      }
    }
  };
  
  const handleRetry = async () => {
    setIsRetrying(true);
    setError("");
    await handleSubmit(null, true);
  };

  const handleSubmit = async (e: React.FormEvent | null, isRetry = false) => {
    if (e) e.preventDefault();
    
    if (!isRetry) {
      setError("");
      setRetryCount(0);
    }
    
    setIsSubmitting(true);

    // Check connection first
    if (!checkConnectionStatus()) {
      setError(t('partner.apply.errors.noConnection'));
      setIsSubmitting(false);
      setIsRetrying(false);
      return;
    }

    // Validation
    if (!formData.name.trim()) {
      setError(t('partner.apply.errors.nameRequired'));
      setIsSubmitting(false);
      setIsRetrying(false);
      return;
    }
    if (!formData.email.trim()) {
      setError(t('partner.apply.errors.emailRequired'));
      setIsSubmitting(false);
      setIsRetrying(false);
      return;
    }
    if (!validateEmail(formData.email)) {
      setError(t('partner.apply.errors.invalidEmail'));
      setIsSubmitting(false);
      setIsRetrying(false);
      return;
    }
    if (!formData.phone.trim()) {
      setError(t('partner.apply.errors.phoneRequired'));
      setIsSubmitting(false);
      setIsRetrying(false);
      return;
    }
    if (!formData.brandName.trim()) {
      setError(t('partner.apply.errors.brandNameRequired'));
      setIsSubmitting(false);
      setIsRetrying(false);
      return;
    }
    if (!formData.brandLink.trim()) {
      setError(t('partner.apply.errors.brandLinkRequired'));
      setIsSubmitting(false);
      setIsRetrying(false);
      return;
    }
    if (!validateUrl(formData.brandLink)) {
      setError(t('partner.apply.errors.invalidUrl'));
      setIsSubmitting(false);
      setIsRetrying(false);
      return;
    }
    if (!formData.description.trim()) {
      setError(t('partner.apply.errors.descriptionRequired'));
      setIsSubmitting(false);
      setIsRetrying(false);
      return;
    }
    if (!formData.partnershipGoals.trim()) {
      setError(t('partner.apply.errors.goalsRequired'));
      setIsSubmitting(false);
      setIsRetrying(false);
      return;
    }

    try {
      // Submit form data to API with retry logic
      const submitWithRetry = async () => {
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), 30000);
        });
        
        const fetchPromise = fetch("/api/partner-application", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        
        // Race the fetch against a timeout
        const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }
        
        return data;
      };
      
      // Use retry with backoff if this is a retry attempt
      const result = isRetry 
        ? await retryWithBackoff(submitWithRetry, 3, 1000)
        : await submitWithRetry();

      // Success
      setIsSuccess(true);
      setIsSubmitting(false);
      setIsRetrying(false);
      setRetryCount(0);
    } catch (err: any) {
      console.error("Partner application error:", err);
      
      // Handle specific error types
      if (err.message === 'Request timeout') {
        setError("Request timed out. The server is taking too long to respond. Please try again.");
      } else if (err.message.includes('fetch')) {
        setError("Network error. Please check your connection and try again.");
      } else if (err.message.includes('already registered')) {
        setError("This email is already registered as a partner. Please use a different email.");
      } else {
        setError(err.message || "Failed to submit application. Please try again.");
      }
      
      setIsSubmitting(false);
      setIsRetrying(false);
      setRetryCount(prev => prev + 1);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const formFieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.5 }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 relative">
      {/* Language Selector - Top Right */}
      <div className="absolute top-8 right-8 z-20">
        <ClientOnly fallback={<div className="w-24 h-10" />}>
          <PartnerLanguageSelector />
        </ClientOnly>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/nesa-media/partner" className="inline-flex items-center text-gray-600 hover:text-deepGold transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            <span>{t('partner.apply.backLink')}</span>
          </Link>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8 md:p-12">
            <motion.div variants={itemVariants} className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('partner.apply.title')}
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t('partner.apply.description')}
              </p>
            </motion.div>

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="py-8"
              >
                <div className="min-h-[60vh] bg-gradient-to-br from-whiteGold via-white to-xlGold flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-2xl mx-auto text-center"
                  >
                    <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100 relative overflow-hidden">
                      {/* Background decoration */}
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primaryGold to-deepGold" />
                      
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                        className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8"
                      >
                        <CheckCircle className="w-12 h-12 text-white" />
                      </motion.div>
                      
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-4xl font-bold text-gray-900 mb-6"
                      >
                        {t('partner.apply.success.title')} 🎉
                      </motion.h2>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-lg text-gray-600 mb-6 leading-relaxed"
                      >
                        {t('partner.apply.success.message1')}
                      </motion.p>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="text-lg text-gray-600 mb-10 leading-relaxed"
                      >
                        {t('partner.apply.success.message2')} <span className="font-semibold text-deepGold">{t('partner.apply.success.days')}</span> {t('partner.apply.success.message3')}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                      >
                        <button
                          onClick={() => {
                            window.scrollTo(0, 0);
                            router.push('/nesa-media/partner');
                          }}
                          className="bg-gradient-to-r from-primaryGold to-deepGold hover:from-deepGold hover:to-primaryGold text-black px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
                          {t('partner.apply.success.backButton')}
                        </button>
                        <button
                          onClick={() => {
                            setIsSuccess(false);
                            setFormData({
                              name: "",
                              email: "",
                              phone: "",
                              brandName: "",
                              brandLink: "",
                              description: "",
                              partnershipGoals: "",
                            });
                          }}
                          className="border-2 border-primaryGold text-primaryGold hover:bg-primaryGold hover:text-black px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                        >
                          {t('partner.apply.success.submitAnother')}
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                variants={containerVariants}
              >
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600"
                  >
                    <AlertCircle size={20} />
                    <span>{error}</span>
                  </motion.div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div custom={0} variants={formFieldVariants} className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('partner.apply.form.name')} *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGold focus:border-transparent transition-all"
                        placeholder={t('partner.apply.form.namePlaceholder')}
                      />
                    </div>
                  </motion.div>

                  <motion.div custom={1} variants={formFieldVariants} className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('partner.apply.form.email')} *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGold focus:border-transparent transition-all"
                        placeholder={t('partner.apply.form.emailPlaceholder')}
                      />
                    </div>
                  </motion.div>

                  <motion.div custom={2} variants={formFieldVariants} className="relative">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('partner.apply.form.phone')} *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGold focus:border-transparent transition-all"
                        placeholder={t('partner.apply.form.phonePlaceholder')}
                      />
                    </div>
                  </motion.div>

                  <motion.div custom={3} variants={formFieldVariants} className="relative">
                    <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-1">
                      Brand/Company Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="brandName"
                        type="text"
                        value={formData.brandName}
                        onChange={(e) => handleInputChange("brandName", e.target.value)}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGold focus:border-transparent transition-all"
                        placeholder="Enter your brand/company name"
                      />
                    </div>
                  </motion.div>
                </div>

                <motion.div custom={4} variants={formFieldVariants} className="relative">
                  <label htmlFor="brandLink" className="block text-sm font-medium text-gray-700 mb-1">
                    Brand/Company Website *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="brandLink"
                      type="url"
                      value={formData.brandLink}
                      onChange={(e) => handleInputChange("brandLink", e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGold focus:border-transparent transition-all"
                      placeholder="https://yourbrand.com"
                    />
                  </div>
                </motion.div>

                <motion.div custom={5} variants={formFieldVariants} className="relative">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Brand/Company Description *
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGold focus:border-transparent transition-all min-h-[100px]"
                      placeholder="Briefly describe your brand/company and what you do"
                    />
                  </div>
                </motion.div>

                <motion.div custom={6} variants={formFieldVariants} className="relative">
                  <label htmlFor="partnershipGoals" className="block text-sm font-medium text-gray-700 mb-1">
                    Partnership Goals *
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="partnershipGoals"
                      value={formData.partnershipGoals}
                      onChange={(e) => handleInputChange("partnershipGoals", e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGold focus:border-transparent transition-all min-h-[100px]"
                      placeholder="What are your goals for this partnership? How do you envision working with us?"
                    />
                  </div>
                </motion.div>

                <motion.div 
                  custom={7} 
                  variants={formFieldVariants}
                  className="pt-4"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-primaryGold to-deepGold hover:from-deepGold hover:to-primaryGold text-black font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] hover:shadow-lg"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('partner.apply.form.submitting')}
                      </>
                    ) : (
                      <>
                        {t('partner.apply.form.submit')}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </>
                    )}
                  </button>
                </motion.div>
              </motion.form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Wrapper component that provides the language context
const PartnerApplicationPage = () => {
  return (
    <PartnerLanguageProvider>
      <PartnerApplicationContent />
    </PartnerLanguageProvider>
  );
};

export default PartnerApplicationPage;