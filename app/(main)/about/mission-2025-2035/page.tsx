
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Target,
  Award,
  BookOpen,
  Users,
  Globe,
  Calendar,
  Megaphone,
  Wallet,
  Building,
  Book,
  CheckCheck,
} from "lucide-react";

type Pillar = { icon: React.ReactNode; title: string; text: string };

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.7 }, viewport: { once: true } };

const pillars: Pillar[] = [
  {
    icon: <BookOpen className="w-8 h-8 text-yellow-400" />,
    title: "Access to Quality Education",
    text: "Hybrid, multilingual, inclusive and low-cost education delivered through EduAid-Africa, Education Online Africa and eLibrary Nigeria.",
  },
  {
    icon: <Building className="w-8 h-8 text-yellow-400" />,
    title: "Infrastructure Renewal",
    text: "Rebuild My School Africa connects CSR donors & diaspora to renovate 1,000 public schools by 2030.",
  },
  {
    icon: <Award className="w-8 h-8 text-yellow-400" />,
    title: "Changemaker Recognition",
    text: "NESA-Africa Awards celebrates 5,000 changemakers via awards, public voting and expert panels.",
  },
  {
    icon: <Megaphone className="w-8 h-8 text-yellow-400" />,
    title: "Media & Advocacy",
    text: "NESA TV, It's In Me Radio, podcasts & webinars driving multilingual values-based campaigns.",
  },
  {
    icon: <Wallet className="w-8 h-8 text-yellow-400" />,
    title: "Wallet-Driven Funding",
    text: "GFA Wallet + Afri Gold Coin enables donations, voting, endorsements, certificate downloads & purchases.",
  },
  {
    icon: <Users className="w-8 h-8 text-yellow-400" />,
    title: "Membership-Led Chapters",
    text: "100+ hybrid/physical chapters for local execution, volunteers, ambassadors, and wallet-based revenue.",
  },
  {
    icon: <Book className="w-8 h-8 text-yellow-400" />,
    title: "Research, Data & Policy",
    text: "Citizen-generated education data, grassroots policy mapping and advocacy for targeted causes.",
  },
];

export default function Mission2035Page() {
  return (
    <main className=" text-white">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center">
        <Image
          src="/images/examples/gallery/g2.png"
          alt="Mission 2035 background"
          fill
          className="object-cover -z-10"
        />
            <div className="absolute inset-0 bg-gradient-80 -z-0" />
        <div className="container mx-auto px-6 lg:px-12 text-center py-28">
          <motion.h1 {...fadeUp} className="text-4xl md:text-7xl font-extrabold text-[#f59e0b] leading-tight">
            SCEF Mission 2025–2035
          </motion.h1>
          <motion.p {...fadeUp} className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-black">
            A Decade of Education, Impact & Purpose — Powered by People, Platforms, and Partnerships.
            Building scalable, measurable education outcomes across Africa and the diaspora.
          </motion.p>


        </div>
      </section>
 

            {/* Vision Overview Section */}
        <section className=" bg-[#1a140a] py-20 ">
        <div className="max-w-5xl mx-auto text-left">
            <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-[#f59e0b] mb-6"
            >
            🔷 Vision Overview
            </motion.h2>

            <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base md:text-lg text-gray-200 leading-relaxed mb-6"
            >
            At <span className="font-semibold text-yellow-300">Santos Creations Educational Foundation (SCEF)</span>, our 10-year mission (2025–2035) is to{" "}
            <span className="font-semibold text-yellow-300">empower 10 million learners</span>,{" "}
            rebuild <span className="font-semibold text-yellow-300">1,000 schools</span>,{" "}
            recognize <span className="font-semibold text-yellow-300">5,000 changemakers</span>, and{" "}
            raise <span className="font-semibold text-yellow-300">$50 million</span> in education-focused resources — in alignment with:
            </motion.p>

            {/* Bullet Points */}
            <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="list-disc list-inside space-y-2 text-gray-200 mb-6"
            >
            <li>SDG 4 – Quality Education</li>
            <li>AU Agenda 2063 – Aspiration 1 & 6</li>
            <li>ESG impact frameworks</li>
            <li>African diaspora and community-led models</li>
            </motion.ul>

            {/* Closing Statement */}
            <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg md:text-xl font-semibold text-yellow-300 italic"
            >
            This is more than a mission — it’s a movement.
            </motion.p>
        </div>
        </section>


        {/* 2035 Strategic Commitments */}
        <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
            <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl text-[#f59e0b] font-bold text-center mb-12"
            >
            Our 2035 Strategic Commitments
            </motion.h2>

            <div className="bg-[#1a140b] border border-white/10 rounded-2xl overflow-hidden">
            {/* Header Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 px-6 py-4 text-3xl text-[#ea580b] font-semibold ">
                <span>Strategic Area</span>
                <span>Targets by 2035</span>
            </div>

            {/* Data Rows */}
            {[
                {
                area: "Learner Reach",
                target: "5,000,000 individuals through digital & formal education",
                },
                {
                area: "School Rebuilding",
                target: "1,000 schools via EduAid-Africa and Rebuild My School Africa",
                },
                {
                area: "Changemaker Recognition",
                target: "5,000 awardees through NESA-Africa Awards",
                },
                {
                area: "Fund Mobilization",
                target: "$50 million via wallet-powered systems, CSR, diaspora, and partners",
                },
                {
                area: "Wallet Adoption",
                target: "40 million users of the GFA Wallet + Afri Gold Coin (AGC)",
                },
                {
                area: "Local Chapters",
                target: "100+ hybrid/physical chapters across Africa and the diaspora",
                },
                {
                area: "Media Engagement",
                target: "100M views on NESA TV & It’s In Me Radio",
                },
                {
                area: "Scholarships",
                target: "100,000+ awarded, across primary, vocational, and tertiary levels",
                },
            ].map((item, i) => (
                <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 px-6 py-5 border-t border-white/10 text-gray-300"
                >
                <span className="font-small">{item.area}</span>
                <span className="mt-1 md:mt-0">{item.target}</span>
                </motion.div>
            ))}
            </div>
        </div>
        </section>


        {/* 7 PILLARS */}
        <section className="py-20 bg-[#fff7ec] text-black">
        <div className="container mx-auto px-6 lg:px-12">
            <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-12"
            >
            7 Pillars of the SCEF 2025–2035 Decade
            </motion.h3>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
                {
                icon: "📚",
                title: "Access to Quality Education",
                text: "Through EduAid-Africa, Education Online Africa, and eLibrary Nigeria, we deliver hybrid, multilingual, inclusive, and low-cost education to underserved communities.",
                },
                {
                icon: "🏫",
                title: "Infrastructure Renewal",
                text: "Rebuild My School Africa connects CSR donors and diaspora partners to renovate and rebuild 1,000 public schools by 2030.",
                },
                {
                icon: "🏅",
                title: "Changemaker Recognition",
                text: "Our award framework (NESA-Africa 2025) uses public voting and expert panels to celebrate 5,000 education changemakers through Africa Icon Lifetime Awards, Gold Certificate Awards, and Platinum Recognition.",
                },
                {
                icon: "📣",
                title: "Media & Advocacy",
                text: "Through It’s In Me Radio, NESA TV, and podcasts/webinars, we drive values-based educational campaigns in 10+ languages across Africa and the diaspora.",
                },
                {
                icon: "💼",
                title: "Wallet-Driven Funding",
                text: (
                    <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                    <li>Donations</li>
                    <li>Voting</li>
                    <li>Endorsements</li>
                    <li>Certificate downloads</li>
                    <li>Merchandise purchases</li>
                    </ul>
                ),
                },
                {
                icon: "🤝",
                title: "Membership-Led Chapters",
                text: (
                    <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                    <li>Online, hybrid, and physical chapters</li>
                    <li>Volunteers, Ambassadors, LCPs</li>
                    <li>Local project execution</li>
                    <li>Wallet-based revenue and reporting</li>
                    </ul>
                ),
                },
                {
                icon: "🎓",
                title: "Research, Data & Policy Engagement",
                text: "We serve as a continental platform for citizen-generated education data, grassroots policy mapping, and special interest advocacies (e.g., girls education, special needs, digital literacy).",
                },
            ].map((p, idx) => (
                <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
                >
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{p.icon}</span>
                    <h4 className="text-lg font-semibold">{p.title}</h4>
                </div>
                {typeof p.text === "string" ? (
                    <p className="mt-4 text-sm leading-relaxed text-gray-700">{p.text}</p>
                ) : (
                    p.text
                )}
                </motion.div>
            ))}
            </div>
        </div>
        </section>


      {/* ALIGNMENT WITH GLOBAL GOALS */}
        <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
            <motion.h3
            {...fadeUp}
            className="text-3xl md:text-5xl font-bold text-[#f59e0b] text-center mb-8"
            >
            How We Align with Global Goals
            </motion.h3>

            <div className="grid md:grid-cols-3 gap-6">
            {/* SDG 4 */}
            <motion.div
                {...fadeUp}
                className="bg-black rounded-2xl p-6"
            >
                <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-yellow-300" />
                <h5 className="font-bold text-[#ea580b]">SDG 4 – Quality Education</h5>
                </div>
                <ul className="mt-3 text-gray-200 text-sm space-y-2 list-disc list-inside">
                <li>5M learners served</li>
                <li>Inclusive education access (girls, special needs, displaced communities)</li>
                <li>Online & community-based learning pathways</li>
                </ul>
            </motion.div>

            {/* AU Agenda 2063 */}
            <motion.div
                {...fadeUp}
                className="bg-black rounded-2xl p-6"
            >
                <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-yellow-300" />
                <h5 className="font-bold text-[#ea580b]">AU Agenda 2063 – Africa’s Development Vision</h5>
                </div>
                <ul className="mt-3 text-gray-200 text-sm space-y-2 list-disc list-inside">
                <li>
                    <span className="font-semibold">Aspiration 1:</span> “Prosperous Africa” → Infrastructure, careers, livelihoods
                </li>
                <li>
                    <span className="font-semibold">Aspiration 6:</span> “People-Driven” → Diaspora engagement, youth leadership, BOA/BOT equality
                </li>
                </ul>
            </motion.div>

            {/* ESG & Sustainability */}
            <motion.div
                {...fadeUp}
                className="bg-black rounded-2xl p-6"
            >
                <div className="flex items-center gap-3">
                <CheckCheck className="w-6 h-6 text-yellow-300" />
                <h5 className="font-bold text-[#ea580b]">ESG & Sustainability</h5>
                </div>
                <ul className="mt-3 text-gray-200 text-sm space-y-2 list-disc list-inside">
                <li><span className="font-semibold">Environment:</span> Solar-powered schools, digital libraries</li>
                <li><span className="font-semibold">Social:</span> Inclusion, gender balance, scholarship access</li>
                <li><span className="font-semibold">Governance:</span> Transparent wallet system, NDPR/GDPR compliance</li>
                </ul>
            </motion.div>
            </div>
        </div>
        </section>

     

            {/* SMART GOALS */}
        <section className="py-16 bg-[#1a140a] text-white">
        <div className="container mx-auto px-6 lg:px-12">
            <motion.h3
            {...fadeUp}
            className="text-3xl md:text-5xl font-bold text-[#f59e0b] mb-10 text-center"
            >
            S.M.A.R.T Goals
            </motion.h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Specific */}
            <motion.div {...fadeUp} className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                <span className="text-[#ea580b] text-lg">🎯</span>
                <h4 className="font-semibold text-base">Specific</h4>
                </div>
                <ul className="list-disc pl-5 text-xs text-gray-200 space-y-1">
                <li>1,000 schools</li>
                <li>10M learners</li>
                <li>5,000 awardees</li>
                </ul>
            </motion.div>

            {/* Measurable */}
            <motion.div {...fadeUp} className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                <span className="text-[#ea580b] text-lg">📊</span>
                <h4 className="font-semibold text-base">Measurable</h4>
                </div>
                <p className="text-xs text-gray-200">Wallet + dashboard metrics</p>
            </motion.div>

            {/* Achievable */}
            <motion.div {...fadeUp} className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                <span className="text-[#ea580b] text-lg">⚙️</span>
                <h4 className="font-semibold text-base">Achievable</h4>
                </div>
                <p className="text-xs text-gray-200">Chapters + diaspora + tech</p>
            </motion.div>

            {/* Relevant */}
            <motion.div {...fadeUp} className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                <span className="text-[#ea580b] text-lg">🌍</span>
                <h4 className="font-semibold text-base">Relevant</h4>
                </div>
                <p className="text-xs text-gray-200">Closes Africa’s education gap</p>
            </motion.div>

            {/* Time-bound */}
            <motion.div {...fadeUp} className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                <span className="text-[#ea580b] text-lg">⏳</span>
                <h4 className="font-semibold text-base">Time-bound</h4>
                </div>
                <p className="text-xs text-gray-200">10-year plan with milestones</p>
            </motion.div>
            </div>
        </div>
        </section>



      {/* MILESTONE TIMELINE */}
      <section className="py-20 bg-[#fff7ec] text-black">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h3 {...fadeUp} className="text-3xl md:text-5xl font-bold mb-8 text-center">2025–2035 Milestone Map</motion.h3>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 w-1 bg-yellow-200 h-full" />
            <ul className="space-y-8">
              {[
                { year: "2025", text: "Launch: NESA Awards, EduAid Expo, Wallet Rollout" },
                { year: "2026", text: "500 awards, 1,000 scholarships, 15 chapters" },
                { year: "2027", text: "50 local chapters, 2,000 ambassadors, 2,000 schools onboard" },
                { year: "2030", text: "40M wallet users, $30M raised" },
                { year: "2035", text: "Mission completed + full ESG and SDG report released" },
              ].map((m, i) => (
                <motion.li key={m.year} {...fadeUp} style={{ transitionDelay: `${i * 0.06}s` }} className="relative">
                  <div className={`md:flex md:items-start md:gap-6 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                    <div className="md:w-1/2 md:px-6">
                      <div className="bg-white/90 rounded-lg p-4 shadow">
                        <span className="font-bold text-yellow-500">{m.year}</span>
                        <p className="mt-2 text-sm">{m.text}</p>
                      </div>
                    </div>
                    <div className="md:w-1/2 hidden md:block" />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 -top-2 bg-yellow-300 w-4 h-4 rounded-full border-2 border-white" />
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TAKE ACTION / CTAs */}
      <section className="py-20 bg-[#1a140a] text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.h3 {...fadeUp} className="text-3xl md:text-5xl font-bold mb-6 text-[#f59e0b]">Take Action Today</motion.h3>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">Apply, partner, donate, nominate, or join a chapter — every action accelerates impact.</p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="/scholarships" className="px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold shadow hover:scale-105 transition">Apply for a Scholarship</a>
            <a href="/partner" className="px-6 py-3 rounded-full bg-transparent border border-white/20 text-white font-semibold hover:bg-white/5 transition">Be Our Partner</a>
            <a href="/donate" className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-semibold shadow hover:scale-105 transition">Donate via AGC Wallet</a>
            <a href="/chapters" className="px-6 py-3 rounded-full bg-white/5 text-white font-semibold hover:bg-white/10 transition">Join a Local Chapter</a>
          </div>
        </div>
      </section>

      {/* REPORTING & TRANSPARENCY */}
      <section className="py-20 bg-[#1a140a] text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h3 {...fadeUp} className="text-3xl md:text-5xl text-[#f59e0b] font-bold mb-6 text-center">Reporting & Transparency</motion.h3>
          <p className="text-gray-200 mb-6">All activities are monitored under SCEF’s administrative divisions with quarterly dashboards, annual ESG audits and donor/partner access via the Admin Portal.</p>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: "SOCD", text: "Strategic Operations & Compliance" },
              { title: "OMBDD", text: "Membership & Business Development" },
              { title: "TDSD", text: "Technology & Digital Services" },
              { title: "LCS", text: "Local Chapter Services" },
            ].map((d) => (
              <motion.div {...fadeUp} key={d.title} className="bg-black/25 rounded-2xl p-4">
                <h5 className="font-semibold text-yellow-300">{d.title}</h5>
                <p className="text-sm text-gray-200 mt-2">{d.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-20 bg-[#f59e0b] text-black">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h4 className="text-2xl md:text-4xl font-bold mb-4">Join the Movement</h4>
          <p className="max-w-3xl mx-auto mb-6">“We are not just an NGO — we are a platform for legacy builders.” Become an ambassador, open a chapter, speak at our webinars or connect with the diaspora network.</p>
          <div className="flex justify-center gap-4">
            <a href="/ambassador" className="px-6 py-3 rounded-full bg-black text-yellow-300 font-semibold">Become an Ambassador</a>
            <a href="/contact" className="px-6 py-3 rounded-full bg-black/10 text-black font-semibold">Open a Chapter</a>
          </div>
        </div>
      </section>
    </main>
  );
}
