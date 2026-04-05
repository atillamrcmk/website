import { useState, useEffect } from 'react';
import { type Language } from '@/i18n';
import { currentLocaleFromPath, navigateToLocale } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentLang(currentLocaleFromPath(window.location.pathname));
  }, []);

  const btnBase =
    'touch-manipulation min-h-[44px] min-w-[40px] rounded-full px-2.5 text-xs font-medium transition-all sm:min-w-[44px] inline-flex items-center justify-center';

  if (!mounted) {
    return (
      <div className="flex items-center gap-1">
        <span
          className={`${btnBase} border border-white/10 bg-white/[0.05] text-light-muted backdrop-blur-md`}
          aria-hidden="true"
        >
          TR
        </span>
      </div>
    );
  }

  const handleLanguageChange = (lang: Language) => {
    if (lang !== currentLang) {
      navigateToLocale(lang);
    }
  };

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.05] p-1 backdrop-blur-md"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => handleLanguageChange('tr')}
        className={`${btnBase} ${
          currentLang === 'tr'
            ? 'bg-gradient-to-r from-accent-from to-accent-to text-white'
            : 'text-light-muted hover:text-light-text'
        }`}
        aria-label="Switch to Turkish"
        aria-pressed={currentLang === 'tr'}
      >
        TR
      </button>
      <button
        type="button"
        onClick={() => handleLanguageChange('en')}
        className={`${btnBase} ${
          currentLang === 'en'
            ? 'bg-gradient-to-r from-accent-from to-accent-to text-white'
            : 'text-light-muted hover:text-light-text'
        }`}
        aria-label="Switch to English"
        aria-pressed={currentLang === 'en'}
      >
        EN
      </button>
    </div>
  );
}
