// import Image from "next/image";
// import { motion } from "framer-motion";
// import { toTopV, parentV, opacityV } from "@/lib/utils/variants";

// const data = [
//   { heading: "15k+", name: "Students Reached" },
//   { heading: "500+", name: "Partners" },
//   { heading: "300+", name: "Awarded Leaders" },
// ];

// const AboutHeader = () => {
//   return (
//     <header className="relative inset-0 min-h-screen w-screen text-white py-10 ">
//       {/* Background Image */}
//       <Image
//         src="/images/hero.jpeg"
//         alt="Background"
//         layout="fill"
//         objectFit="cover"
//         quality={100}
//         className="z-0"
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-[#191307CC] z-10"></div>

//       {/* Content */}
//       <div className="relative z-20 container mx-auto">
//         <motion.div
//           variants={parentV}
//           initial="initial"
//           animate="animate"
//           className="flex flex-col  gap-8 md:gap-16 pt-12 md:pt-18"
//         >
//           <motion.div variants={toTopV} className="">
//           <div className="flex flex-col md:flex-row space-y-6 items-center w-full md:justify-between">
//             <h1 className="text-4xl md:text-5xl bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
//               About Us
//             </h1>
//             <div className="flex justify-between items-center">
//               {data.map((item, id) => (
//                 <div key={id} className="text-center flex items-center">
//                   <div className="flex flex-col items-center">
//                     <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
//                       {item.heading}
//                     </p>
//                     <p className="text-sm md:text-base mt-1">{item.name}</p>
//                   </div>
//                   {id < data.length - 1 && (
//                     <div className="w-px h-14 bg-gradient-to-r from-[#FFC247] to-[#E48900] mx-2 md:mx-4"></div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//           </motion.div>


//         </motion.div>
//               <div className="grid lg:grid-cols-2 lg:gap-6">
//             <motion.div variants={toTopV} className="md:text-justify pt-10">
//             <p className="text-sm mb-4">
//             <span className="bg-gradient-to-r from-[#FFC247] to-[#E48900] inline text-transparent bg-clip-text font-poppins font-medium text-[24px] leading-[32px] tracking-[0%]">
//               New Education Standard Award Africa (NESA Africa)  
//             </span>{' '}
//             <span className="font-poppins font-normal text-[16px] leading-[32px] tracking-[0%]">
//                is a prestigious initiative committed to recognizing and celebrating excellence, innovation, and impactful contributions in education across Africa. Established to set new benchmarks in education, the awards serve as a catalyst for change, inspiring organizations, institutions, governments, and individuals to drive lasting improvements in the African education sector.
//             </span>
//             </p>
//             <p className="text-base lg:text-lg mb-4">
//             <span className="bg-gradient-to-r from-[#FFC247] to-[#E48900] inline text-transparent bg-clip-text font-poppins font-medium text-[24px] leading-[32px] tracking-[0%]">
//             NESA Africa 2025,{' '}
//             </span>
//             <span className="font-poppins font-normal text-[16px] leading-[32px] tracking-[0%]">
//              hosted by the {' '}
//              </span>
//              <span className="bg-gradient-to-r from-[#FFC247] to-[#E48900] inline text-transparent bg-clip-text font-poppins font-medium text-[16px] leading-[32px] tracking-[0%]">
//              Santos Creations Educational Foundation (SCEF) Nigeria Local Chapter, </span>
//              <span className="font-poppins font-normal text-[16px] leading-[32px] tracking-[0%]">
//              marks the inaugural edition of this transformative initiative. The awards are structured to encourage educational development through sustainable partnerships, leveraging Corporate Social Responsibility (CSR), policy advocacy, philanthropy, and community engagement.
//              </span>
//             </p>
//             <p>
//             <span className="font-poppins font-normal text-[16px] leading-[32px] tracking-[0%]">
//             As part of its long-term vision (2025–2030), NESA Africa will transition into a continental movement, expanding its impact across the five African regions while engaging diaspora and global partners in ensuring education for all.
//             </span>
//             </p>
//           </motion.div>

//         <motion.div variants={opacityV} className="mt-12 relative overflow-hidden">
//           <div className="relative w-full ml-auto max-w-[1200px] h-[300px] md:h-[610px] lg:container ">
//             <video
//               src="/images/about.mp4"
//               className="w-full h-full object-cover rounded-md"
//               controls
//             />
//           </div>
//         </motion.div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default AboutHeader;







"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const AboutHeader = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Detect when video block is in view
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  const stats = [
    { value: 15000, suffix: "+", label: "Students Reached", delay: 0.2 },
    { value: 500, suffix: "+", label: "Partners", delay: 0.4 },
    { value: 300, suffix: "+", label: "Awarded Leaders", delay: 0.6 },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden text-white"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/bg/hero-image.jpeg" 
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-lg">
            About Us
          </h2>
          <p className="text-2xl font-semibold mt-2 mb-6 text-white/90">
            The Founding Story
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-start border-l-4 border-yellow-500 pl-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: stat.delay, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="text-3xl font-extrabold text-yellow-400">
                  {stat.value}
                  {stat.suffix}
                </span>
                <span className="text-base font-medium text-white/80">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-white/80 leading-relaxed mb-4">
              New Education Standard Award Africa (NESA Africa) is an initiative
              designed to recognize, celebrate, and foster educational excellence
              and innovation across the African continent. Rooted in the vision of
              enhancing the quality of education and making it accessible to all.
            </p>
            <p className="text-white/80 leading-relaxed">
              NESA Africa operates with the mission of spotlighting significant
              contributions by individuals, organizations, educational institutions,
              and other stakeholders towards achieving these goals.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Content (Autoplay Video) */}
        <motion.div
          ref={containerRef}
          className="relative w-full h-64 md:h-[500px] rounded-xl overflow-hidden shadow-xl bg-gray-900/50"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <video
            ref={videoRef}
            src="/images/about.mp4"
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHeader;
