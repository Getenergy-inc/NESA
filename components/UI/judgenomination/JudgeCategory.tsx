"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { FaLinkedin, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

interface Judge {
  name: string;
  organization: string;
  achievements: string;
  image: string;
}

interface JudgeCardProps {
  judge: Judge;
}



const JudgeCard: React.FC<JudgeCardProps> = ({ judge }) => {
   const router = useRouter();

  if (!judge) {
    return null;
  }

  const handleReview = (name: string) => {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  router.push(`/judge/review/Judge/${slug}`);
  };
 
  return (
    <div className="bg-[#191307] rounded-lg overflow-hidden w-full max-w-[412px] h-auto flex flex-col">
      <div className="p-4 flex-grow">
        <div className="mb-4 flex justify-center">
          <Image
            src={judge.image}
            alt={judge.name}
            width={332}
            height={261}
            className="object-cover rounded-lg w-full h-auto"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
          <h3 className="text-white text-lg font-bold truncate mr-2 mb-2 sm:mb-0">{judge.name}</h3>
          <div className="flex items-center space-x-2">
            <Link href="#" className="text-gray-400 hover:text-white">
              <FaLinkedin size={16} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <FaFacebookF size={16} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <FaTwitter size={16} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <FaInstagram size={16} />
            </Link>
          </div>
        </div>
        <p className="text-gray-400 text-sm">{judge.organization}</p>
        <p className="text-white text-sm mt-2">Achievements:</p>
        <p className="text-gray-400 text-xs">{judge.achievements}</p>
      </div>
      <div className="p-4">
        <div>
          <button className="w-full py-2 px-4 rounded-full text-black font-semibold cursor-pointer transition-colors"
          onClick={()=>handleReview(judge.name)}
                  style={{background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)'}}>
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default JudgeCard;