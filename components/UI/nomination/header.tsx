import React from 'react';
import Image from 'next/image'; 
const EducationAward = () => {
  return (
    <div className="education-award bg-[url('/images/bg/back_.jpeg')] bg-cover bg-center pt-10 md:pt-8 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center min-h-[400px] md:min-h-[500px]">
      <div className="content max-w-full md:max-w-2xl mb-4 md:mb-0 md:pr-8 text-center md:text-left">
        <h1
          className="text-3xl md:text-4xl font-bold mb-3 leading-tight"
          style={{
            background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          New Education Standard Award: The Award Categories
        </h1>
        <p className="text-base md:text-lg text-white leading-relaxed">
          These are the 15 main categories to nominate your champions from, within them are subcategories showing levels of recognition.
        </p>
      </div>
      <div className="logo flex-shrink-0 w-48 h-48 md:w-80 md:h-80 md:-ml-20">
        <Image
          src="/images/leftlogo.png"
          alt="NESA Logo"
          width={256}
          height={256}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default EducationAward;
