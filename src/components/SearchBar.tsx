
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading = false }) => {
  const [query, setQuery] = useState('');
  const { t, direction } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="relative flex gap-3">
        <div className="relative flex-1">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search')}
            className={`
              h-14 px-6 text-lg bg-white/90 backdrop-blur-sm border-2 border-gray-200 
              rounded-2xl shadow-lg focus:border-blue-400 focus:shadow-xl transition-all duration-300
              ${direction === 'rtl' ? 'pr-14 text-right' : 'pl-14'}
            `}
            disabled={isLoading}
          />
          <Search 
            className={`
              absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400
              ${direction === 'rtl' ? 'right-4' : 'left-4'}
            `} 
          />
        </div>
        <Button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            t('searchButton')
          )}
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
