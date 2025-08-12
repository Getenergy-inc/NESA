import Image from 'next/image';

interface AwardCategoryProps {
  title: string;
  description: string;
}

const categories = [
  { title: "Best NGO Contribution to Education in Nigeria", type:"competitive", description: "Celebrates nigeria NGO" },
  { title: "Best EduTech Organization (Africa)", type:"competitive", description: "Celebrates EDUTEch" },
  { title: "Best NGO Contribution to Achieving Education for All (Africa - Regional Competition)", type:"competitive", description: "Celebrates NGOs that have made significant improvements in educational access, quality, and innovations in Nigeria." },
  { title: "Best Corporate Social Responsibility (CSR) in Education (Nigeria)", type:"competitive", description: "Honoring CSR by banks, telecoms, and other sectors, showing commitment to educational development." },
  { title: "Best Corporate Social Responsibility (CSR) in Education (Africa - Regional Competition)", type:"competitive", description: "Honoring CSR" },
  { title: "Best Faith-Based Organization in Education", type:"non-competitive", description: "Honors faith-based organizations that significantly contributed to educational, moral, and community development." },
  { title: "Best Educational-Friendly State (Nigeria's Six Zones)", type:"non-competitive", description: "Acknowledges state governments demonstrating outstanding commitment and results in education from 2013 - 2024." },
  { title: "Best Library in Nigerian Tertiary Institutions", type:"non-competitive", description: "Awards the tertiary institution excelling in academic excellence, community engagement, and student support with ICT infrastructure." },
  { title: "Education In Schools", description: "Recognizes secondary schools for fostering innovation in education and student support with ICT infrastructure." },
  { title: "Best Research & Development Contribution by Institutes", type:"non-competitive", description: "Recognizes research institutes for their exceptional contributions to educational research and development in Nigeria." },
  { title: "Best Media Organization in Educational Advocacy (Nigeria)", type:"competitive", description: "Recognizes media for educational awareness and coverage, effectively amplifying educational issues and achievements." },
  { title: "Best International & Bilateral Contributors to Education", type:"non-competitive", description: "Honoring international sectors showing commitment to educational development through corporate social responsibility." },
  { title: "Nigerian Associations Abroad", description: "Celebrates the diaspora's contributions to supporting and enhancing education in Nigeria." },
  { title: "Best Political Leaders' Educational Support Services", description: "Honoring educational initiatives by lawmakers, for legislative efforts that significantly impact the education sector." },
  { title: "Africa Lifetime Education Icon Recognition", description: "Recognizing philanthropy and leadership for their outstanding contributions to education." },
  { title: "Creative Arts Industry Contribution to Education (Nigeria)", type:"competitive", description: "Celebrates arts organizations for enriching and diversifying educational experiences through creative initiatives." },
  { title: "Best STEM Education Champion", type:"non-competitive", description: "Awards tech-based and STEM initiatives for championing STEM education and technological advancements in learning." },
  { title: "Excellence in Promoting SDG 4 Achievement", description: "Recognizes efforts towards achieving SDG 4, for dedication to quality education under SDG 4." },
  { title: "Diaspora Contributions to Education in Africa", type:"non-competitive", description: "Recognizes efforts towards achieving SDG 4, for dedication to quality education under SDG 4." },

];

const AwardCategory: React.FC<AwardCategoryProps> = ({ title, description }) => (
  <div className="bg-[#191307] text-white p-2 rounded-3xl flex flex-col justify-between h-full">
    <div>
      <div className="w-full mb-2 p-4">
        <Image className='w-full' src="/images/nesa-card.png" alt="NESA Logo" width={250} height={0} />
      </div>
      <div className='p-2'>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm mb-4" style={{ whiteSpace: 'pre-line' }}>{description}</p>
      </div>
    </div>
    <div className='p-2'>
      <button className="w-full mt-auto bg-yellow-500 text-black py-2 px-4 rounded-lg font-medium">
        See Sub-Categories
      </button>
    </div>
  </div>
);

const AwardCategories = () => {
  return (
    <div className="bg-yellow-50 py-20"> {/* Increased top and bottom padding */}
      <div className="max-w-6xl mx-auto px-4">
        <div className='mb-12'> {/* Increased bottom margin */}
          <h2 className="text-3xl font-medium mb-2">The Blue Garnet Award Categories</h2>
          <div className="h-1 w-40 bg-[#E48900] rounded-xl"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <AwardCategory key={index} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwardCategories;
