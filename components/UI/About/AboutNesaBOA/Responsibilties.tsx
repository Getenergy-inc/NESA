"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const responsibilities = [
  "Review and comment on criteria, weights, and category definitions once per year.",
  "Advise on program design (micro-grants, libraries, STEM kits, diaspora town halls).",
  "Join two plenary calls per year (+ optional working-group sprints).",
  "Provide short quotes/forewords for governance pages or knowledge notes.",
  "Participate in one micro-session during the Week of Impact (optional, non-awards).",
  "Uphold the firewall, COI, privacy, and brand-use rules at all times.",
];

export default function Responsibilities() {
  return (
    <section className="relative bg-[#17120a] text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block px-6 py-3 rounded-2xl bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] shadow-[0_0_15px_rgba(245,158,11,0.45)]">
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              What Advisors Do (Responsibilities)
            </h2>
          </div>
        </motion.div>

        {/* Responsibilities List */}
        <ul className="space-y-6">
          {responsibilities.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-4 rounded-xl bg-[#1a140b]/60 border border-[#2a1f15] shadow-[0_0_12px_rgba(245,158,11,0.25)] hover:shadow-[0_0_20px_rgba(245,158,11,0.55)] transition-all duration-300"
            >
              <CheckCircle2 className="text-[#f59e0b] w-6 h-6 flex-shrink-0 mt-1" />
              <p className="text-gray-200 leading-relaxed">{item}</p>
            </motion.li>
          ))}
        </ul>

        {/* Time Commitment & Term */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-gray-300"
        >
          <p className="mb-2">
            <strong>Time commitment:</strong> ~12–18 hours/year (virtual first; on-site appearances optional).
          </p>
          <p>
            <strong>Term:</strong> 24 months, 2025–2027, renewable by mutual consent.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
