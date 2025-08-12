import React from 'react';
import Image from 'next/image';
import Button from '@/components/Common/Button';
import Link from "next/link";

const DonationCard = () => {
  return (
    <div className="bg-[#FFF5E0] p-4 sm:p-8 md:p-12 lg:p-16">
      <div className="bg-[#191307] text-white rounded-3xl flex flex-col lg:flex-row justify-between items-center mx-auto p-6 sm:p-8 max-w-[1400px] relative">

        {/* Left Section */}
        <div className="w-full lg:w-1/2 lg:pr-8 z-10">
            <div className="flex flex-col items-start space-y-4 sm:space-y-6">
            <div className="flex flex-col items-start space-y-2">
              <Image src="/images/Avatar.png" alt="Icon" width={50} height={24} className="mb-2" />
              <p className="font-bold text-[#F0B561] text-sm">GIVE MONEY</p>
            </div>
            
            <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl max-w-lg">
              Will You Change The Life of An African Child Today?
            </h2>

            <p className="font-medium text-sm lg:text-base opacity-90">
              Invest in People, Invest in their growth
              <br />
              Invest in a stronger educational Standard
            </p>

            <Link href="/donate" passHref>
              
                <Button
                  text="Donate Now"
                  variant="filled"
                  className="w-fit rounded-full font-medium text-sm bg-[#F0B561] text-[#191307] px-6 py-3 mt-4"
                />
              
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 h-[200px] sm:h-[300px] lg:h-[400px] mt-6 lg:mt-0">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src="/images/examples/gallery/g3.png"
              alt="African child writing"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default DonationCard;