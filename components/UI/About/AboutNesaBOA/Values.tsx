"use client";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Lightbulb, Users, BookOpen } from "lucide-react";

const values = [
  {
    title: "Protect integrity",
    description:
      "Keep judging independent and transparent (published criteria, weightings, COI/recusal).",
    icon: Shield,
  },
  {
    title: "Raise standards",
    description:
      "Align categories and indicators to classroom outcomes, skills/TVET, inclusion, gender equity, and digital learning.",
    icon: TrendingUp,
  },
  {
    title: "Guide programs",
    description:
      "Shape Teacher Innovation Micro-Grants, Library/Digital Corners, STEM for Girls, and Diaspora Town Halls (impact, not awards).",
    icon: Lightbulb,
  },
  {
    title: "Convene the ecosystem",
    description:
      "Connect ministries, institutions, private sector CSR/ESG, academia, NGOs, creators, and diaspora.",
    icon: Users,
  },
  {
    title: "Share knowledge",
    description:
      "Co-author light “notes” and briefings that help educators and policymakers act.",
    icon: BookOpen,
  },
];

export default function Values() {
  return (
    <section className="bg-[#17120a] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-12 text-[#f59e0b]"
        >
          Why this Board Exists
        </motion.h2>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-[#2a1f15] p-6 rounded-2xl shadow-lg hover:shadow-[#ea580c]/40 transition-all duration-300 border border-[#ea580c]/20 hover:border-[#ea580c]/60"
            >
              <div className="flex items-center gap-3 mb-4">
                <value.icon className="w-8 h-8 text-[#ea580c]" />
                <h3 className="text-xl font-semibold text-[#f59e0b]">
                  {value.title}
                </h3>
              </div>
              <p className="text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-gray-400 max-w-3xl mx-auto"
        >
          Advisory scope is non-fiduciary and non-remunerated. Travel/appearance
          support may be provided case-by-case.
        </motion.p>
      </div>
    </section>
  );
}
