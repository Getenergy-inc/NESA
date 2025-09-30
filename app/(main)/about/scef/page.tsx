"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  GraduationCap,
  School,
  Globe,
  Users,
  Handshake,
  Leaf,
  MapPin,
  Globe2,
  Wallet,
  BookOpen,
  CalendarRange,
  Award,
  Building2,
  ShieldCheck,
  HandCoins,
  Gift,
  BarChart3,
  Network,
  Briefcase,
  Building,
} from "lucide-react";

export default function ScefPage() {
  const stats = [
    {
      icon: <GraduationCap className="w-10 h-10 text-[#ea580b]" />,
      title: "100,000+",
      desc: "Scholarships & micro-grants delivered",
    },
    {
      icon: <School className="w-10 h-10 text-[#f59e0b]" />,
      title: "1,000+",
      desc: "Schools upgraded or rebuilt with safe water, sanitation, energy & learning spaces",
    },
    {
      icon: <Globe className="w-10 h-10 text-[#ea580b]" />,
      title: "1 Platform",
      desc: "A trusted, continental platform for standards, data, and partnerships",
    },
  ];

  const beliefs = [
    {
      icon: <Users className="w-10 h-10 text-[#ea580b]" />,
      title: "Education is a Right",
      desc: "For girls and boys, learners with special needs, refugees, and those in informal pathways.",
    },
    {
      icon: <Handshake className="w-10 h-10 text-[#f59e0b]" />,
      title: "Partnerships Unlock Scale",
      desc: "CSR, philanthropy, and diaspora giving—managed transparently—convert intent to sustained impact.",
    },
    {
      icon: <Leaf className="w-10 h-10 text-[#ea580b]" />,
      title: "Sustainability is Non-Negotiable",
      desc: "School improvements must be climate-aware, inclusive, and locally owned.",
    },
    {
      icon: <MapPin className="w-10 h-10 text-[#f59e0b]" />,
      title: "Chapters Power Change",
      desc: "Local leaders convert continental goals into documented, auditable results.",
    },
  ];

  const objectives = [
    {
      icon: <GraduationCap className="w-10 h-10 text-[#ea580b]" />,
      title: "Raise & Renew Education Standards",
      desc: "Operate platforms that advocate ever-growing standards in teaching quality, safe facilities, inclusion, and accountability.",
    },
    {
      icon: <Globe2 className="w-10 h-10 text-[#f59e0b]" />,
      title: "Champion Education for All",
      desc: "Drive universal access—girls’ education, special needs, out-of-school children, refugees, and alternative learning—so no learner is left behind.",
    },
    {
      icon: <Wallet className="w-10 h-10 text-[#ea580b]" />,
      title: "Mobilize & Manage Education Funds",
      desc: "Provide compliant pathways to scholarships, teacher micro-grants, libraries/digital corners, and school infrastructure with clear KPIs and audits.",
    },
    {
      icon: <Users className="w-10 h-10 text-[#f59e0b]" />,
      title: "Build a Membership Movement",
      desc: "Grow members, ambassadors, and local chapters that co-create solutions and sustain outcomes beyond project close.",
    },
  ];

  const programs = [
    {
      title: "EduAid-Africa",
      subtitle: "Funding education through partnership",
      desc: "Independent program that funds scholarships and grants across formal, informal, and special-needs education.",
      details: [
        "Funds: Scholarships, teacher micro-grants, Library/Digital Learning Corners, STEM for Girls kits, small school improvements.",
        "Financing: Transparent CSR & diaspora crowd-funding, pooled philanthropy, chapter campaigns with AML/KYC controls.",
        "Reporting: Eligibility rules, fair selection, and impact packs to every partner.",
      ],
      note: "NESA-Africa is a fundraising partner to EduAid-Africa; EduAid operates independently.",
      icon: <BookOpen className="w-10 h-10 text-[#ea580b]" />,
    },
    {
      title: "NESA-Africa",
      subtitle: "Pan-African Education Awards & Week of Impact",
      desc: "A continental stage (Dec 13–18, 2025; Lagos + broadcast) that celebrates excellence, convenes policy and practice, and amplifies impact stories—with a strict firewall between funding and awards outcomes.",
      icon: <Award className="w-10 h-10 text-[#ea580b]" />,
    },
    {
      title: "Rebuild My School Africa (RMSA)",
      desc: "Community-led school upgrades—safe toilets & water, solar/efficient energy, roofs, labs, libraries—with transparent trackers and diaspora co-funding.",
      icon: <Building2 className="w-10 h-10 text-[#ea580b]" />,
    },
    {
      title: "Education Online Africa / eLibrary Nigeria",
      desc: "Open access: digital library, webinars, teacher development, work readiness & productivity tracks—no pay-to-pass mechanics.",
      icon: <Globe2 className="w-10 h-10 text-[#ea580b]" />,
    },
    {
      title: "Women & Girls / Special Needs / Access & Data",
      desc: "Targeted advocacy and grants for girls’ education, assistive learning, and data-to-action (census/enrolment → policy & funding).",
      icon: <Users className="w-10 h-10 text-[#ea580b]" />,
    },
  ];

  const tabs = [
    {
      key: "environmental",
      title: "Environmental (E)",
      icon: <Leaf className="w-6 h-6 text-[#22c55e]" />,
      items: [
        "WASH: gender-safe toilets & handwashing; water-saving fixtures",
        "Energy: solar & efficient lighting; basic cooling/ventilation",
        "Materials: local/low-carbon options where feasible; waste minimization",
      ],
    },
    {
      key: "social",
      title: "Social (S)",
      icon: <Users className="w-6 h-6 text-[#3b82f6]" />,
      items: [
        "Inclusion: ramps/accessible design; special-needs support; safety policies",
        "Equity: girls’ participation; rural/low-income targeting; community co-ownership",
        "Livelihoods: local labor & suppliers; volunteer skill-building; teacher upskilling",
      ],
    },
    {
      key: "governance",
      title: "Governance (G)",
      icon: <ShieldCheck className="w-6 h-6 text-[#f59e0b]" />,
      items: [
        "Firewall: funding ≠ nominations/judging/winners",
        "Compliance: NDPR/GDPR privacy; AML/KYC; anti-bribery; sanctions checks",
        "Transparency: published criteria/weights; COI/recusal; partner statements & audits",
      ],
    },
    {
      key: "impact",
      title: "Impact Measurement",
      icon: <BarChart3 className="w-6 h-6 text-[#ea580b]" />,
      items: [
        "Inputs: cash + in-kind (valued), volunteer hours, partner reach",
        "Outputs: # scholarships, # micro-grants, # facilities built/upgraded",
        "Outcomes: attendance/retention, teacher practice, learning continuity",
        "Signals of trust: on-time reports, third-party validations, public dashboards",
      ],
    },
  ];

  const governance = [
    {
      key: "bot",
      title: "1) Board of Trustees (BoT) — Continental",
      icon: <Globe className="w-6 h-6 text-[#ea580b]" />,
      details: [
        "Fiduciary oversight, policy approval, and appointment of auditors and the Executive Secretariat.",
      ],
    },
    {
      key: "rbod",
      title: "2) Regional Board of Directors (R-BoD) — Chapter-based",
      icon: <Building className="w-6 h-6 text-[#f59e0b]" />,
      details: [
        "Composition: Heads of Local Chapters (LCPs) from countries/diaspora within the region, elected by their chapter boards, plus regional functional leads (Programs, Finance/Compliance, Partnerships, Communications).",
        "Mandate: Regional strategy & targets, cross-border projects, compliance support to chapters, escalation & performance reviews.",
        "Term: 2-year, renewable once; rotation to ensure inclusion.",
      ],
    },
    {
      key: "boa",
      title: "3) Board(s) of Advisors (BoA) — Chapter-based",
      icon: <Network className="w-6 h-6 text-[#22c55e]" />,
      details: [
        "Composition: Sector experts (education, WASH, energy, finance, special needs), elders, and diaspora leaders nominated by local chapters.",
        "Mandate: Technical guidance, quality assurance for standards/scorecards, introductions to ministries/CSR agencies; no operational control.",
      ],
    },
    {
      key: "chapters",
      title: "4) Country/Diaspora Chapter Boards",
      icon: <Users className="w-6 h-6 text-[#3b82f6]" />,
      details: [
        "LCP (Local Chapter President) chairs the Chapter Management Team:",
        "Programs Lead (EduAid/RMSA/WASH), Finance & Compliance Lead (AML/KYC, reporting), Partnerships Lead (CSR/diaspora/philanthropy), Communications & Community Lead (media, creators, volunteers).",
        "Duties: Quarterly impact reports, financial controls, member engagement, grievance handling.",
      ],
    },
    {
      key: "exec",
      title: "5) Executive Secretariat (Continental)",
      icon: <Briefcase className="w-6 h-6 text-[#ef4444]" />,
      details: [
        "Runs day-to-day operations; issues MoUs/invoices; manages brand approvals; compiles dashboards and audits.",
      ],
    },
  ];

  const pathways = [
    {
      title: "EduAid-Africa CSR Funds",
      icon: <HandCoins className="w-10 h-10 text-[#ea580b]" />,
      details: [
        "Scoped outcomes & compliance rails",
        "Milestone-based disbursements",
        "Transparent impact reporting",
        "Independent from awards decisions",
      ],
    },
    {
      title: "Diaspora Crowd-Funding",
      icon: <Users className="w-10 h-10 text-[#f59e0b]" />,
      details: [
        "Pooled giving for scholarships & libraries",
        "Funds RMSA builds and digital corners",
        "Live transparent trackers",
        "Chapter-led stewardship & reporting",
      ],
    },
    {
      title: "In-Kind Contributions",
      icon: <Gift className="w-10 h-10 text-[#22c55e]" />,
      details: [
        "Media, venues, AV, logistics valued at market rates",
        "Extends readiness budgets",
        "Maximizes efficiency & reduces costs",
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState("environmental");
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = tabs.findIndex((t) => t.key === prev);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].key;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/scef.jpg"
          alt="SCEF Background"
          fill
          priority
          className="absolute inset-0 object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[#1a140a] bg-opacity-80" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 max-w-4xl">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-extrabold text-5xl md:text-6xl mb-6 
                     bg-gradient-to-r from-[#ea580b] via-[#f59e0b] to-[#ea580b] 
                     bg-clip-text text-transparent drop-shadow-lg"
          >
            Santos Creations Educational Foundation{" "}
            <span className="text-[#ea580b]">(SCEF) </span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-200 leading-relaxed mb-8"
          >
            SCEF is a membership-based, pan-African NGO advancing equitable,
            high-quality learning across Africa and the diaspora. Conceived in
            1997 and registered in 2010, we mobilize educators, communities, CSR
            partners, and the diaspora to fund scholarships, strengthen schools,
            celebrate excellence, and deliver measurable classroom outcomes—
            sustainably.
          </motion.p>
        </div>
      </section>
      <section className="py-20 bg-[#2a1f15] relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold mb-12 
                     bg-gradient-to-r from-[#ea580b] via-[#f59e0b] to-[#ea580b] 
                     bg-clip-text text-transparent"
          >
            Vision 2035
          </motion.h2>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-xl bg-[#2a1f15] border border-[#ea580b]/20 
                         hover:border-[#ea580b] shadow-lg hover:shadow-[0_0_25px_#ea580b] 
                         transition-all duration-300"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold mb-16 
                     bg-gradient-to-r from-[#ea580b] via-[#f59e0b] to-[#ea580b] 
                     bg-clip-text text-transparent"
          >
            What We Believe
          </motion.h2>

          {/* Beliefs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {beliefs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="p-8 rounded-xl bg-white] border border-black/20 
                         hover:border-[#ea580b] shadow-lg hover:shadow-[0_0_25px_#ea580b] 
                         transition-all duration-300 text-left"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-600 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-800 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1a140a] relative overflow-hidden">
        <div className="container mx-auto px-6">
          {/* Section Heading */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold mb-16 text-center
                      bg-gradient-to-r from-[#ea580b] via-[#f59e0b] to-[#ea580b] 
                      bg-clip-text text-transparent"
          >
            Our Four Core Objectives
          </motion.h2>

          {/* Timeline */}
          <div className="relative border-l-4 border-[#ea580b]/40 ml-12">
            {objectives.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="mb-12 ml-6 relative"
              >
                {/* Circle with icon */}
                <span
                  className="absolute -left-16 flex items-center justify-center 
                          w-12 h-12 rounded-full bg-black border-2 border-[#ea580b] 
                          shadow-md shadow-[#ea580b]/50"
                >
                  {item.icon}
                </span>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1a140a] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-[#ea580b] to-[#f59e0b] bg-clip-text text-transparent"
          >
            Sustainability & Social Impact
          </motion.h2>

          {/* Tabs (desktop only) */}
          <div className="hidden md:flex flex-wrap justify-center gap-4 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full border transition duration-300 ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-[#ea580b] to-[#f59e0b] text-black font-bold"
                    : "border-gray-700 text-gray-400 hover:text-white hover:border-[#ea580b]"
                }`}
              >
                {tab.icon}
                {tab.title}
              </button>
            ))}
          </div>

          {/* Auto-play carousel content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#2a1f15] border border-[#ea580b] p-8 rounded-2xl shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              {tabs.find((t) => t.key === activeTab)?.icon}
              <h3 className="text-2xl font-bold text-white">
                {tabs.find((t) => t.key === activeTab)?.title}
              </h3>
            </div>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
              {tabs
                .find((t) => t.key === activeTab)
                ?.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
            </ul>
          </motion.div>

          {/* Footer note */}
          <div className="text-center mt-10 text-gray-400 text-sm">
            Linked frameworks:{" "}
            <span className="text-white font-medium">
              SDG4 (Quality Education), SDG5, 6, 7, 9, 10, 13, 16, 17
            </span>{" "}
            • AU Agenda 2063 (well-educated citizens)
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1a140a]/90 text-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-[#ea580b] to-[#f59e0b] bg-clip-text text-transparent"
          >
            Regional Governance (Chapter-Based Leadership)
          </motion.h2>

          <p className="text-center text-gray-300 max-w-3xl mx-auto mb-12">
            SCEF’s governance elevates local leadership to regional and
            continental levels, ensuring accountability, inclusion, and strong
            performance across all chapters.
          </p>

          {/* Governance accordion */}
          <div className="space-y-6">
            {governance.map((item) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-[#2a1f15] border border-[#ea580b]/30 rounded-2xl shadow-lg"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-4"
                  onClick={() => setOpen(open === item.key ? null : item.key)}
                >
                  <div className="flex items-center gap-3 text-left">
                    {item.icon}
                    <h3 className="text-lg md:text-xl font-semibold">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-[#ea580b]">
                    {open === item.key ? "–" : "+"}
                  </span>
                </button>

                {open === item.key && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="px-6 pb-6 text-gray-900 space-y-3"
                  >
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="leading-relaxed text-white">
                        {detail}
                      </p>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white/60 text-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-[#ea580b] to-[#f59e0b] bg-clip-text text-transparent"
          >
            CSR & Diaspora Pathways
          </motion.h2>

          {/* Description */}
          <p className="text-center text-gray-800 max-w-3xl mx-auto mb-16">
            We work with CSR partners and the diaspora through transparent,
            auditable channels that convert intent into lasting impact for
            learners across Africa.
          </p>

          {/* Pathways grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {pathways.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="bg-[#17120a] border border-[#ea580b] rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-[#f59e0b]/50 transition-all"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-center mb-4">
                  {item.title}
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  {item.details.map((detail, i) => (
                    <li key={i} className="leading-relaxed">
                      • {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          {/* Governance & Integrity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#111]/70 border border-[#ea580b]/30 rounded-2xl p-10 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              <ShieldCheck className="w-10 h-10 text-[#ea580b]" />
              <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#ea580b] to-[#f59e0b] bg-clip-text text-transparent">
                Governance & Integrity (Non-Negotiable)
              </h2>
            </div>
            <ul className="space-y-4 text-gray-300 leading-relaxed">
              <li>
                • Firewall: Funding does not influence nominations or winners.
              </li>
              <li>
                • Published rules: criteria, weights, COI/recusal, brand-use
                approvals.
              </li>
              <li>
                • Data & finance: NDPR/GDPR, AML/KYC, anti-bribery, audits.
              </li>
              <li>
                • Whistleblowing: confidential channels, SLA-bound responses.
              </li>
            </ul>
          </motion.div>

          {/* 2025–2027 Milestones */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <CalendarRange className="w-10 h-10 text-[#f59e0b]" />
              <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#f59e0b] to-[#ea580b] bg-clip-text text-transparent">
                2025–2027 Milestones
              </h2>
            </div>
            <div className="relative border-l-2 border-[#ea580b]/40 pl-8 space-y-10">
              <div>
                <h3 className="text-xl font-semibold text-white">2025</h3>
                <p className="text-gray-300">
                  Scale EduAid CSR funds; NESA Week of Impact (Dec 13–18); RMSA
                  pilot schools; 20–30 active chapters; diaspora town halls;
                  sustainability baselines.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">2026</h3>
                <p className="text-gray-300">
                  Double scholarships/micro-grants; expand Digital Corners;
                  multi-country RMSA; publish regional sustainability
                  scorecards.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">2027</h3>
                <p className="text-gray-300">
                  Multi-year CSR partnerships; cross-border teacher development;
                  interoperable dashboards; annual regional showcases.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Work With Us */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <Users className="w-10 h-10 text-[#22c55e]" />
              <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#22c55e] to-[#16a34a] bg-clip-text text-transparent">
                Work With Us
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  role: "CSR Partners",
                  desc: "Scope outcome-based funds; receive compliant, KPI-linked reporting.",
                },
                {
                  role: "Donors & Foundations",
                  desc: "Endow scholarships, sponsor micro-grants, or co-fund RMSA builds.",
                },
                {
                  role: "Diaspora Groups",
                  desc: "Adopt a school or scholarship cohort; track progress via portals.",
                },
                {
                  role: "Educators & Schools",
                  desc: "Apply for EduAid support; host Digital Corners; join webinars.",
                },
                {
                  role: "Members & Ambassadors",
                  desc: "Join local chapters, take on tasks, and drive impact in your community.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#111]/70 border border-[#22c55e]/30 rounded-xl p-6 shadow-md hover:shadow-lg hover:border-[#22c55e]/50 transition-all"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.role}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
