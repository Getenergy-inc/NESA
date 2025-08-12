import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import { Target, Eye, Calendar, Globe } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#191307] to-[#33270E]">
      <div className="container mx-auto px-4">
        <motion.div
          variants={parentV}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={toTopV} className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Driving educational transformation through strategic recognition and sustainable collaboration
            </p>
          </motion.div>

          {/* Mission & Vision Cards */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mission Card */}
            <motion.div
              variants={opacityV}
              className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-2xl p-8 hover:border-[#FFC247]/40 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 p-3 rounded-full mr-4">
                  <Target className="w-8 h-8 text-[#FFC247]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                  🎯 Mission
                </h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                To accelerate Africa's educational transformation through strategic recognition of excellence, 
                digital innovation, and sustainable collaboration, aligning all activities with the global SDGs 
                and African continental goals.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              variants={opacityV}
              className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-2xl p-8 hover:border-[#FFC247]/40 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 p-3 rounded-full mr-4">
                  <Eye className="w-8 h-8 text-[#FFC247]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                  🌟 Vision (2035)
                </h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                To be Africa's leading education award and change platform, mobilizing public-private investments, 
                amplifying innovative educational models, and ensuring equitable access to quality learning—reaching 
                every child and youth across Africa.
              </p>
            </motion.div>
          </div>

          {/* Journey Timeline */}
          <motion.div variants={toTopV} className="bg-gradient-to-r from-[#191307]/60 to-[#33270E]/40 rounded-2xl p-8 border border-[#FFC247]/20">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 p-3 rounded-full mr-4">
                <Calendar className="w-8 h-8 text-[#FFC247]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                🌐 Our Journey
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] font-bold text-xl px-4 py-2 rounded-full inline-block mb-4">
                  2010
                </div>
                <h4 className="text-[#FFC247] font-semibold mb-2">Conception</h4>
                <p className="text-gray-400 text-sm">
                  Originally conceived as the Stakeholders Education Standard Award
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] font-bold text-xl px-4 py-2 rounded-full inline-block mb-4">
                  2023
                </div>
                <h4 className="text-[#FFC247] font-semibold mb-2">Rebranding</h4>
                <p className="text-gray-400 text-sm">
                  Evolved and rebranded as NESA-Africa after a decade of reflection
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] font-bold text-xl px-4 py-2 rounded-full inline-block mb-4">
                  2025
                </div>
                <h4 className="text-[#FFC247] font-semibold mb-2">Launch</h4>
                <p className="text-gray-400 text-sm">
                  Inaugural edition launches on December 13, 2025
                </p>
              </div>
            </div>
          </motion.div>

          {/* Foundation Info */}
          <motion.div variants={opacityV} className="text-center bg-gradient-to-r from-[#33270E]/40 to-[#191307]/40 rounded-2xl p-8 border border-[#FFC247]/20">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 p-3 rounded-full mr-4">
                <Globe className="w-8 h-8 text-[#FFC247]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                Hosted by SCEF
              </h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
              Under the stewardship of the{' '}
              <span className="bg-gradient-to-r from-[#FFC247] to-[#E48900] inline text-transparent bg-clip-text font-semibold">
                Santos Creations Educational Foundation (SCEF)
              </span>
              , NESA-Africa is more than an award—it is a movement for educational justice, inclusion, 
              equity, and development, aligned with UN Sustainable Development Goal 4 (SDG 4) and 
              Africa Union Agenda 2063.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVision;