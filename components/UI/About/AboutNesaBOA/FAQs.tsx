"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Is this the Board of Directors?",
    a: "No. This is an Advisory body. It guides governance, methodology, and programs; it does not have fiduciary duties.",
  },
  {
    q: "Can advisors judge awards?",
    a: "No. Advisors do not judge, shortlist, or vote on winners. They help shape frameworks, then step back.",
  },
  {
    q: "Are advisors paid?",
    a: "No. This is a voluntary, honorific role. Reasonable event participation support may be provided.",
  },
  {
    q: "Can corporate CSR leaders serve?",
    a: "Yes, in the CSR/ESG Circle, under strict firewall & COI rules. No role in judging or nominee influence.",
  },
  {
    q: "What if I have a conflict?",
    a: "Declare it; you’ll be recused from related topics. We log COI and publish guardrails.",
  },
  {
    q: "Can advisors help with endorsements or knowledge sessions?",
    a: "Yes—advisors often help unlock policy/technical support and co-host micro-sessions. These activities remain non-financial and award-independent.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="relative bg-[#17120a] text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-3 rounded-2xl bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] shadow-[0_0_18px_rgba(245,158,11,0.4)]">
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              Frequently Asked Questions
            </h2>
          </div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-xl border border-[#f59e0b]/40 bg-[#1f1a11] shadow-[0_0_12px_rgba(245,158,11,0.25)] overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-[#f59e0b]" />
                  <span className="text-lg font-medium">{faq.q}</span>
                </div>
                {openIndex === i ? (
                  <ChevronUp className="w-5 h-5 text-[#f59e0b]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#f59e0b]" />
                )}
              </button>
              {openIndex === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="px-6 pb-5 text-[#f59e0b] leading-relaxed"
                >
                  {faq.a}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
