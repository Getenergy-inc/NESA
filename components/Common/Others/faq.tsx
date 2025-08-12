"use client";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Faq } from "@/lib/types/global";
import { homeFaq } from "@/lib/data/faq";

const FAQs: React.FC<{ data?: Faq[]; variant?: "1" | "2" }> = ({ data: faqData = homeFaq, variant }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    if (selectedId === id) {
      setSelectedId(null);
      return;
    }

    setSelectedId(id);
  };

  return (
    <div
      className={`${
        !variant || variant === "1" ? "bg-[#fbf4e6]" : "bg-[#e2dcce]"
      } my-8 py-12 select-none px-12 rounded-2xl`}
    >
      <div>
        {faqData.map((data, id) => (
          <div
            key={id}
            className={`py-5 border-b space-y-2 ${variant === "2" ? "border-zinc-400" : "border-zinc-300"}`}
          >
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleFaq(id)}>
              <p className="md:text-xl text-lg">{data.question}</p>
              <div className="md:w-8 md:h-8 w-6 h-6 flex-shrink-0 rounded-full border border-black/20 grid place-content-center">
                <ChevronDown className={`text-zinc-700 p-1 md:p-0 ${selectedId === id && "rotate-180"} duration-300`} />
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {selectedId === id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-semiGrey text-sm md:text-base overflow-hidden"
                  key={id}
                >
                  <p className="whitespace-pre-line">{data.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
