// WhyDonationMatters.jsx
import React from "react";
import Image from "next/image";

const WhyDonationMatters = () => {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl text-1g font-semibold text-center mb-16">Why your donation Matters</h2>
      
      {/* First item - kids education */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="w-full md:w-1/2">
          <div className="rounded-lg overflow-hidden">
            <Image 
              src="/images/whydonate/whydonate1.png" 
              alt="Children learning in an outdoor classroom in Africa" 
              width={600} 
              height={400} 
              className="w-full h-auto"
            />
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-semibold mb-4">
            Helping kids in underdeveloped and war-affected countries in Africa get access to quality education
          </h3>
          <p className="mb-4">
            Every child deserves the chance to learn, dream, and build a better future, but for millions of
            children in underdeveloped and war-affected regions of Africa, quality education is still out
            of reach. Conflict, poverty, and lack of infrastructure continue to rob young minds of the
            opportunities they deserve.
          </p>
          <p className="mb-4">Your donations help change that.</p>
          <p>
            With every contribution, you're not just giving money, you're giving hope. You're helping to
            rebuild schools destroyed by war, providing learning materials, training teachers, and
            supporting safe spaces where children can learn and grow. You're turning classrooms into
            sanctuaries of possibility.
          </p>
        </div>
      </div>
      
      {/* Second item - undergraduates */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16">
        <div className="w-full md:w-1/2">
          <div className="rounded-lg overflow-hidden">
            <Image 
              src="/images/whydonate/whydonate2.png" 
              alt="Graduating students in Africa celebrating" 
              width={600} 
              height={400} 
              className="w-full h-auto"
            />
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-semibold mb-4">
            Supporting undergraduates in Africa in getting quality and accessible college education
          </h3>
          <p className="mb-4">
            Many bright young minds across Africa are held back from attending college due to
            financial hardship and limited access to quality education.
          </p>
          <p className="mb-4">Your donation helps break those barriers.</p>
          <p className="mb-4">
            With your support, we provide scholarships, learning resources, and mentorship to
            undergraduates who need it most. Every contribution brings a student closer to their
            dreams — and closer to changing their communities for the better.
          </p>
          <p>Together, we're opening doors to a future full of possibilities.</p>
        </div>
      </div>
      
      {/* Third item - research */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2">
          <div className="rounded-lg overflow-hidden">
            <Image 
              src="/images/whydonate/whydonate3.png" 
              alt="African student conducting research in a library" 
              width={600} 
              height={400} 
              className="w-full h-auto"
            />
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-semibold mb-4">
            Funding researches that contributes to the improvement of education curriculum and standards in Africa
          </h3>
          <p className="mb-4">
            Improving education in Africa starts with understanding what truly works for our students,
            communities, and future. Unfortunately, research that could transform outdated curricula
            and raise education standards often goes underfunded and overlooked.
          </p>
          <p className="mb-4">Your donation helps bridge that gap.</p>
          <p>
            By supporting locally-led research, you're empowering educators and scholars to develop
            solutions that reflect the real needs of African students. You're helping shape curriculums
            that are relevant, inclusive, and future-focused.
          </p>


          
        </div>
        
      </div>


      
    </section>
  );
};

export default WhyDonationMatters;