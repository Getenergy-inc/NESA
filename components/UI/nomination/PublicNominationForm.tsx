'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Award, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import Button from '@/components/Common/Button';
import { AWARD_CATEGORIES, getSubcategories, SUPER_AWARD_CATEGORIES } from '@/lib/configs/awardCategories';

const publicNominationSchema = z.object({
    // Nominee Information
    fullName: z.string().min(2, 'Full name is required'),
    organizationName: z.string().optional(),
    country: z.string().min(2, 'Country is required'),
    region: z.string().optional(),
    email: z.string().email('Valid email is required'),
    phone: z.string().optional(),
    website: z.string().url('Must be a valid URL').optional().or(z.literal('')),

    // Award Category
    superAwardCategory: z.string().optional(),
    awardCategory: z.string().min(1, 'Award category is required'),
    subcategory: z.string().min(1, 'Subcategory is required'),

    // Achievement
    achievementSummary: z.string().min(10, 'Please provide at least 10 characters describing their achievement'),
    whyDeserving: z.string().min(10, 'Please explain why they deserve this award (minimum 10 characters)'),
    impactDescription: z.string().optional(),
    verificationLinks: z.string().optional(),

    // Nominator Information
    nominatorName: z.string().min(2, 'Your name is required'),
    nominatorEmail: z.string().email('Valid email is required'),
    nominatorPhone: z.string().optional(),
    nominatorRelationship: z.string().min(2, 'Please describe your relationship to the nominee'),

    additionalNotes: z.string().optional(),

    // Image is handled separately in state, not in form validation
});

type PublicNominationData = z.infer<typeof publicNominationSchema>;

interface PublicNominationFormProps {
    initialCategory?: string;
    initialSubcategory?: string;
    categoryTitle?: string;
    subcategoryTitle?: string;
    onSuccess?: () => void;
}

const PublicNominationForm: React.FC<PublicNominationFormProps> = ({
    initialCategory,
    initialSubcategory,
    categoryTitle,
    subcategoryTitle,
    onSuccess
}) => {
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Check if we have pre-filled values (coming from category page)
    const isPreFilled = !!(initialCategory && initialSubcategory);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<PublicNominationData>({
        resolver: zodResolver(publicNominationSchema),
        defaultValues: {
            awardCategory: initialCategory || '',
            subcategory: initialSubcategory || '',
        }
    });

    const selectedCategory = watch('awardCategory');
    const selectedSubcategory = watch('subcategory');
    const availableSubcategories = selectedCategory ? getSubcategories(selectedCategory) : [];

    // Get display labels
    const getCategoryLabel = (value: string) => {
        const category = AWARD_CATEGORIES.find(cat => cat.value === value);
        return category?.label || categoryTitle || value;
    };

    const getSubcategoryLabel = (categoryValue: string, subcategoryValue: string) => {
        const category = AWARD_CATEGORIES.find(cat => cat.value === categoryValue);
        const subcategory = category?.subcategories.find(sub => sub.value === subcategoryValue);
        return subcategory?.label || subcategoryTitle || subcategoryValue;
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please upload an image file (JPG, PNG, etc.)');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size must be less than 5MB');
                return;
            }

            setProfileImage(file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setProfileImage(null);
        setImagePreview(null);
    };

    const onSubmit = async (data: PublicNominationData) => {
        console.log('Form submitted, checking image...', { hasImage: !!profileImage });

        // Image is optional now - backend will handle it
        setLoading(true);
        setError(null);

        try {
            // Import the nomination service
            const { default: nominationService } = await import('@/lib/services/nominationService');

            // Prepare nomination data for backend - public endpoint expects awardCategory and achievementSummary
            const nominationData = {
                fullName: data.fullName,
                organizationName: data.organizationName,
                country: data.country,
                // server expects `region` for public nominations
                region: data.region,
                email: data.email,
                phone: data.phone,
                website: data.website,
                // server expects `awardCategory` and `subcategory` keys
                awardCategory: data.awardCategory,
                subcategory: data.subcategory,
                // server expects `achievementSummary` and `impactMetrics` (we'll compose impactMetrics from whyDeserving + impactDescription)
                achievementSummary: data.achievementSummary,
                impactMetrics: data.whyDeserving + (data.impactDescription ? '\n\n' + data.impactDescription : ''),
                verificationLinks: data.verificationLinks,
                nominatorName: data.nominatorName,
                nominatorEmail: data.nominatorEmail,
                nominatorPhone: data.nominatorPhone,
                nominatorRelationship: data.nominatorRelationship,
                additionalNotes: data.additionalNotes,
            };

            // Call backend API
            const result = await nominationService.createPublicNomination(nominationData);

            // TODO: Handle profile image upload separately if needed
            // You can add image upload logic here using a separate endpoint

            setShowSuccess(true);
            if (onSuccess) onSuccess();
        } catch (error: any) {
            console.error('Nomination submission error:', error);
            setError(error.message || 'Failed to submit nomination. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (showSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center"
            >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Nomination Submitted!</h2>
                <p className="text-gray-600 mb-6">
                    Thank you for your nomination. Our team will review it and may contact you for additional information.
                </p>
                <Button
                    text="Submit Another Nomination"
                    onClick={() => {
                        setShowSuccess(false);
                        setCurrentStep(1);
                    }}
                    variant="filled"
                    className="bg-[#ea580c] hover:bg-[#dc2626] text-white"
                />
            </motion.div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-[#ea580c] text-white' : 'bg-gray-200 text-gray-500'
                                }`}>
                                {step}
                            </div>
                            {step < 3 && (
                                <div className={`flex-1 h-1 mx-2 ${currentStep > step ? 'bg-[#ea580c]' : 'bg-gray-200'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Nominee Info</span>
                    <span>Achievement</span>
                    <span>Your Info</span>
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                        <h3 className="text-red-700 font-medium">Error</h3>
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit, (errors) => {
                console.log('Form validation errors:', errors);
                setError('Please fill in all required fields correctly');
                // Find which step has errors
                if (errors.fullName || errors.country || errors.email || errors.phone) {
                    setCurrentStep(1);
                } else if (errors.awardCategory || errors.subcategory || errors.achievementSummary || errors.whyDeserving) {
                    setCurrentStep(2);
                } else if (errors.nominatorName || errors.nominatorEmail || errors.nominatorRelationship) {
                    setCurrentStep(3);
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })} className="space-y-6">
                {/* Step 1: Nominee Information */}
                {currentStep === 1 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Who are you nominating?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name / Organization Name *
                                </label>
                                <input
                                    {...register('fullName')}
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                                    placeholder="Enter nominee's full name"
                                />
                                {errors.fullName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Organization (if applicable)
                                </label>
                                <input
                                    {...register('organizationName')}
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                                    placeholder="Organization name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Country *
                                </label>
                                <input
                                    {...register('country')}
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                                    placeholder="Country"
                                />
                                {errors.country && (
                                    <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Region/State
                                </label>
                                <input
                                    {...register('region')}
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                                    placeholder="Region or state"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    {...register('email')}
                                    type="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                                    placeholder="nominee@email.com"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone (optional)
                                </label>
                                <input
                                    {...register('phone')}
                                    type="tel"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                                    placeholder="Phone number"
                                />
                            </div>
                        </div>

                        {/* Profile Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Profile Image *
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#ea580c] transition-colors">
                                {imagePreview ? (
                                    <div className="space-y-4">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-32 h-32 object-cover rounded-lg mx-auto"
                                        />
                                        <div className="flex items-center justify-center gap-2">
                                            <p className="text-sm text-gray-600">{profileImage?.name}</p>
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                        <label className="cursor-pointer text-[#ea580c] hover:text-[#dc2626] text-sm">
                                            Change Image
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer block">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                        <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-gray-600 mb-2">Click to upload nominee's photo</p>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button
                                text="Next"
                                onClick={() => setCurrentStep(2)}
                                variant="filled"
                                className="bg-[#ea580c] hover:bg-[#dc2626] text-white flex items-center gap-2"
                                icon={<ArrowRight className="w-4 h-4" />}
                            />
                        </div>
                    </motion.div>
                )}
                {/* Step 2: Achievement & Category */}
                {currentStep === 2 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <Award className="w-5 h-5" />
                            What have they achieved?
                        </h2>

                        <div className="space-y-6">
                            {/* Show pre-filled category info if coming from category page */}
                            {isPreFilled && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                    <p className="text-sm text-blue-700 mb-2">
                                        <strong>Nominating for:</strong>
                                    </p>
                                    <p className="text-blue-900 font-medium">
                                        {getCategoryLabel(selectedCategory)}
                                    </p>
                                    <p className="text-blue-800 text-sm mt-1">
                                        {getSubcategoryLabel(selectedCategory, selectedSubcategory)}
                                    </p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Award Category *
                                </label>
                                {isPreFilled ? (
                                    <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                                        {getCategoryLabel(selectedCategory)}
                                    </div>
                                ) : (
                                    <select
                                        {...register('awardCategory')}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                                        onChange={(e) => {
                                            setValue('awardCategory', e.target.value);
                                            setValue('subcategory', '');
                                        }}
                                    >
                                        <option value="">Select award category...</option>
                                        {AWARD_CATEGORIES.map((category) => (
                                            <option key={category.value} value={category.value}>
                                                {category.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {errors.awardCategory && (
                                    <p className="text-red-500 text-sm mt-1">{errors.awardCategory.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subcategory *
                                </label>
                                {isPreFilled ? (
                                    <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                                        {getSubcategoryLabel(selectedCategory, selectedSubcategory)}
                                    </div>
                                ) : (
                                    <select
                                        {...register('subcategory')}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent disabled:bg-gray-100"
                                        disabled={!selectedCategory}
                                    >
                                        <option value="">
                                            {selectedCategory ? 'Select subcategory...' : 'Select category first'}
                                        </option>
                                        {availableSubcategories.map((subcategory) => (
                                            <option key={subcategory.value} value={subcategory.value}>
                                                {subcategory.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {errors.subcategory && (
                                    <p className="text-red-500 text-sm mt-1">{errors.subcategory.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Achievement Summary * (minimum 10 characters)
                                </label>
                                <textarea
                                    {...register('achievementSummary')}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                                    placeholder="Describe their key achievements and contributions..."
                                />
                                {errors.achievementSummary && (
                                    <p className="text-red-500 text-sm mt-1">{errors.achievementSummary.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Why do they deserve this award? * (minimum 10 characters)
                                </label>
                                <textarea
                                    {...register('whyDeserving')}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                                    placeholder="Explain why this person/organization deserves recognition..."
                                />
                                {errors.whyDeserving && (
                                    <p className="text-red-500 text-sm mt-1">{errors.whyDeserving.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Impact Description (optional)
                                </label>
                                <textarea
                                    {...register('impactDescription')}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                                    placeholder="Describe the impact of their work (e.g., number of people helped, communities served)..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Verification Links (optional)
                                </label>
                                <input
                                    {...register('verificationLinks')}
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                                    placeholder="Links to articles, social media, or other verification sources"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <Button
                                text="Back"
                                onClick={() => setCurrentStep(1)}
                                variant="outlined"
                                className="border-[#ea580c] text-[#ea580c]"
                            />
                            <Button
                                text="Next"
                                onClick={() => setCurrentStep(3)}
                                variant="filled"
                                className="bg-[#ea580c] hover:bg-[#dc2626] text-white flex items-center gap-2"
                                icon={<ArrowRight className="w-4 h-4" />}
                            />
                        </div>
                    </motion.div>
                )}
                {/* Step 3: Nominator Information */}
                {currentStep === 3 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <Mail className="w-5 h-5" />
                            Your Information
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Name *
                                </label>
                                <input
                                    {...register('nominatorName')}
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                                    placeholder="Your full name"
                                />
                                {errors.nominatorName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.nominatorName.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Email *
                                </label>
                                <input
                                    {...register('nominatorEmail')}
                                    type="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                                    placeholder="your@email.com"
                                />
                                {errors.nominatorEmail && (
                                    <p className="text-red-500 text-sm mt-1">{errors.nominatorEmail.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Phone (optional)
                                </label>
                                <input
                                    {...register('nominatorPhone')}
                                    type="tel"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                                    placeholder="Your phone number"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Relationship to Nominee *
                                </label>
                                <input
                                    {...register('nominatorRelationship')}
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                                    placeholder="e.g., Colleague, Student, Community Member"
                                />
                                {errors.nominatorRelationship && (
                                    <p className="text-red-500 text-sm mt-1">{errors.nominatorRelationship.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Additional Notes (optional)
                            </label>
                            <textarea
                                {...register('additionalNotes')}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                                placeholder="Any additional information you'd like to share..."
                            />
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-700">
                                By submitting this nomination, you confirm that the information provided is accurate to the best of your knowledge.
                                Our team will review your submission and may contact you for additional information.
                            </p>
                        </div>

                        <div className="flex justify-between">
                            <Button
                                text="Back"
                                onClick={() => setCurrentStep(2)}
                                variant="outlined"
                                className="border-[#ea580c] text-[#ea580c]"
                            />
                            <Button
                                text={loading ? "Submitting..." : "Submit Nomination"}
                                type="submit"
                                variant="filled"
                                className="bg-[#ea580c] hover:bg-[#dc2626] text-white"
                                disabled={loading}
                                onClick={() => console.log('Submit button clicked')}
                            />
                        </div>
                    </motion.div>
                )}
            </form>
        </div>
    );
};

export default PublicNominationForm;
