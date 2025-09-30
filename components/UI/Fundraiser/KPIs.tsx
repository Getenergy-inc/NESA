'use client';
import { motion } from 'framer-motion';
import { useHasMounted } from '@/hooks/useHasMounted';

const items = [
  { title: "CSR closes", desc: "Value by tier; time-to-invoice; win rate ≥25% (for commissioned tracks)." },
  { title: "Tickets", desc: "Volume, net receipts, conversion by channel; settlement timeliness." },
  { title: "Expo/Gala", desc: "Booths/tables sold; pavilion heads secured." },
  { title: "Compliance", desc: "Zero breaches; accurate reporting; on-time payouts." },
  { title: "Scholarships", desc: "Total routed from commissions (monthly published)." },
];

export default function KPIs() {
  const mounted = useHasMounted();
  if (!mounted) return null;

  return (
    <section id="kpis" className="section bg-white">
      <div className="container-max text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="heading text-3xl md:text-4xl font-bold text-center text-[#1a140b] mb-8 mt-8"
        >
          Targets & KPIs
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((i, idx) => (
            <motion.div
              key={i.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="p-6 rounded-2xl shadow-lg text-white relative overflow-hidden transform transition-all hover:scale-105 hover:shadow-amber-500/50"
              style={{
                // background: `radial-gradient(circle at top left, #fcd34d, #fcd34d #f59e0b,#ea580c)`,
              }}
            >
              {/* Glow overlay */}
              <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-20 pointer-events-none" />

              <h3 className="text-xl text-deepGold font-bold relative z-10">{i.title}</h3>
              <p className="mt-2 text-black/90 relative z-10">{i.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
