"use client";
import React from "react";
import ConditionalLayout from "@/components/Layout/ConditionalLayout";
import HomeHeader from "@/components/UI/Home/header";
import HomePartners from "@/components/UI/Home/partners";
import Judges from "@/components/UI/Home/judges";
import AwardCategories from "@/components/UI/Home/Award-categories";
import MediaSection from "@/components/UI/Home/media-section";
import CountdownTimer from "@/components/Common/Others/countdown";

export default function HomePage() {
  const handleTimeUpdate = (time: { days: number; hours: number; minutes: number }) => {
    console.log('Time updated:', time);
  };

  return (
    <ConditionalLayout>
      <HomeHeader />
      <AwardCategories />
      <CountdownTimer
        onTimeUpdate={handleTimeUpdate}
        targetDateProp="2025-09-10T19:55:00Z"
      />
      <MediaSection />
      <Judges />
      <HomePartners />
    </ConditionalLayout>
  );
}