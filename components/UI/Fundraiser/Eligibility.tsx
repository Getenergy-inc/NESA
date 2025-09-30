'use client';
import { motion } from 'framer-motion';
// import { useHasMounted } from '@/hooks/useHasMounted';

const bullets = [
  "Demonstrated network (CSR/ESG, SME/community, diaspora, or ticketing reach).",
  "Use approved materials and official payment rails (no cash handling).",
  "Accept firewall language on all comms; no promises around awards outcomes.",
  "Agree to privacy (NDPR/GDPR), AML/KYC, sanctions checks; brand-use by written approval only."
];

export default function Eligibility() {
      //   const mounted = useHasMounted();
      // if (!mounted) return null;
  return (
    <section id="eligibility" className="py-20 bg-amber-500">
      <div className="container-max">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-white mb-10"
        >
          Eligibility & Standards
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto"
        >
          <ul className="space-y-4 list-disc list-inside text-gray-800 text-base leading-relaxed">
            {bullets.map((b) => (
              <li
                key={b}
                className="hover:text-amber-600 transition-colors"
              >
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
