"use client";

import Button from "@/components/Common/Button";
import { primaryBtn } from "@/lib/helpers";
import { DivParentInView } from "@/lib/utils/framer-transitions";
import { toTopV } from "@/lib/utils/variants";
import { motion } from "framer-motion";
import Image from "next/image";

const AboutNewEducation = () => {
  return (
    <>
      <section className="relative bg-[#fff5e0] py-10">
        <div className="container grid md:grid-cols-2 gap-16 items-stretch">
          <DivParentInView className="space-y-6 container flex flex-col justify-center">
            <motion.h3
              variants={toTopV}
              className="_under_border font-bold text-darkGold md:text-2xl sm:text-lg"
            >
              About NESA Africa
            </motion.h3>

            <motion.p
              variants={toTopV}
              className="font-medium md:text-[2.6rem] text-4xl"
            >
              Our Mission: Advocating for the <br /> Achievement of Education for All in Africa 
            </motion.p>

            <DivParentInView className="space-y-6 text-lg md:text-xl">
              <motion.p variants={toTopV} className="text-black">
          <span className="text-primaryGold">
            New Education Standard Award Africa (NESA Africa) 2024
          </span>{" "}
          is dedicated to honoring and celebrating outstanding contributions to education throughout Africa. Hosted by the NESA- Africa Nigeria Local chapter, this landmark ceremony highlights achievements that reflect our commitment to <span className="text-primaryGold">SDG Goal 4</span>, focusing on ensuring inclusive and equitable quality education for all. 
              </motion.p>

              <motion.p variants={toTopV}>
              As we prepare for the grand final award event and dinner in February 2025, we invite you to explore how you can be part of this prestigious occasion. Learn about our nomination process, view the award categories, and find out how you can get involved as a sponsor, member, or volunteer. Together, let’s celebrate and advance educational excellence across Africa.
              </motion.p>

              <Button text="Learn More" variant="filled" />
            </DivParentInView>
          </DivParentInView>
          <div className="grid place-content-center">
            <video
              src={"/images/about.mp4"}
              width={720}
              height={900}
              loop
              muted={false}
              controls
              playsInline
              className="w-full h-full max-w-[900px] rounded-[16px] object-cover"
            >
              <track kind="captions" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutNewEducation;