'use client'
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

const Page = () => {
  const categoryData = [
    {
      title: "Best Educational-Friendly State (Nigeria by Zone)",
      description: "Awards the tertiary institution that stands out in academic excellence, community engagement, and student support with Library facilities ICT infastructure.",
      subCategoryPath: "/nomination/sub-categories/best-educational-state"
    },
    {
      title: "Best Library in Nigerian Tertiary Institutions",
      description: "This award is established to recognize and honor libraries in Nigerian tertiary institutions that demonstrate excellence in providing access to information, fostering a culture of reading and research, and supporting academic success. This award celebrates libraries that have implemented innovative services, resources, and programs to enhance the educational experience of students and staff.",
      subCategoryPath: "/nomination/sub-categories/best-library"
    },
    {
      title: "Best Research Institutions in Nigeria",
      description: "This award aims to recognize and honor research institutes in Nigeria that have made significant contributions to the educational sector through innovative research and development (R&D) initiatives. This award celebrates institutes that have demonstrated excellence in conducting impactful research, developing educational technologies, and implementing projects that enhance educational quality and accessibility.",
      subCategoryPath: "/nomination/sub-categories/best-research-development"
    },
    {
      title: "Africa Lifetime Education Icon Recognition",
      description: "The Africa Lifetime Education Icon Special Recognition Award is the pinnacle of the NESA-Africa awards and the Santos Creations Educational Foundation. Envisioned as the Africa education advocacy Nobel award recognition, this prestigious accolade honors individuals from around the world who have dedicated their lives to advancing sustainable education for all in Africa, aligning with the United Nations Sustainable Development Goal 4 (SDG 4) - Quality Education.",
      subCategoryPath: "/nomination/sub-categories/africa-lifetime-education-icon"
    },
    {
      title: "Best Faith-Based Organization in Education404",
      description: "The Africa Lifetime Education Icon Special Recognition Award is the pinnacle of the NESA-Africa awards and the Santos Creations Educational Foundation. Envisioned as the Africa education advocacy Nobel award recognition, this prestigious accolade honors individuals from around the world who have dedicated their lives to advancing sustainable education for all in Africa, aligning with the United Nations Sustainable Development Goal 4 (SDG 4) - Quality Education.",
      subCategoryPath: "/nomination/sub-categories/404"
    },
    {
      title: "Best Political Leaders' Educational Support Services",
      description: "Recognizing philanthropy and leadership contributions for their outstanding contributions to education.",
      subCategoryPath: "nomination/sub-categories/best-political-leader"
    },
    {
      title: "Best STEM Education Champion404",
      description: "Celebrates NGOs that have made significant improvements in educational access, quality, and innovation from 2013-2024.",
      subCategoryPath: "/nomination/sub-categories/best-edutech-organization"
    },
    {
      title: "Diaspora Education Impact Awards404",
      description: "Celebrates NGOs that have made significant improvements in educational access, quality, and innovation from 2013-2024.",
      subCategoryPath: "nomination/sub-categories/best-educational-state"
    },
    {
      title: "Best International & Bilateral Contributors to Education404",
      description: "Celebrates NGOs that have made significant improvements in educational access, quality, and innovation from 2013-2024.",
      subCategoryPath: "/nomination/sub-categories/404"
    },
    {
      title: "Diaspora Contributions to Education in Africa404",
      description: "diaspora place holder",
      subCategoryPath: "/nomination/sub-categories/404"
    },
    {
      title: "Best Corporate Social Responsibility (CSR) in Education (Nigeria)",
      description: "Celebrates NGOs that have made significant improvements in educational access, quality, and innovation from 2013-2024.",
      subCategoryPath: "/nomination/sub-categories/best-csr-education"
    },
    {
      title: "Best CSR in Education (Africa)",
      description: "Celebrates NGOs that have made significant improvements in educational access, quality, and innovation from 2013-2024.",
      subCategoryPath: "/nomination/sub-categories/best-csr-education"
    }
    
  ];
  
  const title = "Categories in the Non-Competitive Categories"
  

  return (
    <>
      {/* <NonCategoryHeader categoryData={categoryData} /> */}
      <main className="py-20">

      <Category categoryData={categoryData} head={title} />
      </main>
    </>
  );
};

export default Page;
