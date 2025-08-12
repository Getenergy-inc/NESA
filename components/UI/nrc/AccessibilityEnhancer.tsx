'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accessibility,
  Eye,
  EyeOff,
  Type,
  Contrast,
  Volume2,
  VolumeX,
  MousePointer,
  Keyboard,
  Settings,
  X,
  RotateCcw
} from 'lucide-react';

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  focusIndicators: boolean;
  fontSize: number; // 100 = normal, 125 = large, 150 = extra large
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
}

const AccessibilityEnhancer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    focusIndicators: true,
    fontSize: 100,
    colorBlindMode: 'none'
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('nrc-accessibility-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        applySettings(parsed);
      } catch (error) {
        console.error('Error loading accessibility settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage and apply them
  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('nrc-accessibility-settings', JSON.stringify(updatedSettings));
    applySettings(updatedSettings);
  };

  // Apply accessibility settings to the document
  const applySettings = (settings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // High contrast mode
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Large text
    if (settings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Font size
    root.style.fontSize = `${settings.fontSize}%`;

    // Color blind mode
    root.className = root.className.replace(/colorblind-\w+/g, '');
    if (settings.colorBlindMode !== 'none') {
      root.classList.add(`colorblind-${settings.colorBlindMode}`);
    }

    // Focus indicators
    if (settings.focusIndicators) {
      root.classList.add('enhanced-focus');
    } else {
      root.classList.remove('enhanced-focus');
    }

    // Screen reader announcements
    if (settings.screenReader) {
      announceToScreenReader('Accessibility settings updated');
    }
  };

  // Screen reader announcement helper
  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  // Reset all settings
  const resetSettings = () => {
    const defaultSettings: AccessibilitySettings = {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReader: false,
      keyboardNavigation: true,
      focusIndicators: true,
      fontSize: 100,
      colorBlindMode: 'none'
    };
    updateSettings(defaultSettings);
    announceToScreenReader('Accessibility settings reset to default');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!settings.keyboardNavigation) return;

      // Alt + A to open accessibility panel
      if (event.altKey && event.key === 'a') {
        event.preventDefault();
        setIsOpen(!isOpen);
        announceToScreenReader(isOpen ? 'Accessibility panel closed' : 'Accessibility panel opened');
      }

      // Escape to close panel
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        announceToScreenReader('Accessibility panel closed');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [settings.keyboardNavigation, isOpen]);

  const ToggleButton = ({ 
    label, 
    checked, 
    onChange, 
    icon: Icon,
    description 
  }: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    icon: React.ComponentType<any>;
    description: string;
  }) => (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-gray-600" />
        <div>
          <label className="text-sm font-medium text-gray-700 cursor-pointer">
            {label}
          </label>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
          aria-label={label}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );

  return (
    <>
      {/* Accessibility Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open accessibility settings"
        title="Accessibility Settings (Alt + A)"
      >
        <Accessibility className="w-6 h-6" />
      </motion.button>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-blue-600 text-white p-4 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Accessibility className="w-5 h-5" />
                    Accessibility Settings
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                    aria-label="Close accessibility settings"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-blue-100 mt-1">
                  Customize your experience for better accessibility
                </p>
              </div>

              {/* Settings */}
              <div className="p-4 space-y-4">
                {/* Visual Settings */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Visual Settings</h3>
                  <div className="space-y-3">
                    <ToggleButton
                      label="High Contrast"
                      checked={settings.highContrast}
                      onChange={(checked) => updateSettings({ highContrast: checked })}
                      icon={Contrast}
                      description="Increase contrast for better visibility"
                    />

                    <ToggleButton
                      label="Large Text"
                      checked={settings.largeText}
                      onChange={(checked) => updateSettings({ largeText: checked })}
                      icon={Type}
                      description="Increase text size throughout the site"
                    />

                    {/* Font Size Slider */}
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Type className="w-5 h-5 text-gray-600" />
                        <label className="text-sm font-medium text-gray-700">
                          Font Size: {settings.fontSize}%
                        </label>
                      </div>
                      <input
                        type="range"
                        min="75"
                        max="200"
                        step="25"
                        value={settings.fontSize}
                        onChange={(e) => updateSettings({ fontSize: parseInt(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        aria-label="Font size"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>75%</span>
                        <span>100%</span>
                        <span>125%</span>
                        <span>150%</span>
                        <span>200%</span>
                      </div>
                    </div>

                    {/* Color Blind Support */}
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Eye className="w-5 h-5 text-gray-600" />
                        <label className="text-sm font-medium text-gray-700">
                          Color Blind Support
                        </label>
                      </div>
                      <select
                        value={settings.colorBlindMode}
                        onChange={(e) => updateSettings({ colorBlindMode: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        aria-label="Color blind mode"
                      >
                        <option value="none">None</option>
                        <option value="protanopia">Protanopia (Red-blind)</option>
                        <option value="deuteranopia">Deuteranopia (Green-blind)</option>
                        <option value="tritanopia">Tritanopia (Blue-blind)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Motion Settings */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Motion Settings</h3>
                  <ToggleButton
                    label="Reduced Motion"
                    checked={settings.reducedMotion}
                    onChange={(checked) => updateSettings({ reducedMotion: checked })}
                    icon={MousePointer}
                    description="Reduce animations and transitions"
                  />
                </div>

                {/* Navigation Settings */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Navigation Settings</h3>
                  <div className="space-y-3">
                    <ToggleButton
                      label="Enhanced Focus Indicators"
                      checked={settings.focusIndicators}
                      onChange={(checked) => updateSettings({ focusIndicators: checked })}
                      icon={MousePointer}
                      description="Show clear focus indicators for keyboard navigation"
                    />

                    <ToggleButton
                      label="Keyboard Navigation"
                      checked={settings.keyboardNavigation}
                      onChange={(checked) => updateSettings({ keyboardNavigation: checked })}
                      icon={Keyboard}
                      description="Enable keyboard shortcuts and navigation"
                    />

                    <ToggleButton
                      label="Screen Reader Support"
                      checked={settings.screenReader}
                      onChange={(checked) => updateSettings({ screenReader: checked })}
                      icon={Volume2}
                      description="Enhanced support for screen readers"
                    />
                  </div>
                </div>

                {/* Reset Button */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={resetSettings}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    aria-label="Reset all accessibility settings to default"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset to Default
                  </button>
                </div>

                {/* Keyboard Shortcuts Info */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Keyboard Shortcuts</h4>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li><kbd className="bg-blue-200 px-1 rounded">Alt + A</kbd> - Open accessibility panel</li>
                    <li><kbd className="bg-blue-200 px-1 rounded">Esc</kbd> - Close panels</li>
                    <li><kbd className="bg-blue-200 px-1 rounded">Tab</kbd> - Navigate between elements</li>
                    <li><kbd className="bg-blue-200 px-1 rounded">Enter/Space</kbd> - Activate buttons</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen Reader Only Content */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {/* This will announce changes to screen readers */}
      </div>
    </>
  );
};

export default AccessibilityEnhancer;
