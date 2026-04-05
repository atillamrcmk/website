import tr from './tr.json';
import en from './en.json';
import { navigateToLocale } from './routing';

export type Language = 'tr' | 'en';

export const languages: Language[] = ['tr', 'en'];

export const translations = {
  tr,
  en,
} as const;

export function getTranslations(lang: Language = 'tr') {
  return translations[lang];
}

export function getDefaultLanguage(): Language {
  // Server-side: always return default
  if (typeof window === 'undefined') return 'tr';
  
  // Client-side: check localStorage first
  try {
    const stored = localStorage.getItem('language') as Language;
    if (stored && languages.includes(stored)) {
      return stored;
    }
  } catch (e) {
    // localStorage not available
  }
  
  // Check browser language
  try {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'tr' || browserLang === 'en') {
      return browserLang;
    }
  } catch (e) {
    // navigator not available
  }
  
  return 'tr'; // Default
}

export function setLanguage(lang: Language) {
  if (typeof window === 'undefined') return;
  navigateToLocale(lang);
}

