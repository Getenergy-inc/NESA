"use client"
import React from 'react'
import { motion } from 'framer-motion'


const FAQs  = [
        {
            question: "What is NESA-Africa 2025?",
            answer: "NESA-Africa 2025 (New Education Standard Award – Africa) is the continent’s premier education recognition platform powered by Santos Creations Educational Foundation (SCEF) and the GFA Wallet. It honors changemakers, institutions, leaders, and innovations transforming Africa’s education systems, while promoting SDGs, ESG, and African Agenda 2063."
        },
        {
            title:"🗓 Deadlines & Confirmation",
            question: "What is the deadline to confirm sponsorship?",
            answer: `✅ Sponsorship Confirmation Deadline: November 31, 2025

            🧾 Nominee Endorsement Rights Deadline: September 20, 2025

            📦 Exhibitor & Expo Slot Confirmation: November 15, 2025

            Sponsors confirmed after the deadline may not receive full visibility or printed branding but will still be listed in the digital Hall of Sponsors.
`
        },
        {
            title:"💼 Sponsorship Tiers & Benefits",
            question: "❓ What are the different sponsorship tiers and benefits?",
            answer: [
                {tier: "💎 Africa Blue Garnet", amount: "$250,000", keybenefits: "Title Sponsor, 30 VIP passes, full branding, keynote, NESA TV feature"},
                {tier: "🟨 Gold Garnet", amount: "$150,000", keybenefits: "Major branding, certificate co-branding, speaking slot"},
                {tier: "🟦 Silver Garnet", amount: "$75,000", keybenefits: "8 VIP passes, segment branding, social media campaigns"},
                {tier: "🟫 Bronze Garnet", amount: "$30,000", keybenefits: "Branding mentions, event website features"},
                {tier: "🏆 Category Sponsor", amount: "$20,000", keybenefits: "Sponsor a specific award, stage presentation, press mentions"},
                {tier: "🏢 Exhibitor Package", amount: "$10,000", keybenefits: "Booth at EduAid Africa Expo, 5,000+ delegates, 2 VIP passes"},
                {tier: "🟣 Platinum Donor", amount: "$5,000+", keybenefits: "Keynote spotlight, official certificate, 10 Gala tickets"},
                {tier: "🔵 Gold Donor", amount: "$2,500 – $4,999", keybenefits: "Subcategory branding, interview, VVIP table for 5"},
                {tier: "🟡 Silver Donor", amount: "$1,000 – $2,499", keybenefits: "Logo on certificates, 3 Gala tickets"},
                {tier: "🟢 Bronze Donor", amount: "$500 – $999", keybenefits: "Donor Certificate, logo listing, 2 Gala tickets"}
             ],
            },
            {
                title:"💳 Payment & Process",
                question:"❓ How do I pay for a sponsorship?",
                answer:`You can sponsor through:

                Direct Bank Transfer (official bank details available on confirmation)

                GFA Wallet — Load AGC and complete payment digitally.

`
            },
            {
                title:"📜 Sponsorship Documentation",
                question:"❓ Will I receive proof of sponsorship?",
                answer:`Yes. Each sponsor receives:

                Branded Certificate of Sponsorship (downloadable via GFA Wallet)

                Invoice + Receipt

                NESA Partner Contract/MoU (for $20K and above)`

            },
            {
                title:"📢 Visibility & Acknowledgement",
                question:"❓ How will my brand be recognized?",
                answer:`Depending on your tier, your organization may receive:

                        Logo & link on NESA website

                        Branding on certificates and award categories

                        Mentions during event broadcasts & Gala

                        Features on NESA TV, social media, and e-newsletters

                        Exhibition booth (for Exhibitor Package)
`
            },
            {
                title:"🤝 Partnerships",
                question: "❓ Can I partner without sponsoring?",
                answer:`Yes — NESA welcomes NGOs, media partners, CSR platforms, and institutional allies for non-financial partnerships including:

                        In-kind support (venues, logistics, media)

                        Outreach collaboration

                        Research or community programs

                        Contact: partnerships@nesa.africa`

            },
            {
                title:"🎓 Impact of Sponsorship",
                question:"What will my sponsorship fund?",
                answer:`Your support helps us:

                        Fund 10,000+ scholarships

                        Digitize education access in rural communities

                        Host the EduAid Africa Expo

                        Reward over 4,000 verified nominees

                        Sustain the NESA TV broadcast
`
    },
];
    const sponsorshipTiers = [
    {tier: "💎 Africa Blue Garnet", amount: "$250,000", keybenefits: "Title Sponsor, 30 VIP passes, full branding, keynote, NESA TV feature"},
    {tier: "🟨 Gold Garnet", amount: "$150,000", keybenefits: "Major branding, certificate co-branding, speaking slot"},
    {tier: "🟦 Silver Garnet", amount: "$75,000", keybenefits: "8 VIP passes, segment branding, social media campaigns"},
    {tier: "🟫 Bronze Garnet", amount: "$$30,000	", keybenefits: "Branding mentions, event website features"},
    {tier: "🏆 Category Sponsor", amount: "$20,000", keybenefits: "Sponsor a specific award, stage presentation, press mentions"},
    {tier: "🏢 Exhibitor Package", amount: "$10,000", keybenefits: "Booth at EduAid Africa Expo, 5,000+ delegates, 2 VIP passes"},
    {tier: "🟣 Platinum Donor", amount: "$5,000+", keybenefits: "Keynote spotlight, official certificate, 10 Gala tickets"},
    {tier: "🔵 Gold Donor", amount: "$2,500 – $4,999", keybenefits: "Subcategory branding, interview, VVIP table for 5"},
    {tier: "🟡 Silver Donor", amount: "$1,000 – $2,499", keybenefits: "Logo on certificates, 3 Gala tickets"},
    {tier: "🟢 Bronze Donor", amount: "$500 – $999", keybenefits: "Donor Certificate, logo listing, 2 Gala tickets"}
];

const bgColors = [
  "bg-orange-50",
  "bg-yellow-50",
  "bg-green-50",
  "bg-blue-50",
  "bg-purple-50",
  "bg-pink-50",
  "bg-teal-50",
  "bg-red-50",
];


const PartnerTiersTable = () => (
    <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-300 mt-6  text-sm md:text-base">
        <thead>
        <tr className="bg-gray-100">
            <th className="border px-4 py-2 md:px-4 text-left">Tier</th>
            <th className="border px-4 py-2 md:px-4 text-left">Amount</th>
            <th className="border px-4 py-2 md:px-4 text-left">Key Benefits</th>
        </tr>
        </thead>
        <tbody>
        {sponsorshipTiers.map((tier, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            <td className="border px-2 py-2 md:px-4">{tier.tier}</td>
            <td className="border px-2 py-2 md:px-4">{tier.amount}</td>
            <td className="border px-2 py-2 md:px-4">{tier.keybenefits}</td>
          </tr>

        ))}
        </tbody>
    </table>
    </div>

);
const PartnerFAQs = () => {
    return(
    <div
      className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-12 min-h-screen bg-cover bg-center bg-repeat"
      style={{
        backgroundImage: "url('/images/getinvolved/get5.png')",
      }}
    >
      <div className="backdrop-blur-sm bg-gray/70 rounded-2xl p-4 sm:p-6 md:p-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">NESA-Africa 2025 Partnership and Sponsorship Questions Answered.</h1>
        <p className="mb-8 text-sm sm:text-base md:text-lg text-center md:text-left">Here you can find answers to frequently asked questions about partnering with us.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
        {FAQs.map((faq, idx) => (
          <motion.div
            key={idx}
            className={`mb-8 rounded-xl shadow-lg p-6 border border-gray-100  sm:p-6  ${bgColors[idx % bgColors.length]}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <h2 className="text-lg sm:text-xl font-bold text-[#ea580c] mb-2">{faq.title || faq.question}</h2>
            <p className="text-gray-700 mb-4 text-sm sm:text-base">{faq.question}</p>
            {Array.isArray(faq.answer) ? (
              <PartnerTiersTable />
            ) : (
              <pre className="text-gray-600 whitespace-pre-wrap text-sm sm:text-base">{faq.answer}</pre>
            )}
          </motion.div>
          
        ))}
      </div>
    </div>
  )
}

export default PartnerFAQs