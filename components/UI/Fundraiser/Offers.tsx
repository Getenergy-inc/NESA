
'use client';
import { motion } from 'framer-motion';
import { useHasMounted } from '@/hooks/useHasMounted';

const tiers = [
  { name: "Supporter — $2,000", perks: ["Site logo", "2 social mentions", "Gala program", "1 Expo pass"] },
  { name: "Partner — $3,500", perks: ["+ small booth/roll-up", "1 creator integration", "press inclusion"] },
  { name: "Impact Partner — $5,000 (sweet spot)", perks: ["+ 3–5 social assets", "30s stream shout", "2 Expo passes", "staff volunteer feature"] },
  { name: "Program Partner — $10,000", perks: ["Sponsor an impact program", "Panel seat (non-awards)", "4 Expo passes", "post-event impact video"] }
];

const expo = [
  "Booths $800–$1,500", "Pavilions $5k–$10k", "Tables $1.5k–$3k", "VIP seats $150–$300"
];

export default function Offers() {
      const mounted = useHasMounted();
    if (!mounted) return null;
  return (
    <section id="offers" className="py-20 bg-white text-black">
      <div className="container-max">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-4xl font-extrabold text-center mb-14"
        >
          What you’ll sell <span className="text-amber-600">(simple, ethical offers)</span>
        </motion.h2>

        {/* Flex row instead of grid */}
        <div className="grid md:grid-cols-2 gap-10 ">
          {/* Sponsorship tiers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1 rounded-xl bg-white p-6 shadow-md border border-gray-100 hover:border-amber-500 hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-bold mb-6">Sponsorship tiers (cash)</h3>
            <ul className="space-y-4">
              {tiers.map((t) => (
                <li
                  key={t.name}
                  className="p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-amber-500 hover:shadow-md transition-all"
                >
                  <p className="font-semibold mb-2 text-amber-600">{t.name}</p>
                  <ul className="list-disc pl-5 text-sm space-y-1 marker:text-amber-500">
                    {t.perks.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Expo & Hospitality */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 rounded-xl bg-white p-6 shadow-md border border-gray-100 hover:border-amber-500 hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-bold mb-6">Expo & Hospitality</h3>
            <ul className="list-disc pl-5 text-sm space-y-2 marker:text-amber-500">
              {expo.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200 text-sm leading-relaxed">
              <p>
                <span className="text-amber-600 font-medium">Tickets:</span> Expo day passes, Gala,
                virtual access (affiliate tracked).
              </p>
              <p className="mt-2">
                <span className="text-amber-600 font-medium">Donations (opt-in):</span> scholarships
                2026, teacher/library micro-grants. (No pay-to-win.)
              </p>
            </div>
          </motion.div>

         
        </div>
      </div>
    </section>
  );
}
