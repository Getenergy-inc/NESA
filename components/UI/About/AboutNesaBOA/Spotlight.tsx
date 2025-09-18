"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Download } from "lucide-react";

export default function Spotlight() {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center text-white px-6 py-12 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/headhero.png')" }} 
    >
      {/* <div className="absolute inset-0 bg-black/20" /> */}
   
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          NESA-Africa 2025–2027 Board of Advisors
        </h1>
        <p className="text-lg md:text-xl mb-4 text-gray-300">
          Platform: <span className="text-[#f59e0b]">NESA-Africa — Week of Impact & Pan-African Education Awards</span>
        </p>
        <p className="text-lg md:text-xl mb-4 text-gray-300">
          Dates/City: <span className="text-[#ea580c]">13–18 December 2025 • Lagos, Nigeria</span>
        </p>
        <p className="text-lg md:text-xl text-gray-300">
          Purpose: Provide independent guidance on governance, methodology (SDG4/Agenda 2063 alignment), programs, and partnerships across Africa and the Diaspora.
        </p>
      </motion.div>

      {/* Integrity Statement */}
      {/* <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-10 bg-[#2a1f15] border border-[#ea580c]/40 rounded-2xl shadow-lg shadow-[#ea580c]/30 p-6 max-w-3xl text-center"
      >
        <p className="text-md md:text-lg leading-relaxed text-gray-200">
          <span className="font-semibold text-[#f59e0b]">Integrity firewall:</span> Funding and sponsorship do not influence nominations or winners. Advisors do not judge categories, vote on nominees, or endorse individual candidates.
        </p>
      </motion.div> */}

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-12 flex flex-wrap gap-4 justify-center"
      >
        <Link
          href="/about/about-nesa-boa/eoi-form"
          className="px-6 py-3 rounded-full bg-[#ea580c] hover:bg-[#f59e0b] text-black font-semibold shadow-md hover:shadow-[#f59e0b]/50 transition-all duration-300"
        >
          Apply to the Board
        </Link>
     
        {/* Tertiary Download Button */}
        {/* Download Advisory Charter button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
    
         </div> 
        <Link
          href="/advisors"
          className="px-6 py-3 rounded-full border border-[#f59e0b] text-[#f59e0b] font-bold shadow-md hover:shadow-[#f59e0b]/50 transition-all duration-300"
        >
          View Current Advisors
        </Link>
              <Link
            href="/files/NESA.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-[#f59e0b] text-sm font-medium rounded-full hover:text-[#ea580c] "
          >
            <Download className="w-4 h-4" />
            Download Advisory Charter
          </Link>
      </motion.div>
    </div>
  );
}
