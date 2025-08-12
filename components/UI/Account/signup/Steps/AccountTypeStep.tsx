"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Building2, Landmark, GraduationCap, Users, Globe } from 'lucide-react';
import { AccountType } from '@/lib/types/signup';
import { accountTypeStepSchema } from '@/lib/validation/signupSchemas';
import { useSignup } from '@/lib/context/SignupContext';
import { ERROR_MESSAGES, createFormError } from '@/lib/types/errors';
import Button from '@/components/Common/Button';
import ErrorDisplay, { FieldError } from '@/components/Common/ErrorDisplay';

interface AccountTypeFormData {
  accountType: AccountType;
}

const accountTypeOptions = [
  {
    value: 'Individual' as AccountType,
    label: 'Individual',
    description: 'Personal account for individual participation',
    icon: User,
    color: 'text-blue-500'
  },
  {
    value: 'NGO' as AccountType,
    label: 'NGO / Non-Profit',
    description: 'Non-governmental organizations and non-profit entities',
    icon: Users,
    color: 'text-green-500'
  },
  {
    value: 'Corporation' as AccountType,
    label: 'Corporation / Company',
    description: 'Private companies and business organizations',
    icon: Building2,
    color: 'text-purple-500'
  },
  {
    value: 'Government' as AccountType,
    label: 'Government / Agency',
    description: 'Government institutions and public agencies',
    icon: Landmark,
    color: 'text-red-500'
  },
  {
    value: 'School' as AccountType,
    label: 'School / Institution',
    description: 'Educational institutions and academic organizations',
    icon: GraduationCap,
    color: 'text-indigo-500'
  },
  {
    value: 'Diaspora Group' as AccountType,
    label: 'Diaspora Group / Association',
    description: 'Diaspora communities and cultural associations',
    icon: Globe,
    color: 'text-orange-500'
  }
];

const AccountTypeStep: React.FC = () => {
  const { formData, updateFormData, nextStep, isLoading, error: contextError } = useSignup();
  const [submitError, setSubmitError] = React.useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<AccountTypeFormData>({
    resolver: zodResolver(accountTypeStepSchema),
    defaultValues: {
      accountType: formData.accountType
    },
    mode: 'onChange'
  });

  const selectedAccountType = watch('accountType');

  const onSubmit = async (data: AccountTypeFormData) => {
    try {
      setSubmitError('');
      updateFormData(data);
      nextStep();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : ERROR_MESSAGES.FORM_SUBMISSION_FAILED);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Account Type
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select the type of account that best describes you or your organization. This helps us personalize your NESA-Africa experience.
        </p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accountTypeOptions.map((option) => {
            const IconComponent = option.icon;
            const isSelected = selectedAccountType === option.value;

            return (
              <label
                key={option.value}
                className={`
                  relative flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 group
                  hover:border-orange-300 hover:shadow-lg hover:scale-105 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100
                  ${isSelected
                    ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 shadow-lg scale-105'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                  }
                `}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const input = e.currentTarget.querySelector('input') as HTMLInputElement;
                    input?.click();
                  }
                }}
              >
                <input
                  {...register('accountType')}
                  type="radio"
                  value={option.value}
                  className="sr-only"
                  aria-describedby={`${option.value}-description`}
                />

                <div className="flex items-center space-x-4 w-full">
                  <div className={`flex-shrink-0 p-3 rounded-xl ${option.color} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-6 w-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {option.label}
                    </h3>
                    <p
                      id={`${option.value}-description`}
                      className="text-sm text-gray-600 leading-relaxed"
                    >
                      {option.description}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'bg-orange-500 border-orange-500'
                        : 'border-gray-300 group-hover:border-orange-300'
                    }`}>
                      {isSelected && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </label>
            );
          })}
        </div>

        <FieldError
          error={errors.accountType?.message}
          className="text-center"
        />

        <div className="flex justify-center pt-8">
          <Button
            type="submit"
            text="Continue to Next Step"
            variant="filled"
            size="large"
            disabled={!isValid || isLoading}
            loading={isLoading}
            className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          />
        </div>
      </form>
    </div>
  );
};

export default AccountTypeStep;
