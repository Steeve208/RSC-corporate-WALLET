import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import enTranslations from '../locales/en.json';
import esTranslations from '../locales/es.json';

export type Language = 'en' | 'es' | 'pt' | 'fr' | 'de' | 'it' | 'zh' | 'ja' | 'ko' | 'ar';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
};

interface I18nProviderProps {
  children: ReactNode;
}

// Translation files mapping
const translationsMap: Record<Language, any> = {
  en: enTranslations,
  es: esTranslations,
  pt: enTranslations, // Fallback to English for now
  fr: enTranslations,
  de: enTranslations,
  it: enTranslations,
  zh: enTranslations,
  ja: enTranslations,
  ko: enTranslations,
  ar: enTranslations,
};

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Default to English - only use saved language if explicitly set by user
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rsc-language') as Language;
      // Validate saved language exists in translations map
      if (saved && translationsMap[saved]) {
        return saved;
      }
      // Default to English and save it
      localStorage.setItem('rsc-language', 'en');
      return 'en';
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    if (translationsMap[lang]) {
      setLanguageState(lang);
      localStorage.setItem('rsc-language', lang);
      // Update HTML lang attribute
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    // Set initial HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const translations = useMemo(() => translationsMap[language] || translationsMap['en'], [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation key "${key}" not found for language "${language}"`);
        return key;
      }
    }
    return value || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

