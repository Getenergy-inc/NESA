"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { toTopV, parentV } from "@/lib/utils/variants";
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { CategoryChild, CategoryDetails } from "@/lib/types/global";
import toast from "react-hot-toast";
import { allCategories } from "@/lib/data/category";
import { useModal } from "@/lib/store/modal";
import Modal from "@/components/Common/Modal";
import ThanksForVoting from "./thanks-for-voting";
import Nominate from "../NominateCard/Nominate";

type Props = {
  id: number;
  category: CategoryChild | undefined;
  details: CategoryDetails | undefined;
};

const CategoriesDetails: React.FC<Props> = ({ id, category, details }) => {
  const router = useRouter();
  const { showModal, hideModal, visible } = useModal();

  // Updated to pass both content and type
  const showModClick = () => showModal(<ThanksForVoting />, "info");

  if (!category) {
    toast.error("category not found");
    router.push("/categories");
    return null;
  }

  return (
    <>
      <Modal visible={visible} onClose={hideModal}></Modal>

      <header>
        <div
          className={`md:min-h-[48rem] min-h-screen bg-zinc-200 text-white relative`}
        >
          <div className="absolute top-0 left-0 h-full w-full">
            <Image
              src={"/images/bg/about_.png"}
              alt="hero image"
              width={1240}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-[#15110999] absolute top-0 left-0 w-full h-full"></div>

          <div className="w-full h-full flex md:pt-12 pt-24 text-center md:text-start">
            <motion.div
              variants={parentV}
              initial="initial"
              animate="animate"
              className="container flex justify-center mt-[2.5rem] lg:mt-[5.625rem] text-center gap-6 md:gap-0 items-center"
            >
              <motion.div variants={toTopV} className="space-y-6 w-full h-fit">
                <div className="space-y-1 lg:px-[3rem]">
                  <h1 className="font-[500] text-[1.8rem] lg:text-[2rem] leading-[3rem] text-white">
                    Category {id} <br />
                    <span className="font-[600] text-[2rem] lg:text-[2.5rem] leading-10 lg:leading-[4rem] bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                      {category?.title}
                    </span>
                  </h1>
                </div>

                <p className="font-[400] lg:px-[3rem] lg:text-[1.5rem] text-[1.2rem] leading-[1.8rem] lg:leading-[2.25rem] text-center lg:text-start">
                  {category.detailsDescription ?? category.description}
                </p>

                <div className="flex items-center justify-between pt-[2rem] lg:pt-[5.625rem]">
                  <div className="flex items-center gap-2">
                    {Array(4)
                      .fill("")
                      .map((e, i) => (
                        <div
                          key={i}
                          className={`rounded-full h-4 w-4 ${
                            i == 0 ? "bg-midGold h-5 w-5" : "bg-zinc-400"
                          }`}
                        ></div>
                      ))}
                  </div>
                  <div className="flex items-center gap-4 justify-center lg:justify-end">
                    <button
                      className={`w-12 h-12 duration-300 rounded-lg disabled:bg-zinc-400 bg-midGold text-black grid place-content-center`}
                      onClick={() =>
                        id > 1 ? router.push(`/categories/${id - 1}`) : {}
                      }
                      disabled={id < 2}
                    >
                      <ArrowLeft />
                    </button>
                    <button
                      className={`w-12 h-12 duration-300 rounded-lg bg-midGold disabled:bg-zinc-400 text-black grid place-content-center`}
                      onClick={() => router.push(`/categories/${id + 1}`)}
                      disabled={id >= allCategories.length}
                    >
                      <ArrowRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </header>

      <main>
        <div className="container pb-10">
          <div className="space-y-3 mt-16">
            <div className="relative">
              <h1 className="mb-[2rem] font-[500] text-[2rem] leading-[3rem]">
                The NGO Award Sub-Categories
              </h1>
              <span className="bg-gradient-to-r from-[#febf44] to-[#ed9d19] h-[5px] w-[140px] absolute top-[42px] left-0"></span>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
              {allCategories.map((data, id) => (
                <Nominate data={data} key={id} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CategoriesDetails;