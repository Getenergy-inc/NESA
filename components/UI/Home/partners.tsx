import Button from "@/components/Common/Button";
import Partners from "@/components/Common/Slide/partners";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Globe, ArrowRight, Building2, Award, Target } from "lucide-react";

const HomePartners = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const partnershipStats = [
    { icon: <Building2 className="w-6 h-6" />, number: "100+", label: "Global Partners" },
    { icon: <Globe className="w-6 h-6" />, number: "25+", label: "Countries" },
    { icon: <Users className="w-6 h-6" />, number: "50+", label: "Organizations" },
    { icon: <Award className="w-6 h-6" />, number: "10+", label: "Years Experience" }
  ];

  return (
    <section className="relative bg-gradient-to-br from-darkBrown via-secondaryDark to-darkBrown py-16 lg:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/bg/timeline.png"
          alt="Partners background"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-darkBrown/60"></div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primaryGold rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-deepGold rounded-full blur-2xl"></div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-primaryGold to-deepGold rounded-full flex items-center justify-center">
              <Users className="text-darkBrown text-lg" />
            </div>
            <span className="text-primaryGold text-sm font-semibold tracking-wider uppercase">
              Strategic Alliances
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
            Meet Our Key Partners
          </h2>

          <p className="text-white/80 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
            Together with our valued partners, we're transforming education across Africa through collaborative innovation and shared commitment to excellence.
          </p>
        </motion.div>

        {/* Partnership Stats */}
        {/* <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partnershipStats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-primaryGold/20 text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-primaryGold to-deepGold rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="text-darkBrown">{stat.icon}</div>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-white/60 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div> */}

        {/* Partners Carousel Section */}
        <motion.div variants={itemVariants} className="mb-16">
          {/* Decorative Lines */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primaryGold/60 to-transparent mb-8"></div>

          {/* Partners Logos */}
          <div className="overflow-hidden">
            <div className="relative whitespace-nowrap">
              <motion.div
                className="inline-block"
                animate={{ x: [0, -100] }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Partners />
                <Partners />
                <Partners />
              </motion.div>
            </div>
          </div>

          {/* Decorative Lines */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primaryGold/60 to-transparent mt-8"></div>
        </motion.div>

        {/* Call to Action */}
        {/* <motion.div variants={itemVariants} className="text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-primaryGold/20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Target className="text-primaryGold w-8 h-8" />
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                Join Our Partnership Network
              </h3>
            </div>

            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Be part of Africa's most prestigious education awards. Partner with us to recognize and celebrate educational excellence across the continent.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                text="Partner with us"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primaryGold to-deepGold text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
              />
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </motion.div>
          </div>
        </motion.div> */}
      </motion.div>
    </section>
  );
};

export default HomePartners;