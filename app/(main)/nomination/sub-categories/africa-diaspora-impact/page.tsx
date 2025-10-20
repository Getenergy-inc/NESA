"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Award } from "lucide-react";
import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";

interface Category {
  title: string;
  description: string;
  image: string;
}

const AfricaDiasporaAwardPage = () => {
  // --- Sub-categories (left exactly as the user provided) ---
  const subcategories: Category[] = [
    {
      title: "Diaspora Association Educational Impact in Africa",
      description:
        "This Award recognizes and honors the significant contributions made by the Nigerian diaspora towards achieving 'Education for All' in Nigeria. This award, set for the 2023 cycle, aims to celebrate diaspora individuals, groups, or organizations that have made a substantial impact through skills transfer, corporate social responsibility (CSR) initiatives, advocacy, and other educational support back home in Nigeria.",
      image: "/images/nesa-card2.png",
    },
    {
      title: "The Best Diaspora-Led Educational Infrastructure",
      description:
        "This category celebrates diaspora organizations that have created significant educational infrastructure, advancing the quality of education across Africa.",
      image: "/images/nesa-card2.png",
    },
    {
      title: "The Best Diaspora-Led Educational Program Innovation",
      description:
        "Awards organizations that have created outstanding e-learning platforms or solutions that significantly improve access to education.",
      image: "/images/nesa-card2.png",
    },
    {
      title: "The Best Diaspora-Led Teacher Training and Support Initiative",
      description:
        "Honors organizations that leverage artificial intelligence to personalize learning experiences, improve educational processes, or enhance...",
      image: "/images/nesa-card2.png",
    },
  ];

  // --- Page-level constants from your new content ---
  const masterCategoryTitle =
    "African Diaspora Education Impact & Partnership Recognition";
  const shortTag =
    "Honouring Global Africans Transforming Education Back Home (Africa-Regional)";

  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % subcategories.length);
  }, [subcategories.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + subcategories.length) % subcategories.length
    );
  }, [subcategories.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleNominate = (category: Category) => {
    // use the official master category as the `type` query param
    router.push(
      `/nominateform?type=${encodeURIComponent(
        "Diaspora Association Educational Impact in Africa"
      )}` +
        `&title=${encodeURIComponent(category.title)}` +
        `&description=${encodeURIComponent(category.description)}` +
        `&image=${encodeURIComponent(category.image)}`
    );
  };

  const handleSeeNominees = (category: Category) => {
    router.push(
      `/nominees?category=${encodeURIComponent(
        "Diaspora Association Educational Impact in Africa"
      )}` + `&subcategory=${encodeURIComponent(category.title)}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-whiteGold via-[#fdf3dc] to-xlGold">
      {/* ====== Hero ====== */}
      <motion.header
        variants={parentV}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="relative bg-[#0F0B06] text-white py-20 px-6"
      >
        <div className="absolute inset-0 bg-[url('/images/Herosection.png')] bg-cover bg-center opacity-10"></div>
        <motion.div
          variants={toTopV}
          className="relative z-10 max-w-6xl mx-auto mt-10"
        >
          <div className=" md:px-10 px-5 pb-12">
            <h1 className="text-center text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text leading-tight py-10">
              {masterCategoryTitle}
            </h1>

            <div className="flex justify-center">
              <div className="inline-flex text-center items-center px-6 py-3 bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 rounded-full border border-[#FFC247]/30 mb-6">
                <Award className="w-6 h-6 text-[#FFC247] mr-2" />
                <span className="text-[#FFC247] font-medium text-[10px] md:text-sm">
                  {shortTag}
                </span>
              </div>
            </div>
          </div>

          <motion.div
            variants={parentV}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.15 }}
            className="max-w-6xl mt-10 mx-auto"
          >
            <motion.div
              variants={opacityV}
              className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-2xl p-8 hover:border-[#FFC247]/40 transition-all duration-300"
            >
              <div className="mb-8">
                <div className="w-full flex justify-center">
                  <motion.h3
                    variants={toTopV}
                    className="text-2xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] text-transparent bg-clip-text mb-6 flex items-center"
                  >
                    Overview
                  </motion.h3>
                </div>

                <motion.p
                  variants={toTopV}
                  className="mb-4 text-2sm text-gray-300 text-center md:text-left mx-auto"
                >
                  Across continents, millions of Africans abroad are rewriting
                  the story of education at home sending resources, technology,
                  mentorship, and hope across borders.
                </motion.p>
                <motion.p
                  variants={toTopV}
                  className="mb-4 text-2sm text-center md:text-left text-gray-300 mx-auto"
                >
                  The African Diaspora Education Impact & Partnership
                  Recognition celebrates the unsung diaspora champions
                  associations, professional networks, philanthropic
                  individuals, and technical experts whose sustained
                  contributions in cash, kind, or expertise are bridging
                  learning gaps and empowering schools and communities across
                  Africa.
                </motion.p>
                <motion.p
                  variants={toTopV}
                  className="mb-4 text-2sm text-center md:text-left text-gray-300 mx-auto"
                >
                  This category operates under the Platinum Certificate of
                  Recognition Awards, a non-competitive honour bestowed after
                  documentation and validation of measurable contributions
                  aligned with SDG 4 (Quality Education), SDG 17 (Partnerships),
                  and Africa Agenda 2063 Goal 1.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.header>

      {/* ====== Main content ====== */}
      <main className="max-w-6xl mx-auto py-12 px-4 space-y-12">
        {/* Sub-categories grid (left unchanged content) */}
        <motion.section
          variants={parentV}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.h3
            variants={toTopV}
            className="text-2xl text-center py-10 font-bold mb-6"
          >
            Sub-Categories (Africa-Regional)
          </motion.h3>

          <motion.div
            variants={opacityV}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {subcategories.slice(1).map((category, index) => (
              <motion.article
                key={index}
                variants={toTopV}
                className="bg-[#191307] rounded-3xl overflow-hidden shadow-lg transition-transform hover:scale-105 flex flex-col"
                tabIndex={0}
                aria-labelledby={`subcat-title-${index}`}
              >
                <div className="relative h-56 flex items-center justify-center p-6">
                  <Image
                    src={category.image}
                    alt={category.title}
                    width={320}
                    height={320}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h4
                      id={`subcat-title-${index}`}
                      className="text-white text-lg font-bold mb-2"
                    >
                      {category.title}
                    </h4>
                    <p className="text-gray-300 text-sm mb-4">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 mt-auto">
                    <button
                      onClick={() => handleSeeNominees(category)}
                      className="w-full bg-transparent text-[#FFC247] py-2.5 rounded-lg hover:bg-[#33270E] transition-all duration-300 border-2 border-[#FFC247] font-medium tracking-wide flex items-center justify-center group"
                      aria-label={`See nominees for ${category.title}`}
                    >
                      <span className="mr-2 text-lg">👁️</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        See Existing Nominees
                      </span>
                    </button>
                    <button
                      onClick={() => handleNominate(category)}
                      className="w-full py-2.5 rounded-lg font-medium text-[#191307] hover:shadow-[0_0_15px_rgba(255,194,71,0.5)] transition-all duration-300 bg-gradient-to-r from-[#FFC247] to-[#E48900] flex items-center justify-center group"
                      aria-label={`Nominate for ${category.title}`}
                    >
                      <span className="mr-2 text-lg">🏆</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        Nominate
                      </span>
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        {/* Statement of the Problem */}
        <motion.section
          variants={parentV}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div
            variants={toTopV}
            className=" bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-primaryGold/20 p-6 "
          >
            <h3 className="text-2xl text-center md:text-left pb-2 font-semibold mb-3">
              Statement of the Problem
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Despite contributing over <strong>$95 billion</strong> annually in
              remittances, less than <strong>5%</strong> of diaspora funds reach
              structured education programs. Many diaspora projects remain
              undocumented, fragmented, or short-lived, failing to connect with
              national education systems or sustainable development plans. This
              recognition builds visibility and credibility for diaspora
              education efforts that truly change lives, sustain schools, and
              institutionalise excellence.
            </p>
          </motion.div>
        </motion.section>

        {/* Vision & Purpose */}
        <motion.section
          variants={parentV}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div
            variants={toTopV}
            className=" bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-primaryGold/20 p-6 "
          >
            <h3 className="text-center md:text-left text-2xl pb-2 font-semibold mb-3">
              Vision & Purpose
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                Connect global Africans to the continental education agenda by
                celebrating proven acts of commitment.
              </li>
              <li>
                Build resilient education ecosystems and strengthen Africa’s
                human-capital development.
              </li>
              <li>
                Encourage transparent and measurable diaspora participation in
                SDG 4 outcomes.
              </li>
            </ul>
          </motion.div>
        </motion.section>

        {/* Benefits for Africa */}
        <motion.section
          variants={parentV}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div
            variants={toTopV}
            className=" bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-primaryGold/20 p-6 "
          >
            <h3 className="text-center md:text-left text-2xl pb-2 font-semibold mb-3">
              Benefits for Africa
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                Encourages structured diaspora investment into public education
                systems.
              </li>
              <li>
                Builds a continental database of diaspora education
                interventions.
              </li>
              <li>
                Reinforces global collaboration between African governments and
                diaspora communities.
              </li>
              <li>
                Inspires younger diaspora generations to view education
                philanthropy as legacy work.
              </li>
              <li>
                Creates a verified network of Diaspora Education Partners (DEP)
                under SCEF.
              </li>
            </ul>
          </motion.div>
        </motion.section>

        {/* Recognition Package */}
        <motion.section
          variants={parentV}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div
            variants={opacityV}
            className=" bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-primaryGold/20 p-6 "
          >
            <h3 className="text-center md:text-left text-2xl pb-2 font-semibold mb-3">
              Recognition Package
            </h3>
            <ul className="list-none space-y-2 text-gray-700">
              <li>
                • Platinum Digital Certificate (downloadable via GFA Wallet).
              </li>
              <li>
                • Letter of Recognition endorsed by SCEF / NESA-Africa
                Secretariat.
              </li>
              <li>• Feature Spotlight on NESA TV & EduAid-Africa Expo.</li>
              <li>
                • Optional Printed Certificate for embassies, events, or
                association archives.
              </li>
              <li>• Invitation to Diaspora Ambassadors Roundtable 2026.</li>
            </ul>
          </motion.div>
        </motion.section>

        {/* Recognition Signals / Eligibility Indicators */}
        <motion.section
          variants={parentV}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div
            variants={opacityV}
            className="bg-white p-6 rounded-2xl shadow-sm"
          >
            <h3 className="text-center md:text-left text-2xl pb-2 font-semibold mb-3">
              Recognition Signals (Eligibility Indicators)
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="text-sm text-gray-600">
                    <th className="py-2 px-3">Criterion</th>
                    <th className="py-2 px-3">
                      Platinum Recognition Threshold
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  <tr className="border-t">
                    <td className="py-3 px-3 font-medium">Contribution Type</td>
                    <td className="py-3 px-3">
                      Cash, kind, or expertise toward education (2021–2025)
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-3 font-medium">Verification</td>
                    <td className="py-3 px-3">
                      Receipts, impact reports or validated testimonials
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-3 font-medium">Scale</td>
                    <td className="py-3 px-3">
                      ≥ 5 institutions or ≥ 5,000 beneficiaries
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-3 font-medium">Regional Spread</td>
                    <td className="py-3 px-3">
                      At least 1 country in each participating region
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-3 font-medium">Sustainability</td>
                    <td className="py-3 px-3">
                      Evidence of follow-up or ongoing mentorship
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-3 font-medium">Governance</td>
                    <td className="py-3 px-3">
                      Transparent, auditable or community-endorsed
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-3 font-medium">Alignment</td>
                    <td className="py-3 px-3">
                      Supports SDG 4, SDG 5, SDG 17, Agenda 2063 Goal 1
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.section>

        {/* FAQs */}
        <motion.section
          variants={parentV}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div
            variants={opacityV}
            className="bg-white p-6 rounded-2xl shadow-sm"
          >
            <h3 className="text-center md:text-left text-2xl pb-2 font-semibold mb-3">
              FAQs
            </h3>

            <div className="space-y-4 text-gray-700">
              <div>
                <strong className="">Q1. Who can be recognised?</strong>
                <div>
                  Any African individual, diaspora group, association, business,
                  or foundation with verified education contributions
                  (2021–2025).
                </div>
              </div>

              <div>
                <strong>Q2. Is there voting?</strong>
                <div>
                  No. This is a non-competitive, documentation-based recognition
                  validated by regional SCEF panels.
                </div>
              </div>

              <div>
                <strong>Q3. Must contributions be monetary?</strong>
                <div>
                  No. Expertise, mentorship, materials, or digital resources
                  qualify equally.
                </div>
              </div>

              <div>
                <strong>Q4. How are nominees verified?</strong>
                <div>
                  Through uploaded evidence, references, or validation from
                  ministries, embassies, or partner NGOs.
                </div>
              </div>

              <div>
                <strong>
                  Q5. Can an awardee also compete for Blue Garnet/Gold?
                </strong>
                <div>
                  Yes — recipients may advance to competitive recognition if
                  their projects meet higher measurable thresholds.
                </div>
              </div>

              <div>
                <strong>Q6. How will the diaspora benefit?</strong>
                <div>
                  Recognition increases access to collaborations, grants, and
                  partnerships with governments, multilateral bodies, and
                  investors.
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
};

export default AfricaDiasporaAwardPage;
