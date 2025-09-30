'use client';
import { motion } from 'framer-motion';
import { useHasMounted } from '@/hooks/useHasMounted';
import Link from 'next/link';

export default function Hero() {
  const mounted = useHasMounted();
  if (!mounted) return null;
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.25 }, // delay each child
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section
      className="relative overflow-hidden bg-[#1a140b] text-white"
      style={{
        backgroundImage: `linear-gradient(
          rgba(26, 20, 11, 0.2),
          rgba(23, 18, 10, 1)
        ), url('/images/fundraising.jpg')`, // replace with your bg image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Decorative glow overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(245,158,11,0.12),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(234,88,12,0.12),transparent_50%)] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl mx-auto"
        >
          <motion.p
            variants={item}
            className="inline-block rounded-full bg-gradient-to-r from-amber-500/20 to-orange-600/20 px-4 py-1 text-sm font-medium text-amber-400 shadow-sm"
          >
            Week of Impact · 13–18 Dec 2025 · Lagos
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-bold leading-tight md:text-6xl drop-shadow-lg"
          >
            Apply as a Fundraiser —{" "}
            <span className="text-amber-400">NESA-Africa 2025</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto"
          >
            Help fund classrooms. Earn fairly. Protect integrity. We’re onboarding
            mission-aligned partners to raise cash and in-kind support — without any
            influence on award outcomes.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
             {/* Primary button */}
            <Link
              href="/get-involved/apply-as-fundraiser/apply"
              className="rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-6 py-3 font-semibold shadow-lg shadow-orange-900/40 transition-transform hover:scale-105 hover:shadow-xl"
            >
              Start application
            </Link>

            {/* Secondary button */}
            <Link
              href="/get-involved/apply-as-fundraiser/rate-card"
              className="rounded-xl border border-amber-400/50 bg-transparent px-6 py-3 font-semibold text-amber-300 shadow-md backdrop-blur-sm transition-all hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-200"
            >
              View rate card
            </Link>

            <Link
              href="/get-involved/apply-as-fundraiser/tiers"
              className="rounded-xl border border-amber-400/50 bg-transparent px-6 py-3 font-semibold text-amber-300 shadow-md backdrop-blur-sm transition-all hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-200"
            >
              View cash tiers
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
