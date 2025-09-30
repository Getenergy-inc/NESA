"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileSignature, ClipboardCheck, Mail, UserPlus } from "lucide-react";

const steps = [
  {
    step: "Step 1 — Submit the Advisor EOI/Nomination Form",
    details: [
      "Full name, title, organization, country/region",
      "Category applying for (see list above)",
      "150-word bio + headshot",
      "1-page CV (or LinkedIn)",
      "Two references (names/emails) — for peer nominations",
      "COI declaration (affiliations, current grants/contracts)",
      "Consent to privacy & communications policy",
    ],
    icon: FileSignature,
  },
  {
    step: "Step 2 — Vetting",
    details: [
      "Light due diligence (credentials, references, adverse media/PEP/sanctions check).",
    ],
    icon: ClipboardCheck,
  },
  {
    step: "Step 3 — Invitation & Charter",
    details: [
      "If selected, you’ll receive an Advisor Invitation Letter, the Advisory Charter, and annual call dates.",
    ],
    icon: Mail,
  },
  {
    step: "Step 4 — Onboarding",
    details: [
      "Add bio/photo to the Advisors page, join the next plenary, and opt into a working group.",
    ],
    icon: UserPlus,
  },
];

export default function ApplyNominate() {
  return (
    <section className="relative bg-[#17120a] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-3 rounded-2xl bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] shadow-[0_0_18px_rgba(245,158,11,0.45)]">
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              Apply / Nominate
            </h2>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 gap-10">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-[#1a140b]/70 border border-[#2a1f15] shadow-[0_0_12px_rgba(245,158,11,0.25)] hover:shadow-[0_0_20px_rgba(245,158,11,0.55)] transition-all duration-300"
            >
              <item.icon className="w-10 h-10 text-[#f59e0b] mb-4" />
              <h3 className="text-xl font-semibold mb-3">{item.step}</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {item.details.map((d, idx) => (
                  <li key={idx}>{d}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact + CTA Buttons */}
        <div className="text-center mt-14">
          <p className="text-gray-300 mb-6">
            Questions?{" "}
            <a
              href="mailto:advisors@nesa.africa"
              className="text-[#f59e0b] underline hover:text-[#ea580c] transition"
            >
              advisors@nesa.africa
            </a>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {/* Apply Button */}
           <Link
               href="/about/boa/eoi-form"
              className="inline-block px-8 py-3 text-lg font-medium rounded-xl bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] text-white shadow-[0_0_15px_rgba(245,158,11,0.45)] hover:shadow-[0_0_25px_rgba(245,158,11,0.7)] transition-all duration-300"
            >
              Open the Advisor EOI Form
            </Link>

            {/* Nominate Button */}
            <a
              href="/about/boa/nominate"
              className="inline-block px-8 py-3 text-lg font-medium rounded-xl border border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b] hover:text-white shadow-[0_0_12px_rgba(245,158,11,0.3)] hover:shadow-[0_0_22px_rgba(245,158,11,0.55)] transition-all duration-300"
            >
              Nominate an Advisor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
