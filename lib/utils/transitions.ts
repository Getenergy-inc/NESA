import { Variants } from "framer-motion";

export const parentTrans: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1, type: "tween" } },
};

export const parentTransActivate = {
  animate: "animate",
  initial: "initial",
};

export const parentTransActivateInView = {
  initial: "initial",
  whileInView: "animate",
  viewport: { once: true },
};

export const opacityTrans: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fromLeft: Variants = {
  initial: { opacity: 0, x: "-10%" },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "-10%" },
};

export const fromRight: Variants = {
  initial: { opacity: 0, x: "10%" },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "10%" },
};

export const fromTop: Variants = {
  initial: { opacity: 0, y: "-10%" },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, y: "-10%" },
};

export const fromBottom: Variants = {
  initial: { opacity: 0, y: "10%" },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: "10%" },
};

// In View
export const opacityTransInView: Variants = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fromLeftInView: Variants = {
  initial: { opacity: 0, x: "-10%" },
  whileInView: { opacity: 1 },
  exit: { opacity: 0, x: "-10%" },
};

export const fromRightInView: Variants = {
  initial: { opacity: 0, x: "10%" },
  whileInView: { opacity: 1 },
  exit: { opacity: 0, x: "10%" },
};

export const fromTopInView: Variants = {
  initial: { opacity: 0, y: "-10%" },
  whileInView: { opacity: 1 },
  exit: { opacity: 0, y: "-10%" },
};

export const fromBottomInView: Variants = {
  initial: { opacity: 0, y: "10%" },
  whileInView: { opacity: 1 },
  exit: { opacity: 0, y: "10%" },
};
