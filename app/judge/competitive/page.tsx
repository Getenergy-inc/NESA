'use client'
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

const Page = () => {
  const categoryData = [
    {
      title: "Best Media Organization in Educational Advocacy (Nigeria)",
      description: "Recognize the most outstanding educational technology companies that have made significant contributions to advancing education through technol..",
      subCategoryPath: "/nomination/sub-categories/best-media-organization"
    },
    {
      title: "Best Corporate Social Responsibility (CSR) in Education (Africa - Regional)",
      description: "Honors exceptional international award programs for international collaborations and contributions to Nigeria educational development.",
      subCategoryPath: "/nomination/sub-categories/best-csr-education"
    },
    {
      title: "Best NGO Contribution to Achieving Education for All (Africa - Regional)",
      description: "We recognize research institutes for their exceptional contributions and excellence to educational research and development in Nigeria, shaping future educational strategies.",
      subCategoryPath: "/nomination/sub-categories/best-ngo-contribution"
    },
    {
      title: "Creative Arts Industry Contribution to Education (Nigeria)",
      description: "Recognizing effort towards achieving sustainable development goal 4, for dedication to achieving quality education under SDG 4, elevating",
      subCategoryPath: "/nomination/sub-categories/creative-arts-contribution"
    },
    {
      title: "Best EduTech Organization (Africa)",
      description: "Recognizing philanthropy and leadership contributions for their outstanding contributions to education.",
      subCategoryPath: "/sub-categories/best-edutech-organization"
    },
    {
      title: "Best NGO Contribution to Education (Nigeria)",
      description: "Celebrates NGOs that have made significant improvements in educational access, quality, and innovation from 2013-2024.",
      subCategoryPath: "/nomination/sub-categories/best-ngo-contribution"
    },
    {
      title: "Best CSR in Education (Nigeria)",
      description: "Celebrates NGOs that have made significant improvements in educational access, quality, and innovation from 2013-2024.",
      subCategoryPath: "/sub-categories/best-csr-education"
    },
    {
      title: "African education CSR Awards (Banking, Telecom, Healthcare, Media, etc.)",
      description: "Celebrates NGOs that have made significant improvements in educational access, quality, and innovation from 2013-2024.",
      subCategoryPath: "/nomination/sub-categories/best-csr-education"
    }
    
  ];
  
  
  const title = "Categories in the Competitive Categories"
  return (
    <>

          <main className="py-20">

        <Category categoryData={categoryData} head ={title} />
      </main>
    </>
  );
};

export default Page;
