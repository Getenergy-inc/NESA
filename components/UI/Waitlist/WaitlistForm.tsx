"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  AlertTriangle
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
    description: 'Participate in voting and nominate deserving candidates'
  },
  {
    id: 'become_ambassador',
    label: 'Become Ambassador',
    description: 'Represent NESA in your community and earn rewards'
  },
  {
    id: 'join_webinar_expo',
    label: 'Join Webinar/Expo',
    description: 'Attend educational webinars and expo events'
  },
  {
    id: 'sponsor_csr_partner',
    label: 'Sponsor or CSR Partner',
    description: 'Support education through sponsorship and CSR initiatives'
  },
  {
    id: 'apply_judge',
    label: 'Apply as a Judge',
    description: 'Evaluate nominees and participate in judging panels'
  },
  {
    id: 'join_local_chapter',
    label: 'Join Local Chapter',
    description: 'Connect with your local NESA chapter community'
  },
  {
    id: 'join_nesa_team',
    label: 'Join NESA Team',
    description: 'Volunteer or work with the NESA team'
  },
  {
    id: 'apply_nrc_volunteer',
    label: 'Apply as NRC Volunteer',
    description: 'Join the Nominee Research Corps to identify education leaders'
  },
  {
    id: 'get_gala_ticket',
    label: 'Get Gala Ticket',
    description: 'Attend the prestigious NESA-Africa Awards Gala'
  },
  {
    id: 'donate',
    label: 'Donate',
    description: 'Support NESA\'s mission to transform education in Africa'
  }
];

const WaitlistForm: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

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

    // Check initial status
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
      }, 30000); // 30 second timeout

      return handleApiResponse(response);
    }, 3, 1000);
  };

  const onSubmit = async (data: WaitlistFormData) => {
    // Clear previous errors
    setSubmitError(null);
    setIsSubmitting(true);

    // Check connection before submitting
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
        
        // Show appropriate success message
        if (result.data.isUpdate) {
          toast.success('Your waitlist preferences have been updated!');
        } else {
          toast.success('Successfully joined the waitlist!');
        }

        // Show additional info if sheets sync failed
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
      
      // Show different toast messages based on error type
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
      name: watch('name'),
      email: watch('email'),
      categories: watch('categories')
    };
    await onSubmit(formData);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to the Waitlist!
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            Thank you for joining our waitlist. We'll keep you updated on all the exciting 
            opportunities and events you've selected. Get ready to be part of transforming 
            education across Africa!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/')}
              className="bg-primaryGold hover:bg-deepGold text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Back to Home
            </button>
            <button
              onClick={() => {
                setIsSuccess(false);
                setValue('name', '');
                setValue('email', '');
                setValue('categories', []);
              }}
              className="border border-primaryGold text-primaryGold hover:bg-primaryGold hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Join Another Person
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-primaryGold to-deepGold p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">Join Our Waitlist</h1>
          <p className="text-xl opacity-90">
            Be the first to know about NESA opportunities and get early access to events, 
            programs, and initiatives that matter to you.
          </p>
        </div>

        {/* Connection Status Indicator */}
        {!isOnline && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <WifiOff className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-red-800 font-medium">No Internet Connection</p>
              <p className="text-red-600 text-sm">Please check your connection and try again.</p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
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
                className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
                {isRetrying ? 'Retrying...' : 'Retry'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
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
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent transition-colors duration-200 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
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
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryGold focus:border-transparent transition-colors duration-200 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Categories Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What interests you?</h2>
            <p className="text-gray-600 mb-6">
              Select all the categories you're interested in. We'll notify you about relevant opportunities.
            </p>

            {errors.categories && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.categories.message}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category.id);
                
                return (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-primaryGold bg-primaryGold/5'
                        : 'border-gray-200 hover:border-primaryGold/50'
                    }`}
                    onClick={() => handleCategoryChange(category.id, !isSelected)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors duration-200 ${
                        isSelected
                          ? 'border-primaryGold bg-primaryGold'
                          : 'border-gray-300'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {category.label}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-4 text-sm text-gray-500">
              Selected: {selectedCategories.length} of {categories.length} categories
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center gap-4">
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

            <button
              type="submit"
              disabled={isSubmitting || !isOnline}
              className="bg-primaryGold hover:bg-deepGold disabled:opacity-50 disabled:cursor-not-allowed text-white px-12 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center gap-2"
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
                'Join Waitlist'
              )}
            </button>

            {!isOnline && (
              <p className="text-sm text-gray-500 text-center">
                Please check your internet connection to submit the form
              </p>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default WaitlistForm;