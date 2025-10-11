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
      "The Overall Best NGO Contribution to Achieving Education for All in Nigeria 2024",
    superCategory: "blue-garnet-gold-certificate",
    subcategories: [
      {
        value: "best-educational-infrastructure",
        label: "Best Educational Infrastructure Initiative By An NGO",
      },
      {
        value: "exceptional-donation-materials",
        label: "Exceptional Donation Of Educational Materials By An NGO",
      },
      {
        value: "outstanding-donation-aid",
        label: "Outstanding Donation Of Education Aid By NGO",
      },
      {
        value: "youth-empowerment",
        label:
          "Youth Empowerment Through Educational Services By An NGO In Nigeria",
      },
      {
        value: "women-girls-empowerment",
        label: "Women And Girls' Empowerment In Education By An NGO In Nigeria",
      },
    ],
  },
  {
    value: "africa-diaspora-impact",
    label:
      "Africa Diaspora Association Educational Impact Projects Recognition Award in Africa",
    superCategory: "blue-garnet-gold-certificate",
    subcategories: [
      {
        value: "diaspora-infrastructure",
        label:
          "The Best Diaspora-Led Educational Infrastructure Project in Africa",
      },
      {
        value: "diaspora-program-innovation",
        label: "The Best Diaspora-Led Educational Program Innovation in Africa",
      },
    ],
  },
  {
    value: "best-csr-education",
    label: "The Overall Best CSR for Education in Nigeria Award 2024",
    superCategory: "blue-garnet-gold-certificate",
    subcategories: [
      {
        value: "banking-finance-csr",
        label: "Banking And Finance CSR in Education Award",
      },
      {
        value: "telecommunications-csr",
        label: "Telecommunications CSR in Education Award",
      },
      { value: "oil-gas-csr", label: "Oil And Gas CSR in Education Award" },
      {
        value: "food-beverages-csr",
        label: "Food And Beverages CSR in Education Award",
      },
      {
        value: "manufacturing-csr",
        label: "Manufacturing CSR in Education Award",
      },
      { value: "aviation-csr", label: "Aviation CSR in Education Award" },
      {
        value: "technology-ict-csr",
        label: "Technology And ICT CSR in Education Award",
      },
      {
        value: "real-estate-construction-csr",
        label: "Real Estate And Construction CSR in Education Award",
      },
      {
        value: "retail-ecommerce-csr",
        label: "Retail And E-Commerce CSR in Education Award",
      },
      {
        value: "pharmaceuticals-csr",
        label: "Pharmaceuticals CSR in Education Award",
      },
      { value: "insurance-csr", label: "Insurance CSR in Education Award" },
      {
        value: "media-entertainment-csr",
        label: "Media And Entertainment CSR in Education Award",
      },
      {
        value: "agriculture-agribusiness-csr",
        label: "Agriculture And Agribusiness CSR In Education Award",
      },
      {
        value: "healthcare-hospitals-csr",
        label: "Health Care And Hospitals CSR In Education Award",
      },
      {
        value: "professional-services-csr",
        label: "Professional Services CSR In Education Award",
      },
      { value: "fintech-csr", label: "Fintech CSR in Education Award" },
      {
        value: "microfinance-banks-csr",
        label: "Microfinance Banks CSR in Education Award",
      },
      {
        value: "emerging-telecommunications-csr",
        label: "Emerging Telecommunications CSR in Education Award",
      },
      {
        value: "technology-software-csr",
        label: "Technology and Software CSR in Education Award",
      },
      {
        value: "real-estate-development-csr",
        label: "Real Estate Development CSR in Education Award",
      },
      {
        value: "commercial-retail-csr",
        label: "Commercial Retail CSR in Education Award",
      },
      {
        value: "hotels-csr",
        label: "Hotels CSR in Education Award 2022-2024 in Nigeria",
      },
    ],
  },
  {
    value: "csr-education-africa",
    label: "CSR for Education Special Recognition Award in Africa 2024",
    superCategory: "platinum-certificate",
    subcategories: [
      { value: "pan-african-initiative", label: "Pan-African Initiative" },
      { value: "regional-impact", label: "Regional Impact" },
      { value: "sustainable-programs", label: "Sustainable Programs" },
    ],
  },
  {
    value: "best-edutech-organization",
    label: "Best EduTech Organization in Nigeria and Africa 2024",
    superCategory: "blue-garnet-gold-certificate",
    subcategories: [
      { value: "learning-platforms", label: "Learning Platforms" },
      { value: "educational-apps", label: "Educational Apps" },
      { value: "virtual-classrooms", label: "Virtual Classrooms" },
      { value: "assessment-tools", label: "Assessment Tools" },
      { value: "content-creation", label: "Content Creation" },
    ],
  },
  {
    value: "best-educational-state",
    label: "Overall Best Educational Friendly State in Nigeria 2024",
    superCategory: "blue-garnet-gold-certificate",
    subcategories: [
      {
        value: "infrastructure-investment",
        label: "Infrastructure Investment",
      },
      { value: "teacher-welfare", label: "Teacher Welfare" },
      { value: "student-support", label: "Student Support Programs" },
      { value: "policy-innovation", label: "Policy Innovation" },
    ],
  },
  {
    value: "best-library",
    label: "The Best Library in Nigerian Tertiary Institutions Award 2024",
    superCategory: "platinum-certificate",
    subcategories: [
      { value: "university-library", label: "University Library" },
      { value: "polytechnic-library", label: "Polytechnic Library" },
      { value: "college-library", label: "College of Education Library" },
      { value: "digital-resources", label: "Digital Resources Excellence" },
    ],
  },
  {
    value: "best-research-development",
    label:
      "The Overall Best Research and Development Contribution by Tertiary Institutions in Nigeria",
    superCategory: "blue-garnet-gold-certificate",
    subcategories: [
      { value: "stem-research", label: "STEM Research" },
      { value: "education-research", label: "Education Research" },
      { value: "innovation-labs", label: "Innovation Labs" },
      { value: "industry-collaboration", label: "Industry Collaboration" },
    ],
  },
  {
    value: "best-media-organization",
    label:
      "The Overall Best Media Organization in Nigeria with Outstanding Education Focus",
    superCategory: "blue-garnet-gold-certificate",
    subcategories: [
      { value: "broadcast-media", label: "Broadcast Media" },
      { value: "print-media", label: "Print Media" },
      { value: "digital-media", label: "Digital Media" },
      { value: "educational-programming", label: "Educational Programming" },
    ],
  },
  {
    value: "international-contributors",
    label:
      "Overall Best Global Education Excellence Award for Facilitating the Achievement of Education for All in Nigeria (2020-2024)",
    superCategory: "blue-garnet-gold-certificate",
    subcategories: [
      { value: "un-agencies", label: "UN Agencies" },
      { value: "international-ngos", label: "International NGOs" },
      { value: "bilateral-programs", label: "Bilateral Programs" },
      { value: "multilateral-initiatives", label: "Multilateral Initiatives" },
    ],
  },
  {
    value: "christian-education-champion",
    label:
      "Christian Faith Organization Educational Champion of the Decade Award",
    superCategory: "platinum-certificate",
    subcategories: [
      { value: "mission-schools", label: "Mission Schools" },
      { value: "church-programs", label: "Church Educational Programs" },
      { value: "christian-universities", label: "Christian Universities" },
      { value: "faith-based-initiatives", label: "Faith-Based Initiatives" },
    ],
  },
  {
    value: "islamic-education-champion",
    label:
      "Islamic Faith Organization Educational Champion of the Decade Award in Nigeria (2013-2024)",
    superCategory: "platinum-certificate",
    subcategories: [
      { value: "islamic-schools", label: "Islamic Schools" },
      { value: "mosque-programs", label: "Mosque Educational Programs" },
      { value: "islamic-universities", label: "Islamic Universities" },
      { value: "quranic-education", label: "Quranic Education" },
    ],
  },
  {
    value: "best-political-leader",
    label:
      "Recognition for the Best Educational Support by a Political Leader in Nigeria 2024",
    superCategory: "platinum-certificate",
    subcategories: [
      { value: "federal-level", label: "Federal Level" },
      { value: "state-level", label: "State Level" },
      { value: "local-government", label: "Local Government" },
      { value: "legislative-support", label: "Legislative Support" },
    ],
  },
  {
    value: "creative-arts-contribution",
    label: "Creative Arts Industry Contribution to Education in Nigeria 2024",
    superCategory: "blue-garnet-gold-certificate",
    subcategories: [
      { value: "music-education", label: "Music and Education" },
      { value: "film-education", label: "Film and Education" },
      { value: "arts-programs", label: "Arts Programs" },
      { value: "cultural-education", label: "Cultural Education" },
    ],
  },
  {
    value: "support-stem-education",
    label: "Support for Education in STEM in Nigeria 2024",
    superCategory: "blue-garnet-gold-certificate",
    subcategories: [
      { value: "stem-labs", label: "STEM Labs" },
      { value: "coding-programs", label: "Coding Programs" },
      { value: "robotics-education", label: "Robotics Education" },
      { value: "science-competitions", label: "Science Competitions" },
      { value: "stem-scholarships", label: "STEM Scholarships" },
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
