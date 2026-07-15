import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import enTranslations from '../locales/en.json';
import esTranslations from '../locales/es.json';

/** Languages with a real locale file (not English fallback). */
export type Language = 'en' | 'es';

export const SUPPORTED_LANGUAGES: readonly Language[] = ['en', 'es'] as const;

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  availableLanguages: readonly Language[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
};

const translationsMap: Record<Language, Record<string, unknown>> = {
  en: enTranslations as Record<string, unknown>,
  es: esTranslations as Record<string, unknown>,
};

function resolveKey(tree: unknown, key: string): unknown {
  const parts = key.split('.');
  let value: unknown = tree;
  for (const part of parts) {
    if (value == null || typeof value !== 'object') return undefined;
    value = (value as Record<string, unknown>)[part];
  }
  return value;
}

function readStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem('rsc-language');
  if (saved && (SUPPORTED_LANGUAGES as readonly string[]).includes(saved)) {
    return saved as Language;
  }
  // Legacy codes (pt/fr/…) used English content — reset to English
  if (saved && saved !== 'en' && saved !== 'es') {
    localStorage.setItem('rsc-language', 'en');
  }
  return 'en';
}

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => readStoredLanguage());

  const setLanguage = useCallback((lang: Language) => {
    if (!(SUPPORTED_LANGUAGES as readonly string[]).includes(lang)) return;
    setLanguageState(lang);
    localStorage.setItem('rsc-language', lang);
    document.documentElement.lang = lang;
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback(
    (key: string): string => {
      const fromActive = resolveKey(translationsMap[language], key);
      if (typeof fromActive === 'string') return fromActive;

      const fromEn = resolveKey(translationsMap.en, key);
      if (typeof fromEn === 'string') return fromEn;

      if (import.meta.env.DEV) {
        console.warn(`Translation key "${key}" not found for language "${language}"`);
      }
      return key;
    },
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      availableLanguages: SUPPORTED_LANGUAGES,
    }),
    [language, setLanguage, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
