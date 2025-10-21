"use client";

import React, { useState , useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CalendarDays, Users, Mic2, Handshake } from "lucide-react";
import Image from "next/image";

type Objective = string;

type Webinar = {
  date: string;
  title: string;
  problem: string;
  objectives: Objective[];
};


  const items = [
    {
      icon: <Users className="w-10 h-10 text-[#f59e0b]" />,
      title: "Attendees",
      desc: "Join any or all episodes live and connect with education leaders shaping Africa’s learning future.",
    },
    {
      icon: <Mic2 className="w-10 h-10 text-[#ea580c]" />,
      title: "Speakers & Panelists",
      desc: "Share your innovation, project, or research with peers across the continent.",
    },
    {
      icon: <Handshake className="w-10 h-10 text-[#f59e0b]" />,
      title: "Partners & Sponsors",
      desc: "Showcase your brand, CSR program, or education technology in front of decision-makers.",
    },
  ];


const webinars: Webinar[] = [
  {
    date: "Tue Oct 14, 2025",
    title: "Bridging the Education Inequality Gap in Africa",
    problem:
      "Large numbers of learners—especially girls and children with disabilities—remain out of school or below grade level due to cost, distance, safety, language, and weak targeting.",
    objectives: [
      "Define a simple equity-targeting rule (2–3 indicators) every district can use.",
      "Agree a 90-day package (tutoring, transport/meals micro-grants, safe-school basics).",
      "Set a quarterly monitoring cadence (attendance, FLN, transition).",
    ],
  },
  {
    date: "Tue Oct 21, 2025",
    title: "EdTech for Rural Learning (Offline-first + Solar)",
    problem:
      "Poor connectivity/power, device costs, and low teacher readiness stall digital learning outside cities.",
    objectives: [
      "Publish a low-bandwidth 'minimum viable stack' (content, devices, power, privacy).",
      "Link teacher CPD completion to a classroom-practice metric.",
      "Secure vendor SLAs for uptime, warranty, and local maintenance.",
    ],
  },
  {
    date: "Tue Oct 28, 2025",
    title: "Youth & Education for Sustainability (Green TVET)",
    problem:
      "Youth lack certified green skills and safe, paid pathways into local demand sectors.",
    objectives: [
      "Table two micro-credentials recognized by employers and TVET bodies.",
      "Standardize 6-month apprenticeships (stipend, PPE, supervisor ratio, insurance).",
      "Choose one climate project per 100 schools with cost/KPIs.",
    ],
  },
  {
    date: "Tue Nov 4, 2025",
    title: "Diaspora Collaboration for Education Reform",
    problem:
      "Diaspora resources are underused due to trust, compliance, and coordination gaps.",
    objectives: [
      "Approve a diaspora fund term sheet (escrow, audits, fee stack, dashboard).",
      "Launch a 1,000 mentor-hours/quarter pipeline with safeguarding.",
      "Twin two diaspora chapters with two local chapters under a light MoU.",
    ],
  },
  {
    date: "Tue Nov 11, 2025",
    title: "Faith-Based Education: Safeguarding, Girls’ Retention, SEN",
    problem:
      "Millions in faith-school systems face uneven safeguarding, girls’ retention challenges, and limited SEN support.",
    objectives: [
      "Adopt a minimum safeguarding kit (policy, focal point, hotline/redress).",
      "Finance a dignity-kit/WASH refill model and Boys-as-Allies culture activities.",
      "Deploy <$10 SEN classroom adaptations with teacher checklists.",
    ],
  },
  {
    date: "Tue Nov 18, 2025",
    title: "Creative Arts & Media for Educational Change",
    problem:
      "Evidence-based messages rarely reach families in local languages at scale.",
    objectives: [
      "Commission a 10-episode edutainment format in two languages with clear KPIs.",
      "Select one SEL metric tied to attendance/engagement for every episode.",
      "Set a 30-day translation/adaptation workflow with rights and safety checks.",
    ],
  },
  {
    date: "Tue Nov 25, 2025",
    title: "Financing Education: Public & Private Roles",
    problem:
      "Fragmented funds and low transparency slow results; verification is inconsistent.",
    objectives: [
      "Publish a scholarship dashboard spec with equity rules and live disbursements.",
      "Lock three outcome triggers (e.g., reading, attendance, transition) + verification.",
      "Agree PPP/procurement model clauses balancing speed and probity.",
    ],
  },
  {
    date: "Tue Dec 2, 2025",
    title: "Women & Girls in Education — Removing Barriers",
    problem:
      "Safety, menstruation, cost, and limited role-models keep girls from learning and STEM careers.",
    objectives: [
      "Sign a Safe-Routes + Hotline MoU (roles, escalation tree, data protection).",
      "Fund WASH/MHM refills and launch Raising Gentlemen/boys-ally clubs.",
      "Open a STEM internship pledge window with employer screening protocol.",
    ],
  },
  {
    date: "Tue Dec 9, 2025",
    title: "Curriculum & the Future of Work in Africa",
    problem:
      "Curricula and exams lag employer-verified skills; pathways to jobs are unclear.",
    objectives: [
      "Table three micro-credentials for national recognition within the year.",
      "Secure 1,000 apprenticeship LOIs with placement/retention KPIs.",
      "Launch a 6-week teacher-to-trainer upskilling sprint with stipend.",
    ],
  },
  {
    date: "Tue Dec 16, 2025",
    title: "EduAid-Africa Expo (2h30 virtual deal-room)",
    problem:
      "Pledges and pilots often stall without a closing room and clear owners.",
    objectives: [
      "Convert webinar momentum into signed MoUs and funded pilots.",
      "Run policy & finance roundtables to match needs → instruments → implementers.",
      "Publish an outcomes note and Q1 technical workshops calendar.",
    ],
  },
  {
    date: "Thu Dec 18, 2025",
    title: "NESA-Africa Awards (online or showcase)",
    problem:
      "Proven efforts aren’t celebrated or recycled into policy and partnerships.",
    objectives: [
      "Recognize evidence-backed impact and renew partnerships for the next cycle.",
      "Capture winner case studies for NESA TV/Media Hub and ministry briefings.",
      "Drive sponsor and chapter renewals linked to 2026 pilots.",
    ],
  },
  {
    date: "Tue Jan 6, 2026",
    title: "Q1 Policy & Finance Summit: Dashboards, Budgets, Transparency",
    problem:
      "Education budgets lack public dashboards; trust and oversight are thin.",
    objectives: [
      "Get three ministries to adopt public dashboards and quarterly reviews.",
      "Align CSO oversight and audit trails with data-sharing agreements.",
      "Plan Q1–Q2 budget re-allocations toward high-impact, verified programs.",
    ],
  },
  {
    date: "Tue Jan 13, 2026",
    title: "Teacher CPD Sprint Kick-off",
    problem:
      "CPD rarely changes classroom practice at scale or speed.",
    objectives: [
      "Launch 6-week trainer cohorts with micro-credential + stipend.",
      "Define one practice-change metric per subject and collect evidence.",
      "Set school-based coaching schedules and observation rubrics.",
    ],
  },
  {
    date: "Tue Jan 20, 2026",
    title: "My Career, My Life (G/C #1): ICT & Green Jobs",
    problem:
      "Secondary students lack career guidance, portfolios, and mentors.",
    objectives: [
      "Distribute a career-lab toolkit (portfolios, sector maps, interview prep).",
      "Recruit employer mentors and publish an internship calendar.",
      "Integrate financial literacy and safe digital work practices.",
    ],
  },
  {
    date: "Tue Jan 27, 2026",
    title: "EMIS & Data Privacy: NDPR/GDPR for Schools",
    problem:
      "Many schools mishandle data and lack clear privacy notices/agreements.",
    objectives: [
      "Approve model privacy notices and parent/guardian consent forms.",
      "Sign EMIS data-sharing agreements with minimization and retention rules.",
      "Train focal points for incident response and rights requests.",
    ],
  },
  {
    date: "Tue Feb 3, 2026",
    title: "PPP Procurement Fast & Clean",
    problem:
      "Procurement is slow or vulnerable, deterring credible partners.",
    objectives: [
      "Publish adoptable clause packs with integrity, speed, and auditability.",
      "Define risk-sharing (first-loss/guarantees) for NGOs/SMEs.",
      "Standardize vendor performance reviews and termination triggers.",
    ],
  },
  {
    date: "Tue Feb 10, 2026",
    title: "Girls in STEM: Internships, Mentors, Safe Workspaces",
    problem:
      "Girls face barriers to enter and stay in STEM pipelines.",
    objectives: [
      "Secure 500+ paid internship seats with retention KPIs.",
      "Build mentor networks and bias-mitigation for teachers/managers.",
      "Ensure workplace safety protocols and safeguarding contacts.",
    ],
  },
  {
    date: "Tue Feb 17, 2026",
    title: "Refugee/IDP & Pastoralist Education",
    problem:
      "Mobile and displaced learners fall through certification and continuity gaps.",
    objectives: [
      "Deploy radio/print catch-up bundles with teacher guides.",
      "Agree recognition/certification pathways across jurisdictions.",
      "Map safe spaces and referral lines; monitor attendance and progression.",
    ],
  },
  {
    date: "Tue Feb 24, 2026",
    title: "Q1 Technical Clinics & Expo 2026 Preview",
    problem:
      "Post-event follow-through weakens without technical ownership.",
    objectives: [
      "Book country clinics with owners, timelines, and budgets.",
      "Match pilots to verification partners and financing instruments.",
      "Publish the 2026 pipeline and early Expo targets.",
    ],
  },
];

const heroImages = [
  "/images/eduaid.jpg",
  "/images/bg/boy.png",
  "/images/whydonate/whydonate3.png",
];

const WebinarSchedule = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  // Cycle hero images every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-gray-100">
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
            <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 -z-10"
          >
            <Image
              src={heroImages[currentImage]}
              alt="EduAid-Africa Webinar Hero"
              fill
              className="object-cover brightness-75"
              priority
            />
          </motion.div>
        </AnimatePresence>


        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 px-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#f59e0b] drop-shadow-lg">
            EduAid–Africa Webinars
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
        Join thousands of educators, innovators, investors, and diaspora changemakers for the EduAid-Africa Webinar Series — a Pan-African dialogue on how technology, partnerships, and social impact are transforming learning across 54 countries and the global diaspora.
          </p>
         
        </motion.div>

        {/* Subtle moving overlay effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/70 -z-10"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        />
      </section>

      <section className="py-20 px-6 md:px-12 bg-[#1a140b] text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#f59e0b]">
          💡 Who Can Register?
        </h2>
        <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
          EduAid–Africa welcomes everyone working toward equitable, sustainable,
          and inclusive education.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-[#1e1a11] border border-[#f59e0b]/30 hover:border-[#ea580c]/60 rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-[#f59e0b]">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>

      {/* ===== MAIN CONTENT ===== */}
      <section id="schedule" className="py-16 px-6 md:px-12 bg-[#1a140b]">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12 text-[#f59e0b]"
          >
            Webinar Schedule (Oct 2025 – Feb 2026)
          </motion.h2>

          <div className="space-y-6">
            {webinars.map((webinar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-[#1e1a11] border border-[#f59e0b]/30 rounded-2xl shadow-md overflow-hidden hover:shadow-lg hover:border-[#ea580c]/70 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {webinar.title}
                    </h2>
                    <div className="flex items-center gap-2 text-[#f59e0b] mt-1">
                      <CalendarDays className="w-4 h-4" />
                      <span>{webinar.date}</span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#f59e0b] transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 space-y-4"
                    >
                      <div>
                        <h3 className="text-lg font-medium text-[#f59e0b] mb-1">
                          Problem Statement
                        </h3>
                        <p className="text-gray-300">{webinar.problem}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-[#f59e0b] mb-1">
                          Objectives
                        </h3>
                        <ul className="list-disc pl-6 text-gray-300 space-y-1">
                          {webinar.objectives.map((obj, i) => (
                            <li key={i}>{obj}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebinarSchedule