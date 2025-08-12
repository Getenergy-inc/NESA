"use client";

import SantosLink from "@/components/Common/Links/santos";
import { additionalOpportunities, benefits, sponsors } from "@/lib/data/others";
import { useModal } from "@/lib/store/modal";
import { AnimatePresence } from "framer-motion";
import { raleway } from "@/lib/utils/font";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/components/Common/Modal";
import SponsorshipModalContent from "./modal";

const Page = () => {
  const { showModal, visible, hideModal } = useModal();

  // Updated function to pass both content and type
  const showModalClick = () => showModal(<SponsorshipModalContent />, "info");

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        {visible && <Modal visible={visible} key={"modal-"} onClose={hideModal} />}
      </AnimatePresence>

      <header className="md:min-h-[40rem] min-h-screen bg-[#17120a] text-white flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center space-y-2">
          <h1 className={`${raleway.className} font-bold text-deepGold md:text-5xl sm:text-4xl text-3xl`}>
            NESA 2023 Award Dinner: An Evening of Excellence
          </h1>
          <p className="text-lg">
            Join NESA Africa, facilitated by <SantosLink />, and become part of a transformative educational community.
          </p>
        </div>
      </header>

      <main>
        <div className="md:my-24 my-16 md:grid grid-cols-2 flex flex-col-reverse md:gap-10 gap-6 items-center container">
          <div className="md:space-y-10 space-y-6 self-start">
            <div className="p-6 font-bold md:text-3xl text-2xl rounded-md from-[#ffd174] bg-gradient-to-r">
              <p>Welcome to the New Education Standard Award Nigeria (NESA) 2023 Award Dinner Ceremony Page!</p>
            </div>
            <div className="p-6 from-[#d5ff7c] to-[#f3ffd8] bg-gradient-to-r rounded-md">
              <p>
                This year, we celebrate a milestone in educational transformation with the NESA 2023 Award Dinner, an
                evening dedicated to honoring the champions of education in Nigeria. Our prestigious event recognizes
                the hard work, innovation, and dedication of individuals, organizations, and institutions that have
                significantly contributed to advancing educational excellence across the nation.
              </p>
            </div>
          </div>
          <div className="md:min-h-[30rem] min-h-[25rem] relative overflow-hidden rounded-md w-full">
            <Image
              src={"/images/bg/award-dinner.jpg"}
              alt="award dinner"
              className="w-full h-full object-cover absolute top-0 left-0"
              width={800}
              height={800}
            />
          </div>
        </div>

        <section className="relative">
          <Image
            src={"/images/bg/timeline.png"}
            alt="dark background"
            className="w-full h-full object-cover -z-[1] absolute top-0 left-0"
            width={1440}
            height={1580}
          />

          <div className="container py-10 text-white">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="_under_border font-bold">Sponsorship Categories:</p>
                <h3 className="font-extrabold md:text-4xl text-3xl text-deepGold">
                  Be Part of a Noble Cause: Sponsorship Opportunities
                </h3>
                <p className="md:text-lg">
                  NESA 2023 offers a unique platform for sponsors to showcase their commitment to education, one of the
                  most vital sectors for national development. Aligning with NESA means associating your brand with the
                  noble cause of uplifting education in Nigeria. We invite you to explore our diverse sponsorship
                  categories, designed to provide maximum visibility and impact.
                </p>
              </div>

              <div className="grid md:grid-cols-3 sm:grid-cols-2 md:gap-12 gap-6 text-black">
                {sponsors.map((sponsor, id) => (
                  <div
                    key={id}
                    onClick={showModalClick}
                    className="min-h-[25rem] bg-gradient-to-bl from-[#ee9e1a] via-[#f6b030] to-deepGold rounded-lg py-20 px-10 space-y-4"
                  >
                    <p className="font-bold text-2xl">{sponsor.title}</p>
                    <p>{sponsor.description}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <p className="font-extrabold md:text-4xl text-3xl text-deepGold">Additional Opportunities includes:</p>
                <div className="grid md:grid-cols-3 sm:grid-cols-2 md:gap-12 gap-6 text-black">
                  {additionalOpportunities.map((oppor, id) => (
                    <div
                      key={id}
                      className="min-h-[25rem] bg-gradient-to-bl bg-[#cfcfce] rounded-lg py-20 px-10 space-y-4"
                    >
                      <p className="font-bold text-2xl">{oppor.title}</p>
                      <p>{oppor.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="my-16 grid md:grid-cols-3 gap-10 items-center container">
          <div className="space-y-8 text-center">
            {benefits.map((benefit, id) => (
              <div key={id} className="space-y-4">
                <p className="font-bold text-xl">{benefit.title}</p>
                <p className="text-zinc-700">{benefit.description}</p>
              </div>
            ))}
          </div>
          <div className="md:col-span-2 max-h-[40rem] overflow-hidden">
            <Image
              src={"/images/bg/award-dinner.jpg"}
              alt="award dinner"
              className="w-full h-full object-cover"
              width={400}
              height={800}
            />
          </div>
        </div>

        <div className="grid place-content-center mb-10">
          <div>
            <Link
              href={"/join-us"}
              target="_blank"
              className="text-blue-400 font-medium text-lg flex items-center gap-2"
            >
              <span>Join Us</span>
              <ExternalLink />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;