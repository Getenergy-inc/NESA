import Image from "next/image";
import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";

const VisionHeader = () => {
  return (
    <header className="relative inset-0 min-h-screen w-screen text-white py-10">
      {/* Background Image */}
      <Image
        src="/images/globe_nesa.png"
        alt="NESA Vision Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#191307CC] z-10"></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto">
        <motion.div
          variants={parentV}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-8 md:gap-16 pt-12 md:pt-18"
        >
          <motion.div variants={toTopV} className="text-center">
            <div className="flex flex-col items-center space-y-6">
              <motion.div
                variants={opacityV}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 rounded-full border border-[#FFC247]/30"
              >
                <span className="text-[#FFC247] font-medium text-sm">🏆 NESA AFRICA VISION</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text leading-tight">
                Transforming Africa's
                <br />
                Educational Future
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Recognizing Excellence. Driving Educational Innovation. 
                <br />
                Advancing Africa's Sustainable Future.
              </p>
            </div>
          </motion.div>

          <motion.div variants={toTopV} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { number: "2035", label: "Vision Year", icon: "🎯" },
              { number: "54", label: "African Countries", icon: "🌍" },
              { number: "25+", label: "Diasporal Countries", icon: "🌍"},
              { number: "1M+", label: "Learners to Reach", icon: "👥" },
              { number: "100K", label: "Scholarships Target", icon: "🎓" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={opacityV}
                className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-xl p-6 text-center hover:border-[#FFC247]/40 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={opacityV} className="text-center mt-8">
            <p className="text-base md:text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              <span className="bg-gradient-to-r from-[#FFC247] to-[#E48900] inline text-transparent bg-clip-text font-semibold">
                The New Education Standard Award Africa (NESA-Africa)
              </span>{' '}
              is a landmark initiative dedicated to celebrating excellence, innovation, and impactful change 
              in the African education sector. Rooted in the principles of social impact, sustainability, 
              and continental development.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default VisionHeader;