/**
 * Animation utility functions for enhanced UI components
 */

import { Variants } from "framer-motion";

/**
 * Creates staggered animation variants for container elements
 * @param staggerChildren Delay between child animations
 * @param delayChildren Initial delay before starting animations
 * @returns Framer Motion variants object
 */
export const createStaggerContainer = (
  staggerChildren = 0.1,
  delayChildren = 0.2
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

/**
 * Creates fade-in animation variants for child elements
 * @param direction Direction of the animation ("up" | "down" | "left" | "right")
 * @param distance Distance to travel in pixels
 * @param duration Animation duration in seconds
 * @returns Framer Motion variants object
 */
export const createFadeInVariant = (
  direction: "up" | "down" | "left" | "right" = "up",
  distance = 20,
  duration = 0.6
): Variants => {
  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  return {
    hidden: { opacity: 0, ...directionMap[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };
};

/**
 * Creates button animation variants with hover and tap effects
 * @param scale Scale factor for hover effect
 * @param yOffset Y-axis offset for hover effect
 * @returns Framer Motion variants object
 */
export const createButtonVariants = (scale = 1.05, yOffset = -5): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hover: {
    scale,
    y: yOffset,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.95,
  },
});

/**
 * Creates a bounce animation variant for UI elements
 * @param amplitude Bounce amplitude in pixels
 * @param duration Animation duration in seconds
 * @returns Framer Motion variants object
 */
export const createBounceVariant = (amplitude = 10, duration = 1.5): Variants => ({
  initial: { y: 0 },
  animate: {
    y: [0, amplitude, 0],
    transition: {
      repeat: Infinity,
      duration,
      ease: "easeInOut",
    },
  },
});

/**
 * Creates a pulse animation variant for UI elements
 * @param minScale Minimum scale value
 * @param maxScale Maximum scale value
 * @param duration Animation duration in seconds
 * @returns Framer Motion variants object
 */
export const createPulseVariant = (
  minScale = 0.95,
  maxScale = 1.05,
  duration = 2
): Variants => ({
  initial: { scale: 1 },
  animate: {
    scale: [1, maxScale, minScale, 1],
    transition: {
      repeat: Infinity,
      duration,
      ease: "easeInOut",
    },
  },
});

/**
 * Creates a reveal text animation variant
 * @param delay Animation delay in seconds
 * @param duration Animation duration in seconds
 * @returns Framer Motion variants object
 */
export const createRevealTextVariant = (delay = 0, duration = 0.8): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

/**
 * Creates a parallax scroll animation variant
 * @param scrollSpeed Scroll speed multiplier (higher = faster)
 * @returns Framer Motion variants object for use with useTransform
 */
export const createParallaxVariant = (scrollSpeed = 0.3) => {
  return {
    initial: { y: 0 },
    scroll: (scrollY: number) => ({
      y: scrollY * scrollSpeed,
    }),
  };
};