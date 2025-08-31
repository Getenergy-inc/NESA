"use client";
import { useLayoutEffect, useRef } from "react";
import styles from "@/components/Common/Slide/style.module.scss";
import { motion } from "framer-motion";
import { opacityTrans } from "@/lib/utils/transitions";
import SantosLink from "@/components/Common/Links/santos";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import Button from "@/components/Common/Button";
import CountdownTimer from "@/components/Common/Others/counter";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  index: number;
  title: string;
  description: string;
  subCategoryPath: string;
};
const CategoryHeroCenter = ({
  index,
  title,
  description,
  subCategoryPath,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const totalSlides = [];

  return (
    <>
      <div className="absolute inset-0 min-h-full w-full pointer-events-none">
        <Image
          src={"/images/header.png"}
          alt="hero image"
          fill
          className="w-full h-full object-cover -z-[1]"
        />
      </div>
      <div className="grid md:grid-cols-2 items-center gap-2  md:container min-h-full  py-20 pb-2">
        <div className="md:space-y-5 space-y-2.5  md:text-left text-center">
          <div className="flex px-3.5 items-center -mt-10 justify-center md:justify-start gap-2 text-primaryGold">
            <FaStar />
            <p className="text-2xl px-3.5 font-bold">Category {index}</p>
            <FaStar />
          </div>

          <h1 className="px-3.5 md:font-semibold font-bold md:text-4xl text-lg text-white">
            {title}
          </h1>

          <p className="px-3.5 text-base md:text-2xl">{description}</p>

          <p className="px-3.5 text-primaryGold text-xl">
            A flagship initiative under <SantosLink />
          </p>

          <div className="flex pt-1 items-center px-1 gap-1 md:gap-3 justify-center md:justify-start">
            <Button
              text="View Categories"
              className="rounded-md md:px-8 py-2 text-center hover:bg-[#E48900] hover:text-black sm:w-auto w-1/2 text-sm md:text-base"
              onClick={() => router.push("/categories")}
            />
            <Button
              text="Nominate Now"
              variant="filled"
              className="rounded-md md:px-8 py-2 text-center hover:bg-[#E48900] hover:text-black sm:w-auto w-1/2 text-sm md:text-base"
              onClick={() =>
                router.push(
                  "/nomination/sub-categories/africa-lifetime-education-icon"
                )
              }
            />
          </div>
        </div>

        <div className="lg:w-auto md:ml-8 pl-10 pr-10 flex justify-center">
          <Image
            src={"/images/nesa-mg.png"}
            className="min-w-32 md:min-w-72 lg:min-w-440px"
            alt=""
            width={300}
            height={300}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryHeroCenter;
