"use client";
import { useModal } from "@/lib/store/modal";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";

const transition = { duration: 0.1, ease: "easeInOut" };

export const step1Variant = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { ...transition, delay: 1 },
  },
  exit: { opacity: 0 },
};

export const step2Variant = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition,
  },
  exit: { opacity: 0 },
};

const GetInvolvedModalContent = () => {
  const [step, setStep] = useState(1);

  const { hideModal } = useModal();
  const handleNext = () => {
    if (step < 2) {
      setStep((prev) => prev + 1);
      return;
    }

    toast.success("Submitted Successfully 🎉");
    hideModal();
  };

  const renderForm = (): JSX.Element | null => {
    switch (step) {
      case 1:
        return (
          <motion.div {...step1Variant} className="space-y-4 max-h-[40rem] overflow-y-auto" key={"step-1"}>
            <div className="space-y-1">
              <label htmlFor="firstName" className="font-medium text-sm">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className="w-full outline-none p-2 rounded-md border border-zinc-300"
                placeholder="John"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="lastName" className="font-medium text-sm">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                className="w-full outline-none p-2 rounded-md border border-zinc-300"
                placeholder="Doe"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="font-medium text-sm">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="w-full outline-none p-2 rounded-md border border-zinc-300"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="phoneNumber" className="font-medium text-sm">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                className="w-full outline-none p-2 rounded-md border border-zinc-300"
                placeholder="+234 901223456789"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="website" className="font-medium text-sm">
                Website
              </label>
              <input
                type="text"
                name="website"
                className="w-full outline-none p-2 rounded-md border border-zinc-300"
                placeholder="example.com"
              />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div {...step2Variant} className="space-y-4 max-h-[40rem] overflow-y-auto" key={"step-2"}>
            <div className="space-y-1">
              <label htmlFor="company" className="font-medium text-sm">
                Company
              </label>
              <input
                type="text"
                name="company"
                className="w-full outline-none p-2 rounded-md border border-zinc-300"
                placeholder="Shell"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="type" className="font-medium text-sm">
                Type of Business
              </label>
              <input
                type="text"
                name="type"
                className="w-full outline-none p-2 rounded-md border border-zinc-300"
                placeholder="Media Company"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="country" className="font-medium text-sm">
                Country
              </label>
              <input
                type="text"
                name="country"
                className="w-full outline-none p-2 rounded-md border border-zinc-300"
                placeholder="+234 901223456789"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="offer" className="font-medium text-sm">
                Partnership Offer
              </label>
              <input
                type="text"
                name="offer"
                className="w-full outline-none p-2 rounded-md border border-zinc-300"
                placeholder="example.com"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="source" className="font-medium text-sm">
                How did you hear about us?
              </label>
              <select name="source" className="w-full outline-none p-3 text-sm rounded-md border border-zinc-300">
                <option value="instagram">Instagram</option>
                <option value="twitter">Others</option>
              </select>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-40 rounded-lg px-5 py-8 md:min-w-[30rem] overflow-hidden">
      <div className="space-y-4 max-h-[40rem] overflow-y-auto">
        <div className="p-1">
          <p className="font-bold text-xl text-midGold">Partner with us</p>
          <p className="text-sm text-zinc-600">Fill in the required details and get to partner with us</p>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {renderForm()}
        </AnimatePresence>

        <button className="w-full text-darkGold py-2 bg-deepGold rounded-lg" onClick={handleNext}>
          {step < 2 ? "Next" : "Submit"}
        </button>
      </div>
    </div>
  );
};

const GetInvolved = () => {
  const { showModal, visible, hideModal } = useModal();
  const partnerWithUsClickHandler = () => showModal(<GetInvolvedModalContent />, "info"); // Pass both content and type

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        {visible && <Modal visible={visible} key={"modal-"} onClose={hideModal} />}
      </AnimatePresence>

      <div
        className="container text-center bg-darkBrown text-white md:rounded-2xl rounded-md space-y-4 md:px-12 py-16"
        id="get-involved"
      >
        <p className="md:text-lg uppercase">How to get Involved</p>
        <p className="md:text-5xl sm:text-4xl text-3xl text-center mx-auto px-10 font-semibold">
          Recognizing players who contributed to the growth of the Nigerian education sector and fostering innovations
        </p>
        <div className="pt-6">
          <div className="flex items-center flex-wrap gap-6 justify-center">
            <button
              className="flex-shrink-0 self-start w-fit px-5 text-sm font-semibold py-3 rounded-md text-black"
              style={{ background: `linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)` }}
              onClick={partnerWithUsClickHandler}
            >
              Partner With Us
            </button>
            <button className="flex group items-center px-5 text-sm font-semibold py-3 gap-3 rounded-md border border-white">
              <span>Sponsor an Award</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 duration-200" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetInvolved;