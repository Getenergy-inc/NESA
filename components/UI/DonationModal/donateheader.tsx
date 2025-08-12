"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DonationModal from '@/components/UI/DonationModal/donatemodal';

const Donationheader = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={`relative bg-gray-100`} onClick={() => { if (showModal) closeModal(); }} >
      

      {/* Main Content */}
      <main className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="images/childwriting.png"
            alt="African child studying"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        {/* Content */}
        <div className='grid grid-cols-2 gap-4'>
        <div className="relative z-10 min-h-screen flex items-center justify-between">
          <div className="min-w-1/2 ml-8 md:ml-16 text-white ">
            <h1 className="text-3xl md:text-4xl lg:text-5xl  mb-4">
              Make education available and accessible to millions of African children through your donation
            </h1>
            <p className="text-base mb-8">
              We provide quality education and help millions of African children in underdeveloped areas get access to quality education through your donations - by providing them with scholarships, building learning facilities, buying of learning materials, and educating people on the importance of quality education in Africa.
            </p>
            <button 
              onClick={openModal}
              className="bg-[#FFC247] text-gray-800 px-6 py-3 rounded-md text-lg font-medium hover:bg-yellow-500 transition duration-300"
            >
              Donate
            </button>
          </div>
        </div>
        {/* Donation Modal */}
        <div className="min-w-1/2 mr-8 md:mr-16 text-white">
      {showModal && <DonationModal onClose={closeModal} />}
      </div>
      </div>
      </main>

    </div>
  );
};

export default Donationheader;
