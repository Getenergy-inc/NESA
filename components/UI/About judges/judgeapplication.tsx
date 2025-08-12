// JudgeApplication.jsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const JudgeApplication = () => {
    const GradientLine = () => (
    <div className="h-[3px] bg-gradient-to-r from-[#FFC247] to-[#E48900] mt-2 w-36" />
  );
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center ">
              <Image
                src="/images/judgeapply.png"
                alt="judge application"
                layout="fill"
                objectFit="cover"
                /> 

      
      <div className="z-10 text-white w-full px-[30px] py-8 md:px-[50px]">
        <h1 className="text-3xl md:text-2xl font-medium mb-6">
          Interested in Applying or Nominating a Judge?
          <GradientLine />
                  </h1>
        
        <p className="text-lg md:text-l mb-6 font-light">
          Click the applicable link below or email Your CV & Interest Letter to judges@nesa.africa
        </p>
        
        <p className="text-lg md:text-l mb-8 font-light">
          Application Deadline: [Insert Deadline]
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <Link href="/judgeapply" className="bg-gradient-to-r from-[#FFC247] to-[#E48900] hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-xl text-center w-full md:w-[300px]">
            Apply To Judge
          </Link>

          <Link href="/Judgesnominate" className="bg-gradient-to-r from-[#E1E1E1] to-[#BDBDBD] hover:bg-gray-300 text-black font-medium py-3 px-6 rounded-xl text-center w-full md:w-[300px]">
            Nominate A Judge
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JudgeApplication;