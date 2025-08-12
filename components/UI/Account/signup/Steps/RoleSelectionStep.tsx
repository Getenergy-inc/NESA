"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  ArrowLeft, 
  Building2, 
  Megaphone, 
  Code, 
  Users,
  Shield,
  Gavel,
  DollarSign,
  Calendar,
  Settings
} from 'lucide-react';
import { Division, UserFunction } from '@/lib/types/signup';
import { useSignup } from '@/lib/context/SignupContext';
import Button from '@/components/Common/Button';

interface RoleSelectionFormData {
  division?: Division;
  functions?: UserFunction[];
  referralCode?: string;
}

const roleSelectionSchema = z.object({
  division: z.enum(['SOBCD', 'OMBDD', 'TDSD', 'LSC']).optional(),
  functions: z.array(z.enum([
    'Admin/Governance',
    'Media/Content', 
    'Fundraising/Sponsorship',
    'Tech/Web/Dev',
    'Legal/Compliance',
    'Event/Chapter Growth'
  ])).optional(),
  referralCode: z.string().optional()
});

const divisionOptions = [
  {
    value: 'SOBCD' as Division,
    label: 'SOBCD',
    title: 'Strategic Operations & Business Coordination',
    description: 'Strategic planning, operations management, and business coordination',
    icon: Building2,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    value: 'OMBDD' as Division,
    label: 'OMBDD', 
    title: 'Marketing & Business Development',
    description: 'Marketing campaigns, partnerships, and business development',
    icon: Megaphone,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    value: 'TDSD' as Division,
    label: 'TDSD',
    title: 'Technology & Digital Services',
    description: 'Technology development, digital platforms, and technical support',
    icon: Code,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    value: 'LSC' as Division,
    label: 'LSC',
    title: 'Local Chapter Services',
    description: 'Local chapter management, community engagement, and regional coordination',
    icon: Users,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  }
];

const functionOptions = [
  {
    value: 'Admin/Governance' as UserFunction,
    label: 'Admin / Governance',
    description: 'Administrative tasks, governance, and organizational management',
    icon: Shield,
    color: 'text-blue-600'
  },
  {
    value: 'Media/Content' as UserFunction,
    label: 'Media / Content',
    description: 'Content creation, social media management, and communications',
    icon: Megaphone,
    color: 'text-green-600'
  },
  {
    value: 'Fundraising/Sponsorship' as UserFunction,
    label: 'Fundraising / Sponsorship',
    description: 'Fundraising activities, sponsor relations, and financial partnerships',
    icon: DollarSign,
    color: 'text-yellow-600'
  },
  {
    value: 'Tech/Web/Dev' as UserFunction,
    label: 'Tech / Web / Dev',
    description: 'Software development, web development, and technical implementation',
    icon: Code,
    color: 'text-purple-600'
  },
  {
    value: 'Legal/Compliance' as UserFunction,
    label: 'Legal / Compliance',
    description: 'Legal affairs, compliance, and regulatory matters',
    icon: Gavel,
    color: 'text-red-600'
  },
  {
    value: 'Event/Chapter Growth' as UserFunction,
    label: 'Event / Chapter Growth',
    description: 'Event planning, chapter expansion, and community growth',
    icon: Calendar,
    color: 'text-indigo-600'
  }
];

const RoleSelectionStep: React.FC = () => {
  const { formData, updateFormData, nextStep, previousStep, isLoading } = useSignup();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<RoleSelectionFormData>({
    resolver: zodResolver(roleSelectionSchema),
    defaultValues: {
      division: (formData as any)?.division,
      functions: (formData as any)?.functions || [],
      referralCode: (formData as any)?.referralCode || ''
    },
    mode: 'onChange'
  });

  const selectedDivision = watch('division');
  const selectedFunctions = watch('functions') || [];

  const onSubmit = (data: RoleSelectionFormData) => {
    updateFormData(data);
    nextStep();
  };

  const toggleFunction = (func: UserFunction, currentFunctions: UserFunction[]) => {
    if (currentFunctions.includes(func)) {
      return currentFunctions.filter(f => f !== func);
    } else {
      return [...currentFunctions, func];
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Your Division & Functions
        </h1>
        <p className="text-gray-600 mb-2">
          Select your preferred division and the functions you'd like to contribute to.
        </p>
        <p className="text-sm text-orange-600 font-medium">
          This helps us assign you to the right team and projects.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Division Selection */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Preferred Division <span className="text-gray-500 text-sm font-normal">(Optional)</span>
          </h2>
          <Controller
            name="division"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {divisionOptions.map((option) => {
                  const IconComponent = option.icon;
                  const isSelected = field.value === option.value;

                  return (
                    <label
                      key={option.value}
                      className={`
                        relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200
                        ${isSelected 
                          ? `${option.borderColor} ${option.bgColor} ring-2 ring-orange-200` 
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        checked={isSelected}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="sr-only"
                        aria-describedby={`${option.value}-description`}
                      />

                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 p-2 rounded-lg ${option.color}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900">
                            {option.title}
                          </h3>
                          <p
                            id={`${option.value}-description`}
                            className="text-xs text-gray-600 mt-1"
                          >
                            {option.description}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                              <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
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
          {errors.division && (
            <p className="mt-2 text-sm text-red-600">{errors.division.message}</p>
          )}
        </div>

        {/* Function Selection */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Functions <span className="text-gray-500 text-sm font-normal">(Optional - Select all that apply)</span>
          </h2>
          <Controller
            name="functions"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {functionOptions.map((option) => {
                  const IconComponent = option.icon;
                  const isSelected = field.value?.includes(option.value) || false;

                  return (
                    <label
                      key={option.value}
                      className={`
                        relative cursor-pointer rounded-lg border-2 p-3 transition-all duration-200
                        ${isSelected 
                          ? 'border-orange-300 bg-orange-50 ring-2 ring-orange-200' 
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          const newFunctions = toggleFunction(option.value, field.value || []);
                          field.onChange(newFunctions);
                        }}
                        className="sr-only"
                        aria-describedby={`${option.value}-func-description`}
                      />

                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 p-1 rounded ${option.color}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900">
                            {option.label}
                          </h3>
                          <p
                            id={`${option.value}-func-description`}
                            className="text-xs text-gray-600 mt-1"
                          >
                            {option.description}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                              <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
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
          {errors.functions && (
            <p className="mt-2 text-sm text-red-600">{errors.functions.message}</p>
          )}
        </div>

        {/* Referral Code */}
        <div>
          <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 mb-2">
            Referral Code <span className="text-gray-500 font-normal">(Optional)</span>
          </label>
          <input
            {...register('referralCode')}
            type="text"
            id="referralCode"
            placeholder="Enter referral code if you have one"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          />
          {errors.referralCode && (
            <p className="mt-2 text-sm text-red-600">{errors.referralCode.message}</p>
          )}
        </div>

        {/* Navigation Buttons */}
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
            disabled={isLoading}
            loading={isLoading}
            className="px-8 py-3"
          />
        </div>
      </form>
    </div>
  );
};

export default RoleSelectionStep;
