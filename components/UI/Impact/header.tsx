"use client";

import { motion } from "framer-motion";
import { opacityV, parentV } from "@/lib/utils/variants";
import Image from "next/image";

const ImpactHeader = () => {
  return (
    <header>
      <div className={`min-h-[45rem] bg-zinc-200 text-white relative py-10`}>
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

        <div className="w-full h-full flex items-center absolute top-0 left-0 pt-12">
          <div className="container">
            <motion.div
              variants={parentV}
              initial="initial"
              animate="animate"
              className="space-y-6 text-center py-8"
            >
              <motion.div variants={opacityV} className="space-y-2">
                <h1 className="font-bold md:text-5xl text-4xl text-midGold md:leading-[1.4]">
                  IMPACT @ NESA AFRICA
                </h1>
                <p className="max-w-2xl mx-auto text-center">
                  In a country facing infrastructural deficits, outdated
                  curricula, and educator motivation issues, NESA Nigeria
                  strives to encourage government bodies, NGOs, UN agencies, CSR
                  initiatives, and private entities to play pivotal roles in
                  improving education
                </p>
              </motion.div>
              <div className="h-[520px] w-[1280px] flex justify-center mx-auto">
                <video
                  src={"/images/about.mp4"}
                  width={1280}
                  height={500}
                  autoPlay
                  loop
                  muted={false}
                  controls
                  playsInline
                  className="w-full h-auto max-w-[1280px] mx-auto  object-cover"
                ></video>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ImpactHeader;
