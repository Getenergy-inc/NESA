import React from "react";
import { Scale, Users, Award, Shield, CheckCircle, Target, FileText, Heart } from "lucide-react";

const AboutOurJudges: React.FC = () => (
  <section className="max-w-6xl mx-auto my-12 bg-white rounded-xl shadow-lg p-8 md:p-12 text-gray-900">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#ea580c] flex items-center gap-2">
      <Scale className="w-8 h-8" /> About Our Judges – NESA-Africa 2025
    </h2>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">Welcome to the Council of Excellence</h3>
    <p className="mb-6 text-base md:text-lg">
      At the heart of the NESA-Africa 2025 Awards lies an elite panel of accomplished judges — thought leaders, educators, innovators, media professionals, NGO executives, CSR advocates, and public servants — collectively shaping the future of African education. These individuals are the gatekeepers of the continent’s most prestigious educational recognition system.
    </p>
    <p className="mb-8 text-base md:text-lg">
      Our judging model prioritizes transparency, multi-level evaluation, and excellence. Judges are assigned specific award categories and participate in rigorous nomination screening, verification, public voting oversight, and final selection of honorees.
    </p>

    {/* Who Are the Judges Section */}
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Users className="w-6 h-6 text-[#ea580c]" /> Who Are the Judges?
      </h3>
      <p className="mb-4 text-base md:text-lg">NESA-Africa Judges are respected professionals from:</p>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-[#ea580c]">
          <p className="font-semibold text-gray-800">🎓 Academic institutions and research bodies</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-[#ea580c]">
          <p className="font-semibold text-gray-800">🏛️ Education ministries and development agencies</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-[#ea580c]">
          <p className="font-semibold text-gray-800">🌍 International NGOs, CSR teams, and multilateral partners</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-[#ea580c]">
          <p className="font-semibold text-gray-800">📱 The diaspora, media, innovation, and youth advocacy spaces</p>
        </div>
      </div>
    </div>

    {/* Judging Responsibilities Section */}
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <FileText className="w-6 h-6 text-[#ea580c]" /> Judging Responsibilities
      </h3>
      <p className="mb-4 text-base md:text-lg">Judges are entrusted with:</p>
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <CheckCircle className="w-5 h-5 text-[#ea580c] mt-0.5 flex-shrink-0" />
          <p className="text-gray-800">Reviewing shortlisted nominees per category or subcategory</p>
        </div>
        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <CheckCircle className="w-5 h-5 text-[#ea580c] mt-0.5 flex-shrink-0" />
          <p className="text-gray-800">Scoring entries using transparent criteria</p>
        </div>
        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <CheckCircle className="w-5 h-5 text-[#ea580c] mt-0.5 flex-shrink-0" />
          <p className="text-gray-800">Participating in evaluation panels (in-person or virtual)</p>
        </div>
        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <CheckCircle className="w-5 h-5 text-[#ea580c] mt-0.5 flex-shrink-0" />
          <p className="text-gray-800">Collaborating with ambassadors, volunteers, and BOA members</p>
        </div>
        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <CheckCircle className="w-5 h-5 text-[#ea580c] mt-0.5 flex-shrink-0" />
          <p className="text-gray-800">Signing off on final award decisions (in part or full, depending on category)</p>
        </div>
      </div>
    </div>
    {/* Four Entry Paths Section */}
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Target className="w-6 h-6 text-[#ea580c]" /> Four Entry Paths to Become a Judge
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-lg font-bold text-blue-800">Individual Expert</h4>
          </div>
          <p className="text-blue-700 text-sm">Independent professionals applying personally based on their expertise and experience in education or related fields.</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-lg font-bold text-green-800">Partner Organization</h4>
          </div>
          <p className="text-green-700 text-sm">Representatives nominated by partner organizations, NGOs, or educational institutions as part of their commitment to educational excellence.</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-lg font-bold text-purple-800">Sponsor-Backed Judge</h4>
          </div>
          <p className="text-purple-700 text-sm">Professionals provided by official sponsors as part of their CSR engagement and commitment to African education development.</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#ea580c] rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-lg font-bold text-orange-800">Strategic Partner Institution</h4>
          </div>
          <p className="text-orange-700 text-sm">Experts from strategic partner institutions, government agencies, or international development organizations.</p>
        </div>
      </div>
    </div>

    {/* Voting Composition Section */}
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Scale className="w-6 h-6 text-[#ea580c]" /> Voting Composition & Weights
      </h3>
      <p className="mb-6 text-base md:text-lg">The NESA-Africa evaluation system ensures balanced and comprehensive assessment through weighted voting:</p>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center border border-blue-200">
          <div className="text-3xl font-bold text-blue-600 mb-2">40%</div>
          <h4 className="text-lg font-semibold text-blue-800 mb-2">Judges Panel</h4>
          <p className="text-blue-700 text-sm">Expert evaluation by certified NESA-Africa judges</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center border border-green-200">
          <div className="text-3xl font-bold text-green-600 mb-2">35%</div>
          <h4 className="text-lg font-semibold text-green-800 mb-2">Public Voting</h4>
          <p className="text-green-700 text-sm">Community engagement through transparent public voting</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center border border-purple-200">
          <div className="text-3xl font-bold text-purple-600 mb-2">25%</div>
          <h4 className="text-lg font-semibold text-purple-800 mb-2">BOA Decision</h4>
          <p className="text-purple-700 text-sm">Board of Advisors final assessment and validation</p>
        </div>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4 mt-8 flex items-center gap-2">
      <Heart className="w-6 h-6 text-[#ea580c]" /> Benefits of Serving as a Judge
    </h3>
    <ul className="list-none space-y-4 mb-8">
      <li className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border-l-4 border-[#ea580c]">
        <Award className="w-5 h-5 text-[#ea580c] mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-bold text-gray-800">1-Year Free Ambassador Status:</span>
          <p className="text-gray-700 text-sm mt-1">All approved judges receive an honorary NESA-Africa Ambassador Certificate and membership valued at $250, with only $50 administrative contribution.</p>
        </div>
      </li>
      <li className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border-l-4 border-[#ea580c]">
        <Users className="w-5 h-5 text-[#ea580c] mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-bold text-gray-800">International Recognition:</span>
          <p className="text-gray-700 text-sm mt-1">Be profiled on the official website, receive digital badges, and attend exclusive NESA events.</p>
        </div>
      </li>
      <li className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border-l-4 border-[#ea580c]">
        <Shield className="w-5 h-5 text-[#ea580c] mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-bold text-gray-800">VIP Networking:</span>
          <p className="text-gray-700 text-sm mt-1">Connect with policymakers, philanthropists, innovators, and education advocates across Africa and the Diaspora.</p>
        </div>
      </li>
      <li className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border-l-4 border-[#ea580c]">
        <FileText className="w-5 h-5 text-[#ea580c] mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-bold text-gray-800">Thought Leadership:</span>
          <p className="text-gray-700 text-sm mt-1">Participate in webinars, panels, and content features during the EduAid Africa Expo and Award Week (Oct 13–17, 2025).</p>
        </div>
      </li>
    </ul>

    {/* Evaluation Criteria Section */}
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Target className="w-6 h-6 text-[#ea580c]" /> Five Key Evaluation Criteria
      </h3>
      <p className="mb-6 text-base md:text-lg">All nominations are evaluated using these five comprehensive criteria:</p>
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border-l-4 border-blue-500">
          <h4 className="text-lg font-bold text-blue-800 mb-2">1. Impact & Results</h4>
          <p className="text-blue-700">Measurable outcomes and positive changes achieved in education or related fields.</p>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 border-l-4 border-green-500">
          <h4 className="text-lg font-bold text-green-800 mb-2">2. Innovation & Creativity</h4>
          <p className="text-green-700">Novel approaches, creative solutions, and pioneering methods in educational practice.</p>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 border-l-4 border-purple-500">
          <h4 className="text-lg font-bold text-purple-800 mb-2">3. Leadership & Influence</h4>
          <p className="text-purple-700">Demonstrated leadership capabilities and positive influence on others in the education sector.</p>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6 border-l-4 border-[#ea580c]">
          <h4 className="text-lg font-bold text-orange-800 mb-2">4. Sustainability & Scalability</h4>
          <p className="text-orange-700">Long-term viability and potential for replication or expansion of educational initiatives.</p>
        </div>
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6 border-l-4 border-red-500">
          <h4 className="text-lg font-bold text-red-800 mb-2">5. Community Engagement</h4>
          <p className="text-red-700">Active involvement with and positive impact on local communities and stakeholders.</p>
        </div>
      </div>
    </div>

    {/* Ethics and Integrity Section */}
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Shield className="w-6 h-6 text-[#ea580c]" /> Ethics & Integrity Requirements
      </h3>
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <p className="mb-4 text-base md:text-lg font-semibold text-red-800">All judges must commit to:</p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-red-700"><strong>Neutrality and Fairness:</strong> Maintain impartiality in all judging activities</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-red-700"><strong>Conflict Abstention:</strong> Abstain from voting in categories where personal or professional conflicts exist</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-red-700"><strong>Confidentiality:</strong> Maintain strict confidentiality of all judging materials and discussions</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-red-700"><strong>SCEF Compliance:</strong> Operate under SCEF compliance bylaws and integrity standards</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-red-700"><strong>Professional Conduct:</strong> Uphold the highest standards of professional behavior and ethics</p>
          </div>
        </div>
      </div>
    </div>

    {/* What We Look For Section */}
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Target className="w-6 h-6 text-[#ea580c]" /> What We Look For in Judges
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold mb-3 text-[#ea580c] flex items-center gap-2">
            <Award className="w-5 h-5" /> Academic & Professional Excellence
          </h4>
          <p className="text-gray-700">Advanced degrees, leadership roles, published research, or recognized expertise in education, policy, innovation, or related fields.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold mb-3 text-[#ea580c] flex items-center gap-2">
            <Users className="w-5 h-5" /> Pan-African Perspective
          </h4>
          <p className="text-gray-700">Understanding of African educational challenges, cultural contexts, and development priorities across the continent and diaspora.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold mb-3 text-[#ea580c] flex items-center gap-2">
            <Shield className="w-5 h-5" /> Integrity & Objectivity
          </h4>
          <p className="text-gray-700">Commitment to fair, unbiased evaluation and adherence to ethical standards in all judging activities.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold mb-3 text-[#ea580c] flex items-center gap-2">
            <Heart className="w-5 h-5" /> Collaborative Spirit
          </h4>
          <p className="text-gray-700">Ability to work effectively with diverse teams and contribute constructively to panel discussions and decisions.</p>
        </div>
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-4 mt-8 flex items-center gap-2">
      <Users className="w-6 h-6 text-[#ea580c]" /> Our Esteemed Judges (Select Profiles)
    </h3>
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#ea580c] rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-[#ea580c] text-lg">Mr. Benneth Osarieme Ogbeiwi</p>
            <p className="text-sm font-semibold text-orange-700">Music & Arts Educator</p>
          </div>
        </div>
        <p className="text-gray-700 text-sm">With over two decades of excellence in arts education, Benneth is known for his commanding leadership and high-performance standards.</p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-blue-600 text-lg">Dr. Juliet Ihiabe</p>
            <p className="text-sm font-semibold text-blue-700">Public Health & Community Mobilization</p>
          </div>
        </div>
        <p className="text-gray-700 text-sm">Championing access to education through health interventions, especially for women and children in underserved areas.</p>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-green-600 text-lg">Damilola Omotosho</p>
            <p className="text-sm font-semibold text-green-700">HSEQ Implementation & ESG Consultant</p>
          </div>
        </div>
        <p className="text-gray-700 text-sm">Sustainability advocate and Cambridge-certified professional influencing energy transition literacy and corporate ESG frameworks in Africa.</p>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-purple-600 text-lg">Paul Kayode Joash</p>
            <p className="text-sm font-semibold text-purple-700">Transformation Coach & Media Strategist</p>
          </div>
        </div>
        <p className="text-gray-700 text-sm">A prolific speaker and founder of MyDoubleDouble, Paul bridges education with performance coaching and motivation across continents.</p>
      </div>

      <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-6 border border-pink-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-pink-600 text-lg">Oluwadaisi Patricia Aderibigbe Santos</p>
            <p className="text-sm font-semibold text-pink-700">Veteran Educationalist</p>
          </div>
        </div>
        <p className="text-gray-700 text-sm">A trailblazer in women-led educational reform and a pillar of early childhood learning advocacy across Nigeria.</p>
      </div>
    </div>
    {/* Judges Composition Section */}
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Scale className="w-6 h-6 text-[#ea580c]" /> Judges Composition & Role Breakdown
      </h3>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#ea580c] to-orange-600 text-white p-4">
          <div className="grid grid-cols-2 gap-4 font-semibold">
            <div>Category</div>
            <div>Number of Judges</div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="grid grid-cols-2 gap-4 p-4 hover:bg-gray-50 transition-colors">
            <div className="text-gray-800">Competitive (e.g. EduTech, CSR, Creative Arts)</div>
            <div className="font-semibold text-[#ea580c]">52</div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 hover:bg-gray-50 transition-colors">
            <div className="text-gray-800">Non-Competitive (e.g. Policy Support, Faith-Based, Bilateral Institutions)</div>
            <div className="font-semibold text-[#ea580c]">36</div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 hover:bg-gray-50 transition-colors">
            <div className="text-gray-800">Special Category: Africa Lifetime Education Icon</div>
            <div className="font-semibold text-[#ea580c]">3</div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 bg-orange-50 border-t-2 border-[#ea580c]">
            <div className="font-bold text-gray-900">Total</div>
            <div className="font-bold text-[#ea580c] text-lg">91</div>
          </div>
        </div>
      </div>
    </div>
    {/* Call to Action Section */}
    <div className="bg-gradient-to-r from-[#ea580c] to-orange-600 rounded-xl p-8 text-white text-center">
      <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
        <Users className="w-6 h-6" /> Join the Judging Council
      </h3>
      <p className="mb-6 text-orange-100 max-w-3xl mx-auto">
        We welcome professionals, CSR leads, education experts, and global partners to apply or nominate judges for the NESA-Africa 2025 Awards.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        <a
          href="/judge-application-form"
          className="bg-white text-[#ea580c] px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-orange-50 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Scale className="w-5 h-5" />
          Apply to Judge
        </a>
        <a
          href="/Judgesnominate"
          className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#ea580c] transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Users className="w-5 h-5" />
          Nominate a Judge
        </a>
      </div>

      <div className="space-y-2 text-orange-100">
        <div className="flex items-center justify-center gap-2">
          <Target className="w-4 h-4" />
          <span className="text-sm">Application Period: <span className="font-semibold text-white">June 10 - July 15, 2025</span></span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <FileText className="w-4 h-4" />
          <span className="text-sm">Visit: <a href="https://www.nesa.africa" className="text-white underline hover:text-orange-200 transition-colors">www.nesa.africa</a></span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Users className="w-4 h-4" />
          <span className="text-sm">Contact: <a href="mailto:nesa.africa@gmail.com" className="text-white underline hover:text-orange-200 transition-colors">nesa.africa@gmail.com</a></span>
        </div>
      </div>
    </div>
  </section>
);

export default AboutOurJudges;
