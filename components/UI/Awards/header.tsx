"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { toTopV, parentV } from "@/lib/utils/variants";

const AwardHeader = () => {
  return (
    <header>
      <div className={`md:min-h-[40rem] min-h-screen bg-zinc-200 text-white relative overflow-hidden`}>
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

        <div className="w-full h-full flex items-center absolute top-0 left-0 md:pt-12 sm:pt-52 pt-56">
          <motion.div
            variants={parentV}
            initial="initial"
            animate="animate"
            className="container grid md:grid-cols-2 items-center"
          >
            <motion.div variants={toTopV} className="space-y-6">
              <h1 className="font-bold lg:text-5xl text-4xl text-midGold lg:leading-[1.4]">
                Nigeria Education Standard Award: The award of the decade
              </h1>

              <p>
                NESA stands as the pinnacle award of the decade, a fervent celebration of excellence within the Nigerian
                education system. We uplift contributors, ignite innovation, and envision an ecosystem where excellence
                becomes the driving force for transformative change
              </p>
            </motion.div>

            <motion.div variants={toTopV} className="grid place-content-center opacity-40 md:opacity-100 duration-300">
              <Image src={"/images/logos/big_logo.png"} alt="logo" width={500} height={500} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default AwardHeader;
