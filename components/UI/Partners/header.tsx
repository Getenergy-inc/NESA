"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { toTopV, parentV } from "@/lib/utils/variants";

const PartnersHeader = () => {
  return (
    <header>
      <div className={`min-h-[40rem] bg-zinc-200 text-white relative py-10`}>
        <div className="absolute top-0 left-0 h-full w-full">
          <Image
            src={"/images/bg/about_.png"}
            alt="hero image"
            width={1240}
            height={800}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-[#15110999] absolute top-0 left-0 w-full h-full"></div>

        <div className="w-full h-full flex items-center justify-center absolute top-0 left-0 overflow-hidden">
          <motion.div variants={parentV} initial="initial" animate="animate" className="text-center space-y-4">
            <motion.h1 variants={toTopV} className="font-bold md:text-6xl text-5xl">
              Partnerships and <br className="hidden md:block" /> Collaborations @ NESA Africa
            </motion.h1>
            <motion.p variants={toTopV}>
              Recognizing players who contributed to the growth of the Nigerian <br /> education sector and fostering
              innovations
            </motion.p>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default PartnersHeader;
