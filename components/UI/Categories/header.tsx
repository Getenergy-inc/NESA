"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { toTopV, parentV } from "@/lib/utils/variants";

const CategoriesHeader = () => {
  return (
    <header>
      <div className={`md:min-h-[35rem] min-h-screen bg-zinc-200 text-white relative`}>
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

        <div className="w-full h-full flex items-center absolute top-0 left-0 md:pt-12 pt-28 text-center md:text-start">
          <motion.div
            variants={parentV}
            initial="initial"
            animate="animate"
            className="container grid md:grid-cols-2 gap-6 md:gap-0 items-center"
          >
            <motion.div variants={toTopV} className="space-y-6">
              <h1 className="font-bold md:text-5xl text-4xl text-primaryGold md:leading-[1.4]">
                New Education Standard Award: The Award categories
              </h1>

              <p className="md:text-lg leading-8 text-center md:text-justify">
                These are the 15 main categories to nominate your champions from, within them are subcategories showing
                levels of recognition.
              </p>
            </motion.div>

            <motion.div variants={toTopV} className="grid place-content-center opacity-40 duration-300 md:opacity-100">
              <Image src={"/images/logos/big_logo.png"} alt="logo" width={500} height={500} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default CategoriesHeader;
