"use client";
import { useState } from "react";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

export default function Accordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg mb-4 bg-white shadow">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-4 font-medium text-left"
      >
        {title}
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && <div className="p-4 border-t">{children}</div>}
    </div>
  );
}
