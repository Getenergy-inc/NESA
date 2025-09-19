'use client';
import { motion } from 'framer-motion';
import { useHasMounted } from '@/hooks/useHasMounted';
import { Users, Handshake, Building2, Ticket } from 'lucide-react';

const tracks = [
  {
    icon: Users,
    title: "Local Chapters & Ambassadors",
    subtitle: "Volunteer track",
    items: [
      "Mobilise your city/state: tickets, Expo booths, sponsors, diaspora drives.",
      "Community outreach, events, referrals, social pushes.",
      "Chapter grants/stipends, leaderboards, certificates (no personal commissions).",
      "Ideal for student unions, teacher groups, youth networks, diaspora associations."
    ]
  },
  {
    icon: Handshake,
    title: "Independent Fundraiser",
    subtitle: "Individual contractor",
    items: [
      "Close CSR/ESG packages with Expo/Gala and media add-ons.",
      "May sell: Community $2k–$9.9k, Media $10k–$24k, Platinum $50k–$99k.",
      "Commission (Net Basis): CSR 5%, Tickets 10%, Donations 3%.",
      "Reporting: weekly pipeline + monthly statement; payout ≤15 business days."
    ]
  },
  {
    icon: Building2,
    title: "Agency / Platform",
    subtitle: "Outsourced organisation",
    items: [
      "Scale outreach; package mid/high tiers; run ticket/affiliate rails.",
      "May sell: Media, Platinum, Community; Expo/Gala; ticket affiliates; Gold by assignment.",
      "Commercials: Same commission schedule; optional volume bonus; SLAs; audit rights."
    ]
  },
  {
    icon: Ticket,
    title: "Ticketing Agents / Promoters / Creators",
    subtitle: "Affiliate track",
    items: [
      "Drive paid attendance and virtual access; upsell at checkout.",
      "10% commission on ticket Net Basis via affiliate/UTM links; weekly settlement.",
      "Add-ons: creator integrations, sponsor shout-outs, referral leaderboards."
    ]
  }
];

export default function Tracks() {
    const mounted = useHasMounted();
  if (!mounted) return null;
  return (
    <section id="tracks" className="relative py-20 bg-[#17120a] text-white">
      {/* subtle overlay glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(245,158,11,0.08),transparent_70%),radial-gradient(circle_at_80%_70%,rgba(234,88,12,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-14"
        >
          Who can apply <span className="text-amber-400">(choose your track)</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {tracks.map((t, idx) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative rounded-2xl bg-gradient-to-br from-[#1a140b] via-[#2a1f15] to-[#17120a] p-8 shadow-xl hover:shadow-amber-500/30 transition-all hover:-translate-y-2"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-inner backdrop-blur-sm">
                  <t.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{t.title}</h3>
                  <p className="text-amber-400 text-sm">{t.subtitle}</p>
                </div>
              </div>

              <ul className="space-y-2 text-gray-300 text-sm leading-relaxed pl-4 list-disc marker:text-amber-400">
                {t.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
