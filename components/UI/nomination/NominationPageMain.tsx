"use client";
import { useState } from "react";
import NominationHeader from "./NominationHeader";
import AwardTypesFilter from "./AwardTypesFilter";
import BlueGarnetLifetimeAwards from "./BlueGarnetLifetimeAwards";
import CompetitiveAwards from "./CompetitiveAwards";
import PlatinumAwards from "./PlatinumAwards";
import AGCRewardsSection from "./AGCRewardsSection";
import CertificateRules from "./CertificateRules";
import ActionButtons from "./ActionButtons";
import NominationFAQ from "./NominationFAQ";

const NominationPageMain = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const shouldShowSection = (sectionType: string) => {
    if (activeFilter === "all") return true;
    return activeFilter === sectionType;
  };

  return (
    <div className="nomination-page-main">
      {/* Header Section */}
      <NominationHeader />
      
      {/* Award Types Filter */}
      <AwardTypesFilter 
        onFilterChange={handleFilterChange} 
        activeFilter={activeFilter} 
      />
      
      {/* Award Sections - Conditionally Rendered Based on Filter */}
      {shouldShowSection("lifetime") && <BlueGarnetLifetimeAwards />}
      {shouldShowSection("competitive") && <CompetitiveAwards />}
      {shouldShowSection("platinum") && <PlatinumAwards />}
      
      {/* Always Show These Sections */}
      <AGCRewardsSection />
      <CertificateRules />
      <ActionButtons />
      <NominationFAQ />
    </div>
  );
};

export default NominationPageMain;