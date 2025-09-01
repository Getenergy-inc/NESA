"use client";
import Button from "@/components/Common/Button";
import { motion } from "framer-motion";

interface AwardCardData {
  title: string;
  subtitle?: string;
  description: string;
  features: string[];
  buttonText: string;
  bgColor: string;
  textColor: string;
}

const awardCardsData: AwardCardData[] = [
  {
    title: "African Education Icon for Decade",
    subtitle: "(2014–2024)",
    description: "Reserved for lifetime achievement. Nominees must have 10+ years institutional achievements, w/ they deserve recognition.",
    features: [
      "Fromalizationmakers",
      "Harvest Institutional",
      "achievements, w/ they",
      "deserve recognition"
    ],
    buttonText: "Learn More",
    bgColor: "bg-white",
    textColor: "text-gray-800"
  },
  {
    title: "Competitive Awards",
    subtitle: "",
    description: "",
    features: [
      "Public Institutional Nomination",
      "Voting + Judging-Based Selection",
      "Major Categories and 101 Subcategories",
      "Gold Certificate"
    ],
    buttonText: "View Categories",
    bgColor: "bg-white",
    textColor: "text-gray-800"
  },
  {
    title: "Non-Competitive Awards",
    subtitle: "",
    description: "",
    features: [
      "Global Public Nomination",
      "Internal Judging Only",
      "Criteria: No Voting Involved"
    ],
    buttonText: "Learn More",
    bgColor: "bg-white",
    textColor: "text-gray-800"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

const TypeOfAwards = () => {
  return (
    <section className="my-10 md:my-20 px-4 md:px-8 lg:px-28">
      <div className="container mx-auto">
        <div className="space-y-8 md:space-y-12">
          <div className="text-center space-y-4">
            <h3 className="font-[600] text-2xl md:text-3xl lg:text-4xl text-darkBrown">
              Excellence unfolds across three distinguished tiers within the
              N.E.S.A Awards
            </h3>
            <p className="text-sm md:text-base text-gray-600 max-w-4xl mx-auto">
              The Nigeria Standard Awards is committed to honoring every nominee,
              ensuring recognition and appreciation, irrespective of winning. To
              achieve this, we've designed three tiers of awards, guaranteeing
              acknowledgment and celebration for all nominees contributions.
            </p>
          </div>

          {/* Three Award Cards in Horizontal Flex Layout */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-center items-stretch">
            {awardCardsData.map((card, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className={`
                  ${card.bgColor} ${card.textColor}
                  rounded-2xl p-6 md:p-8
                  border border-gray-200 shadow-lg
                  flex-1 max-w-sm mx-auto lg:mx-0
                  hover:shadow-xl transition-shadow duration-300
                  flex flex-col justify-between
                  min-h-[400px]
                `}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-bold text-lg md:text-xl text-darkBrown">
                      {card.title}
                    </h4>
                    {card.subtitle && (
                      <p className="text-sm md:text-base text-primaryGold font-medium">
                        {card.subtitle}
                      </p>
                    )}
                  </div>

                  {card.description && (
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  )}

                  <div className="space-y-3">
                    {card.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primaryGold rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Button
                    text={card.buttonText}
                    variant="filled"
                    className="w-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypeOfAwards;