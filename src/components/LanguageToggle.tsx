
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90 transition-all duration-200"
    >
      <Languages className="w-4 h-4" />
      <span className="font-medium">
        {language === 'en' ? 'العربية' : 'English'}
      </span>
    </Button>
  );
};

export default LanguageToggle;
