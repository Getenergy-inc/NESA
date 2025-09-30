'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const faqs = [
  { q: "Do I influence who gets nominated or wins?", a: "No. Awards are independent with published criteria/weights and COI/recusal. Your work funds visibility and impact programs only." },
  { q: "Can I discount packages?", a: "Stick to the rate card. Any exception requires written approval (Partnerships + Finance + Legal)." },
  { q: "Currencies & payouts?", a: "We settle in NGN/USD depending on rails and MoU. Payouts follow monthly statements and cleared funds (≤15 business days)." },
  { q: "In-kind support?", a: "Valued at fair market rates for readiness. Commissions are cash-only unless explicitly approved." }
];

export default function FAQs(){
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faqs"
      className="section bg-gradient-to-br mb-10 p-6 from-orange-50 via-white to-orange-100"
    >
      <div className="container-max">
        <motion.h2
          initial={{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          transition={{duration:0.6}}
          className="heading text-3xl md:text-4xl font-bold text-center mb-8 mt-8"
        >
          FAQs
        </motion.h2>

        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((f, idx) => (
            <div
              key={f.q}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <button
                className="w-full text-left flex justify-between items-center p-5"
                onClick={() => setOpen(open === idx ? null : idx)}
              >
                <span
                  className={`font-medium text-lg transition-colors ${
                    open === idx ? "text-orange-600 font-semibold" : "text-gray-800"
                  }`}
                >
                  {f.q}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    open === idx
                      ? "bg-orange-600 text-white"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {open === idx ? "Hide" : "Show"}
                </span>
              </button>

              <AnimatePresence>
                {open === idx && (
                  <motion.div
                    initial={{height:0, opacity:0}}
                    animate={{height:"auto", opacity:1}}
                    exit={{height:0, opacity:0}}
                    transition={{duration:0.3}}
                    className="overflow-hidden"
                  >
                    <p className="p-5 pt-0 text-gray-700 border-t border-orange-100 leading-relaxed">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
