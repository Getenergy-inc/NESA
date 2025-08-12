import Image from "next/image";
import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";

const data = [
  { heading: "15k+", name: "Students Reached" },
  { heading: "500+", name: "Partners" },
  { heading: "300+", name: "Awarded Leaders" },
];

const AboutHeader = () => {
  return (
    <header className="relative inset-0 min-h-screen w-screen text-white py-10 ">
      {/* Background Image */}
      <Image
        src="/images/hero.jpeg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#191307CC] z-10"></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto">
        <motion.div
          variants={parentV}
          initial="initial"
          animate="animate"
          className="flex flex-col  gap-8 md:gap-16 pt-12 md:pt-18"
        >
          <motion.div variants={toTopV} className="">
          <div className="flex flex-col md:flex-row space-y-6 items-center w-full md:justify-between">
            <h1 className="text-4xl md:text-5xl bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
              About Us
            </h1>
            <div className="flex justify-between items-center">
              {data.map((item, id) => (
                <div key={id} className="text-center flex items-center">
                  <div className="flex flex-col items-center">
                    <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                      {item.heading}
                    </p>
                    <p className="text-sm md:text-base mt-1">{item.name}</p>
                  </div>
                  {id < data.length - 1 && (
                    <div className="w-px h-14 bg-gradient-to-r from-[#FFC247] to-[#E48900] mx-2 md:mx-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          </motion.div>


        </motion.div>
              <div className="grid lg:grid-cols-2 lg:gap-6">
            <motion.div variants={toTopV} className="md:text-justify pt-10">
            <p className="text-sm mb-4">
            <span className="bg-gradient-to-r from-[#FFC247] to-[#E48900] inline text-transparent bg-clip-text font-poppins font-medium text-[24px] leading-[32px] tracking-[0%]">
              New Education Standard Award Africa (NESA Africa)  
            </span>{' '}
            <span className="font-poppins font-normal text-[16px] leading-[32px] tracking-[0%]">
               is a prestigious initiative committed to recognizing and celebrating excellence, innovation, and impactful contributions in education across Africa. Established to set new benchmarks in education, the awards serve as a catalyst for change, inspiring organizations, institutions, governments, and individuals to drive lasting improvements in the African education sector.
            </span>
            </p>
            <p className="text-base lg:text-lg mb-4">
            <span className="bg-gradient-to-r from-[#FFC247] to-[#E48900] inline text-transparent bg-clip-text font-poppins font-medium text-[24px] leading-[32px] tracking-[0%]">
            NESA Africa 2025,{' '}
            </span>
            <span className="font-poppins font-normal text-[16px] leading-[32px] tracking-[0%]">
             hosted by the {' '}
             </span>
             <span className="bg-gradient-to-r from-[#FFC247] to-[#E48900] inline text-transparent bg-clip-text font-poppins font-medium text-[16px] leading-[32px] tracking-[0%]">
             Santos Creations Educational Foundation (SCEF) Nigeria Local Chapter, </span>
             <span className="font-poppins font-normal text-[16px] leading-[32px] tracking-[0%]">
             marks the inaugural edition of this transformative initiative. The awards are structured to encourage educational development through sustainable partnerships, leveraging Corporate Social Responsibility (CSR), policy advocacy, philanthropy, and community engagement.
             </span>
            </p>
            <p>
            <span className="font-poppins font-normal text-[16px] leading-[32px] tracking-[0%]">
            As part of its long-term vision (2025–2030), NESA Africa will transition into a continental movement, expanding its impact across the five African regions while engaging diaspora and global partners in ensuring education for all.
            </span>
            </p>
          </motion.div>

        <motion.div variants={opacityV} className="mt-12 relative overflow-hidden">
          <div className="relative w-full ml-auto max-w-[1200px] h-[300px] md:h-[610px] lg:container ">
            <video
              src="/images/about.mp4"
              className="w-full h-full object-cover rounded-md"
              controls
            />
          </div>
        </motion.div>
        </div>
      </div>
    </header>
  );
};

export default AboutHeader;
