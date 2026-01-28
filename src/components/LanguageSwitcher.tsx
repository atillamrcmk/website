import { useState, useEffect } from 'react';
import { getDefaultLanguage, setLanguage, type Language } from '@/i18n';

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentLang(getDefaultLanguage());
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <button
          className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-light-muted backdrop-blur-md transition-all hover:border-accent-from/50 hover:bg-white/10"
          aria-label="Language selector"
        >
          TR
        </button>
      </div>
    );
  }

  const handleLanguageChange = (lang: Language) => {
    if (lang !== currentLang) {
      setLanguage(lang);
    }
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] p-1 backdrop-blur-md">
      <button
        onClick={() => handleLanguageChange('tr')}
        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
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
        onClick={() => handleLanguageChange('en')}
        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
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




