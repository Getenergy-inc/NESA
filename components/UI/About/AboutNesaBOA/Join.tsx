"use client";

import { motion } from "framer-motion";
import { Users, UserCheck, FileText } from "lucide-react";

const paths = [
  {
    title: "Path A — Institutional Nomination",
    description:
      "By AU bodies/UN agencies/DFIs, ministries, embassies, universities, professional bodies, foundations.",
    icon: Users,
  },
  {
    title: "Path B — Peer Nomination",
    description:
      "By two senior referees (from different institutions) with relevant track records.",
    icon: UserCheck,
  },
  {
    title: "Path C — Open Expression of Interest (EOI)",
    description:
      "Submit via the form below; we consider on rolling basis to maintain balance.",
    icon: FileText,
  },
];

const criteria = [
  "Expertise fit",
  "Regional/gender/inclusion balance",
  "Integrity record",
  "Time commitment",
  "Ability to add public value (without conflicts)",
];

const timelines = [
  "Wave 1 confirmations: by 31 Oct 2025",
  "Wave 2 additions: Jan–Mar 2026 (balance & gaps)",
  "Annual refresh: Q4 2026",
];

export default function Join() {
  return (
    <section className="relative bg-white text-[#1a140b] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-3 rounded-2xl bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] shadow-[0_0_18px_rgba(245,158,11,0.45)]">
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              How to Join (Three Paths)
            </h2>
          </div>
        </motion.div>

        {/* Paths */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {paths.map((path, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-[#f9f6f2] border border-[#f59e0b]/40 shadow-[0_0_12px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all duration-300"
            >
              <path.icon className="w-10 h-10 text-[#ea580c] mb-4" />
              <h3 className="text-xl font-semibold mb-2">{path.title}</h3>
              <p className="text-gray-700">{path.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Criteria */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-semibold text-[#2a1f15] mb-4">
            Selection Criteria
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {criteria.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </motion.div>

        {/* Timelines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-[#2a1f15] mb-4">
            2025–2027 Timelines
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {timelines.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
