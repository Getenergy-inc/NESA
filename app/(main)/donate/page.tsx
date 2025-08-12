"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import WhyDonationMatters from "@/components/UI/DonationModal/whydonate";
import DonationModal from '@/components/UI/DonationModal/donatemodal';

const DonationPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const copyToClipboard = async (accountNumber: string, accountType: string) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopiedAccount(accountType);
      setTimeout(() => setCopiedAccount(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <>
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/childwriting.png"
            alt="African child studying"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Fuel Africa's <span className="text-[#FFC247] drop-shadow-lg">Education Revolution</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95 drop-shadow-md">
              Make education available and accessible to millions of African children through your donation. Every contribution supports scholarships, school projects, and awards that recognize the heroes of education across Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={openModal}
                className="bg-gradient-to-r from-[#FFC247] to-[#FFB92E] text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:from-[#FFB92E] hover:to-[#FFC247] transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Donate Now
              </button>
              <a 
                href="#bank-details"
                className="border-2 border-[#FFC247] text-[#FFC247] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#FFC247] hover:text-gray-900 transition-all duration-300 backdrop-blur-sm"
              >
                Bank Transfer
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Beautiful Backgrounds */}
      <div className="bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900">
        {/* Impact Stats */}
        <section className="py-16 px-6 md:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="bg-gradient-to-br from-[#FFC247]/20 to-[#FFB92E]/30 backdrop-blur-lg rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-[#FFC247]/30">
                <div className="text-3xl font-bold text-[#FFC247] mb-2 drop-shadow-lg">6,000+</div>
                <div className="text-white/90">Nominees to Support</div>
              </div>
              <div className="bg-gradient-to-br from-[#FFB92E]/20 to-[#ea580c]/30 backdrop-blur-lg rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-[#FFB92E]/30">
                <div className="text-3xl font-bold text-[#FFB92E] mb-2 drop-shadow-lg">54</div>
                <div className="text-white/90">African Countries</div>
              </div>
              <div className="bg-gradient-to-br from-[#ea580c]/20 to-[#FFC247]/30 backdrop-blur-lg rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-[#ea580c]/30">
                <div className="text-3xl font-bold text-[#ea580c] mb-2 drop-shadow-lg">1,000+</div>
                <div className="text-white/90">Award Categories</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/30 backdrop-blur-lg rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-purple-400/30">
                <div className="text-3xl font-bold text-purple-300 mb-2 drop-shadow-lg">∞</div>
                <div className="text-white/90">Lives Impacted</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Donate Section */}
        <section className="py-16 px-6 md:px-20 bg-gradient-to-r from-indigo-900/50 to-purple-900/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white drop-shadow-lg">
              Why Your <span className="text-[#FFC247]">Donation</span> Matters
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-[#FFC247]/10 to-[#FFB92E]/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 border-l-4 border-[#FFC247] hover:transform hover:scale-105">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-[#FFC247] to-[#FFB92E] rounded-full p-3 flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-white">Empower Future Leaders</h3>
                    <p className="text-gray-200">Your donation provides visibility, recognition, and funding to teachers, innovators, and changemakers driving educational impact across Africa.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#FFB92E]/10 to-[#ea580c]/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 border-l-4 border-[#FFB92E] hover:transform hover:scale-105">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-[#FFB92E] to-[#ea580c] rounded-full p-3 flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-white">Support Scholarships</h3>
                    <p className="text-gray-200">NESA-Africa partners with EduAid-Africa to deliver scholarships, renovate schools, and train educators in underserved communities.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#ea580c]/10 to-purple-500/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 border-l-4 border-[#ea580c] hover:transform hover:scale-105">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-[#ea580c] to-purple-600 rounded-full p-3 flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-white">Amplify Voices</h3>
                    <p className="text-gray-200">We broadcast across the continent through NESA TV and "It's In Me Radio" to tell the stories of Africa's education champions.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 border-l-4 border-purple-400 hover:transform hover:scale-105">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-3 flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-white">Youth Participation</h3>
                    <p className="text-gray-200">Your giving enables free access for students and young educators to attend our expos, panels, and workshops during NESA-Africa Week.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bank Details Section */}
        <section id="bank-details" className="py-16 px-6 md:px-20 bg-gradient-to-br from-[#FFC247]/20 via-[#FFB92E]/15 to-[#ea580c]/20 backdrop-blur-lg">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">
                Direct <span className="text-[#FFC247]">Bank Transfer</span>
              </h2>
              <p className="text-xl text-gray-200">Make your donation directly to our official bank account</p>
            </div>
            
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">NEW EDUCATION STANDARDS AWARD</h3>
                <p className="text-lg text-[#FFC247] font-medium">PROVIDUS BANK</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#FFC247]/30 to-[#FFB92E]/20 backdrop-blur-lg rounded-xl p-6 border border-[#FFC247]/40 hover:transform hover:scale-105 transition-all duration-300 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-[#FFC247] to-[#FFB92E] rounded-full p-2 mr-3 shadow-lg">
                        <span className="text-gray-900 font-bold text-sm">₦</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white">Naira Account</h4>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-bold text-[#FFC247] drop-shadow-lg">1305476015</div>
                    <button
                      onClick={() => copyToClipboard('1305476015', 'naira')}
                      className="bg-[#FFC247]/20 hover:bg-[#FFC247]/40 text-[#FFC247] p-2 rounded-lg transition-all duration-200 hover:scale-110"
                      title="Copy account number"
                    >
                      {copiedAccount === 'naira' ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                        </svg>
                      )}
                    </button>
                  </div>
                  <p className="text-gray-200">For local Nigerian donations</p>
                  {copiedAccount === 'naira' && (
                    <p className="text-green-300 text-sm mt-2 animate-pulse">✓ Copied to clipboard!</p>
                  )}
                </div>

                <div className="bg-gradient-to-br from-[#FFB92E]/30 to-[#ea580c]/20 backdrop-blur-lg rounded-xl p-6 border border-[#FFB92E]/40 hover:transform hover:scale-105 transition-all duration-300 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-[#FFB92E] to-[#ea580c] rounded-full p-2 mr-3 shadow-lg">
                        <span className="text-white font-bold text-sm">$</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white">USD Account</h4>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-bold text-[#FFB92E] drop-shadow-lg">1305486988</div>
                    <button
                      onClick={() => copyToClipboard('1305486988', 'usd')}
                      className="bg-[#FFB92E]/20 hover:bg-[#FFB92E]/40 text-[#FFB92E] p-2 rounded-lg transition-all duration-200 hover:scale-110"
                      title="Copy account number"
                    >
                      {copiedAccount === 'usd' ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                        </svg>
                      )}
                    </button>
                  </div>
                  <p className="text-gray-200">For US Dollar donations</p>
                  {copiedAccount === 'usd' && (
                    <p className="text-green-300 text-sm mt-2 animate-pulse">✓ Copied to clipboard!</p>
                  )}
                </div>

                <div className="bg-gradient-to-br from-[#ea580c]/30 to-purple-500/20 backdrop-blur-lg rounded-xl p-6 border border-[#ea580c]/40 hover:transform hover:scale-105 transition-all duration-300 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-[#ea580c] to-purple-600 rounded-full p-2 mr-3 shadow-lg">
                        <span className="text-white font-bold text-sm">£</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white">GBP Account</h4>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-bold text-[#ea580c] drop-shadow-lg">1305532926</div>
                    <button
                      onClick={() => copyToClipboard('1305532926', 'gbp')}
                      className="bg-[#ea580c]/20 hover:bg-[#ea580c]/40 text-[#ea580c] p-2 rounded-lg transition-all duration-200 hover:scale-110"
                      title="Copy account number"
                    >
                      {copiedAccount === 'gbp' ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                        </svg>
                      )}
                    </button>
                  </div>
                  <p className="text-gray-200">For British Pound donations</p>
                  {copiedAccount === 'gbp' && (
                    <p className="text-green-300 text-sm mt-2 animate-pulse">✓ Copied to clipboard!</p>
                  )}
                </div>

                <div className="bg-gradient-to-br from-purple-500/30 to-pink-500/20 backdrop-blur-lg rounded-xl p-6 border border-purple-400/40 hover:transform hover:scale-105 transition-all duration-300 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-2 mr-3 shadow-lg">
                        <span className="text-white font-bold text-sm">€</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white">EUR Account</h4>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-bold text-purple-300 drop-shadow-lg">1305532933</div>
                    <button
                      onClick={() => copyToClipboard('1305532933', 'eur')}
                      className="bg-purple-400/20 hover:bg-purple-400/40 text-purple-300 p-2 rounded-lg transition-all duration-200 hover:scale-110"
                      title="Copy account number"
                    >
                      {copiedAccount === 'eur' ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                        </svg>
                      )}
                    </button>
                  </div>
                  <p className="text-gray-200">For Euro donations</p>
                  {copiedAccount === 'eur' && (
                    <p className="text-green-300 text-sm mt-2 animate-pulse">✓ Copied to clipboard!</p>
                  )}
                </div>
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-lg border border-blue-400/30">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-cyan-300 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="text-sm text-cyan-200 font-medium mb-1">Important Note:</p>
                    <p className="text-sm text-gray-200">Please send us an email at <a href="mailto:donate@nesa.africa" className="underline font-medium text-[#FFC247] hover:text-[#FFB92E]">donate@nesa.africa</a> after making your transfer with your transaction details for proper acknowledgment.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Digital Payment Options */}
        <section className="py-16 px-6 md:px-20 bg-gradient-to-r from-purple-900/50 to-indigo-900/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white drop-shadow-lg">
              Digital <span className="text-[#FFC247]">Payment Options</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#FFC247]/20 to-[#FFB92E]/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-[#FFC247]/30 hover:transform hover:scale-105">
                <h4 className="text-lg font-semibold mb-3 text-white">Paystack</h4>
                <p className="text-gray-200 mb-4">Cards/Bank Transfers – Global</p>
                <div className="text-[#FFC247] font-medium">Secure & Fast</div>
              </div>

              <div className="bg-gradient-to-br from-[#FFB92E]/20 to-[#ea580c]/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-[#FFB92E]/30 hover:transform hover:scale-105">
                <h4 className="text-lg font-semibold mb-3 text-white">Fairsure</h4>
                <p className="text-gray-200 mb-4">Smart Contracts & API Gateway</p>
                <div className="text-[#FFB92E] font-medium">Blockchain Secure</div>
              </div>

              <div className="bg-gradient-to-br from-[#ea580c]/20 to-purple-500/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-[#ea580c]/30 hover:transform hover:scale-105">
                <h4 className="text-lg font-semibold mb-3 text-white">Bancable</h4>
                <p className="text-gray-200 mb-4">Digital Banking – Institutional</p>
                <div className="text-[#ea580c] font-medium">Enterprise Ready</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-purple-400/30 hover:transform hover:scale-105">
                <h4 className="text-lg font-semibold mb-3 text-white">Zelle / TapTap Send</h4>
                <p className="text-gray-200 mb-4">Diaspora Transfers in USD, GBP, EUR</p>
                <div className="text-purple-300 font-medium">Diaspora Friendly</div>
              </div>

              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-cyan-400/30 hover:transform hover:scale-105">
                <h4 className="text-lg font-semibold mb-3 text-white">GFA Wallet</h4>
                <p className="text-gray-200 mb-4">Direct Wallet Transfer</p>
                <div className="text-cyan-300 font-medium">Instant Transfer</div>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-green-400/30 hover:transform hover:scale-105">
                <h4 className="text-lg font-semibold mb-3 text-white">Crypto</h4>
                <p className="text-gray-200 mb-4">Bitcoin, Ethereum & more</p>
                <div className="text-green-300 font-medium">Coming Soon</div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#FFB92E]/20 backdrop-blur-xl rounded-2xl p-8 border border-[#FFC247]/30 shadow-2xl">
                <h3 className="text-xl font-semibold mb-4 text-white">Conversion & Rewards</h3>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Automatic Conversion</h4>
                    <p className="text-gray-200 text-sm">All donations are converted to Afri-Gold Coins (AGC) at 1 USD = 10 AGC</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Donor Benefits</h4>
                    <p className="text-gray-200 text-sm">Use AGC to vote, get event discounts, and receive exclusive updates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-6 md:px-20 bg-gradient-to-r from-[#FFC247] via-[#FFB92E] to-[#ea580c]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 drop-shadow-lg">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 text-gray-800">
              Join thousands of donors supporting Africa's education transformation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={openModal}
                className="bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Donate Online Now
              </button>
              <a 
                href="mailto:donate@nesa.africa"
                className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 backdrop-blur-sm"
              >
                Contact Us
              </a>
            </div>
            <p className="mt-6 text-gray-800 font-medium drop-shadow-md">
              Together, let's raise Africa's education heroes.
            </p>
          </div>
        </section>
      </div>

      <WhyDonationMatters />
      
      {/* Donation Modal */}
      {showModal && <DonationModal onClose={closeModal} />}
    </>  
  );
};

export default DonationPage;