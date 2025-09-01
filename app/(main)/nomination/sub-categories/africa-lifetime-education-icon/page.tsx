"use client";

import React, { ReactNode, useState } from "react";
import Image from "next/image";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import NominationPage from "@/components/UI/nomination/nominate";
import { useRouter } from "next/navigation";

interface Category {
  title: string;
  description: ReactNode | string;
  image: string;
}

const SpecialRecognitionPage = () => {
  const overview = {
    title:
      "Africa Icon Blue Garnet Awards (Non-Competitive – Lifetime Impact, 2005–2025)",
    description: (
      <>
        <span className="block font-semibold text-lg mb-2">
          Do you know a leader whose work in education has changed lives across
          Africa and the world?
        </span>
        <span>
          The Africa Icon Blue Garnet Awards is NESA-Africa 2025’s highest-tier
          non-competitive honor, reserved for exceptional individuals across
          Africa and the diaspora who have demonstrated sustained,
          transformational impact on the continent’s education landscape from
          2005 to 2025.
        </span>
      </>
    ),
    image: "/images/member/childwriting.png",
  };

  const subcategories: Category[] = [
    // {
    //   title: "NGO contribution to the Special recognitions for contributions towards achieving SDG 4 - Quality Education in Nigeria",
    //   description: "The Africa Lifetime Education Icon Special Recognition Award is the pinnacle of the NESA-Africa awards and the Santos Creations Educational Foundation. Envisioned as the Africa education advocacy Nobel award recognition, this prestigious accolade honors individuals from around the world who have dedicated their lives to advancing sustainable education for all in Africa, aligning with the United Nations Sustainable Development Goal 4 (SDG 4) - Quality Education.",
    //   image: "/images/nesa-card2.png"
    // },
    {
      title:
        "Africa Icon Blue Garnet Awards (Non-Competitive – Lifetime Impact, 2005–2025)",
      description: (
        <>
          <span>
            <strong>Coverage & Representation:</strong>
            <br />
            • Africa & Diaspora – Honoring education icons from all five African
            regions (North, West, East, Central, and Southern Africa)
            <br />
            • Diaspora Africans – Recognizing Africans abroad who have
            contributed to Africa's educational development
            <br />• Friends of Africa – Honoring global allies, organizations,
            and leaders outside Africa who have supported Africa's journey
            toward Education for All
          </span>
        </>
      ),
      image: "/images/testimonies/world_map.png",
    },
    {
      title: "Africa Education Philanthropy Icon",
      description:
        "For philanthropists whose sustained contributions between 2005–2025 have transformed educational access, infrastructure, and opportunities across Africa.",
      image: "/images/africaicons/aliko-dangote.png",
    },
    {
      title: "Literary & New Curriculum Advocate",
      description:
        "For educators, authors, and reformers who have advanced curriculum modernization, cultural literacy, and learning innovation in line with Africa's evolving needs.",
      image: "/images/africaicons/chinua-achebe.png",
    },
    {
      title: "Africa Technical Educator Icon",
      description:
        "For champions of technical and vocational education whose work has strengthened Africa's workforce readiness and bridged the skills gap over the last two decades.",
      image: "/images/image1.png",
    },
  ];
  const slides = [overview, ...subcategories];
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const handleNominate = (category: Category) => {
      const description = typeof category.description === "string" 
      ? category.description 
      : category.title; // Use title as fallback if description is a ReactNode
    router.push(
      `/nominateform?type=${encodeURIComponent(
        "Africa Lifetime Education Icon Recognition"
      )}` +
        `&title=${encodeURIComponent(category.title)}` +
        `&description=${encodeURIComponent(description)}` +
        `&image=${encodeURIComponent(category.image)}`
    );
  };

  // const handleNominate = (category: Category) => {
  //   setSelectedCategory(category);
  // };

  // if (selectedCategory) {
  //   return <NominationPage type="Africa Lifetime Education Icon Recognition" category={selectedCategory}   />;
  // }

  return (
    <div className="min-h-screen bg-[#FFF5E0]">
      {/* Hero Section */}
      <div className="relative bg-[#191307] text-white py-24 px-8 h-[80vh]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-2xl mb-2 md:mt-16 text-center">Africa Icon</h2>
          <h1 className="text-3xl font-bold text-[#FFC247] mb-4 text-center">
            {slides[currentIndex].title}
          </h1>
          <p className="mb-8 text-center">
            {typeof slides[currentIndex].description === "string"
              ? slides[currentIndex].description
              : slides[currentIndex].description}
          </p>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="absolute bottom-4 left-4 flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-[#FFC247]" : "bg-white"
              }`}
            ></div>
          ))}
        </div>
        {/* Carousel Navigation Arrows */}
        <div className="absolute bottom-4 right-4 flex space-x-4">
          <button
            onClick={prevSlide}
            className="p-2 rounded transition bg-[#FFC247]"
          >
            <IoMdArrowBack size={24} color="#191307" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded transition bg-[#FFC247]"
          >
            <IoMdArrowForward size={24} color="#191307" />
          </button>
        </div>
      </div>
      {/* Sub-Categories Section */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 relative inline-block">
          Award Subcategories
          <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subcategories.map((category, index) => (
            <div
              key={index}
              className="bg-[#191307] rounded-3xl overflow-hidden shadow-lg transition-transform hover:scale-105 flex flex-col p-6"
            >
              <div className=" w-full h-[220px] flex items-center justify-center mb-4">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={category.image}
                    alt={category.title}
                    width={364}
                    height={198}
                  />
                </div>
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    {category.title}
                  </h3>
                  <div className="text-gray-300 text-sm mb-4">
                    {category.description}
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-auto">
                  <button
                    onClick={() =>
                      router.push(
                        `/nominees?category=${encodeURIComponent(
                          "Africa Lifetime Education Icon Special Recognition Award"
                        )}&subcategory=${encodeURIComponent(category.title)}`
                      )
                    }
                    className="w-full bg-transparent text-[#FFC247] py-2.5 rounded-lg hover:bg-[#33270E] transition-all duration-300 border-2 border-[#FFC247] font-medium tracking-wide flex items-center justify-center group"
                  >
                    <span className="mr-2 text-lg">👁️</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      See Existing Nominees
                    </span>
                  </button>
                  <button
                    onClick={() => handleNominate(category)}
                    className="w-full bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] py-2.5 rounded-lg hover:shadow-[0_0_15px_rgba(255,194,71,0.5)] transition-all duration-300 font-medium tracking-wide flex items-center justify-center group"
                  >
                    <span className="mr-2 text-lg">🏆</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      Nominate Now
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Award Philosophy & Overview Section */}
      <div className="bg-[#FFF5E0] py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Award Philosophy */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-4 relative inline-block text-[#191307]">
              Award Philosophy
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
            </h2>
            <p className="text-lg text-[#191307]">
              While many awards celebrate short-term excellence, the Africa
              Lifetime Education Icon Award seeks to immortalize educators,
              policy advocates, reformers, and champions whose impact has
              redefined access, equity, innovation, and resilience in African
              education.
            </p>
          </div>

          {/* Social Impact Focus */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-4 relative inline-block text-[#191307]">
              Social Impact Focus (2005–2025)
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
            </h2>
            <p className="text-lg text-[#191307] mb-4">
              Nominees must have made significant, measurable contributions to:
            </p>
            <ul className="list-disc pl-6 text-[#191307] space-y-2">
              <li>Increasing access to quality education</li>
              <li>
                Supporting educational equity across gender, region, and
                socio-economic groups
              </li>
              <li>
                Innovating learning systems through technology, arts, curriculum
                reform, or teacher training
              </li>
              <li>
                Advancing Africa's progress toward UN SDG 4: Quality Education
                and AU Agenda 2063 Goal 1
              </li>
            </ul>
          </div>

          {/* How Winners Are Chosen */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-4 relative inline-block text-[#191307]">
              How Winners Are Chosen
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
            </h2>
            <p className="text-lg text-[#191307] mb-4">
              Winners are selected through extensive impact assessment by the
              NESA-Africa Awards Board.
            </p>
            <p className="text-lg text-[#191307] mb-4">
              Selection is based on documented achievements, long-term
              influence, and cross-border impact in at least two African regions
              or in both Africa & the Diaspora.
            </p>
            <p className="text-lg text-[#191307] font-semibold">
              This is a once-in-a-lifetime honor — each recipient can only win
              the Africa Icon Blue Garnet Award once.
            </p>
          </div>

          {/* Recognition for All Nominees */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-4 relative inline-block text-[#191307]">
              Recognition for All Nominees
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
            </h2>
            <p className="text-lg text-[#191307] mb-4">
              Even if a nominee does not win, they can:
            </p>
            <ul className="list-disc pl-6 text-[#191307] space-y-2">
              <li>
                Download a Certificate of Nomination & Recognition via EduAid
                Africa
              </li>
              <li>
                Certificates are available with a voluntary donation, which
                directly supports scholarships, teacher training, and school
                rebuilding programs across Africa
              </li>
            </ul>
          </div>

          {/* Award Overview */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-[#191307]">
              Award Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl shadow p-6">
              <div>
                <div className="mb-2 flex">
                  <span className="font-bold w-40 text-[#E48900]">
                    Award Name:
                  </span>
                  <span className="text-[#191307]">
                    Africa Icon Blue Garnet Awards
                  </span>
                </div>
                <div className="mb-2 flex">
                  <span className="font-bold w-40 text-[#E48900]">
                    Award Type:
                  </span>
                  <span className="text-[#191307]">
                    Non-Competitive (Public Nomination + Internal Judges Panel)
                  </span>
                </div>
                <div className="mb-2 flex">
                  <span className="font-bold w-40 text-[#E48900]">
                    Eligibility:
                  </span>
                  <span className="text-[#191307]">
                    20+ years contribution to African education (2005–2025)
                  </span>
                </div>
                <div className="mb-2 flex">
                  <span className="font-bold w-40 text-[#E48900]">
                    Nomination Access:
                  </span>
                  <span className="text-[#191307]">
                    Public Nomination via NESA.Africa
                  </span>
                </div>
                <div className="mb-2 flex">
                  <span className="font-bold w-40 text-[#E48900]">
                    Evaluation Benchmarks:
                  </span>
                  <span className="text-[#191307]">
                    SDG 4 & 5, Agenda 2063 Goal 1 & 17, ESG, Sustainability
                  </span>
                </div>
              </div>
              <div>
                <div className="mb-2 flex">
                  <span className="font-bold w-40 text-[#E48900]">
                    Recognition Items:
                  </span>
                  <span className="text-[#191307]">
                    Trophy, Digital Certificate (GFA Wallet), Media Feature,
                    Legacy Profile
                  </span>
                </div>
                <div className="mb-2 flex">
                  <span className="font-bold w-40 text-[#E48900]">
                    Optional:
                  </span>
                  <span className="text-[#191307]">
                    Printed certificate upon request (3 weeks before Award Gala)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Target Recipients */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-[#191307]">
              Target Recipients
            </h2>
            <ul className="list-disc pl-6 text-[#191307] space-y-2">
              <li>Education policy pioneers</li>
              <li>Innovators of scalable education models</li>
              <li>Champions of inclusive and equitable learning</li>
              <li>Diaspora leaders funding African education</li>
              <li>Founders of transformational NGOs or institutions</li>
              <li>Government or multilateral partners in reform</li>
            </ul>
          </div>

          {/* Nomination & Evaluation Process */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-[#191307]">
              Nomination & Evaluation Process
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow text-[#191307]">
                <thead>
                  <tr>
                    <th className="py-2 px-4 text-left font-bold">Stage</th>
                    <th className="py-2 px-4 text-left font-bold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-2 px-4 font-semibold">
                      Step 1 – Public Nomination
                    </td>
                    <td className="py-2 px-4">
                      Open from July 15 – November 1, 2025 via nesa.africa
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2 px-4 font-semibold">
                      Step 2 – Judges Evaluation
                    </td>
                    <td className="py-2 px-4">
                      Ongoing from September – November 20, 2025 using weighted
                      criteria
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2 px-4 font-semibold">
                      Step 3 – Final Deliberation
                    </td>
                    <td className="py-2 px-4">
                      Judges convene in closed session to select 9 Icons across
                      3 focus areas:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Policy & Innovation</li>
                        <li>Equity & Inclusion</li>
                        <li>Diaspora Contributions</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2 px-4 font-semibold">
                      Step 4 – Recognition
                    </td>
                    <td className="py-2 px-4">
                      Award Gala Night: December 22, 2025; profile published in
                      NESA Legacy Journal
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Recognition Package */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-[#191307]">
              Recognition Package
            </h2>
            <ul className="list-disc pl-6 text-[#191307] space-y-2">
              <li>
                Blue Garnet Trophy (Symbol of Continental Education Impact)
              </li>
              <li>Blockchain-secured Digital Certificate (via GFA Wallet)</li>
              <li>Published Profile in NESA Legacy Journal</li>
              <li>NESA TV Feature + Interview</li>
              <li>Invitation to NESA 2025 Gala &amp; VIP Networking Lounge</li>
              <li>Optional Printed Certificate upon request</li>
            </ul>
          </div>

          {/* Key Dates Summary */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-[#191307]">
              Key Dates Summary
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow text-[#191307]">
                <thead>
                  <tr>
                    <th className="py-2 px-4 text-left font-bold">Activity</th>
                    <th className="py-2 px-4 text-left font-bold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-2 px-4">Nomination Opens</td>
                    <td className="py-2 px-4">July 15, 2025</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2 px-4">Nomination Closes</td>
                    <td className="py-2 px-4">November 20, 2025</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2 px-4">Judges Evaluation Period</td>
                    <td className="py-2 px-4">September – November 20, 2025</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2 px-4">Webinars on NESA-TV</td>
                    <td className="py-2 px-4">
                      October 13 – December 13, 2025
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2 px-4">"It's In Me" Radio Podcast</td>
                    <td className="py-2 px-4">From September 2025</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2 px-4">Award Gala + Recognition</td>
                    <td className="py-2 px-4">
                      December 18, 2025 – Muson Centre, Lagos, Nigeria
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Nominate */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-4 relative inline-block text-[#191307]">
              How to Nominate
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
            </h2>
            <p className="text-lg text-[#191307] mb-4">
              Visit www.nesa.africa or scan the QR code below to submit your
              nominee.
            </p>
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-[#191307] mb-4">
                <strong>Nomination Process:</strong>
              </p>
              <ul className="list-disc pl-6 text-[#191307] space-y-2">
                <li>Complete the online nomination form</li>
                <li>
                  Provide detailed information about the nominee's contributions
                </li>
                <li>Include supporting documentation of their impact</li>
                <li>Submit before the November 20, 2025 deadline</li>
              </ul>
            </div>
          </div>

          {/* Impact Statement */}
          <div className="bg-[#191307] rounded-xl p-6 text-white shadow flex flex-col items-center">
            <div className="flex flex-col items-center mb-4">
              {/* Animated Wave SVG */}
              <svg
                className="w-16 h-16 text-[#FFC247] animate-pulse"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle cx="32" cy="32" r="12" fill="#FFC247" opacity="0.7">
                  <animate
                    attributeName="r"
                    values="12;28;40;12"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.7;0.3;0;0.7"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="32" cy="32" r="8" fill="#FFC247" opacity="0.9" />
              </svg>
            </div>
            <blockquote className="italic text-lg text-center max-w-2xl">
              “This is Africa’s Nobel Prize for Education. The Blue Garnet is
              not given—it is earned through decades of sacrifice, innovation,
              and people-centered transformation.”
            </blockquote>
            <span className="mt-4 font-semibold text-[#FFC247] text-center">
              — Dr. Babashola Santos-Aderibigbe, CVO, Santos Creations
              Educational Foundation (SCEF)
            </span>
          </div>
        </div>
      </div>
      {/* Purpose and Benefits Section */}
      <div className="bg-white w-full">
        <div className="max-w-6xl mx-auto py-12 px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 relative inline-block">
              Purpose
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
            </h2>
            <p className="mb-4">
              This award recognizes outstanding educators, philanthropists,
              advocates, and innovators whose work has transformed education
              systems and inspired generations. By highlighting these icons, we
              aim to promote the importance of education, in line with SDG 4's
              mission to ensure inclusive and equitable quality education and
              promote lifelong learning opportunities for all.
            </p>
          </div>

          <div>
            <h2 className="text-3xl  mb-6 relative inline-block">
              Benefits
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FFC247] to-[#E48900]"></span>
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-gradient-to-r from-[#FFC247] to-[#E48900] border border-dotted border-[#FFC247]"></span>
                <div>
                  <strong>Awardees:</strong> Gain national and international
                  recognition, increased opportunities for collaboration, and
                  validation for their contributions to education. Winners will
                  be inducted as Fellows of the Santos Creations Educational
                  Foundation (SCEF).
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-gradient-to-r from-[#FFC247] to-[#E48900] border border-dotted border-[#FFC247]"></span>
                <div>
                  <strong>SCEF Fellows Role:</strong> Inducted Fellows will have
                  the opportunity to mentor upcoming educators, contribute to
                  strategic planning for educational initiatives, and
                  participate in high-level discussions and policy advocacy
                  efforts aimed at advancing education in Africa.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-gradient-to-r from-[#FFC247] to-[#E48900] border border-dotted border-[#FFC247]"></span>
                <div>
                  <strong>Africa:</strong> Showcases the richness of African
                  culture and the innovative use of education, fostering a
                  deeper appreciation and understanding of the role of education
                  in societal development.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialRecognitionPage;
