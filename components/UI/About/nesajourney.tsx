import React from "react";

const journeyData = [
  {
    year: "2010–2013",
    description:
      "Stakeholder consultations and concept development under the name Stakeholder Education Standard Award.",
  },
  {
    year: "2014–2016",
    description:
      "Renamed Nigeria Education Standard Award, aiming to establish national recognition for education contributions.",
  },
  {
    year: "2017 – 2019",
    description:
      "Further rebranding to New Nigeria Education Standard Award (NNESA) to align with policy and sectoral reforms.",
  },
  {
    year: "2020 – 2024",
    description:
      "Transition to a broader continental vision, culminating in NESA Africa – New Education Standard Award Africa, expanding its reach to the entire African continent.",
  },
  {
    year: "2025",
    description:
      "First official edition of NESA Africa, hosted by SCEF Nigeria Local Chapter, bringing together global education stakeholders.",
  },
];

const NesaJourney = () => {
  return (
    <section className="bg-[#FFFFFF] text-[#222]">
      <div className="container mx-auto py-16">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl _under_border font-semibold mb-4">
          The NESA Journey
        </h2>

        <p className="text-gray-700 font-poppins text-justify">
          NESA Africa, formerly known by different names, has undergone an
          evolutionary transformation from its initial concept in 2010. Over the
          years, the initiative faced numerous challenges, including funding
          limitations, stakeholder alignment, and logistical constraints.
          However, through resilience and continuous refinement, NESA Africa has
          emerged as the leading pan-African platform for recognizing excellence
          in education.
        </p>

        {/* Subheading */}
        <div className="text-xl font-semibold mt-10 mb-6 border-b-4  border-yellow-500 w-[290px] ">
          Evolution of the NESA Brand
        </div>

        {/* Timeline */}
        <ul className="space-y-6">
          {journeyData.map((item, index) => (
            <li key={index} className="flex flex-col md:flex-row gap-2">
              <div className="text-lg md:w-1/6  font-medium w-32 md:w-40 text-yellow-600">
                {item.year}
              </div>
              <div className="border-l-2 md:w-5/6 border-yellow-500 pl-4 text-gray-800">
                {item.description}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default NesaJourney;
