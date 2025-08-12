"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Panel = () => {
  return (
    <div className="container flex items-center justify-between">
      <div className="flex items-center gap-2">
        {Array.from({ length: 5 }).map((_, id) => (
          <div
            key={id}
            className={`w-3 h-3 cursor-pointer rounded-full ${id === 0 ? "bg-darkGold" : "bg-zinc-300"}`}
          ></div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-black">
        <button className="p-3 rounded-lg bg-xlGold">
          <ArrowLeft size={20} />
        </button>
        <button className="p-3 rounded-lg bg-deepGold">
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Panel;
