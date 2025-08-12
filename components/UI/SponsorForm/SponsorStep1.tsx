'use client';
import { MdLocationPin } from "react-icons/md";
import { Phone, Mail } from "lucide-react";

import PhoneInput from 'react-phone-input-2';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import 'react-phone-input-2/lib/style.css';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiCheckCircle, FiArrowLeftCircle, FiUpload, FiX, FiArrowLeft } from "react-icons/fi";
import { useRouter } from 'next/navigation';


const formSchema = z.object({
  company_name: z.string().min(2, 'Company name is required'),
  name: z.string().min(2, 'Full Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(5, 'Phone is required'),
  Business_reg_no: z.string().min(2, 'Business registration number is required'),
  sponsorshipType: z.string().optional(),
  proposedAmount: z.number().optional(),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function SponsorStep1({
  data,
  onUpdate,
  onNext
}: {
  data: Partial<FormData>
  onUpdate: (data: Partial<FormData>) => void
  onNext: () => void
}) {
   const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: data,
  });

  const [phoneNumber, setPhoneNumber] = useState(data.phone || '');
  const [sponsorshipType, setSponsorshipType] = useState(data.sponsorshipType || '');
  const [proposedAmount, setProposedAmount] = useState(data.proposedAmount || '');
  const [additionalNotes, setAdditionalNotes] = useState(data.additionalNotes || '');

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    setValue('phone', phoneNumber);
    setValue('sponsorshipType', sponsorshipType);
    setValue('proposedAmount', proposedAmount ? Number(proposedAmount) : undefined);
    setValue('additionalNotes', additionalNotes);
  }, [phoneNumber, sponsorshipType, proposedAmount, additionalNotes, setValue]);

  const onSubmit = (formData: FormData) => {
    onUpdate(formData);
    onNext();
  };

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen w-full bg-white pt-20">
          <div className="w-full md:w-1/3 relative overflow-hidden md:block hidden ">
            <Image
              src="/images/Hero section.png"
              alt="Background"
              layout="fill"
              objectFit="cover"
              quality={100}
              className="h-[50px]"
              
            />
            <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
              <div>
                <Image
                  src="/images/NESA logo_UPDATED 1.png"
                  alt="NEW EDUCATION STANDARD AWARDS AFRICA"
                  width={150}
                  height={75}
                  className="mb-4"
                />
              </div>
              <div className="flex justify-center items-center flex-grow">
                <Image
                  src="/images/NESA Logo 2.png"
                  alt="NESA Badge"
                  width={250}
                  height={250}
                  className="max-w-full h-auto"
                />
              </div>
              <div className="text-sm">
                <p className="mb-2 flex items-center"><MdLocationPin className="mr-2" />19 Godwin Okigbo Street, Masha Kilo, bus stop, Surulere, Lagos</p>
                <p className="mb-2 flex items-center"><Phone className="mr-2" /> +234-907-962-1110</p>
                <p className="mb-2 flex items-center"><Phone className="mr-2" /> +234-810-976-5897</p>
                <p className="flex items-center"><Mail className="mr-2" /> nesa.africa@gmail.com</p>
              </div>
            </div>
          </div>
    
            <div className="w-full md:w-2/3 p-6 md:p-12 md:pt-24 bg-white">
            <div className="max-w-2xl mx-auto">
              <button onClick={handleBack} className="flex items-center text-gray-600 mb-8">
                <FiArrowLeftCircle className="text-3xl mr-2" />
                <span className="ml-2">Back</span>
              </button>
                  <h1 className="text-3xl font-medium mb-2">Apply to become a sponsor</h1>

              <p className="text-gray-600 mb-8">Fill the form to apply to be an Ambassador</p>
              <h1 className="text-1xl font-medium mb-2">Personal information</h1>
              
              <form onSubmit={handleSubmit(onSubmit)} className="pt-20 max-w-5xl mx-auto p-8 space-y-8">

                <div className="mb-6">
                <label htmlFor='company_name' className="block text-sm font-medium mb-2">Company Name</label>
                 <input 
                    type="text" 
                    id="company_name"
                    defaultValue={data.company_name}
                    {...register('company_name')}
                    placeholder="Your Company.." 
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-yellow-400"
 
                  />
                {errors.company_name && <p className="text-red-500 text-sm mt-1">{errors.company_name.message}</p>}
                </div>
                <div className="mb-6">
                <label htmlFor='name' className="block text-sm font-medium mb-2">Name</label>
                 <input 
                    type="text" 
                    id="name"
                    defaultValue={data.name}
                    {...register('name')}
                    placeholder="Your Name.." 
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-yellow-400"
 
                  />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}

                </div>

                <div className="mb-6">
                  <label htmlFor='email' className="block text-sm font-medium mb-2">Email</label>
                      <input
                        id="email"
                        type="email"
                        defaultValue={data.email}
                        {...register('email')}
                        placeholder="Enter your Email" className="w-full p-3 rounded-lg bg-[#FCFBFA]" />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
                  <PhoneInput
                    country={'ng'}
                    value={phoneNumber}
                    onChange={(value) => {
                      setPhoneNumber(value);
                      setValue('phone', value, { shouldValidate: true });
                    }}
                    enableAreaCodes={true}
                    enableTerritories={true}
                    enableLongNumbers={true}
                    countryCodeEditable={false}
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: true,
                    }}
                    containerClass="mb-6"
                    inputStyle={{
                      width: '100%',
                      height: '48px',
                      padding: '12px 12px 12px 48px',
                      borderRadius: '6px',
                      background: '#FCFBFA',
                      border: 'none',
                    }}
                    buttonStyle={{
                      height: '48px',
                      borderRadius: '6px 0 0 6px',
                      background: '#FFF9ED',
                      border: 'none',
                    }}
                    dropdownStyle={{
                      background: '#FFF9ED',
                    }}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
                
                
                <div className="mb-6">
                  <label htmlFor="sponsorshipType" className="block text-sm font-medium text-gray-700 mb-2">Select Sponsorship Category</label>
                  <select 
                    id="sponsorshipType" 
                    value={sponsorshipType}
                    onChange={(e) => setSponsorshipType(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  >
                    <option value="">-- Choose an option --</option>
                    <option value="Award Category Sponsorship">Award Category Sponsorship</option>
                    <option value="Sub-Category Sponsorship">Sub-Category Sponsorship</option>
                    <option value="NESA TV/Media">NESA TV / Media Sponsorship</option>
                    <option value="Regional Sponsorship">Regional Sponsorship</option>
                    <option value="Pre-Award Gala Events">Pre-Award Gala Events (Oct 13–15)</option>
                    <option value="EduAid-Africa Expo">EduAid-Africa Expo (Oct 16)</option>
                    <option value="Gala Awards Night">Gala Awards Night (Oct 17)</option>
                    <option value="Full Program Sponsor">Full Program Sponsor</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="proposedAmount" className="block text-sm font-medium text-gray-700 mb-2">Proposed Sponsorship Amount (USD)</label>
                  <input 
                    type="number" 
                    id="proposedAmount" 
                    value={proposedAmount}
                    onChange={(e) => setProposedAmount(e.target.value)}
                    placeholder="Enter amount in USD"
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-2">Additional Notes or Custom Package Request</label>
                  <textarea 
                    id="additionalNotes" 
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    rows={4}
                    placeholder="Tell us about your specific requirements or custom package needs..."
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">registration number</label>
                  <div className="relative">
                    <input 
                      id="Business_reg_no"
                      defaultValue={data.Business_reg_no}
                      {...register('Business_reg_no')}
                      placeholder="Enter registration number"
                      className="w-full p-3 rounded-lg bg-[#FCFBFA] pr-10" 
                    />
                    <MdLocationPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    
                  </div>
                    {errors.Business_reg_no && <p className="text-red-500 text-sm mt-1">{errors.Business_reg_no.message}</p>}
                </div>
                <div className="pt-4 md:col-span-2">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-black font-bold py-3 px-4 rounded-lg w-full"
                  style={{
                    background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)'
                  }}
       >
                  Continue
                </motion.button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    By submitting this form, you confirm that all information provided is accurate.
                  </p>
                </div>
              </form>
            <p className="mt-8 text-sm text-gray-800">
              For direct payments, bank details and GFA Wallet integration will be shared upon confirmation.
              For inquiries, email <a href="mailto:sponsor@nesa.africa" className="underline text-blue-600">sponsor@nesa.africa</a>
            </p>
            </div>

          </div>
   </div>
    </>
  );
}