"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Vote,
  GraduationCap,
  Users,
  Calendar,
  Heart,
  Scale,
  MapPin,
  Briefcase,
  ArrowLeft,
  Ticket,
  DollarSign
} from 'lucide-react';
import { UserIntent } from '@/lib/types/signup';
import { intentSelectionStepSchema } from '@/lib/validation/signupSchemas';
import { useSignup } from '@/lib/context/SignupContext';
import { ERROR_MESSAGES, createFormError } from '@/lib/types/errors';
import Button from '@/components/Common/Button';
import ErrorDisplay, { FieldError } from '@/components/Common/ErrorDisplay';

interface IntentSelectionFormData {
  intents: UserIntent[];
}

const intentOptions = [
  {
    value: 'Vote or Nominate' as UserIntent,
    label: 'Vote or Nominate',
    description: 'Participate in voting and nominate deserving candidates',
    icon: Vote,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    value: 'Apply for Eduaid Scholarship' as UserIntent,
    label: 'Apply for Eduaid Scholarship',
    description: 'Access educational scholarships and funding opportunities',
    icon: GraduationCap,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    value: 'Become Ambassador' as UserIntent,
    label: 'Become Ambassador',
    description: 'Represent NESA in your community and earn rewards',
    icon: Users,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    value: 'Join Webinar/Expo' as UserIntent,
    label: 'Join Webinar/Expo',
    description: 'Attend educational webinars and expo events',
    icon: Calendar,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200'
  },
  {
    value: 'Sponsor or CSR Partner' as UserIntent,
    label: 'Sponsor or CSR Partner',
    description: 'Support education through sponsorship and CSR initiatives',
    icon: Heart,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    value: 'Apply as Judge' as UserIntent,
    label: 'Apply as Judge',
    description: 'Evaluate nominees and participate in judging panels',
    icon: Scale,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  },
  {
    value: 'Join Local Chapter' as UserIntent,
    label: 'Join Local Chapter',
    description: 'Connect with your local NESA chapter community',
    icon: MapPin,
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200'
  },
  {
    value: 'Join NESA Team' as UserIntent,
    label: 'Join NESA Team',
    description: 'Volunteer or work with the NESA team',
    icon: Briefcase,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  {
    value: 'Apply as NRC Volunteer' as UserIntent,
    label: 'Apply as NRC Volunteer',
    description: 'Join the Nominee Research Corps to identify education leaders',
    icon: Users,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200'
  },
  {
    value: 'Get Gala Ticket' as UserIntent,
    label: 'Get Gala Ticket',
    description: 'Attend the prestigious NESA-Africa Awards Gala',
    icon: Ticket,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200'
  },
  {
    value: 'Donate' as UserIntent,
    label: 'Donate',
    description: 'Support educational initiatives through donations',
    icon: DollarSign,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200'
  }
];

const IntentSelectionStep: React.FC = () => {
  const { formData, updateFormData, nextStep, previousStep, isLoading, error: contextError } = useSignup();
  const [submitError, setSubmitError] = React.useState<string>('');

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<IntentSelectionFormData>({
    resolver: zodResolver(intentSelectionStepSchema),
    defaultValues: {
      intents: formData.intents || []
    },
    mode: 'onChange'
  });

  const selectedIntents = watch('intents') || [];

  const onSubmit = async (data: IntentSelectionFormData) => {
    try {
      setSubmitError('');

      if (data.intents.length === 0) {
        setSubmitError('Please select at least one purpose for joining NESA-Africa.');
        return;
      }

      if (data.intents.length > 6) {
        setSubmitError('Please select no more than 6 purposes.');
        return;
      }

      // Check for mutual exclusion
      const hasScholarship = data.intents.includes('Apply for Eduaid Scholarship');
      const hasSponsor = data.intents.includes('Sponsor or CSR Partner');

      if (hasScholarship && hasSponsor) {
        setSubmitError('You cannot select both "Apply for Eduaid Scholarship" and "Sponsor or CSR Partner" at the same time.');
        return;
      }

      updateFormData(data);
      nextStep();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : ERROR_MESSAGES.FORM_SUBMISSION_FAILED);
    }
  };

  const toggleIntent = (intent: UserIntent, currentIntents: UserIntent[]) => {
    if (currentIntents.includes(intent)) {
      // Remove the intent
      return currentIntents.filter(i => i !== intent);
    } else {
      // Check if we can add the intent
      if (currentIntents.length >= 6) {
        return currentIntents; // Already at max limit
      }

      // Check for mutual exclusion
      const isScholarship = intent === 'Apply for Eduaid Scholarship';
      const isSponsor = intent === 'Sponsor or CSR Partner';
      const hasScholarship = currentIntents.includes('Apply for Eduaid Scholarship');
      const hasSponsor = currentIntents.includes('Sponsor or CSR Partner');

      if ((isScholarship && hasSponsor) || (isSponsor && hasScholarship)) {
        return currentIntents; // Cannot add due to mutual exclusion
      }

      // Add the intent
      return [...currentIntents, intent];
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          What would you like to do on NESA-Africa?
        </h1>
        <p className="text-gray-600 mb-2">
          Select up to 6 activities that interest you. This helps us personalize your experience.
        </p>
        <p className="text-sm text-orange-600 font-medium">
          {selectedIntents.length}/6 selected
        </p>
        {/* Mutual exclusion warning */}
        {selectedIntents.includes('Apply for Eduaid Scholarship') && (
          <p className="text-sm text-amber-600 font-medium mt-1">
            ⚠️ Note: You cannot select "Sponsor or CSR Partner" when applying for scholarship
          </p>
        )}
        {selectedIntents.includes('Sponsor or CSR Partner') && (
          <p className="text-sm text-amber-600 font-medium mt-1">
            ⚠️ Note: You cannot select "Apply for Eduaid Scholarship" when sponsoring
          </p>
        )}
      </div>

      {/* Error Messages */}
      {(contextError || submitError) && (
        <div className="mb-6">
          <ErrorDisplay
            error={contextError || submitError}
            onDismiss={() => setSubmitError('')}
          />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="intents"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {intentOptions.map((option) => {
                const IconComponent = option.icon;
                const isSelected = field.value.includes(option.value);

                // Check if option should be disabled
                let isDisabled = false;
                if (!isSelected) {
                  // Disable if at max limit
                  if (field.value.length >= 6) {
                    isDisabled = true;
                  }

                  // Disable due to mutual exclusion
                  const isScholarship = option.value === 'Apply for Eduaid Scholarship';
                  const isSponsor = option.value === 'Sponsor or CSR Partner';
                  const hasScholarship = field.value.includes('Apply for Eduaid Scholarship');
                  const hasSponsor = field.value.includes('Sponsor or CSR Partner');

                  if ((isScholarship && hasSponsor) || (isSponsor && hasScholarship)) {
                    isDisabled = true;
                  }
                }

                return (
                  <label
                    key={option.value}
                    className={`
                      relative flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200
                      hover:border-orange-300 focus-within:border-orange-500
                      ${isSelected
                        ? 'border-orange-500 bg-orange-50'
                        : isDisabled
                          ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                          : 'border-gray-300 bg-white'
                      }
                    `}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
                        e.preventDefault();
                        const newIntents = toggleIntent(option.value, field.value);
                        field.onChange(newIntents);
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={isDisabled}
                      onChange={(e) => {
                        if (!isDisabled) {
                          const newIntents = toggleIntent(option.value, field.value);
                          field.onChange(newIntents);
                        }
                      }}
                      className="sr-only"
                      aria-describedby={`${option.value}-description`}
                    />

                    <div className={`flex-shrink-0 p-2 rounded-lg mr-3 ${option.color}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900">
                        {option.label}
                      </h3>
                      <p
                        id={`${option.value}-description`}
                        className="text-xs text-gray-600"
                      >
                        {option.description}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="flex-shrink-0">
                        <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </label>
                );
              })}
            </div>
          )}
        />

        <FieldError
          error={errors.intents?.message}
          className="text-center"
        />

        <div className="flex justify-between items-center pt-6">
          <Button
            type="button"
            text="Back"
            variant="outline"
            size="medium"
            onClick={previousStep}
            disabled={isLoading}
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
            className="px-6 py-3"
          />

          <Button
            type="submit"
            text="Continue"
            variant="filled"
            size="medium"
            disabled={!isValid || isLoading}
            loading={isLoading}
            className="px-8 py-3"
          />
        </div>
      </form>
    </div>
  );
};

export default IntentSelectionStep;
