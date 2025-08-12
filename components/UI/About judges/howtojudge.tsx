"use client";

import React from 'react';
import Image from 'next/image'
import styles from './howtojudge.module.css';
import { useRouter } from 'next/navigation';
import Button from '@/components/Common/Button';

export default function JudgingPanel() {
  const router = useRouter();
  return (
      <div className="bg-amber-50 px-6 py-12 md:py-16">

        <div className={styles.insidecont}>
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-black mb-6">
                  CALL FOR APPLICATIONS & NOMINATIONS:
                <br />
                   Join the Prestigious NESA Africa 2025 Judging Panel!
                 </h2>
          
            
                   <p className="text-gray-800 mb-6 font-normal">
                   The NESA-Africa 2025 Awards invite distinguished professionals, educators, policymakers,
               corporate leaders, and education advocates to join our prestigious judging panel through four official entry paths.
             </p>

             {/* Four Entry Paths */}
             <div className="mb-8">
               <h3 className="text-xl font-bold text-gray-900 mb-4">Four Ways to Become a Judge:</h3>
               <div className="grid md:grid-cols-2 gap-4 mb-6">
                 <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                   <h4 className="font-bold text-blue-800 mb-2">1. Official Invitation</h4>
                   <p className="text-blue-700 text-sm">Handpicked by the Board of Advisors or CVO due to past impact and sector expertise.</p>
                 </div>
                 <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                   <h4 className="font-bold text-green-800 mb-2">2. Institutional Nomination</h4>
                   <p className="text-green-700 text-sm">Endorsed by registered NESA-Africa partners, chapters, universities, or agencies.</p>
                 </div>
                 <div className="bg-orange-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                   <h4 className="font-bold text-amber-800 mb-2">3. Direct Application</h4>
                   <p className="text-amber-700 text-sm">Qualified professionals and education experts apply directly via our online portal.</p>
                 </div>
                 <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                   <h4 className="font-bold text-purple-800 mb-2">4. Ambassador Upgrade</h4>
                   <p className="text-purple-700 text-sm">Active volunteers or board members promoted after internal recommendation and training.</p>
                 </div>
               </div>
             </div>
          </div>

          <div className={styles.grid}>
                 {/* LEFT COLUMN */}
              <div className={styles.leftcol}>
              <p className="text-gray-800 mb-6">
               This is an opportunity to contribute to shaping Africa's 
               educational excellence, while being recognized as a 
               NESA Africa Ambassador with exclusive access to 
               networking opportunities, VIP events, and leadership 
               recognition.
             </p>
            
             <p className="text-gray-800 mb-8">
               Judging is a volunteer activity, but corporate sponsors 
               can nominate company representatives as part of their 
               CSR (Corporate Social Responsibility) engagement in 
               education.
             </p>
            
            <div className="flex flex-wrap gap-4">
              <Button
                text="Apply To Judge"
                variant="filled"
                onClick={() => router.push("/judge-application-form")}
                className="bg-amber-400 hover:bg-amber-500 text-black font-medium py-3 px-8 rounded-md transition-colors"
              />

              <button
                onClick={() => router.push("/Judgesnominate")}
                className="bg-gray-200 hover:bg-gray-300 text-black font-medium py-3 px-8 rounded-md transition-colors"
              >
                Nominate A Judge
              </button>
            </div>
          </div>
          
          {/* Right Image Column */}
          <div className="lg:w-1/3 flex items-center justify-center">
            <div className="relative">
              <div className="absolute -top-1 -right-2 -bottom-2 -left-2 bg-black rounded-xl -z-10"></div>
              <div className=" rounded-xl overflow-hidden">
                <Image 
                  src="/images/judgeguide.png"
                  width={30} 
                   height={80}
                   alt="Graduation cap on stack of books with medal" 
                   className={styles.img}
                 />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    // <div className="bg-amber-50 px-6 py-12 md:py-16">
    //   <div className="max-w-6xl mx-auto">
    //     <div className={styles.cont}>
    //       {/* Left Content Column */}
    //       <div className="lg:w-2/3">
    //         <div className={styles.topText}>
    //         <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6">
    //           CALL FOR APPLICATIONS & NOMINATIONS:
    //           <br />
    //           Join the Prestigious NESA Africa 2025 Judging Panel!
    //         </h2>
          
            
    //         <p className="text-gray-800 mb-6">
    //           The New Education Standard Award Africa 2025, hosted by SCEF Nigeria Local Chapter, invites 
    //           distinguished professionals, educators, policymakers, corporate leaders, and education advocates to 
    //           apply or be nominated to serve as volunteer judges for this year's awards.
    //         </p>
    //         </div>

    //         <div>
            
    //         <p className="text-gray-800 mb-6">
    //           This is an opportunity to contribute to shaping Africa's 
    //           educational excellence, while being recognized as a 
    //           NESA Africa Ambassador with exclusive access to 
    //           networking opportunities, VIP events, and leadership 
    //           recognition.
    //         </p>
            
    //         <p className="text-gray-800 mb-8">
    //           Judging is a volunteer activity, but corporate sponsors 
    //           can nominate company representatives as part of their 
    //           CSR (Corporate Social Responsibility) engagement in 
    //           education.
    //         </p>
            
    //         <div className="flex flex-wrap gap-4">
    //           <a href="#" className="bg-amber-400 hover:bg-amber-500 text-black font-medium py-3 px-8 rounded-md transition-colors">
    //             Apply To Judge
    //           </a>
    //           <a href="#" className="bg-gray-200 hover:bg-gray-300 text-black font-medium py-3 px-8 rounded-md transition-colors">
    //             Nominate A Judge
    //           </a>
    //         </div>
    //                       
    //             <Image 
    //               src="/images/judgeguide.png"
    //               width={30} 
    //               height={80}
    //               alt="Graduation cap on stack of books with medal" 
    //               className="w-full h-auto max-w-[600px] mx-auto mt-8"
    //             />
    //           </div>
    //          

    //       </div>
          
    //     </div>
    //   </div>
    // </div>
  );
}