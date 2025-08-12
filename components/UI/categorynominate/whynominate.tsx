"use client";

import { motion } from "framer-motion";
import { toTopV } from "@/lib/utils/variants";

const WhyNominate = () => {
  return (
    <section className="bg-[#fff5e0] py-10 px-6 md:px-8 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Title with underline */}
        <motion.h3
            variants={toTopV}
            className="_under_border text-[#1E1E1E] text-lg md:text-xl lg:text-2xl font-bold mb-4"
          >
            Why Nominate?
        </motion.h3>


        {/* Bullet List */}
        <div className="flex flex-col gap-2 text-[#1E1E1E] text-sm md:text-base lg:text-lg leading-relaxed font-inter">
          <div className="flex items-start gap-3">
            <span className="w-2.5 h-2.5 mt-2 rounded-full bg-[#F7A500] flex-shrink-0"></span>
            <p>
              <strong>Prestige & Recognition:</strong> Winners gain continental recognition.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-2.5 h-2.5 mt-2 rounded-full bg-[#F7A500] flex-shrink-0"></span>
            <p>
              <strong>Networking & Partnerships:</strong> Open doors to international collaborations.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-2.5 h-2.5 mt-2 rounded-full bg-[#F7A500] flex-shrink-0"></span>
            <p>
              <strong>Funding & Support:</strong> Increased visibility attracts investors and grants
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-2.5 h-2.5 mt-2 rounded-full bg-[#F7A500] flex-shrink-0"></span>
            <p>
              <strong>Showcasing Impact:</strong> Celebrate outstanding efforts in education reform and sustainability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyNominate;

