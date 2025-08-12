import React from "react";

const CompetitiveCategoriesOverview: React.FC = () => (
  <section className="max-w-4xl mx-auto my-12 bg-white rounded-xl shadow-lg p-8 md:p-12 text-gray-900">
    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primaryGold">The 8 Competitive Blue Garnet Award Categories</h2>
    <p className="mb-6 text-base md:text-lg">
      (Each includes 8–15 sub-categories contributing to 101 total Gold Certificate recognitions)
    </p>
    <ol className="list-decimal pl-6 mb-8 space-y-6">
      <li>
        <span className="font-semibold">Best Media Organization in Educational Advocacy (Africa)</span>
        <p className="text-gray-700">Awarded to media platforms—broadcast, print, digital, or social—that are transforming educational dialogue and public awareness across Africa.</p>
        <span className="block text-primaryGold font-medium mt-1">Gold Sub-Categories:</span>
        <p className="text-sm text-gray-600">e.g. Best Education Radio Program, Best Digital Education Blog, Best Education Influencer, Best Youth-Led Advocacy Channel, etc.</p>
      </li>
      <li>
        <span className="font-semibold">Best Corporate Social Responsibility (CSR) in Education (Africa)</span>
        <p className="text-gray-700">Recognizes regional corporations executing high-impact CSR programs that empower education systems.</p>
        <span className="block text-primaryGold font-medium mt-1">Gold Sub-Categories:</span>
        <p className="text-sm text-gray-600">e.g. Best CSR in School Infrastructure, CSR in Scholarships, CSR in Girls' Education, CSR in Tech Integration, etc.</p>
      </li>
      <li>
        <span className="font-semibold">Best NGO Contribution to Achieving Education for All (Africa)</span>
        <p className="text-gray-700">Honors African NGOs working at scale or with innovative models to achieve inclusive education.</p>
        <span className="block text-primaryGold font-medium mt-1">Gold Sub-Categories:</span>
        <p className="text-sm text-gray-600">e.g. Best NGO in Rural Education, Girls’ Education, Refugee Learning, Disability Support, Teacher Training, etc.</p>
      </li>
      <li>
        <span className="font-semibold">Best Creative Arts Industry Contribution to Education (Nigeria)</span>
        <p className="text-gray-700">Targets creatives (film, music, poetry, art) using their talents to push educational narratives and impact.</p>
        <span className="block text-primaryGold font-medium mt-1">Gold Sub-Categories:</span>
        <p className="text-sm text-gray-600">e.g. Best Educational Music Content, Educational Film, Visual Arts for Learning, Creative Writing for Schools, etc.</p>
      </li>
      <li>
        <span className="font-semibold">Best EduTech Organization (Africa)</span>
        <p className="text-gray-700">Awarded to companies using technology to improve access, engagement, and outcomes in education.</p>
        <span className="block text-primaryGold font-medium mt-1">Gold Sub-Categories:</span>
        <p className="text-sm text-gray-600">e.g. Best Learning App, Best AI EdTech Tool, Low-Cost Digital Solution, EdTech for Inclusive Learning, etc.</p>
      </li>
      <li>
        <span className="font-semibold">Best NGO Contribution to Education (Nigeria)</span>
        <p className="text-gray-700">Focuses on grassroots Nigerian NGOs solving learning access, equity, and system challenges.</p>
        <span className="block text-primaryGold font-medium mt-1">Gold Sub-Categories:</span>
        <p className="text-sm text-gray-600">e.g. Literacy Campaigns, Mobile Learning, Early Childhood Education, Girls’ Safety & Schooling, etc.</p>
      </li>
      <li>
        <span className="font-semibold">Best Corporate Social Responsibility (CSR) in Education (Nigeria)</span>
        <p className="text-gray-700">Nigerian companies with impactful, measurable CSR contributions to the education sector.</p>
        <span className="block text-primaryGold font-medium mt-1">Gold Sub-Categories:</span>
        <p className="text-sm text-gray-600">e.g. Best CSR in Teachers’ Welfare, Education for Out-of-School Children, School Feeding, EdTech Support, etc.</p>
      </li>
      <li>
        <span className="font-semibold">Best STEM Education Program (Africa)</span>
        <p className="text-gray-700">A new category highlighting outstanding programs or initiatives advancing Science, Tech, Engineering, and Math education across Africa.</p>
        <span className="block text-primaryGold font-medium mt-1">Gold Sub-Categories:</span>
        <p className="text-sm text-gray-600">e.g. STEM for Girls, Rural STEM Labs, Robotics in Schools, Coding Bootcamps for Youth, Math Education Projects, etc.</p>
      </li>
    </ol>
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2">Award Structure Summary</h3>
      <table className="w-full text-left mb-4">
        <thead>
          <tr>
            <th className="py-2 pr-4 font-semibold">Award Tier</th>
            <th className="py-2 pr-4 font-semibold">Recognition</th>
            <th className="py-2 font-semibold">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 pr-4">Gold Certificate</td>
            <td className="py-2 pr-4">Sub-category level excellence</td>
            <td className="py-2">101</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">Blue Garnet Award</td>
            <td className="py-2 pr-4">Overall winner per major category</td>
            <td className="py-2">8</td>
          </tr>
          <tr>
            <td className="py-2 pr-4 font-semibold">Total Competitive Winners</td>
            <td className="py-2 pr-4"></td>
            <td className="py-2 font-semibold">109</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2">Selection & Voting Logic</h3>
      <ul className="list-disc pl-6 mb-2">
        <li>Nomination Period: <span className="font-semibold">July 15 – September 30, 2025</span></li>
        <li>Gold Certificate Voting: <span className="font-semibold">October 1 – November 10, 2025</span></li>
        <li>Blue Garnet Final Voting: <span className="font-semibold">November 15 – December 10, 2025</span></li>
      </ul>
      <h4 className="text-lg font-semibold mt-4 mb-1">Voting Weight Distribution:</h4>
      <ul className="list-disc pl-6 mb-4">
        <li>Judges – 30%</li>
        <li>Public – 60% (via AfriGold Coins – AGC)</li>
        <li>Sponsors – 7%</li>
        <li>Staff & Volunteers – 3%</li>
      </ul>
      <p className="text-sm text-gray-600">All participation, certificates, and results are tracked and accessible via the GFA Wallet. The awards framework upholds transparency and inclusion while ensuring that only verified changemakers advance to the final stage.</p>
    </div>
  </section>
);

export default CompetitiveCategoriesOverview;
