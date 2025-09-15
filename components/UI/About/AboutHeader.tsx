import Image from "next/image";
import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";



const AboutHeader2 = () => {
  return (
<section className="bg-white py-12 px-4 sm:px-8 md:px-16 lg:px-32 rounded-2xl shadow mb-12">
  <div className="max-w-4xl mx-auto space-y-8">
    <div className="flex items-center gap-4 mb-2">
      <span className="text-3xl">🏆</span>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#181A20]">About Us – NESA Africa</h1>
    </div>
    <p className="text-lg font-medium text-[#FFC247]">Recognizing Excellence. Driving Educational Innovation. Advancing Africa’s Sustainable Future.</p>
    <div>
      <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><span>🌍</span> Introduction</h2>
      <p className="text-base leading-relaxed">
        The New Education Standard Award Africa (NESA-Africa) is a landmark initiative dedicated to celebrating excellence, innovation, and impactful change in the African education sector. Rooted in the principles of social impact, sustainability, and continental development, NESA-Africa empowers educators, governments, organizations, and institutions transforming education systems across Africa.<br /><br />
        Conceived in 2010 as the Stakeholders Education Standard Award, the idea evolved over a decade of reflection and improvement. It was rebranded in 2023 as NESA-Africa and now launches its inaugural edition on December 13, 2025 under the stewardship of the Santos Creations Educational Foundation (SCEF).<br /><br />
        Aligned with UN Sustainable Development Goal 4 (SDG 4) and Africa Union Agenda 2063, NESA-Africa is more than an award—it is a movement for educational justice, inclusion, equity, and development.
      </p>
    </div>
    <div>
      <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><span>🎯</span> Mission</h2>
      <p className="text-base leading-relaxed">
        To accelerate Africa’s educational transformation through strategic recognition of excellence, digital innovation, and sustainable collaboration, aligning all activities with the global SDGs and African continental goals.
      </p>
    </div>
    <div>
      <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><span>🌟</span> Vision (2030)</h2>
      <p className="text-base leading-relaxed">
        To be Africa’s leading education award and change platform, mobilizing public-private investments, amplifying innovative educational models, and ensuring equitable access to quality learning—reaching every child and youth across Africa.
      </p>
    </div>
    <div>
      <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><span>🌐</span> Strategic Alignment</h2>
      <div className="mb-2">
        <span className="font-semibold">✅ UN Sustainable Development Goals (SDGs)</span>
        <ul className="list-disc ml-6 text-base">
          <li>SDG 4 – Quality Education: Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.</li>
          <li>SDG 5 – Gender Equality: Promote girls’ education through award focus areas and scholarship programs.</li>
          <li>SDG 9 – Innovation & Infrastructure: Encourage STEM, EdTech, and vocational excellence.</li>
          <li>SDG 17 – Partnerships for the Goals: Leverage multi-sector partnerships for education financing and advocacy.</li>
        </ul>
      </div>
      <div>
        <span className="font-semibold">🌍 Africa Union Agenda 2063</span>
        <ul className="list-disc ml-6 text-base">
          <li>Aspiration 1: A prosperous Africa based on inclusive growth and sustainable development.</li>
          <li>Goal 2: Well-educated citizens and a skills revolution underpinned by science, technology, and innovation.</li>
          <li>Goal 17: Full gender equality in all spheres of life—including education.</li>
          <li>Goal 18: Engaged and empowered youth and children.</li>
        </ul>
      </div>
    </div>
    <div>
      <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><span>📈</span> SMART Goals (2025–2030)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="font-semibold">🎯 Specific</span>
          <ul className="list-disc ml-6 text-base">
            <li>Recognize 100+ changemakers in education annually.</li>
            <li>Facilitate over $10 million in scholarships by 2027.</li>
            <li>Establish sustainable education hubs in 5 regions by 2029.</li>
            <li>Institutionalize awards in diaspora and bilateral partner territories.</li>
          </ul>
        </div>
        <div>
          <span className="font-semibold">📊 Measurable</span>
          <ul className="list-disc ml-6 text-base">
            <li>Reach 500,000+ digital engagements yearly.</li>
            <li>Empower 50,000+ learners through scholarships and CSR.</li>
            <li>Track 20% annual growth in nominations, votes, and partnerships.</li>
          </ul>
        </div>
        <div>
          <span className="font-semibold">⚙️ Achievable</span>
          <ul className="list-disc ml-6 text-base">
            <li>Establish NESA-Africa chapters in 54 African countries and 25 diaspora zones.</li>
            <li>Integrate AI for impact tracking and award evaluation.</li>
            <li>Launch multilingual voter and nominee platforms for inclusion.</li>
          </ul>
        </div>
        <div>
          <span className="font-semibold">🧩 Relevant</span>
          <ul className="list-disc ml-6 text-base">
            <li>Tied to SDG 4 and Agenda 2063 education priorities.</li>
            <li>Inclusive of marginalized groups, rural learners, women, and youth.</li>
            <li>Promotes education-led community transformation via local chapters.</li>
          </ul>
        </div>
        <div>
          <span className="font-semibold">📅 Time-Bound</span>
          <ul className="list-disc ml-6 text-base">
            <li>2025: Inaugural event and scholarship pilot.</li>
            <li>2026–2028: Continental rollout and program scaling.</li>
            <li>2029–2030: Consolidation into Africa’s premier education sustainability hub.</li>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><span>🏅</span> Award Structure</h2>
      <ul className="list-decimal ml-6 text-base">
        <li><b>Africa Icon Blue Garnet Award</b><br />Non-competitive lifetime recognition for education trailblazers across Africa.</li>
        <li><b>Blue Garnet & Gold Certificate Awards</b><br />Competitive public and judge-reviewed awards across 8 categories and 101 subcategories.<br />Supports CSR, STEM, EdTech, Policy Advocacy, and Educational Media.</li>
        <li><b>Platinum Certificate of Recognition Awards</b><br />Non-competitive institutional honors for policy-makers, governments, global partners, and CSR champions.</li>
      </ul>
    </div>
    <div>
      <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><span>📚</span> Social Impact Strategy</h2>
      <ul className="list-disc ml-6 text-base">
        <li>🌱 Scholarships & AGC Voting – Every vote powers a child’s education through the AfriGold Coin (AGC).</li>
        <li>🤝 Local Chapters – Community-run NESA chapters drive grassroots engagement, school rebuilding, teacher support, and data collection.</li>
        <li>📡 NESA TV & It’s In Me Radio – Broadcasting real-time education transformation and community voices across Africa.</li>
        <li>💡 Ambassadors & Diaspora Agents – Mobilizing diaspora and youth as changemakers, mentors, and funders.</li>
        <li>📘 EduAid-Africa Expo & Webinar Series – Creating policy spaces and learning exchanges across 54+ countries.</li>
      </ul>
    </div>
    <div>
      <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><span>🗺️</span> Roadmap to 2030</h2>
      <table className="w-full text-left border border-gray-200 rounded overflow-hidden mb-4">
        <thead className="bg-[#FFF9ED]">
          <tr>
            <th className="py-2 px-4 font-semibold">Year</th>
            <th className="py-2 px-4 font-semibold">Milestone</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="py-2 px-4">2025</td><td className="py-2 px-4">First NESA-Africa awards, AGC wallet launch, and pilot scholarships</td></tr>
          <tr><td className="py-2 px-4">2026</td><td className="py-2 px-4">East & Southern Africa integration; diaspora partner activation</td></tr>
          <tr><td className="py-2 px-4">2027</td><td className="py-2 px-4">Full Africa-wide hosting rotation begins; CSR fund expands</td></tr>
          <tr><td className="py-2 px-4">2028</td><td className="py-2 px-4">AI-powered impact evaluation and award certification system</td></tr>
          <tr><td className="py-2 px-4">2029</td><td className="py-2 px-4">NESA-led policy coalitions on funding, STEM, and early childhood</td></tr>
          <tr><td className="py-2 px-4">2030</td><td className="py-2 px-4">1 million learners reached; 100,000 scholarships issued; 1,000 awardees recognized continentally</td></tr>
        </tbody>
      </table>
    </div>
    <div>
      <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><span>🙌</span> Join the Movement</h2>
      <ul className="list-disc ml-6 text-base">
        <li>✅ <span className="font-semibold">Nominate a Champion</span></li>
        <li>✅ <span className="font-semibold">Vote & Support with AGC</span></li>
        <li>✅ <span className="font-semibold">Become a Sponsor</span></li>
        <li>✅ <span className="font-semibold">Apply as Judge or Ambassador</span></li>
        <li>✅ <span className="font-semibold">Join/Lead a Local Chapter</span></li>
        <li>✅ <span className="font-semibold">Watch NESA TV & Webinars</span></li>
      </ul>
    </div>
    <div>
      <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><span>📬</span> Contact</h2>
      <p className="text-base">
        <b>Email:</b> info@nesa.africa<br />
        <b>Host:</b> Santos Creations Educational Foundation (SCEF)<br />
        <b>Phone:</b> +234 805 667 7770<br />
        <b>Address:</b> 19 Godwin Okigbo Street, Marsha Kilo, Surulere, Lagos, Nigeria
      </p>
    </div>
  </div>
</section>
  );
};

export default AboutHeader2;
