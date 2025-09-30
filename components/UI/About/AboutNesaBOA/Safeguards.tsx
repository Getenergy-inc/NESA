"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const safeguards = [
  {
    title: "Independence",
    desc: "Advisors do not sit on judging panels and do not vote on nominees/winners.",
  },
  {
    title: "COI & Recusal",
    desc: "Declare affiliations; recuse from topics with conflicts.",
  },
  {
    title: "Firewall Language",
    desc: "“Funding does not influence nominations or winners.”",
  },
  {
    title: "Privacy & Ethics",
    desc: "NDPR/GDPR, data minimization, consent-led communications.",
  },
  {
    title: "Brand Use",
    desc: "Prior written approval; revocation clause for misuse.",
  },
  {
    title: "Anti-Bribery / AML / Sanctions",
    desc: "Zero tolerance; gifts/hospitality cap per policy.",
  },
];

export default function Safeguards() {
  return (
    <section className="relative bg-white text-[#17120a] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-3 rounded-2xl ">
            <h2 className="text-3xl md:text-4xl font-bold text-[#f59e0b] drop-shadow-lg ">
              Safeguards (Apply to Every Advisor)
            </h2>
          </div>
        </motion.div>

        {/* Safeguards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safeguards.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              viewport={{ once: true }}
              className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] shadow-[0_0_12px_rgba(245,158,11,0.25)] hover:shadow-[0_0_20px_rgba(245,158,11,0.55)] transition-all duration-300"
            >
              <div className="h-full w-full rounded-2xl bg-white p-6 flex flex-col">
                <ShieldCheck className="w-8 h-8 text-[#f59e0b] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
