/**
 * Award Categories and Subcategories Configuration
 * This is the single source of truth for all award categories across the application
 */

export interface Subcategory {
  value: string;
  label: string;
}

export interface AwardCategory {
  value: string;
  label: string;
  superCategory: string;
  subcategories: Subcategory[];
}

export const SUPER_AWARD_CATEGORIES = [
  { value: "africa-icon-blue-garnet", label: "Africa Icon Blue Garnet Award" },
  {
    value: "blue-garnet-gold-certificate",
    label: "Blue Garnet & Gold Certificate Awards",
  },
  {
    value: "platinum-certificate",
    label: "Platinum Certificate of Recognition Awards",
  },
];

export const AWARD_CATEGORIES: AwardCategory[] = [
  {
    value: "africa-lifetime-education-icon",
    label: "Africa Lifetime Education Icon Special Recognition Award",
    superCategory: "africa-icon-blue-garnet",
    subcategories: [
      {
        value: "africa-education-philanthropy-icon",
        label: "Africa Education Philanthropy Icon",
      },
      {
        value: "literary-new-curriculum-advocate",
        label: "Literary & New Curriculum Advocate",
      },
      {
        value: "africa-technical-educator-icon",
        label: "Africa Technical Educator Icon",
      },
    ],
  },
  {
    value: "best-ngo-contribution",
    label:
      "Best NGO Contribution to Achieving Education for All in Nigeria 2024",
    superCategory: "blue-garnet-gold-certificate",
    subcategories: [
      // {
      //   value: "overall-best-ngo",
      //   label:
      //     "The Overall Best NGO Contribution to Achieving Education for All in Nigeria 2024",
      // },
      {
        value: "best-educational-infrastructure",
        label:
          "Best Educational Infrastructure Initiative By An NGO In Nigeria",
      },
      {
        value: "exceptional-donation-materials",
        label:
          "Exceptional Donation Of Educational Materials By An NGO In Nigeria",
      },
      {
        value: "outstanding-donation-aid",
        label: "Outstanding Donation Of Education Aid By NGO In Nigeria",
      },
      {
        value: "youth-empowerment",
        label:
          "Youth Empowerment Through Educational Services by an NGO in Nigeria",
      },
      {
        value: "women-girls-empowerment",
        label: "Women and Girls' Empowerment in Education by an NGO in Nigeria",
      },
    ],
  },

  {
    value: "africa-diaspora-impact",
    label:
      "Africa Diaspora Association Educational Impact Projects Recognition Award in Africa",
    superCategory: "platinum-certificate",
    subcategories: [
      {
        value: "diaspora-infrastructure",
        label: "The Best Diaspora-Led Educational Infrastructure.",
      },
      {
        value: "diaspora-program-innovation",
        label: "The Best Diaspora-Led Educational Program Innovation",
      },
      {
        value: "diaspora-teacher-training",
        label: "The Best Diaspora-Led Teacher Training and Support Initiative.",
      },
    ],
  },
  {
    value: "best-csr-education",
    label: "Best CSR in Education (Africa – Regional)",
    superCategory: "blue-garnet-gold-certificate",
    subcategories: [
      // {
      //   value: "overall-best-csr",
      //   label:
      //     "The Overall Best Corporate Social Responsibility (CSR) for Education in Nigeria Award",
      // },
      {
        value: "banking-finance-csr",
        label: "Banking And Finance CSR in Education Award",
      },
      {
        value: "telecommunications-csr",
        label: "Telecommunications CSR in Education Award",
      },
      {
        value: "technology-ict-csr",
        label: "Best Technology and ICT CSR in Education",
      },
      {
        value: "manufacturing-industrial-csr",
        label: "Manufacturing And Industrial CSR in Education",
      },
      {
        value: "agriculture-agribusiness-csr",
        label: "Agriculture And Agribusiness CSR in Education",
      },
      {
        value: "social-media-influencer-csr",
        label: "Social Media Influencer CSR For Education",
      },
      {
        value: "sports-stars-csr",
        label: "African International Sports Stars CSR For Education",
      },
    ],
  },
  {
    value: "csr-education-africa",
    label: "Best CSR in Education Nigeria",
    superCategory: "blue-garnet-gold-certificate",
    subcategories: [
      // {
      //   value: "overall-best-csr-africa",
      //   label:
      //     "The Overall Best Corporate Social Responsibility (CSR) for Education in Nigeria Award",
      // },
      {
        value: "banking-finance-csr-africa",
        label: "Banking And Finance CSR in Education Award",
      },
      {
        value: "telecommunications-csr-africa",
        label: "Telecommunications CSR in Education Award",
      },
      {
        value: "oil-gas-csr-africa",
        label: "Oil And Gas CSR in Education Award",
      },
      {
        value: "food-beverages-csr-africa",
        label: "Food And Beverages CSR in Education Award",
      },
      {
        value: "manufacturing-csr-africa",
        label: "Manufacturing CSR in Education Award",
      },
      {
        value: "aviation-csr-africa",
        label: "Aviation CSR in Education Award",
      },
      {
        value: "technology-ict-csr-africa",
        label: "Technology And ICT CSR in Education Award",
      },
      {
        value: "real-estate-construction-csr-africa",
        label: "Real Estate and Construction CSR in Education Award",
      },
      {
        value: "retail-ecommerce-csr-africa",
        label: "Retail and E-commerce CSR in Education Award",
      },
      {
        value: "commercial-retail-csr-africa",
        label: "Commercial retail CSR in Education Award",
      },
      {
        value: "pharmaceuticals-csr-africa",
        label: "Pharmaceuticals CSR in Education Award",
      },
      {
        value: "insurance-csr-africa",
        label: "Insurance CSR in Education Award",
      },
      {
        value: "conglomerates-csr-africa",
        label:
          "Conglomerates And Diversified Businesses CSR in Education Award",
      },
      {
        value: "media-entertainment-csr-africa",
        label: "Media And Entertainment CSR in Education Award",
      },
      {
        value: "agriculture-agribusiness-csr-africa",
        label: "Agriculture And Agribusiness CSR in Education Award",
      },
      {
        value: "healthcare-hospitals-csr-africa",
        label: "Health Care And Hospitals CSR in Education Award",
      },
      {
        value: "professional-services-csr-africa",
        label: "Professional Services CSR in Education Award",
      },
      {
        value: "fintech-csr-africa",
        label: "Fintech CSR in Education Award",
      },
      {
        value: "microfinance-banks-csr-africa",
        label: "Microfinance Banks CSR in Education Award",
      },
      {
        value: "emerging-telecommunications-csr-africa",
        label: "Emerging Telecommunications CSR in Education Award",
      },
      {
        value: "technology-software-csr-africa",
        label: "Technology and Software CSR in Education Award",
      },
      {
        value: "real-estate-development-csr-africa",
        label: "Real Estate Development CSR in Education Award",
      },
      {
        value: "hotels-csr-africa",
        label: "Hotels CSR in Education Award",
      },
    ],
  },
  {
    value: "best-edutech-organization",
    label: "Best EduTech Organization in Africa (Regional)",
    superCategory: "blue-garnet-gold-certificate",
    subcategories: [
      {
        value: "overall-best-edutech",
        label:
          "The Overall Best EduTech Organization in Nigeria and Africa 2024",
      },
      {
        value: "best-edutech-startup",
        label: "Best EduTech Startup",
      },
      {
        value: "best-edutech-established",
        label: "Best EduTech Established Company",
      },
      {
        value: "best-edutech-social-impact",
        label: "Best EduTech Social Impact Initiative",
      },
    ],
  },
  {
    value: "best-educational-state",
    label: "Overall Best Educational Friendly State in Nigeria 2024",
    superCategory: "platinum-certificate",
    subcategories: [
      {
        value: "overall-best-state",
        label: "Overall Best Educational friendly state in Nigeria 2024",
      },
      {
        value: "north-central-zone",
        label: "Best Education Initiative in North Central Zone Award",
      },
      {
        value: "north-east-zone",
        label: "Best Education Initiative in North East Zone Award",
      },
      {
        value: "north-west-zone",
        label: "Best Education Initiative in North West Zone Award",
      },
      {
        value: "south-east-zone",
        label: "Best Education Initiative in South East Zone Award",
      },
      {
        value: "south-south-zone",
        label: "Best Education Initiative in South South Zone Award",
      },
      {
        value: "south-west-zone",
        label: "Best Education Initiative in South West Zone Award",
      },
    ],
  },
  {
    value: "best-library",
    label: "The Best Library in Nigerian Tertiary Institutions Award 2024",
    superCategory: "platinum-certificate",
    subcategories: [
      {
        value: "overall-best-library",
        label: "The best library in Nigerian tertiary institutions award 2024",
      },
      {
        value: "university-library-public",
        label: "Best University Library in Nigeria (Public)",
      },
      {
        value: "university-library-private",
        label: "Best University Library in Nigeria (Private)",
      },
      {
        value: "polytechnic-library-public",
        label: "Best Polytechnic Library in Nigeria (Public)",
      },
      {
        value: "college-education-library-public",
        label: "Best College of Education Library in Nigeria (Public)",
      },
      {
        value: "college-nursing-library-public",
        label: "Best College of Nursing Library in Nigeria (Public)",
      },
      {
        value: "polytechnic-library-private",
        label: "Best Polytechnic Library in Nigeria (Private)",
      },
      {
        value: "college-education-library-private",
        label: "Best College of Education Library in Nigeria (Private)",
      },
      {
        value: "college-nursing-library-private",
        label: "Best College of Nursing Library in Nigeria (Private)",
      },
    ],
  },
  {
    value: "best-research-development",
    label:
      "The Overall Best Research and Development Contribution by Tertiary Institutions in Nigeria",
    superCategory: "platinum-certificate",
    subcategories: [
      {
        value: "overall-best-research",
        label:
          "The Overall Best Research and Development Contribution by Research Institutes in Achieving Education for all.",
      },
      {
        value: "agricultural-research",
        label: "Best Agricultural Research Institute in Nigeria",
      },
      {
        value: "pharmaceutical-research",
        label: "Best Pharmaceutical And Drug Research Institute in Nigeria",
      },
      {
        value: "environmental-research",
        label:
          "Best Environmental And Ecological Research Institute in Nigeria",
      },
    ],
  },
  {
    value: "best-media-organization",
    label: "Best Media Organization in Educational Advocacy (Nigeria)",
    superCategory: "blue-garnet-gold-certificate",
    subcategories: [
      // {
      //   value: "overall-best-media-org",
      //   label:
      //     "The Overall Best Media Organization in Nigeria with Educational Advocacy Content 2024",
      // },
      {
        value: "best-print-media",
        label: "Best Print Media Educational Advocacy Award",
      },
      {
        value: "radio-educational-program",
        label: "Radio Educational Program Excellence Award",
      },
      {
        value: "television-educational-content",
        label: "Television Educational Content Award",
      },
      {
        value: "best-digital-media",
        label: "Best Digital Media Educational Advocacy Award",
      },
    ],
  },
  {
    value: "international-contributors",
    label:
      "Overall Best Global Education Excellence Award for Facilitating the Achievement of Education for All in Nigeria (2020-2024)",
    superCategory: "platinum-certificate",
    subcategories: [
      {
        value: "overall-international",
        label:
          "International and Bilateral Contributors to Education in Nigeria Recognition award 2024",
      },
      {
        value: "embassy-contribution",
        label:
          "Best International Embassy Contribution to Education in Nigeria (2020-2024)",
      },
      {
        value: "bilateral-organization",
        label:
          "Best Bilateral Organization Education Support Initiative in Nigeria (2020-2024)",
      },
      {
        value: "international-ngo",
        label:
          "Best International NGO Education Support Service in Nigeria (2020-2024)",
      },
      {
        value: "grant-giving-organization",
        label:
          "Best Educational Grant-Giving Organization in Nigeria (2020-2024)",
      },
      {
        value: "airline-support",
        label:
          "Best International Airline Education Support Initiative in Nigeria (2020-2024)",
      },
      {
        value: "leadership-training",
        label: "Best Leadership Training Organization in Nigeria (2020-2024)",
      },
    ],
  },
  {
    value: "christian-education-champion",
    label:
      "Christian Faith Organization Educational Champion of the Decade Award",
    superCategory: "platinum-certificate",
    subcategories: [
      {
        value: "overall-christian-champion",
        label:
          "Christian faith organization Educational Champion of the Decade Award",
      },
      {
        value: "christian-infrastructure",
        label:
          "Best Educational Infrastructure Development by a Christian Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024",
      },
      {
        value: "christian-scholarship",
        label:
          "Best Scholarship Program by a Christian Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024",
      },
      {
        value: "christian-holistic-support",
        label:
          "Best Holistic Educational Support by a Christian Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024",
      },
      {
        value: "christian-advocacy",
        label:
          "Best Advocacy for Educational Reforms and Awareness Campaigns by a Christian Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024",
      },
    ],
  },
  {
    value: "islamic-education-champion",
    label:
      "Islamic Faith Organization Educational Champion of the Decade Award in Nigeria (2013-2024)",
    superCategory: "platinum-certificate",
    subcategories: [
      {
        value: "overall-islamic-champion",
        label:
          "Islamic faith organization Educational Champion of the Decade Award in Nigeria 2024",
      },
      {
        value: "islamic-infrastructure",
        label:
          "Best Educational Infrastructure Development by an Islamic Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024",
      },
      {
        value: "islamic-scholarship",
        label:
          "Best Scholarship Program by an Islamic Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024",
      },
      {
        value: "islamic-holistic-support",
        label:
          "Best Holistic Educational Support by an Islamic Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024",
      },
      {
        value: "islamic-advocacy",
        label:
          "Best Advocacy for Educational Reforms and Awareness Campaigns by an Islamic Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024",
      },
    ],
  },
  {
    value: "best-political-leader",
    label:
      "Recognition for the Best Educational Support by a Political Leader in Nigeria 2024",
    superCategory: "platinum-certificate",
    subcategories: [
      {
        value: "overall-political-leader",
        label:
          "Political Leaders in Nigeria 2024 Recognition Award for the Best Educational Support Services",
      },
      {
        value: "scholarship-program-politician",
        label:
          "Outstanding Scholarship Program For Both Vocational And Formal Education A ...",
      },
      {
        value: "infrastructure-politician",
        label:
          "Exemplary Infrastructure Development And Donations For Education By A Politician",
      },
      {
        value: "advocacy-politician",
        label: "Advocacy And Policy Development For Education By A Politician",
      },
    ],
  },
  {
    value: "creative-arts-contribution",
    label: "Creative Arts Industry Contribution to Education in Nigeria 2024",
    superCategory: "blue-garnet-gold-certificate",
    subcategories: [
      // {
      //   value: "overall-creative-arts",
      //   label: "Creative Arts Industry Contribution to Education (Nigeria)",
      // },
      {
        value: "nollywood-educational-content",
        label:
          "Best Nollywood Production and Artiste for Educational Content Award",
      },
      {
        value: "music-industry-contribution",
        label: "Best Music Industry Contribution to Education Award",
      },
      {
        value: "literature-art-works",
        label: "Best Literature and Art Works for Education Award",
      },
      {
        value: "visual-arts-impact",
        label: "Best Visual Arts and Educational Impact Award",
      },
      {
        value: "performing-arts-enrichment",
        label: "Best Performing Arts and Education Enrichment Award",
      },
      {
        value: "film-media-advancement",
        label: "Best Film and Media for Educational Advancement Award",
      },
      {
        value: "creative-advocacy-campaigns",
        label: "Best Creative Advocacy and Educational Campaigns Award",
      },
    ],
  },
  {
    value: "support-stem-education",
    label: "Best STEM Education Program or Project (Africa-wide)",
    superCategory: "blue-garnet-gold-certificate",
    subcategories: [
      // {
      //   value: "overall-stem-support",
      //   label: "Support for education in STEM in Nigeria",
      // },
      {
        value: "innovative-stem-curriculum",
        label: "The Best Innovative STEM Curriculum Development in Nigeria",
      },
      {
        value: "stem-outreach-engagement",
        label: "The Best STEM Outreach and Community Engagement in Nigeria",
      },
      {
        value: "technology-integration-stem",
        label: "The Best Technology Integration in STEM Education in Nigeria",
      },
    ],
  },
];

// Helper function to get category label from value
export function getCategoryLabel(value: string): string {
  const category = AWARD_CATEGORIES.find((cat) => cat.value === value);
  return category?.label || value;
}

// Helper function to get subcategory label from value
export function getSubcategoryLabel(
  categoryValue: string,
  subcategoryValue: string
): string {
  const category = AWARD_CATEGORIES.find((cat) => cat.value === categoryValue);
  const subcategory = category?.subcategories.find(
    (sub) => sub.value === subcategoryValue
  );
  return subcategory?.label || subcategoryValue;
}

// Helper function to get subcategories for a category
export function getSubcategories(categoryValue: string): Subcategory[] {
  const category = AWARD_CATEGORIES.find((cat) => cat.value === categoryValue);
  return category?.subcategories || [];
}

// Helper function to get super category for a category
export function getSuperCategory(categoryValue: string): string {
  const category = AWARD_CATEGORIES.find((cat) => cat.value === categoryValue);
  return category?.superCategory || "";
}

// Helper function to get super category label
export function getSuperCategoryLabel(superCategoryValue: string): string {
  const superCategory = SUPER_AWARD_CATEGORIES.find(
    (cat) => cat.value === superCategoryValue
  );
  return superCategory?.label || superCategoryValue;
}
