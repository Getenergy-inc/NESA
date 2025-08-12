'use client'
import Button from '@/components/Common/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FiArrowLeftCircle } from "react-icons/fi";
import { IoPersonSharp } from "react-icons/io5";
import { FaAward } from "react-icons/fa";
import { GiThorHammer } from "react-icons/gi";
import { FaMoneyBills } from "react-icons/fa6";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import styles from '@/public/styles/CreateAccount.module.css';

export default function CreateAccount() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleContinue = () => {
    switch (selectedOption) {
      case 'nominee':
        router.push('/account/signup/nomineesignup');
        break;
      case 'judge':
        router.push('/account/signup/judgesignup');
        break;
      case 'member':
        router.push('/account/signup/membersignup');
        break;
      case 'sponsor':
        router.push('/account/signup/sponsorsignup');
        break;
      default:
        // If no option is selected or for any other case
        alert('Please select an account type before continuing.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/NESA logo_UPDATED 1.png"
            alt="NESA Logo"
            width={150}
            height={75}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className={styles.nesaBadge}>
          <Image
            src="/images/NESA Logo 2.png"
            alt="NESA Badge"
            width={250}
            height={250}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className={styles.contactInfo}>
          <p><FaPhone /> +234-907-962-1110</p>
          <p><FaPhone /> +234-810-976-5897</p>
          <p><FaEnvelope /> nesa.africa@gmail.com</p>
          <p><FaMapMarkerAlt />19 Godwin Okigbo Street, Masha Kilo, bus stop, Surulere, Lagos</p>
        </div>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.content}>
          <Link href="/" className={styles.backButton}>
            <FiArrowLeftCircle size={24} /> Back
          </Link>
          <h1 className={styles.title}>Create your Account</h1>
          <p className={styles.subtitle}>Get Ready to Celebrate Excellence and unveil the nominees</p>

          <div>
          <Link href="/scef-signup" passHref>
            <button className={styles.scefButton}>
              <Image
                src="/images/image-removebg-preview 1.png"
                alt="SCEF Logo"
                width={50}
                height={20}
                style={{ objectFit: "contain" }}
              />
              Sign Up with SCEF
            </button>
          </Link>
          <div className={styles.orDivider}>Or</div>
          <div className="w-full">
              <span>already have an account?</span>
                <Link href="/account/login">
              <Button text="Log in" variant="filled" className="rounded-lg px-3 md:px-4 py-2     flex items-center justify-center
                    px-1 md:px-8 py-6 mb-4
                    text-xs sm:text-sm md:text-lg
                    text-center hover:bg-[#E48900] hover:text-black
                    rounded-lg
                    w-full sm:w-auto
                    truncate
                  " />
          
              </Link>
              </div>
              </div>

          <div className={styles.options}>
            {[
              { icon: <IoPersonSharp />, type: "Member", value: "member", description: "Sign up as a member and champion outstanding achievement and directly contribute to recognizing outstanding educators across the globe." },
              { icon: <FaAward />, type: "Nominee", value: "nominee", description: "Sign up as a nominee and be recognized for your outstanding achievements in education and community impact." },
              { icon: <GiThorHammer />, type: "Judge", value: "judge", description: "Sign up as a Judge and become a vital part of recognizing excellence in the community. We value your expertise and invite you to join our panel." },
              { icon: <FaMoneyBills />, type: "Sponsor", value: "sponsor", description: "Sign up as a sponsor and make a big impact by supporting the recognition of outstanding achievement in education and community." }
            ].map((option, index) => (
              <label key={index} className={styles.optionLabel}>
                <input 
                  type="radio" 
                  name="accountType" 
                  value={option.value} 
                  className={styles.radioInput} 
                  onChange={handleOptionChange}
                  checked={selectedOption === option.value}
                />
                <div className={styles.optionContent}>
                  <span className={styles.icon}>{option.icon}</span>
                  <span className={styles.optionType}>{option.type}</span>
                  <p className={styles.optionDescription}>{option.description}</p>
                </div>
              </label>
            ))}
          </div>
          <button onClick={handleContinue} className={styles.continueButton}>Continue</button>
        </div>
      </div>
    </div>
  );
}