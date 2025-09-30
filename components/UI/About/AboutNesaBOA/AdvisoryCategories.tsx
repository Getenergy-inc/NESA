"use client";

import { motion } from "framer-motion";

const categories = [
  {
    title: "Honorary Advisory & Governance Council (10–16)",
    desc: "Continental statespersons, former ministers/VCs, eminent educators; provides governance signals and public trust.",
  },
  {
    title: "Technical & Methodology Panel (8–12)",
    desc: "SDG4/Agenda 2063 alignment, ethics, inclusion, measurement. (UNESCO/IICBA and peer institutions as technical advisers/observers.)",
  },
  {
    title: "Knowledge & Development Partners Circle (6–10)",
    desc: "Bank/DFI and research partners (e.g., skills/TVET, digital learning, labor insights). (AfDB-type roles as “knowledge partners/observers”.)",
  },
  {
    title: "Sector & Program Panels (5–9 each)",
    desc: "EdTech & Digital Learning • STEM for Girls & Youth Skills • Libraries, Reading & Open Knowledge • Inclusive/Special Needs Education • Sustainability & Climate-Smart Schools • Media in Education & Literacy • TVET, Employability & Entrepreneurship",
  },
  {
    title: "Regional Hubs (5 regions × 4–6 each)",
    desc: "North • West • Central • East • Southern Africa — ensure continental balance and context.",
  },
  {
    title: "Diaspora Council (AU Sixth Region) (8–12)",
    desc: "US/Canada • UK/Europe • Middle East • Asia-Pacific — bridge communities, scholarships, and town halls.",
  },
  {
    title: "Youth & Teacher Advisory Forum (10–15)",
    desc: "Teachers, student/youth leaders, union/association reps — voice of classroom realities.",
  },
  {
    title: "Civil Society & Philanthropy Circle (6–10)",
    desc: "Foundations, NGOs, community networks — equity, accountability, and field evidence.",
  },
  {
    title: "Private Sector CSR/ESG Circle (8–12)",
    desc: "Corporate CSR/ESG strategists. Strict firewall: no role in judging, nominations, or outcomes.",
  },
  {
    title: "Media & Creators Advisory (6–10)",
    desc: "Editors, radio/TV anchors, creators — literacy, safety, and reach (with brand/ethics guardrails).",
  },
];

export default function AdvisoryCategories() {
  return (
    <section className="relative bg-white text-[#1a140b] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl text-[#ea580b] md:text-5xl font-bold mb-4">
            Advisory Categories & Seat Map (2025–2027)
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We balance expertise, region, gender, and inclusion. Target sizes
            are indicative; final composition is curated.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div
                className="
                  h-full rounded-2xl bg-white border border-gray-200 p-6 flex flex-col
                  shadow-[0_0_15px_rgba(245,158,11,0.25)]
                  hover:shadow-[0_0_25px_rgba(245,158,11,0.55)]
                  transition-all duration-300
                "
              >
                <h3 className="font-bold text-xl mb-3 text-[#f59e0b]">
                  {cat.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{cat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-gray-600 text-sm"
        >
          <strong>Note:</strong> Advisors help shape categories, methodology,
          and programs; they do not adjudicate winners and must declare/recuse
          from any conflicts.
        </motion.p>
      </div>
    </section>
  );
}
