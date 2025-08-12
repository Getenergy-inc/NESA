import { useState } from "react";
import toast from "react-hot-toast";
import { step1Variant, step2Variant } from "@/components/Common/Others/get-involved";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/lib/store/modal";

const SponsorshipModalContent = () => {
  const [step, setStep] = useState(1);

  const router = useRouter();

  const { hideModal } = useModal();
  const handleNext = () => {
    if (step < 2) {
      setStep((prev) => prev + 1);
      return;
    }

    toast.success("Submitted Successfully 🎉");
    hideModal();
    router.replace("/");
  };

  const renderForm = (): JSX.Element | null => {
    switch (step) {
      case 1:
        return (
          <motion.div {...step1Variant} className="space-y-4 max-h-[40rem] overflow-y-auto" key={"step-1"}>
            <div className="p-1">
              <p className="font-bold text-xl text-midGold">Partner with us</p>
              <p className="text-sm text-zinc-600">Fill in the required details and get to partner with us</p>
            </div>
            <div className="space-y-1">
              <label htmlFor="fullName" className="font-medium text-sm">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                className="w-full outline-none p-2 rounded-md border border-zinc-300"
                placeholder="John"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="company" className="font-medium text-sm">
                Company Name (if any)
              </label>
              <input
                type="text"
                name="company"
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
              <label htmlFor="country" className="font-medium text-sm">
                Country
              </label>
              <select name="country" className="w-full outline-none p-2 rounded-md border border-zinc-300">
                <option value="nigeria">Nigeria</option>
              </select>
            </div>
            <div className="space-y-1">
              <label htmlFor="areaOfSponsorship" className="font-medium text-sm">
                Area of Sponsorship
              </label>
              <select name="country" className="w-full outline-none p-2 rounded-md border border-zinc-300">
                <option value="nigeria">Option1</option>
                <option value="nigeria">Option2</option>
              </select>
            </div>

            <button className="w-full text-darkGold py-2 bg-deepGold rounded-lg" onClick={handleNext}>
              Submit
            </button>
          </motion.div>
        );
      case 2:
        return (
          <motion.div {...step2Variant} className="space-y-4 max-h-[40rem] overflow-y-auto" key={"step-2"}>
            <div className="text-center space-y-3">
              <p className="text-lg text-midGold font-bold">Thanks for been part of a Noble Cause!</p>
              <p className="text-sm max-w-md mx-auto text-zinc-500">
                Your response has been recorded and the Sponsorship Team would reach out to you soon
              </p>
              <button className="w-full text-darkGold py-2 bg-deepGold rounded-lg" onClick={handleNext}>
                Back to Home
              </button>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-40 rounded-lg px-5 py-8 md:min-w-[30rem] max-h-[40rem] overflow-y-auto overflow-x-hidden">
      <div className="space-y-4 max-h-[40rem] overflow-y-auto">
        <AnimatePresence mode="wait" initial={false}>
          {renderForm()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SponsorshipModalContent;
