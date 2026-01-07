// Helper to use translation hook in JSX files
import { useTranslation as useI18nTranslation } from '../../contexts/I18nContext';

export function useTranslation() {
  return useI18nTranslation();
}

