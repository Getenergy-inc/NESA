"use client";
import Image from "next/image";
import Link from "next/link";

const JudgeNominationHeader = () => {
  return (
    <div className="relative min-h-screen bg-black bg-opacity-50 text-white flex flex-col items-center justify-center">
      {/* Background Image - Add your background image if needed */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <Image 
          src="/images/schoolboy.png" 
          alt="Background" 
          fill 
          className="object-cover opacity-50" 
          priority
        />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-32">
        <div className="max-w-4xl">
            <h1 
            className="text-2xl md:text-3xl font-semibold mb-8" 
            style={{
              background: "linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
            >
            New Education Standard Award: Judge Nomination
            </h1>
          
          <p className="text-white text-lg md:text-lg leading-relaxed mb-8">
            Nominate a judge for the New Education Standard Awards Africa and help
            recognize excellence in education across the continent. We're looking for
            experienced and passionate individuals with expertise in leadership, and the
            ability to evaluate submissions thoughtfully. By nominating a judge, you'll play
            a key role in celebrating impactful initiatives and shaping the future of African
            education.
          </p>
          
        </div>
      </main>
    </div>
  );
};

export default JudgeNominationHeader;