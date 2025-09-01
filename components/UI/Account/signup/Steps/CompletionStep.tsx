"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Wallet, Users, Gift, ArrowRight, Home } from 'lucide-react';
import { useSignup } from '@/lib/context/SignupContext';
import Button from '@/components/Common/Button';
import { getPostSignupActions, getDashboardRoute } from '@/lib/utils/signupMapping';

const CompletionStep: React.FC = () => {
  const { formData, resetForm } = useSignup();
  const router = useRouter();

  // Prefer real data from signup result if available
  let signupResult: any | null = null;
  if (typeof window !== 'undefined') {
    try { signupResult = JSON.parse(localStorage.getItem('nesa-signup-result') || 'null'); } catch {}
  }

  const realUser = signupResult?.user;
  const realChapter = signupResult?.chapter;
  const realWallet = signupResult?.wallet;
  const realBonus = signupResult?.agcBonus;

  // If no real data, derive minimal display from form as a last resort
  const fallbackUser = {
    id: 'temp',
    name: (formData.accountType === 'Individual'
      ? (formData as any).fullName
      : (formData as any).contactPersonName) || 'User',
    email: (formData.accountType === 'Individual'
      ? formData.email
      : (formData as any).contactEmail) || '',
    role: 'Free Member'
  };

  const fallbackChapter = {
    name: `NESA Online Chapter – ${formData.country || 'Nigeria'} (${formData.state || 'Lagos'})`
  } as any;

  const displayUser = realUser || fallbackUser;
  const displayChapter = realChapter || fallbackChapter;
  const displayWallet = realWallet || null;
  const displayBonus = realBonus || null;

  const handleGoToDashboard = () => {
    resetForm();

    // Determine appropriate dashboard route based on user role and intents
    const userRole = (displayUser.role as string) || 'Free Member';
    const dashboardRoute = getDashboardRoute(userRole, formData.intents);

    router.push(dashboardRoute);
  };

  const handleStartApplication = (applicationType: string) => {
    resetForm();
    router.push(`/applications/new?type=${applicationType}`);
  };

  // Get post-signup actions based on user intents
  const postSignupActions = formData.intents ? getPostSignupActions(formData.intents) : [];

  const handleGoHome = () => {
    resetForm();
    router.push('/');
  };

  return (
    <div className="max-w-3xl mx-auto text-center">
      {/* Success Icon */}
      <div className="mb-8">
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
      </div>

      {/* Main Success Message */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to NESA-Africa! 🎉
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Your account has been created successfully
        </p>
        <p className="text-lg text-gray-500">
          Hello {displayUser.name || 'User'}, you're now part of the NESA community!
        </p>
      </div>

      {/* Account Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Account Info */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Created</h3>
          <p className="text-sm text-gray-600 mb-1">Account Type: {formData.accountType}</p>
          <p className="text-sm text-gray-600 mb-1">Role: {displayUser.role || 'Free Member'}</p>
          <p className="text-sm text-gray-600">Email: {displayUser.email}</p>
        </div>

        {/* Chapter Assignment */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Chapter Assigned</h3>
          <p className="text-sm text-gray-600 mb-1 font-medium">{displayChapter?.name}</p>
          {displayChapter?.memberCount && (
            <p className="text-sm text-gray-600">{displayChapter.memberCount} members</p>
          )}
        </div>

        {/* Wallet & Bonus */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-4">
            <Wallet className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">GFA Wallet Active</h3>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold text-orange-600">{(displayBonus?.amount ?? displayWallet?.agcBalance ?? 0)} AGC</span> bonus earned
          </p>
          <p className="text-xs text-gray-500">Ready for voting & nominations</p>
        </div>
      </div>

      {/* What's Next Section */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {formData.intents?.map((intent, index) => {
            let icon, title, description;
            
            switch (intent) {
              case 'Vote or Nominate':
                icon = <CheckCircle className="w-5 h-5 text-green-600" />;
                title = 'Start Voting & Nominating';
                description = 'Use your AGC tokens to vote for nominees and submit nominations';
                break;
              case 'Become Ambassador':
                icon = <Users className="w-5 h-5 text-purple-600" />;
                title = 'Ambassador Dashboard';
                description = 'Access your ambassador tools and start earning rewards';
                break;
              case 'Apply as Judge':
                icon = <CheckCircle className="w-5 h-5 text-blue-600" />;
                title = 'Judge Application';
                description = 'Complete your judge application and access evaluation tools';
                break;
              case 'Apply as NRC Volunteer':
                icon = <Users className="w-5 h-5 text-emerald-600" />;
                title = 'NRC Volunteer Program';
                description = 'Access the Nominee Research Corps and start identifying education leaders';
                break;
              case 'Join Webinar/Expo':
                icon = <CheckCircle className="w-5 h-5 text-indigo-600" />;
                title = 'Event Calendar';
                description = 'Browse upcoming webinars and expo events';
                break;
              default:
                icon = <Gift className="w-5 h-5 text-orange-600" />;
                title = 'Explore Features';
                description = 'Discover all the features available to you';
            }
            
            return (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">{icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              </div>
            );
          })}
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <Users className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Join Your Chapter</h3>
              <p className="text-sm text-gray-600">Connect with your local NESA community</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <Wallet className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Manage Your Wallet</h3>
              <p className="text-sm text-gray-600">Track your AGC balance and transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">📧 Check Your Email</h3>
        <p className="text-blue-800 text-sm">
          We've sent a verification email to <strong>{displayUser.email}</strong>.
          Please click the verification link to fully activate your account and unlock all features.
        </p>
      </div>

      {/* Next Steps Based on User Intents */}
      {postSignupActions.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Next Steps</h3>
          <div className="space-y-3">
            {postSignupActions.map((action, index) => (
              <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-blue-900 font-medium mb-1">
                      {action.type === 'application' ? 'Complete Application' :
                       action.type === 'redirect' ? 'Get Started' : 'Welcome'}
                    </p>
                    <p className="text-blue-800 text-sm mb-3">
                      {action.data?.message || action.action}
                    </p>
                    {action.type === 'application' && (
                      <Button
                        text="Start Application"
                        size="small"
                        onClick={() => handleStartApplication(action.data?.applicationType)}
                        className="bg-blue-600 hover:bg-blue-700"
                      />
                    )}
                    {action.type === 'redirect' && (
                      <Button
                        text="Continue"
                        size="small"
                        onClick={() => router.push(action.action)}
                        className="bg-blue-600 hover:bg-blue-700"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          text="Go to Dashboard"
          variant="filled"
          size="medium"
          onClick={handleGoToDashboard}
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
          className="px-8 py-3 min-w-[200px]"
        />

        <Button
          text="Back to Home"
          variant="outline"
          size="medium"
          onClick={handleGoHome}
          icon={<Home className="w-4 h-4" />}
          iconPosition="left"
          className="px-8 py-3 min-w-[200px]"
        />
      </div>

      {/* Additional Resources */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help Getting Started?</h3>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <a href="/help" className="text-orange-600 hover:text-orange-700 underline">
            Help Center
          </a>
          <a href="/about" className="text-orange-600 hover:text-orange-700 underline">
            About NESA
          </a>
          <a href="/contact" className="text-orange-600 hover:text-orange-700 underline">
            Contact Support
          </a>
          <a href="/community" className="text-orange-600 hover:text-orange-700 underline">
            Join Community
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompletionStep;
