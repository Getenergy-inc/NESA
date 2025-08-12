"use client";

import Image from "next/image";

const NesaAfricaHeader = () => {
  return (
    <header
    style={{
      backgroundImage: "url('/images/aboutnesa.png')",
      backgroundSize: "cover",
      backgroundPosition: "center"}}
      className={`bg-[#17120a] min-h-[40rem] text-white flex items-center pt-28 md:pt-10`}
    >

      <div className="container grid md:grid-cols-2 gap-4 px-2 lg:px-8 py-20 items-center text-justify md:justify-start">
        <div className="space-y-8 text-center md:text-start">
          <div className="space-y-1 lg:text-left text-center">
            <h1 className="text-[2.5rem] font-[500] leading-[3.5rem] mb-4 bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
              New Education Standard Award 2024
            </h1>
            <p className="font-[300] text-[1.2rem] lg:text-[1.25rem] leading-[2rem]">
              NESA stands as the pinnacle award of the decade, a fervent
              celebration of excellence within the Nigerian education system. We
              uplift contributors, ignite innovation, and envision an ecosystem
              where excellence becomes the driving force for transformative
              change
            </p>
          </div>
        </div>

        <div className="grid place-content-center opacity-40 md:opacity-100 duration-300">
          <Image
            src={"/images/logos/big_logo.png"}
            alt="logo"
            width={500}
            height={500}
          />
        </div>
      </div>
    </header>
  );
};

export default NesaAfricaHeader;
