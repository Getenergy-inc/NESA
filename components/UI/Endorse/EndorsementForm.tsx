"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Upload,
  FileText,
  Video,
  CheckCircle,
  AlertCircle,
  Loader2,
  Lock
} from 'lucide-react';
import Button from '@/components/Common/Button';
import FormInput from '@/components/UI/Account/signup/FormComponents/FormInput';
import FormSelect from '@/components/UI/Account/signup/FormComponents/FormSelect';
import EndorsementFileUpload from './EndorsementFileUpload';
import { useAuthContext } from '@/lib/context/AuthContext';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

interface EndorsementFormData {
  organization_name: string;
  contact_person_name: string;
  email: string;
  phone: string;
  country: string;
  website: string;
  endorser_category: string;
  endorsement_type: 'free' | 'paid';
  endorsement_tier?: string;
  payment_method?: string;
  payment_reference?: string;
  endorsement_headline: string;
  endorsement_statement: string;
  logo_file?: File;
  video_file?: File;
  video_link?: string;
  consent_to_publish: boolean;
  authorized_to_submit: boolean;
  digital_signature: string;
}

const EndorsementForm: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, user, getUserId } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EndorsementFormData>({
    organization_name: '',
    contact_person_name: '',
    email: '',
    phone: '',
    country: '',
    website: '',
    endorser_category: '',
    endorsement_type: 'free',
    endorsement_headline: '',
    endorsement_statement: '',
    consent_to_publish: false,
    authorized_to_submit: false,
    digital_signature: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Pre-fill form with user data if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        contact_person_name: user.fullName || user.firstName + ' ' + user.lastName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        country: user.country || '',
      }));
    }
  }, [isAuthenticated, user]);

  const endorserCategories = [
    { value: 'bilateral_multilateral', label: 'Bilateral & Multilateral Agencies' },
    { value: 'government_ministry', label: 'Government Ministries & Parastatals' },
    { value: 'corporate', label: 'Corporate Institutions' },
    { value: 'diaspora', label: 'Diaspora Organizations' },
    { value: 'academic', label: 'Academic Institutions' },
    { value: 'development_foundation', label: 'Development Foundations' },
    { value: 'faith_based', label: 'Faith-Based Organizations' },
    { value: 'professional_body', label: 'Professional Bodies' },
    { value: 'media_creative', label: 'Media & Creative Networks' },
    { value: 'ngo', label: 'Non-Governmental Organizations' },
    { value: 'tech_innovation', label: 'Tech & Innovation Hubs' },
    { value: 'local_government', label: 'Local Government Stakeholders' },
    { value: 'education_icons', label: 'Education Icons & Alumni Bodies' },
    { value: 'civic_advocacy', label: 'Civic/Student Advocacy Groups' },
    { value: 'policy_think_tank', label: 'Policy Think Tanks' },
    { value: 'public_private_partnership', label: 'Public-Private Partnerships' }
  ];

  const endorsementTiers = [
    { value: 'bronze', label: 'Bronze ($500 - $999)' },
    { value: 'silver', label: 'Silver ($1,000 - $2,499)' },
    { value: 'gold', label: 'Gold ($2,500 - $4,999)' },
    { value: 'platinum', label: 'Platinum ($5,000+)' },
    { value: 'africa_blue_garnet', label: 'Africa Blue Garnet ($250,000+)' }
  ];

  const countries = [
    'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Egypt', 'Morocco', 'Ethiopia', 'Uganda', 
    'Tanzania', 'Algeria', 'Sudan', 'Angola', 'Mozambique', 'Madagascar', 'Cameroon', 
    'Côte d\'Ivoire', 'Niger', 'Burkina Faso', 'Mali', 'Malawi', 'Zambia', 'Somalia', 
    'Senegal', 'Chad', 'Zimbabwe', 'Guinea', 'Rwanda', 'Benin', 'Burundi', 'Tunisia',
    'United States', 'United Kingdom', 'Canada', 'France', 'Germany', 'Other'
  ];

  const handleInputChange = (name: string, value: string | boolean | File | null) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.organization_name) newErrors.organization_name = 'Organization name is required';
      if (!formData.contact_person_name) newErrors.contact_person_name = 'Contact person name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.endorser_category) newErrors.endorser_category = 'Endorser category is required';
    }

    if (step === 2) {
      if (formData.endorsement_type === 'paid') {
        if (!formData.endorsement_tier) newErrors.endorsement_tier = 'Endorsement tier is required for paid endorsements';
        if (!formData.payment_method) newErrors.payment_method = 'Payment method is required for paid endorsements';
        if (formData.payment_method === 'bank_transfer' && !formData.payment_reference) {
          newErrors.payment_reference = 'Payment reference is required for bank transfers';
        }
      }
    }

    if (step === 3) {
      if (!formData.endorsement_headline) newErrors.endorsement_headline = 'Endorsement headline is required';
      if (!formData.endorsement_statement) newErrors.endorsement_statement = 'Endorsement statement is required';
      if (formData.endorsement_headline.length > 70) newErrors.endorsement_headline = 'Headline must be 70 characters or less';
      if (formData.endorsement_statement.length > 500) newErrors.endorsement_statement = 'Statement must be 500 words or less';
    }

    if (step === 4) {
      if (!formData.consent_to_publish) newErrors.consent_to_publish = 'You must consent to publish your endorsement';
      if (!formData.authorized_to_submit) newErrors.authorized_to_submit = 'You must confirm authorization to submit';
      if (!formData.digital_signature) newErrors.digital_signature = 'Digital signature is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      router.back();
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    if (!isAuthenticated) {
      setErrors({ submit: 'You must be logged in to submit an endorsement' });
      return;
    }

    setLoading(true);
    try {
      // Include user ID in the submission
      const submissionData = {
        ...formData,
        user_id: getUserId(),
        submitted_by: user?.id || getUserId()
      };

      const response = await fetch('/api/endorse/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success) {
        router.push(`/get-involved/endorse-nesa-africa/success?id=${result.endorsement.id}`);
      } else {
        setErrors({ submit: result.message || 'Failed to submit endorsement' });
      }
    } catch (error) {
      console.error('Error submitting endorsement:', error);
      setErrors({ submit: 'An error occurred while submitting your endorsement' });
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <React.Fragment key={step}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            step <= currentStep 
              ? 'bg-[#ea580c] text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
          </div>
          {step < 4 && (
            <div className={`w-12 h-0.5 ${
              step < currentStep ? 'bg-[#ea580c]' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <div className="w-16 h-16 bg-[#ea580c]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-[#ea580c]" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Authentication Required
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              You need to be logged in to submit an endorsement for NESA-Africa 2025.
              Please sign in to your account or create a new one to continue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                text="Sign In"
                variant="filled"
                size="large"
                onClick={() => router.push('/account/login?redirect=' + encodeURIComponent(window.location.pathname))}
                className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-8 py-4"
              />
              <Button
                text="Create Account"
                variant="outline"
                size="large"
                onClick={() => router.push('/signup/comprehensive')}
                className="border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white px-8 py-4"
              />
            </div>

            <div className="mt-8">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Endorsement Info</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[#ea580c] hover:text-[#ea580c]/80 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Endorse NESA-Africa 2025
          </h1>
          <p className="text-gray-600">
            Join the movement for sustainable education impact across Africa.
          </p>

          {/* User Info Display */}
          {user && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Signed in as: <span className="font-semibold">{user.email}</span>
              </p>
            </div>
          )}

          {renderStepIndicator()}
        </motion.div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Organization Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Organization/Name"
                  name="organization_name"
                  type="text"
                  placeholder="Enter organization name"
                  required
                  value={formData.organization_name}
                  onChange={(e) => handleInputChange('organization_name', e.target.value)}
                  error={errors.organization_name}
                />

                <FormInput
                  label="Contact Person Name"
                  name="contact_person_name"
                  type="text"
                  placeholder="Enter contact person name"
                  required
                  value={formData.contact_person_name}
                  onChange={(e) => handleInputChange('contact_person_name', e.target.value)}
                  error={errors.contact_person_name}
                />

                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={errors.email}
                />

                <FormInput
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  error={errors.phone}
                />

                <FormSelect
                  label="Country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  error={errors.country}
                  options={countries.map(country => ({ value: country, label: country }))}
                />

                <FormInput
                  label="Website/Social Media"
                  name="website"
                  type="url"
                  placeholder="Enter website or social media URL"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                />
              </div>

              <div className="mt-6">
                <FormSelect
                  label="Endorser Category"
                  name="endorser_category"
                  required
                  value={formData.endorser_category}
                  onChange={(e) => handleInputChange('endorser_category', e.target.value)}
                  error={errors.endorser_category}
                  options={endorserCategories}
                />
              </div>

              <div className="flex justify-end mt-8">
                <Button
                  text="Next"
                  variant="filled"
                  onClick={handleNext}
                  className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-8 py-3"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Endorsement Type & Contribution
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Endorsement Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.endorsement_type === 'free'
                        ? 'border-[#ea580c] bg-[#ea580c]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleInputChange('endorsement_type', 'free')}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        formData.endorsement_type === 'free'
                          ? 'border-[#ea580c] bg-[#ea580c]'
                          : 'border-gray-300'
                      }`}>
                        {formData.endorsement_type === 'free' && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Free Endorsement</h3>
                        <p className="text-sm text-gray-600">Goodwill support without financial commitment</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.endorsement_type === 'paid'
                        ? 'border-[#ea580c] bg-[#ea580c]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleInputChange('endorsement_type', 'paid')}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        formData.endorsement_type === 'paid'
                          ? 'border-[#ea580c] bg-[#ea580c]'
                          : 'border-gray-300'
                      }`}>
                        {formData.endorsement_type === 'paid' && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Paid Endorsement</h3>
                        <p className="text-sm text-gray-600">With donation or sponsorship contribution</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {formData.endorsement_type === 'paid' && (
                <div className="space-y-6">
                  <FormSelect
                    label="Select Endorsement Tier"
                    name="endorsement_tier"
                    required
                    value={formData.endorsement_tier || ''}
                    onChange={(e) => handleInputChange('endorsement_tier', e.target.value)}
                    error={errors.endorsement_tier}
                    options={endorsementTiers}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Payment Method <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.payment_method === 'gfa_wallet'
                            ? 'border-[#ea580c] bg-[#ea580c]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange('payment_method', 'gfa_wallet')}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            formData.payment_method === 'gfa_wallet'
                              ? 'border-[#ea580c] bg-[#ea580c]'
                              : 'border-gray-300'
                          }`}>
                            {formData.payment_method === 'gfa_wallet' && (
                              <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">GFA Wallet</h3>
                            <p className="text-sm text-gray-600">Pay with AfriGold Coin</p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.payment_method === 'bank_transfer'
                            ? 'border-[#ea580c] bg-[#ea580c]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange('payment_method', 'bank_transfer')}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            formData.payment_method === 'bank_transfer'
                              ? 'border-[#ea580c] bg-[#ea580c]'
                              : 'border-gray-300'
                          }`}>
                            {formData.payment_method === 'bank_transfer' && (
                              <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">Bank Transfer</h3>
                            <p className="text-sm text-gray-600">Direct bank transfer</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {formData.payment_method === 'bank_transfer' && (
                    <FormInput
                      label="Payment Reference Number"
                      name="payment_reference"
                      type="text"
                      placeholder="Enter payment reference number"
                      required
                      value={formData.payment_reference || ''}
                      onChange={(e) => handleInputChange('payment_reference', e.target.value)}
                      error={errors.payment_reference}
                    />
                  )}
                </div>
              )}

              <div className="flex justify-between mt-8">
                <Button
                  text="Back"
                  variant="outline"
                  onClick={handleBack}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3"
                />
                <Button
                  text="Next"
                  variant="filled"
                  onClick={handleNext}
                  className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-8 py-3"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Endorsement Message & Media
              </h2>

              <div className="space-y-6">
                <FormInput
                  label="Endorsement Headline"
                  name="endorsement_headline"
                  type="text"
                  placeholder="Enter a compelling headline (max 70 characters)"
                  required
                  maxLength={70}
                  value={formData.endorsement_headline}
                  onChange={(e) => handleInputChange('endorsement_headline', e.target.value)}
                  error={errors.endorsement_headline}
                />
                <div className="text-right text-sm text-gray-500">
                  {formData.endorsement_headline.length}/70 characters
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Written Endorsement Statement <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="endorsement_statement"
                    rows={6}
                    maxLength={500}
                    placeholder="Write your endorsement statement (max 500 words)"
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:border-[#ea580c] ${
                      errors.endorsement_statement
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                    value={formData.endorsement_statement}
                    onChange={(e) => handleInputChange('endorsement_statement', e.target.value)}
                  />
                  {errors.endorsement_statement && (
                    <p className="mt-1 text-sm text-red-600">{errors.endorsement_statement}</p>
                  )}
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {formData.endorsement_statement.length}/500 words
                  </div>
                </div>

                <EndorsementFileUpload
                  label="Upload Organization Logo"
                  name="logo_file"
                  accept=".svg,.png,.jpg,.jpeg,image/svg+xml,image/png,image/jpeg"
                  maxSize={2}
                  value={formData.logo_file || null}
                  onChange={(file) => handleInputChange('logo_file', file)}
                  description="SVG, PNG, JPG (max 2MB)"
                  preview={true}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Endorsement Video (Optional)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <EndorsementFileUpload
                        label=""
                        name="video_file"
                        accept=".mp4,.mov,.avi,video/mp4,video/quicktime,video/x-msvideo"
                        maxSize={200}
                        value={formData.video_file || null}
                        onChange={(file) => handleInputChange('video_file', file)}
                        description="MP4, MOV, AVI (max 200MB)"
                        preview={false}
                      />
                    </div>
                    <div>
                      <FormInput
                        label="Or Video Link"
                        name="video_link"
                        type="url"
                        placeholder="YouTube or Vimeo link"
                        value={formData.video_link || ''}
                        onChange={(e) => handleInputChange('video_link', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  text="Back"
                  variant="outline"
                  onClick={handleBack}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3"
                />
                <Button
                  text="Next"
                  variant="filled"
                  onClick={handleNext}
                  className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-8 py-3"
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Agreement & Submission
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-4">Review Your Endorsement</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Organization:</span> {formData.organization_name}</p>
                    <p><span className="font-medium">Contact:</span> {formData.contact_person_name}</p>
                    <p><span className="font-medium">Email:</span> {formData.email}</p>
                    <p><span className="font-medium">Type:</span> {formData.endorsement_type === 'free' ? 'Free Endorsement' : `Paid Endorsement (${formData.endorsement_tier})`}</p>
                    <p><span className="font-medium">Headline:</span> {formData.endorsement_headline}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent_to_publish"
                      checked={formData.consent_to_publish}
                      onChange={(e) => handleInputChange('consent_to_publish', e.target.checked)}
                      className="mt-1 w-4 h-4 text-[#ea580c] border-gray-300 rounded focus:ring-[#ea580c]"
                    />
                    <label htmlFor="consent_to_publish" className="text-sm text-gray-700">
                      <span className="text-red-500">*</span> I consent to the public display of my endorsement on the NESA-Africa website, social media, and promotional materials.
                    </label>
                  </div>
                  {errors.consent_to_publish && (
                    <p className="text-sm text-red-600 ml-7">{errors.consent_to_publish}</p>
                  )}

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="authorized_to_submit"
                      checked={formData.authorized_to_submit}
                      onChange={(e) => handleInputChange('authorized_to_submit', e.target.checked)}
                      className="mt-1 w-4 h-4 text-[#ea580c] border-gray-300 rounded focus:ring-[#ea580c]"
                    />
                    <label htmlFor="authorized_to_submit" className="text-sm text-gray-700">
                      <span className="text-red-500">*</span> I confirm that I am authorized to submit this endorsement on behalf of my organization.
                    </label>
                  </div>
                  {errors.authorized_to_submit && (
                    <p className="text-sm text-red-600 ml-7">{errors.authorized_to_submit}</p>
                  )}
                </div>

                <FormInput
                  label="Digital Signature"
                  name="digital_signature"
                  type="text"
                  placeholder="Type your full name as digital signature"
                  required
                  value={formData.digital_signature}
                  onChange={(e) => handleInputChange('digital_signature', e.target.value)}
                  error={errors.digital_signature}
                />

                {errors.submit && (
                  <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <p className="text-sm text-red-600">{errors.submit}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  text="Back"
                  variant="outline"
                  onClick={handleBack}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3"
                />
                <Button
                  text={loading ? "Submitting..." : "Submit Endorsement"}
                  variant="filled"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-8 py-3"
                  icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EndorsementForm;
