"use client";
import AboutHeader from "@/components/UI/About/header";
import Button from "@/components/Common/Button";
import { panel } from "@/lib/data/about";
import { allCategories } from "@/lib/data/category";
import useSlider from "@/lib/hooks/useSlider";
import NESAAfrica from '@/components/UI/About/nesamv';
import WhatWeDo from '@/components/UI/About/whydowe';
import TeamSection from '@/components/UI/About/executivevolunteer';
import DonationCard from '@/components/UI/About/donationcard';
import NesaJourney from '@/components/UI/About/nesajourney';
 



import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Linkedin,
} from "lucide-react";
import Image from "next/image";

const Page = () => {
  const { sliderRef: ref, moveLeft, moveRight } = useSlider();
  const { sliderRef: ref2, moveLeft: ml2, moveRight: mr2 } = useSlider();

  return (
    <>
      <AboutHeader />
      <NESAAfrica />
      <NesaJourney />
      <WhatWeDo />
      <TeamSection />
      <DonationCard />



    </>
  );
};

export default Page;
