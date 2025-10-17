"use client";
import AboutNewEducation from "@/components/UI/Home/about-new";
import Timeline from "@/components/UI/Home/timeline";
import HomeFaq from "@/components/UI/Home/faq";
import HomeHeader from "@/components/UI/Home/header";
import HomePartners from "@/components/UI/Home/partners";
import Judges from "@/components/UI/Home/judges";
import GetInvolved from "@/components/UI/Home/get-involved";
import AwardCategories from "@/components/UI/Home/Award-categories";
import Whynominate from "@/components/UI/categorynominate/whynominate";
import HowToNominate from "@/components/UI/categorynominate/howtonominate";
import Category from "@/components/UI/categorynominate/nominatecategories";
import CountdownTimer from "@/components/Common/Others/countdown";
import CategoryHeader from "@/components/UI/Categories/categories-header";
import PlatinumOverview from "@/components/UI/categorynominate/PlatinumOverview";
import PlatinumAwards from "@/components/UI/nomination/PlatinumAwards";
import NonCompetitiveAwards from "@/components/UI/nomination/NonCompetitiveAwards";
import NonCompetitiveGetInvolve from "@/components/UI/nomination/NonCompetitveGetInvolve";

const Page = () => {
  const handleTimeUpdate = (time: {
    days: number;
    hours: number;
    minutes: number;
  }) => {
    // Handle time update if needed
    console.log("Time updated:", time);
  };

  const SingleData = [
    {
      title: "Best Library in Nigerian Tertiary Institutions",
      description:
        "This award is established to recognize and honor libraries in Nigerian tertiary institutions that demonstrate excellence in providing access to information, fostering a culture of reading and research, and supporting academic success.",
      subCategoryPath: "/nomination/sub-categories/best-library",
    },
    {
      title:
        "Best Research and Development Contribution by Research Institutes (Nigeria)",
      description:
        "This award aims to recognize and honor research institutes in Nigeria that have made significant contributions to the educational sector through innovative research and development (R&D) initiatives.",
      subCategoryPath: "/nomination/sub-categories/best-research-development",
    },
    {
      title: "Christian Faith-Based Education Champions ",
      description:
        "The Africa Lifetime Education Icon Special Recognition Award is the pinnacle of the NESA-Africa awards and the Santos Creations Educational Foundation. Envisioned as the Africa education advocacy Nobel award recognition.",
      subCategoryPath:
        "/nomination/sub-categories/christian-education-champion",
    },
    {
      title: "Islamic Faith-Based Education Champions ",
      description:
        "The Africa Lifetime Education Icon Special Recognition Award is the pinnacle of the NESA-Africa awards and the Santos Creations Educational Foundation. Envisioned as the Africa education advocacy Nobel award recognition.",
      subCategoryPath: "/nomination/sub-categories/islamic-education-champion",
    },
    {
      title: "Best Political Leaders Educational Support Services",
      description:
        "Recognizing philanthropy and leadership contributions for their outstanding contributions to education.",
      subCategoryPath: "nomination/sub-categories/best-political-leader",
    },
  ];
  const RegionalData = [
    {
      title: "Diaspora Association Educational Impact Award",
      description:
        "Celebrates NGOs that have made significant improvements in educational access, quality, and innovation from 2013-2024.",
      subCategoryPath: "nomination/sub-categories/africa-diaspora-impact",
    },
  ];

  const title = "Categories in the Non-Competitive Categories";

  return (
    <>
      {/* Enhanced Non-Competitive Awards Section */}
      <NonCompetitiveAwards />
      {/* <CategoryHeader categoryData={categoryData} type="non-competitive" /> */}
      <main>
        {/* <CountdownTimer
          onTimeUpdate={handleTimeUpdate}
          targetDateProp="2025-09-10T19:55:00Z"
        /> */}
        <Category SingleData={SingleData} RegionalData={RegionalData} />
        <NonCompetitiveGetInvolve />
      </main>
    </>
  );
};

export default Page;
