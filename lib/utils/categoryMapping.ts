/**
 * Maps display category names to NRC database category values
 * This ensures nominees submitted through NRC appear on the correct public pages
 */

export const CATEGORY_DISPLAY_TO_VALUE_MAP: { [key: string]: string } = {
  // Africa Icon Blue Garnet Award
  "Africa Lifetime Education Icon Special Recognition Award":
    "africa-lifetime-education-icon",

  // Blue Garnet & Gold Certificate Awards
  "The Overall Best NGO Contribution to Achieving Education for All in Nigeria 2024":
    "best-ngo-contribution",
  "Best NGO Education Support Recognition Award": "best-ngo-contribution",
  "Africa Diaspora Association Educational Impact Projects Recognition Award in Africa":
    "africa-diaspora-impact",
  "The Overall Best CSR for Education in Nigeria Award 2024":
    "best-csr-education",
  "Best EduTech Organization in Nigeria and Africa 2024":
    "best-edutech-organization",
  "Overall Best Educational Friendly State in Nigeria 2024":
    "best-educational-state",
  "The Overall Best Research and Development Contribution by Tertiary Institutions in Nigeria":
    "best-research-development",
  "Overall Best Global Education Excellence Award for Facilitating the Achievement of Education for All in Nigeria (2020-2024)":
    "international-contributors",

  // Platinum Certificate Awards
  "CSR for Education Special Recognition Award in Africa 2024":
    "csr-education-africa",
  "The Best Library in Nigerian Tertiary Institutions Award 2024":
    "best-library",
  "The Overall Best Media Organization in Nigeria with Outstanding Education Focus":
    "best-media-organization",
  "Christian Faith Organization Educational Champion of the Decade Award":
    "christian-education-champion",
  "Islamic Faith Organization Educational Champion of the Decade Award in Nigeria (2013-2024)":
    "islamic-education-champion",
  "Recognition for the Best Educational Support by a Political Leader in Nigeria 2024":
    "best-political-leader",
  "Creative Arts Industry Contribution to Education in Nigeria 2024":
    "creative-arts-contribution",
  "Support for Education in STEM in Nigeria 2024": "support-stem-education",
};

export const CATEGORY_VALUE_TO_DISPLAY_MAP: { [key: string]: string } =
  Object.entries(CATEGORY_DISPLAY_TO_VALUE_MAP).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {} as { [key: string]: string });

/**
 * Get the NRC database value from a display category name
 * Supports exact match and fuzzy matching
 */
export function getCategoryValue(displayName: string): string {
  // Try exact match first
  if (CATEGORY_DISPLAY_TO_VALUE_MAP[displayName]) {
    return CATEGORY_DISPLAY_TO_VALUE_MAP[displayName];
  }

  // Try alias match
  if (CATEGORY_ALIASES[displayName]) {
    return CATEGORY_ALIASES[displayName];
  }

  // Try fuzzy match (case-insensitive, partial match)
  const normalizedInput = displayName.toLowerCase().trim();

  for (const [key, value] of Object.entries(CATEGORY_DISPLAY_TO_VALUE_MAP)) {
    if (
      key.toLowerCase().includes(normalizedInput) ||
      normalizedInput.includes(key.toLowerCase())
    ) {
      return value;
    }
  }

  // Return original if no match found
  return displayName;
}

/**
 * Get the display category name from an NRC database value
 */
export function getCategoryDisplayName(value: string): string {
  return CATEGORY_VALUE_TO_DISPLAY_MAP[value] || value;
}

/**
 * Get the subcategory database value from display name
 * Supports exact match and case-insensitive fuzzy matching
 */
export function getSubcategoryValue(displayName: string): string {
  // Try exact match first
  if (SUBCATEGORY_MAPPING[displayName]) {
    return SUBCATEGORY_MAPPING[displayName];
  }
  
  // Try case-insensitive match
  const normalizedInput = displayName.toLowerCase().trim();
  
  for (const [key, value] of Object.entries(SUBCATEGORY_MAPPING)) {
    if (key.toLowerCase() === normalizedInput) {
      return value;
    }
  }
  
  // Return original if no match found
  return displayName;
}

/**
 * Get the subcategory display name from database value
 */
export function getSubcategoryDisplayName(value: string): string {
  // Reverse lookup
  for (const [key, val] of Object.entries(SUBCATEGORY_MAPPING)) {
    if (val === value) {
      return key;
    }
  }
  return value;
}

/**
 * Subcategory mapping for matching display names to database values
 */
export const SUBCATEGORY_MAPPING: { [key: string]: string } = {
  // Africa Icon Blue Garnet Award subcategories
  "Africa Education Philanthropy Icon": "africa-education-philanthropy-icon",
  "Literary & New Curriculum Advocate": "literary-new-curriculum-advocate",
  "Africa Technical Educator Icon": "africa-technical-educator-icon",

  // Alternative names
  "Africa Education Philanthropy Icon Of The Decade (2014-2024)":
    "africa-education-philanthropy-icon",
  "Literary And New Curriculum Advocate Africa Education Icon Of The Decade (2014-2024)":
    "literary-new-curriculum-advocate",
  "Africa Technical Educator Icon Of The Decade (2014-2024)":
    "africa-technical-educator-icon",

  // Best NGO Contribution subcategories
  "The Overall Best NGO Contribution to Achieving Education for All in Nigeria 2024":
    "overall-best-ngo",
  "Best Educational Infrastructure Initiative By An NGO":
    "best-educational-infrastructure",
  "Exceptional Donation Of Educational Materials By An NGO":
    "exceptional-donation-materials",
  "Outstanding Donation Of Education Aid By NGO": "outstanding-donation-aid",
  "Youth Empowerment Through Educational Services by an NGO in Nigeria":
    "youth-empowerment",
  "Women and Girls' Empowerment in Education by an NGO in Nigeria":
    "women-girls-empowerment",

  // Best CSR for Education subcategories
  "The Overall Best Corporate Social Responsibility (CSR) for Education in Nigeria Award":
    "overall-best-csr",
  "Banking And Finance CSR in Education Award": "banking-finance-csr",
  "Telecommunications CSR in Education Award": "telecommunications-csr",
  "Best Technology and ICT CSR in Education": "technology-ict-csr",
  "Manufacturing And Industrial CSR in Education":
    "manufacturing-industrial-csr",
  "Agriculture And Agribusiness CSR in Education":
    "agriculture-agribusiness-csr",
  "Social Media Influencer CSR For Education": "social-media-influencer-csr",
  "African International Sports Stars CSR For Education": "sports-stars-csr",

  // Best Media Organization subcategories
  "The Overall Best Media Organization in Nigeria with Educational Advocacy Content 2024":
    "overall-best-media-org",
  "Best Print Media Educational Advocacy Award": "best-print-media",
  "Radio Educational Program Excellence Award": "radio-educational-program",
  "Television Educational Content Award": "television-educational-content",
  "Best Digital Media Educational Advocacy Award": "best-digital-media",

  // Creative Arts Contribution subcategories
  "Creative Arts Industry Contribution to Education (Nigeria)":
    "overall-creative-arts",
  "Best Nollywood Production and Artiste for Educational Content Award":
    "nollywood-educational-content",
  "Best Music Industry Contribution to Education Award":
    "music-industry-contribution",
  "Best Literature and Art Works for Education Award": "literature-art-works",
  "Best Visual Arts and Educational Impact Award": "visual-arts-impact",
  "Best Performing Arts and Education Enrichment Award":
    "performing-arts-enrichment",
  "Best Film and Media for Educational Advancement Award":
    "film-media-advancement",
  "Best Creative Advocacy and Educational Campaigns Award":
    "creative-advocacy-campaigns",

  // Best EduTech Organization subcategories
  "The Overall Best EduTech Organization in Nigeria and Africa 2024":
    "overall-best-edutech",
  "Best EduTech Startup": "best-edutech-startup",
  "Best EduTech Established Company": "best-edutech-established",
  "Best EduTech Social Impact Initiative": "best-edutech-social-impact",

  // Support for STEM Education subcategories
  "Support for education in STEM in Nigeria": "overall-stem-support",
  "The Best Innovative STEM Curriculum Development in Nigeria":
    "innovative-stem-curriculum",
  "The Best STEM Outreach and Community Engagement in Nigeria":
    "stem-outreach-engagement",
  "The Best Technology Integration in STEM Education in Nigeria":
    "technology-integration-stem",

  // Best Educational State subcategories (Platinum)
  "Overall Best Educational friendly state in Nigeria 2024":
    "overall-best-state",
  "Best Education Initiative in North Central Zone Award": "north-central-zone",
  "Best Education Initiative in North East Zone Award": "north-east-zone",
  "Best Education Initiative in North West Zone Award": "north-west-zone",
  "Best Education Initiative in South East Zone Award": "south-east-zone",
  "Best Education Initiative in South South Zone Award": "south-south-zone",
  "Best Education Initiative in South West Zone Award": "south-west-zone",

  // Best Library subcategories (Platinum)
  "The best library in Nigerian tertiary institutions award 2024":
    "overall-best-library",
  "Best University Library in Nigeria (Public)": "university-library-public",
  "Best University Library in Nigeria (Private)": "university-library-private",
  "Best Polytechnic Library in Nigeria (Public)":
    "polytechnic-library-public",
  "Best College of Education Library in Nigeria (Public)":
    "college-education-library-public",
  "Best College of Nursing Library in Nigeria (Public)":
    "college-nursing-library-public",
  "Best Polytechnic Library in Nigeria (Private)":
    "polytechnic-library-private",
  "Best College of Education Library in Nigeria (Private)":
    "college-education-library-private",
  "Best College of Nursing Library in Nigeria (Private)":
    "college-nursing-library-private",

  // Best Research & Development subcategories (Platinum)
  "The Overall Best Research and Development Contribution by Research Institutes in Achieving Education for all.":
    "overall-best-research",
  "Best Agricultural Research Institute in Nigeria": "agricultural-research",
  "Best Pharmaceutical And Drug Research Institute in Nigeria":
    "pharmaceutical-research",
  "Best Environmental And Ecological Research Institute in Nigeria":
    "environmental-research",

  // International Contributors subcategories (Platinum)
  "International and Bilateral Contributors to Education in Nigeria Recognition award 2024":
    "overall-international",
  "Best International Embassy Contribution to Education in Nigeria (2020-2024)":
    "embassy-contribution",
  "Best Bilateral Organization Education Support Initiative in Nigeria (2020-2024)":
    "bilateral-organization",
  "Best International NGO Education Support Service in Nigeria (2020-2024)":
    "international-ngo",
  "Best Educational Grant-Giving Organization in Nigeria (2020-2024)":
    "grant-giving-organization",
  "Best International Airline Education Support Initiative in Nigeria (2020-2024)":
    "airline-support",
  "Best Leadership Training Organization in Nigeria (2020-2024)":
    "leadership-training",

  // Christian Education Champion subcategories (Platinum)
  "Christian faith organization Educational Champion of the Decade Award":
    "overall-christian-champion",
  "Best Educational Infrastructure Development by a Christian Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024":
    "christian-infrastructure",
  "Best Scholarship Program by a Christian Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024":
    "christian-scholarship",
  "Best Holistic Educational Support by a Christian Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024":
    "christian-holistic-support",
  "Best Advocacy for Educational Reforms and Awareness Campaigns by a Christian Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024":
    "christian-advocacy",

  // Islamic Education Champion subcategories (Platinum)
  "Islamic faith organization Educational Champion of the Decade Award in Nigeria 2024":
    "overall-islamic-champion",
  "Best Educational Infrastructure Development by an Islamic Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024":
    "islamic-infrastructure",
  "Best Scholarship Program by an Islamic Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024":
    "islamic-scholarship",
  "Best Holistic Educational Support by an Islamic Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024":
    "islamic-holistic-support",
  "Best Advocacy for Educational Reforms and Awareness Campaigns by an Islamic Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024":
    "islamic-advocacy",

  // Best Political Leader subcategories (Platinum)
  "Political Leaders in Nigeria 2024 Recognition Award for the Best Educational Support Services":
    "overall-political-leader",
  "Outstanding Scholarship Program For Both Vocational And Formal Education A ...":
    "scholarship-program-politician",
  "Exemplary Infrastructure Development And Donations For Education By A Politician":
    "infrastructure-politician",
  "Advocacy And Policy Development For Education By A Politician":
    "advocacy-politician",

  // Africa Diaspora Impact subcategories (Platinum)
  "The Best Diaspora-Led Educational Infrastructure.":
    "diaspora-infrastructure",
  "The Best Diaspora-Led Educational Program Innovation":
    "diaspora-program-innovation",
  "The Best Diaspora-Led Teacher Training and Support Initiative.":
    "diaspora-teacher-training",
};

/**
 * Additional category aliases for matching
 * Some pages use shortened versions of category names
 */
export const CATEGORY_ALIASES: { [key: string]: string } = {
  "Best NGO Education Support Recognition Award": "best-ngo-contribution",
  "NGO Education Support": "best-ngo-contribution",
  "Best Educational Infrastructure Initiative By An NGO":
    "best-ngo-contribution",
};
