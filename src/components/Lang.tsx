'use client';

import { useEffect, useState } from 'react';

interface LangProps {
  lang: 'tr' | 'en';
  children: React.ReactNode;
}

export default function Lang({ lang, children }: LangProps) {
  const [currentLang, setCurrentLang] = useState<'tr' | 'en'>('tr');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('language') as 'tr' | 'en' | null;
      setCurrentLang(stored || 'tr');
      
      // Also check parent element's data-lang attribute
      const parent = document.querySelector('[data-lang]');
      if (parent) {
        const parentLang = parent.getAttribute('data-lang') as 'tr' | 'en';
        if (parentLang) {
          setCurrentLang(parentLang);
        }
      }
      
      // Listen for language changes
      const handleStorageChange = () => {
        const newLang = localStorage.getItem('language') as 'tr' | 'en' | null;
        if (newLang) {
          setCurrentLang(newLang);
        }
      };
      window.addEventListener('storage', handleStorageChange);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, []);
  
  if (lang === currentLang) {
    return <>{children}</>;
  }
  
  return null;
}
