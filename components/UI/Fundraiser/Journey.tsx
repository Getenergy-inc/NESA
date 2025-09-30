'use client';
import { motion } from 'framer-motion';
import { useHasMounted } from '@/hooks/useHasMounted';

const steps = [
  { title: "Apply", desc: "Pick your track and tell us about your network.", badge: "Step 1" },
  { title: "Vetting & MoU", desc: "KYC/NDPR/GDPR, anti-bribery, brand-use rules.", badge: "Step 2" },
  { title: "Onboarding pack", desc: "Rate card, decks, scripts, UTM/affiliate links, CRM access.", badge: "Step 3" },
  { title: "Outreach & pipeline", desc: "Log leads before contact; weekly updates.", badge: "Step 4" },
  { title: "Close & collect", desc: "SCEF issues contracts/invoices; funds settle to SCEF only.", badge: "Step 5" },
  { title: "Payout & scholarships", desc: "Monthly statements; commissions paid; 20% → EduAid-Africa.", badge: "Step 6" }
];

export default function Journey() {
        const mounted = useHasMounted();
      if (!mounted) return null;
  return (
    <section id="journey" className="py-20 bg-gray-50">
      <div className="container-max">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-14"
        >
          How it works <span className="text-amber-600">(your journey)</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-xl hover:border-amber-500 transition-all group"
            >
              {/* Step badge */}
              <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                {s.badge}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2 group-hover:text-amber-600 transition-colors">
                {s.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>

              {/* Decorative connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute right-[-20px] top-1/2 w-10 h-0.5 bg-gradient-to-r from-amber-500 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
