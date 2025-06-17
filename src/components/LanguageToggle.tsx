
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 border-0 font-normal"
    >
      {language === 'en' ? 'العربية' : 'English'}
    </Button>
  );
};

export default LanguageToggle;
