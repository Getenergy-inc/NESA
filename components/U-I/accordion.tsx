"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionProps {
  children: React.ReactNode;
  type?: "single" | "multiple"; // allow Radix-like API
  collapsible?: boolean;        // allow collapsible prop
  className?: string;
}

export function Accordion({
  children,
  type = "single",
  collapsible = true,
  className,
}: AccordionProps) {
  return (
    <div
      data-type={type}
      data-collapsible={collapsible}
      className={`space-y-2 ${className || ""}`}
    >
      {children}
    </div>
  );
}

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  return (
    <div
      data-accordion-item={value}
      className={`border rounded-lg shadow-sm overflow-hidden ${className || ""}`}
    >
      {children}
    </div>
  );
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 font-medium ${className || ""}`}
      >
        {children}
        <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 py-3 text-sm text-gray-700">
              {/* Accordion Content will go here */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  return <div className={`${className || ""}`}>{children}</div>;
}
