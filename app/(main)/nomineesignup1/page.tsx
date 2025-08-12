'use client'
import { MdLocationPin } from "react-icons/md";
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Image from 'next/image'
import { Phone, Mail } from "lucide-react";
import { FiCheckCircle, FiArrowLeftCircle, FiUpload, FiX, FiArrowLeft } from "react-icons/fi";


export default function NomineeSignupPart1() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    email: '',
    phone: '',
    country: '',
    image: null as File | null,
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, image: file }))
  }

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }))
  }

  const handleNext = () => {
    // Here you can do validation and pass formData to the next page via router state or URL query
    const query = new URLSearchParams({
      type: formData.type,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
    }).toString();
    router.push(`/nominee-signup-step2?${query}`);
  }
      const handleBack = () => {
      router.back();
    };

  return (
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
      

      <div className="w-full md:w-2/3 mx-auto p-6 md:p-12 md:pt-24 bg-white">

        <button onClick={handleBack} className="flex items-center text-gray-600 mb-8">
          <FiArrowLeftCircle className="text-3xl mr-2" />
          <span className="ml-2">Back</span>
        </button>
              <h1 className="text-3xl font-medium mb-2">Create your Nominee Account</h1>
              <p className="text-gray-600 mb-8">Fill the form to apply to be an Ambassador</p>

        <form  className="pt-20 max-w-5xl mx-auto p-8 space-y-8">
        <div>
          <label className="block mb-2 font-medium">Nominee Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="Individual">Individual</option>
            <option value="Organization">Organization</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Phone Number</label>
          <PhoneInput
            country={'ng'}
            value={formData.phone}
            onChange={handlePhoneChange}
            inputStyle={{ width: '100%', padding: '12px', borderRadius: '6px' }}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Upload an image</label>
          <input type="file" onChange={handleFileChange} className="block w-full text-sm" />
        </div>

        <div>
          <label className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600"
        >
          Continue
        </button>
        </form>
      </div>
    </div>
  )
}
