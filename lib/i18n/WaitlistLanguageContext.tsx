"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Import translation files
import enTranslations from './translations/en.json';
import frTranslations from './translations/fr.json';
import arTranslations from './translations/ar.json';
import swTranslations from './translations/sw.json';
import ptTranslations from './translations/pt.json';

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
interface WaitlistLanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

// Create context
const WaitlistLanguageContext = createContext<WaitlistLanguageContextType | undefined>(undefined);

// Storage key for localStorage
const STORAGE_KEY = 'nesa-waitlist-language';

// Helper function to get nested translation value
function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
}

// Provider component
interface WaitlistLanguageProviderProps {
  children: ReactNode;
}

export const WaitlistLanguageProvider: React.FC<WaitlistLanguageProviderProps> = ({ children }) => {
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

  const value: WaitlistLanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
    isRTL,
  };

  return (
    <WaitlistLanguageContext.Provider value={value}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-arabic' : ''}>
        {children}
      </div>
    </WaitlistLanguageContext.Provider>
  );
};

// Hook to use the context
export const useWaitlistLanguage = (): WaitlistLanguageContextType => {
  const context = useContext(WaitlistLanguageContext);
  if (context === undefined) {
    throw new Error('useWaitlistLanguage must be used within a WaitlistLanguageProvider');
  }
  return context;
};

// Export default
export default WaitlistLanguageProvider;
