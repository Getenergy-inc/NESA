/**
 * Maps display category names to NRC database category values
 * This ensures nominees submitted through NRC appear on the correct public pages
 */

export const CATEGORY_DISPLAY_TO_VALUE_MAP: { [key: string]: string } = {
  // Africa Icon Blue Garnet Award
  'Africa Lifetime Education Icon Special Recognition Award': 'africa-lifetime-education-icon',
  
  // Blue Garnet & Gold Certificate Awards
  'The Overall Best NGO Contribution to Achieving Education for All in Nigeria 2024': 'best-ngo-contribution',
  'Best NGO Education Support Recognition Award': 'best-ngo-contribution',
  'Africa Diaspora Association Educational Impact Projects Recognition Award in Africa': 'africa-diaspora-impact',
  'The Overall Best CSR for Education in Nigeria Award 2024': 'best-csr-education',
  'Best EduTech Organization in Nigeria and Africa 2024': 'best-edutech-organization',
  'Overall Best Educational Friendly State in Nigeria 2024': 'best-educational-state',
  'The Overall Best Research and Development Contribution by Tertiary Institutions in Nigeria': 'best-research-development',
  'Overall Best Global Education Excellence Award for Facilitating the Achievement of Education for All in Nigeria (2020-2024)': 'international-contributors',
  
  // Platinum Certificate Awards
  'CSR for Education Special Recognition Award in Africa 2024': 'csr-education-africa',
  'The Best Library in Nigerian Tertiary Institutions Award 2024': 'best-library',
  'The Overall Best Media Organization in Nigeria with Outstanding Education Focus': 'best-media-organization',
  'Christian Faith Organization Educational Champion of the Decade Award': 'christian-education-champion',
  'Islamic Faith Organization Educational Champion of the Decade Award in Nigeria (2013-2024)': 'islamic-education-champion',
  'Recognition for the Best Educational Support by a Political Leader in Nigeria 2024': 'best-political-leader',
  'Creative Arts Industry Contribution to Education in Nigeria 2024': 'creative-arts-contribution',
  'Support for Education in STEM in Nigeria 2024': 'support-stem-education',
};

export const CATEGORY_VALUE_TO_DISPLAY_MAP: { [key: string]: string } = Object.entries(
  CATEGORY_DISPLAY_TO_VALUE_MAP
).reduce((acc, [key, value]) => {
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
    if (key.toLowerCase().includes(normalizedInput) || normalizedInput.includes(key.toLowerCase())) {
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
 */
export function getSubcategoryValue(displayName: string): string {
  return SUBCATEGORY_MAPPING[displayName] || displayName;
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
  'Africa Education Philanthropy Icon': 'africa-education-philanthropy-icon',
  'Literary & New Curriculum Advocate': 'literary-new-curriculum-advocate',
  'Africa Technical Educator Icon': 'africa-technical-educator-icon',
  
  // Alternative names
  'Africa Education Philanthropy Icon Of The Decade (2014-2024)': 'africa-education-philanthropy-icon',
  'Literary And New Curriculum Advocate Africa Education Icon Of The Decade (2014-2024)': 'literary-new-curriculum-advocate',
  'Africa Technical Educator Icon Of The Decade (2014-2024)': 'africa-technical-educator-icon',
};

/**
 * Additional category aliases for matching
 * Some pages use shortened versions of category names
 */
export const CATEGORY_ALIASES: { [key: string]: string } = {
  'Best NGO Education Support Recognition Award': 'best-ngo-contribution',
  'NGO Education Support': 'best-ngo-contribution',
  'Best Educational Infrastructure Initiative By An NGO': 'best-ngo-contribution',
};
