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

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleDataUpdate = (data: Partial<SponsorFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleFinalSubmit = async () => {
    try {
      console.log('Submitting sponsor application:', formData);
      
      const response = await fetch('/api/sponsor-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        console.log('Sponsor application submitted successfully:', result);
        nextStep(); // Move to success step
      } else {
        console.error('Sponsor application failed:', result.error);
        alert(`Application failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Error submitting sponsor application:', error);
      alert('An error occurred while submitting your application. Please try again.');
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
        />
      )}

      {step === 4 && (
        <SuccessStep
          formData={formData}
        />
      )}
    </div>
  );
}