"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  Mail,
  User,
  Check,
  Wifi,
  WifiOff,
  RefreshCw,
  AlertTriangle,
  ArrowLeft,
  Sparkles,
  Heart,
  Star,
  ShoppingCart
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import {
  fetchWithTimeout,
  handleApiResponse,
  getUserFriendlyErrorMessage,
  retryWithBackoff,
  checkConnectionStatus,
  NetworkError,
  TimeoutError
} from '@/lib/utils/errorHandler';
import styles from './waitlist.module.css';
import { useScrollToTopOnMount } from '@/lib/hooks/useScrollToTop';
import { id } from 'zod/v4/locales';
import { Description } from '@headlessui/react';

// Validation schema
const waitlistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  categories: z.array(z.string()).min(1, 'Please select at least one category'),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

const categories = [
  {
    id: 'vote_nominate',
    label: 'Vote or Nominate',
    description: 'Participate in voting and nominate deserving candidates',
    icon: <Star className="w-5 h-5" />,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'become_ambassador',
    label: 'Become Ambassador',
    description: 'Represent NESA in your community and earn rewards',
    icon: <Heart className="w-5 h-5" />,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'join_webinar_expo',
    label: 'Join Webinar/Expo',
    description: 'Attend educational webinars and expo events',
    icon: <Sparkles className="w-5 h-5" />,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'sponsor_csr_partner',
    label: 'Sponsor or CSR Partner',
    description: 'Support education through sponsorship and CSR initiatives',
    icon: <Heart className="w-5 h-5" />,
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 'apply_judge',
    label: 'Apply as a Judge',
    description: 'Evaluate nominees and participate in judging panels',
    icon: <CheckCircle className="w-5 h-5" />,
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 'join_local_chapter',
    label: 'Join Local Chapter',
    description: 'Connect with your local NESA chapter community',
    icon: <User className="w-5 h-5" />,
    color: 'from-teal-500 to-teal-600'
  },
  {
    id: 'join_nesa_team',
    label: 'Join NESA Team',
    description: 'Volunteer or work with the NESA team',
    icon: <Star className="w-5 h-5" />,
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'apply_nrc_volunteer',
    label: 'Apply as NRC Volunteer',
    description: 'Join the Nominee Research Corps to identify education leaders',
    icon: <Sparkles className="w-5 h-5" />,
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    id: 'buy_merchandise',
    label: 'Buy Merchandise',
    description: 'Get exclusive NESA-Africa merchandise',
    icon: <ShoppingCart className='w-5 h-5'/>,
    color: 'from-indigo-500 to indigo-600'
  },
  {
    id: 'get_gala_ticket',
    label: 'Get Gala Ticket',
    description: 'Attend the prestigious NESA-Africa Awards Gala',
    icon: <Star className="w-5 h-5" />,
    color: 'from-yellow-500 to-yellow-600'
  },
  
  {
    id: 'donate',
    label: 'Donate',
    description: 'Support NESA\'s mission to transform education in Africa',
    icon: <Heart className="w-5 h-5" />,
    color: 'from-red-500 to-red-600'
  }
];

const WaitlistFormEnhanced: React.FC = () => {
  const router = useRouter();
  
  // Ensure page starts at the top
  useScrollToTopOnMount();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: '',
      email: '',
      categories: []
    }
  });

  const selectedCategories = watch('categories') || [];
  const watchedName = watch('name');
  const watchedEmail = watch('email');

  // Monitor connection status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (submitError) {
        toast.success('Connection restored!');
        setSubmitError(null);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error('No internet connection detected');
    };

    setIsOnline(checkConnectionStatus());
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [submitError]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const currentCategories = selectedCategories;
    if (checked) {
      setValue('categories', [...currentCategories, categoryId]);
    } else {
      setValue('categories', currentCategories.filter(id => id !== categoryId));
    }
  };

  const submitWithRetry = async (data: WaitlistFormData) => {
    return retryWithBackoff(async () => {
      const response = await fetchWithTimeout('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }, 30000);

      return handleApiResponse(response);
    }, 3, 1000);
  };

  const onSubmit = async (data: WaitlistFormData) => {
    setSubmitError(null);
    setIsSubmitting(true);

    if (!checkConnectionStatus()) {
      setSubmitError('No internet connection. Please check your connection and try again.');
      setIsSubmitting(false);
      toast.error('No internet connection detected');
      return;
    }

    try {
      const result = await submitWithRetry(data);

      if (result.success) {
        setIsSuccess(true);
        setRetryCount(0);
        
        if (result.data.isUpdate) {
          toast.success('Your waitlist preferences have been updated!');
        } else {
          toast.success('Successfully joined the waitlist!');
        }

        if (!result.data.syncedToSheets) {
          toast('Note: Your submission was saved but may take a moment to sync to our tracking system.', {
            icon: '⚠️',
            duration: 5000
          });
        }
      } else {
        throw new Error(result.message || 'Failed to join waitlist');
      }
    } catch (error: any) {
      console.error('Error submitting waitlist:', error);
      
      const friendlyMessage = getUserFriendlyErrorMessage(error);
      setSubmitError(friendlyMessage);
      
      if (error instanceof NetworkError) {
        toast.error('Connection problem. Please check your internet and try again.');
      } else if (error instanceof TimeoutError) {
        toast.error('Request timed out. Please try again.');
      } else if (error.status === 409) {
        toast.error('This email is already on our waitlist!');
      } else {
        toast.error(friendlyMessage);
      }
      
      setRetryCount(prev => prev + 1);
    } finally {
      setIsSubmitting(false);
      setIsRetrying(false);
    }
  };

  const handleRetry = async () => {
    setIsRetrying(true);
    const formData = {
      name: watchedName,
      email: watchedEmail,
      categories: selectedCategories
    };
    await onSubmit(formData);
  };

  const canProceedToStep2 = watchedName.length >= 2 && watchedEmail.includes('@');

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-whiteGold via-white to-xlGold flex items-center justify-center py-12 px-4">
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
              Welcome to the Waitlist! 🎉
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg text-gray-600 mb-10 leading-relaxed"
            >
              Thank you for joining our waitlist! We'll keep you updated on all the exciting 
              opportunities and events you've selected. Get ready to be part of transforming 
              education across Africa! ✨
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  router.push('/');
                }}
                className="bg-gradient-to-r from-primaryGold to-deepGold hover:from-deepGold hover:to-primaryGold text-black px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Back to Home
              </button>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setValue('name', '');
                  setValue('email', '');
                  setValue('categories', []);
                  setCurrentStep(1);
                }}
                className="border-2 border-primaryGold text-primaryGold hover:bg-primaryGold hover:text-black px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                Add Another Person
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-whiteGold via-white to-xlGold py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              router.push('/waitlist');
            }}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primaryGold transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Overview
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Join Our
            <span className="bg-gradient-to-r from-primaryGold to-deepGold bg-clip-text text-transparent">
              {" "}Waitlist
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Be the first to access exclusive NESA opportunities and events
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-primaryGold' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= 1 ? 'bg-primaryGold text-black' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="text-sm font-medium">Personal Info</span>
            </div>
            
            <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-primaryGold' : 'bg-gray-300'}`} />
            
            <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-primaryGold' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= 2 ? 'bg-primaryGold text-black' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="text-sm font-medium">Interests</span>
            </div>
          </div>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative"
        >
          {/* Decorative top border */}
          <div className="h-1 bg-gradient-to-r from-primaryGold via-deepGold to-primaryGold" />

          {/* Connection Status & Error Display */}
          <div className="p-8 pb-0">
            {!isOnline && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3"
              >
                <WifiOff className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-red-800 font-medium">No Internet Connection</p>
                  <p className="text-red-600 text-sm">Please check your connection and try again.</p>
                </div>
              </motion.div>
            )}

            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-red-800 font-medium">Submission Failed</p>
                    <p className="text-red-600 text-sm mt-1">{submitError}</p>
                    {retryCount > 0 && (
                      <p className="text-red-500 text-xs mt-2">
                        Attempt {retryCount} failed. You can try again.
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleRetry}
                    disabled={isRetrying || !isOnline}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
                    {isRetrying ? 'Retrying...' : 'Retry'}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-6">
                    Tell us about yourself
                  </motion.h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <motion.div variants={itemVariants}>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          {...register('name')}
                          type="text"
                          id="name"
                          placeholder="Enter your full name"
                          className={`w-full pl-10 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-primaryGold focus:border-transparent transition-all duration-200 focus:scale-[1.01] focus:shadow-lg ${
                            errors.name ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600 flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.name.message}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Email Field */}
                    <motion.div variants={itemVariants}>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          {...register('email')}
                          type="email"
                          id="email"
                          placeholder="Enter your email address"
                          className={`w-full pl-10 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-primaryGold focus:border-transparent transition-all duration-200 focus:scale-[1.01] focus:shadow-lg ${
                            errors.email ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-600 flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.email.message}
                        </motion.p>
                      )}
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants} className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      disabled={!canProceedToStep2}
                      className="bg-gradient-to-r from-primaryGold to-deepGold hover:from-deepGold hover:to-primaryGold disabled:opacity-50 disabled:cursor-not-allowed text-black px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                    >
                      Continue
                    </button>
                  </motion.div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">What interests you?</h2>
                    <p className="text-gray-600">
                      Select all the categories you're interested in. We'll notify you about relevant opportunities.
                    </p>
                  </div>

                  {errors.categories && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
                    >
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.categories.message}
                      </p>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {categories.map((category, index) => {
                      const isSelected = selectedCategories.includes(category.id);
                      
                      return (
                        <div
                          key={category.id}
                          className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                            isSelected
                              ? 'border-primaryGold bg-primaryGold/5 shadow-lg'
                              : 'border-gray-200 hover:border-primaryGold/50 hover:shadow-md'
                          }`}
                          onClick={() => handleCategoryChange(category.id, !isSelected)}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                              isSelected
                                ? 'border-primaryGold bg-primaryGold'
                                : 'border-gray-300'
                            }`}>
                              {isSelected && <Check className="w-4 h-4 text-black" />}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white`}>
                                  {category.icon}
                                </div>
                                <h3 className="font-semibold text-gray-900">
                                  {category.label}
                                </h3>
                              </div>
                              <p className="text-sm text-gray-600">
                                {category.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-center mb-8">
                    <p className="text-sm text-gray-500">
                      Selected: {selectedCategories.length} of {categories.length} categories
                    </p>
                  </div>

                  {/* Navigation & Submit */}
                  <div className="flex flex-col items-center gap-6">
                    {/* Connection Status */}
                    <div className="flex items-center gap-2 text-sm">
                      {isOnline ? (
                        <>
                          <Wifi className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">Connected</span>
                        </>
                      ) : (
                        <>
                          <WifiOff className="w-4 h-4 text-red-600" />
                          <span className="text-red-600">No Connection</span>
                        </>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="border-2 border-gray-300 text-gray-700 hover:border-gray-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting || !isOnline}
                        className="bg-gradient-to-r from-primaryGold to-deepGold hover:from-deepGold hover:to-primaryGold disabled:opacity-50 disabled:cursor-not-allowed text-black px-12 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center gap-3"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {isRetrying ? 'Retrying...' : 'Joining Waitlist...'}
                          </>
                        ) : !isOnline ? (
                          <>
                            <WifiOff className="w-5 h-5" />
                            No Connection
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            Join Waitlist
                          </>
                        )}
                      </button>
                    </div>

                    {!isOnline && (
                      <p className="text-sm text-gray-500 text-center">
                        Please check your internet connection to submit the form
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default WaitlistFormEnhanced;