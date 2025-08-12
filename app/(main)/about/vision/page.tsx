"use client";
import React from "react";
import VisionHeader from "@/components/UI/About/Vision/VisionHeader";
import MissionVision from "@/components/UI/About/Vision/MissionVision";
import StrategicAlignment from "@/components/UI/About/Vision/StrategicAlignment";
import SmartGoals from "@/components/UI/About/Vision/SmartGoals";
import AwardStructure from "@/components/UI/About/Vision/AwardStructure";
import SocialImpact from "@/components/UI/About/Vision/SocialImpact";
import RoadmapTimeline from "@/components/UI/About/Vision/RoadmapTimeline";
import CallToAction from "@/components/UI/About/Vision/CallToAction";

const VisionPage = () => {
  return (
    <>
      <VisionHeader />
      <MissionVision />
      <StrategicAlignment />
      <SmartGoals />
      <AwardStructure />
      <SocialImpact />
      <RoadmapTimeline />
      <CallToAction />
    </>
  );
};

export default VisionPage;