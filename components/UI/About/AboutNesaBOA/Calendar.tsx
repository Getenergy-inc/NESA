"use client";

import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

const events = [
  {
    date: "Oct/Nov 2025",
    title: "Plenary #1",
    details: "Governance/rubric sign-off, working-group sprints",
  },
  {
    date: "Dec 2025",
    title: "Week of Impact",
    details: "Optional micro-sessions (non-awards)",
  },
  {
    date: "Q2 2026",
    title: "Plenary #2",
    details: "Mid-cycle review; knowledge note",
  },
  {
    date: "Q4 2026",
    title: "Plenary #3",
    details: "Next-year criteria tune-up",
  },
  {
    date: "Q2 2027",
    title: "Plenary #4",
    details: "Impact reflection; renewal nominations",
  },
];

export default function Calendar() {
  return (
    <section className="relative bg-[#fefdfb] text-[#17120a] py-20 px-6">
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
              2025–2027 Calendar (at a glance)
            </h2>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l-2 border-[#f59e0b]/40 pl-8 space-y-12">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Marker */}
              <div className="absolute -left-5 top-1 w-8 h-8 rounded-full bg-gradient-to-r from-[#ea580c] to-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.6)] flex items-center justify-center">
                <CalendarDays className="w-4 h-4 text-white" />
              </div>

              {/* Content */}
              <div className="bg-white shadow-md rounded-xl p-6 border border-[#f59e0b]/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all duration-300">
                <p className="text-sm font-medium text-[#ea580c] mb-1">
                  {event.date}
                </p>
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-700">{event.details}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
