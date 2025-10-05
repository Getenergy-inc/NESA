// import Image from "next/image";

// const NESAAfrica = () => {
//   return (
//     <section className="bg-[#FFF5E0] text-[#1a1a1a]  py-16">
//       <div className="container mx-auto">
//       {/* Header */}
//       <div className="mb-10">
//         <h2 className="text-2xl md:text-3xl font-semibold _under_border ">
//           Why NESA Africa
//         </h2>
//         <span className="bg-gradient-to-r from-[#febf44] to-[#ed9d19] h-1 w-24 md:w-36 absolute -bottom-2 left-0"></span>
//       </div>

//       {/* Mission & Vision */}
//       <div className="grid md:grid-cols-2 gap-10 mb-16">
//         {/* Mission */}
//         <div className="space-y-4">
//           <div className="rounded-xl border-4 border-[#E48900] overflow-hidden">
//             <Image
//               src="images/about1.png"
//               alt="Mission"
//               width={600}
//               height={400}
//               className="w-full lg:lg:h-[474px] md:h-[230px] object-cover"
//             />
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold flex items-center gap-2">
//               Mission 🎯
//             </h3>
//             <p className="text-sm md:text-base">
//               To drive sustainable transformation in education by recognizing outstanding contributions, fostering innovation, and strengthening collaboration among key stakeholders in Africa and beyond.
//             </p>
//           </div>
//         </div>

//         {/* Vision */}
//         <div className="space-y-4">
//           <div className="rounded-xl border-4 border-[#E48900] overflow-hidden">
//             <Image
//               src="images/about2.png"
//               alt="Vision"
//               width={600}
//               height={400}
//               className="w-full lg:h-[474px] md:h-[230px] object-cover"
//             />
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold flex items-center gap-2">
//               Vision 🌍
//             </h3>
//             <p className="text-sm md:text-base">
//               By 2030, NESA Africa will be the leading education impact awards and initiative in Africa, facilitating investment in education, promoting innovative learning solutions, and ensuring inclusive access to quality education for all children and youth across the continent.
//             </p>
//           </div>
//         </div>
//       </div>

//           </div>
//     </section>
//   );
// };

// export default NESAAfrica;

"use client";

import React from "react";
import { motion } from "framer-motion";

const NESAAfrica: React.FC = () => {
  return (
    <section className="relative bg-[#fff7ec] py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left Highlighted Story */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] text-black p-10 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl md:text-3xl font-extrabold mb-6 text-white">
            Our Journey of Recognition
          </h3>
          <p className="text-lg leading-relaxed font-medium mb-4">
            Join us as we embark on this celebratory journey, recognizing a 
            decade of educational champions' excellence and transformation in 
            Nigeria. Through these stories of achievement and progress, 
             NESA Africa aims to inspire
            continued effort and dedication towards an inclusive and quality 
            education system across Nigeria and the broader African continent.
          </p>
          <p className="text-lg leading-relaxed font-semibold">
            Welcome to NESA Africa, where every recognition marks a milestone in 
            our shared journey towards a brighter educational future.
          </p>
        </motion.div>

        {/* Right Complementary Story */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-800"
        >
          <h3 className="text-2xl md:text-3xl font-extrabold mb-6 text-[#ea5d07]">
            A Decade of Transformative Impact
          </h3>
          <p className="text-lg leading-relaxed mb-4">
            In the span of a decade, Nigeria has seen transformative changes in 
            education, thanks to the collective efforts of dedicated stakeholders.
          </p>
          <p className="text-lg leading-relaxed">
            From enhancing educational infrastructures and curricula to 
            implementing sustainable Corporate Social Responsibility (CSR) 
            projects, the contributions have been diverse yet singular in their 
            goal — <span className="font-bold text-[#f59e0b]">
              improving education for every Nigerian child.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NESAAfrica;
