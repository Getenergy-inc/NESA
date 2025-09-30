'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const tracks = [
  "Local Chapter / Ambassador (Volunteer)",
  "Independent Fundraiser (Commissioned Individual)",
  "Agency / Platform (Commissioned Organisation)",
  "Ticketing Agent / Promoter / Creator Affiliate"
];

const sells = [
  "Sponsorship tiers ($2k / $3.5k / $5k / $10k)",
  "Expo booths / Pavilions",
  "Gala tables / VIP seating",
  "Tickets (in-person / virtual)",
  "Donations via official links"
];

export default function Applypage(){
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await fetch("", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData.entries())),
      headers: { "Content-Type": "application/json" }
    });
    if(res.ok) {
      setStatus("✅ Submitted! Check your email for the autoresponse with the rate card and commission policy.");
      e.currentTarget.reset();
    } else {
      setStatus("❌ Something went wrong. Please try again.");
    }
  }

  return (
    <section
      id="apply"
      className="relative section py-10 px-20 bg-white/50"
    >
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50/90 via-white/50 to-orange-100/90"></div>
      
      <div className="relative container-max">
        <motion.h1
          initial={{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          transition={{duration:0.6}}
          className="heading text-7xl md:text-4xl font-bold text-center text-[#1a140b] mb-8 mt-3"
        >
          Apply Now
        </motion.h1>

        <form
          onSubmit={onSubmit}
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 grid md:grid-cols-2 gap-8 border border-orange-100"
        >
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Track selection */}
            <div>
              <label className="block text-lg font-bold mb-3 text-gray-700">Select your track</label>
              <div className="grid gap-3">
                {tracks.map(t => (
                  <label
                    key={t}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-orange-400 transition-colors cursor-pointer bg-gray-50"
                  >
                    <input
                      type="radio"
                      name="track"
                      value={t}
                      required
                      className="accent-orange-500 w-4 h-4"
                    />
                    <span className="text-gray-800">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Personal Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-bold mb-2 text-gray-600">Full name</label>
                <input
                  name="fullName"
                  required
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
              </div>
              <div>
                <label className="block text-lg font-bold mb-2 text-gray-600">Organisation (optional)</label>
                <input
                  name="organisation"
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
              </div>
              <div>
                <label className="block text-lg font-bold mb-2 text-gray-600">Country/City</label>
                <input
                  name="city"
                  required
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
              </div>
              <div>
                <label className="block text-lg font-bold mb-2 text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
              </div>
              <div>
                <label className="block text-lg font-bold mb-2 text-gray-600">Phone/WhatsApp</label>
                <input
                  name="phone"
                  required
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
              </div>
              <div>
                <label className="block text-lg font-bold mb-2 text-gray-600">Website/Socials</label>
                <input
                  name="web"
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Segment focus */}
            <div>
              <label className="block text-lg font-bold mb-2 text-gray-700">Segment focus</label>
              <select
                name="segment"
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-orange-400 transition"
              >
                <option>CSR/ESG</option>
                <option>SME/community</option>
                <option>Diaspora</option>
                <option>Ticketing</option>
                <option>Creator/Media</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-lg font-bold mb-2 text-gray-700">Relevant experience / networks (≤150 words)</label>
              <textarea
                name="experience"
                rows={4}
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>

            {/* What to sell */}
            <div>
              <label className="block text-lg font-bold mb-3 text-gray-700">What you plan to sell</label>
              <div className="grid gap-3">
                {sells.map(s => (
                  <label
                    key={s}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-orange-400 transition-colors cursor-pointer bg-gray-50"
                  >
                    <input type="checkbox" name="sell" value={s} className="accent-orange-500 w-4 h-4" />
                    <span className="text-gray-800">{s}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Monthly Targets */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-lg font-bold mb-2 text-gray-700">CSR deals / month</label>
                <input
                  name="csrDeals"
                  type="number"
                  min="0"
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
              </div>
              <div>
                <label className="block text-lg font-bold mb-2 text-gray-700">Tickets / month</label>
                <input
                  name="tickets"
                  type="number"
                  min="0"
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
              </div>
              <div>
                <label className="block text-lg font-bold mb-2 text-gray-700">Expo booths / month</label>
                <input
                  name="booths"
                  type="number"
                  min="0"
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
              </div>
            </div>

            {/* Integrity checkboxes */}
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input type="checkbox" name="integrity" required className="accent-orange-500 w-4 h-4" />
                <span className="text-sm text-gray-700">I accept the integrity firewall: funding does not influence nominees or winners.</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" name="materials" required className="accent-orange-500 w-4 h-4" />
                <span className="text-sm text-gray-700">I will use approved materials and official rails only.</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" name="policies" required className="accent-orange-500 w-4 h-4" />
                <span className="text-sm text-gray-700">I agree to NDPR/GDPR privacy, AML/KYC, anti-bribery policies.</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" name="commissions" required className="accent-orange-500 w-4 h-4" />
                <span className="text-sm text-gray-700">I understand commissions are on Net Basis and 20% of each commission supports EduAid-Africa.</span>
              </label>
            </div>

            {/* Submit */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:shadow-lg hover:shadow-orange-300/50 transition"
              >
                Submit
              </button>
              {status && (
                <span className="text-sm text-gray-700 italic">{status}</span>
              )}
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Integrity & Governance: Funding does not influence nominations or winners. Brand use by written approval. 
              See governance & COI/recusal policy at <a href="https://nesa.africa/governance" className="underline hover:text-orange-500">nesa.africa/governance</a>.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
