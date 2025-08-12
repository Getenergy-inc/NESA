import Image from "next/image";

const NESAAfrica = () => {
  return (
    <section className="bg-[#FFF5E0] text-[#1a1a1a]  py-16">
      <div className="container mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold _under_border ">
          Why NESA Africa
        </h2>
        <span className="bg-gradient-to-r from-[#febf44] to-[#ed9d19] h-1 w-24 md:w-36 absolute -bottom-2 left-0"></span>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        {/* Mission */}
        <div className="space-y-4">
          <div className="rounded-xl border-4 border-[#E48900] overflow-hidden">
            <Image
              src="images/about1.png"
              alt="Mission"
              width={600}
              height={400}
              className="w-full lg:lg:h-[474px] md:h-[230px] object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              Mission 🎯
            </h3>
            <p className="text-sm md:text-base">
              To drive sustainable transformation in education by recognizing outstanding contributions, fostering innovation, and strengthening collaboration among key stakeholders in Africa and beyond.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="space-y-4">
          <div className="rounded-xl border-4 border-[#E48900] overflow-hidden">
            <Image
              src="images/about2.png"
              alt="Vision"
              width={600}
              height={400}
              className="w-full lg:h-[474px] md:h-[230px] object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              Vision 🌍
            </h3>
            <p className="text-sm md:text-base">
              By 2030, NESA Africa will be the leading education impact awards and initiative in Africa, facilitating investment in education, promoting innovative learning solutions, and ensuring inclusive access to quality education for all children and youth across the continent.
            </p>
          </div>
        </div>
      </div>

          </div>
    </section>
  );
};

export default NESAAfrica;
