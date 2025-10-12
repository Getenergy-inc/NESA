"use client";
import Whynominate from "@/components/UI/categorynominate/whynominate";
import Timeline from "@/components/UI/Home/timeline";
import HomeFaq from "@/components/UI/Home/faq";
import HomeHeader from "@/components/UI/Home/header";
import HomePartners from "@/components/UI/Home/partners";
import Judges from "@/components/UI/Home/judges";
import GetInvolved from "@/components/UI/Home/get-involved";
import AwardCategories from "@/components/UI/Home/Award-categories";
import CategoryHeader from "@/components/UI/Categories/categories-header";
import HowToNominate from "@/components/UI/categorynominate/howtonominate";
import Category from "@/components/UI/categorynominate/nominatecategories";
import CountdownTimer from "@/components/Common/Others/countdown";
import CompetitiveCategoriesOverview from "@/components/UI/categorynominate/CompetitiveCategoriesOverview";
import CompetitiveAwards from "@/components/UI/nomination/CompetitiveAwards";
import CompetitveGetInvolve from "@/components/UI/nomination/CompetitveGetInvolve";

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
      title: "Best Media Organization in Educational Advocacy (Nigeria)",
      description:
        "Recognize the most outstanding educational technology companies that have made significant contributions to advancing education through technol..",
      subCategoryPath: "/nomination/sub-categories/best-media-organization",
    },
    {
      title: "Creative Arts Industry Contribution to Education (Nigeria)",
      description:
        "Recognizing effort towards achieving sustainable development goal 4, for dedication to achieving quality education under SDG 4, elevating",
      subCategoryPath: "/nomination/sub-categories/creative-arts-contribution",
    },
    {
      title: "Best NGO Contribution to Education (Nigeria)",
      description:
        "Celebrates NGOs that have made significant improvements in educational access, quality, and innovation from 2013-2024.",
      subCategoryPath: "/nomination/sub-categories/nigeria-ngo",
    },
    {
      title: "Best CSR in Education Nigeria",
      description:
        "Celebrates NGOs that have made significant improvements in educational access, quality, and innovation from 2013-2024.",
      subCategoryPath: "/nomination/sub-categories/csr-education-africa",
    },
  ];
  const RegionalData = [
    {
      title: "Best CSR in Education (Africa – Regional)",
      description:
        "Honors exceptional international award programs for international collaborations and contributions to Nigeria educational development.",
      subCategoryPath: `/nominees?category=Best Africa Regional Companies CSR for Education Special Recognition Award in Africa 2024`,
    },
    {
      title: "Best NGO Contribution to Achieving Education (Africa-Regional)",
      description:
        "We recognize research institutes for their exceptional contributions and excellence to educational research and development in Nigeria, shaping future educational strategies.",
      subCategoryPath: `/nominees?category=Best NGO Education Support Recognition Award (Africa-Regional)`,
    },
    {
      title: "Best EduTech Organization in Africa (Africa-Regional)",
      description:
        "Recognizing philanthropy and leadership contributions for their outstanding contributions to education.",
      subCategoryPath: `/nominees?category=Best EduTech Organization in Nigeria and Africa 2024`,
    },
    {
      title: "Best STEM Education Program or Project (Africa-Regional)",
      description:
        "Celebrates NGOs that have made significant improvements in educational access, quality, and innovation from 2013-2024.",
      subCategoryPath: `/nominees?category=Support for education in STEM in Nigeria`,
    },
  ];

  const title = "Categories in the Competitive Categories";
  return (
    <>
      <CompetitiveAwards />

      {/* <CategoryHeader categoryData={categoryData} /> */}

      <main>
        {/* <CountdownTimer
          onTimeUpdate={handleTimeUpdate}
          targetDateProp="2025-09-10T19:55:00Z"
        /> */}
        <Category SingleData={SingleData} RegionalData={RegionalData} />
        {/* Enhanced Competitive Awards Section */}

        {/* <CompetitiveCategoriesOverview /> */}
        <CompetitveGetInvolve />
      </main>
    </>
  );
};

export default Page;
