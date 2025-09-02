"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { useWaitlistLanguage, LANGUAGES, type Language } from '@/lib/i18n/WaitlistLanguageContext';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage, t } = useWaitlistLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get current language details
  const currentLang = LANGUAGES.find(lang => lang.code === currentLanguage) || LANGUAGES[0];

  // Handle language selection
  const handleLanguageSelect = (languageCode: Language) => {
    setLanguage(languageCode);
    setIsOpen(false);
  };

  // Animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="relative language-selector" ref={dropdownRef}>
      {/* Language Selector Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 rounded-full px-4 py-2 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className="w-4 h-4 text-white/80 group-hover:text-white transition-colors duration-300" />
        
        <div className="flex items-center gap-2">
          <span className="text-lg">{currentLang.flag}</span>
          <span className="text-white/90 group-hover:text-white font-medium text-sm transition-colors duration-300">
            {currentLang.code.toUpperCase()}
          </span>
        </div>
        
        <ChevronDown 
          className={`w-4 h-4 text-white/80 group-hover:text-white transition-all duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute top-full right-0 mt-2 w-56 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-2xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-primaryGold/10 to-deepGold/10 border-b border-gray-200/50">
              <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {t('waitlist.languageSelector.label')}
              </p>
            </div>

            {/* Language Options */}
            <div className="py-2">
              {LANGUAGES.map((language, index) => (
                <motion.button
                  key={language.code}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleLanguageSelect(language.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-primaryGold/10 transition-all duration-200 ${
                    currentLanguage === language.code 
                      ? 'bg-primaryGold/20 border-r-2 border-primaryGold' 
                      : ''
                  }`}
                >
                  <span className="text-xl">{language.flag}</span>
                  
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {language.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language.nativeName}
                    </div>
                  </div>
                  
                  {currentLanguage === language.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-primaryGold rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
