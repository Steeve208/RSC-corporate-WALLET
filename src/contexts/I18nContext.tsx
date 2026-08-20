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
import frTranslations from '../locales/fr.json';
import ptTranslations from '../locales/pt.json';
import zhTranslations from '../locales/zh.json';

export type Language = 'en' | 'es' | 'fr' | 'pt' | 'zh';

export const SUPPORTED_LANGUAGES: readonly Language[] = ['en', 'es', 'fr', 'pt', 'zh'] as const;

/** Native names — always shown as-is in the language menu. */
export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  pt: 'Português',
  zh: '中文',
};

const HTML_LANG: Record<Language, string> = {
  en: 'en',
  es: 'es',
  fr: 'fr',
  pt: 'pt',
  zh: 'zh-CN',
};

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
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};

const translationsMap: Record<Language, Record<string, unknown>> = {
  en: enTranslations as Record<string, unknown>,
  es: esTranslations as Record<string, unknown>,
  fr: frTranslations as Record<string, unknown>,
  pt: ptTranslations as Record<string, unknown>,
  zh: zhTranslations as Record<string, unknown>,
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
    document.documentElement.lang = HTML_LANG[lang];
  }, []);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[language];
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
