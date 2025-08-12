import type { Variants } from "framer-motion";

export const transition = { ease: "easeInOut", duration: 0.3 };

export const parentV: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.3 } },
  exit: { opacity: 0 },
};

export const opacityV: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition },
  exit: { opacity: 0 },
};

export const toBottomV: Variants = {
  initial: { opacity: 0, y: "-5%" },
  animate: { opacity: 1, y: 0, transition },
  exit: { opacity: 0, y: "-5%" },
};

export const toTopV: Variants = {
  initial: { opacity: 0, y: "5%" },
  animate: { opacity: 1, y: 0, transition },
  exit: { opacity: 0, y: "5%" },
};

export const scaleV: Variants = {
  initial: { scale: 0 },
  animate: { scale: 1, transition },
  exit: { scale: 0 },
};
