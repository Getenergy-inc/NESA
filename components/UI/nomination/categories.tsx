"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface AwardCategoryProps {
  title: string;
  description: string;
  isFullWidth?: boolean;
  subCategoryPath: string;
}

const AwardCategory: React.FC<AwardCategoryProps> = ({ title, description, isFullWidth = false, subCategoryPath }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(subCategoryPath);
  };

  return (
    <div className={`bg-[#191307] text-white p-6 rounded-3xl flex flex-col ${isFullWidth ? 'col-span-full md:flex-row' : ''} h-full min-h-[350px] border`}>
      <div className={`flex items-center ${isFullWidth ? 'md:mr-4 md:p-4 md:w-1/3' : ''} mb-4`}>
        <Image 
          src="/images/nesa-card2.png" 
          alt="NESA AFRICA logo" 
          width={isFullWidth ? 800 : 600} 
          height={isFullWidth ? 800 : 600} 
          className="w-full h-auto object-contain"
        />
      </div>
      <div className={`flex flex-col justify-between ${isFullWidth ? 'md:w-2/3' : 'w-full'} flex-1`}>
        <div>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-sm mb-4">{description}</p>
        </div>
        <div className="mt-auto">
          <button
            onClick={handleButtonClick}
            className="text-black px-6 py-2 rounded-full text-sm font-bold w-full"
            style={{background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)'}}
          >
            See Sub-Categories
          </button>
        </div>
      </div>
    </div>
  );
};

const NominationGuide: React.FC = () => (
  <div className="p-6 mb-12">
    <h2 className="text-2xl font-bold mb-6 relative inline-block">
      How to Nominate Your Champion
      <span className="absolute -bottom-1 left-0 right-[7.5em] h-1" style={{
        borderBottom: '5px solid',
        borderImage: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%) 1'
      }}></span>
    </h2>
    <ul className="space-y-2">
      {[
        'Visit NESA AFRICA or Santos Creations Educational Foundation.',
        'Choose your preferred award category, which usually has subcategories',
        'Submit the details of your nominee (name, Organization and contact details)',
        'Provide a brief description of the nominee’s qualifications and achievements.',
        'Upload any supporting documents that support the nomination (e.g., testimonials, reports, certificates...)',
        'Submit your nominations, review every information before submission',
        'Wait for an on-screen confirmation message acknowledging successful nomination'
      ].map((item, index) => (
        <li key={index} className="flex items-center">
          <span className="w-4 h-4 rounded-full mr-3 flex-shrink-0" style={{background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)'}}></span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

interface Category {
  title: string;
  description: string;
  subCategoryPath: string;
}

const BlueGarnetAwards: React.FC = () => {
  const categories: Category[] = [
    {
      title: "Africa Lifetime Education Icon Special Recognition Award",
      description: "The Africa Lifetime Education Icon Special Recognition Award is the pinnacle of the NESA-Africa awards and the Santos Creations Educational Foundation. Envisioned as the Africa education advocacy Nobel award recognition, this prestigious accolade honors individuals from around the world who have dedicated their lives to advancing sustainable education for all in Africa, aligning with the United Nations Sustainable Development Goal 4 (SDG 4) - Quality Education.",
      subCategoryPath: "/nomination/sub-categories/africa-lifetime-education-icon"
    },
    {
      title: "The Overall Best NGO Contribution to Achieving Education for All in Nigeria 2024",
      description: "Celebrates NGOs that have made significant improvements in educational access, quality, and innovation from 2013-2024.",
      subCategoryPath: "/nomination/sub-categories/best-ngo-contribution"
    },
    {
      title: "Africa Diaspora association Educational Impact Projects Recognition Award in Africa",
      description: "Honoring the significant contributions made by diaspora organizations towards achieving \"Education for all\" across the African Continent.",
      subCategoryPath: "/nomination/sub-categories/africa-diaspora-impact"
    },
    {
      title: "The Overall Best CSR for Education in Nigeria Award 2024",
      description: "Honoring corporate social responsibility by banks, telecommunications, and other sectors, and showing their impactful CSR initiatives that have ...",
      subCategoryPath: "/nomination/sub-categories/best-csr-education"
    },
    {
      title: "CSR for Education special recognition award in Africa 2024",
      description: "Recognize the most outstanding educational technology companies that have made significant contributions to advancing education in Africa through...",
      subCategoryPath: "/nomination/sub-categories/csr-education-africa"
    },
    {
      title: "Best EduTech Organization in Nigeria and Africa 2024",
      description: "Acknowledges state governments that have demonstrated exemplary commitment and results in advancing education from 2013-2024.",
      subCategoryPath: "/nomination/sub-categories/best-edutech-organization"
    },
    {
      title: "Overall best educational friendly state in Nigeria 2024",
      description: "Awards the tertiary institution that stands out in academic excellence, community engagement, and student support with notable ICT infrastructure.",
      subCategoryPath: "/nomination/sub-categories/best-educational-state"
    },
    {
      title: "The best library in Nigerian tertiary institutions award 2024",
      description: "Recognizes libraries that have made exceptional contributions and excellence to educational research and innovation, thus shaping future educational strategies.",
      subCategoryPath: "/nomination/sub-categories/best-library"
    },
    {
      title: "The Overall Best Research and Development Contribution by Tertiary Institutions in Nigeria",
      description: "Recognizing media role in educational awareness and innovation. Awards media houses and organizations that effectively contribute to educational development.",
      subCategoryPath: "/nomination/sub-categories/best-research-development"
    },
    {
      title: "The Overall Best Media Organization in Nigeria with Outstanding Education Focus",
      description: "Honors exceptional media/news award programs for educational collaborations and contributes to Nigeria educational development.",
      subCategoryPath: "/nomination/sub-categories/best-media-organization"
    },
    {
      title: "Overall Best Global Education Excellence Award for Facilitating the Achievement of Education for All in Nigeria (2020-2024)",
      description: "Honoring international bodies for their impactful cooperative efforts that significantly impact the educational sector.",
      subCategoryPath: "/nomination/sub-categories/international-contributors"
    },
    {
      title: "Christian faith organization Educational Champion of the Decade Award",
      description: "Recognizing Christian faith-based organizations for their outstanding contributions to education advancement.",
      subCategoryPath: "/nomination/sub-categories/christian-education-champion"
    },
    {
      title: "Islamic faith organization Educational Champion of the Decade Award in Nigeria (2013-2024)",
      description: "Celebrating Islamic faith-based organizations for their crucial role in advancing and diversifying educational opportunities.",
      subCategoryPath: "/nomination/sub-categories/islamic-education-champion"
    },
    {
      title: "Recognition for the best educational support by a Political leaders in Nigeria 2024",
      description: "Award for both state and federal government officials who have championed STEM education and technological advancement in learning.",
      subCategoryPath: "/nomination/sub-categories/best-political-leader"
    },
    {
      title: "Creative arts Industry contribution to education in Nigeria 2024",
      description: "Recognizing efforts towards advancing education through creative arts and dedication to achieving quality education under SDG 4 objectives.",
      subCategoryPath: "/nomination/sub-categories/creative-arts-contribution"
    },
    {
      title: "Support for education in STEM in Nigeria 2024",
      description: "Celebrating initiatives by any organization for creative arts role in education and promoting hands-on learning experiences.",
      subCategoryPath: "/nomination/sub-categories/support-stem-education"
    }
  ];

  return (
    <div className="bg-[#FFF5E0] min-h-screen p-8">
      <NominationGuide />
      
      <h2 className="text-3xl font-bold mb-8 text-center relative inline-block">
        The Blue Garnet Award Categories
        <span className="absolute -bottom-2 left-[2.5em] right-[2em] h-1 w-auto" style={{
          borderBottom: '5px solid',
          borderImage: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%) 1'
        }}></span>
      </h2>
      
      <div className="space-y-6">
        <AwardCategory 
          title={categories[0].title}
          description={categories[0].description}
          isFullWidth={true}
          subCategoryPath={categories[0].subCategoryPath}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(1).map((category, index) => (
            <AwardCategory 
              key={index} 
              title={category.title} 
              description={category.description} 
              subCategoryPath={category.subCategoryPath}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlueGarnetAwards;