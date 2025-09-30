"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Import translation files
import enTranslations from './translations/partner/en.json';
import frTranslations from './translations/partner/fr.json';
import arTranslations from './translations/partner/ar.json';
import swTranslations from './translations/partner/sw.json';
import ptTranslations from './translations/partner/pt.json';

// Language types
export type Language = 'en' | 'fr' | 'ar' | 'sw' | 'pt';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

// Available languages
export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
];

// Translation object type
type TranslationObject = typeof enTranslations;

// Translations map
const translations: Record<Language, TranslationObject> = {
  en: enTranslations,
  fr: frTranslations,
  ar: arTranslations,
  sw: swTranslations,
  pt: ptTranslations,
};

// Context type
interface PartnerLanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

// Create context
const PartnerLanguageContext = createContext<PartnerLanguageContextType | undefined>(undefined);

// Storage key for localStorage
const STORAGE_KEY = 'nesa-partner-language';

// Helper function to get nested translation value
function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
}

// Provider component
interface PartnerLanguageProviderProps {
  children: ReactNode;
}

export const PartnerLanguageProvider: React.FC<PartnerLanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem(STORAGE_KEY) as Language;
    if (savedLanguage && LANGUAGES.find(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentLanguage);
  }, [currentLanguage]);

  // Translation function
  const t = (key: string): string => {
    const translation = getNestedValue(translations[currentLanguage], key);
    
    // Fallback to English if translation not found
    if (translation === key && currentLanguage !== 'en') {
      return getNestedValue(translations.en, key);
    }
    
    return translation;
  };

  // Check if current language is RTL
  const isRTL = currentLanguage === 'ar';

  // Set language function
  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const value: PartnerLanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
    isRTL,
  };

  return (
    <PartnerLanguageContext.Provider value={value}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-arabic' : ''}>
        {children}
      </div>
    </PartnerLanguageContext.Provider>
  );
};

// Hook to use the context
export const usePartnerLanguage = (): PartnerLanguageContextType => {
  const context = useContext(PartnerLanguageContext);
  if (context === undefined) {
    throw new Error('usePartnerLanguage must be used within a PartnerLanguageProvider');
  }
  return context;
};

// Export default
export default PartnerLanguageProvider;