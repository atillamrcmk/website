import type { Language } from './index';

export const SUPPORTED_LOCALES: Language[] = ['tr', 'en'];
export const DEFAULT_LOCALE: Language = 'tr';

export function isValidLocale(s: string | undefined): s is Language {
  return s === 'tr' || s === 'en';
}

/**
 * Strip /tr or /en prefix from pathname. Returns null locale for non-localized paths (e.g. legal pages).
 */
export function stripLocale(pathname: string): { locale: Language | null; rest: string } {
  const m = pathname.match(/^\/(tr|en)(\/.*)?$/);
  if (!m) return { locale: null, rest: pathname };
  const restPart = m[2];
  const rest = !restPart || restPart === '' ? '/' : restPart;
  return { locale: m[1] as Language, rest };
}

/** Build path like /en/contact or /tr/ */
export function withLocale(locale: Language, rest: string): string {
  if (rest === '/') return `/${locale}/`;
  if (!rest.startsWith('/')) return `/${locale}/${rest}`;
  return `/${locale}${rest}`;
}

const LEGAL_PAIRS: { tr: string; en: string }[] = [
  { tr: '/gizlilik-politikasi', en: '/privacy-policy' },
  { tr: '/kullanim-kosullari', en: '/terms-of-service' },
];

function legalTargetForLocale(pathname: string, target: Language): string | null {
  const normalized = pathname.replace(/\/$/, '') || '/';
  for (const pair of LEGAL_PAIRS) {
    if (normalized === pair.tr.replace(/\/$/, '') || pathname.startsWith(pair.tr + '/')) {
      return target === 'tr' ? pair.tr : pair.en;
    }
    if (normalized === pair.en.replace(/\/$/, '') || pathname.startsWith(pair.en + '/')) {
      return target === 'tr' ? pair.tr : pair.en;
    }
  }
  return null;
}

/** Switch UI language: localized app routes or counterpart legal URL. */
export function navigateToLocale(target: Language): void {
  if (typeof window === 'undefined') return;
  const path = window.location.pathname;
  const legal = legalTargetForLocale(path, target);
  try {
    localStorage.setItem('language', target);
  } catch {
    /* ignore */
  }
  if (legal) {
    window.location.href = legal;
    return;
  }
  const { rest } = stripLocale(path);
  window.location.href = withLocale(target, rest);
}

export function currentLocaleFromPath(pathname: string): Language {
  const { locale } = stripLocale(pathname);
  if (locale) return locale;
  const n = pathname.replace(/\/$/, '') || '/';
  if (n === '/privacy-policy' || n.startsWith('/privacy-policy/')) return 'en';
  if (n === '/terms-of-service' || n.startsWith('/terms-of-service/')) return 'en';
  if (n === '/gizlilik-politikasi' || n.startsWith('/gizlilik-politikasi/')) return 'tr';
  if (n === '/kullanim-kosullari' || n.startsWith('/kullanim-kosullari/')) return 'tr';
  return DEFAULT_LOCALE;
}
