'use client';

import { useState } from 'react';
import SponsorStep1 from './SponsorStep1';
import SponsorshipPlans from './SponsorshipPlans';
import PaymentStep from './PaymentStep';
import SuccessStep from './SuccessStep';

export type SponsorPlan = {
  id: string;
  name: string;
  category: string;
  price: number;
  priceRange?: string;
  badge: string;
  color: string;
  icon: any;
  popular?: boolean;
  details: string[];
};

export type SponsorFormData = {
  company_name: string;
  name: string;
  email: string;
  phone: string;
  Business_reg_no: string;
  sponsorshipType?: string;
  proposedAmount?: number;
  additionalNotes?: string;
  selectedPlan?: SponsorPlan;
  payment_method?: string;
  payment_details?: {
    method: string;
    currencies: string[];
    processingTime: string;
  };
};

export type SubmissionResult = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    company_name: string;
    email: string;
    status: string;
    syncedToSheets?: boolean;
    isUpdate?: boolean;
    nextSteps: string[];
    estimatedProcessingTime: string;
    contactInfo: {
      email: string;
      phone: string;
    };
  };
  error?: string;
};

export default function SponsorFormWrapper() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SponsorFormData>({
    company_name: '',
    name: '',
    email: '',
    phone: '',
    Business_reg_no: '',
    sponsorshipType: '',
    proposedAmount: undefined,
    additionalNotes: '',
    selectedPlan: undefined
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);

  const nextStep = () => {
    setSubmissionError(null);
    setStep((s) => s + 1);
  };
  
  const prevStep = () => {
    setSubmissionError(null);
    setStep((s) => s - 1);
  };

  const handleDataUpdate = (data: Partial<SponsorFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleFinalSubmit = async (paymentData?: any) => {
    try {
      setIsSubmitting(true);
      setSubmissionError(null);
      
      // Merge payment data with form data if provided
      const finalFormData = paymentData 
        ? { ...formData, ...paymentData }
        : formData;
      
      console.log('Submitting sponsor application:', finalFormData);
      
      const response = await fetch('/api/sponsor-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalFormData),
      });

      const result = await response.json();

      if (result.success) {
        console.log('Sponsor application submitted successfully:', result);
        setSubmissionResult(result);
        nextStep(); // Move to success step
      } else {
        console.error('Sponsor application failed:', result.error || result.message);
        setSubmissionError(result.error || result.message || 'Application submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting sponsor application:', error);
      setSubmissionError('An error occurred while submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {step === 1 && (
        <SponsorStep1
          data={formData}
          onUpdate={handleDataUpdate}
          onNext={nextStep}
        />
      )}

      {step === 2 && (
        <SponsorshipPlans
          selectedPlan={formData.selectedPlan}
          onSelect={(plan) => handleDataUpdate({ selectedPlan: plan })}
          onSubmit={nextStep}
          onBack={prevStep}
        />
      )}

      {step === 3 && (
        <PaymentStep
          formData={formData}
          onBack={prevStep}
          onSubmit={handleFinalSubmit}
          isSubmitting={isSubmitting}
          error={submissionError}
        />
      )}

      {step === 4 && (
        <SuccessStep
          formData={formData}
          result={submissionResult}
        />
      )}
    </div>
  );
}