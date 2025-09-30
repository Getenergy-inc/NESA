"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SponsorshipPage() {
  const tiers = [
    {
      name: "Supporter",
      price: "$2,000",
      inclusions:
        "Logo on Endorsers & Sponsors Wall; 2 social posts; Gala program listing; 1 Expo pass.",
    },
    {
      name: "Partner",
      price: "$3,500",
      inclusions:
        "Supporter + small booth/roll-up; 1 creator integration; press note inclusion.",
    },
    {
      name: "Impact Partner (sweet spot)",
      price: "$5,000",
      inclusions:
        "Partner + 3-5 social assets; 30-sec stream shout; 2 Expo passes; staff volunteer feature.",
      highlight: true,
    },
    {
      name: "Program Partner",
      price: "$10,000",
      inclusions:
        "Impact Partner + sponsor an impact program (Teacher Micro-Grants / Library or Digital Corner / STEM for Girls); seat in a non-awards Expo session; 4 Expo passes; post-event impact video.",
    },
  ];

  return (
    <section
      className="relative bg-[#17120a] text-white py-16 px-6"
      style={{
        backgroundImage: `linear-gradient(rgba(23,18,10,0.1), rgba(26,20,11,0.4)), url('/images/logos/logos_5.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* subtle glowing overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.15),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(234,88,12,0.1),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-white mb-10 text-center"
        >
          Cash Tiers (Visibility + Approved Impact)
        </motion.h1>

        {/* Desktop Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden md:block overflow-x-auto shadow-2xl rounded-2xl border border-[#2a1f15] hover:shadow-amber-500/30 transition-all duration-500"
        >
          <table className="w-full border-collapse text-left">
            <thead className="bg-gradient-to-r from-[#1a140b] to-[#2a1f15]">
              <tr>
                <th className="px-6 py-4 text-[#f59e0b] font-semibold">Tier</th>
                <th className="px-6 py-4 text-[#f59e0b] font-semibold">
                  Price (USD)
                </th>
                <th className="px-6 py-4 text-[#f59e0b] font-semibold">
                  Inclusions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a1f15] bg-[#17120a]/90 text-gray-200">
              {tiers.map((tier, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[#2a1f15]/70 transition-colors duration-300"
                >
                  <td
                    className={`px-6 py-4 font-medium ${
                      tier.highlight ? "text-[#f59e0b]" : "text-white"
                    }`}
                  >
                    {tier.name}
                  </td>
                  <td className="px-6 py-4">{tier.price}</td>
                  <td className="px-6 py-4">{tier.inclusions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile Cards */}
        <div className="grid gap-6 md:hidden mt-8">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-2xl shadow-lg border transition-all duration-300 ${
                tier.highlight
                  ? "bg-gradient-to-r from-orange-600 to-amber-500 border-orange-500"
                  : "bg-[#17120a]/90 border-[#2a1f15] hover:border-amber-500"
              }`}
            >
              <h2
                className={`text-xl font-semibold mb-2 ${
                  tier.highlight ? "text-white" : "text-[#f59e0b]"
                }`}
              >
                {tier.name}
              </h2>
              <p className="text-lg font-bold text-amber-400">{tier.price}</p>
              <p className="mt-3 text-gray-200 leading-relaxed">
                {tier.inclusions}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Add-ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-[#2a1f15] to-[#1a140b] p-6 rounded-2xl shadow-xl hover:shadow-amber-500/30 transition-all"
        >
          <h2 className="text-2xl font-semibold text-[#f59e0b] mb-4">
            Add-ons
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Extra creator packages, additional Expo presence, diaspora town-hall
            co-host, post-event video.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
