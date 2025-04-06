"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { toTopV, parentV } from "@/lib/utils/variants";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useModal } from "@/lib/store/modal";
import Modal from "@/components/Common/Modal";
import ThanksForVoting from "./thanks-for-voting";
import upload from "/public/svgs/upload.svg";
import { BiInfoCircle } from "react-icons/bi";

type Category = {
  id: number;
  title: string;
  description: string;
  detailsDescription?: string;
};

type CategoryDetail = {
  id: number;
  // Add other properties as needed
};

type Props = {
  id: number;
  category: Category | undefined;
  details: CategoryDetail | undefined;
};

const SubmitDetails: React.FC<Props> = ({ id, category, details }) => {
  const router = useRouter();
  const { showModal, hideModal, visible } = useModal();

  const showModClick = () => showModal(<ThanksForVoting />);

  if (!category) {
    toast.error("category not found");
    router.push("/categories");
    return null;
  }

  return (
    <>
      <Modal visible={visible} onClose={hideModal}></Modal>

      <header>
        <div className={`md:min-h-[48rem] min-h-screen bg-zinc-200 text-white relative`}>
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

          <div className="w-full h-full bg-[url('/public/images/bg/boy.png')] bg-center bg-cover bg-no-repeat flex md:pt-12 pt-24 text-center md:text-start">
            <motion.div
              variants={parentV}
              initial="initial"
              animate="animate"
              className="container flex justify-start lg:mt-[8rem] mt-[3rem] text-start gap-6 md:gap-0 items-center"
            >
              <motion.div variants={toTopV} className="space-y-6 w-full h-fit">
                <div className="space-y-1 lg:px-[3rem]">
                  <h1 className="font-[500] text-[1.8rem] lg:text-[2rem] leading-[3rem] text-white">
                    Sub Category {id} <br />
                    <span className="font-[600] text-[2rem] lg:text-[2.5rem] leading-10 lg:leading-[4rem] bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                      {category?.title}
                    </span>
                  </h1>
                </div>

                <p className="font-[400] lg:px-[3rem] lg:text-[1.5rem] text-[1.2rem] leading-[1.8rem] lg:leading-[2.25rem] text-center lg:text-start">
                  {category.detailsDescription ?? category.description}
                </p>
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
                Submit Nominee Personal Information
              </h1>
              <span className="bg-gradient-to-r from-[#febf44] to-[#ed9d19] h-[5px] w-[140px] absolute top-[42px] left-0"></span>
            </div>
            <form action="" className="w-full flex flex-col items-center gap-[3rem]">
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section>
                  <label htmlFor="individual/organization" className="font-[400] text-[1rem] leading-6">
                    Individual/Organization
                  </label>
                  <input
                    type="text"
                    name="individual/organization"
                    placeholder="Name of Individual or Organization"
                    className="w-[100%]"
                    style={{
                      background: "#FFF5E0",
                      padding: "12px 20px 12px 20px",
                      borderRadius: "8px",
                    }}
                  />
                </section>
                <section>
                  <label htmlFor="phone_no" className="font-[400] text-[1rem] leading-6">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone_no"
                    placeholder="Enter your phone number"
                    className="w-[100%]"
                    style={{
                      background: "#FFF5E0",
                      padding: "12px 20px 12px 20px",
                      borderRadius: "8px",
                    }}
                  />
                </section>
                <section>
                  <label htmlFor="organization" className="font-[400] text-[1rem] leading-6">
                    Organization
                  </label>
                  <input
                    type="text"
                    name="organization"
                    placeholder="Name of the organization they belong to"
                    className="w-[100%]"
                    style={{
                      background: "#FFF5E0",
                      padding: "12px 20px 12px 20px",
                      borderRadius: "8px",
                    }}
                  />
                </section>
                <section className="row-span-2">
                  <label htmlFor="individual/organization" className="font-[400] text-[1rem] leading-6">
                    Individual/Organization
                  </label>
                  <textarea
                    name="individual/organization"
                    placeholder="Name of Individual or Organization"
                    className="w-[100%] h-[88%] outline-none focus:outline-none"
                    rows={6}
                    style={{
                      background: "#FFF5E0",
                      padding: "12px 20px 12px 20px",
                      borderRadius: "8px",
                    }}
                  />
                </section>
                <section className="relative">
                  <label htmlFor="document" className="font-[400] text-[1rem] leading-6">
                    Document
                  </label>
                  <input
                    type="file"
                    placeholder="Upload supporting document or video"
                    title="Upload supporting document or video"
                    className="w-[100%]"
                    style={{
                      background: "#FFF5E0",
                      padding: "12px 20px 12px 20px",
                      borderRadius: "8px",
                    }}
                  />
                  <Image src={upload} alt="upload" className="absolute right-5 top-10" />
                  <span className="flex gap-1 items-center font-[400] text-[0.75rem] text-[#171D2980]">
                    <BiInfoCircle className="text-midGold h-4 w-4" />
                    JPG, PNG, PDF and SVG files only
                  </span>
                </section>
              </div>
              <button
                type="submit"
                className="text-[#17120a] w-[50%] py-3 flex justify-center items-center font-[500] text-sm rounded-[0.5rem]"
                style={{
                  background: `linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)`,
                }}
                onClick={showModClick}
              >
                Submit for Nomination
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default SubmitDetails;