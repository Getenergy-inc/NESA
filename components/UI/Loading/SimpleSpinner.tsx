"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface SimpleSpinnerProps {
  size?: number;
  className?: string;
}

const SimpleSpinner: React.FC<SimpleSpinnerProps> = ({
  size = 40,
  className = ""
}) => {
  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 2,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      <Image
        src="/images/nesa-mg.png"
        alt="Loading"
        width={size}
        height={size}
        className="object-contain"
      />
    </motion.div>
  );
};

export default SimpleSpinner;
