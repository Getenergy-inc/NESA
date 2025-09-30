"use client";
import { useState } from "react";
import EnhancedHero from "./EnhancedHero";

const HomeHeader = () => {
  // Using the new EnhancedHero component which contains all the hero section logic
  return (
    <EnhancedHero />
  );
};

export default HomeHeader;
