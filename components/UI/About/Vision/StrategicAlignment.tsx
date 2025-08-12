import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import { CheckCircle, Globe, Users, Lightbulb, Handshake } from "lucide-react";

const StrategicAlignment = () => {
  const sdgGoals = [
    {
      number: "4",
      title: "Quality Education",
      description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
      icon: "🎓"
    },
    {
      number: "5",
      title: "Gender Equality",
      description: "Promote girls' education through award focus areas and scholarship programs.",
      icon: "⚖️"
    },
    {
      number: "9",
      title: "Innovation & Infrastructure",
      description: "Encourage STEM, EdTech, and vocational excellence.",
      icon: "🔬"
    },
    {
      number: "17",
      title: "Partnerships for the Goals",
      description: "Leverage multi-sector partnerships for education financing and advocacy.",
      icon: "🤝"
    }
  ];

  const auGoals = [
    {
      title: "Aspiration 1",
      description: "A prosperous Africa based on inclusive growth and sustainable development.",
      icon: "🌍"
    },
    {
      title: "Goal 2",
      description: "Well-educated citizens and a skills revolution underpinned by science, technology, and innovation.",
      icon: "🧠"
    },
    {
      title: "Goal 17",
      description: "Full gender equality in all spheres of life—including education.",
      icon: "👥"
    },
    {
      title: "Goal 18",
      description: "Engaged and empowered youth and children.",
      icon: "🌟"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#33270E] to-[#191307]">
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
              🌐 Strategic Alignment
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Aligned with global and continental frameworks for sustainable development
            </p>
          </motion.div>

          {/* UN SDGs Section */}
          <motion.div variants={toTopV} className="space-y-8">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 p-4 rounded-full mr-4">
                <Globe className="w-10 h-10 text-[#FFC247]" />
              </div>
              <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                ✅ UN Sustainable Development Goals (SDGs)
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sdgGoals.map((goal, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-xl p-6 hover:border-[#FFC247]/40 transition-all duration-300 group"
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{goal.icon}</div>
                    <div className="bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] font-bold text-lg px-3 py-1 rounded-full inline-block mb-2">
                      SDG {goal.number}
                    </div>
                  </div>
                  <h4 className="text-[#FFC247] font-semibold text-lg mb-3 text-center">
                    {goal.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed text-center">
                    {goal.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Africa Union Agenda 2063 Section */}
          <motion.div variants={toTopV} className="space-y-8">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 p-4 rounded-full mr-4">
                <Users className="w-10 h-10 text-[#FFC247]" />
              </div>
              <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                🌍 Africa Union Agenda 2063
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {auGoals.map((goal, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-xl p-8 hover:border-[#FFC247]/40 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl flex-shrink-0">{goal.icon}</div>
                    <div>
                      <h4 className="text-[#FFC247] font-semibold text-xl mb-3">
                        {goal.title}
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        {goal.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Alignment Benefits */}
          <motion.div variants={opacityV} className="bg-gradient-to-r from-[#33270E]/60 to-[#191307]/60 rounded-2xl p-8 border border-[#FFC247]/20">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 p-3 rounded-full mr-4">
                  <CheckCircle className="w-8 h-8 text-[#FFC247]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                  Why This Alignment Matters
                </h3>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 p-6 rounded-xl border border-[#FFC247]/20 mb-4">
                  <Lightbulb className="w-12 h-12 text-[#FFC247] mx-auto mb-4" />
                  <h4 className="text-[#FFC247] font-semibold text-lg mb-2">Global Standards</h4>
                  <p className="text-gray-400 text-sm">
                    Ensures our initiatives meet international benchmarks for educational development
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 p-6 rounded-xl border border-[#FFC247]/20 mb-4">
                  <Handshake className="w-12 h-12 text-[#FFC247] mx-auto mb-4" />
                  <h4 className="text-[#FFC247] font-semibold text-lg mb-2">Strategic Partnerships</h4>
                  <p className="text-gray-400 text-sm">
                    Facilitates collaboration with international organizations and funding bodies
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 p-6 rounded-xl border border-[#FFC247]/20 mb-4">
                  <Globe className="w-12 h-12 text-[#FFC247] mx-auto mb-4" />
                  <h4 className="text-[#FFC247] font-semibold text-lg mb-2">Continental Impact</h4>
                  <p className="text-gray-400 text-sm">
                    Contributes to Africa's vision of educational transformation and sustainable development
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StrategicAlignment;