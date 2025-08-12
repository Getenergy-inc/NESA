"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import NominateCard from "../Categories/NominateCard";
import { allCategories } from "@/lib/data/category";

const Page = () => {
  const router = useRouter();
  return (
    <main>
      <div className="container pb-10 my-[8rem] flex flex-col gap-10">
        <div
          className="size-12 cursor-pointer rounded-[10px] bg-gradient-to-r from-[#febf44] to-[#ed9d19] z-[100] duration-300 hover:opacity-95 flex justify-center items-center"
          onClick={() => router.back()}
        >
          <ChevronLeft />
        </div>
        <div className="mt-[1rem]">
          <div className="relative">
            <h1 className="mb-[2rem] font-[500] text-[2rem] leading-[3rem]">
              The NGO Award Sub-Categories
            </h1>
            <span className="bg-gradient-to-r from-[#febf44] to-[#ed9d19] h-[5px] w-[140px] absolute top-[42px] left-0"></span>
          </div>

          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
            {allCategories.map((data, id) => (
              <NominateCard data={data} key={id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
