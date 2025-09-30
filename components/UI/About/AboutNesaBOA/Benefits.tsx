"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const benefits = [
  "Public listing on NESA-Africa Advisors page (photo, bio, region/sector).",
  "Recognition during Week of Impact; certificate of service.",
  "Co-author/credit on select knowledge notes and policy micro-sessions.",
  "Priority briefings on rubric updates and data insights.",
  "Invitation to regional convenings and diaspora town halls.",
];

export default function Benefit() {
  return (
    <section className="relative bg-[#17120a] text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-block px-6 py-3 rounded-2xl bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] shadow-[0_0_18px_rgba(245,158,11,0.45)]">
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              Benefits & Recognition
            </h2>
          </div>
        </motion.div>

        {/* Benefits List */}
        <ul className="space-y-6">
          {benefits.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-5 rounded-xl bg-[#1a140b]/70 border border-[#2a1f15] shadow-[0_0_12px_rgba(245,158,11,0.25)] hover:shadow-[0_0_20px_rgba(245,158,11,0.55)] transition-all duration-300"
            >
              <Star className="text-[#f59e0b] w-6 h-6 flex-shrink-0 mt-1" />
              <p className="text-gray-200 leading-relaxed">{item}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
