"use client";
import React from "react";
import { motion } from "framer-motion";
import { Store, Building2, Table, Crown } from "lucide-react";

export default function RateCard() {
  interface Item {
    title: string;
    price: string;
    Icon: React.ElementType;
  }

  const items: Item[] = [
    { title: "Booths", price: "$800–$1,500", Icon: Store },
    { title: "Pavilions", price: "$5k–$10k", Icon: Building2 },
    { title: "Tables", price: "$1.5k–$3k", Icon: Table },
    { title: "VIP seats", price: "$150–$300", Icon: Crown },
  ];

  return (
    <>
      {/* Expo & Hospitality */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex-1 rounded-xl bg-white p-6 shadow-md border border-gray-100 hover:border-amber-500 hover:shadow-lg transition-all"
      >
        <h3 className="text-5xl text-center font-bold mt-10 mb-6">
          Expo & Hospitality
        </h3>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl border border-gray-200 p-4 bg-white shadow-md 
                         transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.6)]"
            >
              <item.Icon
                className="w-7 h-7 mb-2 text-gray-700 transition-all duration-300"
              />
              <h2 className="text-lg font-bold text-[#ea540b]">{item.title}</h2>
              <p className="text-lg text-gray-600 mt-2">{item.price}</p>
            </motion.div>
          ))}
        </div>

        {/* Notes */}
        <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200 text-sm leading-relaxed">
          <p>
            <span className="text-amber-600 font-medium">Tickets:</span> Expo day
            passes, Gala, virtual access (affiliate tracked).
          </p>
          <p className="mt-2">
            <span className="text-amber-600 font-medium">Donations (opt-in):</span>{" "}
            scholarships 2026, teacher/library micro-grants. (No pay-to-win.)
          </p>
        </div>
      </motion.div>
    </>
  );
}
