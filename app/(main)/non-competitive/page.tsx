'use client'
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


const Page = () => {
  const handleTimeUpdate = (time: { days: number; hours: number; minutes: number }) => {
    // Handle time update if needed
    console.log('Time updated:', time);
  };

  const categoryData = [
    {
      title: "Best Educational-Friendly State in Nigeria",
      description: "Awards the tertiary institution that stands out in academic excellence, community engagement, and student support with Library facilities ICT infastructure.",
      subCategoryPath: "/nomination/sub-categories/best-educational-state",
      backgroundImage: "/images/categories/state.jpg"
    },
    {
      title: "Best Tertiary Library in Nigeria",
      description: "This award is established to recognize and honor libraries in Nigerian tertiary institutions that demonstrate excellence in providing access to information, fostering a culture of reading and research, and supporting academic success. This award celebrates libraries that have implemented innovative services, resources, and programs to enhance the educational experience of students and staff.",
      subCategoryPath: "/nomination/sub-categories/best-library",
      backgroundImage: "/images/categories/library.jpg"
    },
    {
      title: "Best Research & Development Institution (Nigeria)",
      description: "This award aims to recognize and honor research institutes in Nigeria that have made significant contributions to the educational sector through innovative research and development (R&D) initiatives. This award celebrates institutes that have demonstrated excellence in conducting impactful research, developing educational technologies, and implementing projects that enhance educational quality and accessibility.",
      subCategoryPath: "/nomination/sub-categories/best-research-development",
      backgroundImage: "/images/categories/research.jpg"
    },
    {
      title: "Africa Lifetime Education Icon Recognition",
      description: "The Africa Lifetime Education Icon Special Recognition Award is the pinnacle of the NESA-Africa awards and the Santos Creations Educational Foundation. Envisioned as the Africa education advocacy Nobel award recognition, this prestigious accolade honors individuals from around the world who have dedicated their lives to advancing sustainable education for all in Africa, aligning with the United Nations Sustainable Development Goal 4 (SDG 4) - Quality Education.",
      subCategoryPath: "/nomination/sub-categories/africa-lifetime-education-icon",
      backgroundImage: "/images/categories/lifetime.jpg"
    },
    {
      title: "Faith-Based & Political Leadership Awards-Christian Education Champions",
      description: "The Africa Lifetime Education Icon Special Recognition Award is the pinnacle of the NESA-Africa awards and the Santos Creations Educational Foundation. Envisioned as the Africa education advocacy Nobel award recognition, this prestigious accolade honors individuals from around the world who have dedicated their lives to advancing sustainable education for all in Africa, aligning with the United Nations Sustainable Development Goal 4 (SDG 4) - Quality Education.",
      subCategoryPath: "/nomination/sub-categories/christian-education-champion",
      backgroundImage: "/images/categories/christian.jpg"
    },
    {
      title: "Faith-Based & Political Leadership Awards-Islamic Education Champions",
      description: "The Africa Lifetime Education Icon Special Recognition Award is the pinnacle of the NESA-Africa awards and the Santos Creations Educational Foundation. Envisioned as the Africa education advocacy Nobel award recognition, this prestigious accolade honors individuals from around the world who have dedicated their lives to advancing sustainable education for all in Africa, aligning with the United Nations Sustainable Development Goal 4 (SDG 4) - Quality Education.",
      subCategoryPath: "/nomination/sub-categories/islamic-education-champion",
      backgroundImage: "/images/categories/islamic.jpg"
    },
    {
      title: "Political Support for Education (Governors/Ministers)",
      description: "Recognizing philanthropy and leadership contributions for their outstanding contributions to education.",
      subCategoryPath: "nomination/sub-categories/best-political-leader",
      backgroundImage: "/images/categories/political.jpg"
    },
  
    {
      title: "Diaspora Association Educational Impact Award404",
      description: "Celebrates NGOs that have made significant improvements in educational access, quality, and innovation from 2013-2024.",
      subCategoryPath: "/nomination/sub-categories/africa-diaspora-impact",
      backgroundImage: "/images/categories/diaspora.jpg"
    },
    
  ];
  
  const title = "Categories in the Non-Competitive Categories"
  

  return (
    <>
      <CategoryHeader categoryData={categoryData} type="non-competitive" />
      <main className="pb-8">
        {/* <CountdownTimer
          onTimeUpdate={handleTimeUpdate}
          targetDateProp="2025-09-10T19:55:00Z"
        /> */}
        <Category categoryData={categoryData} head={title} />
        {/* Enhanced Non-Competitive Awards Section */}
        <NonCompetitiveAwards />

        {/* <PlatinumOverview /> */}
        <Whynominate />
        <HowToNominate />
        
      </main>
    </>
  );
};

export default Page;
