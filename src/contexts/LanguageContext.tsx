
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    search: 'Search anything...',
    searchButton: 'Search',
    results: 'Results',
    chat: 'Chat',
    chatPlaceholder: 'Ask a follow-up question...',
    send: 'Send',
    clear: 'Clear Chat',
    source: 'Source',
    summary: 'Summary',
    noResults: 'No results found',
    searchFirst: 'Search for something to get started',
    chatEmpty: 'Start a conversation',
  },
  ar: {
    search: 'ابحث عن أي شيء...',
    searchButton: 'بحث',
    results: 'النتائج',
    chat: 'المحادثة',
    chatPlaceholder: 'اطرح سؤالاً إضافياً...',
    send: 'إرسال',
    clear: 'مسح المحادثة',
    source: 'المصدر',
    summary: 'الملخص',
    noResults: 'لم يتم العثور على نتائج',
    searchFirst: 'ابحث عن شيء للبدء',
    chatEmpty: 'ابدأ محادثة',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
